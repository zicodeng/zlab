/**
 * dat.globe Javascript WebGL Globe Toolkit
 * https://github.com/dataarts/webgl-globe
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

var DAT = DAT || {};

DAT.Globe = function(container, opts) {
    opts = opts || {};

    var colorFn =
        opts.colorFn ||
        // If the user doesn't provide a custom color function,
        // use this default.
        function(x) {
            var c = new THREE.Color();
            c.setHSL(0.6 - x * 0.5, 1.0, 0.5);
            return c;
        };

    var imgDir = opts.imgDir || '/globe/';
    var points;

    var Shaders = {
        earth: {
            uniforms: {
                texture: { type: 't', value: null }
            },
            vertexShader: [
                'varying vec3 vNormal;',
                'varying vec2 vUv;',
                'void main() {',
                'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
                'vNormal = normalize( normalMatrix * normal );',
                'vUv = uv;',
                '}'
            ].join('\n'),
            fragmentShader: [
                'uniform sampler2D texture;',
                'varying vec3 vNormal;',
                'varying vec2 vUv;',
                'void main() {',
                'vec3 diffuse = texture2D( texture, vUv ).xyz;',
                'float intensity = 1.05 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );',
                'vec3 atmosphere = vec3( 0.56, 0.67, 0.55 ) * pow( intensity, 3.0 );',
                'gl_FragColor = vec4( diffuse + atmosphere, 1.0 );',
                '}'
            ].join('\n')
        },
        atmosphere: {
            uniforms: {},
            vertexShader: [
                'varying vec3 vNormal;',
                'void main() {',
                'vNormal = normalize( normalMatrix * normal );',
                'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
                '}'
            ].join('\n'),
            fragmentShader: [
                'varying vec3 vNormal;',
                'void main() {',
                'float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 12.0 );',
                'gl_FragColor = vec4( 0.59, 0.66, 0.40, 0.1 ) * intensity;',
                '}'
            ].join('\n')
        },
        points: {
            uniforms: {},
            vertexShader: [
                'uniform float scaleFactor;',
                'varying vec4 fColor;',
                'void main() {',
                'float vertLength = length(position);',
                'if(vertLength - 200.0 > 0.5){',
                'vec3 newPosition = normalize(position)*(200.0 + mix(uv.x, uv.y, scaleFactor));',
                'gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);',
                '}else{',
                'gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
                '}',
                'fColor = vec4(color, 1.0);',
                '}'
            ].join('\n'),
            fragmentShader: [
                'varying vec4 fColor;',
                'void main() {',
                'gl_FragColor = fColor;',
                '}'
            ].join('\n')
        }
    };

    var camera, scene, renderer, w, h;
    var mesh, atmosphere, point;

    var overRenderer;

    var curZoomSpeed = 0;
    var zoomSpeed = 50;

    var mouseOnDown = { x: 0, y: 0 };
    var rotation = { x: 0, y: 0 },
        target = { x: (Math.PI * 3) / 2, y: Math.PI / 6.0 },
        targetOnDown = { x: 0, y: 0 };

    var raycaster;
    var mouse = new THREE.Vector2(),
        INTERSECTED;

    var dataArr = [];

    var distance = 100000,
        distanceTarget = 100000;
    var padding = 40;
    var PI_HALF = Math.PI / 2;

    function init() {
        container.style.color = '#fff';
        container.style.font = '13px/20px Arial, sans-serif';

        var shader, uniforms, material;
        w = container.offsetWidth || window.innerWidth;
        h = container.offsetHeight || window.innerHeight;

        camera = new THREE.PerspectiveCamera(30, w / h, 1, 10000);
        camera.position.z = distance;

        scene = new THREE.Scene();
        scene.background = new THREE.Color(BG_COLOR);

        var geometry = new THREE.SphereGeometry(200, 40, 30);

        shader = Shaders['earth'];
        uniforms = THREE.UniformsUtils.clone(shader.uniforms);

        uniforms['texture'].value = THREE.ImageUtils.loadTexture(
            imgDir + 'world.jpg'
        );

        material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader
        });

        mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.y = Math.PI;
        scene.add(mesh);

        shader = Shaders['atmosphere'];
        uniforms = THREE.UniformsUtils.clone(shader.uniforms);

        material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            transparent: true
        });

        mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(1.1, 1.1, 1.1);
        scene.add(mesh);

        geometry = new THREE.BoxGeometry(0.75, 0.75, 1);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -0.5));

        point = new THREE.Mesh(geometry);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(w, h);

        renderer.domElement.style.position = 'absolute';

        raycaster = new THREE.Raycaster();

        container.appendChild(renderer.domElement);

        container.addEventListener('mousedown', onMouseDown, false);

        container.addEventListener('mousewheel', onMouseWheel, false);

        document.addEventListener('keydown', onDocumentKeyDown, false);

        document.addEventListener('mousemove', onDocumentMouseMove, false);

        document.addEventListener('click', onDocumentMouseClick, false);

        window.addEventListener('resize', onWindowResize, false);

        container.addEventListener(
            'mouseover',
            function() {
                overRenderer = true;
            },
            false
        );

        container.addEventListener(
            'mouseout',
            function() {
                overRenderer = false;
            },
            false
        );
    }

    function addData(data, opts) {
        if (this.points == undefined) {
            dataArr = [];
            var lat, lng, size, color, i, step, colorFnWrapper;

            opts.format = opts.format || 'magnitude'; // other option is 'legend'
            if (opts.format === 'magnitude') {
                step = 3;
                colorFnWrapper = function(data, i) {
                    return colorFn(data[i + 2]);
                };
            } else if (opts.format === 'legend') {
                step = 4;
                colorFnWrapper = function(data, i) {
                    return colorFn(data[i + 3]);
                };
            } else {
                throw 'error: format not supported: ' + opts.format;
            }

            var subgeo = new THREE.Geometry();

            // Iterates over JSON data.
            for (key in data) {
                list = data[key];
                size = list.length * 10;

                // Only need data of the first object in the list.
                lat = list[0].latitude;
                lng = list[0].longitude;

                color = colorFn(list.length);
                var item = list[0];
                item.topIps = _.first(list, 3).map(function(item) {
                    return item.ip;
                });
                dataArr.push(item);
                addPoint(lat, lng, size, color, subgeo);
            }
            this._baseGeometry = subgeo;
            var pointsShader = Shaders['points'];
            this.points = new THREE.Mesh(
                this._baseGeometry,
                new THREE.ShaderMaterial({
                    uniforms: pointsShader.uniforms,
                    vertexShader: pointsShader.vertexShader,
                    fragmentShader: pointsShader.fragmentShader,
                    vertexColors: THREE.FaceColors
                })
            );
            this.points.name = 'data cylinders';
            points = this.points;
            scene.add(this.points);
        } else {
            for (key in data) {
                list = data[key];
                size = list.length * 10;

                // Only need data of the first object in the list.
                lat = list[0].latitude;
                lng = list[0].longitude;

                color = colorFn(0);
                var item = list[0];
                item.topIps = _.first(list, 3).map(function(item) {
                    return item.ip;
                });
                var testItem = _.findIndex(dataArr, function(val) {
                    return val.city === key;
                });
                if (testItem > -1) {
                    updateScale(size, testItem, this.points.geometry);
                } else {
                    dataArr.push(item);
                    addPoint(lat, lng, size, color, this.points.geometry);
                }
            }
        }
        var tween = new TWEEN.Tween({ scale: 0 })
            .to({ scale: 1 }, 2000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(function() {
                points.material.uniforms.scaleFactor = { value: this.scale };
            })
            .start();
    }

    function updateScale(newScale, index, subgeo) {
        for (var i = index * 12; i < index * 12 + 12; i++) {
            var faceUvs = subgeo.faceVertexUvs[0][i];
            for (var j = 0; j < faceUvs.length; j++) {
                faceUvs[j].x = faceUvs[j].y;
                faceUvs[j].y = newScale;
            }
        }
        subgeo.uvsNeedUpdate = true;
    }

    function addPoint(lat, lng, size, color, subgeo) {
        var phi = ((90 - lat) * Math.PI) / 180;
        var theta = ((180 - lng) * Math.PI) / 180;

        point.position.x = 200 * Math.sin(phi) * Math.cos(theta);
        point.position.y = 200 * Math.cos(phi);
        point.position.z = 200 * Math.sin(phi) * Math.sin(theta);

        point.lookAt(mesh.position);

        point.scale.z = Math.max(size, 0.1); // avoid non-invertible matrix
        point.updateMatrix();

        for (var i = 0; i < point.geometry.faces.length; i++) {
            point.geometry.faces[i].color = color;
        }
        for (var i = 0; i < point.geometry.faceVertexUvs.length; i++) {
            var faceUvs = point.geometry.faceVertexUvs[i];
            for (var j = 0; j < faceUvs.length; j++) {
                for (var k = 0; k < faceUvs[j].length; k++) {
                    point.geometry.faceVertexUvs[i][j][k].x = 0;
                    point.geometry.faceVertexUvs[i][j][k].y = size;
                }
            }
        }
        if (point.matrixAutoUpdate) {
            point.updateMatrix();
        }
        point.geometry.uvsNeedUpdate = true;
        subgeo.merge(point.geometry, point.matrix);
    }

    function onDocumentMouseMove(event) {
        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    // Handle clicked object.
    function onDocumentMouseClick(event) {
        if (INTERSECTED) {
            var i = Math.floor(INTERSECTED.faceIndex / 12);
            var item = dataArr[i];
            var infoElem = document.querySelector('.item-info');
            infoElem.style.display = 'block';
            infoElem.querySelector('h2').innerHTML = item.city;
            infoElem.querySelector('.region div').innerHTML = item.region_name;
            infoElem.querySelector('.country div').innerHTML =
                item.country_name;

            var ipElements = infoElem.querySelectorAll('.ips div');
            _.each(ipElements, function(el) {
                el.remove();
            });
            var ipsEl = infoElem.querySelector('.ips');
            _.each(item.topIps, function(ip) {
                var ipEl = document.createElement('div');
                ipEl.innerHTML = ip;
                ipsEl.appendChild(ipEl);
            });
        }
    }

    function onMouseDown(event) {
        event.preventDefault();

        container.addEventListener('mousemove', onMouseMove, false);
        container.addEventListener('mouseup', onMouseUp, false);
        container.addEventListener('mouseout', onMouseOut, false);

        mouseOnDown.x = -event.clientX;
        mouseOnDown.y = event.clientY;

        targetOnDown.x = target.x;
        targetOnDown.y = target.y;

        container.style.cursor = 'move';
    }

    function onMouseMove(event) {
        mouse.x = -event.clientX;
        mouse.y = event.clientY;

        var zoomDamp = distance / 1000;

        target.x =
            targetOnDown.x + (mouse.x - mouseOnDown.x) * 0.005 * zoomDamp;
        target.y =
            targetOnDown.y + (mouse.y - mouseOnDown.y) * 0.005 * zoomDamp;

        target.y = target.y > PI_HALF ? PI_HALF : target.y;
        target.y = target.y < -PI_HALF ? -PI_HALF : target.y;
    }

    function onMouseUp(event) {
        container.removeEventListener('mousemove', onMouseMove, false);
        container.removeEventListener('mouseup', onMouseUp, false);
        container.removeEventListener('mouseout', onMouseOut, false);
        container.style.cursor = 'auto';
    }

    function onMouseOut(event) {
        container.removeEventListener('mousemove', onMouseMove, false);
        container.removeEventListener('mouseup', onMouseUp, false);
        container.removeEventListener('mouseout', onMouseOut, false);
    }

    function onMouseWheel(event) {
        event.preventDefault();
        if (overRenderer) {
            zoom(event.wheelDeltaY * 0.3);
        }
        return false;
    }

    function onDocumentKeyDown(event) {
        switch (event.keyCode) {
            case 38:
                zoom(100);
                event.preventDefault();
                break;
            case 40:
                zoom(-100);
                event.preventDefault();
                break;
        }
    }

    function onWindowResize(event) {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

    function zoom(delta) {
        distanceTarget -= delta;
        distanceTarget = distanceTarget > 1000 ? 1000 : distanceTarget;
        distanceTarget = distanceTarget < 350 ? 350 : distanceTarget;
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    var faceIndex;
    function render() {
        TWEEN.update();
        zoom(curZoomSpeed);

        var deltaX = target.x - rotation.x;
        var deltaY = target.y - rotation.y;
        var rotationXdelta = deltaX * 0.1;
        if (deltaX < 0.07 && autoRotateOn) {
            rotationXdelta = AUTO_ROTATE_SPEED;
        }
        rotation.x += rotationXdelta;
        rotation.y += deltaY * 0.1;
        distance += (distanceTarget - distance) * 0.3;

        camera.position.x =
            distance * Math.sin(rotation.x) * Math.cos(rotation.y);
        camera.position.y = distance * Math.sin(rotation.y);
        camera.position.z =
            distance * Math.cos(rotation.x) * Math.cos(rotation.y);

        // Update the picking ray with the camera and mouse position.
        raycaster.setFromCamera(mouse, camera);

        // Calculate objects intersecting the picking ray.
        var intersects = raycaster.intersectObjects(points ? [points] : []);

        // If raycaster captures some intersected objects
        // when the mouse is hovered on them...
        if (intersects.length > 0) {
            // if (INTERSECTED) {
            //     updateColor(INTERSECTED, colorFn(0));
            // }

            INTERSECTED = intersects[0];

            // updateColor(INTERSECTED, colorFn(1));

            // Add some hover effect.
            container.style.cursor = 'pointer';
        } else {
            // if (INTERSECTED) {
            //     updateColor(INTERSECTED, colorFn(0));
            // }
            container.style.cursor = 'default';
            INTERSECTED = null;
        }

        camera.lookAt(mesh.position);

        renderer.render(scene, camera);
    }

    function updateColor(INTERSECTED, color) {
        // We use INTERSECTED.faceIndex / 12 to figure our which cylinder is being hovered.
        // Then we use round down that result and
        // multiply it by 12 to make sure we always get the first piece of triangle
        // of which the cylinder is made.
        faceIndex = Math.floor(INTERSECTED.faceIndex / 12) * 12;

        // Loop through all faces of the hovered cylinder,
        // and add color to every face.
        for (var i = faceIndex; i < faceIndex + 12; i++) {
            INTERSECTED.object.geometry.faces[i].color = color;
        }

        INTERSECTED.object.geometry.elementsNeedUpdate = true;
        INTERSECTED.object.geometry.colorsNeedUpdate = true;
    }

    function clear() {
        if (points) {
            var oldPoints = points; // this prevents a race condition
            var tween = new TWEEN.Tween({ outScale: 1 })
                .to({ outScale: 0 }, 2000)
                .onUpdate(function() {
                    oldPoints.scale.x = this.outScale;
                    oldPoints.scale.y = this.outScale;
                    oldPoints.scale.z = this.outScale;
                })
                .easing(TWEEN.Easing.Quadratic.InOut)
                .onComplete(function() {
                    scene.remove(oldPoints);
                })
                .start();
        }
    }

    init();

    this.animate = animate;

    this.__defineGetter__('time', function() {
        return this._time || 0;
    });

    this.__defineSetter__('time', function(t) {
        var validMorphs = [];
        var morphDict = this.points.morphTargetDictionary;
        for (var k in morphDict) {
            if (k.indexOf('morphPadding') < 0) {
                validMorphs.push(morphDict[k]);
            }
        }
        validMorphs.sort();
        var l = validMorphs.length - 1;
        var scaledt = t * l + 1;
        var index = Math.floor(scaledt);
        for (i = 0; i < validMorphs.length; i++) {
            this.points.morphTargetInfluences[validMorphs[i]] = 0;
        }
        var lastIndex = index - 1;
        var leftover = scaledt - index;
        if (lastIndex >= 0) {
            this.points.morphTargetInfluences[lastIndex] = 1 - leftover;
        }
        this.points.morphTargetInfluences[index] = leftover;
        this._time = t;
    });

    this.addData = addData;
    this.renderer = renderer;
    this.scene = scene;
    this.clear = clear;

    return this;
};

import * as THREE from 'three';
//@ts-ignore
THREE.OrbitControls = require('zicodeng-three-orbit-controls')(THREE);

const scene = new THREE.Scene();
// Set up camera
// P1: FoV (Field of View) - the extent of the scene that is seen on the display at any given moment. The value is in degrees
// P2: Aspect Ratio - always use the width of the element divided by the height
// P3: Near Clipping Plane - objects closer than `near` won't be rendered
// P4: Far Clipping Plane - objects further away from the camera than the value of `far` won't be rendered
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer();
// Set size to fill our window
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Handle window resize
window.addEventListener('resize', function() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

const controls = new THREE.OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// A mesh is an object that takes a geometry, and applies a material to it,
// which we then can insert to our scene, and move freely around.
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const animate = function() {
    requestAnimationFrame(animate);

    controls.update();

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();

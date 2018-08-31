var globe = DAT.Globe(document.getElementById('container'), {
    colorFn: function(size) {
        var color =
            size > 7
                ? 0xe9eff6
                : [
                      0x184676,
                      0x1f5a99,
                      0x2364aa,
                      0x4e83bb,
                      0x7ba2cc,
                      0xa7c1dd,
                      0xd3e0ee
                  ][size - 1];
        return new THREE.Color(color);
    },
    imgDir: 'globe/'
});

var datasets = [dataset3, dataset1, dataset2, dataset4, dataset5, dataset6];
var mapData = {};
var container = document.querySelector('#container');

for (var i = 0; i < datasets.length; i++) {
    var dataset = datasets[i];

    // Aggregate the data by city.
    var aggrData = aggregator(dataset, 'city');

    mapData['dataset' + (i + 1)] = aggrData;
}

var dataset1Btn = document.querySelector('.dataset-1-btn');
var dataset2Btn = document.querySelector('.dataset-2-btn');
var rotationCtrl = document.querySelector('.rotation-ctrl');
var updatesCtrl = document.querySelector('.updates-ctrl');
var autoRotateOn = true;
var updatesOn = true;

if (dataset1Btn) {
    dataset1Btn.addEventListener('click', function() {
        displayData(mapData['dataset1']);
    });
}

if (dataset2Btn) {
    dataset2Btn.addEventListener('click', function() {
        displayData(mapData['dataset2']);
    });
}

rotationCtrl.addEventListener('click', function() {
    autoRotateOn = !autoRotateOn;
    rotationCtrl.querySelector('span').innerHTML = autoRotateOn ? 'on' : 'off';
});

updatesCtrl.addEventListener('click', function() {
    updatesOn = !updatesOn;
    updatesCtrl.querySelector('span').innerHTML = updatesOn ? 'on' : 'off';
});

// Aggregates the data by options.
// Available options are: ip_addr, city, country_code, country_name, region_name.
function aggregator(data, opt) {
    // Handle ip_addr case.
    if (opt === 'ip_addr') {
        return data.result;
    }

    var result = {};

    // Handle country_code, country_name, and region_name case.
    for (key in data.result) {
        var obj = data.result[key];
        if (obj[opt] !== undefined) {
            objOpt = obj[opt];
            obj.ip = key;

            // If the result has not had this field yet,
            // add the new field to it, and make the field value
            // to be an array.
            if (result[objOpt] === undefined) {
                result[objOpt] = [];
            }

            result[objOpt].push(obj);
        }
    }

    return result;
}

function init() {
    displayData(mapData['dataset1']);
    globe.animate();

    setInterval(autoUpdate, 5000);
}

init();

function displayData(data) {
    globe.addData(data, {
        format: 'legend',
        name: 'Green Cover'
    });
}

var i = 2;
function autoUpdate() {
    if (!updatesOn) {
        return;
    }
    displayData(mapData['dataset' + i]);

    i++;

    if (i > datasets.length) {
        i = 1;
    }
}

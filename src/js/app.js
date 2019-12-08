const Canvas = require('./canvas.js');
require('../css/style.css');

function main() {
  const coordinates = [];
  const map = initMap();
  const container = document.getElementById('container');
  const canvas = new Canvas(container);

  map.addListener('mousedown', function() {
    map.addListener('mousemove', function({ pixel, latLng }) {
      canvas.onPaint(pixel);
      coordinates.push(latLng);
    });
  });

  map.addListener('mouseup', function() {
    google.maps.event.clearListeners(map, 'mousemove');
    canvas.clearCanvas();
  });
}

function initMap() {
  const options = {
    center: { lat: 43.642, lng: -79.389 },
    zoom: 10,
    draggable: false,
  };

  return new google.maps.Map(document.getElementById('map'), options);
}

window.onload = main;

import Canvas from './canvas.js';
import '../css/style.css';

const main = () => {
  const coordinates = [];
  const map = initMap();
  const container = document.getElementById('container');
  const canvas = new Canvas(container);

  map.addListener('mousedown', () => {
    map.addListener('mousemove', ({ pixel, latLng }) => {
      canvas.onPaint(pixel);
      coordinates.push(latLng);
    });
  });

  map.addListener('mouseup', () => {
    google.maps.event.clearListeners(map, 'mousemove');
    canvas.clearCanvas();
  });
};

const initMap = () => {
  const options = {
    center: { lat: 43.642, lng: -79.389 },
    zoom: 10,
    draggable: false,
  };

  return new google.maps.Map(document.getElementById('map'), options);
};

window.onload = main;

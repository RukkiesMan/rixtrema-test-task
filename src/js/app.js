import simplify from 'simplify-js';

import Map from './components/map';
import Canvas from './components/canvas';

import '../css/style.css';

const main = () => {
  const coordinates = [];
  const options = {
    center: { lat: 43.642, lng: -79.389 },
    zoom: 10,
    draggable: false,
  };

  const mapContainer = document.getElementById('map');
  const map = new Map(mapContainer, options);

  const canvasContainer = document.getElementById('container');
  const canvas = new Canvas(canvasContainer);

  map.addListener('mousedown', () => {
    map.addListener('mousemove', ({ pixel, latLng }) => {
      canvas.onPaint(pixel);
      coordinates.push(latLng);
    });
  });

  map.addListener('mouseup', () => {
    map.removeListener('mousemove');
    canvas.clearCanvas();
  });
};

const convertCoordinatesForMap = coordinates => {
  const tolerance = 5;

  return simplify(coordinates, tolerance).map(coordinate => ({
    lat: coordinate.latLng.lat(),
    lng: coordinate.latLng.lng(),
  }));
};

window.onload = main;

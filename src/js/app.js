import simplify from 'simplify-js';

import Map from './components/map';
import Canvas from './components/canvas';

import '../css/style.css';

const main = () => {
  let coordinates = [];
  let currentPolygon = null;

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
    coordinates = [];
    if (currentPolygon) {
      currentPolygon.setMap(null);
    }

    map.addListener('mousemove', ({ pixel, latLng }) => {
      canvas.onPaint(pixel);
      coordinates.push({ x: pixel.x, y: pixel.y, latLng });
    });
  });

  map.addListener('mouseup', () => {
    const convertedCoordinates = convertCoordinatesForMap(coordinates);

    currentPolygon = map.createPolygon(convertedCoordinates);
    console.log(convertedCoordinates);

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

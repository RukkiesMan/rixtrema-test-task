class Map {
  constructor(container, options) {
    this.map = new google.maps.Map(container, options);
  }

  addListener(event, listener) {
    this.map.addListener(event, listener);
  }

  removeListener(event) {
    google.maps.event.clearListeners(this.map, event);
  }

  createPolygon(coordinates, options) {
    return new google.maps.Polygon({
      map: this.map,
      paths: coordinates,
      strokeColor: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.4,
      draggable: true,
      editable: true,
      ...options,
    });
  }
}

export default Map;

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
}

export default Map;

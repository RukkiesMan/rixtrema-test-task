function draw() {
  const canvas = document.querySelector('#paint');
  const canvasContainer = document.body;

  const containerStyles = getComputedStyle(canvasContainer);
  canvas.width = parseInt(containerStyles.getPropertyValue('width'));
  canvas.height = parseInt(containerStyles.getPropertyValue('height'));
}

class Canvas {
  constructor(canvasContainer) {
    const canvas = document.createElement('canvas');

    const containerStyles = getComputedStyle(canvasContainer);
    canvas.style.position = 'absolute';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.pointerEvents = 'none';
    canvas.width = parseInt(containerStyles.getPropertyValue('width'));
    canvas.height = parseInt(containerStyles.getPropertyValue('height'));
    canvasContainer.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'blue';

    this.canvas = canvas;
    this.ctx = ctx;

    this.lastMouse = { x: 0, y: 0 };
  }

  onPaint(mouse) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastMouse.x || mouse.x, this.lastMouse.y || mouse.y);
    this.ctx.lineTo(mouse.x, mouse.y);
    this.ctx.stroke();

    this.lastMouse.x = mouse.x;
    this.lastMouse.y = mouse.y;
  }

  clearCanvas() {
    this.lastMouse.x = 0;
    this.lastMouse.y = 0;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getInstance() {
    return this.canvas;
  }
}

module.exports = Canvas;

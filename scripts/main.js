function main() {
  const coordinates = [];

  const map = initMap();
  draw(coordinates);
}

function draw(coordinates) {
  const canvas = document.querySelector('#paint');
  const canvasContainer = document.body;

  const containerStyles = getComputedStyle(canvasContainer);
  canvas.width = parseInt(containerStyles.getPropertyValue('width'));
  canvas.height = parseInt(containerStyles.getPropertyValue('height'));

  const ctx = canvas.getContext('2d');
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'blue';

  const mouse = { x: 0, y: 0 };
  const lastMouse = { x: 0, y: 0 };

  canvas.addEventListener('mousemove', function(event) {
    lastMouse.x = mouse.x;
    lastMouse.y = mouse.y;

    mouse.x = event.pageX - this.offsetLeft;
    mouse.y = event.pageY - this.offsetTop;

    coordinates.push({ x: mouse.x, y: mouse.y });
  });

  canvas.addEventListener('mousedown', function() {
    canvas.addEventListener('mousemove', onPaint, false);
  });

  canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
  });

  const onPaint = function() {
    ctx.beginPath();
    ctx.moveTo(lastMouse.x, lastMouse.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
  };
}

function initMap() {
  const options = {
    center: { lat: 43.642, lng: -79.389 },
    zoom: 16,
  };

  return new google.maps.Map(document.getElementById('map'), options);
}

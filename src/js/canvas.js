import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: 0,
  y: 0
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
})

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
})

// Objects
class Circle {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.strokeStyle = 'rgba(0, 0, 0, .2)'
    c.closePath();
  }

  update() {
    this.draw()
  }
}

// Implementation
let bigCircle;
let smallCircle;

const init = () => {
  bigCircle = new Circle(innerWidth / 2, innerHeight / 2, 100, '#2185C5');
  smallCircle = new Circle(10, 10, 30, '#FF7F66');
}

// Animation Loop
const animate = () => {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  bigCircle.update();
  smallCircle.x = mouse.x;
  smallCircle.y = mouse.y;
  smallCircle.update();

  if(getDistance(bigCircle.x, bigCircle.y, smallCircle.x, smallCircle.y) < smallCircle.radius + bigCircle.radius) {
    bigCircle.color = '#FF7F66';
  } else {
    bigCircle.color = '#2185C5';
  }
}

const getDistance = (x1, y1, x2, y2) => {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

init();
animate();

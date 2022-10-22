/**
 * 生成随机整数
 * @param {*} low
 * @param {*} high
 */
function randomIntFromRange(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low)
}
/**
 * 生成随机浮点数
 * @param {} low
 * @param {*} high
 */
function randonFloatFromRange(low, high) {
  return Math.random() * (high - low + 1) + low
}

/**
 * 生成随机颜色
 * @param {} colors
 */
function randomColor(colors) {
  return Math.floor(Math.random() * colors.length)
}

/**
 * 计算两个点的距离
 * @param {*} x1
 * @param {*} y1
 * @param {*} x2
 * @param {*} y2
 */
function getDistance(x1, y1, x2, y2) {
  let dx = x1 - x2
  let dy = y1 - y2
  return Math.sqrt(dx * dx + dy * dy)
}

let colorArr = ['#3726A6', '#4A44F2', '#F2E635', '#F2BE22', '#F20505']
let mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
}

window.addEventListener('mousemove', function (event) {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

let canvas = document.getElementById('myCanvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let ctx = canvas.getContext('2d')

function Particle(x, y, radius, color) {
  this.x = x
  this.y = y
  this.radius = radius
  this.color = color
  this.theta = randonFloatFromRange(0, 2 * Math.PI)
  this.speed = 0.05
  this.dragSpeed = 0.05
  this.distance = randomIntFromRange(60, 90)
  this.lastMouse = {
    x,
    y,
  }

  this.draw = function (lastPosition) {
    ctx.beginPath()
    /* ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false)
    ctx.fillStyle = this.color
    ctx.fill() */
    ctx.strokeStyle = this.color
    ctx.lineWeight = this.radius
    ctx.moveTo(lastPosition.x, lastPosition.y)
    ctx.lineTo(this.x, this.y)
    ctx.stroke()
    ctx.closePath()
  }
  this.update = function () {
    let lastPosition = {
      x: this.x,
      y: this.y,
    }

    // 平滑拖拽效果
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * this.dragSpeed
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * this.dragSpeed
    //todo
    this.x = this.lastMouse.x + Math.cos(this.theta) * this.distance
    this.y = this.lastMouse.y + Math.sin(this.theta) * this.distance

    this.theta += this.speed
    this.draw(lastPosition)
  }
}

let particles

function init() {
  particles = []
  for (let i = 0; i < 50; i++) {
    let color = colorArr[randomColor(colorArr)]
    particles.push(new Particle(canvas.width / 2, canvas.height / 2, 5, color))
  }
}

function animate() {
  requestAnimationFrame(animate)
  // ctx.clearRect(0, 0, canvas.width, canvas.height)
  // 每一帧都给之前的帧蒙上一层白色透明的矩形
  ctx.fillStyle = 'rgba(255,255,255,0.1)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  for (const p of particles) {
    p.update()
  }
}

init()
animate()

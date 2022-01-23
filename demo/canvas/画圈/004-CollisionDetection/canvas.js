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

/**
 * 旋转向量
 * @param {*} v
 * @param {*} theta
 */
function rotateVector(v, theta) {
  return {
    dx: v.dx * Math.cos(theta) - v.dy * Math.sin(theta),
    dy: v.dy * Math.cos(theta) + v.dx * Math.sin(theta),
  }
}

/**
 * 解决小球碰撞
 * @param {*} p1
 * @param {*} p2
 */
function resolveCollision(p1, p2) {
  let v1 = {
    dx: p1.dx,
    dy: p1.dy,
  }
  let v2 = {
    dx: p2.dx,
    dy: p2.dy,
  }
  let theta = -Math.atan2(p1.y - p2.y, p1.x - p2.x)

  // 旋转速度
  let v1Rotated = rotateVector(v1, theta)
  let v2Rotated = rotateVector(v2, theta)

  // 通过完全弹性碰撞公式计算新的速度  （旋转后的坐标）
  let v1RotatedAfterCollision = {
    dx:
      (v1Rotated.dx * (p1.mass - p2.mass) + 2 * p2.mass * v2Rotated.dx) /
      (p1.mass + p2.mass),
    dy: v1Rotated.dy,
  }

  let v2RotatedAfterCollision = {
    dx:
      (v2Rotated.dx * (p2.mass - p1.mass) + 2 * p1.mass * v1Rotated.dx) /
      (p1.mass + p2.mass),
    dy: v2Rotated.dy,
  }
  // 旋转回原来的坐标系
  let v1AfterCollision = rotateVector(v1RotatedAfterCollision, -theta)
  let v2AfterCollision = rotateVector(v2RotatedAfterCollision, -theta)

  // 更新小球的速度
  p1.dx = v1AfterCollision.dx
  p1.dy = v1AfterCollision.dy
  p2.dx = v2AfterCollision.dx
  p2.dy = v2AfterCollision.dy
}

let canvas = document.getElementById('myCanvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let ctx = canvas.getContext('2d')
let colorArr = ['#3726A6', '#4A44F2', '#F2E635', '#F2BE22', '#F20505']

function Particle(x, y, mass, dx, dy, radius, color) {
  this.x = x
  this.y = y
  this.mass = mass
  this.dx = dx
  this.dy = dy
  this.radius = radius
  this.color = color

  this.draw = function () {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }
  this.update = function (particles) {
    // 碰撞检测
    for (let p of particles) {
      if (this === p) continue
      // 发生碰撞
      if (getDistance(this.x, this.y, p.x, p.y) <= this.radius + p.radius) {
        let xVelDiff = p.dx - this.dx
        let yVelDiff = p.dy - this.dy
        let xDist = p.x - this.x
        let yDist = p.y - this.y

        if (xVelDiff * xDist + yVelDiff * yDist < 0) {
          resolveCollision(this, p)
        }
      }
    }

    if (
      this.y + this.radius + this.dy > canvas.height ||
      this.y - this.radius + this.dy < 0
    ) {
      this.dy = -this.dy
    }

    if (
      this.x + this.radius + this.dx > canvas.width ||
      this.x - this.radius + this.dx < 0
    ) {
      this.dx = -this.dx
    }
    this.x += this.dx
    this.y += this.dy
    this.draw()
  }
}

let particles

function init() {
  particles = []
  for (let i = 0; i < 100; i++) {
    let radius = randomIntFromRange(15, 20)
    let x = randomIntFromRange(radius, canvas.width - radius)
    let y = randomIntFromRange(radius, canvas.height - radius)
    // 防止初始化时粒子重叠
    for (let j = 0; j < particles.length; j++) {
      // 两个球圆心之间的距离小于它们的半径之和说明重叠
      if (
        getDistance(x, y, particles[j].x, particles[j].y) <=
        radius + particles[j].radius
      ) {
        radius = randomIntFromRange(15, 20)
        x = randomIntFromRange(radius, canvas.width - radius)
        y = randomIntFromRange(radius, canvas.height - radius)
        j = -1
      }
    }

    let mass = radius * 0.5

    let dx = randomIntFromRange(-1, 1)
    let dy = randomIntFromRange(-1, 1)
    let color = colorArr[randomColor(colorArr)]
    particles.push(new Particle(x, y, mass, dx, dy, radius, color))
  }
}

function animate() {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (const iterator of particles) {
    iterator.update(particles)
  }
}

init()
animate()

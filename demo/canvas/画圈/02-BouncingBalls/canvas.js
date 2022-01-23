let canvas = document.getElementById("myCanvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 1.创建上下文
let ctx = canvas.getContext("2d");

let mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
}
let maxRadius = 40;
window.addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    
})
window.addEventListener('resize', function (event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

let colorArr = ['#BFB300', '#7F7700', '#FFEF00', '#403C00', '#E5D700'];
/**
 * 
 * @param {*} x 
 * @param {*} y 
 * @param {*} dx 左右移动的速度
 * @param {*} dy 
 * @param {*} radius 
 * @param {*} color 
 */
function Balls(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = color;

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    this.update = function () {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // 鼠标交互
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}


let ballArr = [];
for (let i = 0; i < 200; i++) {
    let radius = Math.random() * 4 + 1;
    // 边界检测
    // 初始化时ball可能就在边界处
    // 圆心的活动范围是 0到canvas的宽-球的直径
    // 圆心的真正位置是记录左边一个半径，距离右边一个半径
    let x = Math.random() * (canvas.width - 2 * radius) + radius;
    let y = Math.random() * (canvas.height - 2 * radius) + radius;
    let dx = (Math.random() - 0.5) * 2;
    let dy = (Math.random() - 0.5) * 2;
    let color = colorArr[Math.floor(Math.random() * 5)];
    ballArr.push(new Balls(x, y, dx, dy, radius, color));
}

/**
 * 动画
 */
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const b of ballArr) {
        b.update();
    }

}

animate();
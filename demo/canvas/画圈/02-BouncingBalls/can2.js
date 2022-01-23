let canvas = document.getElementById('myCanvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');
let x = 10;
let colorArr = ['#3726A6', '#4A44F2', '#F2E635', '#F2BE22', '#F20505'];


function Balls(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    this.update = function () {
        // 边界检测
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}


// let ball = new Balls(300, 300, 10, 10, 50, '#fff000');


let ballArr = [];
for (let i = 0; i < 100; i++) {
    let radius = Math.random() * 4 + 1;
    let x = Math.random() * (canvas.width - 2 * radius) + radius;
    let y = Math.random() * (canvas.height - 2 * radius) + radius;
    let dx = (Math.random() - 0.5) * 2;
    let dy = (Math.random() - 0.5) * 2;
    let color = colorArr[Math.floor(Math.random() * 5)]
    ballArr.push(new Balls(x, y, dx, dy, radius, color));
}


function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const b of ballArr) {
        b.update();

    }
}
animate();
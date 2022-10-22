let canvas = document.getElementById('myCanvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');
let colorArr = ['#3726A6', '#4A44F2', '#F2E635', '#F2BE22', '#F20505'];
let Gravity = 0.8; //重力加速度
let Friction = 0.9; //摩擦

/**
 * 生成随机整数
 * @param {*} low 
 * @param {*} high 
 */
function randomIntFromRange(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

function randomColor(colors) {
    return Math.floor(Math.random() * colors.length);
}

window.addEventListener('click', function (event) {
    init();
})

window.addEventListener('resize', function (event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

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
        if (this.y + this.radius + this.dy + Gravity > canvas.height) {
            this.dy = -this.dy;
            this.dy *= Friction;
            this.dx *= Friction;
        } else {
            this.dy += Gravity;
        }

        if (this.x + this.radius + this.dx >= canvas.width ||
            this.x - this.radius + this.dx <= 0) {
            this.dx = -this.dx
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}


// let ball = new Balls(canvas.width / 2, canvas.height / 2, 1, 1, 80, '#ff0000');
let ballArr;

function init() {
    ballArr = [];
    for (let i = 0; i < 200; i++) {
        let radius = randomIntFromRange(5, 15);
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(radius, canvas.height - radius);
        let dx = randomIntFromRange(-5, 5);
        let dy = randomIntFromRange(-1, 1);
        let color = colorArr[randomColor(colorArr)];
        ballArr.push(new Balls(x, y, dx, dy, radius, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const iterator of ballArr) {
        iterator.update();
    }
}
init();
animate();
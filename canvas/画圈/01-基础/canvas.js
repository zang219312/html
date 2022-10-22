let canvas = document.getElementById('myCanvas');

let ctx = canvas.getContext('2d');

// ctx.fillStyle = "#ff0000";
// ctx.fillRect(0,0,150,50);

// ctx.moveTo(10,10);
// ctx.lineTo(100,100);
// ctx.stroke();

ctx.arc(100,50,50,0,2*Math.PI);
ctx.stroke();

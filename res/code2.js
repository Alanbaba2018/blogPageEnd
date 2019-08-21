
const div = document.getElementById('stage');
const canvas = document.createElement('canvas');
canvas.style.width = '100%';
canvas.style.height = '100%';
div.appendChild(canvas);
const ctx = canvas.getContext('2d');

const ratio = window.devicePixelRatio|| 1;
const width = canvas.offsetWidth * ratio;
const height = canvas.offsetHeight * ratio;

canvas.width = width;
canvas.height = height;

ctx.save();
ctx.translate(width / 2, height / 2);
ctx.scale(ratio, ratio);
ctx.beginPath();
ctx.arc(0, 0, 50, 0, Math.PI * 2);
ctx.closePath();
// 创建径向渐变色
const radial = ctx.createRadialGradient(-20, -20, 0, 0, 0, 50);
radial.addColorStop(0, '#ffffff');
radial.addColorStop(1, '#000000');
// 阴影
ctx.shadowBlur = 20;
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 10;
ctx.shadowColor = "#000000";
ctx.fillStyle = radial;
ctx.fill();
ctx.restore();

/**  beginPath 重新开始绘制路径 */
// ctx.beginPath();
// ctx.arc(0, 0, 50, 0, Math.PI * 2);
// ctx.stroke();

// 绘制扇形

ctx.save();
ctx.translate(width / 2, 160);
ctx.scale(ratio, ratio);
ctx.beginPath();
const startAngle = 30;
const endAngle = 150;
const innerRadius = 50;
const outerRadius = 80;
ctx.arc(0, 0, innerRadius, Math.PI * 2 - angleToRad(startAngle), Math.PI * 2 - angleToRad(endAngle), true); // true逆时针 默认false
ctx.arc(0, 0, outerRadius, Math.PI * 2 - angleToRad(endAngle), Math.PI * 2 - angleToRad(startAngle));
ctx.closePath();

// 创建渐变色
const gradient = ctx.createLinearGradient(0, 0, 100, 0);
gradient.addColorStop(0, '#ff0000');
gradient.addColorStop(1, '#0000ff');

ctx.fillStyle = gradient;
ctx.fill();


function angleToRad(angle) {
  return angle / 180 * Math.PI;
}
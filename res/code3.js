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

const points = [];
canvas.addEventListener('click', e => {
  points.push({x: e.offsetX * ratio, y: e.offsetY * ratio, weight: Math.random()});
  redraw();
});

function redraw() {
  ctx.clearRect(0, 0, width, height);
  for (const point of points) {
    drawPoint(point);
  }
  const image = ctx.getImageData(0, 0, width, height);
  const imageData = image.data;
  const patternData = getPatternColor();
  // 根据透明度来重新设色
  for (let i = 3; i < imageData.length; i += 4) {
    // 取透明度通道值，最大255，最小0
    const alpha = imageData[i];
    // offset 最大256 * 4，
    const offset = alpha * 4;
    imageData[i - 3] = patternData[offset];
    imageData[i - 2] = patternData[offset + 1];
    imageData[i - 1] = patternData[offset + 2];
  }
  ctx.putImageData(image, 0 ,0 , 0, 0, width, height);
}

function drawPoint({x, y, weight}) {
  let radius = 100;
  ctx.globalAlpha = weight; //设置 Alpha 透明度
  ctx.beginPath();
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, 'rgba(0,0,0,1)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}

// 创建调色板
function getPatternColor() {
  const patternCanvas = document.createElement('canvas');
  const patternCtx = patternCanvas.getContext('2d');
  patternCanvas.width = 256;
  patternCanvas.height = 1;
  const gradient = patternCtx.createLinearGradient(0, 0, 256, 1);
  gradient.addColorStop(0.25, 'rgb(0,0,255)');
  gradient.addColorStop(0.55, 'rgb(0,255,0)');
  gradient.addColorStop(0.85, 'yellow');
  gradient.addColorStop(1, 'rgb(255,0,0)');
  patternCtx.fillStyle = gradient;
  patternCtx.fillRect(0, 0, 256, 1);
  return patternCtx.getImageData(0, 0, 256, 1).data;
}
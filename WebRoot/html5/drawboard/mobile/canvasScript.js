//get canvas
var canvas = document.getElementById("canvas");
//full screen
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
//是否支持触摸
var touchable = 'createTouch' in document;
if (touchable) {
    canvas.addEventListener('touchstart', onTouchStart, false);
    canvas.addEventListener('touchmove', onTouchMove, false);
}
else
{
      alert("touchable is false !");
}
//上一次触摸坐标
var lastX;
var lastY;

var ctx =canvas.getContext("2d");
ctx.lineWidth=10;//画笔粗细
ctx.strokeStyle="#FF0000";//画笔颜色

//触摸开始事件
function onTouchStart(event) {
    event.preventDefault();
    lastX=event.touches[0].clientX;
    lastY=event.touches[0].clientY;
    drawRound(lastX,lastY);

}

//触摸滑动事件
function onTouchMove(event) {
    try
    {
      event.preventDefault();
      drawLine(lastX,lastY,event.touches[0].clientX,event.touches[0].clientY);
      lastX=event.touches[0].clientX;
      lastY=event.touches[0].clientY;
    }
    catch(err){
        alert( err.description);
    }

}

//画圆
function drawRound(x,y)
{
    ctx.fillStyle="#FF0000";
    ctx.beginPath();
    ctx.arc(x,y,5,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}
//画线
function drawLine(startX,startY,endX,endY)
{
    ctx.beginPath();
    ctx.lineCap="round";
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
}
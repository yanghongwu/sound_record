    // JavaScript Document  
        var colorKarlDraw = "black";  
        var LineWidth = 4;  
          
        function KarlChangeLineWidth()  
        {  
            var KarlColorWidth = document.getElementById("karlline").value;  
            LineWidth = KarlColorWidth;  
        }  
          
        function KarlChangeColor()  
        {  
            var KarlColor = document.getElementById("k").value;  
            colorKarlDraw = KarlColor;  
        }  
          
            window.onload = function () {  
                var canvas = document.getElementById("myCanvas");  
                var ctx = canvas.getContext("2d");  
      
                //鼠标左键按下  
                canvas.onmousedown = function (e) {  
                    //开始记录路径  
                    ctx.beginPath();  
                    //将光标焦点移动到鼠标点击的位置  
                    ctx.moveTo(e.clientX - 10, e.clientY - 10);  
                    //设置当前绘线的粗细(默认1.0)[由于画布的坐标和像素并不是直接对应的，所以，此属性会有0.5像素的偏差]  
                    ctx.lineWidth = LineWidth;  
                    //设置绘线颜色  
                    ctx.strokeStyle = colorKarlDraw;  
                    //                //设置渐变(会替换掉绘线颜色)  
                    //                var lingrad = ctx.createLinearGradient(0, 0, 0, 600);  
                    //                lingrad.addColorStop(0, "#00ABEB");  
                    //                lingrad.addColorStop(0.5, "#fff");  
                    //                lingrad.addColorStop(1, "#66CC00");  
                    //                ctx.strokeStyle = lingrad;  
      
                    //设置绘线透明度(0.0-1.0默认1.0)  
                    ctx.globalAlpha = 1.0;  
                    //设置绘线端点显示的样子(round/butt/square)  
                    ctx.lineCap = "round";  
                    //设置线段拐角连接处显示的样子(round/bevel/miter默认)  
                    ctx.lineJoin = "round";  
      
                    //当鼠标左键按下时，监听鼠标移动事件  
                    canvas.onmousemove = function (e) {  
                        //用线段连接点  
                        ctx.lineTo(e.clientX - 10, e.clientY - 10);  
                        //用笔画描绘路径[可以试一下fill(),看看是什么效果哦]  
                        ctx.stroke();  
                    }  
                }  
                //当鼠标按下后，释放鼠标时，停止监听鼠标移动事件  
                canvas.onmouseup = function (e) {  
                    canvas.onmousemove = null;  
                }  
                //直线渐变的示例  
                function drawLinear() {  
                    // Create gradients(x1,y1,x2,y2)  
                    var lingrad = ctx.createLinearGradient(0, 0, 0, 150);  
                    //上色(position,color)[position value between 0.0 and 1.0]  
                    lingrad.addColorStop(0, 'blue');  
                    lingrad.addColorStop(0.5, '#fff');  
                    lingrad.addColorStop(0.5, '#66CC00');  
                    lingrad.addColorStop(1, 'red');  
      
                    var lingrad2 = ctx.createLinearGradient(0, 50, 0, 95);  
                    lingrad2.addColorStop(0.5, '#000');  
                    lingrad2.addColorStop(1, 'rgba(0,0,0,0)');  
      
                    // assign gradients to fill and stroke styles  
                    ctx.fillStyle = lingrad;  
                    ctx.strokeStyle = lingrad2;  
      
                    // draw shapes  
                    ctx.fillRect(10, 10, 130, 130);  
                    ctx.strokeRect(50, 50, 50, 50);  
      
                }  
                //径向渐变的示例  
                function drawRadial() {  
                    var ctx = document.getElementById('myCanvas').getContext('2d');  
      
                    // Create gradients（x1,y1,r1,x2,y2,r2）  
                    var radgrad = ctx.createRadialGradient(45, 45, 10, 52, 50, 30);  
                    radgrad.addColorStop(0, '#A7D30C');  
                    radgrad.addColorStop(0.9, '#019F62');  
                    radgrad.addColorStop(1, 'rgba(1,159,98,0)');  
      
                    var radgrad2 = ctx.createRadialGradient(105, 105, 20, 112, 120, 50);  
                    radgrad2.addColorStop(0, '#FF5F98');  
                    radgrad2.addColorStop(0.75, '#FF0188');  
                    radgrad2.addColorStop(1, 'rgba(255,1,136,0)');  
      
                    var radgrad3 = ctx.createRadialGradient(95, 15, 15, 102, 20, 40);  
                    radgrad3.addColorStop(0, '#00C9FF');  
                    radgrad3.addColorStop(0.8, '#00B5E2');  
                    radgrad3.addColorStop(1, 'rgba(0,201,255,0)');  
      
                    var radgrad4 = ctx.createRadialGradient(0, 150, 50, 0, 140, 90);  
                    radgrad4.addColorStop(0, '#F4F201');  
                    radgrad4.addColorStop(0.8, '#E4C700');  
                    radgrad4.addColorStop(1, 'rgba(228,199,0,0)');  
      
                    // draw shapes  
                    ctx.fillStyle = radgrad4;  
                    ctx.fillRect(0, 0, 150, 150);  
                    ctx.fillStyle = radgrad3;  
                    ctx.fillRect(0, 0, 150, 150);  
                    ctx.fillStyle = radgrad2;  
                    ctx.fillRect(0, 0, 150, 150);  
                    ctx.fillStyle = radgrad;  
                    ctx.fillRect(0, 0, 150, 150);  
                }  
                //用图案填充画布的示例  
                function drawImage() {  
                    var ctx = document.getElementById("myCanvas").getContext("2d");  
                    var img = new Image();  
                    img.src = "Images/1.jpg";  
                    img.onload = function () {  
                        var ptrn = ctx.createPattern(img, "repeat");  
                        ctx.fillStyle = ptrn;  
                        ctx.fillRect(0, 0, 400, 400);  
                    }  
                }  
                //设置阴影的示例  
                function drawText() {  
                    var ctx = document.getElementById('myCanvas').getContext('2d');  
      
                    ctx.shadowOffsetX = 2;  
                    ctx.shadowOffsetY = 2;  
                    ctx.shadowBlur = 2;  
                    ctx.shadowColor = "lime";  
      
                    ctx.font = "20px Times New Roman";  
                    ctx.fillStyle = "black";  
                    ctx.fillText("Sample String", 5, 30);  
                }  
            }  
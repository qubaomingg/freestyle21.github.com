---
layout: post
title:  Canvas动画
description: canvas动画入门，简单实例。
category: frontend
imgsrc: img/canvasgame.jpg
---



## 引题

最近忙完实验，在慢慢开始的学习HTML5 的canvas，很早就听过动态canvas的威名，一直没有机会和时间学习。这次系统学习HTML5和css3，自然不会放过这次机会。

本文主要是总结学习canvas动画的一些基本知识，并不会介绍canvas，关于入门读者朋友可以回去翻翻书本。另外本文还会试着写几个实例，加深理解。




<br>

## canvas动画基本思想

### 思想一  刷新重绘

我们平时看到的canvas游戏
里，人物运动、物体变化都是基于这个思想。比如绘制动画的圆，我们通过鼠标触动或者重力等外界因素改变圆的圆心坐标。下一步，通过

    context.clearRect(0, 0, canvas.width, canvas.height) 

把当前canvas的画面清空。然后，再通过

    context.art(circle.x, circle.y, circle.radius, 0, Math.PI*2)

利用新的圆心坐标绘制新的圆。

刷新重绘的思想是canvas游戏的核心，任何需要移动的物体都是通过这种方式。

### 思想二 碰撞检测

碰撞检测用的比较比较频繁。比如和canvas上的圆交互的时候，需要检测点击的是哪个圆，只需循环判断触点坐标到圆心的距离与半径的关系即可。再比如迷宫游戏里面，移动人物的时候需要判断前方是否是墙壁，是墙壁的话就不能移动。这个碰撞检测的方法不太常见，是通过像素检测的方式。如果前方的像素是我们预定的墙壁的颜色，就不能移动了。

### 一些需要知道的东西

动画对于重绘速度有要求，通常每秒30次以上才不会导致出现间断的现象。由于绘制速度很快，可能你会觉得我们的画布会反应迟钝。但是，由于很多现代浏览器都使用了**硬件加速**等性能增强技术，把图像处理工作转移给显卡，从而节省了CPU。由此引申出一个css hack技术。开启硬件加速，css如下：

    transform: translateZ(0);
    transform: translate3d(0, 0, 0);


圆圈绘图程序每次刷新画布，都会先使用clearRect清楚所有，再绘制所有(比上次多). 这样不会出现闪烁，因为Canvas针对这个问题进行了优化，它实际上会在绘图逻辑执行完成后才清除或绘制所有内容。


<br>

## canvas动画实例

### 实例一 自由落体交互的小球

 要不断的移动小球，正如上面所说，就需要不断重绘canvas

    setTimeOut("drawFrame()", 20)

接下来看看drawFrame函数：
   
    function drawFrame() {
      //清空
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      //balls是一个存放我们小球的数组。
      for(var i=0; i<balls.length; i++) {

        var ball = balls[i];
        ball.x += ball.dx;
        ball.y += ball.dy;

        // 添加重力效果
        if ((ball.y) < canvas.height) ball.dy += 0.22;

        // 添加摩擦力效果
        ball.dx = ball.dx * 0.998;

        // 碰到墙反弹
        if ((ball.x + ball.radius > canvas.width) || (ball.x - ball.radius < 0)) {
          ball.dx = -ball.dx;
        }
        // 碰到地反弹注意0.96哦！
        if ((ball.y + ball.radius > canvas.height) || (ball.y - ball.radius < 0)) { 
          ball.dy = -ball.dy*0.96; 
        }

        context.fillStyle = "white";
        
        // Draw 开始绘制球
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
        context.lineWidth = 1;
        context.fill();
        context.stroke(); 
      }
      setTimeout("drawFrame()", 20);
    }

drawFrame函数是动画的核心，处理外力对小球的影响。考虑了重力摩擦力等。然后不断调整小球的坐标，刷新重绘。


下面是我们处理鼠标交互的函数

    function canvasClick(e) {
      // 触点位置
      var clickX = e.pageX - canvas.offsetLeft;
      var clickY = e.pageY - canvas.offsetTop;


      // 边界检测，看点击哪个球。
      for(var i in balls)
      {
        var ball = balls[i];
        if ((clickX > (ball.x-ball.radius)) && (clickX < (ball.x+ball.radius)))
        {
          if ((clickY > (ball.y-ball.radius)) && (clickY < (ball.y+ball.radius)))
          {
            // 改变小球的速度。
            ball.dx -= 2;
            ball.dy -= 3;
            return;
          }
        }
      }
    }

最后是增加小球和清空画布：

    function addBall() {
      var radius = parseFloat(document.getElementById("ballSize").value);
      var ball = new Ball(50,50,1,1,radius);
      balls.push(ball);
    }

    function clearBalls() {
      // 清空数组，下次重绘的就是空得了。
      balls = [];
    }

最终结果：


<canvas id="ball" width="600" height="200">your brower cannot support canvas</canvas>

<div>
    <button onclick="addBall()"> Add Ball </button>
    <button onclick="clearBalls()"> Clear Canvas </button>
</div>






### 实例二 散落的粒子

这次，写一个无数粒子构成的名字，鼠标接触马上散落各处的例子。


无数粒子是用canvas画的圆，不过半径我写成了1px。这里就不展示了。


下面看核心函数，处理小球运动的轨迹。

    function updateBalls(canvas, balls, timeDiff, mousePos) {
        var context = canvas.getContext('2d');
      	var collisionDamper = 0.3;//碰撞减缓
      	var floorFriction = 0.0005 * timeDiff;//摩擦力
      	var mouseForceMultiplier = 1 * timeDiff;//Multiplier 乘数
      	var restoreForce = 0.002 * timeDiff;

        //和上个例子一样，循环小球数组，改变每个小球的圆心坐标。
      	for(var n = 0; n < balls.length; n++) {
            var ball = balls[n];
		        
            // 改变圆心坐标
      	    ball.y += ball.vy;
            ball.x += ball.vx;
            // 恢复力，最后要静止。
      	    if(ball.x > ball.origX) {
      		      ball.vx -= restoreForce;
            } else {
      		      ball.vx += restoreForce;
            }

            if(ball.y > ball.origY) {
      		      ball.vy -= restoreForce;
            } else {
      		      ball.vy += restoreForce;
            }

            // 鼠标给的力
            var mouseX = mousePos.x;
      	    var mouseY = mousePos.y;
      	    var distX = ball.x - mouseX;//判断左右的。
      	    var distY = ball.y - mouseY;
            var radius = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
            var totalDist = Math.abs(distX) + Math.abs(distY);
            var forceX = (Math.abs(distX) / totalDist) * (1 / radius) *   mouseForceMultiplier;
      	    var forceY = (Math.abs(distY) / totalDist) * (1 / radius) * mouseForceMultiplier;

      	    if(distX > 0) {
          		 // 如果从左边触动小球
          		 ball.vx += forceX;
            } else {
      		     ball.vx -= forceX;
            }
            if(distY > 0) {
          		 // 从上方触动小球
          		 ball.vy += forceY;
            } else {
      		     ball.vy -= forceY;
            }

            // 考虑地板摩擦力
            if(ball.vx > 0) {
      		      ball.vx -= floorFriction;
            } else if(ball.vx < 0) {
      		      ball.vx += floorFriction; 
            }
      	    if(ball.vy > 0) {
      		      ball.vy -= floorFriction;
            } else if(ball.vy < 0) {
      		      ball.vy += floorFriction;
      	    }

      	    // 碰到地板反弹
            if(ball.y > (canvas.height - ball.radius)) {
        		   ball.y = canvas.height - ball.radius - 2;
        		   ball.vy *= -1;
        		   ball.vy *= (1 - collisionDamper);
            }

            // 碰到上顶反弹
      	    if(ball.y < (ball.radius)) {
        		   ball.y = ball.radius + 2;
        		   ball.vy *= -1;
        		   ball.vy *= (1 - collisionDamper);
            }

            // 碰到右边反弹
            if(ball.x > (canvas.width - ball.radius)) {
        		   ball.x = canvas.width - ball.radius - 2;
        		   ball.vx *= -1;
        		   ball.vx *= (1 - collisionDamper);
           }

            // 碰到左边反弹
            if(ball.x < (ball.radius)) {
        		   ball.x = ball.radius + 2;
        		   ball.vx *= -1;
        		   ball.vx *= (1 - collisionDamper);
            }
        }
   }

就像注释的一样，考虑了反弹、地板摩擦力、鼠标力、恢复力等。通过这个函数改变小球的位置。


剩下其他几个不太重要的函数就不写了，主要是循环小球数组重绘，寻找鼠标触点位置等，和第一个差不多。

效果（本来想写freestyle的，太多了，懒得去复制后面的。）：

<canvas id="canvasball" width="600" height="200">your brower cannot support canvas</canvas>







<script src='../js/canvasinit.js'>
  
</script>


<script src='../js/canvasgame.js'>
  
</script>

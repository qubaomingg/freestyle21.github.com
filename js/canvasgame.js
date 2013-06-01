
  window.requestAnimFrame = (function(callback) {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
          function(callback) {
            window.setTimeout(callback, 1000 / 60);
          };
    })();
    function getMousePos(canvas, evt) {
        var obj = canvas;
        var top = 0;
        var left = 0;
        while(obj.tagName != 'BODY') {
          top += obj.offsetTop;
          left += obj.offsetLeft;
          obj = obj.offsetParent;
        }
        var mouseX = evt.clientX - left + window.pageXOffset;
        var mouseY = evt.clientY - top + window.pageYOffset;
        return {
              x: mouseX,
              y: mouseY
        };
    }
    function updateBalls(canvas, balls, timeDiff, mousePos) {
        var context = canvas.getContext('2d');
        var collisionDamper = 0.3;//碰撞减缓
        var floorFriction = 0.0005 * timeDiff;//摩擦力
        var mouseForceMultiplier = 1 * timeDiff;//Multiplier 乘数
        var restoreForce = 0.002 * timeDiff;

        for(var n = 0; n < balls.length; n++) {
            var ball = balls[n];
            
            // set ball position based on velocity
            ball.y += ball.vy;
            ball.x += ball.vx;

            // restore forces
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

            // mouse forces
            var mouseX = mousePos.x;
            var mouseY = mousePos.y;
            var distX = ball.x - mouseX;
            var distY = ball.y - mouseY;
            var radius = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
            var totalDist = Math.abs(distX) + Math.abs(distY);
            var forceX = (Math.abs(distX) / totalDist) * (1 / radius) * mouseForceMultiplier;
            var forceY = (Math.abs(distY) / totalDist) * (1 / radius) * mouseForceMultiplier;

            if(distX > 0) {
              // mouse is left of ball
                ball.vx += forceX;
            } else {
                ball.vx -= forceX;
            }
            if(distY > 0) {
              // mouse is on top of ball
                ball.vy += forceY;
            } else {
                ball.vy -= forceY;
            }

            // floor friction
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

            // floor condition
            if(ball.y > (canvas.height - ball.radius)) {
                ball.y = canvas.height - ball.radius - 2;
                ball.vy *= -1;
                ball.vy *= (1 - collisionDamper);
            }

            // ceiling condition
            if(ball.y < (ball.radius)) {
                ball.y = ball.radius + 2;
                ball.vy *= -1;
                ball.vy *= (1 - collisionDamper);
            }

            // right wall condition
            if(ball.x > (canvas.width - ball.radius)) {
                ball.x = canvas.width - ball.radius - 2;
                ball.vx *= -1;
                ball.vx *= (1 - collisionDamper);
            }

            // left wall condition
            if(ball.x < (ball.radius)) {
                ball.x = ball.radius + 2;
                ball.vx *= -1;
                ball.vx *= (1 - collisionDamper);
            }
        }
    }
    function Ball(x, y, vx, vy, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.origX = x;
        this.origY = y;
        this.radius = 1;
    }
    function animate(canvas, balls, lastTime, mousePos) {
        var context = canvas.getContext('2d');

        // update
        var date = new Date();
        var time = date.getTime();
        var timeDiff = time - lastTime;
        updateBalls(canvas, balls, timeDiff, mousePos);
        lastTime = time;

        // clear
        context.clearRect(0, 0, canvas.width, canvas.height);

        // render
        for(var n = 0; n < balls.length; n++) {
          var ball = balls[n];
          context.beginPath();
          context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
          context.fillStyle = ball.color;
          context.fill();
        }

        // request new frame
        requestAnimFrame(function() {
          animate(canvas, balls, lastTime, mousePos);
        });
    }
      var canvas = document.getElementById('canvasball');
      var balls = initBalls();
      var date = new Date();
      var time = date.getTime();
       /*
        * set mouse position really far away
        * so the mouse forces are nearly obsolete
     */
    var mousePos = {
        x: 9999,
        y: 9999
    };

    canvas.addEventListener('mousemove', function(evt) {
    var pos = getMousePos(canvas, evt);
    mousePos.x = pos.x;
    mousePos.y = pos.y;
    });

    canvas.addEventListener('mouseout', function(evt) {
    mousePos.x = 9999;
    mousePos.y = 9999;
    }); 
    animate(canvas, balls, time, mousePos);



//ball
 function BallSimple(x, y, dx, dy, radius) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.strokeColor = "black";
      this.fillColor = "red";
    }


    var ballscollection = [];

    var canvassimple;
    var contextsimple;

    window.onload = function() {
      canvassimple = document.getElementById("ball");
      contextsimple = canvassimple.getContext("2d");

      canvassimple.onmousedown = canvasClick;

      setTimeout("drawFrame()", 20);
    };

    function addBall() {
      var radius = '10';
      var ball = new BallSimple(50,50,1,1,radius);
      ballscollection.push(ball);
    }

    function clearBalls() {
      // Remove all the balls.
      ballscollection = [];
    }


    function drawFrame() {
      contextsimple.clearRect(0, 0, canvassimple.width, canvassimple.height);
      contextsimple.beginPath();

      for(var i=0; i<ballscollection.length; i++) {

        var ball = ballscollection[i];
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Add in a "gravity" effect that makes the ball fall faster.
        if ((ball.y) < canvassimple.height) ball.dy += 0.22;

        // Add in a "friction" effect that slows down the ball's side-to-side motion.
        ball.dx = ball.dx * 0.998;

        // If the ball has hit the side, bounce it.
        if ((ball.x + ball.radius > canvassimple.width) || (ball.x - ball.radius < 0)) {
          ball.dx = -ball.dx;
        }
        // If the ball has hit the bottom, bounce it, but slow it down slightly.
        if ((ball.y + ball.radius > canvassimple.height) || (ball.y - ball.radius < 0)) { 
          ball.dy = -ball.dy*0.96; 
        }

        
        contextsimple.beginPath();
        contextsimple.fillStyle = ball.fillColor;

        // Draw the ball.
        contextsimple.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
        contextsimple.lineWidth = 1;
        contextsimple.fill();
        contextsimple.stroke(); 
      }

      // Draw the next frame in 20 milliseconds.
      setTimeout("drawFrame()", 20);
    }

function canvasClick(e) {
  // Get the canvas click coordinates.
  var clickX = e.pageX - canvassimple.offsetLeft;
  var clickY = e.pageY - canvassimple.offsetTop;


  // Look for the clicked ball.
  for(var i in ballscollection)
  {
    var ball = ballscollection[i];
    if ((clickX > (ball.x-ball.radius)) && (clickX < (ball.x+ball.radius)))
    {
      if ((clickY > (ball.y-ball.radius)) && (clickY < (ball.y+ball.radius)))
      {
        // Change the clicked ball's speed.
        ball.dx -= 2;
        ball.dy -= 3;
        return;
      }
    }
  }
}
  "use strict";

  // background animation
  (function() {

    var Base, Particle, canvas, colors, context, draw, drawables, i, mouseX, mouseY, mouseVX, mouseVY, rand, update, click, min, max, colors, particles;

    min = 1;
    max = 8;
    particles = 1000;
    colors = ["64, 32, 0", "250, 64, 0", "64, 0, 0", "200, 200, 200"];

    rand = function(a, b) {
      return Math.random() * (b - a) + a;
    };

    Particle = (function() {
      function Particle() {
        this.reset();
      }

      Particle.prototype.reset = function() {
        this.color = colors[~~(Math.random()*colors.length)];
        this.radius = rand(min, max);
        this.x = rand(0, canvas.width);
        this.y = rand(-20, canvas.height*0.5);
        this.vx = -5 + Math.random()*10;
        this.vy = 0.7 * this.radius;
        this.valpha = rand(0.02, 0.09);
        this.opacity = 0;
        this.life = 0;
        this.onupdate = undefined;
        this.type = "dust";
      };

      Particle.prototype.update = function() {
        this.x = (this.x + this.vx/3);
        this.y = (this.y + this.vy/3);

        if(this.opacity >=1 && this.valpha > 0) this.valpha *=-1;
        this.opacity += this.valpha/3;
        this.life += this.valpha/3;

        if(this.type === "dust")
          this.opacity = Math.min(1, Math.max(0, this.opacity));
        else
          this.opacity = 1;

        if(this.onupdate) this.onupdate();
        if(this.life < 0 || this.radius <= 0 || this.y > canvas.height){
          this.onupdate = undefined;
          this.reset();
        }
      };

      Particle.prototype.draw = function(c) {
        c.strokeStyle = "rgba(" + this.color + ", " + Math.min(this.opacity, 0.85) + ")";
        c.fillStyle = "rgba(" + this.color + ", " + Math.min(this.opacity, 0.65) + ")";
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
        c.fill();
        c.stroke();
      };

      return Particle;

    })();

    mouseVX = mouseVY = mouseX = mouseY = 0;

    canvas = document.getElementById("bg");
    context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    drawables = (function() {
      var _i, _results;
      _results = [];
      for (i = _i = 1; _i <= particles; i = ++_i) {
        _results.push(new Particle);
      }
      return _results;
    })();

    draw = function() {
      var d, _i, _len;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      context.clearRect(0, 0, canvas.width, canvas.height)

      for (_i = 0, _len = drawables.length; _i < _len; _i++) {
        d = drawables[_i];
        d.draw(context);
      }
    };

    update = function() {
      var d, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = drawables.length; _i < _len; _i++) {
        d = drawables[_i];
        _results.push(d.update());
      }
      return _results;
    };

    document.onmousemove = function(e) {
      mouseVX = mouseX;
      mouseVY = mouseY;
      mouseX = ~~e.pageX;
      mouseY = ~~e.pageY;
      mouseVX = ~~((mouseVX - mouseX)/2);
      mouseVY = ~~((mouseVY - mouseY)/2);

    };

    window.addEventListener('resize', draw, false);
    setInterval(draw, 1000 / 30);
    setInterval(update, 1000 / 60);
  }).call(this);

  function makeTimer() {

    //		var endTime = new Date("29 April 2018 9:56:00 GMT+01:00");	
      var endTime = new Date("09 January 2022 11:00:00 GMT+01:00");			
        endTime = (Date.parse(endTime) / 1000);
  
        var now = new Date();
        now = (Date.parse(now) / 1000);
  
        var timeLeft = endTime - now;
  
        var days = Math.floor(timeLeft / 86400); 
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
    
        if (hours < "10") { hours = "0" + hours; }
        if (minutes < "10") { minutes = "0" + minutes; }
        if (seconds < "10") { seconds = "0" + seconds; }
  
        $("#days").html(days + "<span>Days</span>");
        $("#hours").html(hours + "<span>Hours</span>");
        $("#minutes").html(minutes + "<span>Minutes</span>");
        $("#seconds").html(seconds + "<span>Seconds</span>");		
  
    }
  
    setInterval(function() { makeTimer(); }, 1000);

    (function () {
      const second = 1000,
            minute = second * 60,
            hour = minute * 60,
            day = hour * 24;
    
      //I'm adding this section so I don't have to keep updating this pen every year :-)
      //remove this if you don't need it
      let today = new Date(),
          dd = String(today.getDate()).padStart(2, "0"),
          mm = String(today.getMonth() + 1).padStart(2, "0"),
          yyyy = today.getFullYear(),
          nextYear = yyyy ,
          dayMonth = "01/11/",
          birthday = dayMonth + yyyy;
      
      today = mm + "/" + dd + "/" + yyyy;
      if (today > birthday) {
        birthday = dayMonth + nextYear;
      }
      //end
      
      const countDown = new Date(birthday).getTime(),
          x = setInterval(function() {    
    
            const now = new Date().getTime(),
                  distance = countDown - now;
    
            document.getElementById("days").innerText = Math.floor(distance / (day)),
              document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
              document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
              document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);
    
            //do something later when date is reached
            if (distance < 0) {
              document.getElementById("headline").innerText = "It's my birthday!";
              document.getElementById("countdown").style.display = "none";
              document.getElementById("content").style.display = "block";
              clearInterval(x);
            }
            //seconds
          }, 0)
      }());
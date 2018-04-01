void function() {
			
    "use strict";

    const _2PI = 2.0 * Math.PI;

    class Planet {
        constructor(x,y,radius,colour,parent,orbitDistance,orbitSpeed) {
            this.x = 0;
            this.y = 0;
            this.originX = x;
            this.originY = y;
            this.radius = radius;
            this.colour = colour;
            this.parent = parent || null;
            this.orbitDistance = parent ? orbitDistance : 0;
            this.orbitSpeed = parent ? orbitSpeed : 0;
            this.orbitAngle = 0.0;
        }

        tick() {
            this.orbitAngle += this.orbitSpeed;
            if (this.orbitAngle > _2PI) {
                this.orbitAngle = 0.0;
            }

            this.x = (this.parent ? this.parent.x : this.originX) + Math.cos(this.orbitAngle) * this.orbitDistance;
            this.y = (this.parent ? this.parent.y : this.originY) + Math.sin(this.orbitAngle) * this.orbitDistance;
        }

        render(ctx) {
            ctx.strokeStyle = "black";
            ctx.fillStyle = this.colour;
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.radius,0.0,_2PI,false);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
    }

    let canvasWidth = '100%';
    let canvasHeight = '100%';
    let canvas = null;
    let ctx = null;
    let sun = null;
    let earth = null;
    let moon = null;

    function loop() {

        // Update orbits
        sun.tick();
        earth.tick();
        moon.tick();

        // Clear canvas
        ctx.fillStyle = "#444444";
        ctx.fillRect(0,0,canvasWidth,canvasHeight);

        // Render planets
        sun.render(ctx);
        earth.render(ctx);
        moon.render(ctx);

        // Keeps the loop running at 60 fps
        requestAnimationFrame(loop);
    }

    window.onload = function() {
        canvas = document.getElementById("canvas");
        document.getElementById('canvas').style.width = canvasWidth;
        document.getElementById('canvas').style.height = canvasHeight;
        ctx = canvas.getContext("2d");

        sun = new Planet(90,80,10,"orange");
        earth = new Planet(0,0,5,"blue",sun,60,0.0125);
        moon = new Planet(0,0,3,"#777777",earth,10,0.025);

        loop();
    }

}();
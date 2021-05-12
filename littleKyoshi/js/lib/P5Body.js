/*

 ** creates and holds a Matter.js body and adds it to a world

 ** draws a rectagle or image in the p5 canvas

 ** adds the body to the bodies object to be drawn on the p5 draw loop

 */



class P5Body {



  constructor(x = 10, y = 10, w = 10, h = 10, options = {}, shape = 'rect') {

    this.w = w;

    this.h = h;

    this.radius = 0;

    this.color = 100;

    this.stroke = 0;

    this.strokeWeight = 1;

    this.img = false;

    this.body = Matter.Bodies.rectangle(x, y, this.w, this.h, options);

    this.xScale = this.yScale = 1;

    this.over = _ => null;

    this.under = _ => null;

    // explore later having other shapes here;

    if (!window.engine) window.engine = Matter.Engine.create(); //creates engine if it doesn't exist

    if (!window.everybody) window.everybody = { //creates everybody object if it doesn't exist

      bodies: [],

      draw: _ => window.everybody.bodies.forEach(b => b.draw()),

      update: _ => Matter.Engine.update(engine), // call everybody.update(); in the draw()

      add: b => {

        window.everybody.bodies.push(b);

        Matter.World.add(engine.world, b.body);

      }

    };

    everybody.add(this);

    Matter.Events.on(engine, "afterUpdate", _ => {

      this.getStats();

      if (this.before) this.before(); // do before drawing

      this.draw();

      if (this.after) this.after(); // do after the drawing

    });

  }



  getStats() {

    this.x = this.body.position.x;

    this.y = this.body.position.y;

    this.vx = this.body.velocity.x;

    this.vy = this.body.velocity.y;

    this.pos = createVector(this.x, this.y)

    this.vel = createVector(this.vx, this.vy);

  }



  draw() {

    push();

    translate(this.x, this.y);

    rotate(this.body.angle);

    if(this.under) this.under();

    if (this.img) {

      scale(this.xScale, this.yScale);

      image(this.img, -this.img.width / 2, -this.img.height / 2);

    } else {

      fill(this.color);

      stroke(this.stroke);

      strokeWeight(this.strokeWeight);

      rectMode(CENTER);

      rect(0, 0, this.w, this.h, this.radius);

    }

    if(this.over) this.over();

    pop();

  }



  addVelocity(vx = 0, vy = 0) {

    if (typeof vx === 'number') Matter.Body.setVelocity(this.body, Matter.Vector.add(this.body.velocity, {

      x: vx,

      y: vy

    }));

    else Matter.Body.setVelocity(this.body, Matter.Vector.add(this.body.velocity, vx));

  }



  factorVelocity(fx = 1, fy = 1, fa = 1) {

    Matter.Body.setVelocity(this.body, {

      x: this.body.velocity.x * fx,

      y: this.body.velocity.y * fy

    });

    Matter.Body.setAngularVelocity(this.body, this.body.angularVelocity * fa);

  };



  set static(b) {

    Matter.Body.setStatic(this.body, b);

  }



  set velocity(v) { // v is a vector

    Matter.Body.setVelocity(this.body, v);

  }



  set angularVelocity(n) {

    Matter.Body.setAngularVelocity(this.body, n);

  }



}
class Kyoshi extends P5Body {

  constructor(x = 10, y = 10) {
    let h = kyoshis[0].height;
    let w = 10;
    super(x, y, w, h, {
      friction: 0.5,
      restitution: 0.3
    });
    this.h = h;
    this.w = w;
    this.friction = 0.5;
    this.img = kyoshis[0];
    this.moving = this.jumping = false;
    this.topSpeed = 3;
    this.scale = [1, 1];
    power.ca = opacate(power.c, 0.68);
  }

  before() {
    this.bending = this.teleing || this.selfing || this.hurling;
    if (this.hurling && power.t > 20) this.hurling = false;
    this.body.collisionFilter.group = this.bending ? -1 : 0;
    this.angularVelocity = 0;
    //image sprite selection
    if (this.toSelf && this.toTele) hero.img = kyoshis[2];
    else if (this.toSelf) hero.img = kyoshis[1];
    else if (this.toTele) hero.img = kyoshis[3];
    else hero.img = kyoshis[0];
    //drawing
    let dx = mouseX - this.x;
    let d = dir(typeof this.moving === 'number' ? this.moving : dx);
    this.xScale = d ? d : this.d;
  }

  after() {
    let dx = mouseX - this.x;
    let grounded = true;
    let sx = abs(this.vx);
    if (grounded && this.moving) {
      if (typeof this.moving === 'number') {
        if (sx < this.topSpeed) this.addVelocity(this.moving);
      } else {
        if (abs(mouseX - this.x) < this.topSpeed * 5) this.factorVelocity(0.83);
        else if (sx < this.topSpeed) this.addVelocity(dir(dx) / 5);
      }
    }
  }

  over() {
    console.log(this.bending);
    if (this.bending) this.drawBending();
  }

  drawBending() {
    if (!this.bending) return power.t = 0;
    tint(power.ca);
    image(this.img, -this.img.width / 2, -this.h / 2);
    //earth bending 
    let pt = power.t % power.LOOP;
    //if (this.toSelf && !this.selfing) this.selfing = power.t > 2 * dt;
    //if (this.toTele && !this.selfing && !this.selfing) this.selfing = power.t > 2 * dt;
    let focus = createVector(0, 0);
    let mouse = p5.Vector.sub(createVector(mouseX, mouseY), this.pos);
    mouse.x *= this.d;
    if (!this.selfing) focus = mouse.copy(mouse);
    if (this.teleing && this.toSelf) {
      focus.x = map(pt, 0, power.LOOP, hero.pos.x, mouseX);
      focus.y = map(pt, 0, power.LOOP, hero.pos.y, mouseY);
    }
    push();
    stroke(power.c);
    strokeWeight(0.5);
    line(0, 0, mouse.x, mouse.y);
    fill(opacate(power.c, .68));
    circle(focus.x, focus.y, map(pt, 0, power.LOOP, 0, 100 * power.p));
    pop();
    power.t += 1;
  }

  move(dx = true) {
    if (typeof dx === 'boolean') this.moving = dx;
    else this.moving = this.moving === 'boolean' ? dx : dir(dx) + this.moving;
    this.body.friction = this.moving ? 0 : this.friction;
  }

  jump() {
    this.addVelocity(0, -1.5 * this.topSpeed);
  }

  bendIn(start = true) {
    this.toSelf = this.selfing = start;
  }

  bendAway(start = true) {
    if (!start) return this.toTele = this.teleing = false;
    if (this.selfing) {
      this.hurling = true;
      power.t = 0;
      return this.selfing = false;
    }
    this.teleing = this.toTele = true;
  }

}
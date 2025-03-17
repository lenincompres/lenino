export class Segment {
  constructor({ x = 0, y = 0, angle, weight, rotation = 0, level = 0, on = false} = {}) {
    this.x = x;
    this.y = y;
    this.radius = level * (2 * weight + 2);
    this.level = level;
    let a = PI/30/level;
    this.margin = PI/30/level;
    this.angle = angle;
    this.weight = weight;
    this.rotation = rotation;
    this.on = on;
    this.hover = false;
  }

  show() {
    push();
    colorMode(HSL, 100);
    noFill();
    translate(this.x, this.y);
    rotate(this.rotation + this.margin/2);
    strokeWeight(this.weight - 2);
    strokeCap(SQUARE);
    stroke(0,0,100, 50);
    arc(0, 0, this.radius, this.radius, 0, this.angle - this.margin);
    let h = map(this.rotation + this.margin/2, 0, TWO_PI, 0, 100);
    let l = this.on || this.hover ? 50 : 100;
    let a = this.hover && this.on ? 45 : this.hover ? 15 : this.on ? 100 : 0;
    stroke(h, 70, 50, a);
    arc(0, 0, this.radius, this.radius, 0, this.angle - this.margin);
    pop();
  }
}

export default Segment;
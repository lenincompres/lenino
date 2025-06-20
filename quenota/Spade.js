let spades = [];
let isSustain = false;

class Spade extends Dot {
  constructor(x, y, size, angle, speed) {
    super(x, y, size / 4);
    this.ini = this.position.copy();
    if (speed === undefined) speed = Spade.speed();
    this.velocity = createVector(sin(angle), -cos(angle));
    this.velocity.setMag(speed);
    this.sat = 50;
    this.bright = 50;
    this.hue = 0;
    this.reactive = false;
    spades.push(this);
    this.t = 0;
    this.sustain = isSustain;
  }

  get size() {
    return 4 * this.mass;
  }

  get angle() {
    return atan2(this.velocity.y, this.velocity.x);
  }

  draw(show) {
    push();
    translate(this.position.x, this.position.y);
    noStroke();
    fill(this.hue, this.sat, this.bright, 0.68);
    if(show) Suit.drawSpade(0, 0, this.size, this.angle);
    noFill();
    let tresh = 0.25;
    let pulse = 1 + tresh * sin(this.t * this.bright / Note.TOTAL);
    let dis = map(abs(1 - pulse), 0, tresh, 1, 0);
    stroke(this.hue, 100, 100, dis, 0.86);
    strokeWeight(dis * 0.1 * this.size);
    if(show) Suit.drawSpade(0, 0, this.size * pulse, this.angle);
    pop();
    this.update();
  }

  update() {
    if (this.dead) return;
    super.update();
    let decay = map(this.velocity.mag(), 0, Spade.speed(), 1, 0.99);
    this.acceleration.mult(decay);
    this.t += 1;
    // bounds
    this.tip = this.velocity.copy().setMag(this.size / 3);
    this.tip.add(this.position);
    let [x, y] = [this.tip.x, this.tip.y];
    if (x < 0 || x > width || y < 0 || y > height) this.land();
    // decay
    this.velocity.mult(decay);
    if (this.decay && !this.sustain) decay *= 0.8;
    this.mass *= decay ;
    // die
    if (this.size <= 1) this.die();
  }

  land() {
    //this.velocity.setMag(0.1);
    this.position.sub(this.velocity);
    let size = 0.5 * sqrt(this.size);
    if (!this.landed) size += 4 * Spade.speed() * sqrt(this.t);
    if(onSpadeLanded) onSpadeLanded(this);
    this.landed = true;
  }

  die() {
    this.dead = true;
    spades = spades.filter(s => s !== this);
  }

  static getCounter() {
    let counter = {};
    Note.names.forEach(n => counter[n] = 0);
    spades.forEach(spade => counter[spade.note.name] += spade.mass);
    return counter;
  }

  static drawSpades(show = true) {
    spades.forEach(spade => spade.draw(show));
  }

  static speed() {
    return min(width, height) / 200;
  }

  static addSpade(id, vel) {
    let note = new Note(id);
    let len = 8 * Spade.speed();
    let trunk = 10 * Spade.speed();
    let spade = new Spade(
      width / 2, height / 2,
      map(vel, 0, 200, 0, 100 * Spade.speed()),
      note.angle,
      map(note.id, Note.MIN - 24, Note.MAX, 0, 2 * len),
    );
    spade.hue = note.hue;
    spade.sat = note.sat;
    spade.bright = note.bright;
    spade.id = id;
    spade.note = note;
  }

  static endSpade(id) {
    let mover = spades.filter(m => m.id === id).pop();
    if (mover) mover.decay = true;
  }

  static sustain(bool) {
    isSustain = !!bool;
    spades.forEach(s => s.sustain = s.decay ? false : isSustain);
  }

}
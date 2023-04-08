let clovers = [];

class Clover {
  constructor(x, y, angle, mass){
    this.pos = createVector(x, y);
    this.mass = 1;
    this.growth = mass;
    this.angle = angle;
    this.decay = 0.995;
  }

  get growth(){
    return this._growth;
  }

  set growth(v){
    this._growth = v;
  }

  draw(){ 
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    stroke(this.hue, 100, 100);
    fill(this.hue, 100, 100);
    Suit.drawClover(0, 0, 0, sqrt(this.mass));
    pop();
    this.update();
  }

  update(){
    this.mass =  lerp(this.mass, this.growth, 0.5);
    this.growth *= this.decay;
    if (this.mass <= 1) this.die();
  }

  die(){
    clovers = clovers.filter(c => c !== this);
  }

  static addClover(x, y, note, mass){
    let clover = clovers.find(c => c.id === note.index);
    if(clover) return clover.growth += mass;
    clover = new Clover(x, y, note.angle, mass);
    clover.hue = note.hue;
    clover.sat = note.sat;
    clover.bright = note.bright;
    clover.id = note.index;
    clover.note = note;
    clovers.push(clover);
  }

  static drawClovers() {
    clovers.forEach(clover => clover.draw());
  }
}
const TIME = (new Date).getTime();
const [SHOW, PRESHOW, GO, PREGO, PREPUSH, PUSH] = ["show", "preshow", "go", "prego", "push", "prepush"];

class Ball {
  constructor(m, x, y = 0, c){
    if(x === undefined) x = random(width);
    this.M = 0.002 * width * height; // Medium mass 
    this.S = 2 * sqrt(this.M/PI); // max speed
    
    if(m === undefined) m = this.M;
    m = max(randomGaussian(m, 0.1 * m), 0.2 * this.M);
    colorMode(HSL, 100);
    let h = (TIME + 100 * x / width) % 100;
    if(c === undefined) c = color(h, 60, 45);
    this.color = c;
    this.m = m;
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0.001 * this.M);
    this.frix = FRIX;
    this.front = this.vel.copy().setMag(this.r);
    this.hits = [];
    
    this.traits = [];
    this.traitsList = [];
  } 
  
  addTrait(name, str = ""){
    let trait = eval(`new ${name}(this, "${str}")`);
    if(trait.failed) return;
    this.traits.push(trait);
    if(!trait.remove) this.traitsList.push({
      name: name,
      str: trait.str,
      trait: trait,
    });
  }
  
  
  doTraits(func, args) {
    if(!Array.isArray(args)) args = [args];
    this.traits.forEach(t => t[func] ? t[func](...args) : null);
  }
  
  removeTrait(trait){
    this.traits = this.traits.filter(t => t!== trait);
    this.traitsList = this.traitsList.filter(t => t.trait !== trait);
  }
  
  hasTrait(name){
    return this.traitsList.filter(t => t.name === name).length;
  }
  
  get x(){
    return this.pos.x;
  }
  set x(v){
    this.pos.x = v;
  }
  
  get y(){
    return this.pos.y;
  }
  set y(v){
    this.pos.y = v;
  }
  
  get m(){
    return this._size;
  }
  
  set m(val){
    if(val < 0.1 * this.M) return this.done = true;
    this._size = val;
    this.d = 2 * sqrt(val / PI);
    this.r = 0.5 * this.d;
  }
  
  get h(){
    return hue(this.color);
  }
  
  set h(val){
    if(val < 0) return this.h = val + 100;
    if(val > 100) return this.h = val - 100;
    this.color = color(val, this.s, this.l);
  }
  
  get s(){
    return saturation(this.color);
  }
  
  set s(val){
    if(val < 0) return this.s = val + 100;
    if(val > 100) return this.s = val - 100;
    this.color = color(this.h, val, this.l);
  }
  
  get l(){
    return lightness(this.color);
  }
  
  set l(val){
    if(val < 0) return this.l = val + 100;
    if(val > 100) return this.l = val - 100;
    this.color = color(this.h, this.s, val);
  }
  
  show(){
    if(this.done) return;
    this.doTraits(PRESHOW);
    push();
    translate(this.pos);
    noStroke();
    fill(this.color);
    circle(0, 0, this.d);
    pop();
    this.doTraits(SHOW);
  }
  
  go(){
    if(this.done) return;
    this.doTraits(PREGO);
    if(this.vel.mag() > this.S) this.vel.setMag(this.S);
    this.pos.add(this.vel);
    let [T, B, L, R] = [0, height - this.r, this.r, width - this.r];
    if(this.m < 0.3 * this.M) {
      [T, B, L, R] = [T - this.d, B + this.d, L - this.d, R + this.d];
      if(this.y > B ||this.y < T || this.x > R || this.x < L) this.done = true;
    }
    if(this.x < L || this.x > R) {
      this.x = constrain(this.x, L + 1, R - 1);
      this.vel.y *= this.frix;
      this.vel.x *= -this.frix;
    }
    if(this.y < T || this.y > B) {
      this.y = constrain(this.y, T + 1, B - 1);
      this.vel.y *= -this.frix;
      this.vel.x *= this.frix;
    }
    this.vel.mult(DRAG);
    
    this.front.lerp(this.vel, 0.68).setMag(this.r);
    
    this.hits = [];
    
    this.doTraits(GO);
  }
  
  push(force, collided = false){
    if(this.done) return;
    this.doTraits(PREPUSH, force, collided);
    this.vel.add(force);
    //chip away as they collide
    if(collided) this.m -= force.mag() * 0.001 * this.M;
    this.doTraits(PUSH, force, collided);
  }
  
  pull(x, y, strength){
    if(strength <= 0) return;
    let pull = createVector(x, y).sub(this.pos);
    let d = pull.mag();
    if(d < this.r) return;
    pull.setMag(strength / d);
    this.push(pull.setMag(strength))
  }
  
  hit(that){
    if(Array.isArray(that)) return that.map(t => this.hit(t));
    if(that === this) return;
    if(that.hits.includes(this)) return this.hits.push(that);
    
    let force = p5.Vector.sub(this.pos, that.pos);
    let d = this.r + that.r - force.mag();
    if(d <= 0) return;
    let mag = 0.03 * d * d;
    let ratio = this.m / (this.m + that.m);
    this.push(force.setMag(mag * ratio), true);
    that.push(force.setMag(-mag * (1 - ratio)), true);
    this.hits.push(that);
    return(that);
  }
  
}


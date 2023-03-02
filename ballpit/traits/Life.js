const LIFE = "Life";

class Life {
  constructor(ball){
    if(ball.dead) return this.failed = true;
    if(ball.hasTrait(LIFE)) return this.failed = true;
    this.ball = ball;
    ball.pain = 0;
    ball.t = 0;
    //this.ball.m *= 0.9;
    ball.babyM = this.ball.M;
    ball.adultM = 2 * this.ball.babyM;
    ball.maxPain = () => 2 * this.ball.m * this.ball.babyM / this.ball.adultM;
    ball.painRatio = () => ball.pain / ball.maxPain();
    ball.grow = (pct = 1, pos = true) => {
      let f = pct * 0.00005 * ball.M / frameRate();
      f *= (pos ? 1 : -1);
      this.ball.m += f * this.ball.m;
      this.ball.front.setMag(this.ball.r);
      if(this.ball.m >= this.ball.adultM) this.split();
    }
    
    ball.die = () => {
      this.ball.dead = true;
      this.ball.pain = 0;
    }
  }
  
  show(){
    if(this.ball.dead) return;
    let painR = this.ball.painRatio();
    this.ball.shade = map(painR, 0, 1, 0, 34);
    this.ball.shade = color(this.ball.h, this.ball.s - this.ball.shade, this.ball.l - this.ball.shade * 0.2);
    this.ball.shade.setAlpha(this.ball.dead ? 42 : 68);
    let pulse = (this.ball.t % 180) / PI;
    pulse = sin(pulse * (0.15 + painR));
    pulse = 8 * pulse + 4;
    pulse = color(this.ball.h, this.ball.s + pulse, this.ball.l + pulse);
    let pit = map(this.ball.m, 0, this.ball.adultM, 0, 1);
    pit = constrain(pit, 0, 1) * this.ball.d;
    
    push();
    translate(this.ball.pos);
    fill(this.ball.shade);
    strokeWeight(this.ball.r * 0.06);
    stroke(this.ball.color);
    circle(0,0, this.ball.d);
    if(this.ball.dead) return pop();
    noFill();
    stroke(pulse);
    circle(0, 0, pit);
    pop();
  }
  
  feel(){
    if(this.ball.dead) return;
    this.ball.pain -= 1;
    if(this.ball.pain < 0) this.ball.pain = 0;
    if(this.ball.painRatio() >= 1) this.ball.die();
  }
  
  go(){
    if(this.ball.dead) return;
    this.ball.grow();
    this.feel();
    this.ball.t += 1;
  }
  
  prepush(force){
    let pain = map(force.mag(), 0, this.ball.S, 0, 0.1 * this.ball.M);
    this.ball.pain += pain;
    this.ball.pain += pain * abs(this.ball.vel.angleBetween(force)) / PI;
  }
  
  split(){
    if(this.ball.dead) return;
    if(random() < 0.5) return;
    let clone = new Ball(this.ball.babyM);
    this.ball.traitsList.forEach(t =>{
      if(random() < 0.1) return;
      let str = t.str ? t.str : [];
      if(!Array.isArray(str)) str = str.split(",");
      str = str.map(s => randomGaussian(s, 0.2 * s)).toString();
      clone.addTrait(t.name, str);
    });
    if(random() < 0.1) clone.addTrait(random([MOUTH, TAIL]));
    clone.pos = this.ball.front.copy().mult(-1).add(this.ball.pos);
    this.ball.m -= clone.m;
    let hDeviation = randomGaussian(0, 5);
    clone.h = this.ball.h + hDeviation;
    this.ball.h -= hDeviation * clone.m / this.ball.m;
    balls.push(clone);
    this.ball.pain += 0.5 * clone.m;
    clone.pain += 0.5 * clone.m;
  }
}
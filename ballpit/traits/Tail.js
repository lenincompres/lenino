const TAIL = "Tail";

class Tail {
  constructor(ball, str = ""){
    if(ball.dead) return this.failed = true;
    if(!ball.hasTrait(LIFE)) return this.failed = true;
    
    str = str.split(",");
    this.pct = parseFloat(str[1]);
    if(!this.pct) this.pct = random(0, 0.5);
    if(this.pct <= 0) return this.failed = true;
    
    this.rot = parseFloat(str[0]);
    if(this.rot !== 0 && !this.rot) this.rot = random(-PI, PI);
    this.str = [this.rot, this.pct];
    this.ball = ball;
    this.tail = ball.front.copy();
    this.max = this.pct * ball.S / 50;
    if(random() < 0.1) ball.addTrait(TAIL);
  }
  
  show(){
    let tip = this.tail.copy().mult(1 + this.pct);
    if(this.ball.dead) {
      tip.rotate(PI/10);
    } else {
      let s = 1 - this.ball.painRatio();
      let d = s * PI/10;
      tip.rotate(sin(s * frameCount / 2) * d);
    }
    push();
    translate(this.ball.pos);
    noFill();
    stroke(this.ball.dead ? this.ball.color : this.ball.shade);
    strokeWeight(0.1 * this.ball.r);
    beginShape();
    curveVertex(0,0);
    curveVertex(this.tail.x, this.tail.y);
    curveVertex(tip.x, tip.y);
    curveVertex(tip.x, tip.y);
    endShape();
    pop();
  }
  
  go(){
    this.tail = this.ball.front.copy().mult(-1);
    this.tail.setMag(this.ball.r).rotate(this.rot);
    if(this.ball.dead) this.pct = 0;
    this.flap();
  }
  
  flap(){
    if(this.pct === 0) return;
    let pct = random(1 - this.ball.painRatio());
    this.ball.push(
      this.tail.copy().mult(-1)
      .setMag(pct * this.max)
    );
    this.ball.grow(0.1 * pct, false);
  }
}
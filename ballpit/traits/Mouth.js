const MOUTH = "Mouth";

class Mouth {
  constructor(ball){
    if(ball.dead) return this.failed = true;
    if(!ball.hasTrait(LIFE)) return this.failed = true;
    if(ball.hasTrait(MOUTH)) return this.failed = true;
    
    this.ball = ball;
    ball.adultM *= 1.5;
  }
  
  get biteSize(){
   return this.ball.m * 0.02;
  }
  
  show(){
    let mColor = color(this.ball.h, 0, 86);
    if(bgColor) mColor = color(bgColor);
    mColor.setAlpha(86);
    fill(mColor);
    let edge = this.ball.front.copy().setMag(this.ball.r);
    let hinge = edge.copy().mult(0.4);
    let a = 10;
    a = map(frameCount % a, 0, a, 0, PI/3);
    if(this.ball.dead) a = PI/30;
    edge.rotate(-a);
    
    push();
    translate(this.ball.pos);
    stroke(mColor);
    strokeWeight(this.ball.r * 0.1);
    beginShape();
    curveVertex(hinge.x, hinge.y);
    curveVertex(edge.x, edge.y);
    edge.rotate(a);
    curveVertex(edge.x, edge.y);
    edge.rotate(a);
    curveVertex(edge.x, edge.y);
    curveVertex(hinge.x, hinge.y);
    curveVertex(hinge.x, hinge.y);
    endShape();
    pop();
  }
  
  prego(){
    this.eat(this.ball.hits);
  }
  
  go(){
    if(!this.ball.dead) this.ball.grow(1.2, false);
  }
  
  eat(food){
    if(this.ball.dead) return;
    if(!Array.isArray(food)) food = [food];
    food.forEach(c => {
      if(!c || !c.r) return;
      if(c.done) return;
      
      //check if the collision was on mouth
      let v = p5.Vector.sub(c.pos, this.ball.pos);
      let a = abs(v.angleBetween(this.ball.front));
      if(a > PI/3) return;
      
      //take bite
      let bite = min(this.biteSize, c.m);
      this.ball.m += bite;
      c.m -= bite;
      if(c.pain !== undefined) c.pain += bite;
      
      //get color
      let h = [c.h - 100, c.h, c.h + 100];
      h = h.reduce((o, x) => abs(x - this.ball.h) < abs(o - this.ball.h) ? x : o);
      let diff = abs(h - this.ball.h);
      this.ball.h = lerp(this.ball.h, h, bite / this.ball.m);
      //pain
      this.ball.pain -= bite * map(diff, 0, 50, 0, 2); 
    });
    return;
  }
  
}

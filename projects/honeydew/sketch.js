
document.body.style.overflow = "hidden";
let bgColor = "honeydew";
let W = window.innerWidth;
let H = window.innerHeight;
let MAX = 25; // initial maximum number of cells
let R = Math.sqrt((W*H)/(2 * Math.PI * MAX));

let FRIX = 0.9;
let B = 0.025; //bounciness of the cells
let S = 1;
let SD = 2; //standard deviation for clone mutation
let MT = 0.8; // how likely is a mutation

let cells = [];
let count = 0; //time since last division
let DELAY = 60; //minimum wait time for division

let stage = 0;

function setup() {
  createCanvas(W, H);
  colorMode(HSL, 100);
  BG = color(bgColor);
  
  cell = (mom = false, dad = false) => {
    let me = {};
    me.age = 0;
    me.radius = R;
    me.pos = createVector(0.5 * W, 0.5 * H);
    me.vel = createVector(0,0);
    me.setColor = (h, l) =>{
      if(h>100) h -= 100;
      else if(h<0) h = 100 - h;
      me.hue = h;
      me.lightness = constrain(l, 0 ,100);
      me.saturation = saturation(BG);
      me.color = color(me.hue, me.saturation, me.lightness, 50);
    }
    me.setColor(hue(BG) + 50, (lightness(BG) + 50)%100);
    me.mutate = (sd = SD) => {
      me.age = 0;
      let h = random()<MT ? randomGaussian(me.hue,sd) : me.hue;
      let l = random()<MT ? randomGaussian(me.lightness,sd) : me.lightness;
      me.setColor(h, l);
      me.color = color(me.hue, me.saturation, me.lightness, 50);
      me.radius = constrain(randomGaussian(me.radius,sd/PI), 0.86*R, 1.86*R);
      return me;
    }
    if(mom && dad) {
      me.setColor((mom.hue + dad.hue)/2, (mom.lightness + dad.lightness)/2);
      me.radius = (mom.radius + dad.radius) / 2;
    } else if(mom) {
      me.setColor(mom.hue, mom.lightness);
      me.radius = mom.radius;
    }
    if(mom) {
      me.pos = createVector(mom.pos.x, mom.pos.y);
      me.vel = createVector(-mom.vel.x, -mom.vel.y);
      me.mutate();
    }
    me.draw = () => {
      let whole = 0;
      whole *= me.radius;
      let diam = me.radius + whole - 2 * me.vel.mag();
      push();
      noStroke();
      stroke(me.color);
      strokeWeight(me.radius-whole);
      noFill();
      circle(me.pos.x, me.pos.y, diam);
      pop();
    };
    me.update = () => {
      let [left,right,top,bottom] = [me.radius, W-me.radius, me.radius, H-me.radius];
      me.pos.add(me.vel);
      me.pos.x = constrain(me.pos.x, left, right);
      me.pos.y = constrain(me.pos.y, top, bottom);
      if(me.pos.x <= left || me.pos.x >= right) me.vel.x *= -1;
      if(me.pos.y <= top || me.pos.y >= bottom) me.vel.y *= -1;
      me.vel.mult(FRIX);
      let mag = me.vel.mag();
      if(mag < 0.1) me.vel.setMag(0);
      me.age += 1;
      me.draw();
    };
    me.divide = () => {
      me.vel = createVector(random(-W,W), random(-H,H)).setMag(1);
      me.mutate();
      return cell(me);
    };
    return me;
  }

  cells.push(cell());
  firstColor = cells[0].color;
  firstColor.setAlpha(100);
}

function draw() {
  background(BG);
  cells.forEach(c => {
    c.update();
    c.collided = [];
  });
  
  textSize(W * 0.04);
  
  if(!stage){
    textAlign(CENTER,TOP);
    text("Circles will split into 2 copies\nas long as there is space to do so.\n\nTap anywhere to continue.", W * 0.5, H * 0.2);
    return;
  } else if(stage === 1){
    textAlign(CENTER,CENTER);
    text("Sometimes, copies aren't perfect\nand their color or size is slightly off.\n\nTap to continue.", W * 0.5, H * 0.5);
  } else if(stage < 6){
    textAlign(CENTER,TOP);
    text("Can you keep their population under 10\nfor at least 1 minute?\n\nTap circles to remove them.", W * 0.5, H * 0.2);
  }
  
  //collide
  cells.forEach(c => {
    cells.filter(o => c != o &&
                 !c.collided.includes(o) && 
                 dist(o.pos.x, o.pos.y, c.pos.x, c.pos.y) < o.radius + c.radius).forEach(o => {
        let vel = createVector(o.pos.x, o.pos.y).sub(c.pos).mult(B);
        o.vel.add(vel);
        c.vel.sub(vel);
        o.collided.push(c);
        c.collided.push(o);
    })
  });
  
  //multiply
  let freeSpace = cells.reduce((o,a) => o += PI * pow(a.radius,2), 0) / (W*H);
  if(freeSpace < 0.6 && count >= DELAY * sqrt(freeSpace)){
    let mom = cells.reduce((o,a) => o.age > a.age ? o : a);
    if(mom){
      cells.push(mom.divide());
    count = 0;
    }
  }
  
  push();
  let l = lightness(BG) - 50;
  stroke(BG);
  fill(firstColor);
  strokeWeight(R * 0.1);
  textSize(R * 2);
  textAlign(LEFT,TOP);
  text(cells.length, R * 0.5, R * 0.5);
  pop();
  
  count += 1;
}

function mouseClicked() {
  if(stage < 6) stage += 1;
  if(stage < 2) return;
  
  let targets = cells.filter(c => dist(mouseX, mouseY, c.pos.x, c.pos.y) < c.radius);
  if(!targets.length) return;
  let target = targets.reduce((a,b) => a.age > b.age ? a : b);
  if(target) cells = cells.filter(c => c != target);
}
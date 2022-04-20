document.body.style.overflow = "hidden";
let bgColor = "honeydew";
let W = window.innerWidth;
let H = window.innerHeight;
let MAX = 20; // initial maximum number of cells
let R = Math.sqrt((W * H) / (2 * Math.PI * MAX));

let cells = [];
let count = 0; //time since last division
let DELAY = 60; //minimum wait time for division
let stage = 0;

function setup() {
  createCanvas(W, H);
  colorMode(HSL, 100);
  BG = color(bgColor);
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

  // Prompts
  textSize(W * 0.04);
  strokeWeight(W * 0.004);
  stroke(bgColor);
  if (!stage) {
    textAlign(CENTER, TOP);
    text("Circles will split into 2 copies\nas long as there is space to do so.\n\nTap anywhere to continue.", W * 0.5, H * 0.2);
    return;
  } else if (stage === 1) {
    textAlign(CENTER, CENTER);
    text("Some copies aren't perfect;\ntheir color or size is slightly off.\n\nTap to continue.", W * 0.5, H * 0.5);
  } else if (stage < 6) {
    textAlign(CENTER, TOP);
    text("Can you control their spread?\nKeep it under 10 for 1 minute.\n\nTap circles to remove them.", W * 0.5, H * 0.2);
  }

  //collide
  cells.forEach(c => {
    cells.filter(o => c != o &&
      !c.collided.includes(o) &&
      dist(o.pos.x, o.pos.y, c.pos.x, c.pos.y) < o.radius + c.radius).forEach(o => {
      let d = o.radius + c.radius;
      let vel = createVector(o.pos.x, o.pos.y).sub(c.pos);
      vel.setMag(S + B * pow(d - vel.mag(), 2));
      o.vel.add(vel);
      c.vel.sub(vel);
      o.collided.push(c);
      c.collided.push(o);
    })
  });

  //multiply
  let freeSpace = cells.reduce((o, a) => o += PI * pow(a.radius, 2), 0) / (W * H);
  if (freeSpace < 0.68 && count >= DELAY * sqrt(freeSpace)) {
    let mom = cells.reduce((o, a) => o.age > a.age ? o : a);
    if (mom) {
      cells.push(mom.divide());
      count = 0;
    }
  }

  // Counts
  push();
  let l = lightness(BG) - 50;
  stroke(BG);
  fill(firstColor);
  strokeWeight(R * 0.1);
  textSize(R * 1.5);
  textAlign(LEFT, TOP);
  text(cells.length, R * 0.5, R * 0.5);
  pop();

  count += 1;
}

function mouseClicked() {
  if (stage < 6) stage += 1;
  if (stage < 2) return;

  let targets = cells.filter(c => dist(mouseX, mouseY, c.pos.x, c.pos.y) < c.radius);
  if (!targets.length) return;
  let target = targets.reduce((a, b) => a.age > b.age ? a : b);
  if (target) cells = cells.filter(c => c != target);
}
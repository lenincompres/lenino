let bgColor = "#bfb";
let W = window.innerWidth;
let H = window.innerHeight;
let MAX = 20; // initial maximum number of cells
let R = Math.sqrt((W * H) / (2 * Math.PI * MAX));

let cells = [];
let count = 0; //time since last division
let DELAY = 60; //minimum wait time for division
let stage = 0;
let timer = 0;
let goal = 10;
let playing = false;

function setup() {
  DOM.set({
    title: "Honeydew by Lenino",
    charset: "UTF-8",
    viewport: {
      width: "device-width",
      initialScale: 1,
    },
    keywords: "lenin, lenino, lenin compres, cantacuentos, evolution, edication, speciation",
    backgroundColor: bgColor,
    description: "",
    canvas: createCanvas(W, H)
  });
  colorMode(HSL, 100);
  BG = color(bgColor);
  cells.push(cell(R, bgColor));
  firstColor = cells[0].color;
  firstColor.setAlpha(100);

  setInterval(() => timer += playing ? 1 : 0, 1000);
}

function draw() {
  clear();
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
    text("Circles will split into copies,\nas long as there's space.\n\nTap to continue.", W * 0.5, H * 0.2);
    return;
  } else if (stage === 1) {
    textAlign(CENTER, CENTER);
    text("Copies may have small random errors;\ntheir color or size is slightly off.\n\nTap to continue.", W * 0.5, H * 0.5);
  } else if (stage < 6) {
    textAlign(CENTER, TOP);
    text(`Keep their number under ${goal}\nfor 1 minute.\n\nTap to remove circles`, W * 0.5, H * 0.2);
  } else {
    playing = true;
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
  if (stage > 1) {
    push();
    // timer
    stroke(BG);
    fill(0);
    strokeWeight(R * 0.1);
    textSize(R);
    textAlign(CENTER, CENTER);
    let sec = timer % 60;
    if (cells.length >= goal) timer = 0;
    else if (playing) text(`${floor(timer/60)}:${sec<10?0:""}${sec}`, W * 0.5, R);
    // ball count
    fill(firstColor);
    strokeWeight(R * 0.02);
    textSize(R * 0.68);
    text(`${cells.length}●`, W * 0.5, H - R);
    stroke(firstColor);
    noFill();
    circle(W * 0.5, H - R, 2 * R);
    pop();
  }

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
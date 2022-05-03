let bgColor = "#bfb";

DOM.set({
  title: "Honeydew by Lenino",
  charset: "UTF-8",
  viewport: {
    width: "device-width",
    initialScale: "1.0",
    maximumScale: "1.0",
  },
  keywords: "lenin, lenino, lenin compres, cantacuentos, evolution, education, speciation",
  backgroundColor: bgColor,
  description: "",
  overflow: "hidden",
  cursor: "none",
});

let W = window.innerWidth;
let H = window.innerHeight;
let MAX = 20; // initial maximum number of cells
let R = Math.sqrt((W * H) / (2 * Math.PI * MAX));

let cells = [];
let count = 0; //time since last division
let DELAY = 60; //minimum wait time for division
let stage = 0;
let timer = 0;
let sec = 0;
let goal = 10;
let playing = false;

let [x, y] = [0, 0];

let sound = {
  tick: new Audio("tick.mp3"),
  ding: new Audio("ding.mp3"),
  wrong: new Audio("wrong.mp3"),
}

function setup() {
  DOM.set(createCanvas(W, H));
  colorMode(HSL, 100);
  BG = color(bgColor);
  cells.push(cell(R, bgColor));
  firstColor = cells[0].color;
  firstColor.setAlpha(100);
  setInterval(() => timer += playing ? 1 : 0, 1000);
  textFont('Impact');
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
    text("Copies may have errors,\nminor size or color difference.\n\nTap to continue.", W * 0.5, H * 0.5);
  } else if (stage < 6) {
    textAlign(CENTER, TOP);
    text(`Can you keep the number under ${goal}\nfor 1 minute.\n\nTap to remove circles`, W * 0.5, H * 0.2);
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
      if (sec > 0 && cells.length === goal) sound.wrong.play();
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
    let oldSec = sec;
    sec = timer % 60;
    if (cells.length >= goal) timer = 0;
    else if (playing) {
      text(`${floor(timer/60)}:${sec<10?0:""}${sec}`, W * 0.5, R);
      if (oldSec != sec) sound.tick.play();
    }

    // ball count
    fill(firstColor);
    strokeWeight(R * 0.05);
    text(cells.length, W * 0.5, H - R * 1.2);
    stroke(firstColor);
    noFill();
    circle(W * 0.5, H - R * 1.2, 2 * R);

    //square
    strokeWeight(R * 0.2);
    if (cells.length < goal) rect(0, 0, W, H);


    pop();
  }

  /*
  circle(x, y, R * 0.5);
  text(`${round(x)},${round(y)}`, x, y);
  */

  count += 1;
}

function mousePressed() {
  if (stage < 6) stage += 1;
  if (stage < 3) return;

  [x, y] = [mouseX, mouseY];

  //mapping for screen show
  if (false) {
    [x, y] = [W * (H - mouseY) / H, H * (W - mouseX) / W];
    x = map(x, 100, 1100, 0, W);
    y = map(y, 130, 1300, H, 0);
  }
  let targets = cells.filter(c => dist(x, y, c.pos.x, c.pos.y) < c.radius);
  if (!targets.length) return;
  let target = targets.reduce((a, b) => a.age > b.age ? a : b);
  if (target) cells = cells.filter(c => c != target);
  if (cells.length === goal - 1) sound.ding.play();
}
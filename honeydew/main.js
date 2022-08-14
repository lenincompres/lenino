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
let goalNumber = 10;
let goalTime = 60;
let longestStreak = 0;
let playing = false;

let introPrompt = [
  "Circles will split into copies,\nas long as there's space.\n\nTap to continue.",
  "Copies may have errors,\nsmall differences in size or color.\n\nTap to continue.",
  `Challenge 1:\nKeep their number under ${goalNumber} for ${goalTime} seconds.\n\nTap to remove circles`,
]

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
    text(introPrompt[stage], W * 0.5, H * 0.2);
    return;
  } else if (stage === 1) {
    textAlign(CENTER, CENTER);
    text(introPrompt[stage], W * 0.5, H * 0.5);
  } else if (stage < 6) {
    textAlign(CENTER, TOP);
    text(introPrompt[stage], W * 0.5, H * 0.2);
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
      if (timer > 0 && cells.length === goalNumber) sound.wrong.play();
      if (timer > longestStreak) longestStreak = timer;
    }
  }

  // Counts
  if (stage > 1) {
    push();

    // timer
    setText(R, 0, BG, CENTER, CENTER);
    let oldTimer = timer;
    if (cells.length >= goalNumber) timer = 0;
    else if (playing) {
      text(displayTime(timer), W * 0.5, R);
      if (oldTimer != timer) sound.tick.play();
    }

    //longest streak
    if (longestStreak > 0) {
      setText(R * 0.2, 0, BG, LEFT, CENTER);
      text(`Record under ${goalNumber}`, R * 0.3, H - R);
      setText(R * 0.6);
      text(displayTime(longestStreak), R * 0.3, H - R * 0.6);
    }

    // ball count
    setText(R, firstColor, BG, CENTER, CENTER);
    text(cells.length, W * 0.5, H - R * 1.2);
    stroke(firstColor);
    noFill();
    circle(W * 0.5, H - R * 1.2, 2 * R);

    //focus square
    strokeWeight(R * 0.2);
    if (cells.length < goalNumber) rect(0, 0, W, H);

    pop();
  }

  count += 1;
}

function mousePressed() {
  if (stage < 6) stage += 1;
  if (stage < 3) return;

  let targets = cells.filter(c => dist(mouseX, mouseY, c.pos.x, c.pos.y) < c.radius);
  if (!targets.length) return;
  let target = targets.reduce((a, b) => a.age > b.age ? a : b);
  if (target) cells = cells.filter(c => c != target);
  if (cells.length === goalNumber - 1) sound.ding.play();
}

let displayTime = t => {
  let s = t % 60;
  return `${floor(t/60)}:${s<10?0:""}${s}`;
}

let setText = (size, color, lColor, ...pos) => {
  textSize(size);
  strokeWeight(size * 0.1);
  if (color) fill(color);
  if (lColor) stroke(lColor);
  if (pos) textAlign(...pos);
}
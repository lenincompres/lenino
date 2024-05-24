import Mass from "./Mass.js";
import bite from "./traits/bite.js";
import clone from "./traits/clone.js";
import collide from "./traits/collide.js";
import propel from "./traits/propel.js";
import rebound from "./traits/rebound.js";
import steer from "./traits/steer.js";
import think from "./traits/think.js";
import Grid from "./Grid.js";

Mass.TRAITS.collide = collide;
Mass.TRAITS.rebound = rebound;
Mass.TRAITS.propel = propel;
Mass.TRAITS.steer = steer;
Mass.TRAITS.bite = bite;
Mass.TRAITS.clone = clone;
Mass.TRAITS.clone.arg = addBloop;
Mass.TRAITS.think = think;

window.setup = setup;
window.draw = draw;
window.mouseMoved = mouseMoved;
window.mouseReleased = mouseReleased;

let avgSize = 180; // (first) amount of balls needed to fill the canvas
let zoomScale; // leave undefined for auto
let fRate = 30;

let world;
let lastPos;
let playing = true;

function setup() {
  if (zoomScale === undefined) zoomScale = sqrt(windowWidth * windowHeight) * avgSize / 50000;
  let canvas = createCanvas(windowWidth / zoomScale, windowHeight / zoomScale);
  canvas.elt.style.width = (width * zoomScale) + "px";
  canvas.elt.style.height = (height * zoomScale) + "px";
  canvas.elt.style.imageRendering = "pixelated";
  avgSize = width * height / avgSize;
  frameRate(fRate);
  colorMode(HSB, 100);
  world = {
    friction: 0.04,
    masses: [],
  };
}

function draw() {
  background(0, 0, playing ? 90 : 100);
  world.masses.forEach(m => m.run());
  if (playing) {
    world.masses = world.masses.filter(m => m.update());
    if (!(frameCount % fRate)) addBloop();
  }
}

function mouseMoved() {
  if (!lastPos) return lastPos = createVector(mouseX, mouseY);
  let force = createVector(mouseX, mouseY).sub(lastPos);
  lastPos = createVector(mouseX, mouseY);
  let F = 0.2 * avgSize;
  world.masses.forEach(m => {
    let d = lastPos.copy().sub(m.position).mag();
    let f = 100 * m.mass / pow(d, 2);
    if(f < 1 || f > F) return;
    m.force.add(force.copy().setMag(f));
  });
}


function mouseReleased() {
  //playing = !playing;
}

function addBloop(x, y) {
  let m = new Mass(avgSize, x, y, world);
  if (x === undefined) {
    let ratio = width / (width + height);
    let d = m.radius;
    if (random() > ratio) m.x = random([-d, width + d]);
    else m.y = random([-d, height + d]);
  }
  m.hue = random(100);
  let traits = Object.keys(Mass.TRAITS).filter(() => random() < 0.05);
  m.addTrait("rebound", "collide", ...traits);
  return m;
}
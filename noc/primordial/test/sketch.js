import Mass from "../Mass.js";
import aim from "../traits/aim.js";

window.setup = setup;
window.draw = draw;
window.mouseReleased = mouseReleased;

let world = {
  masses: [],
}
let bloop;

Mass.ADD_TRAIT(aim);

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 100);
  bloop = new Mass();
  bloop.addTrait("aim");
}

function draw() {
  clear();
  bloop.run();
  bloop.update();
}

function mouseReleased() {
  bloop.target = createVector(mouseX, mouseY);
}
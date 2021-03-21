var power = {
  p: 0.5,
  t: 0,
  LOOP: 20, // how often should it loop
  tl: () => this.t % this.LOOP,
  c: 'green'
}
const BEND_IN_KEY = 'z';
const BEND_AWAY_KEY = 'x';
const BEND_GROUND_KEY = ' ';
//global vars
const [W, H] = [800, 500];
var kyoshis;
var hero;
var grounds = [];
var earths = [];

function preload() {
  kyoshis = iterate(i => loadImage(`images/kyoshi${i}.png`), 4);
}

function setup() {
  power.ca = opacate(power.c, 0.68);
  grounds.push(new Ground(0, H / 2, 20, H));
  grounds.push(new Ground(W, H / 2, 20, H));
  grounds.push(new Ground(W / 2, H, W, 20));
  hero = new Kyoshi(W * 0.1, H * 0.5);
  earths = iterate(i => new Earth(random(0.8 * W) + 0.2 * W, random(0.9 * H), (i + 1) * 10), 6);
  createDOM({
    header: {
      h1: 'Little Kyoshi',
      p: 'by Lenino'
    },
    section_game: {
      canvas_canvas: createCanvas(W, H),
      aside_controls: {
        header: 'Controls',
        p: ['*Click* to move', '*Right-click* to jump', '*Z* to bend inward', '*X* to bend away', '*Z→X* to shoot', '*X→Z* to fuse', '*SPACE* to unearth']
      }
    },
    footer: 'Inspired on the animated series [Avatar: The Last Airbender](https://www.nick.com/shows/avatar)!.'
  });
  document.body.addEventListener('contextmenu', e => e.preventDefault(), false); //remove right click menu
}

function draw() {
  clear();
  everybody.update();
}

function mousePressed() {
  if (mouseButton === LEFT) hero.move(true);
  else if (mouseButton === RIGHT) hero.jump();
}

function mouseReleased() {
  if (mouseButton === LEFT) hero.move(false);
  mouseButton = mouseButton === RIGHT ? LEFT : RIGHT;
}

function keyPressed() {
  if (key === BEND_AWAY_KEY) hero.bendAway();
  else if (key === BEND_IN_KEY) hero.bendIn();
}

function keyReleased() {
  if (key === BEND_AWAY_KEY) hero.bendAway(false);
  else if (key === BEND_IN_KEY) hero.bendIn(false);
}
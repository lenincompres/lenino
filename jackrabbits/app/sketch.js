/*-----------------------
  GLOBAL VARIABLES
------------------------*/

let canvas;
let center;
let [MINZOOM, MAXZOOM] = [0.17, 0.86];
let canvasZoom = mid(MAXZOOM, MINZOOM) * 0.5;
let endZoom = canvasZoom;
let speed = 0.2;

let pieces;
let game;
let quideDisplay;
let infoDisplay;
let goalDisplay;
let popDisplay;

let isHovering = false;
let tableHeld = false;
let pressedPoint;
let selectedPiece;

// assets
let imageMap = {
  rabbits: 'images/sprite_rabbits.png',
  carrots: 'images/sprite_carrots.png',
  triangles: 'images/sprite_triangles.png',
  rhombi: 'images/sprite_rhombi.png',
  hexes: 'images/sprite_hexes.png',
  suits: 'images/sprite_suits.png',
  rides: 'images/sprite_rides.png',
}
let soundMap = {
  //intro: 'sounds/jr-intro.mp3 '
};
let fontMap = {
  main: 'assets/fantasquesansmono-regular.otf'
}

let style = {
  margin: 0,
  padding: 0,
  backgroundColor: COLOR[EDGE.SEA],
  overflow: 'hidden',
}

/*-----------------------
  PRELOAD, SETUP & DRAW
------------------------*/

function preload() {
  Object.keys(imageMap).forEach(key => imageMap[key] = loadImage(imageMap[key]));
  Object.keys(soundMap).forEach(key => soundMap[key] = loadSound(soundMap[key]));
  Object.keys(fontMap).forEach(key => fontMap[key] = loadFont(fontMap[key]));
}

function setup() {
  style.backgroundColor = `#${rgb(darken(COLOR[EDGE.SEA], 0.86))}`;
  Object.keys(style).forEach(key => document.body.style[key] = style[key]);
  document.body.innerHTML = '';
  createElement('footer', 'Created by <a href="http://lenino.net" target="_blank">Lenino</a> © 2020, using <a href="https://p5js.org/" target="_blank">P5.js</a>');
  createCanvas(windowWidth, windowHeight);
  frameRate(48);
  center = {
    x: windowWidth * 0.5,
    y: windowHeight * 0.5
  };

  /* --------------------------------  pieces ------------------------------- */

  let rabbits = RABBIT.toArray();
  let suits = SUIT.toArray();
  pieces = PieceSet([{
    sprite: imageMap.triangles,
    group: PIECE.TILE,
    type: TILE.TRIANGLE,
    cols: TRIANGLE.toArray(),
    reps: suits.length
  }, {
    sprite: imageMap.rhombi,
    group: PIECE.TILE,
    type: TILE.RHOMBUS,
    cols: suits,
    reps: 3
  }, {
    sprite: imageMap.hexes,
    group: PIECE.TILE,
    type: TILE.HEX,
    cols: [0, ...suits.filter((_, i) => i < 6)],
    rows: TITLE.toArray()
  }, {
    sprite: imageMap.rabbits,
    group: PIECE.RABBIT,
    cols: rabbits
  }, {
    sprite: imageMap.carrots,
    group: PIECE.CARROT,
    cols: rabbits,
    reps: 3
  }, {
    sprite: imageMap.suits,
    group: PIECE.SUIT,
    cols: suits
  }, {
    sprite: imageMap.rides,
    group: PIECE.RIDE,
    cols: RIDE.toArray()
  }]);

  /* ------------------------ game and message displays ----------------------- */

  quideDisplay = new Display('quideDisplay');
  infoDisplay = new InfoDisplay();
  goalDisplay = new Display('GoalDisplay');
  popDisplay = new Display('popDisplay');
  game = new Game();
}
//squeeks in pop (bubble) display
function squeek(message) {
  if (popDisplay.last === message) return;
  if (!message) return popDisplay.display();
  popDisplay.display(message);
  let left = center.x + canvasZoom * (game.player.x + game.player.rabbit.width * 0.25);
  let top = center.y - canvasZoom * (game.player.y - game.player.rabbit.height * 0.25);
  popDisplay.div.style('left', `${left}px`);
  popDisplay.div.style('bottom', `${top}px`);
}
//says in guide display
function say(...args) {
  if (!args.length) return quideDisplay.display();
  quideDisplay.display(pen(...args));
}
//states in goal display
function state(...args) {
  if (!args.length) return goalDisplay.display();
  goalDisplay.display(pen(...args));
}
//prompts in info display, based on teh key passed
const [SETTINGS, EXPLORE, CONSULT, CONFIRM, CONFIRM_CARDS, CONFIRM_ROYAL, RELEASE_ROYAL, INFORM, NEW_GAME, ALL] = ['settings', 'explore', 'consult', 'confirm', 'confirmCards', 'confirmRoyal', 'releaseRoyal', 'inform', 'newGame', 'all'];

function prompt(KEY, ...args) {
  if (!KEY) return infoDisplay.display();
  if (KEY === NEW_GAME) return infoDisplay.inform(pen(HINT.NEW_GAME), _ => game = new Game());
  if (infoDisplay[KEY]) return infoDisplay[KEY](...args);
  infoDisplay.display(KEY, ...args);
}

/* ---------------------------------- draw ---------------------------------- */

function draw() {
  clear();
  if (game) game.draw(canvasZoom);
  update();
}

/*-----------------------
  INTERFACE
------------------------*/

function update() {
  if (endZoom && abs(endZoom - canvasZoom) > 0.001) {
    canvasZoom += (endZoom - canvasZoom) * speed;
    if (game.stage === STAGE.SETUP) game.arrangeHand();
  } else endZoom = false;
}

function zoomTo(z, x, y) {
  if (game) popDisplay.display();
  if (typeof z === 'number') endZoom = z;
  endZoom = endZoom < MINZOOM ? MINZOOM : endZoom > MAXZOOM ? MAXZOOM : endZoom;
}

function getPoint(inX, inY) {
  let [x, y] = parsexy(inX, inY);
  if (typeof x !== 'number') x = mouseX;
  if (typeof y !== 'number') y = mouseY;
  return [(x - center.x) / canvasZoom, (y - center.y) / canvasZoom];
}

/*-----------------------
  MOUSE
------------------------*/

function mouseMoved() {
  if (!game) return;
  let [x, y] = getPoint();
  cursor(game.see(x, y) ? HAND : ARROW);
}

function mousePressed() {
  if (!game) return;
  pressedPoint = getPoint();
  if (game.stage === STAGE.SETUP || game.willJump) game.pick(getPoint()); //when supposed to drag
  tableHeld = !selectedPiece;
}

function mouseClicked() {
  if (!game) return;
  if (game.stage === STAGE.SETUP && selectedPiece && dist(...pressedPoint, ...getPoint()) < 2) game.tryTile(selectedPiece);
  if (game.stage !== STAGE.SETUP && !game.willJump) game.pick(getPoint()); //when not supposed to drag
}

function mouseDragged(e) {
  if (!game) return;
  if (!selectedPiece) return game.moveBy(e.movementX / canvasZoom, e.movementY / canvasZoom);
  dragPiece(e.movementX, e.movementY);
  if (game.stage === STAGE.PLAYING) game.boatRiding(); //shen dragging a boat
}

function dragPiece(dx, dy) {
  let s = 0.34;
  selectedPiece.position(...getPoint());
  game.moveBy(-dx * s / canvasZoom, -dy * s / canvasZoom);
}

function mouseWheel(event) {
  if (!game) return;
  if (selectedPiece) return game.turn(event.delta);
  let s = event.delta > 1 ? 0.9 : 1.1;
  zoomTo(canvasZoom * s, mouseX, mouseY);
}

/*-----------------------
  KEYBOARD
------------------------*/

function keyPressed() {
  if (!game) return;
  if (keyCode === UP_ARROW) return zoomTo(canvasZoom * 1.2);
  if (keyCode === DOWN_ARROW) return zoomTo(canvasZoom * 0.8);
  if (keyCode === RIGHT_ARROW) return game.scroll(1);
  if (keyCode === LEFT_ARROW) return game.scroll(-1);
};
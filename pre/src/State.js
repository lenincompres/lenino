const STATE_ICON_GRID = 36;
const CENTERCODE = '111';
const [ENG, ESP] = ['eng', 'esp'];
const [COS30, SIN30] = [Math.cos(Math.PI / 6), Math.sin(Math.PI / 6)];

/* -------------------------- // Auxiliary general -------------------------- */

String.prototype.toRGB = function () {
  return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this).filter((v, i) => i > 0 && 1 < 4).map(v => parseInt(v, 16));
}
Array.prototype.plus = function (arr = 0) { // adds arrays to array, or number
  return this.map((n, i) => n + (typeof arr === 'number' ? arr : arr[i % arr.length]));
}
Number.prototype.ordinalToCode = function (base) {
  let code = '' + floor(this / 9) % 3 + floor(this / 3) % 3 + this % 3;
  if (base) code = code.codeToCoords().plus(base.codeToCoords()).map(o => o % 3).join('');
  return code;
}
Number.prototype.codeToCoords = function () {
  return this.ordinalToCode().codeToCoords();
}
Number.prototype.codeToColor = function () {
  return this.ordinalToCode().codeToColor();
}
String.prototype.codeToCoords = function () {
  return this.split('').codeToCoords();
}
String.prototype.codeToOrdinal = function () {
  return this.codeToCoords().codeToOrdinal();
}
String.prototype.codeToHex = function () {
  return this.codeToCoords().codeToHex();
}
String.prototype.hexToCode = function () {
  return codeColor(color('#' + this));
}
String.prototype.codeToColor = function () {
  return this.codeToCoords().codeToColor();
}
Array.prototype.codeToCoords = function () {
  return this.map(n => parseInt(n) % 3);
}
Array.prototype.codeToOrdinal = function () {
  return this.reverse().reduce((o, v, i) => o + (v % 28) * pow(3, i), 0);
}
Array.prototype.codeToHex = function (shades) {
  return this.map(v => hexCode(v)).join('');
}
Array.prototype.codeToColor = function () {
  return this.map(v => round('0x' + hexCode(v)));
}
Array.prototype.colorToCode = function () {
  return this.map(n => round(map(n, 0, 255, 0, 2))).join('');
}

// other functions

export function getI(r, g, b, top = 100) {
  var half = 0.5 * top;
  return 100 * dist(half, half, half, r, g, b) / dist(0, 0, 0, half, half, half);
}

export function hexColor(colour) {
  var r = 1;
  return '' + hex(r * round(red(colour) / r), 2) + hex(r * round(green(colour) / r), 2) + hex(r * round(blue(colour) / r), 2);
}

export function codeColor(colour) {
  return [red(colour), green(colour), blue(colour)].colorToCode();
}

export const hexNum = (n, d = 2, r = 16) => hex(r * round(n / r), 2);

export const hexCode = v => [hexNum(0xff / 6), hexNum(0xff / 2), hexNum(5 * 0xff / 6)][v];

export function drawBox(radius = 40, colour = [128, 128, 128], alpha = 1, inside = true, canvas) {
  if (!canvas) canvas = this;
  let [x, y] = [radius * COS30, radius * SIN30];
  alpha *= 255;
  if (inside) canvas.rotate(PI);
  canvas.fill(...colour.plus(32), alpha);
  canvas.quad(0, 0, x, -y, 0, -radius, -x, -y);
  canvas.fill(...colour, alpha);
  canvas.quad(0, 0, 0, radius, -x, y, -x, -y);
  canvas.fill(...colour.plus(-32), alpha);
  canvas.quad(0, 0, x, -y, x, y, 0, radius);
  if (inside) canvas.rotate(PI);
}

export function polygon(x, y, radius, npoints, canvas) {
  if (!canvas) canvas = this;
  let angle = TWO_PI / npoints;
  canvas.beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    canvas.vertex(sx, sy);
  }
  canvas.endShape(CLOSE);
}

// p5 sketch to showcase a state

export function p5State(z = 100) {
  return new p5(function (p) {
    p.setup = () => {
      p.canvas = p.createCanvas(z, z);
    }
    p.drawState = hex => {
      p.clear();
      p.push();
      p.translate(p.width / 2, p.height / 2);
      p.state = new State(hex.substr(1).hexToCode());
      p.state.draw(p);
      p.pop();
    }
  });
}

export class State {
  constructor(centerCode = CENTERCODE, index = false, animate = false, radius = 40, lang = null) {
    if (index === false) index = CENTERCODE.codeToOrdinal();
    let inCoords = index.codeToCoords();
    let baseCode = centerCode.codeToCoords().plus(2).codeToCoords();
    let code = index.ordinalToCode(baseCode);
    this.ordinal = code.codeToOrdinal();
    this.color = code.codeToColor();
    let diff = index.ordinalToCode().codeToCoords().plus(-1);
    let [spacing, spread] = [radius * 1.5, 3.68];
    this.isRim = inCoords.includes(2) && inCoords.includes(0);
    this.level = diff.reduce((o, v) => o + v, 0);
    this.tier = this.isRim || !this.level ? 1 : this.level < 0 ? 0 : 2;
    this.posts = [
      [
        -diff[0] * spacing * COS30 + diff[2] * spacing * COS30,
        -diff[1] * spacing + diff[0] * spacing * SIN30 + diff[2] * spacing * SIN30
      ],
      [
        -spread * diff[0] * spacing * COS30 + diff[2] * spacing * COS30,
        -diff[1] * spacing + diff[0] * spacing * SIN30 + diff[2] * spacing * SIN30
      ],
      [
        -diff[0] * spacing * COS30 + diff[2] * spacing * COS30 + spread * diff[1] * spacing,
        -diff[1] * spacing + diff[0] * spacing * SIN30 + diff[2] * spacing * SIN30
      ],
      [
        -diff[0] * spacing * COS30 + spread * diff[2] * spacing * COS30,
        -diff[1] * spacing + diff[0] * spacing * SIN30 + diff[2] * spacing * SIN30
      ],
      [
        -diff[0] * spacing * COS30 + diff[2] * spacing * COS30 + 1.14 * spread * (this.tier - 1) * spacing,
        -diff[1] * spacing + diff[0] * spacing * SIN30 + diff[2] * spacing * SIN30
      ]
    ];

    this.code = code;
    this.index = index;
    this.radius = radius;
    this.post = 0;
    this.coords = animate ? [0, 0] : this.posts[0];
    this.hex = code.codeToHex();
    this.value = 1;

    this.symbolInfo;
    DOM.requestJSON('states.json', d => {
      this.symbolInfo = d;
      this.article = lang === ESP ? this.symbolInfo[code].articulo : this.symbolInfo[code].article;
      this.arch = lang === ESP ? this.symbolInfo[code].arquetipo : this.symbolInfo[code].archetype;
      this.info = this.symbolInfo[code];
    });

    this.symbolSprite;
    DOM.request('assets/symbolsprite18.png', d => this.symbolSprite = d);
  }

  draw(canvas) {
    if(!this.symbolSprite || this.symbolInfo) return;
    if (!canvas) canvas = window;
    let end = isNaN(this.post) ? this.posts[0] : this.posts[this.post];
    let ended = dist(...end, ...this.coords) < 0.25;
    if (!ended) this.coords = this.coords.map((v, i) => v += (end[i] - v) * 0.25);
    if (this.hidden) return;
    canvas.push();
    canvas.noStroke();
    canvas.translate(...this.coords);
    // base
    drawBox(this.radius, this.color, 0.86 * pow(this.value, 3), true, canvas);
    // icon
    canvas.tint(...this.color, pow(this.value, 2) * 255);
    var iconSize = this.radius * 0.86;
    canvas.image(this.symbolSprite, -iconSize * 0.5, -iconSize * 0.5, iconSize, iconSize, (this.ordinal % 3) * STATE_ICON_GRID, floor(this.ordinal / 3) * STATE_ICON_GRID, STATE_ICON_GRID, STATE_ICON_GRID);
    // top
    drawBox(this.radius, this.color, 0.34 * pow(this.value, 3), false, canvas);
    // desc
    canvas.fill(0, this.value * 255);
    canvas.textFont('Verdana');
    canvas.textAlign(CENTER, CENTER);
    canvas.textSize(this.radius * 0.25);
    canvas.text(this.article, 0, this.radius * 0.5);
    //
    if (this.selected) {
      canvas.fill(0, 0);
      canvas.rotate(PI / 6);
      canvas.strokeWeight(6);
      canvas.stroke(0, 140);
      polygon(1, 1, this.radius, 6, canvas);
      canvas.strokeWeight(4);
      canvas.stroke(255);
      polygon(0, 0, this.radius, 6, canvas);
    }
    canvas.pop();
  }

  isNear() {
    inCoords.filter(v => v === 1).length >= 2;
  }

  setRef(hexRef) {
    var distFactor = 1.05444; // normalize the center 0.5 / getDistance('2a80d5','808080');
    this.value = 1 - distFactor * getDistance(hexRef, code.codeToHex(), true);
    var eValue = 1 - distFactor * getDistance(hexRef, code.codeToHex());
    this.text = round(100 * this.value) + "%" + (eValue < this.value ? "*" : "");
  }

  getDistance(hex1, hex2, closerCycle = false) {
    var [p1, p2] = [hex1.toRGB().map(v => v / 255), hex2.toRGB().map(v => v / 255)];
    if (closerCycle) p1 = p1.map((v, i) => {
      let d = v - p2[i];
      return abs(d) <= 0.5 ? v : abs(d + 1) < abs(d - 1) ? v + 1 : v - 1;
    });
    return dist(...p2, ...p1);
  };

}

export default State;
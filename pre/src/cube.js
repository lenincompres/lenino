import State from "./State.js";

const [ENG, ESP] = ['eng', 'esp'];
const [COS30, SIN30] = [Math.cos(Math.PI / 6), Math.sin(Math.PI / 6)];

const CUBE = 'cube';
const NEAR = 'near';
const STATE = 'state';
const WAIT = 4; //second between posts
const GRID = 36;
const RADIUS = 40;

export function p5Cube(code = '111', mode = CUBE, ref, lang = ENG) {
  return new p5(function (p) {

    p.preload = function () {
      p.symbolSprite = loadImage('assets/symbolsprite18.png');
      p.symbolInfo = loadJSON('states.json');
    }

    p.setup = function () {
      // settings
      p.centerCode = code;
      p.displayMode = mode;
      p.lang = lang;
      p.ref = ref;
      // querystring
      var args = DOM.querystring();
      if (args) {
        if (args.lang) p.lang = args.lang;
        if (args.state) {
          p.centerCode = args.state.length < 3 ? args.state : args.state.hexToCode();
          p.displayMode = STATE; // if state is passed but display is not, it assumes display is STATE
        }
        if (args.display) p.displayMode = args.display;
        if (args.ref) p.ref = args.ref;
      }
      p.isHover = false;
      // canvas
      p.canvas = p.createCanvas(windowWidth, 400);
      p.center = [p.width * 0.5, p.height * 0.5];
      // creating states
      p.translate(...p.center);
      switch (p.displayMode) {
        case STATE:
          p.states = [new State(p.centerCode)];
          p.states[0].draw(p);
          break;
        case NEAR:
          p.states = iterate(i => new State(p.centerCode, i), 27).filter(s => s.isNear());
          p.states.forEach(s => s.draw(p));
          break;
        case CUBE:
          p.states = new Array(27).fill().map((_,i) => new State(p.centerCode, i, true)).sort(s => s.tier);
          if (p.ref) p.states.forEach(s => s.setRef(p.ref));
          p.nextPost = 1;
          p.currentPost = 0;
          p.changePost = false;
          p.animate();
          break;
      }
    }

    p.draw = function () {
      if (p.displayMode === CUBE) {
        p.clear();
        p.translate(...p.center);
        p.states.forEach(s => s.draw(p));
        if (p.changePost) {
          p.states.forEach(s => s.post = s.post === 0 ? p.nextPost : 0);
          p.currentPost = p.states[0].post;
          p.animate();
          p.changePost = false;
        }
        p.drawSign();
      }
    }

    p.animate = function (wait = 1000) {
      if (p.timeOut) clearTimeout(p.timeOut);
      if (p.freeze && p.currentPost === p.nextPost) return;
      let isIni = p.currentPost !== 0 || p.nextPost === 0;
      p.timeOut = setTimeout(() => p.changePost = !p.isHover, wait * (isIni ? WAIT : 0.5));
      if (isIni) p.nextPost = (p.nextPost + 1) % 4; //only show 4 posts
    }

    p.view = function (view) {
      p.changePost = true;
      if (isNaN(view)) {
        p.states.forEach(s => s.hidden = false);
        p.freeze = false;
        p.nextPost = (p.nextPost + 1) % 4; 
        p.animate();
        return;
      }
      p.freeze = true;
      p.states.forEach(s => s.hidden = view < 0 && !s.isRim && s.level - 3 > 2 * view);
      p.nextPost = view < 0 ? 0 : int(view);
    }

    p.mouseMoved = function () {
      if (!p.canvas) return;
      p.isHover = !!parseInt(p.canvas.get(p.mouseX, p.mouseY).join('')); // any pixel color under the mouse
      p.cursor(p.isHover ? HAND : ARROW);
      if (p.isHover) {
        var newOver = p.states.reduce((o, s) => !s.hidden && dist(...[p.mouseX, p.mouseY].minus(p.center), ...s.coords) < s.radius ? s : o, null);
        if (newOver === p.overState) return;
        if (p.overState) p.overState.selected = false;
        p.overState = newOver;
        if (p.overState) p.overState.selected = true;
        if (p.onmouseover) p.onmouseover(p.overState);
      } else {
        if (p.overState) {
          p.overState.selected = false;
          if (p.onmouseout) p.onmouseout(p.overState);
          p.animate();
        }
        p.overState = false;
      }
    }

    p.mousePressed = function () {
      if (!p.isHover) return;
      if (p.onclick) p.onclick(p.overState);
    }

    // drawing other components

    p.drawSign = function () {
      //add text describing each post on the shifting cube
      let y = RADIUS * 4.5;
      let x = RADIUS * 4.86;
      p.fill(0);
      p.textAlign(CENTER, CENTER);
      p.textSize(RADIUS * 0.34);
      switch (p.currentPost) {
        case 0:
          if (p.nextPost === 1) p.text(p.lang === ESP ? 'Espectro PRE' : 'PRE spectrum', 0, y);
          break;
        case 1:
          p.text(p.lang === ESP ? 'Activo' : 'Active', -x, y);
          p.text(p.lang === ESP ? 'Atento' : 'Attentive', 0, y);
          p.text(p.lang === ESP ? 'Introspectivo' : 'Introspective', x, y);
          break;
        case 2:
          p.text(p.lang === ESP ? 'Instintivo' : 'Instinctive', -x * 1.18, y);
          p.text(p.lang === ESP ? 'Informativo' : 'Informative', 0, y);
          p.text(p.lang === ESP ? 'Regulativo' : 'Regulative', x * 1.18, y);
          break;
        case 3:
          p.text(p.lang === ESP ? 'Objetivo' : 'Objective', -x, y);
          p.text(p.lang === ESP ? 'Sensible' : 'Responsive', 0, y);
          p.text(p.lang === ESP ? 'Affectivo' : 'Affective', x, y);
          break;
        case 4:
          p.text(p.lang === ESP ? 'Base' : 'Core', -x * 1.28, y);
          p.text(p.lang === ESP ? 'Extremo\nNeutro' : 'Extreme\nNeutral', 0, y * 1.1);
          p.line(-x * 0.25, y * 1.1, x * 0.25, y * 1.1);
          p.text(p.lang === ESP ? 'Tope' : 'Top', x * 1.28, y);
          break;
      }
    }

    p.drawMenu = function () {
      p.push();
      p.fill();
      p.stroke(200);
      let radius = RADIUS * 0.5;
      //post 0 : cube
      let [x, y] = [radius * COS30, radius * SIN30];
      p.translate(RADIUS * 6, -RADIUS * 5);
      p.quad(0, 0, x, -y, 0, -radius, -x, -y);
      p.quad(0, 0, 0, radius, -x, y, -x, -y);
      p.quad(0, 0, x, -y, x, y, 0, radius);
      // Post 1: blues
      p.quad(0, 0, 0, radius, -x, y, -x, -y);
      p.quad(x, y, 0, radius, -x, y, -x, -y);
      p.quad(-x, 0, 0, radius, -x, y, -x, -y);
      // Post 1: reds
      p.quad(0, 0, 0, radius, -x, y, -x, -y);
      p.quad(x, y, 0, radius, -x, y, -x, -y);
      p.quad(-x, 0, 0, radius, -x, y, -x, -y);
      // Post 1: geens
      p.quad(0, 0, 0, radius, -x, y, -x, -y);
      p.quad(x, y, 0, radius, -x, y, -x, -y);
      p.quad(-x, 0, 0, radius, -x, y, -x, -y);
      p.pop();
    }
  });
}

export default p5Cube;
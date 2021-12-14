import State from "./State.js";

const [ENG, ESP] = ['eng', 'esp'];
const WAIT = 4; //seconds between posts
const POSTS = 5;
const RADIUS = 40;

function Cube({
  onready = () => null,
  onclick = () => null,
  container = document.body,
  center = '000',
  lang = ENG,
  vicinity = false,
  ref = undefined,
  noLabels = false,
}) {
  let me = new p5(function () {});
  me.vicinity = vicinity;
  me.ref = ref;
  me.isHover = false;
  me.nextPost = Math.floor(Math.random() * POSTS);
  me.currentPost = 0;
  me.changePost = false;
  me.centerCode = center;
  me.onclick = onclick;
  me.onready = onready;
  me.lang = lang !== undefined ? lang : ENG;

  me.setup = function () {
    let canvas = me.createCanvas(me.windowWidth, 400);
    me.center = [me.width * 0.5, me.height * 0.5];
    if (container) container.create({
      content: canvas.elt,
      onready: me.onready
    }, true);

    me.strokeWeight(3);
    me.textFont('Verdana');
    me.textSize(me.size);
    me.textAlign(me.CENTER, me.CENTER);

    me.states = new Array(27).fill().map((_, i) => new State({
      sketch: me,
      index: i
    })).filter(state => !me.vicinity || state.isNear()).sort(state => state.tier);
    me.size = 0.4 * me.states[0].radius;

    if (me.ref) me.states.forEach(state => state.setRef(me.ref));
    me.animate();
  }

  me.draw = function () {
    me.clear();
    me.translate(...me.center);
    me.states.forEach(s => {
      s.setRef(me.overState);
      s.interact = !!me.overState;
      s.draw()
    });
    if (me.overState) {
      let c = me.color('#' + me.overState.info.code.codeToHex())
      let l = me.lightness(c) < 45 || me.green(c) < 45;
      me.stroke(c);
      me.fill(l ? 255 : 0);
      me.text(me.overState.info.archetype, me.mouseX - me.center[0], me.mouseY - me.center[1] - me.size);
    }
    if (me.changePost) {
      me.states.forEach(s => s.post = s.post === 0 ? me.nextPost : 0);
      me.currentPost = me.states[0].post;
      me.animate();
      me.changePost = false;
    }
    if (!me.currentPost || noLabels) return; // not to draw the labels
    let y = RADIUS * 4.5;
    let x = RADIUS * 4.75;
    const esp = me.lang === ESP;
    let texts = [
      [esp ? 'Activo' : 'Active', -x, y],
      [esp ? 'Atento' : 'Attentive', 0, y],
      [esp ? 'Introspectivo' : 'Introspective', x, y]
    ];
    if (me.currentPost === 2) texts = [
      [esp ? 'Instintivo' : 'Instinctive', -x * 1.12, y],
      [esp ? 'Informativo' : 'Informative', 0, y],
      [esp ? 'Regulativo' : 'Regulative', x * 1.12, y]
    ];
    else if (me.currentPost === 3) texts = [
      [esp ? 'Objetivo' : 'Objective', -x, y],
      [esp ? 'Sensible' : 'Responsive', 0, y],
      [esp ? 'Affectivo' : 'Affective', x, y]
    ];
    else if (me.currentPost === 4) texts = [
      ['Base', -x * 1.28, y],
      [esp ? 'Periféricos & Neutro' : 'Peripheral & Neutral', 0, y],
      [esp ? 'Tope' : 'Top', x * 1.28, y]
    ];
    me.fill(0);
    me.textAlign(me.CENTER, me.CENTER);
    me.textSize(RADIUS * 0.34);
    texts.forEach(t => me.text(...t));
  }

  me.animate = function (wait = 1000) {
    if (me.timeOut) clearTimeout(me.timeOut);
    if (me.freeze && me.currentPost === me.nextPost) return;
    let isIni = me.currentPost !== 0 || me.nextPost === 0;
    me.timeOut = setTimeout(() => me.changePost = !me.isHover, wait * (isIni ? WAIT : 0.5));
    if (isIni) me.nextPost = (me.nextPost + 1) % POSTS;
  }

  me.view = function (view) {
    me.changePost = true;
    if (isNaN(view)) {
      me.states.forEach(s => s.hidden = false);
      me.freeze = false;
      me.nextPost = (me.nextPost + 1) % POSTS;
      me.animate();
      return;
    }
    me.freeze = true;
    me.states.forEach(s => s.hidden = view < 0 && !s.isRim && s.level - 3 > 2 * view);
    me.nextPost = view < 0 ? 0 : parseInt(view);
  }

  me.mouseMoved = function () {
    if (!me.canvas) return;
    me.isHover = !!parseInt(me.get(me.mouseX, me.mouseY).join('')); // any pixel color under the mouse
    me.cursor(me.isHover ? me.HAND : me.ARROW);
    if (me.isHover) {
      let newOver = me.states.filter(s => !s.hidden && me.dist(me.mouseX - me.center[0], me.mouseY - me.center[1], ...s.coords) < s.radius).pop();
      if (newOver === me.overState) return;
      if (me.overState) me.overState.selected = false;
      me.overState = newOver;
      if (me.overState) me.overState.selected = true;
      if (me.onmouseover) me.onmouseover(me.overState);
    } else {
      if (me.overState) {
        me.overState.selected = false;
        if (me.onmouseout) me.onmouseout(me.overState);
        me.animate();
      }
      me.overState = false;
    }
  }

  me.mouseReleased = function () {
    if (!me.isHover) return;
    if (me.onclick) me.onclick(me.overState);
  }

  return me;
}

export default Cube;

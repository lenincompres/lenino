export function showMe(hex = 0) {
  if (dom.results) dom.results.forEach(result => result.removeClass('selected'));
  var isResults = !!results[hex];
  if (isResults) {
    if (dom.results) dom.results[hex].addClass('selected');
    hex = results[hex];
  }
  //
  var z = 12;
  clear();
  push();
  translate(width / 2, height / 2);
  state = new State(hex.substr(1).hexToCode());
  state.radius = width / 2;
  state.draw();
  pop();
  dom.archetype.html(state.arch);
  dom.approx.elt.style.display = isResults ? 'block' : 'none';
  //
  var mb = breakdown(hex);
  dom.mbti.elt.innerHTML = mb.type;
  dom.mbti.elt.style.color = hex;
  barMap.r.value = mb.r;
  barMap.g.value = mb.g;
  barMap.b.value = mb.b;
  barMap.i.value = mb.i;
  barMap.s.value = mb.s;
  barMap.f.value = mb.f;
  barMap.j.value = mb.j;
  barMap.id.value = 0.5 * (mb.r + mb.b);
  barMap.ego.value = 0.5 * (mb.g + mb.r);
  barMap.sup.value = 0.5 * (mb.g + mb.b);
}

export function breakdown(hex) {
  var f = 100/255;
  var o = {};
  var c = color(hex);
  var d = 2; // threshold to decide on a letter
  o.r = f * red(c);
  o.g = f * green(c);
  o.b = f * blue(c);
  o.l = lightness(c);
  o.s = 100 * o.r / (0.5 * (o.g + o.b) + o.r);
  o.f = 100 * o.b / (o.g + o.b);
  o.j = (o.r + o.g + o.b) / 3;
  o.i = getI(o.g, o.b, o.r);
  o.type = ['I', 'E', '-'][o.i > 50 + d ? 0 : o.i < 50 - d ? 1 : 2];
  o.type += ['S', 'N', '-'][o.s > 50 + d ? 0 : o.s < 50 - d ? 1 : 2];
  o.type += ['F', 'T', '-'][o.f > 50 + d ? 0 : o.f < 50 - d ? 1 : 2];
  o.type += ['J', 'P', '-'][o.j > 50 + d ? 0 : o.j < 50 - d ? 1 : 2];
  return o;
}

export function drawState(hex) {
  clear();
  push();
  translate(width / 2, height / 2);
  var state = new State(hex.substr(1).hexToCode());
  state.draw();
  fill(0);
  textAlign(CENTER, CENTER);
  text('Closest state', state.coords[0], state.coords[1] - 50);
  text(state.arch, state.coords[0], state.coords[1] + 50);
  pop();
}

// methods
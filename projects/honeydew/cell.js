let FRIX = 0.92;
let B = 0.0003; //bounciness of the cells
let MUTABILITY = 0.86; // how likely is a mutation
let DEVIATION = 2; //standard deviation for clone mutation
let S = 0.5; // split speed
let ALPHA = 100;

let bounceNum = n => {
  if (n > 100) return 100 - 2 * (n - 100);
  else if (n < 0) return -2 * n;
  return n;
}

let cell = (mom = false, dad = false, sex = false) => {
  let me = {};
  me.age = 0;
  me.radius = 100;
  me.sex = sex ? random() : false;
  me.bg = color("white");

  if (typeof mom === "number") {
    me.radius = mom;
    if(dad) me.bg = dad;
    mom = undefined;
  }
  me.pos = createVector(0.5 * W, 0.5 * H);
  me.vel = createVector(0, 0);
  me.setColor = (h, l, s) => {
    if (h > 100) h -= 100;
    else if (h < 0) h = 100 - h;
    me.hue = h;
    me.lightness = bounceNum(l);
    me.saturation = bounceNum(s);
    me.color = color(me.hue, me.saturation, me.lightness, ALPHA);
    me.hue = hue(me.color);
    me.lightness = lightness(me.color);
  }
  me.setColor(hue(me.bg) + 50, (lightness(me.bg) + 50) % 100, saturation(me.bg));

  //sound stuff
  let types = ['sine', 'sawtooth', 'triangle', 'square'];
  me.env = new p5.Envelope();
  me.osc = new p5.Oscillator(types[0]);
  me.osc.amp(me.env);
  me.osc.freq(midiToFreq(60));
  me.play = (n = 0) => {
    me.osc.start();
    me.env.setRange(map(me.radius,40,200,0,1), 0);
    let freq = midiToFreq(map(me.hue, 0, 100, 0, 127));
    freq = freqAngle(me.hue, me.lightness);
    me.osc.freq(freq);
    me.env.setADSR(0.1, 0.5, 0);
    me.env.play();
  }
  //
  me.mutate = (sd = DEVIATION) => {
    me.age = 0;
    let h = random() < MUTABILITY ? randomGaussian(me.hue, sd) : me.hue;
    let l = random() < MUTABILITY ? randomGaussian(me.lightness, sd) : me.lightness;
    let s = random() < MUTABILITY ? randomGaussian(me.saturation, sd) : me.saturation;
    me.setColor(h, l, s);
    me.radius = constrain(randomGaussian(me.radius, sd), 0.5 * R, 2 * R);
    return me;
  }
  if (mom && dad) {
    me.bg = mom.bg;
    me.setColor((mom.hue + dad.hue) / 2, (mom.lightness + dad.lightness) / 2, (mom.saturation + dad.saturation) / 2);
    me.radius = (mom.radius + dad.radius) / 2;
  } else if (mom) {
    me.bg = mom.bg;
    me.setColor(mom.hue, mom.lightness, mom.saturation);
    me.radius = mom.radius;
  }
  if (mom) {
    me.pos = createVector(mom.pos.x, mom.pos.y);
    me.vel = createVector(-mom.vel.x, -mom.vel.y);
    me.mutate();
  }
  me.play();

  me.draw = () => {
    let diam = 2 * (me.radius - me.vel.mag());
    let hole = !me.sex ? 0 : 0.25;
    push();
    translate(me.pos.x, me.pos.y);
    noStroke();
    fill(me.color);
    circle(0, 0, diam);
    if (me.sex) {
      fill(me.bg);
      circle(0, 0, hole * diam);
      stroke(me.color);
      let d = diam * hole * 0.25;
      strokeWeight(d);
      line(d, 0, -d, 0);
      if (me.sex > 0.5) line(0, d, 0, -d);
    }
    pop();
  };

  me.update = () => {
    let [left, right, top, bottom] = [me.radius, W - me.radius, me.radius, H - me.radius];
    me.pos.add(me.vel);
    me.pos.x = constrain(me.pos.x, left, right);
    me.pos.y = constrain(me.pos.y, top, bottom);
    if (me.pos.x <= left || me.pos.x >= right) me.vel.x *= -1;
    if (me.pos.y <= top || me.pos.y >= bottom) me.vel.y *= -1;
    me.vel.mult(FRIX);
    let mag = me.vel.mag();
    if (mag < 0.1) me.vel.setMag(0);
    me.age += 1;
    me.draw();
  };

  me.divide = () => {
    me.vel = createVector(random(-W, W), random(-H, H)).setMag(S);
    let baby = cell(me)
    me.radius += me.radius - baby.radius;
    me.setColor(2 * me.hue - baby.hue, 2 * me.lightness - baby.lightness, 2 * me.saturation - baby.saturation);
    me.age = 0;
    me.play();
    return baby;
  };

  return me;
}

function freqAngle(hue, light = 50) {
  let scale = 32;
  let oct = 12;
  let rings = 8;
  let center = 60 + oct * 2;
  let top = midiToFreq(center + rings / 2 * oct);
  let base = midiToFreq(center - rings / 2 * oct);
  let ringSize = (top - base) / (scale * rings);
  let ring = map(light, 0, 100, 0, rings);
  let note = map(hue, 0, 100, 0, ringSize);
  return base + note + ring * ringSize;
}
var id = 0;

function quant(r = 1, a = random(0, 2 * PI), x = 0, y = 0) {
  var Q = [];
  if (a === []) return;
  let max = MAXV ? MAXV : 0.5 * r;
  if (typeof a === 'number') {
    Q.push({
      x: x,
      y: y,
      vx: max * cos(a),
      vy: max * sin(a),
      osc: new p5.Oscillator(),
      env: new p5.Envelope()
    });
    Q[0].osc.amp(Q[0].env);
    Q[0].osc.freq(midiToFreq(60));
    let types = ['sine', 'sawtooth', 'triangle', 'square'];
    Q[0].osc.setType(types[0]);
    Q[0].osc.start();
    Q[0].env.setRange(1 / TOTAL, 0);
  } else if (typeof a !== 'number') {
    a.forEach(q => {
      q.g = true;
      q.z > 1 ? Q.push(...q.Q) : Q.push(q);
    });
  }
  var o = {
    id: id++,
    Q: Q,
    z: Q.length,
    t: 0,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0
  };
  //cumulative position and velocity
  Q.forEach(q => {
    o.x += q.x / o.z;
    o.y += q.y / o.z;
    o.vx += q.vx / o.z;
    o.vy += q.vy / o.z;
    if (!o.env) {
      o.osc = q.osc ? q.osc : null;
      o.env = q.env ? q.env : null;
    }
  });
  //resulting angle, velocity, diameter, power and color
  o.v = dist(0, 0, o.vx, o.vy);
  o.d = r * sqrt(o.z);
  o.p = o.v / max;
  o.ps = sCurve(o.p); //power on S pattern
  o.pc = pow(o.p, 0.5); //power on curved pattern

  //livespan
  o.ls = LIFESPAN; //random(LIFESPAN * 2);

  o.setAngle = () => {
    o.a = atan2(-o.vy, o.vx);
    o.a = (TWO_PI + o.a) % TWO_PI;
    colorMode(HSB);
    o.c = color(180 * o.a / PI, map(o.z, 0, TOTAL, 100, 0), map(o.v, 0, max, 10, 100));
    o.c = [red(o.c), green(o.c), blue(o.c)];
    colorMode(RGB);
  }
  o.setAngle();

  //draw
  o.draw = () => {
    noStroke();
    fill(...o.c);
    circle(o.x, o.y, r);
    let alph = 255 * 0.25;
    fill(...o.c, alph);
    strokeWeight(2);
    stroke(...o.c, map(o.t, 0, o.ls, 255, 0));
    circle(o.x, o.y, o.d);
    o.x += o.vx;
    o.y += o.vy;
    // loop around screen
    if (true) {
      let rand = random(max * THRESH); //adds a bit of randomess to the bounds
      o.x = o.x < 0 - rand ? width : o.x > width + rand ? 0 : o.x;
      o.y = o.y < 0 - rand ? height : o.y > height + rand ? 0 : o.y;
    } else {
      let bounced = false;
      if (o.x < 0 || o.x > width) {
        o.vx = -o.vx * 0.9;
        bounced = true;
      }
      if (o.y < 0 || o.y > height) {
        o.vy = -o.vy * 0.9;
        bounced = true;
      }
      if (bounced) o.setAngle(); // shoulds sound again, could not figure it out
    }
    // bounce
    o.Q.forEach(q => {
      q.x = o.x;
      q.y = o.y;
      q.osc.pan((q.x / width, 0, 1, -1, 1));
    });
    o.t++;
  };

  //music
  o.play = (n = 0) => {
    Q.forEach(q => {
      let lifespan = o.ls / (2 * frameRate())
      q.osc.freq(freqAngle(o.a, o.v / max));
      q.env.setADSR(0.1 * lifespan, o.z > 1 ? 1.3 * lifespan : 0, o.z > 1 ? 0 : 0.1);
      q.env.triggerAttack(0, 0);
    });
  }
  o.kill = _ => o.dead = true;
  o.play(1);

  return o;
}

// gets the tone for that angle in a octave based off speed
function freqAngle(a, v = 1) {
  let oct = 12;
  let rings = 8;
  let center = 60 + oct * 2;
  let top = midiToFreq(center + rings / 2 * oct);
  let base = midiToFreq(center - rings / 2 * oct);
  let ringSize = (top - base) / (TOTAL * rings);
  let ring = map(sqrt(v), 0, 1, 0, rings);
  let note = map(a, 0, 2 * PI, 0, ringSize);
  return base + note + ring * ringSize;
}

function sCurve(v) {
  return 0.5 + 0.5 * pow(2 * v - 1, 3);
}
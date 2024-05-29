var id = 0;

function quant(radius = 1, angle = random(0, 2 * PI), x = 0, y = 0) {
  var Q = [];
  if (angle === []) return;
  let max = MAXV ? MAXV : 0.5 * radius;
  if (typeof angle === 'number') {
    Q.push({
      pos: createVector(x, y),
      vel: createVector(cos(angle), sin(angle)).mult(max),
      osc: new p5.Oscillator(),
      env: new p5.Envelope()
    });
    Q[0].osc.amp(Q[0].env);
    Q[0].osc.freq(midiToFreq(60));
    let types = ['sine', 'sawtooth', 'triangle', 'square'];
    Q[0].osc.setType(types[0]);
    Q[0].osc.start();
    Q[0].env.setRange(1 / TOTAL, 0);
  } else if (typeof angle !== 'number') {
    angle.forEach(q => {
      q.g = true;
      q.Q.length > 1 ? Q.push(...q.Q) : Q.push(q);
    });
  }
  var o = {
    id: id++,
    Q: Q,
    t: 0,
    mass: Q.length,
    pos: createVector(0, 0),
    vel: createVector(0, 0),
    angle: angle,
  };
  //cumulative position and velocity
  Q.forEach(q => {
    let factor = 1 / o.Q.length;
    o.pos.add(q.pos.copy().mult(factor));
    o.vel.add(q.vel.copy().mult(factor));
    if (!o.env) {
      o.osc = q.osc ? q.osc : null;
      o.env = q.env ? q.env : null;
    }
  });
  //resulting angle, velocity, diameter, power and color
  o.speed = o.vel.mag(); //dist(0, 0, o.vel.x, o.vel.y);
  o.diam = radius * sqrt(o.Q.length);
  o.power = o.speed / max;
  o.powerS = sCurve(o.power); //power on S pattern
  o.powerC = pow(o.power, 0.5); //power on curved pattern

  //livespan
  o.livespan = LIFESPAN; //random(LIFESPAN * 2);

  o.setAngle = () => {
    o.angle = atan2(-o.vel.y, o.vel.x);
    o.angle = (TWO_PI + o.angle) % TWO_PI;
    o.color = getColour(o.angle, map(o.Q.length, 0, TOTAL, 100, 0), map(o.speed, 0, max, 10, 100));
  }
  o.setAngle();

  o.shape = (x, y, r, tip = false) => {
    if (dist(0, 0, o.vel.x, o.vel.y) < 0.01) return circle(0, 0, r);
    if (tip) triangle(0, 0, -0.1 * r, 0.6 * r, 0.1 * r, 0.6 * r);
    //else rotate(PI);
    r *= 0.036;
    beginShape();
    for (i = 0; i < TWO_PI; i += 0.1) {
      let xi = 16 * pow(sin(i), 3);
      let yi = 13 * cos(i) - 5 * cos(2 * i) - 2 * cos(3 * i) - cos(4 * i);
      vertex(r * xi, r * yi);
    }
    endShape();
    //if (!tip) rotate(-PI);
  }

  //draw
  o.draw = (doPulse = true) => {
    push();
    translate(o.pos.x, o.pos.y);
    rotate(PI / 2 + atan2(o.vel.y, o.vel.x));
    noStroke();
    fill(...o.color);
    o.shape(o.pos.x, o.pos.y, radius, true);
    let tresh = map(o.t, 0, o.livespan, 0.2, 0);
    let speed = map(o.note, 100, 800, 0.1, 10);
    let pulse = map(sin(o.t * speed), -1, 1, 1 - tresh, 1 + tresh);
    if(!doPulse) pulse = 1;
    fill(...o.color, 255 * 0.15);
    strokeWeight(2);
    noStroke();
    o.shape(o.pos.x, o.pos.y, o.diam);
    noFill();
    let dis = map(abs(1 - pulse), 0, tresh, 1, 0);
    stroke(...o.color, map(o.t, 0, o.livespan, 255, 0) * dis);
    o.shape(o.pos.x, o.pos.y, o.diam * pulse);
    pop();
  };

  o.update = () => {
    o.pos.add(o.vel);

    // bounds
    let rand = random(max * THRESH); //adds a bit of randomess
    o.pos.x = o.pos.x < 0 - rand ? width : o.pos.x > width + rand ? 0 : o.pos.x;
    o.pos.y = o.pos.y < 0 - rand ? height : o.pos.y > height + rand ? 0 : o.pos.y;

    o.Q.forEach(q => {
      q.pos = o.pos.copy();
      q.osc.pan((q.pos.x / width, 0, 1, -1, 1));
    });

    o.t++;
  }

  //music
  o.play = () => {
    o.note = freqAngle(o.angle, o.speed / max);
    Q.forEach(q => {
      let lifespan = o.livespan / (2 * frameRate());
      q.osc.freq(o.note);
      q.env.setADSR(0.1 * lifespan, o.Q.length > 1 ? 1.3 * lifespan : 0, o.Q.length > 1 ? 0 : 0.1);
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

function getColour(angle, s, l){
  colorMode(HSB);
  let h = (210 + (360 - 180 * angle / PI)) % 360;
  let colour = color(h, s, l);
  colour = [red(colour), green(colour), blue(colour)];
  colorMode(RGB);
  return colour;
}

function sCurve(v) {
  return 0.5 + 0.5 * pow(2 * v - 1, 3);
}
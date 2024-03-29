var id = 0;

class Bell {
  constructor(radius = 1, angle = random(0, 2 * PI), x = 0, y = 0) {
    this.Q = [];
    if (angle === []) return;
    if (typeof angle === 'number') {
      let phot = {
        pos: createVector(x, y),
        vel: createVector(cos(angle), sin(angle)).mult(MAXV),
        osc: new p5.Oscillator(),
        env: new p5.Envelope()
      };
      this.Q.push(phot);
      phot.osc.amp(phot.env);
      phot.osc.freq(midiToFreq(60));
      let types = ['sine', 'sawtooth', 'triangle', 'square'];
      phot.osc.setType(types[0]);
      phot.osc.start();
      phot.env.setRange(1 / TOTAL, 0);
    } else if (typeof angle !== 'number') {
      angle.forEach(phot => {
        phot.group = this;
        phot.Q.length > 1 ? this.Q.push(...phot.Q) : this.Q.push(phot);
      });
    }
    this.radius = radius;
    this.angle = angle;
    this.id = id++;
    this.t = 0;
    this.mass = this.Q.length;
    this.diam = radius * sqrt(this.mass);
    this.pos = createVector(0, 0);
    this.Q.forEach(q => this.pos.add(q.pos.copy().mult(1 / this.Q.length)));
    //cumulative position and velocity
    this.getVel();
    //resulting angle, velocity, diameter, power and color

    //livespan
    this.livespan = LIFESPAN; //random(LIFESPAN * 2);
    this.play(1);
  }

  set vel(vect){
    this._vel = vect.copy();
    this.speed = this.vel.mag();
    this.setAngle();
  }

  get vel(){
    return this._vel;
    this.setAngle();
  }

  getVel() {
    let vel = createVector(0, 0);
    this.Q.forEach(q => {
      vel.add(q.vel.copy().mult(1 / this.mass));
      if (!this.env) {
        this.osc = q.osc ? q.osc : null;
        this.env = q.env ? q.env : null;
      }
    });
    this.vel = vel;
  }

  setAngle() {
    this.angle = (TWO_PI + atan2(-this.vel.y, this.vel.x) % TWO_PI);
    let light = map(this.speed, 0, MAXV, 30, 100);
    let sat = 100; //map(this.mass, 0, TOTAL, 100, 0);
    this.color = Bell.getColour(this.angle, sat, light);
  }

  shape(x, y, r, tip = false) {
    if (dist(0, 0, this.vel.x, this.vel.y) < 0.01) return circle(0, 0, r);
    if (tip) triangle(0, 0, -0.1 * r, 0.6 * r, 0.1 * r, 0.6 * r);
    r *= 0.036;
    beginShape();
    for (let i = 0; i < TWO_PI; i += 0.1) {
      let xi = 16 * pow(sin(i), 3);
      let yi = 13 * cos(i) - 5 * cos(2 * i) - 2 * cos(3 * i) - cos(4 * i);
      vertex(r * xi, r * yi);
    }
    endShape();
  }

  //draw
  draw(doPulse = true) {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(PI / 2 + atan2(this.vel.y, this.vel.x));
    noStroke();
    fill(...this.color);
    this.shape(this.pos.x, this.pos.y, this.radius, true);
    let tresh = map(this.t, 0, this.livespan, 0.2, 0);
    let speed = map(this.note, 100, 800, 0.1, 10);
    let pulse = map(sin(this.t * speed), -1, 1, 1 - tresh, 1 + tresh);
    if (!doPulse) pulse = 1;
    fill(...this.color, 255 * 0.15);
    strokeWeight(2);
    noStroke();
    this.shape(this.pos.x, this.pos.y, this.diam);
    noFill();
    let dis = map(abs(1 - pulse), 0, tresh, 1, 0);
    stroke(...this.color, map(this.t, 0, this.livespan, 255, 0) * dis);
    this.shape(this.pos.x, this.pos.y, this.diam * pulse);
    pop();
  };

  update() {
    this.pos.add(this.vel);

    // bounds
    let rand = random(MAXV * THRESH); //adds a bit of randomess
    if (this.pos.x < 0 - rand) {
      this.pos.x = width;
    } else if (this.pos.x > width + rand) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0 - rand) {
      this.pos.y = height;
    } else if (this.pos.y > height + rand) {
      this.pos.y = 0;
    }

    this.Q.forEach(q => {
      q.pos = this.pos.copy();
      q.osc.pan(map(q.pos.x / width, 0, 1, -1, 1));
    });

    this.t++;
  }

  push(force) {
    if (this.group) {
      this.Q.forEach(phot => phot.push(force));
      this.getVel();
    } else {
      force.mult(pow(MAXV,1.5)).add(this.vel);
      force.setMag(this.vel.mag());
      this.vel = force;
    }
  }

  pull(x, y, strength) {
    if (strength <= 0) return;
    let pull = createVector(x, y).sub(this.pos);
    let distance = pull.mag();
    if (distance < 0.5 * THRESH) return;
    pull.setMag(strength / pow(distance, 2));
    this.push(pull)
  }

  //music
  play() {
    this.note = Bell.freqAngle(this.angle, this.speed / MAXV);
    this.Q.forEach(q => {
      let lifespan = this.livespan / (2 * frameRate());
      q.osc.freq(this.note);
      q.env.setADSR(0.1 * lifespan, this.Q.length > 1 ? 1.3 * lifespan : 0, this.Q.length > 1 ? 0 : 0.1);
      q.env.triggerAttack(0, 0);
    });
  }

  kill() {
    this.dead = true;
    this.Q.forEach(b => {
      b.group = false;
      b.t = 0;
      b.play();
    });
    return this.Q;
  }

  // gets the tone for that angle in a octave based off speed
  static freqAngle(a, v = 1) {
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

  static getColour(angle, s, l) {
    colorMode(HSB);
    let h = (210 + (360 - 180 * angle / PI)) % 360;
    let colour = color(h, s, l);
    colorMode(RGB);
    return [red(colour), green(colour), blue(colour)];
  }

  static sCurve(v) {
    return 0.5 + 0.5 * pow(2 * v - 1, 3);
  }
}
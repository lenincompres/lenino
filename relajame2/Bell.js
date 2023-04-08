var id = 0;

let bells = [];

class Photon {
  constructor(angle = random(0, 2 * PI), x = 0, y = 0) {
    let radius = THRESH;
    this.pos = createVector(x, y);
    this.osc = new p5.Oscillator();
    this.env = new p5.Envelope();
    this.osc.amp(this.env);
    this.osc.freq(midiToFreq(60));
    let types = ['sine', 'sawtooth', 'triangle', 'square'];
    this.osc.setType(types[0]);
    this.osc.start();
    this.env.setRange(1 / TOTAL, 0);
    this.radius = radius;
    this.firstAngle = angle;
    this.angle = angle;
    this.id = id++;
    this.t = 0;
    this.mass = 1;
    this.diam = radius * sqrt(this.mass);
    this.livespan = LIFESPAN; //random(LIFESPAN * 2);
    this.play(1);
    this.sat = 100; //map(this.mass, 0, TOTAL, 100, 0);
    bells.push(this);
  }

  get speed() {
    return MAXV;
  }

  get firstVel(){
    return createVector(cos(this.firstAngle), sin(this.firstAngle)).setMag(MAXV);
  }

  get vel() {
    return createVector(cos(this.angle), sin(this.angle)).setMag(this.speed);
  }

  get light() {
    return map(this.speed, 0, MAXV, 20, 100);
  }

  get color() {
    return Photon.getColour(this.angle, this.sat, this.light);
  }

  get note() {
    return Photon.freqAngle(this.angle, this.speed / MAXV);
  }

  fuse(bell) {
    if (this === bell) return;
    if (bell.dead) return;
    if (bell.t <= DELAY || this.t <= DELAY) return;
    if (Array.isArray(bell)) return bell.forEach(b => this.fuse(b));
    if(bell.group) return bell.group.fuse(this);
    let d = p5.Vector.sub(bell.pos, this.pos).mag();
    if (d > 0.5 * THRESH) return;
    if (Array.isArray(bell.photons)) bell.add(this);
    new Bell([this, bell]);
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
  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(PI / 2 + this.angle);
    fill(...this.color);
    noStroke();
    this.shape(this.pos.x, this.pos.y, this.radius, true);
    pop();
  };

  update() {
    this.pos.add(this.vel.add);
    this.angle = lerp(this.angle, this.firstAngle, 0.2);

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

    this.t++;
  }

  push(force) {
    force.add(this.vel);
    let a = (TWO_PI + atan2(force.y, force.x)) % TWO_PI;
    this.angle = a;
  }

  pull(x, y, strength) {
    if (strength <= 0) return;
    let pull = createVector(x, y).sub(this.pos);
    let distance = pull.mag();
    if (distance < THRESH) return;
    pull.setMag(strength / pow(distance, 2));
    //this.push(pull)
  }

  //music
  play() {
    let ls = this.livespan / (2 * frameRate());
    this.osc.freq(this.note);
    this.env.setADSR(0.1 * ls, 1.3 * ls, 0);
    this.env.triggerAttack(0, 0);
  }

  kill() {
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
    if (l === undefined) l = s;
    colorMode(HSB);
    let h = (210 + (360 - 180 * angle / PI)) % 360;
    let colour = color(h, s, l);
    colorMode(RGB);
    return [red(colour), green(colour), blue(colour)];
  }
}

class Bell extends Photon {
  constructor(photons = []) {
    super();
    this.photons = [];
    photons.forEach(p => this.add(p));
    this.mass = this.photons.length;
    let radius = THRESH;
    this.diam = radius * sqrt(this.mass);
    this.id = id++;
    this.t = 0;
    this.pos = createVector(0, 0);
    this.photons.forEach(q => this.pos.add(q.pos.copy().mult(1 / this.mass)));
    //cumulative position and velocity
    this.livespan = LIFESPAN; //random(LIFESPAN * 2);
    this.play();
  }

  add(p) {
    if (!p.photons) {
      this.photons.push(p);
      p.group = this;
      if (!this.env) {
        this.osc = q.osc ? q.osc : null;
        this.env = q.env ? q.env : null;
      }
      return;
    }
    p.photons.forEach(p => this.add(p));
    p.dead = true;
  }

  play() {
    if (this.photons) this.photons.forEach(q => {
      let ls = this.livespan / (2 * frameRate());
      q.osc.freq(this.note);
      q.env.setADSR(0.1 * ls, 1.3 * ls, 0);
      q.env.triggerAttack(0, 0);
    });
  }

  get speed() {
    if(!this._vel) this.vel;
    return this._vel.mag();
  }

  get vel() {
    let vel = this.photons.reduce((o, q) => o.add(q.vel.copy()), createVector(0, 0));
    vel.mult(1 / this.mass);
    this.angle = atan2(vel.y, vel.x);
    return this._vel = vel;
  }

  //draw
  draw() {
    this.photons.forEach(q => q.draw());
    push();
    translate(this.pos.x, this.pos.y);
    rotate(PI / 2 + this.angle);
    noStroke();
    let tresh = map(this.t, 0, this.livespan, 0.2, 0);
    let speed = map(this.note, 100, 800, 0.1, 10);
    let pulse = map(sin(this.t * speed), -1, 1, 1 - tresh, 1 + tresh);
    fill(...this.color, 255 * 0.2);
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
    super.update();
    this.photons.forEach(q => {
      q.pos = this.pos.copy();
      q.osc.pan((q.pos.x / width, 0, 1, -1, 1));
    });
    if(this.speed < MINV || this.t > this.livespan && this.mass > 1) this.kill();
  }

  push(force) {
    this.photons.forEach(phot => phot.push(force.mult(1/100)));
    this.vel;
  }

  kill() {
    this.dead = true;
    this.photons.forEach(b => {
      b.group = false;
      b.t = 0;
      b.play();
      bells.push(b);
    });
    return this.photons;
  }
}
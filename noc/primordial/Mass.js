class Mass {
  constructor(m = 1000, x, y, world = {}) {
    this.mass = m;
    this.hue = random(100);

    this.x = x !== undefined ? x : random(width);
    this.y = y !== undefined ? y : random(height);
    this.velocity = createVector().rotate(random(TWO_PI));
    this.force = createVector();
    this.angSpeed = 0;

    this.world = world;
    if (!world.friction) world.friction = 0.04;
    if (!world.frameRate) world.frameRate = frameRate();
    if (!world.masses) world.masses = [];
    this.world.masses.push(this);

    this.actions = [];
    this.updates = [];
    this.addTrait("show", "move");
  }

  get radius() {
    return sqrt(this.mass / PI);
  }

  get diam() {
    return 2 * this.radius;
  }

  get color() {
    this.hue = (this.hue + 100) % 100; // wraps around
    let c = color(this.hue, this.s ? this.s : 100, this.l ? this.l : 60);
    return c;
  }

  get position() {
    return createVector(this.x, this.y);
  }

  set position(pos) {
    this.x = pos.x;
    this.y = pos.y;
  }

  run() {
    if (this.mass <= 0) return;
    this.actions.forEach(action => action(this));
    return this;
  }

  update() {
    if (this.mass <= 0) return;
    this.updates.forEach(uptade => uptade(this));
    if (this.mass > 0) return this;
    this.world.masses = this.world.masses.filter(m => m !== this);
  }

  addTrait(...traits) {
    traits.forEach(trait => {
      if (!Mass.TRAITS[trait]) return;
      if (!this.traits) this.traits = [];
      if (!this.traits.includes(trait)) {
        this.traits.push(trait);
        this.traits.sort((a, b) => (b.sort ? b.sort : 0) - (a.sort ? a.sort : 0)).reverse();
        trait = Mass.TRAITS[trait];
        if (trait.setup) trait.setup(this);
        let args = trait.args ? trait.args : trait.arg ? [trait.arg] : [];
        if (trait.update) this.updates.push(() => trait.update(this, ...args));
        if (trait.action) this.actions.push(() => trait.action(this, ...args));
      }
    });
  }

  static TRAITS = {
    show: {
      action: me => {
        push();
        stroke(me.color);
        strokeWeight(me.diam);
        noFill();
        translate(me.x, me.y);
        point(0, 0);
        pop();
      }
    },
    move: {
      update: me => {
        let distance = me.force.copy().mult(1 / me.mass); // d = f/m
        let a = me.velocity.heading();
        me.velocity.add(distance).limit(me.diam);
        me.position = me.position.add(me.velocity);
        me.velocity.mult(1 - me.world.friction);
        me.force.mult(0);
        a -= me.velocity.heading();
        let burn = sqrt(me.mass * distance.mag() * me.world.friction);
        burn += sqrt(PI * abs(a) * me.mass * me.world.friction);
        burn = max(0.3 * burn, 4 / me.world.frameRate);
        me.mass -= burn;
      }
    },
    /*
        moveWithoutVelocity: {
          update: me => {
            let distance = me.force.copy().mult(me.radius / (PI * me.mass)).limit(this.diam); // d = f/m
            me.position = me.position.add(distance);
            me.force.mult(0.94);
            if(me.force.mag() < 1) me.force.mult(0);
            let burn = 1 + sqrt(me.mass * distance.mag() * me.world.friction);
            me.mass -= burn;
            if (me.mass > 0) return me;
            me.world.masses = me.world.masses.filter(m => m !== me);
          }
        },*/
  }
}

export default Mass;
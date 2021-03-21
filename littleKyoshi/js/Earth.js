class Earth extends P5Body {

  constructor(x = 10, y = 10, m = 40, d = 1, type = 0) {
    let w = m / d;
    let h = m / d;
    let types = ['sienna', 'lightgray', 'black']; //, 'orangeRed'];
    type = types[type];
    super(x, y, w, h, {
      group: 'earth',
      category: 0x0001,
      friction: 1,
      restitution: 0.2,
      density: 0.5,
      isStatic: false
    });
    this.c = type;
    this.ca = opacate(this.c, 0.86);
    this.radius = w * 0.1;
    this.bent = false;
    this.hurled = false;
    if (type !== types[1]) this.body.collisionFilter.group = -1;
  }

  before() {
    var moving = this.vel.mag() > 0.001;
    if (hero.bending) this.bend();
    this.bent = hero.bending || moving;
    if (this.bent === this.body.isStatic) this.static = !this.bent;
    if (moving && !hero.bending && !this.hurled) this.factorVelocity(0.5);
    if (this.hurled && this.vel.mag() < 1) this.hurled = false;
    this.color = this.bent ? this.ca : this.c;
  }


  bend() {
    if (hero.hurling && this.hurled) return;
    var p = 1000;
    let vect = hero.teleing ? createVector(mouseX, mouseY) : createVector(hero.pos.x, hero.pos.y);
    vect.sub(this.pos);
    let d = vect.mag();
    let m = sqrt(this.w * this.h);
    if (hero.hurling && d < 10) {
      vect = createVector(mouseX, mouseY);
      vect.sub(hero.pos);
      this.velocity = vect.setMag(100 / sqrt(m));
      this.hurled;
    }
    this.addVelocity(vect.setMag(range(p / d / m, 0, 1)));
    this.factorVelocity(1, 1, .9);
  }
}
class Dice {



  constructor(x = 0, y = 0, dieSize = 50, n = 2, colour = 255) {

    this.x = x;

    this.y = y;

    this.dieSize = dieSize;

    this.dice = Array(n).populate(i => new Die(x - dieSize * (n - 1) * 0.5 + dieSize * i, y - dieSize * 0.5, dieSize, colour));

    this.dice.forEach(die => die.overflow = OVERFLOW.BOUNCE);

    this._colour = colour;

    this.disabled = false;

  }



  draw() {

    push();

    translate(0, 0);

    this.dice.forEach((die, i) => {

      let v = dist(die.vx, die.vy, 0, 0);

      if (die.rolling && (v > 0 && v < 5)) {

        die.stop();

        die.goTo(this.x + this.dieSize * i, this.y);

      }

      die.draw();

    });

    pop();

  }



  roll() {

    let a = TWO_PI - random(PI);

    this.dice.forEach((die, i) => {

      die.kick(a + i * PI / 24, 100);

      die.roll();

    });

  }



  stop() {

    this.dice.forEach(die => die.stop());

  }



  isMe(...args) {

    let [x, y] = [mouseX, mouseY];

    return abs(x - this.x - this.dieSize * 0.5) < this.dieSize && abs(y - this.y) < this.dieSize * 0.5;

  }



  set colour(c = 255) {

    this._colour = c;

    this.dice.forEach(die => die.colour = color(c));

  }



  get colour() {

    return this._colour;

  }



  get value() {

    return this.dice.reduce((o, d) => o + d.number, 0);

  }



  get icon() {

    return this.dice.reduce((o, d) => o + d.icon, '');

  }



  set disabled(v) {

    this._disabled = v;

    this.dice.forEach(die => {

      die.faceColor = dilute(this.colour, v ? 0.17 : 1);

      die.dotColor = v ? this.colour : 0;

    });

  }



  get disabled() {

    return this._disabled;

  }



}
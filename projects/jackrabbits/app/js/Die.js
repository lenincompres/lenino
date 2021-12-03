class Die extends Item {



  constructor(x, y, size = 100, colour = 255, max = 6) {

    super(x, y);

    this.size = size;

    this.number = this.randomize();

    this.rolling = false;

    this.faceColor = colour;

    this.dotColor = 0;

    this.max = max;

  }



  draw() {

    this.update();

    let d = this.size * 0.28;

    let s = this.size * 0.2;

    push();

    translate(this.x * 1.0012, this.y * 1.0012);

    rotate(this.r);

    fill(0);

    noStroke();

    square(-this.size * 0.5, -this.size * 0.5, this.size * 1.058, s);

    pop();

    // square

    push();

    translate(this.x, this.y);

    rotate(this.r);

    fill(this.faceColor);

    stroke(0);

    strokeWeight(this.size * 0.04);

    square(-this.size * 0.5, -this.size * 0.5, this.size, s);

    // dots

    fill(this.dotColor);

    noStroke();

    if (this.number % 2) circle(0, 0, s);

    if (this.number > 1) {

      circle(-d, -d, s);

      circle(d, d, s);

    }

    if (this.number > 3) {

      circle(-d, d, s);

      circle(d, -d, s);

    }

    if (this.number > 5) {

      circle(d, 0, s);

      circle(-d, 0, s);

    }

    if (this.rolling) {

      let n = this.number - 1;

      this.number = (n + 1) % this.max + 1;

    }

    pop();

  }



  roll() {

    this.randomize();

    this.rolling = true;

    this.vr = PI / 12;

  }



  stop() {

    if (this.rolling) {

      this.rolling = false;

      this.turnTo(0);

    }

  }



  randomize() {

    return this.number = floor(random(this.max)) + 1;

  }



  get icon() {

    return ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"][this.number - 1];

  }



}
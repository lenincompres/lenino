const FLIP_SPEED = 3;

class Card extends Dot {
  constructor(x = 0, y = 0, size = 100, number = 1, suit) {
    super(x, y, size);
    this.width = size;
    this.height = Card.ratio * size;
    this.w2 = this.width / 2;
    this.h2 = this.height / 2;
    if (number === undefined) number = round(random(10));
    this._number = this.number = number;
    if (!suit) suit = random(SUITS);
    this.suit = this._suit = suit;
    this.flip = FLIP_SPEED;
    this.blend = FLIP_SPEED;
    this._bg = color(255);
    this._rot = this.rot = 0;
    this.scale = 1.0;
    this.time = frameCount;
    this.angVelocity = (random(2) - 1) / 10;
  }

  static ratio = 1.43;

  set number(val) {
    if(val > 10) val -= 10;
    if (this.flip < FLIP_SPEED) return;
    let d = val - this._number;
    if (abs(d) < 1) return;
    this._newNumber = val;
    d *= this.w2;
    //this.rot = this._rot + (d > 0 ? 1 : -1);
    this.time = frameCount;
  }

  get number() {
    return this._number;
  }

  set suit(val) {
    if (this.blend < FLIP_SPEED) return;
    this._newSuit = val;
  }

  get suit() {
    return this._suit;
  }

  set bg(val) {
    this._bg = color(val);

    let pix = [red(val), green(val), blue(val)];
    pix[3] = 0.8 * (pix[0] + pix[1] - pix[2]);

    let light = pix[0] + pix[1] + pix[2];
    this.number = round(map(light, 0, 3 * 255, 10, 1));

    let k = pix.reduce((output, val, i) => val > pix[output] ? i : output, 0);
    this.suit = SUITS[k];
  }

  get bg() {
    return this._bg;
  }

  draw() {
    push();
    noStroke();
    textAlign(CENTER, CENTER);
    translate(this.position.x, this.position.y);

    if (this.number !== this._newNumber) {
     // this.rot += 0.1;
      if (this.flip <= 0) {
        this._number = this._newNumber;
      } else {
        this.flip = lerp(this.flip, -1, 0.6);
      }
    } else if (this.flip < FLIP_SPEED) {
      this.flip = lerp(this.flip, FLIP_SPEED + 1, 0.6);
    }
    if (this.flip > FLIP_SPEED) {
      this.flip = FLIP_SPEED;
    }

    //this.rot = lerp(this._rot, this.rot, 0.8);
    rotate(this.rot);
    scale(this.scale, this.scale * this.flip / FLIP_SPEED, );

    let d = 0.14 * this.width;

    fill(this.bg);
    strokeWeight(0.2);
    stroke(0, 180);
    rect(-this.w2, -this.h2, this.width, this.height, d / 2);
    fill(255, 220);
    noStroke();
    rect(-this.w2, -this.h2, this.width, this.height, d / 2);

    if (this.suit !== this._newSuit) {
      if (this.blend <= 1) {
        this._suit = this._newSuit;
      } else {
        this.blend *= 0.3;
      }
    } else if (this.blend < FLIP_SPEED) {
      this.blend *= 1.6;
    }
    if (this.blend > FLIP_SPEED) this.blend = FLIP_SPEED;
    this.drawPips();
    this.drawNum(d);
    pop();
    this.update();
  }

  update() {
    let lastVel = this.velocity.copy();
    super.update();
    let [x, y] = [this.position.x, this.position.y];
    if (x < this.w2 || x > width - this.w2) {
      this.velocity.x *= -1;
      this.number = this.number + 1;
    }
    if (y < this.h2 || y > height - this.h2) {
      this.velocity.y *= -1;
      this.number = this.number + 1;
    }
    this.angVelocity += map(this.velocity.angleBetween(lastVel), -PI, PI, -0.1, 0.1);
    this.position.x = constrain(x, this.w2, width - this.w2);
    this.position.y = constrain(y, this.h2, height - this.h2);
    this.rot += this.angVelocity;
    this.angVelocity *= 0.99;
  }

  drawNum(d) {
    textSize(d);
    textFont(myFont);
    let num = this.number === 1 ? "A" : this.number;
    fill(this.suit.color);
    text(num, -this.w2 + d, -this.h2 + d);
    rotate(PI);
    text(num, -this.w2 + d, -this.h2 + d);
  }

  drawPips(all = false) {
    let d = 0.07 * this.width;
    let t = 0.26 * this.width;
    if (all || this.number % 2) this.drawPip(0, t);
    this.drawHalf(d, t, all);
    rotate(PI);
    this.drawHalf(d, t, all);
  }

  drawHalf(d, t, all) {
    let dist = -0.19 * this.height;
    if (all || [2, 3, 6, 7, 10, 11].includes(this.number)) {
      this.drawPip(dist, t);
    }
    if (all || this.number > 5) {
      rotate(-PI / 3);
      this.drawPip(dist, t);
      rotate(2 * PI / 3);
      this.drawPip(dist, t);
      rotate(-PI / 3);
    }
    if (all || [4, 5, 8, 9, 10, 11].includes(this.number)) {
      let dist = -this.height / 3;
      rotate(-PI / 6);
      this.drawPip(dist, t);
      rotate(PI / 3);
      this.drawPip(dist, t);
      rotate(-PI / 6);
    }
  }

  drawPip(dist, t) {
    dist *= map(this.blend / FLIP_SPEED, 0, 1, 0.85, 1);
    image(this.suit.image, -t / 2, dist - t / 2, t, t);
    image(this._newSuit.image, -t / 2, dist - t / 2, t, t);
  }

  static load(assetsRoot = "") {
    if (assetsRoot.length) assetsRoot += "/";
    window.diamondsImg = loadImage(assetsRoot + "suit-diamonds.png");
    window.clubsImg = loadImage(assetsRoot + "suit-clovers.png");
    window.spadesImg = loadImage(assetsRoot + "suit-spades.png");
    window.heartsImg = loadImage(assetsRoot + "suit-hearts.png");
    window.myFont = loadFont(assetsRoot + 'IrishGrover-Regular.ttf');
  }

  static setup() {
    window.CLUBS = {
      color: color("teal"),
      image: clubsImg,
    };
    window.HEARTS = {
      color: color("brown"),
      image: heartsImg,
    };
    window.SPADES = {
      color: color("darkslateblue"),
      image: spadesImg,
    };
    window.DIAMONDS = {
      color: color("darkgoldenrod"),
      image: diamondsImg,
    };
    window.SUITS = [HEARTS, CLUBS, SPADES, DIAMONDS];
  }
}
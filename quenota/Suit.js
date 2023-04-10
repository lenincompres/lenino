class Suit {

  static drawSpade(x, y, size, ang = 0, res = 100) {
    push();
    translate(x, y);
    this.drawHeart(0, 0, size, ang + PI, res);
    rotate(ang + PI / 2);
    triangle(0, 0.2 * size, -0.15 * size, 0.6 * size, 0.15 * size, 0.6 * size);
    pop();
  }

  static drawHeart(x, y, size, ang = 0, res = 100) {
    push();
    translate(x, y);
    rotate(ang - PI / 2);
    size *= 0.036;
    let points = new Array(res).fill().map((_, i) => i * TWO_PI / res);
    beginShape();
    points.forEach(a => {
      x = 16 * pow(sin(a), 3);
      y = 13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a);
      vertex(size * x, size * y);
    });
    endShape();
    pop();
  }

  static drawClover(x, y, angle, len, trunk = 20, n = 0) {
    if (n > 4) return;
    push();
    translate(x, y);
    rotate(angle);
    let stem = createVector(0, len);
    if (len > trunk) {
      let newStem = stem.copy().mult(0.5);
      let newLen = len - trunk;
      let a = PI / 4.3;
      Suit.drawClover(newStem.x, newStem.y, a, newLen, trunk, n + 1);
      Suit.drawClover(newStem.x, newStem.y, -a, newLen, trunk, n + 1);
    }
    this.drawBud(stem.x, stem.y, PI * sqrt(len), 0.5 * trunk);
    push();
    stroke("forestGreen");
    strokeWeight(0.07 * len);
    line(0, 0, stem.x, stem.y);
    pop();
    pop();
  }

  static drawBud(x, y, size, mid){
    strokeWeight(0.1 * mid);
    let stem = createVector(x, y);
    let cent = stem.copy().add(0, 0.5 * size);
    Suit.drawHeart(cent.x, cent.y, size, atan2(stem.y, stem.x));
    push();
    if(size > mid) size = constrain(mid - 2 * (size - mid), 0, size);
    cent = stem.copy().add(0, 0.5 * size);
    fill("forestGreen");
    stroke("forestGreen");
    Suit.drawHeart(cent.x, cent.y, size, atan2(stem.y, stem.x));
    pop();
  }
}
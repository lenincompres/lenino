class Suit{

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

  static drawClover(x, y, angle, len, trunk = 20, n = 0){
    if(!n) n = frameCount;
    let wind = 0;//0.1 * noise(n);
    push();
    translate(x, y);
    rotate(angle + wind);
    strokeWeight(0.05 * len);
    let stick = createVector(0, len);
    line(0, 0, stick.x, stick.y);
    let bud = len / 2;
    stick.mult(1.25);
    Suit.drawHeart(stick.x, stick.y, bud, atan2(stick.y, stick.x));
    if(len > trunk){
      stick.mult(1/2);
      len -= trunk;
      let a1 = PI/3 + wind;
      let a2 = -PI/3 + wind;
      Suit.drawClover(stick.x, stick.y, a1, len, trunk, n + 1);
      Suit.drawClover(stick.x, stick.y, a2, len, trunk, n + 1);
    }
    pop();
  }
}
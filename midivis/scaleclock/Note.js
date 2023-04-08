class Note {
  constructor(midiNote) {
    this.id = midiNote - Note.MIN;
    this.index = (this.id - 4) % 12;
    this.name = Note.names[this.index];
    this.oct = this.id / 12;
    this.angle = map(this.index, 0, 12, 0, TWO_PI);
    this.sat = map(this.oct, 0, (Note.MAX - Note.MIN) / 12, Note.MINS, 100);
    this.hue = 360 - ((360 - 180 * this.angle / PI) % 360);
    this.bright = map( this.id, 0, Note.TOTAL, 0, 100);
  }

  static MIN = 20;
  static MAX = 108;
  static MINS = 20;
  static TOTAL = Note.MAX - Note.MIN;

  static names = ["DO", "do#", "RE", "re#", "MI", "FA", "fa#", "SOL", "sol#", "LA", "la#", "SI"];

  static drawClock(x, y, r, counter) {
    push();
    let pos = createVector(r, 0);
    pos.rotate(-PI / 2);
    let a = TWO_PI * (1 / Note.names.length);
    translate(x, y);
    textSize(0.3 * r);
    textAlign(CENTER, CENTER);
    Note.names.forEach((name, i) => {
      let hue = 360 - ((360 - 180 * i / 6) % 360);
      let bright = counter ? counter[name] : 0;
      fill(hue, 100, 100, map(bright, 0, 50, 0, 1));
      text(name, pos.x, pos.y);
      pos.rotate(a);
    });
    pop();
  }
}
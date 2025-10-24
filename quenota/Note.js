class Note {
  constructor(midiNote) {
    this.id = midiNote - Note.MIN;
    this.index = (this.id - 3 + 12) % 12; // starts at 0 (DO base)
    this.name = Note.names[this.index];
    this.oct = this.id / 12;
    this.isBlack = this.name.includes("#");
    this.angle = map(this.index, 0, 12, 0, TWO_PI);
    this.sat = map(this.oct, 0, (Note.MAX - Note.MIN) / 12, Note.MINS, 255);
    this.hue = map((this.index) % 12, 0, 12, 0, 360);
    this.bright = map(this.id, Note.MIN, Note.MAX, 50, 255);
  }

  static MIN = 21;
  static MAX = 108;
  static MINS = 21;
  static TOTAL = Note.MAX - Note.MIN;

  static names = ["DO", "do#", "RE", "re#", "MI", "FA", "fa#", "SOL", "sol#", "LA", "la#", "SI"];

  static drawClock(x, y, r, tSize, counter) {
    push();
    let pos = createVector(r, 0);
    pos.rotate(-PI / 2);
    let a = TWO_PI * (1 / Note.names.length);
    translate(x, y);
    textSize(tSize);
    textAlign(CENTER, CENTER);
    Note.names.forEach((name, i) => {
      let hue = 360 - ((360 - 180 * i / 6) % 360);
      let bright = counter ? 2 * counter[name] : 0;
      fill(hue, 100, 100, map(bright, 0, 50, 0, 1));
      text(name, pos.x, pos.y);
      pos.rotate(a);
    });
    pop();
  }
}
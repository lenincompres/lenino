// displays lyrics from a file
// Lenin Compres

/*
for speaking
var foo = new p5.Speech(); // speech synthesis object
// Talking
//foo.speak('hi there'); // say something
*/

class Caption extends HTMLParagraphElement {
  constructor(highlight = "#fff") {
    super();

    this.highlight = highlight;
    this.charIndex = 0;
    this._lineIndex = 0;
    this._DISPLAY = new Binder("");
    this._SHOW = new Binder(true);
    this.setSpeech();

    // Element
    this.set({
      visibility: this._SHOW.as("hidden", "visible"),
      content: this._DISPLAY,
    });
  }

  set show(b) {
    this._SHOW.value = b;
  }

  get show() {
    return this._SHOW.value;
  }

  set lines(val) {
    this.display = "";
    this._lines = val;
    this.charIndex = 0;
    this.lineIndex = undefined;
  }

  get lines() {
    return this._lines;
  }

  static langSet = {
    en: "en-US",
    es: "es-US",
    fr: "fr",
    ENG: "en-US",
    ESP: "es-US",
    FRA: "fr",
  };

  set lang(l = "ENG") {
    l = Caption.langSet[l];
    if (!!this.lines && this._lang === l) return;
    this._lang = l;
    // bind callback function to trigger when speech is recognized
    // speech recognition object (will prompt for mic access)
    // constructor can be passed the language
    this.setSpeech();
  }

  setSpeech() {
    this.speech = new p5.SpeechRec(this._lang);
    this.speech.continuous = true;
    this.speech.interimResults = true;
    this.speech.onResult = () => {
      let results = this.speech.resultJSON.results;
      if (results[results.length - 1].isFinal) {
        // maybe next line?
      } else {
        this.onSpeech(this.speech.resultString);
      }
    }
    this.start(); // start listening
  }

  get lang() {
    return this._lang;
  }

  start() {
    this.speech.start();
  }

  stop() {
    this.speech.stop();
  }

  get line() {
    return this.lines[this.lineIndex];
  }

  set display(val) {
    this._DISPLAY.value = val;
    if (!val) this.stop();
  }

  get display() {
    return this._DISPLAY.value;
  }

  set lineIndex(n) {
    if (n === undefined) return this.display = "";
    if (n !== this._lineIndex) this.charIndex = 0;
    this._lineIndex = n;
    this.update();
  }

  get lineIndex() {
    return this._lineIndex;
  }

  onSpeech(input) {
    if(!this.lines) return;
    let len = this.lines.length;
    if (!len) return;
    let [lineIndex, charIndex] = this.find(input);
    if (lineIndex < this.lineIndex) return;
    if (charIndex > this.charIndex) this.charIndex = charIndex;
    this.lineIndex = lineIndex;
  }

  find(word, count = 0) {
    if(!count) console.log(word);
    word = Caption.clean(word);
    if (!this.lines.length) return [0, 0];
    const BUFF = 8;
    // !! if index is cero, it should look back too.
    // only took two lines ahead
    if (count > 4 || word.length < BUFF / 2) return [this.lineIndex, count ? 0 : this.charIndex];
    // get the two last BUFF
    if (word.length > BUFF) {
      word = word.substr(word.length - BUFF);
    }
    // find the words in the line
    let index = this.lineIndex + count;
    let theLine = Caption.clean(this.lines[index]);
    if (theLine === undefined) return [0, 0];
    theLine = theLine.toLowerCase();
    let i = theLine.indexOf(word);
    if (i >= 0) return [index, i + word.length];
    if (count > 3 && // looked far enough ahead
      this.lineIndex >= this.lines.length - 1) // and reached the end
      return this.find(word, count - 2);
    return this.find(word, count + 1);
  }

  update() {
    let caption = this.line + " ";
    if (this.charIndex <= 0) return this.display = Caption.emojify(caption);
    let newIndex = caption.indexOf(" ", this.charIndex);
    if (newIndex > this.charIndex) this.charIndex = newIndex;
    let said = caption.substr(0, this.charIndex).split(" ");
    let rest = caption.substr(this.charIndex).trim().split(" ");
    // adds the next word as said
    said.push(rest.shift());
    if (!rest.length) {
      let i = this.lineIndex;
      setTimeout(() => {
        if (this.lineIndex <= i) this.lineIndex += 1;
      }, 500);
    }
    this.display = {
      b: {
        color: this.highlight,
        text: Caption.emojify(said.join(" ")) + " ",
      },
      span: Caption.emojify(rest.join(" ")),
    }
  }

  static clean(str) {
    if (!str) return "";
    return str.replace("  ", " ").replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u");
  }

  static emojify(str) {
    if (!this.showEmojis) return str;
    return str.replace("perro", "🐶").replace("dog", "🐶")
      .replace("rabbit", "🐰").replace("conejo", "🐰");
  }
}

customElements.define("caption-section", Caption, {
  extends: "p"
});
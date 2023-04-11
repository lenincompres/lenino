// displays lyrics from a file
// Lenin Compres

/*
for speaking
var foo = new p5.Speech(); // speech synthesis object
// Talking
//foo.speak('hi there'); // say something
*/

class Lyrics extends HTMLParagraphElement {
  constructor(highlight = "white") {
    // Always call super first in constructor
    super();
    this.highlight = highlight;
    this.lineIndex = 0;
    this.charIndex = 0;
    this._lyrics = new Binder("");
    this.lang = "ENG",

    // bind callback function to trigger when speech is recognized
    // speech recognition object (will prompt for mic access)
    // constructor can be passed the language

    // Element functionality written in here
    this.set({
      content: this._lyrics,
    });
  }

  set lines(val) {
    this.lyrics = "";
    this._lines = val;
    this.lineIndex = 0;
    this.charIndex = 0;
  }

  set lang(l = "ENG"){
    // This is only necesary is the language is different
    let lang = {
      ENG: "en",
      ESP: "es-US",
      FRA: "fr",
    };
    this.hear = new p5.SpeechRec(lang[l]);
    this.hear.continuous = true;
    this.hear.interimResults = true;
    this.hear.onResult = () => {
      let results = this.hear.resultJSON.results;
      if (results[results.length - 1].isFinal) {
        //this.nextLine();
      } else {
        this.onHear(this.hear.resultString);
      }
    }
    this.hear.start(); // start listening
  }

  get line() {
    return this._lines[this.lineIndex];
  }

  set lyrics(val) {
    this._lyrics.value = val;
    if(!val) this.hear.stop();
  }

  get lyrics() {
    return this._lyrics.value;
  }

  onHear(input) {
    let len = this._lines.length;
    if (!len) return;
    let [lineC, index] = this.find(input);
    if (lineC < this.lineIndex) return;
    if (lineC > this.lineIndex) this.charIndex = 0;
    else if (index > this.charIndex) this.charIndex = index;
    this.lineIndex = lineC;
    this.update(this.charIndex);
  }

  find(word, count = 0) {
    console.log(word);
    word = Lyrics.clean(word);
    if (!this._lines.length) return [0, 0];
    const BUFF = 8;
    // only took two lines ahead
    if (count > 2 || word.length < BUFF / 2) return [this.lineIndex, count ? 0 : this.charIndex];
    // get the two last BUFF
    if (word.length > BUFF) {
      word = word.substr(word.length - BUFF);
    }
    // find the words in the line
    let index = this.lineIndex + count;
    let theLine = Lyrics.clean(this._lines[index]);
    if (theLine === undefined) return [0, 0];
    theLine = theLine.toLowerCase();
    let i = theLine.indexOf(word);
    if (i >= 0) return [index, i + word.length];
    else return this.find(word, count + 1);
  }

  nextLine() {
    this.lineIndex += 1;
    this.charIndex = 0;
    this.update();
  }

  update(index = 0) {
    let line = this.line + " ";
    if (index <= 0) return this.lyrics = Lyrics.nice(line);
    let newIndex = line.indexOf(" ", index);
    if (newIndex > index) index = newIndex;
    let said = line.substr(0, index);
    let rest = line.substr(index).trim();
    this.charIndex = index;
    if (!rest.length) {
      let i = this.lineIndex;
      setTimeout(() => {
        if (this.lineIndex <= i) this.nextLine();
      }, 500);
    }
    this.lyrics = {
      b: {
        color: this.highlight,
        text: Lyrics.nice(said) + " ",
      },
      span: Lyrics.nice(rest),
    }
  }

  static clean(str){
    if (!str) return "";
    return str.replace("  ", " ").replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u");
  }

  static nice(str){
    if(!settings.value.showEmojis) return str;
    return str.replace("perro", "🐶").replace("dog", "🐶")
      .replace("rabbit", "🐰").replace("conejo", "🐰");
  }
}

customElements.define("lyrics-section", Lyrics, {
  extends: "p"
});
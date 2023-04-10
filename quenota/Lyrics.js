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
    this.currentLine = 0;
    this.currentIndex = 0;
    this._lyrics = new Binder("");

    // bind callback function to trigger when speech is recognized
    // speech recognition object (will prompt for mic access)
    // constructor can be passed the language
    let lang = {
      ESP: "es-US",
      FRA: "fr",
    };
    var hear = new p5.SpeechRec("fr");
    hear.continuous = true;
    hear.interimResults = true;
    hear.onResult = () => this.onHear(hear.resultString);
    hear.start(); // start listening

    // Element functionality written in here
    this.set({
      content: this._lyrics,
    });
  }

  set lines(val){
    this.lyrics = "";
    this._lines = val;
    this.currentLine = 0;
    this.currentIndex = 0;
  }

  set lyrics(val) {
    this._lyrics.value = val;
  }

  get lyrics() {
    return this._lyrics.value;
  }

  onHear(words) {
    if(!this._lines.length) return;
    let [lineC, index] = this.findLyrics(words);
    if (lineC < this.currentLine) return;
    if (lineC > this.currentLine) this.currentIndex = 0;
    else if (index > this.currentIndex) this.currentIndex = index;
    this.currentLine = lineC;
    this.lyrics = this.formatLyrics(this._lines[this.currentLine], this.currentIndex);
  }

  findLyrics(words, count = 0) {
    if(!this._lines.length) return;
    const BUFF = 4;
    // only took two lines ahead
    if (count > 2 || words.length < BUFF / 2) return [this.currentLine, count ? 0 : this.currentIndex];

    // get the two last words
    if (words.length > BUFF) {
      words = words.substr(words.length - BUFF);
    }

    // find the words in the line
    let index = this.currentLine + count;
    let line = this._lines[index].toLowerCase();
    let i = this.currentIndex;
    i = line.indexOf(words);
    if (i >= 0) return [index, i + words.length];
    else return this.findLyrics(words, count + 1);
  }

  formatLyrics(line, index) {
    line += " ";
    if (index < 0) return line;
    let newIndex = line.indexOf(" ", index);
    if (newIndex > index) index = newIndex;
    let words = line.substr(0, index).split(" ").map(word => {
      return {
        color: this.highlight,
        text: word + " ",
      }
    });
    let sWords = line.substr(index).split(" ").map((word, i) => {
      return {
        color: i < 3 ? this.highlight : undefined,
        text: word + " ",
      }
    });
    return {
      b: words,
      span: sWords,
    }
  }
}

customElements.define("lyrics-section", Lyrics,{
  extends: "p"
});
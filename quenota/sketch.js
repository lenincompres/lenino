const titleFontURL = 'assets/IrishGrover-Regular.ttf';
const bodyFontURL = 'assets/markerfeltnormal.ttf';
const _CAPTION_FILE = new Binder();
let captionFiles = [];
let caption = {};
let _SETTINGS = new Binder({});
let _IS_COMMAND = new Binder(false);
_SETTINGS.value.showKeys = true;
_SETTINGS.value.showClubs = true;
_SETTINGS.value.showEmojis = false;
let isPlayingCounter = 500;

function onSpadeLanded(spade) {
  if (!_SETTINGS.value.showClubs) return;
  Clover.addClover(spade.tip.x, spade.tip.y, spade.note, 5 * spade.mass);
}

function preload() {
  titleFont = loadFont(titleFontURL);
  bodyFont = loadFont(bodyFontURL);
  captionFiles.push(loadJSON("songs/rabbitcandyjar.json"));
  captionFiles.push(loadJSON("songs/mysteryscars.json"));
  captionFiles.push(loadJSON("songs/thisisherstory.json"));
  Card.load("assets");
}

function loadSong(n = 0) {
  let file = captionFiles[n];
  if (!file) {
    _CAPTION_FILE.value = false;
    caption.lines = false;
    return;
  }
  _CAPTION_FILE.value = file;
  caption.lines = file.lines;
  caption.lang = file.lang;
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  caption = new Caption();
  //loadSong(0);

  DOM.set({
    title: "Lenino's Note Visualizer by LENINO",
    font: [{
        fontFamily: "title",
        src: titleFontURL,
      },
      {
        fontFamily: "body",
        src: bodyFontURL,
      }
    ],
    css: {
      h: {
        fontFamily: "title",
      },
      b: {
        fontWeight: "normal",
      }
    },
    color: "white",
    textShadow: "0.2em 0.2em 0 black",
    background: "black",
    canvas: {
      position: "fixed",
      content: canvas,
    },
    fontFamily: "body",
    fontSize: "2.2vh",
    section: {
      position: "fixed",
      top: 0,
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      fontSize: "2.5em",
      textAlign: "center",
      color: "gray",
      main: {
        background: "rgba(0,0,0,0.68)",
        height: "fit-content",
        margin: "0 auto",
        lineHeight: "1.5em",

        maxWidth: "18em",
        content: caption,
      },
    },
    header: {
      color: "darkgoldenrod",
      position: "fixed",
      top: 0,
      left: 0,
      padding: "2em 3em",
      p: {
        text: _CAPTION_FILE.as(s => {
          if (!s) return "";
          let lang = {
            es: "Título",
          };
          return lang[s.lang] ? lang[s.lang] : "Title";
        })
      },
      h1: {
        content: _CAPTION_FILE.as(s => s ? s.title : ""),
      }
    },
    aside: {
      position: "fixed",
      bottom: 0,
      left: 0,
      padding: "1em 4em",
      visibility: _IS_COMMAND.as("hidden", "visible"),
      content: _SETTINGS.as(s => {
        let text = "";
        if(s.showKeys) text += "🎹";
        if(s.showClubs) text += "🌷";
        if(s.showEmojis) text += "🐰";
        return text;
      }),
    },
    footer: {
      color: "forestgreen",
      position: "fixed",
      bottom: 0,
      right: 0,
      padding: "1em 4em",
      p: "Lenino's",
      h2: "Visualizer",
    }
  })

  colorMode(HSB);
  //blendMode(ADD);

  let GRID = min(width, height) / 10;
  Card.setup();
  cards = [];
  SUITS.forEach(suit => {
    cards.push(new Card(width/2, height/2, GRID, 1, suit));
  })
  cards.forEach(card => {
    card.velocity = createVector(random(4) - 2, random(4) - 2);
  });
}

function draw() {
  clear();
  noFill();
  noStroke();

  if(isPlayingCounter > 6 * frameRate()) cards.forEach(card => card.draw());

  Spade.drawSpades();

  if (_SETTINGS.value.showClubs) Clover.drawClovers();

  if (_SETTINGS.value.showKeys) {
    textFont(titleFont);
    let radius = min(width, height) / 3;
    Note.drawClock(width / 2, height / 2, radius, radius / 5, Spade.getCounter());
  }

  // frame
  stroke("forestGreen");
  let earth = constrain(clovers.reduce((o, clover) => o + clover.mass, 0), 0, 10000);
  strokeWeight(map(earth, 0, 10000, 0, 10));
  rect(0, 0, width, height);

  //counter
  isPlayingCounter += 1;
}

function commandKey(num, isBlack) {
  if (!isBlack) return loadSong(num);
  let newSet = Object.assign({}, _SETTINGS.value);
  if (num === 0) newSet.showKeys = !newSet.showKeys;
  else if (num === 1) {
    clovers = [];
    newSet.showClubs = !newSet.showClubs;
  }
  else if (num == 2) caption.showEmojis = newSet.showEmojis = !newSet.showEmojis;
  _SETTINGS.value = newSet;
}

function playNote(id, vel) {
  isPlayingCounter = 0;
  if (id <= Note.MIN) _IS_COMMAND.value = true;
  else if (_IS_COMMAND.value) {
    let note = new Note(id);
    let indexes = Note.names.filter(n => note.isBlack ? n.includes("#") : !n.includes("#")).reverse();
    commandKey(indexes.indexOf(note.name), note.isBlack);
  }
  Spade.addSpade(id, vel);
}

function stopNote(id) {
  if (id <= Note.MIN) _IS_COMMAND.value = false;
  Spade.endSpade(id);
}

function sustain(bool) {
  Spade.sustain(bool);
}

function keyPressed() {
  isPlayingCounter = 0;
  /*
  let newSet = Object.assign({}, _SETTINGS.value);
  if (num === 0) newSet.showKeys = !newSet.showKeys;
  else if (num === 1) {
    clovers = [];
    newSet.showClubs = !newSet.showClubs;
  }
  else if (num == 2) caption.showEmojis = newSet.showEmojis = !newSet.showEmojis;
  _SETTINGS.value = newSet;
  */
}
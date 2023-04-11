const titleFontURL = 'assets/IrishGrover-Regular.ttf';
const bodyFontURL = 'assets/markerfeltnormal.ttf';
const _song = new Binder();
let songs = [];
let lyrics = {};
let settings = new Binder({});
let isCommand = new Binder(false);
settings.value.showKeys = false;
settings.value.showClubs = false;
settings.value.showEmojis = false;

function onSpadeLanded(spade) {
  if (!settings.value.showClubs) return;
  Clover.addClover(spade.tip.x, spade.tip.y, spade.note, 5 * spade.mass);
}

function preload() {
  titleFont = loadFont(titleFontURL);
  bodyFont = loadFont(bodyFontURL);
  songs.push(loadJSON("songs/cicatrices.json"));
}

function loadSong(n = 0) {
  let song = songs[n];
  if (!song) {
    _song.value = false;
    lyrics.lines = false;
    return;
  }
  _song.value = song;
  lyrics.lines = song.lines;
  lyrics.lang = song.lang;
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  lyrics = new Lyrics();
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
    canvas: canvas,
    fontFamily: "body",
    fontSize: "20px",
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
        content: lyrics,
      },
    },
    header: {
      color: "darkgoldenrod",
      position: "fixed",
      top: 0,
      left: 0,
      padding: "2em 3em",
      p: {
        text: _song.as(s => {
          if (!s) return "";
          let lang = {
            ESP: "Título",
          };
          return lang[s.lang] ? lang[s.lang] : "Title";
        })
      },
      h1: {
        content: _song.as(s => s ? s.title : ""),
      }
    },
    aside: {
      position: "fixed",
      bottom: 0,
      left: 0,
      padding: "1em 4em",
      visibility: isCommand.as("hidden", "visible"),
      content: settings.as(s => {
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
}

function draw() {
  clear();
  noFill();
  noStroke();

  Spade.drawSpades();

  if (settings.value.showClubs) Clover.drawClovers();

  if (settings.value.showKeys) {
    textFont(titleFont);
    let radius = min(width, height) / 3;
    Note.drawClock(width / 2, height / 2, radius, radius / 5, Spade.getCounter());
  }

  // frame
  stroke("forestGreen");
  let earth = constrain(clovers.reduce((o, clover) => o + clover.mass, 0), 0, 10000);
  strokeWeight(map(earth, 0, 10000, 0, 10));
  rect(0, 0, width, height);
}

function commandKey(num, isBlack) {
  if (!isBlack) return loadSong(num);
  let newSet = Object.assign({}, settings.value);
  if (num === 0) newSet.showKeys = !newSet.showKeys;
  else if (num === 1) {
    clovers = [];
    newSet.showClubs = !newSet.showClubs;
  }
  else if (num == 2) newSet.showEmojis = !newSet.showEmojis;
  settings.value = newSet;
}

function playNote(id, vel) {
  if (id <= Note.MIN) isCommand.value = true;
  else if (isCommand.value) {
    let note = new Note(id);
    let indexes = Note.names.filter(n => note.isBlack ? n.includes("#") : !n.includes("#")).reverse();
    commandKey(indexes.indexOf(note.name), note.isBlack);
  }
  Spade.addSpade(id, vel);
}

function stopNote(id) {
  if (id <= Note.MIN) isCommand.value = false;
  Spade.endSpade(id);
}

function sustain(bool) {
  Spade.sustain(bool);
}
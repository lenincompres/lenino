const titleFontURL = 'assets/IrishGrover-Regular.ttf';
const bodyFontURL = 'assets/markerfeltnormal.ttf';
const _song = new Binder();
let songs = [];
let lyrics = {};
let isCommand = false;

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
      fontSize: "3em",
      textAlign: "center",
      color: "gray",
      main: {
        height: "fit-content",
        margin: "0 auto",
        maxWidth: "50vh",
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
    footer: {
      color: "teal",
      position: "fixed",
      bottom: 0,
      right: 0,
      padding: "2em 3em",
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
  Clover.drawClovers();

  textFont(titleFont);
  let radius = min(width, height) / 3;
  //Note.drawClock(width / 2, height / 2, radius, radius / 5, Spade.getCounter());

  // frame
  stroke("forestGreen");
  let earth = constrain(clovers.reduce((o, clover) => o + clover.mass, 0), 0, 10000);
  strokeWeight(map(earth, 0, 10000, 0, 10));
  rect(0, 0, width, height);
}

function commandKey(num, isBlack) {
  console.log(num, isBlack);
  if (!isBlack) return loadSong(num);

}

function playNote(id, vel) {
  if (id <= Note.MIN) isCommand = true;
  else if (isCommand) {
    let note = new Note(id);
    let indexes = Note.names.filter(n => note.isBlack ? n.includes("#") : !n.includes("#")).reverse();
    commandKey(indexes.indexOf(note.name), note.isBlack);
  }
  Spade.addSpade(id, vel);
}

function stopNote(id) {
  if (id <= Note.MIN) isCommand = false;
  Spade.endSpade(id);
}

function sustain(bool) {
  Spade.sustain(bool);
}
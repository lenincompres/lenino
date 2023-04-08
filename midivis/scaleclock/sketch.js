
const titleFontURL = '../assets/IrishGrover-Regular.ttf';
const bodyFontURL = '../assets/markerfeltnormal.ttf';

function preload(){
  titleFont = loadFont(titleFontURL);
  bodyFont = loadFont(bodyFontURL);
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);

  DOM.set({
    title: "Lenino's Note Visualizer by LENINO",
    font: [
      {
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
      }
    },
    color: "white",
    background: "#111",
    canvas: canvas,
    fontFamily: "body",
    footer: {
      textAlign: "right",
      position: "fixed",
      bottom: 0,
      right: 0,
      padding: "2em 3em",
      h2: "Note Visualizer",
      p: "by LENINO",
    }
  })

  colorMode(HSB);
  blendMode(ADD);
}

function draw() {
  clear();
  Spade.drawSpades();
  Clover.drawClovers();
  textFont(titleFont);
  let radius = min(width, height) / 4;
  Note.drawClock(width / 2, height / 2, radius, Spade.getCounter());
}

function playNote(id, vel) {
  Spade.addSpade(id, vel);
}

function stopNote(note) {
  Spade.endSpade(note);
}

function sustain(bool) {
  Spade.sustain(bool);
}
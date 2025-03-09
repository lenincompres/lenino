let segments = [];
let names = [
  "amor",
  "amistad",
  "hogar",
  "cuerpo",
  "desarrollo",
  "dinero",
  "entorno",
  "espíritu",
  "familia",
  "recreo",
  "salud",
  "trabajo",
];
let pNumber = names.length;
let tNumber = 10;
let selectedCol = [];
let maxWidth = 700;
let sWeight = 32 * maxWidth / 700;
let mouse;

const params = new URLSearchParams(window.parent.location.search);
let vals = params.get('vals');
let notas = params.get('notas');

function setup() {
  let canvasSize = min(windowWidth, maxWidth);
  sWeight *= canvasSize / maxWidth;
  let canvas = createCanvas(canvasSize, canvasSize);
  vals = vals ? vals.split('|').map(v => parseInt(v)) : names.map(n => ceil(random(names.length)));
  notas = notas ? notas.split('|') : names.map(v => '');
  DOM.set({
    maxWidth: maxWidth + 'px',
    margin: '0 auto',
    backgroundColor: 'silver',
    textAlign: 'center',
    css: {
      h: {
        fontFamily: 'Papyrus',
      }
    },
    header: {
      fontSize: '1.5em',
      margin: '1em 1em 0',
      h1: 'Rueda de la Vida',
    },
    main: {
      canvas: canvas,
      section: {
        display: 'flex',
        flexDirection: 'column',
        width: 'fit-content',
        margin: '2em auto 0',
        h2: 'Notas',
        section: names.map((name, i) => ({
          margin: '0 0 1em',
          label: {
            whiteSpace: 'nowrap',
            textAlign: 'right',
            paddingRight: '0.4em',
            display: 'inline-block',
            width: windowWidth < maxWidth ? 'fit-content' : '8em',
            text: name.toUpperCase(),
          },
          span: {
            display: 'inline-block',
            id: 'notasInput',
            contenteditable: 'true',
            border: 'solid 2px',
            padding: '0.2em 0.5em',
            width: '38em',
            maxWidth: 'calc(100vw - 1em)',
            value: notas[i],
            borderColor: `hsl(${i = map(i, 0, names.length, 0, 360)} 50% 50%)`,
            backgroundColor: `hsl(${i} 50% 90%)`,
          }
        })),
      },
      button: {
        fontSize: '1.5em',
        margin: '0.5em',
        text: 'Salvar el vínculo',
        click: () => window.open(window.parent.location.href.split('?')[0] +
          '?vals=' + vals.join('|') +
          '&notas=' + notasInput.map(n => n.value).join('|'))
      },
    },
    footer: {
      padding: '2em',
      markdown: 'Creado por [Lenin Comprés](http://www.lenino.net) usando [DOM.js](https://github.com/lenincompres/DOM.js) and [P5js](https://p5js.org/).',
    }
  })

  let ang = TWO_PI / pNumber;
  for (let i = 0; i < tNumber; i++) {
    for (let j = 0; j < pNumber; j++) {
      let segment = new Segment({
        x: width / 2,
        y: height / 2,
        angle: ang,
        weight: sWeight,
        rotation: j * ang,
        level: i,
        on: vals[j] >= i,
      })
      segment.row = j;
      segments.push(segment);
    }
  }
}

function draw() {
  clear();
  segments.forEach((s) => s.show());
  drawLabels();
}

function mouseMoved() {
  let cent = createVector(width / 2, height / 2);
  mouse = createVector(mouseX, mouseY).sub(cent);
  selectedCol = [];
  segments.forEach(s => s.hover = false);
  if (mouse.mag() < tNumber * sWeight) {
    let ang = TWO_PI / pNumber;
    let colAng = mouse.heading() - ang;
    selectedCol = segments.filter(s => (TWO_PI + s.rotation - colAng) % TWO_PI < s.angle);
  }
  selectedCol.forEach(s => s.hover = s.radius / 2 < mouse.mag() + s.weight / 2);
}

function mousePressed() {
  selectedCol.forEach(s => s.on = s.radius / 2 < mouse.mag() + s.weight / 2);
}

function drawLabels() {
  push();
  textSize(sWeight / 2);
  textAlign(CENTER);
  fill(0);
  let ang = TWO_PI / pNumber;
  translate(width / 2, height / 2);
  rotate(ang / 2);
  names.forEach((name, i) => {
    push();
    rotate(i * ang);
    translate(sWeight * tNumber + sWeight / 3, 0);
    rotate(PI / 2);
    text(name.toUpperCase(), 0, 0);
    pop();
  });
  pop();
}

function updateVals() {
  vals = vals.map(v => 0);
  segments.forEach(s => s.on && vals[s.row] <= s.level && (vals[s.row] = s.level));
}
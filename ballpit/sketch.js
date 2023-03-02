const FRIX = 0.9;
const DRAG = 0.99;

let pull = 0;

function setup() {
  let W = min(windowWidth, 900);
  let H = min(windowHeight, 600);
  canvas = createCanvas(W, H);

  colorMode(HSL, 100);
  bgColor = color(0);
  pressing = false;
  balls = [];
  worldSettings = new Settings("Settings");

  //controls
  bgravSlider = worldSettings.addSlider("Lights", 0, 100, 86);
  trailSlider = worldSettings.addSlider("Trails", 0, 100, 10);
  gravSlider = worldSettings.addSlider("Gravity", 0, 100, 4);
  amountSlider = worldSettings.addSlider("Amount", 1, 40, 10);
  pullSlider = worldSettings.addSlider("Pull", 5, 100, 30);

  //DOM structure
  DOM.set({
    background: "lightslategray",
    position: "relative",
    width: "fit-content",
    margin: "0 auto",
    header: {
      position: "relative",
      zIndex: 10,
      boxShadow: "1px 0 3px",
      background: "rgba(255,255,255,0.6)",
      padding: "1.5em 1.5em 1em",
      h4: "Primordial Ball Pit",
      p: "by Lenino, ITP – NYU TISCH",
    },
    main: {
      position: "relative",
      canvas: canvas,
      menu: {
        display: "flex",
        position: "absolute",
        top: 0,
        right: 0,
        main: worldSettings.element,
      }
    },
  });

  //poseNet
  video = createCapture(VIDEO);
  video.hide();
  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', poseChanged);
}

function draw() {
  //background;
  bgColor = color(0, 0, bgravSlider.value());
  bgColor.setAlpha(100 - trailSlider.value());
  background(bgColor);

  // removes done balls
  balls = balls.filter(m => !m.done);

  // adds new balls
  if (random() < 0.05) addBall();

  // applies all forces
  let g = createVector(0, gravSlider.value() / 400);
  balls.forEach(ball => {
    if (pressing) ball.pull(mouseX, mouseY, pullSlider.value() / 100);
    ball.push(g);
    ball.go();
  });

  // checks collision
  balls.forEach(ball => ball.hit(balls));

  // displays balls
  balls.forEach(ball => ball.show());
}


function mousePressed() {
  if (mouseY < height) pressing = true;
}

function mouseReleased() {
  pressing = false;
}

function addBall() {
  let totalAmount = balls.reduce((o, m) => o += m.m, 0);
  let maxAmount = width * height * amountSlider.value() / 100;
  if (totalAmount < maxAmount) return balls.push(new Ball());
  // give life
  let inateBalls = balls.filter(b => !b.hasTrait(LIFE) || b.dead);
  if (balls.length - inateBalls.length < 1) {
    let luckyBall = random(inateBalls.filter(b => b.m >= b.M));
    if (luckyBall && random() > 0.5) luckyBall.addTrait(LIFE);
  }
}

function addPull(x, y, mag) {
  mag *= pullSlider.value() / 100;
  balls.forEach(ball => ball.pull(x, y, mag));
}
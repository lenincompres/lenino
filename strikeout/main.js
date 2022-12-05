const H = 600;
const W = 1.5 * H;
const M = 5 * H / 60;
const W2 = 0.5 * W;
const H2 = 0.5 * H;
const STATES = ["INTRO", "RESET", "READY", "PITCH", "OUT", "HIT", "OVER"];
let currentState = 0;
let state = STATES[0];

let currentQ = 0;
let currentA = -1;
let question = {};
let answerText = "";
let countNumber = 0;
let counterTimeout;
let bases = [0, 0, 0];
let runCount = 0;
let outCount = 0;
let maxTime = 2000;

const serial = new p5.WebSerial();
let batData = {
  x: 0,
  y: 0,
  z: 0,
};

function setState(n) {
  if (typeof n === "string") n = STATES.indexOf(n);
  if (n === undefined) n = (currentState + 1) % STATES.length;
  currentState = n;
  state = STATES[n];

  // check to see if serial is available:
  if (!navigator.serial) {
    alert("WebSerial is not supported in this browser. Try Chrome or MS Edge.");
  }
  // if serial is available, add connect/disconnect listeners:
  navigator.serial.addEventListener("connect", portConnect);
  navigator.serial.addEventListener("disconnect", portDisconnect);
  // check for any ports that are available:
  serial.getPorts();
  // if there's no port chosen, choose one:
  serial.on("noport", makePortButton);
  // open whatever port is available:
  serial.on("portavailable", openPort);
  // handle serial errors:
  serial.on("requesterror", portError);
  // handle any incoming serial data:
  serial.on("data", serialEvent);
  serial.on("close", makePortButton);

  if (state === "INTRO") {
    bases = [0, 0, 0];
    outCount = 0;
    runCount = 0;
    setCounter(() => setState(2));
  } else if (state === "OVER") {
    setCounter(() => setState());
  } else if (state === "OUT" || state === "HIT") {
    if (state === "HIT") {
      bases.unshift(...Array(question.value - 1).fill(0), 1);
      runCount += bases.pop();
    } else {
      outCount += 1;
      if (outCount >= 3) return setState("OVER");
    }
    setCounter(() => setState("RESET"));
  }

  if (state === "PITCH") {
    let q = quiz[currentQ];
    question = {
      question: q.question,
      answers: [...q.answers],
      correct: q.answers[0],
      value: typeof q.value === "number" ? q.value : 1,
    };
    question.answers.sort(() => (Math.random() > .5) ? 1 : -1);
    currentQ = (currentQ + 1) % quiz.length;
    setCounter(() => pitchBall());
  } else {
    currentA = -1;
  }

  title.update();
  headline.update();
  balls.forEach(b => b.update());
  pitch.update();
};

function preload() {
  titleFont = loadFont('assets/Sportypo.ttf');
  numberFont = loadFont('assets/Sport.ttf');
  ballImg = loadImage('assets/ball.png');
  resetImg = loadImage('assets/reset.png');
  readyImg = loadImage('assets/ready.png');
  answerImg = loadImage('assets/answer.png');
  outImg = loadImage('assets/out.png');
  hitImg = loadImage('assets/hit.png');
  diamondImg = loadImage('assets/diamond.png');
}

quiz.sort(() => (Math.random() > .5) ? 1 : -1);

function setup() {

  createCanvas(W, H);
  textAlign(CENTER, CENTER);

  title = Mover(W2, H2, () => {
    textFont(titleFont);
    fill("darkred");
    textSize(state === "OVER" || state === "INTRO" ? 1.1 * M : 0.8 * M);
    text(state === "OVER" ? "Game Over" : "Strikeout Trivia", 0, 0);
  }, () => {
    let isStart = state === "INTRO" || state === "OVER";
    title.goto(isStart ? W2 : 0.35 * W, isStart ? H2 : 1.35 * M);
  });

  headline = Mover(W2, 0.6 * H, () => {
    fill(48);
    noStroke();
    textSize(0.68 * M);
    let promtText = [
      "by Lenino",
      "↓ for next",
      "↑ when ready",
      question.question,
      "You're out!",
      "It's a hit!",
      runCount + " runs",
    ][currentState];
    text(promtText, 0, 0);
  }, () => {
    headline.goto(undefined, H * [0.6, 0.7, 0.7, 0.3, 0.72, 0.72, 0.6][currentState]);
  });

  balls = Array(4).fill().map((_, i) => Mover(0.1 * W, 0.6 * H + M * i, () => {
    if (state !== "PITCH") return;
    fill(86);
    noStroke();
    let [isLess, isSame] = [currentA < i, currentA === i];
    imageSized(ballImg, (isLess ? 0.5 : isSame ? 1.5 : 3) * M / ballImg.width);
  }, () => {
    let [isLess, isSame] = [currentA < i, currentA === i];
    let x = isLess ? 0.1 * W : isSame ? W2 : 1.5 * W;
    let y = isLess ? 0.6 * H + M * i : isSame ? 0.6 * H : H;
    balls[i].goto(x, y);
  }));

  pitch = Mover(W2, 0.44 * H, () => {
    if (!question.answers || state !== "PITCH") return;
    fill("black");
    noStroke();
    textSize(M);
    text(question.answers[currentA], 0, 0);
  });

  counter = Mover(W2, 0.83 * H, () => {
    if (state !== "READY" && state !== "PITCH") return;
    if (countNumber <= 0 || countNumber > 3) return;
    textFont(numberFont);
    let isPitch = currentA >= 0;
    fill(isPitch ? "darkred" : "gray");
    noStroke();
    textSize(1.5 * M);
    text(countNumber, 0, 0);
  });

  graph = Mover(W2, H2, () => {
    let img = [null, resetImg, readyImg, null, outImg, hitImg, null][currentState];
    if (!img) return;
    imageSized(img, 2 * M / img.height);
  });

  diamond = Mover(W - 2 * M, 1 * M, () => {
    if (state === "INTRO") return;

    stroke("darkgreen");
    noFill();
    strokeWeight(3);
    let d = 1 * M;
    rotate(PI / 4);;
    square(0, 0, 1.5 * d);
    rotate(-PI / 4);

    // bases
    textSize(0.8 * M);
    bases.forEach((v, i) => {
      fill(v ? "green" : "darkgreen");
      let t = v ? "◉" : "●";
      text(t, [d, 0, -d][i], [d, 0, d][i]);
    });

    // outs
    noStroke();
    fill("darkred");
    textSize(1.3 * M);
    Array(outCount).fill().forEach((_, i) => {
      text("✗", 0, (9.2 - i) * M);
    });

    //runs
    fill("white");
    strokeWeight(2);
    circle(0, 2 * d, 0.8 * M);
    textSize(runCount < 10 ? M : 0.6 * M);
    fill("green");
    textFont(numberFont);
    text(runCount, 0, 2 * d);
  });

  setCounter(() => setState());
}

function draw() {
  background("darkgreen");
  noStroke();
  fill(state === "INTRO" || state === "OVER" ? 210 : 255);
  rect(0.5 * M, 0.5 * M, W - M, H - M, M);

  graph.draw();
  diamond.draw();
  balls.forEach(b => b.draw());
  title.draw();
  headline.draw();
  pitch.draw();
  counter.draw();
}

//CONTROLS

function keyPressed() {
  if (state !== "PITCH" && countNumber === 0) {
    state === "READY" ? setCounter(() => setState("PITCH"), 3) : setState();
  }
}

let [lastX, lastY] = [0, 0];
let batSeed
let batIsUp = null;

function batUpdate(h, p, r, xAcc, yAcc, zAcc, xGyro, yGyro, zGyro){
  batData = {
    heading: h,
    pitch: p,
    roll: r,
    xAcc: xAcc,
    yAcc: yAcc,
    zAcc: zAcc,
  };
  let d = 500;
  p > 0 ? batUp() : batDown();
}

/*
function keyReleased() {
  if (state === "READY") return stopCounter();
  if (state === "PITCH") return batSwing();
}

function mouseMoved() {
  let d = 0.3 * M;
  if (mouseY < lastY - d) batUp();
  else if (mouseY > lastY + d) batDown();
  [lastX, lastY] = [mouseX, mouseY];
}
*/


function batDown() {
  if (batIsUp !== null && !batIsUp) return;
  batIsUp = false;
  batSwitched();
}

function batUp() {
  if (batIsUp !== null && batIsUp) return;
  batIsUp = true;
  batSwitched();
}

function batSwitched() {
  console.log(batIsUp ? "UP" : "DOWN");
  if (batIsUp) {
    if (state === "READY") setCounter(() => setState("PITCH"), 3);
    if (state === "RESET" || state === "READY") headline.goto(undefined, 0.7 * H);
  } else {
    if (state === "RESET" || state === "READY") {
      state === "RESET" ? setState("READY") : stopCounter();
      headline.goto(undefined, 0.75 * H);
    } else if (state === "PITCH" && dist(mouseX, mouseY, lastX, lastY) > 0.6 * M) {
      let isHit = question.answers[currentA] === question.correct;
      setState(isHit ? "HIT" : "OUT");
    }
  }
}

// FUNCTIONS

function setCounter(trigger = () => null, n = 4) {
  if (counterTimeout) clearTimeout(counterTimeout);
  countNumber = n;
  counter.update();
  if (countNumber === 0) return trigger();
  counterTimeout = setTimeout(() => setCounter(trigger, countNumber - 1, ), maxTime / 3);
}

function stopCounter() {
  if (counterTimeout) clearTimeout(counterTimeout);
  countNumber = 0;
}

function pitchBall() {
  if (state !== "PITCH") return;
  currentA += 1;
  if (currentA >= question.answers.length) return setState("OUT");
  setCounter(() => pitchBall());
  balls.forEach(b => b.update());
};

function swing() {
  if (state !== "PITCH") return;
  let isHit = question.answers[currentA] === question.correct;
  setState(isHit ? "HIT" : "OUT");
}

function imageSized(img, f) {
  image(img, -f * img.width, -f * img.height, 2 * f * img.width, 2 * f * img.height);
}

// -------------------- Serial stuff --------------------

// if there's no port selected, 
// make a port select button appear:
function makePortButton() {
  // create and position a port chooser button:
  portButton = createButton('choose port');
  portButton.position(10, 10);
  // give the port button a mousepressed handler:
  portButton.mousePressed(choosePort);
}

// make the port selector window appear:
function choosePort() {
  serial.requestPort();
}

// open the selected port, and make the port 
// button invisible:
function openPort() {
  // wait for the serial.open promise to return,
  // then call the initiateSerial function
  serial.open().then(initiateSerial);

  // once the port opens, let the user know:
  function initiateSerial() {
    console.log("port open");
    serial.write("x");
  }
  // hide the port button once a port is chosen:
  if (portButton) portButton.hide();
}

// read any incoming data:
function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil("\r\n");
  if (inString && inString.indexOf("bat: ") >= 0) {
    batUpdate(...inString.split(" ")[1].split(","));
  }
}

// pop up an alert if there's a port error:
function portError(err) {
  alert("Serial port error: " + err);
}

// try to connect if a new serial port 
// gets added (i.e. plugged in via USB):
function portConnect() {
  console.log("port connected");
  serial.getPorts();
}

// if a port is disconnected:
function portDisconnect() {
  serial.close();
  console.log("port disconnected");
}
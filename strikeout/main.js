const M = 50;
const W = 900;
const H = 600;
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

function setState(n) {
  if (typeof n === "string") n = STATES.indexOf(n);
  if (n === undefined) n = (currentState + 1) % STATES.length;
  currentState = n;
  state = STATES[n];

  if (state === "INTRO") {
    setCounter(() => setState(2));
  } else if (state === "OVER") {
    setCounter(() => setState());
  }

  if (state === "PITCH") {
    question = quiz[currentQ];
    correctAnswer = question.answers[0];
    if (!question.value) question.value = 1;
    question.answers.sort(() => (Math.random() > .5) ? 1 : -1);
    currentQ = (currentQ + 1) % quiz.length;
    setCounter(() => pitchBall());
  } else {
    currentA = -1;
  }

  if (state === "OUT" || state === "HIT") {
    if (state === "HIT") {
      bases.unshift(...Array(question.value - 1).fill(0), 1);
      runCount += bases.pop();
    } else {
      outCount += 1;
      if (outCount >= 3) return setState("OVER");
    }
    setCounter(() => setState("RESET"));
  }

  if (state === "INTRO") {
    bases = [0, 0, 0];
    outCount = 0;
    runCount = 0;
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

function setup() {

  quiz.sort(() => (Math.random() > .5) ? 1 : -1);

  createCanvas(W, H);
  textAlign(CENTER, CENTER);

  title = Mover(W2, H2, () => {
    textFont(titleFont);
    fill("darkred");
    textSize(state === "OVER" || state === "INTRO" ? 1.1 * M : 0.8 * M);
    text(state === "OVER" ? "Game Over" : "Strikeout Trivia", 0, 0);
  }, () => {
    title.isStart = state === "INTRO" || state === "OVER";
    title.destX = title.isStart ? W2 : 0.35 * W;
    title.destY = title.isStart ? H2 : 1.35 * M;
  });

  headline = Mover(W2, 0.6 * H, () => {
    fill(48);
    noStroke();
    textSize(0.68 * M);
    let promtText = [
      "by Lenino",
      "↓ for next",
      "↑ for ready",
      question.question,
      "You're out!",
      "It's a hit!",
      runCount + " runs",
    ][currentState];
    text(promtText, 0, 0);
  }, () => {
    headline.destY = H * [0.6, 0.75, 0.7, 0.3, 0.72, 0.72, 0.6][currentState];
  });

  balls = Array(4).fill().map((_, i) => Mover(0.1 * W, 0.6 * H + M * i, () => {
    if (state !== "PITCH") return;
    fill(86);
    noStroke();
    let f = (currentA < i ? 0.5 : currentA === i ? 1.5 : 3) * M / ballImg.width;
    image(ballImg, -f * ballImg.width, -f * ballImg.height, 2 * f * ballImg.width, 2 * f * ballImg.height);
  }, () => {
    balls[i].destX = currentA < i ? 0.1 * W :
      currentA === i ? W2 : 1.5 * W;
    balls[i].destY = currentA < i ? 0.6 * H + M * i :
      currentA === i ? 0.6 * H : H;
  }));

  pitch = Mover(W2, 0.44 * H, () => {
    if (!question.answers || state !== "PITCH") return;
    fill("black");
    noStroke();
    textSize(M);
    text(question.answers[currentA], 0, 0);
  });

  counter = Mover(W2, 0.85 * H, () => {
    if (state !== "READY" && state !== "PITCH") return;
    //if (state === "PITCH" && currentA < 0) return;
    if (countNumber <= 0 || countNumber > 3) return;
    textFont(numberFont);
    let isPitch = currentA >= 0;
    fill(isPitch ? "darkred" : "darkgreen");
    noStroke();
    textSize(1.5 * M);
    text(countNumber, 0, 0);
  });

  graph = Mover(W2, H2, () => {
    let img = [null, resetImg, readyImg, null, outImg, hitImg, null][currentState];
    if (!img) return;
    let f = 2 * M / img.height;
    image(img, -f * img.width, -f * img.height, 2 * f * img.width, 2 * f * img.height);
  });

  diamond = Mover(W - 2 * M, 1 * M, () => {
    if (state === "OVER" || state === "INTRO") return;

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
    fill("darkred");
    textSize(1.3 * M);
    Array(outCount).fill().forEach((_, i) => {
      text("✗", 0, (9 - i) * M);
    });

    //runs
    noStroke();
    fill("white");
    strokeWeight(2);
    circle(0, 2 * d, 0.8 * M);
    noStroke();
    textSize(0.7 * M);
    fill("green");
    textFont(numberFont);
    text(runCount, 0, 2 * d);

  });

  setCounter(() => setState());

}

function draw() {

  //background
  background("darkgreen");
  noStroke();
  fill(255);
  rect(0.5 * M, 0.5 * M, W - M, H - M, M);

  //title
  graph.draw();
  diamond.draw();
  balls.forEach(b => b.draw());
  title.draw();
  headline.draw();
  pitch.draw();
  counter.draw();

  //leyend
  fill(0);
  //text("State: " + state + ", " + currentState, M, H - M);

}

function keyPressed() {
  if (state !== "PITCH" && countNumber === 0) {
    state === "READY" ? setCounter(() => setState("PITCH"), 3) : setState();
  }
}

function keyReleased() {
  if (state === "READY") return stopCounter();
  if (state === "PITCH") return swing();
}

let maxTime = 2000;

function pitchBall() {
  if (state !== "PITCH") return;
  currentA += 1;
  if (currentA >= question.answers.length) {
    return setState("OUT");
  }
  setCounter(() => pitchBall());
  balls.forEach(b => b.update());
};

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

function swing() {
  if (state !== "PITCH") return;
  let isHit = question.answers[currentA] === correctAnswer;
  setState(isHit ? "HIT" : "OUT");
}
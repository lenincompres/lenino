const STATES = ["INTRO", "RESET", "READY", "PITCH", "OUT", "HIT", "OVER", "END"];
let currentState = 0;
let state = STATES[0];
let currentQ = -1;
let currentA = -1;
let question = {};
let answerText = "";
let countNumber = 0;
let counterTimeout;
let bases = [0, 0, 0];
let runCount = 0;
let outCount = 0;
let maxTime = 2000;
let visuals = [];
let batData = {};
let batIsUp = null;

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
  hitSound = loadSound('assets/hit.mp3');
  swingSound = loadSound('assets/swing.wav');
  catchSound = loadSound('assets/catch.mp3');
}

function setup() {
  W = windowWidth;
  H = W / 1.5;
  if (H * 0.6 > windowHeight) {
    H = windowHeight * 0.9;
    W = 1.5 * H;
  }
  M = 5 * H / 60;
  W2 = 0.5 * W;
  H2 = 0.5 * H;
  DOM.set({
    background: "darkgreen",
    textAlign: "center",
    canvas: createCanvas(W, H),
    footer: {
      color: "#9f9",
      p: [
        "Created by Lenino for ITP TISCH NYU • Physical Computing with Tom Igoe.",
        "Brooklyn, NY. 2022"
      ]
    }
  });
  textAlign(CENTER, CENTER);

  if (webSerialSetup) webSerialSetup(data => {
    if (data.indexOf("bat: ") >= 0) {
      batUpdate(...data.split(" ")[1].split(","));
    } else {
      console.log(data);
    }
  });

  /*if (setupBLE) setupBLE("19B10010-E8F2-537E-4F6C-D104768A1214", data => {
    console.log("BLE data:", data);
  });*/

  quiz.sort(() => (Math.random() > .5) ? 1 : -1);

  graph = Mover(W2, H2, () => {
    let img = [null, resetImg, readyImg, null, outImg, hitImg, null, null][currentState];
    if (!img) return;
    imageSized(img, 2 * M / img.height);
  });
  visuals.push(graph);

  title = Mover(W2, H2, () => {
    textFont(titleFont);
    fill("darkred");
    textSize(state === "OVER" || state === "INTRO" ? 1.1 * M : 0.8 * M);
    text(state === "OVER" ? "Game Over" : "Strikeout Trivia", 0, 0);
  }, () => {
    let isStart = state === "INTRO" || state === "OVER" || state === "END";
    title.moveTo(isStart ? W2 : 0.35 * W, isStart ? H2 : 1.35 * M);
  });
  visuals.push(title);

  headline = Mover(W2, 0.6 * H, () => {
    let theValue = ["hit", "double", "triple", "homerun"][question.value - 1];
    if (state === "PITCH") {
      textSize(0.5 * M);
      textFont(numberFont);
      fill(["white", "darkgreen", "green", "limegreen", "lime"][question.value - 1]);
      text(theValue, 0, -0.8 * M);
    }
    fill(48);
    noStroke();
    textFont("arial");
    textSize(0.68 * M);
    let promtText = [
      "by Lenino",
      "↓ next",
      "Get ready",
      question.question,
      "You're out!",
      `It's a ${theValue}!`,
      "Try again",
      `It's a ${theValue}, and you won!`
    ][currentState];
    text(promtText, 0, 0);
  }, () => {
    headline.moveToY(H * [0.6, 0.7, 0.7, 0.3, 0.72, 0.72, 0.6, 0.6][currentState]);
  });
  visuals.push(headline);

  balls = Array(4).fill().map((_, i) => Mover(-2 * M, H - 2 * M, () => {
    if (state !== "PITCH") return;
    fill(86);
    noStroke();
    let [isLess, isSame] = [currentA < i, currentA === i];
    imageSized(ballImg, (isLess ? 0.5 : isSame ? 1.5 : 3) * M / ballImg.width);
  }, () => {
    let [isLess, isSame] = [currentA < i, currentA === i];
    let x = isLess ? (currentA < 0 ? -M : 2 * M) : isSame ? W2 : 1.5 * W;
    let y = isLess ? (H - 5 * M) + M * i : isSame ? 0.6 * H : H;
    balls[i].moveTo(x, y);
  }));
  visuals.push(...balls);

  pitch = Mover(W2, 0.44 * H, () => {
    if (!question.answers || state !== "PITCH") return;
    fill("black");
    noStroke();
    textSize(M);
    text(question.answers[currentA], 0, 0);
  });
  visuals.push(pitch);

  counter = Mover(W2, 0.83 * H, () => {
    if (state !== "READY" && state !== "PITCH") return;
    if (state === "PITCH" && currentA < 0) return;
    if (countNumber <= 0 || countNumber > 3) return;
    textFont(numberFont);
    let isPitch = currentA >= 0;
    fill(isPitch ? "darkred" : "gray");
    noStroke();
    textSize(1.5 * M);
    text(countNumber, 0, 0);
  });
  visuals.push(counter);

  diamond = Mover(W - 2 * M, M, () => {
    if (state === "INTRO") return;
    stroke("darkgreen");
    noFill();
    strokeWeight(3);
    let d = 1 * M;
    rotate(PI / 4);
    square(0, 0, 1.5 * d);
    rotate(-PI / 4);
    // bases
    textSize(0.8 * M);
    bases.forEach((v, i) => {
      fill(v ? "green" : "darkgreen");
      let t = v ? "◉" : "●";
      text(t, [d, 0, -d][i], [d, 0, d][i]);
    });
    //runs
    noStroke();
    fill(state === "OVER" || state === "INTRO" ? 210 : "white");
    circle(0, 2 * d, 0.8 * M);
    textSize(runCount < 10 ? M : 0.6 * M);
    fill("green");
    textFont(numberFont);
    text(runCount, 0, 2 * d);
  });
  visuals.push(diamond);

  outDisplay = Mover(W - 2 * M, H - 2 * M, () => {
    // outs
    noStroke();
    fill("darkred");
    textSize(1.3 * M);
    Array(outCount).fill().forEach((_, i) => text("✗", 0, -i * M));
  });
  visuals.push(outDisplay);

  setCounter(() => setState());
}

function draw() {
  background("darkgreen");
  noStroke();
  fill(state === "INTRO" || state === "OVER" ? 210 : 255);
  rect(0.5 * M, 0.5 * M, W - M, H - M, M);
  visuals.forEach(v => v.draw());
}

//CONTROLS

let batTop;

function batUpdate(h, p, r, xAcc, yAcc, zAcc, xGyro, yGyro, zGyro) {
  batData = {
    head: h,
    pitch: p,
    roll: r,
    xA: xAcc,
    yA: yAcc,
    zA: zAcc,
    xG: xGyro,
    yG: yGyro,
    zG: zGyro,
  };
  p > 10 ? batUp() : batDown();
  if (batIsUp && state === "PITCH") {
    if (!batTop) batTop = [h, p];
    else if (p > batTop[0]) batTop = [h, p];
    else if (dist(...batTop, h, p) > 16) {
      batSwing();
      batTop = false;
    }
  }
}

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
  if (batIsUp) {
    if (state === "READY") setCounter(() => setState("PITCH"), 3);
    if (state === "RESET" || state === "READY") headline.moveToY(0.7 * H);
  } else {
    if (state === "RESET" || state === "READY") {
      headline.moveToY(0.75 * H);
      state === "RESET" ? setState("READY") : stopCounter();
    }
  }
}

function batSwing() {
  if (state !== "PITCH") return;
  let isHit = question.answers[currentA] === question.correct;
  swingSound.play();
  setState(isHit ? "HIT" : "OUT");
}

// FUNCTIONS

function setState(n) {
  if (typeof n === "string") n = STATES.indexOf(n);
  if (n === undefined) n = (currentState + 1) % STATES.length;
  currentState = n;
  state = STATES[n];
  if (state === "INTRO") {
    bases = [0, 0, 0];
    outCount = 0;
    runCount = 0;
    setCounter(() => setState(2));
  } else if (state === "RESET") {
    if (batIsUp === false) setTimeout(() => setState("READY"), 100);
  } else if (state === "READY") {
    currentA = -1;
  } else if (state === "PITCH") {
    currentQ = (currentQ + 1) % quiz.length;
    let q = quiz[currentQ];
    if (typeof q.value !== "number" || q.value < 1) q.value = 1;
    question = {
      question: q.question,
      answers: [...q.answers],
      correct: q.answers[0],
      value: q.value,
    };
    question.answers.sort(() => (Math.random() > .5) ? 1 : -1);
    balls.forEach((b, i) => setTimeout(() => b.moveTo(2 * M), i * 60));
    setCounter(() => pitchBall(), 3);
  } else if (state === "OUT" || state === "HIT") {
    currentA = -1;
    if (state === "HIT") {
      hitSound.play();
      bases.unshift(...Array(question.value - 1).fill(0), 1);
      let newRunCount = bases.reduce((v, o, i) => i > 3 ? o + v : o, 0);
      if(newRunCount > runCount) newRun(newRunCount);
      quiz.splice(currentQ, 1);
      currentQ -= 1;
      if (!quiz.length) return setState("END");
    } else {
      catchSound.play();
      quiz[currentQ].value -= 1;
      outCount += 1;
      if (outCount >= 3) return setState("OVER");
    }
    setCounter(() => setState("RESET"));
  } else if (state === "OVER") {
    setCounter(() => location.reload(), 6);
  } else if (state === "END") {
    setCounter(() => location.reload(), 8);
  }
  visuals.forEach(v => v.update());
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

function pitchBall() {
  if (state !== "PITCH") return;
  currentA += 1;
  if (currentA >= question.answers.length) return setState("OUT");
  setCounter(() => pitchBall());
  balls.forEach(b => b.update());
};

function imageSized(img, f) {
  image(img, -f * img.width, -f * img.height, 2 * f * img.width, 2 * f * img.height);
}

function newRun(n){
  diamond.moveTo(W - 5 * M, 3 * M);
  runCount = n;
  setTimeout(() => diamond.moveTo(W - 2 * M, M), 200);
}
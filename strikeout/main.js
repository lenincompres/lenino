/*
  * Created by: Lenino (Lenin Compres)
  * 
*/


// contances
const [S_INTRO, S_RESET, S_READY, S_PITCH, S_OUT, S_HIT, S_OVER, S_END] = ["INTRO", "RESET", "READY", "PITCH", "OUT", "HIT", "OVER", "END"];
const STATES = [S_INTRO, S_RESET, S_READY, S_PITCH, S_OUT, S_HIT, S_OVER, S_END];

//variables
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
let visuals = [];
let batIsUp = null;
let hitValue = 0;
let serialBLE;
let quiz;

function preload() {
  titleFont = loadFont('assets/Sportypo.ttf');
  numberFont = loadFont('assets/Sport.ttf');
  ballImg = loadImage('assets/ball.png');
  resetImg = loadImage('assets/reset.png');
  readyImg = loadImage('assets/ready.png');
  outImg = loadImage('assets/out.png');
  hitImg = loadImage('assets/hit.png');
  diamondImg = loadImage('assets/diamond.png');
  introSound = loadSound('assets/baseball.mp3');
  hitSound = loadSound('assets/hit.mp3');
  swingSound = loadSound('assets/swing.wav');
  catchSound = loadSound('assets/catch.mp3');
  clapsSound = loadSound('assets/claps.mp3');
}

function setup() {
  let ratio = 1.7;
  W = windowWidth;
  H = W / ratio;
  if (H > windowHeight) {
    H = windowHeight * 0.8;
    W = ratio * H;
  }
  M = 5 * H / 60;
  W2 = 0.5 * W;
  H2 = 0.5 * H;

  let isWired = !!DOM.querystring().wired;

  DOM.set({
    background: "darkgreen",
    textAlign: "center",
    fontSize: (0.25 * M) + "px",
    canvas: createCanvas(W, H),
    footer: {
      margin: "0 0 1em",
      color: "#9f9",
      p: [
        "Created by Lenino for ITP TISCH NYU • Physical Computing with Tom Igoe.",
        "Brooklyn, NY. 2022"
      ],
      a: {
        color: "#f99",
        display: "block",
        text: "Trivia from Travels With Elle",
        href: "https://travelswithelle.com/other/multiple-choice-trivia-questions/",
        target: "_blank",
      },
      button: {
        position: "fixed",
        backgroundColor: isWired ? "silver" : "#99f",
        color: isWired ? "black" : "#00f",
        top: 0,
        right: 0,
        margin: "1em",
        text: isWired ? "Wired" : "Wireless",
        click: () => {
          let url = window.location.href.split("?")[0];
          console.log(url);
          window.location.href = isWired ? url : url + "?wired=true";
        },
      }
    }
  });
  textAlign(CENTER, CENTER);

  if (DOM.querystring().wired) {
    if (webSerialSetup) webSerialSetup(data => {
      if (data && data.indexOf("bat: ") >= 0) {
        batUpdate(data);
      }
    });
  } else {
    if (setupBLE) setupBLE("7DEF8317-7300-4EE6-8849-46FACE74CA2A", data => {
      if (data && data.indexOf("bat: ") >= 0) {
        batUpdate(data);
      }
    });
  }

  graph = Mover(W2, H2, () => {
    let img = [null, resetImg, readyImg, null, outImg, hitImg, null, null][currentState];
    if (!img) return;
    imageSized(img, 2 * M / img.height);
  });
  visuals.push(graph);

  title = Mover(W2, H2, () => {
    textFont(titleFont);
    fill("darkred");
    textSize(state === S_OVER || state === "INTRO" ? 1.1 * M : 0.8 * M);
    text(state === S_OVER ? "Game Over" : "Strikeout Trivia", 0, 0);
  }, () => {
    let isStart = state === "INTRO" || state === S_OVER || state === S_END;
    title.moveTo(isStart ? W2 : 0.3 * W, isStart ? H2 : 1.3 * M);
  });
  visuals.push(title);

  balls = Array(4).fill().map((_, i) => Mover(-2 * M, H - 2 * M, () => {
    if (state !== S_PITCH) return;
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
    if (!question.answers || state !== S_PITCH) return;
    fill("black");
    noStroke();
    textSize(M);
    text(question.answers[currentA], 0, 0);
  });
  visuals.push(pitch);

  counter = Mover(W2, 0.8 * H, () => {
    if (state !== S_READY && state !== S_PITCH) return;
    if (countNumber <= 0) return;
    textFont(numberFont);
    noStroke();
    textSize(1.5 * M);
    let isPitch = currentA >= 0;
    fill("gray");
    if (isPitch) {
      let theColor = color("darkred");
      theColor.setAlpha(countNumber * 255 / 4);
      fill(theColor);
    }
    text(countNumber > 3 ? "" : countNumber, 0, 0);
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
    fill("white");
    circle(0, 2 * d, 0.8 * M);
    textSize(runCount < 10 ? M : 0.6 * M);
    fill("green");
    textFont(numberFont);
    text(runCount, 0, 2 * d);
    //pitch value 
    if(state !== S_PITCH) return;
    textFont(numberFont);
    let theText = ["", "hit", "double", "triple", "homerun"][question.value];
    let theColor = ["", "", "darkgreen", "green", "limegreen"][question.value];
    fill(theColor);
    textSize(0.5 * M);
    text(theText, 0, 2.7 * d);
  });
  visuals.push(diamond);

  headline = Mover(W2, 0.6 * H, () => {
    if (state === S_PITCH) textAlign(CENTER, TOP);
    let theValue = ["", "hit", "double", "triple", "homerun"][hitValue];
    fill(48);
    noStroke();
    textFont("arial");
    textSize(0.68 * M);
    let promtText = [
      "by Lenino",
      "Lower bat ↓",
      "Get ready ↑",
      question.question,
      "You're out!",
      `It's a ${theValue}!`,
      "Try again",
      `It's a ${theValue}, and you won!`
    ][currentState];
    text(promtText, 0, 0);
  }, () => {
    headline.moveToY(H * [0.6, 0.7, 0.7, 0.2, 0.72, 0.72, 0.6, 0.6][currentState]);
  });
  visuals.push(headline);

  outDisplay = Mover(W - 2 * M, H - 2 * M, () => {
    // outs
    noStroke();
    fill("darkred");
    textSize(1.3 * M);
    Array(outCount).fill().forEach((_, i) => text("✗", 0, -i * 1.3 * M));
  });
  visuals.push(outDisplay);

  setCounter(() => setState(S_INTRO), 2);
}

function draw() {
  background("darkgreen");
  noStroke();
  fill("white");
  rect(0.5 * M, 0.5 * M, W - M, H - M, M);
  visuals.forEach(v => v.draw());
}

//CONTROLS

let batTop;

function batUpdate(data) {
  let [h, p, r, aX, aY, aZ, gX, gY, gZ] = data.split(" ")[1].split(",");
  p > 20 ? batUp() : batDown();
  if (!batIsUp) return batTop = false;
  if (state !== S_PITCH) return;
  if (!batTop || p > batTop.p) return batTop = {
    p: p,
    h: h,
    r: r,
  };
  if (dist(batTop.h, batTop.r, h, r) > 150) batSwing();
}

function batDown() {
  if (batIsUp === false) return;
  batSwing();
  batIsUp = false;
  if (state === S_RESET || state === S_READY) {
    headline.moveToY(0.75 * H);
    state === S_RESET ? setState(S_READY) : stopCounter();
  }
}

function batUp() {
  if (batIsUp === true) return;
  batIsUp = true;
  if (state === S_READY) setCounter(() => setState(S_PITCH), 3);
  if (state === S_RESET || state === S_READY) headline.moveToY(0.7 * H);
}

function batSwing() {
  if (state !== S_PITCH) return;
  swingSound.play();
  let isHit = question.answers[currentA] === question.correct;
  setState(isHit ? S_HIT : S_OUT);
}

// FUNCTIONS

function setState(n) {
  if (typeof n === "string") n = STATES.indexOf(n);
  if (n === undefined) n = (currentState + 1) % STATES.length;
  currentState = n;
  state = STATES[n];
  if (state === S_INTRO) {
    bases = [0, 0, 0];
    outCount = 0;
    runCount = 0;
    introSound.play();
    fetch('./quiz.json')
      .then((response) => response.json())
      .then((json) => {
        quiz = json;
        console.log("quiz:", quiz);
        quiz.sort(() => (Math.random() > .5) ? 1 : -1);
        setCounter(() => setState(S_READY), 3);
      });
  } else if (state === S_RESET) {
    if (batIsUp === false) setTimeout(() => setState(S_READY), 100);
  } else if (state === S_READY) {
    currentA = -1;
    batIsUp = false;
  } else if (state === S_PITCH) {
    currentQ = (currentQ + 1) % quiz.length;
    let q = quiz[currentQ];
    let defVal = random([1,1,1,1,2,2,2,3,3,4]);
    let theQuestion = q.question;
    if(theQuestion.length > 45){
      theQuestion = theQuestion.split(" ").map((word,i,arr) => i === round(arr.length/2) ? ("\n" + word) : word).join(" ");
    }
    question = {
      question: theQuestion,
      answers: [...q.answers],
      correct: q.answers[0],
      value: q.value ? q.value : defVal,
    };
    question.answers.sort(() => (Math.random() > .5) ? 1 : -1);
    balls.forEach((b, i) => setTimeout(() => b.moveTo(2 * M), i * 60));
    setCounter(() => pitchBall());
  } else if (state === S_OUT || state === S_HIT) {
    currentA = -1;
    if (state === S_HIT) {
      hitSound.play();
      hitValue = question.value;
      bases.unshift(...Array(hitValue - 1).fill(0), 1);
      let newRunCount = bases.reduce((v, o, i) => i > 3 ? o + v : o, 0);
      if (newRunCount > runCount) newRun(newRunCount);
      quiz.splice(currentQ, 1);
      currentQ -= 1;
      if (!quiz.length) return setState(S_END);
    } else {
      catchSound.play();
      outCount += 1;
      if (quiz[currentQ].value) quiz[currentQ].value -= 1;
      if (outCount >= 3) return setState(S_OVER);
    }
    setCounter(() => setState(S_READY));
  } else if (state === S_OVER) {
    setCounter(() => setState(S_INTRO), 4);
  } else if (state === S_END) {
    setCounter(() => setState(S_INTRO), 4);
  }
  visuals.forEach(v => v.update());
};

function setCounter(trigger = () => null, n = 3, delay = 900) {
  if (counterTimeout) clearTimeout(counterTimeout);
  countNumber = n;
  counter.update();
  if (countNumber === 0) return trigger();
  counterTimeout = setTimeout(() => setCounter(trigger, countNumber - 1, delay), delay);
}

function stopCounter() {
  if (counterTimeout) clearTimeout(counterTimeout);
  countNumber = 0;
}

function pitchBall() {
  if (state !== S_PITCH) return;
  currentA += 1;
  if (currentA >= question.answers.length) return setState(S_OUT);
  setCounter(() => pitchBall(), 3);
  balls.forEach(b => b.update());
};

function imageSized(img, f) {
  image(img, -f * img.width, -f * img.height, 2 * f * img.width, 2 * f * img.height);
}

function newRun(n) {
  diamond.moveTo(W2 + 2 * M, H2 - 2 * M);
  runCount = n;
  setTimeout(() => diamond.moveTo(W - 2 * M, M), 200);
  clapsSound.play();
}
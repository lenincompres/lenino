function setup() {
  //vars
  var [w, h] = [windowWidth, windowHeight]
  TOTAL = 27;
  THRESH = sqrt(w * h / (2 * PI * TOTAL));
  MAXV = THRESH / 4;
  MINV = 0; //0.01 * MAXV;
  DELAY = 0.68 * (TOTAL * THRESH) / (PI * MAXV);
  LIFESPAN = 400;
  let fontSize = 0.28 * THRESH;
  freeze = null;
  playing = false;
  //signature
  document.body.style.fontSize = (0.66 * fontSize) + 'px';
  let signature = createDiv(`<h1>Photonic Chimes</h1><p>by Lenino (ITP/IMA TISCH NYU)</p>`);
  signature.id('signature');
  createCanvas(w, h);
  clear();
  fill(255);
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  text('Click anywhere to start', windowWidth * 0.5, windowHeight * 0.5);
  //quants creation equations
  randomQ = () => quant(THRESH, random(2 * PI), random(width), random(height));
  balanceQ = (v, i) => quant(THRESH, i * 2 * PI / TOTAL, random(width), random(height));
  centerQ = (v, i) => quant(THRESH, i * 2 * PI / TOTAL, width / 2, height / 2);
  var rand = [random(width), random(height)];
  centerRandomQ = (v, i) => quant(THRESH, i * 2 * PI / TOTAL, rand[0], rand[1]);
  //quants creation
  quanta = null;
  t = 0;
}

function draw() {
  if (freeze) return;
  if (playing) {
    clear();
    quanta = quanta.filter(q => !q.dead && !q.g);
    background(map(quanta.length,1,TOTAL,0,64));
    quanta.forEach(q => {
      if (typeof q.draw === 'function') q.draw()
    });
    quanta.forEach(q => fuse(q));
    quanta = quanta.filter(q => !q.dead && !q.g);
    quanta.forEach(q => q.v < MINV || q.t > q.ls && q.z > 1 ? explode(q) : null);
    t += 1;
  }
}

function fuse(q) {
  if (q.dead || q.g) return;
  var g = quanta.filter(Q => ((q.z > 1 || Q.z > 1 && q.id !== Q.id) || (q.t > DELAY || Q.t > DELAY)) && !Q.g && dist(Q.x, Q.y, q.x, q.y) < THRESH);
  if (g.length > 1) {
    let q = quant(THRESH, g);
    quanta.push(q);
  }
}

function explode(q) {
  if (q.dead || q.g) return;
  q.kill();
  q.Q.forEach(Q => {
    Q.g = false;
    Q.t = 0;
    if (typeof Q.play === "function") Q.play();
    quanta.push(Q);
  });
}

function mouseClicked() {
  if (!playing) {
    quanta = Array(TOTAL).fill().map((v, i) => quant(THRESH, i * 2 * PI / TOTAL, mouseX, mouseY));
    playing = true;
  } else {
    var target = quanta.filter(q => q.z > 1 && dist(q.x, q.y, mouseX, mouseY) < q.d * 0.5).pop();
    if (target) explode(target);
    else {
      return;
      var a = round(random(TOTAL)) * TWO_PI / TOTAL;
      quanta.push(
        quant(THRESH, a, mouseX, mouseY),
        quant(THRESH, a + PI, mouseX, mouseY)
      );
    }
  }
}

function keyPressed() {
  console.log(keyCode);
  if (keyCode === SHIFT) {
    freeze = !freeze;
  }
}
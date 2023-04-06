function setup() {
  //vars
  var [w, h] = [windowWidth, windowHeight]
  TOTAL = 41;
  THRESH = 0.86 * sqrt(w * h / (2 * PI * TOTAL));
  MAXV = THRESH / 1.68;
  MINV = 0; //0.01 * MAXV;
  DELAY = 0.68 * (TOTAL * THRESH) / (PI * MAXV);
  LIFESPAN = 400;
  let fontSize = 0.28 * THRESH;
  freeze = null;
  playing = false;
  //signature
  document.body.style.fontSize = (0.6 * fontSize) + 'px';
  let signature = createDiv(`<h1>Photonic Bells</h1><p>by Lenino (ITP/IMA TISCH NYU)</p>`);
  signature.id('signature');
  createCanvas(w, h);
  clear();
  fill(255);
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  text('Click anywhere to start', windowWidth * 0.5, windowHeight * 0.5);
  //quants creation equations
  randomQ = () => new Bell(THRESH, random(2 * PI), random(width), random(height));
  balanceQ = (v, i) => new Bell(THRESH, i * 2 * PI / TOTAL, random(width), random(height));
  centerQ = (v, i) => new Bell(THRESH, i * 2 * PI / TOTAL, width / 2, height / 2);
  var rand = [random(width), random(height)];
  centerRandomQ = (v, i) => new Bell(THRESH, i * 2 * PI / TOTAL, rand[0], rand[1]);
  //quants creation
  bells = null;
  t = 0;
}

function draw() {
  if (freeze) return;
  if (playing) {
    bells = bells.filter(q => !q.dead && !q.g);
    let vel = bells.reduce((o, q) => o.add(q.vel), createVector());
    let light = map(vel.mag(), MINV, MAXV, 5, 50);
    let colour = Bell.getColour(atan2(-vel.y, vel.x), light, 0.1 * light);
    background(...colour, 68);
    bells.forEach(q => {
      if (typeof q.draw === 'function') q.draw();
      if (typeof q.update === 'function') q.update();
    });
    bells.forEach(q => fuse(q));
    bells = bells.filter(q => !q.dead && !q.g);
    explode(bells.filter(q =>
      q.vel.mag() < MINV ||
      q.t > q.livespan && q.mass > 1
    ));

    // external forces
    if (pulling) addPull(mouseX, mouseY);
    bells.forEach(b => addPull(b.pos.x, b.pos.y, (b.mass - 1 ) * MAXV, b));

    t += 1;
  }
}

function fuse(bell) {
  if (bell.dead || bell.g) return;
  var g = bells.filter(Q =>
    ((Q.mass > 1 && bell.id !== Q.id) ||
      (bell.t > DELAY || Q.t > DELAY)) &&
    !Q.g &&
    p5.Vector.sub(Q.pos, bell.pos).mag() < THRESH);
  if (g.length > 1) {
    let q = new Bell(THRESH, g);
    bells.push(q);
  }
}

function explode(bell) {
  if (!bell) return;
  if (Array.isArray(bell)) return bell.forEach(n => explode(n));
  if (bell.dead || bell.g) return;
  bell.kill();
  bell.Q.forEach(Q => {
    Q.g = false;
    Q.t = 0;
    if (typeof Q.play === "function") Q.play();
    bells.push(Q);
  });
}

function mouseClicked() {
  if (!playing) {
    bells = Array(TOTAL).fill().map((v, i) => new Bell(THRESH, i * 2 * PI / TOTAL, mouseX, mouseY));
    playing = true;
  } else {
    var target = bells.filter(q => q.mass > 1 && dist(q.pos.x, q.pos.y, mouseX, mouseY) < q.diam * 0.5).pop();
    if (target) explode(target);
    else {
      return;
      addBellsAt(mouseX, mouseY);
    }
  }
}

function mousePressed() {
  if (playing) pulling = true;
}

function mouseReleased() {
  pulling = false;
}

function addBellsAt(x, y, a) {
  if (a === undefined) a = round(random(TOTAL)) * TWO_PI / TOTAL;
  bells.push(
    new Bell(THRESH, a, x, y),
    new Bell(THRESH, a + PI, x, y),
  );
}

function addPull(x, y, force = TOTAL * MAXV, source) {
  bells.forEach(b => {
    if(b === source) return;
    b.pull(x, y, 10 * force);
  })
}

function keyPressed() {
  console.log(keyCode);
  if (keyCode === SHIFT) {
    freeze = !freeze;
  }
}
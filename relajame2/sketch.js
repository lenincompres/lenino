function setup() {
  //vars
  var [w, h] = [windowWidth, windowHeight]
  TOTAL = 47;
  THRESH = 0.68 * sqrt(w * h / (2 * PI * TOTAL));
  MAXV = THRESH / 2;
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
  t = 0;
}

function draw() {
  if (freeze) return;
  if (bells && bells.length) {
    bells = bells.filter(q => !q.dead && !q.group);

    let vel = bells.reduce((o, q) => o.add(q.vel), createVector());
    let light = map(vel.mag(), MINV, MAXV, 0, 50);
    let colour = Photon.getColour(atan2(-vel.y, vel.x), light, 0.1 * light);
    background(...colour, 68);

    bells.forEach(q => {
      q.draw();
      q.update();
    });
    bells.forEach(b => {
      let f = b.fuse(bells);
      if(f) bells.push(...f);
    });
    bells = bells.filter(q => !q.dead); //.filter(q => !q.group);

    // external forces
    if (pulling) addPull(mouseX, mouseY);
    bells.forEach(b => addPull(b.pos.x, b.pos.y, b.mass - 1, b));
    t += 1;
  }
}

function mouseClicked() {
  if (!playing) {
    bells = Array(TOTAL).fill().map((v, i) => new Photon(i * 2 * PI / TOTAL, mouseX, mouseY));
    playing = true;
  } else {
    var target = bells.filter(q => q.mass > 1 && dist(q.pos.x, q.pos.y, mouseX, mouseY) < q.diam * 0.5).pop();
    if (target) target.explode();
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
    new Bell(a, x, y),
    new Bell(a + PI, x, y),
  );
}

function addPull(x, y, force = 1, source) {
  bells.forEach(b => b !== source ? b.pull(x, y, force) : null)
}

function keyPressed() {
  if (keyCode === SHIFT) {
    freeze = !freeze;
  }
}
let FRIX = 0.9;
let B = 0.0005; //bounciness of the cells
let MUTABILITY = 1; // how likely is a mutation
let DEVIATION = 2; //standard deviation for clone mutation
let S = 0.5; // split speed

cell = (mom = false, dad = false) => {
  let me = {};
  me.age = 0;
  me.radius = R;
  me.pos = createVector(0.5 * W, 0.5 * H);
  me.vel = createVector(0, 0);
  me.setColor = (h, l) => {
    if (h > 100) h -= 100;
    else if (h < 0) h = 100 - h;
    me.hue = h;
    me.lightness = constrain(l, 0, 100);
    me.saturation = saturation(BG);
    me.color = color(me.hue, me.saturation, me.lightness, 50);
  }
  me.setColor(hue(BG) + 50, (lightness(BG) + 50) % 100);
  me.mutate = (sd = DEVIATION) => {
    me.age = 0;
    let h = random() < MUTABILITY ? randomGaussian(me.hue, sd) : me.hue;
    let l = random() < MUTABILITY ? randomGaussian(me.lightness, sd) : me.lightness;
    me.setColor(h, l);
    me.radius = constrain(randomGaussian(me.radius, sd / PI), 0.5 * R, 2 * R);
    return me;
  }
  if (mom && dad) {
    me.setColor((mom.hue + dad.hue) / 2, (mom.lightness + dad.lightness) / 2);
    me.radius = (mom.radius + dad.radius) / 2;
  } else if (mom) {
    me.setColor(mom.hue, mom.lightness);
    me.radius = mom.radius;
  }
  if (mom) {
    me.pos = createVector(mom.pos.x, mom.pos.y);
    me.vel = createVector(-mom.vel.x, -mom.vel.y);
    me.mutate();
  }

  me.draw = () => {
    let whole = 0;
    whole *= me.radius;
    let diam = me.radius + whole - 2 * me.vel.mag();
    push();
    noStroke();
    stroke(me.color);
    strokeWeight(me.radius - whole);
    noFill();
    circle(me.pos.x, me.pos.y, diam);
    pop();
  };

  me.update = () => {
    let [left, right, top, bottom] = [me.radius, W - me.radius, me.radius, H - me.radius];
    me.pos.add(me.vel);
    me.pos.x = constrain(me.pos.x, left, right);
    me.pos.y = constrain(me.pos.y, top, bottom);
    if (me.pos.x <= left || me.pos.x >= right) me.vel.x *= -1;
    if (me.pos.y <= top || me.pos.y >= bottom) me.vel.y *= -1;
    me.vel.mult(FRIX);
    let mag = me.vel.mag();
    if (mag < 0.1) me.vel.setMag(0);
    me.age += 1;
    me.draw();
  };

  me.divide = () => {
    me.vel = createVector(random(-W, W), random(-H, H)).setMag(S);
    let baby = cell(me)
    me.radius += me.radius - baby.radius;
    me.setColor(2 * me.hue - baby.hue, 2 * me.lightness - baby.lightness);
    me.age = 0;
    return baby;
  };

  return me;
}
export const bite = {
  sort: 1,
  name: "bite",
  args: [1, 0.2],
  action: (me, MAX, RATIO) => {
    if(!me.radius) return;
    if (!me.traits.includes("think") || typeof me.biteLevel !== "number") me.biteLevel = 0.5;
    let biteAng = me.biteLevel * MAX;
    let biteRatio = me.biteLevel * RATIO;

    push();
    let len = me.radius * 1.25;
    let ang = map(sin(15 * frameCount / me.world.frameRate), -1, 1, 0, biteAng);
    let beak = createVector(me.radius, 0).rotate(ang);
    let ANG = PI / 4;
    fill(me.color);
    noStroke();
    translate(me.x, me.y);
    rotate(me.velocity.heading());;
    beginShape();
    vertex(beak.x, beak.y);
    beak.rotate(ANG);
    vertex(beak.x, beak.y);
    beak.rotate(-0.5 * ANG).setMag(0.9 * len);
    vertex(beak.x, beak.y);
    beak.rotate(-0.5 * ANG).setMag(len);
    vertex(beak.x, beak.y);
    endShape();
    beak = createVector(me.radius, 0).rotate(-ang);
    beginShape();
    vertex(beak.x, beak.y);
    beak.rotate(-ANG);
    vertex(beak.x, beak.y);
    beak.rotate(0.5 * ANG).setMag(0.9 * len);
    vertex(beak.x, beak.y);
    beak.rotate(0.5 * ANG).setMag(len);
    vertex(beak.x, beak.y);
    endShape();
    pop();

    if (!me.hits) return;
    me.mass -= me.biteLevel * RATIO * me.mass / me.world.frameRate;
    me.hits.forEach(it => {
      let v = it.position.sub(me.position);
      let a = abs(v.angleBetween(me.velocity));
      if (a > biteAng) return;
      let bite = min(me.mass * biteRatio, it.mass);
      me.mass += bite;
      it.mass -= bite;
      let pct = bite / (bite + me.mass);
      me.hue = lerpHue(me.hue, it.hue, pct);
      if (it.mass <= 0) me.addTrait(...it.traits.filter(() => random() < 0.3));
    });
  }
};

// color change
function lerpHue(fromHue, toHue, pct) {
  let h = [toHue - 100, toHue, toHue + 100];
  h = h.reduce((o, x) => abs(x - fromHue) < abs(o - fromHue) ? x : o);
  let diff = abs(h - fromHue);
  return lerp(fromHue, h, pct);
}

export default bite;
export const clone = {
  name: "clone",
  sort: 2,
  arg: "Requires a cloner function as TRAITS.clone.arg",
  setup: me => me.cloningMass = me.mass,
  update: me => me.mass += 0.05 * me.mass / me.world.frameRate,
  action: (me, cloner = (x, y) => console.error("Cloning function"), DEVIATION = 0.05) => {
    // clone if size is big enough
    if (me.mass > 1.5 * me.cloningMass) {
      let pos = me.velocity.copy().setMag(me.radius * 0.5);
      me.mass *= 0.5;
      let clone = cloner(me.x, me.y);
      me.position = me.position.add(pos);
      clone.position = clone.position.sub(pos);
      clone.hue = randomGaussian(me.hue, DEVIATION);
      me.hue -= clone.hue - me.hue;
      clone.mass = me.mass * randomGaussian(me.cloneLevel ? 1.5 * me.cloneLevel : 1, DEVIATION);
      clone.cloningMass = randomGaussian(me.cloningMass, DEVIATION);
      if (me.brain) clone.brain = me.brain.copy().mutate(0.1);
      clone.addTrait(...me.traits.filter(() => random() < 0.8));
      me.mass += me.mass - clone.mass;
    }

    let d = map(me.mass, 0, 1.5 * me.cloningMass, 0, 1);
    push();
    translate(me.x, me.y);
    rotate(me.velocity.heading());
    let w = sqrt(me.cloningMass) * 0.08;
    if (d <= 0.5) w *= 2 * d;
    let l = 0;
    stroke(0);
    rotate(PI / 2);
    if (d > 0.55) {
      d = map(d, 0.5, 1, 0, 1);
      l = d * me.radius - w;
    } else {
      w *= map(sin(frameCount / 2), -1, 1, 0.5, 1.5);
    }
    strokeWeight(w);
    point(0, l);
    point(0, -l);
    pop();
  }
}

export default clone;
export const steer = {
  name: "steer",
  arg: Math.PI / 4,
  setup: me => me.steerOffset = 0.3 + random(0.4),
  action: (me, MAX) => {
    if (!me.traits.includes("think") || typeof me.steerLevel !== "number") me.steerLevel = me.steerOffset; // fixed angle
    let steer = map(me.steerLevel, 0, 1, -1, 1) * MAX;
    me.velocity.rotate(steer);

    push();
    let flap = createVector(0, me.radius * 1.25).rotate(steer);
    let tip = flap.copy().mult(1.2).rotate(2 * steer);
    let w = me.radius * 0.3;
    stroke(me.color);
    strokeWeight(w);
    noFill();
    translate(me.x, me.y);
    rotate(me.velocity.heading());
    curve(0, me.radius, 0, me.radius, flap.x, flap.y, tip.x, tip.y);
    flap.rotate(PI);
    tip.rotate(PI);
    curve(0, -me.radius, 0, -me.radius, flap.x, flap.y, tip.x, tip.y);
    pop();
  }
}

export default steer;
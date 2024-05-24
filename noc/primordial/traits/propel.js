export const propel = {
  name: "propel",
  args: [0.5, 0.5, 0.5],
  action: (me, MAX, LEN, W) => {
    if (!me.traits.includes("think") || typeof me.propelLevel !== "number") me.propelLevel = MAX;
    if (typeof me.propelLevel !== "number") return;
    let propel = map(me.propelLevel, 0, 1, -0.5, 1) * MAX;
    me.force.add(me.velocity.copy().setMag(propel * me.mass));
    push();
    LEN *= me.radius;
    W *= me.radius;
    let tail = map(sin(10 * frameCount * propel), -1, 1, 0.2 * LEN, LEN);
    tail = createVector(tail, 0);
    noFill();
    strokeWeight(W);
    stroke(me.color);
    translate(me.x, me.y);
    rotate(me.velocity.heading());
    rotate(PI - tail.heading());
    translate(me.radius, 0);
    if (me.turn !== undefined) tail.rotate(-me.turn);
    line(0, 0, tail.x, tail.y);
    pop();
  }
}

export default propel;
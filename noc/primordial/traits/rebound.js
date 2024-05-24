export const rebound = {
  name: "rebound",
  action: (me, STRENGTH = 0.03) => {
    let distance = createVector();

    const [LEFT, RIGHT] = [me.radius, width - me.radius];
    if (me.x < LEFT) distance.x = LEFT - me.x;
    else if (me.x > RIGHT) distance.x = RIGHT - me.x;
    else distance.x = 0;

    const [TOP, BOTTOM] = [me.radius, height - me.radius];
    if (me.y < TOP) distance.y = TOP - me.y;
    else if (me.y > BOTTOM) distance.y = BOTTOM - me.y;

    let d = distance.mag();
    if (!d) return;
    d = constrain(d, 0, me.diam);
    let pct = map(d, 0, me.diam, 0, 1);
    let force = distance.copy().setMag(d * pct * me.mass).mult(STRENGTH);
    me.force.add(force);
  }
}

export default rebound;
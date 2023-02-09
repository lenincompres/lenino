function Tile(x = 0, y = 0, plan = [0, 0, 0, 0], grid = 10, margin = 0) {
  let size = 2 * grid;
  let me = {
    x: x,
    y: y,
    i: floor(x % size),
    j: floor(y % size),
    baseX: x,
    baseY: y,
    plan: plan,
    grid: grid,
    size: size,
    margin: margin,
    selected: false,
    correct: false,
    isBlack: !plan.reduce((o, v) => v * v + o, 0),
    colour: "lime",
  };

  me.position = (x, y, isBase = false) => {
    me.i = floor(x / me.size);
    me.j = floor(y / me.size);
    me.x = me.i * 2 * me.grid;
    me.y = me.j * 2 * me.grid;
    if(isBase) {
      me.baseX = me.x;
      me.baseY = me.y;
    }
  }

  me.rebase = () => {
    me.position(me.baseX, me.baseY);
  }

  me.rotate = (r = 1) => {
    if (r > 0) {
      let bit = me.plan.shift();
      return me.plan.push(bit);
    }
    let bit = me.plan.pop();
    me.plan = [bit, ...me.plan];
  }

  let getColor = (i) => {
    i = me.plan[i];
    return i > 0 ? "#014" : i < 0 ? "#800" : "white";
  }

  me.draw = (x = 0, y = 0) => {
    const M = 1;
    let z = me.grid - M;
    let r = 3 * M;
    push();
    noStroke();
    translate(x + me.x + me.margin, y + me.y + me.margin);
    fill(getColor(0));
    square(M, M, z, r, 0, 0, 0);
    fill(getColor(1));
    square(me.grid, M, z, 0, r, 0, 0);
    fill(getColor(2));
    square(me.grid, me.grid, z, 0, 0, r, 0);
    fill(getColor(3));
    square(M, me.grid, z, 0, 0, 0, r);
    if (me.selected) {
      let d = me.correct ? 0.5 * M : 0.3 * (frameCount % 8);
      fill(255, 0, 0, me.correct ? 0 : 10  * d);
      strokeWeight(M * 2 + d);
      stroke(me.correct ? "lime" : "gold");
      square(0 - d, 0 - d, me.size + 2 * d, r + d);
    }
    pop();
  }

  return me;
}
function Hand(x = 0, y = 0, isHoriz = true, name, grid = 10, margin = 0, colour = "#cde") {
  let me = {
    tiles: [],
    x: x,
    y: y,
    grid: grid,
    isHoriz: isHoriz,
    colour: colour,
    margin: margin,
    name: name ? name : colour,
    selected: false,
    total: 0,
  }

  me.addTile = tile => {
    me.tiles.push(tile);
    let i = me.tiles.length - 1;
    let z = 2 * me.grid;
    isHoriz ? 
      tile.position(me.x + i * z, me.y, true) : 
      tile.position(me.x, me.y + i * z, true);
    tile.hand = me;
  }

  me.removeTile = (tile, addTotal = false) => {
    tile.hand = false;
    let tiles = me.tiles.filter(t => t !== tile);
    me.tiles = [];
    tiles.forEach(t => me.addTile(t));
    if (addTotal) me.total += tile.total;
  }

  me.draw = () => {
    push();
    stroke(me.colour)
    strokeWeight(me.selected ? 10 : 0);
    let c = color(me.colour);
    if (!me.selected) c.setAlpha(68);
    fill(c);
    let h = 2 * me.grid;
    let w = 6 * h;
    let d = 3;
    h += d;
    w += d;
    textSize((me.selected ? 0.7 : 0.5) * me.grid);
    let [x, y] = [
      me.margin + me.x - d / 2,
      me.margin + me.y - d / 2
    ];
    isHoriz ? rect(x, y, w, h) : rect(x, y, h, w);
    stroke(0);
    strokeWeight(2);
    fill(me.colour);
    let ptsPos = [me.x + w - me.grid, me.y + 0.5 * h + d];
    if (isHoriz) {
      textAlign(RIGHT, CENTER);
      text(me.name, me.x - 0.34 * me.grid, me.y + 0.5 * h + d);
    } else {
      textAlign(CENTER, CENTER);
      text(me.name, me.x + d + me.grid, me.y - 0.5 * me.grid);
      ptsPos = [me.x + d+ me.grid, me.y + w - me.grid];
    }
    textAlign(CENTER, CENTER);
    textSize(0.5 * me.grid);
    fill(0);
    noStroke();
    text(me.total, ...ptsPos);
    pop();
  }

  return me;
}
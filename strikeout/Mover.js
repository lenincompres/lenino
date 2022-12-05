function Mover(x, y, draw = () => null, update = () => null, visible = true) {
  let me = {};
  me.x = x;
  me.y = y;
  me.update = update;

  me.destX = x;
  me.destY = y;
  me.s = 0.2;
  me.visible = visible;
  me.draw = () => {
    if (me.visible) {
      push();
      translate(me.x, me.y);
      draw();
      pop();
    }

    if (me.destX !== me.x) {
      me.x += (me.destX - me.x) * me.s;
      if (abs(me.x - me.destX) < 3) me.x = me.destX;
    }

    if (me.destY !== me.y) {
      me.y += (me.destY - me.y) * me.s;
      if (abs(me.y - me.destY) < 3) me.y = me.destY;
    }
  }

  me.moveTo = (x, y, s) => {
    me.destX = x != undefined ? x : me.x;
    me.destY = y != undefined ? y : me.y;
    me.s = s != undefined ? s : me.s;
  }

  me.moveToY = (y, s) => {
    me.moveTo(undefined, y, s);
  }

  return me;

}
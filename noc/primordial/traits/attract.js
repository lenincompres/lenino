export const attract = {
  name: "attract",
  action: me => {
    if(!me.charge) me.charge = random([-1,1]);
    me.world.masses.forEach(it => {
      if(!it.charge) return;
      let d = it.position.sub(me.position);
      let f = me.charge * it.charge * me.mass * it.mass / pow(d.mag(),2);
      d.setMag(f);
      it.force.add(d);
      me.force.add(d.mult(-1));
    });

    push();
    translate(me.x, me.y);
    stroke("white");
    strokeWeight(me.radius * 0.1);
    blendMode(MULTIPLY);
    let len = me.radius * 0.2;
    line(-len, 0, len, 0);
    if(me.charge > 0) line(0, -len, 0, len);
    pop();
  }
};

export default attract;
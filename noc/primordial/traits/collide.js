export const collide = {
  name: "collide",
  sort: 0,
  setup: me => {
    me.hits = [];
    me.neighbors = [];
  },
  update: me => {
    me.hits = [];
    me.neighbors = [];
  },
  action: me => {
    let flock = me.flock ? me.flock : me.world.masses;
    if (!flock) return;
    flock.forEach((it) => {
      if (it === me || it.mass <= 0) return;
      if (it.neighbors && it.neighbors.includes(me)) return;
      let dVect = it.position.sub(me.position);
      if(dVect.mag() < 4 * me.radius) {
        if (it.neighbors) it.neighbors.push(me);
        me.neighbors.push(it);
      }
      let maxD = me.radius + it.radius;
      let d = maxD - dVect.mag();
      if (it.hits && it.hits.includes(me)) return;
      if (d > 0) {
        me.hits.push(it);
        if (it.hits) it.hits.push(me);
        let small = me.mass < it.mass ? me : it;
        d = constrain(d, 0, small.diam);
        let pct = map(d, 0, small.diam, 0, 1);
        let mag = d * pct * small.mass;
        let force = dVect.copy().setMag(mag);
        it.force.add(force);
        force.mult(-1);
        me.force.add(force);
        let burn = 0.5 * me.force.mag() * me.world.friction;
        me.mass -= burn;
        it.mass -= burn;
      }
    });
  }
};

export default collide;
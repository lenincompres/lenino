let sensN = 5;
let me = {};
let ANG = 2 * Math.PI / 3;
let makeSensors = (me, i) => ({
  value: 0,
  vector: createVector(2.5 * me.radius, 0).rotate(-ANG / 2 + (ANG / (sensN-1)) * i),
});

export const think = {
  name: "think",
  sort: 1,
  args: [0.5],
  setup: me => {
    me.sensors = new Array(sensN).fill().map((_, i) => makeSensors(me, i));
    me.output = me.traits.map(trait => ({
      label: trait,
      value: random(-1, 1),
    }));
    me.inputs = () => [
      me.velocity.mag() / me.diam,
      ...me.sensors.map(s => s.value),
      ...me.output.map(o => o.value),
    ];
    me.brain = me.brain ? me.brain : ml5.neuralNetwork({
      inputs: me.inputs().length,
      outputs: me.output.length,
      task: "regression",
      noTraining: true,
      //  neuroEvolution: true,
    });
  },
  update: me => me.sensors = new Array(sensN).fill().map((_, i) => makeSensors(me, i)),
  action: (me, MAX) => {
    me.neighbors.forEach(it => {
      me.sensors.forEach(s => {
        let pos = s.vector.copy().rotate(me.velocity.heading()).add(me.position);
        let d = pos.dist(it.position);
        if (d < it.radius) s.value = it.mass / (it.mass + me.mass);
      });
    });
    try {
      me.output = me.brain.predictSync(me.inputs());
      me.traits.forEach((t, i) => {
        let o = me.output[i];
        if (!o || typeof o.value !== "number") return;
        me[`${t}Level`] = o.value;
      });
      me.mass -= 1 / me.world.frameRate;
    } catch (err) {}

    let L = map(me.sensors.reduce((o, s) => o += s.value, 0), 0, me.sensors.length, 10, 100);
    let d = me.radius * 0.3;
    let l = me.radius - d * 0.5;
    let D = me.diam - 2 * d;
    let c = color(me.color);
    let ant = createVector(D, 0);
    let r = createVector(me.radius, 0);
    ant.rotate(-ANG / 2);
    r.setHeading(ant.heading());
    push();
    translate(me.x, me.y);
    rotate(me.velocity.heading());
    strokeWeight(1);
    stroke(c);
    line(r.x, r.y, ant.x, ant.y);
    ant.rotate(ANG);
    r.setHeading(ant.heading());
    line(r.x, r.y, ant.x, ant.y);
    me.sensors.forEach(s => {
      c.setAlpha(100 * s.value);
      r.setHeading(s.vector.heading());
      stroke(c);
      line(r.x, r.y, s.vector.x, s.vector.y)
    });
    pop();
  }
}

export default think;
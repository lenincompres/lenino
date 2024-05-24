let sensN = 9;
let me = {};
let makeSensors = (l, a) => ({
  value: 0,
  vector: createVector(l, 0).rotate(a),
});

export const think = {
  name: "think",
  sort: 1,
  args: [0.5],
  setup: me => {
    me.sensors = new Array(sensN).fill().map((_, i) => makeSensors(2.3 * me.radius, TWO_PI / sensN * i));
    me.output = me.traits.map(trait => ({
      label: trait,
      value: random(-1, 1),
    }));
    me.inputs = () => [
      me.x / width,
      me.y / height,
      me.velocity.mag() / me.diam,
      me.velocity.heading() / TWO_PI,
      ...me.sensors.map(s => s.value),
      ...me.output.map(o => o.value),
    ];
    me.brain = ml5.neuralNetwork({
      inputs: me.inputs().length,
      outputs: me.output.length,
      task: "regression",
      noTraining: true,
      //  neuroEvolution: true,
    });
  },
  update: me => me.sensors = new Array(sensN).fill().map((_, i) => makeSensors(3 * me.radius, TWO_PI / sensN * i)),
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
        let v = i / 7;
        let o = me.output[i];
        if (!o) return;
        if (typeof o.value === "number") v = o.value;
        if (!window.didThis && t === "propel") {
          window.didThis = true;
        }
        me[`${t}Level`] = v;
      });
      me.mass -= 1 / me.world.frameRate;
    } catch (err) {}

    let L = map(me.sensors.reduce((o, s) => o += s.value, 0), 0, me.sensors.length, 10, 100);
    let d = me.radius * 0.3;
    let l = me.radius - d * 0.5;
    let D = 0.6 * me.diam;
    let c = color(me.color);
    push();
    translate(me.x, me.y);
    rotate(me.velocity.heading());
    strokeWeight(1);
    stroke(c);
    line(0, 0, l, D);
    line(0, 0, l, -D);
    D = me.diam - 2 * d;
    me.sensors.forEach(s => {
      c.setAlpha(100 * s.value);
      stroke(c);
      line(0, 0, s.vector.x, s.vector.y)
    });
    pop();
  }
}

export default think;
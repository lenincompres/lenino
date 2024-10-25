const SPEED = 200;

let queue = [];

let trigger = (s = SPEED) => setTimeout(_ => {
  if (!queue.length) return;
  let entry = queue.shift();
  entry.elem.set(entry.model);
  trigger(s);
}, 0.3 * s);

export const queueDown = (elem, model = {
  top: ['-20px', 0],
  opacity: [0, 1],
}, s = SPEED, transition = 'ease-out') => {

  if (!['fixed', 'absolute'].includes(elem.style.position)) elem.set('relative', 'position');

  let properModel = {};
  Object.entries(model).forEach(([key, val]) => properModel[key] = {
    through: val,
    duration: s,
    transition: transition,
  });

  Object.entries(properModel).forEach(([key, val]) => val.through ? elem.set(val.through[0], key) : null);

  queue.push({elem:elem, model:properModel});
  if (queue.length === 1) trigger(s);

}

export default queueDown;
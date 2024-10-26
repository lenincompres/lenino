const SPEED = 300;

const queue = [];

const trigger = (s = SPEED) => setTimeout(_ => {
  let entry = queue.shift();
  entry.elem.set(entry.model);
  if (!queue.length) return;
  trigger(s);
}, 0.3 * s);

export const queueDown = (elem, model = {
  top: ['-30px', '10px', 0],
  opacity: [0, 1],
}, s = SPEED, transition = 'ease') => {

  if (!['fixed', 'absolute'].includes(elem.style.position)) elem.set('relative', 'position');

  let properModel = {};
  Object.entries(model).forEach(([key, val]) => properModel[key] = {
    through: val,
    duration: s / Math.sqrt(val.length),
    transition: transition,
  });

  Object.entries(properModel).forEach(([key, val]) => val.through ? elem.set(val.through[0], key) : null);

  queue.push({
    elem: elem,
    model: properModel
  });
  if (queue.length === 1) trigger(s);

}

export default queueDown;
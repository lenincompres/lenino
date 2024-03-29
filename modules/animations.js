const SPEED = 0.34;

let queue = [];

let trigger = (s = SPEED) => setTimeout(_ => {
  if (!queue.length) return;
  queue[0].set({
    opacity: 1,
    top: 0
  })
  queue.shift();
  trigger();
}, 333 * s);

export const slideDown = (elem, s = SPEED, queueUp = true) => {
  elem.set({
    position: !['fixed', 'absolute'].includes(elem.style.position) ? 'relative' : undefined,
    top: '-20px',
    opacity: 0,
    transition: s + 's'
  });
  if(!queueUp) return trigger(s);
  queue.push(elem);
  if (queue.length === 1) trigger(s);
}

export default slideDown;
export const aim = {
  name: NAME,
  action: me => {
    if(!me.target) return;
    me.target.sub(me.position).mult(me.mass);
    me.force.add(me.target);
    me.target = false;
  }
}

export default aim;
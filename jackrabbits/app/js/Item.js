/*

  Basic item with some physics location, etc. Meant to be parent to Pieces

*/

const OVERFLOW = {

  NONE: 0,

  LOOP: 1,

  BOUNCE: -1

}



class Item {



  constructor(x = 0, y = 0) {

    this.endPos = this.endZ = this.endR = null;

    this.drag = 0.1;

    this.x = x;

    this.y = y;

    this.r = 0; //rotation angle in radians

    this.z = 1;

    this.vx = 0;

    this.vy = 0;

    this.vr = 0;

    this.vz = 1;

    this.overflow = OVERFLOW.NONE;

    this.boundary = {

      top: 0,

      bottom: height,

      left: 0,

      right: width

    }

    this.static = false;

  }



  update() {

    if (this.static) return;

    this.x += this.vx;

    this.y += this.vy;

    this.r += this.vr;

    this.z *= this.vz;

    if (this.drag) {

      this.vx -= this.vx * this.drag;

      this.vy -= this.vy * this.drag;

      this.vr -= this.vr * this.drag;

    }

    if (this.endPos) {

      let [x, y] = [this.endPos.x - this.x, this.endPos.y - this.y];

      this.x += x * this.drag;

      this.y += y * this.drag;

      if (dist(x, y, 0, 0) < 2) this.endPos = null;

    }

    if (this.endZ) {

      let z = this.endZ;

      this.z += z * this.drag;

      if (abs(z) < 1) this.endPos = null;

    }

    if (typeof this.endR === 'number') {

      let r = this.endR - this.r;

      this.r += r * this.drag;

      if (abs(r) < 0.001) {

        this.r = this.endR % TWO_PI;

        this.endR = null;

      }

    } else {

      this.r = this.r % TWO_PI;

    }

    if (this.overflow !== OVERFLOW.NONE) {

      if (this.x < this.boundary.left || this.x > this.boundary.right)

        this.overflow === OVERFLOW.BOUNCE ? this.vx = -this.vx :

        this.x < this.boundary.left ? this.x += this.boundary.right - this.boundary.left :

        this.x += this.boundary.left - this.boundary.right;

      if (this.y < this.boundary.top || this.y > this.boundary.bottom)

        this.overflow === OVERFLOW.BOUNCE ? this.vy = -this.vy :

        this.y < this.boundary.top ? this.y += this.boundary.bottom - this.boundary.top :

        this.y += this.boundary.top - this.boundary.bottom;

    }

  }



/* --------------------------------- METHODS -------------------------------- */



  position(inX, inY) {  // places the item at an specific location, and fixes it there

    if(!inX) inX = 0;

    if(!inY) inY = 0;

    if (typeof inX === 'number' && typeof inY === 'number') {

      this.x = inX;

      this.y = inY;

      this.static = true;

    }

    return [this.x, this.y];

  }



  moveBy(dX = 0, dY) {  // moves the item this much

    if (dY === undefined) dY = dX;

    this.x += dX;

    this.y += dY;

    return [dX, dY];

  }



  kick(angle, velocity) {

    this.endPos = null;

    this.vx = velocity * cos(angle);

    this.vy = velocity * sin(angle);

  }



  goTo(inX, inY) {  // animates the movement to a location

    this.vx = this.vy = 0;

    if (this.offset) {

      inX -= this.offset.x;

      inY -= this.offset.y;

    }

    this.endPos = {

      x: inX,

      y: inY,

      dx: (inX - this.x) / inX,

      dy: (inY - this.y) / inY

    };

    this.static = false;

  }



  stop() {

    this.endPos = null;

    this.static = true;

  }



  growTo(inZ) {  // animates size and rotation

    this.endZ = inZ;

  }



  turnTo(inR, direction) {  // rotates 

     if (!direction && this.vr !== 0) direction = dir(this.vr); //continue in that direction

    this.vr = 0;

    let diffs = [inR - TWO_PI, inR, inR + TWO_PI].minus(this.r); //different values, circle around

    if (!direction) return this.endR = this.r + diffs.sortAscend().pop(); //no direction, take closest

    this.endR = this.r + diffs.filter(d => dir(d) === direction).sortAscend().pop();//direction, choose closets path

  }



}
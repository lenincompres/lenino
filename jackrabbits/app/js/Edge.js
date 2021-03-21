class Edge {

  constructor(r, tile) {

    // hug the edge

    this.r = r;

    this.tile = tile;

    this.COSR = cos(r);

    this.SINR = sin(r);

    this.d = mid(tile.w, tile.h) * 0.5;

    this.nudge();

    while (this.c[3]) this.nudge();

    while (!this.c[3]) this.nudge(-1);

    // set props

    this.type = this.getType(this.c);

    this.c = color(COLOR[this.type]);

    this.isRoad = this.type === EDGE.ROAD;

    this.visible = true;

  }



  nudge(dir = 1) {

    dir = dir > 0 ? 1 : -1;

    this.d += dir;

    this.x = this.d * this.COSR;

    this.y = this.d * this.SINR;

    this.c = this.tile.get(this.x, this.y, true);

  }



  getType(edge) {

    let colour = color(edge.c ? edge.c : edge);

    return EDGE.toArray().map(type => {

      let c = color(COLOR[type]);

      return {

        d: dist(red(c), green(c), blue(c), red(colour), green(colour), blue(colour)),

        type: type

      }

    }).sort((a, b) => a.d - b.d)[0].type;

  }



  mayLinkColor(colour) {

    let type = this.getType(colour);

    let v = type === EDGE.SEA || this.type === type;

    return v;

  }



  xy(nudge = 0) { //returns global [x,y] of the port

    let d = this.d + nudge;

    let angle = this.r + this.tile.r;

    let [x, y] = [d * cos(angle), d * sin(angle)];

    return [(this.tile.x + x) * this.tile.z, (this.tile.y + y) * this.tile.z];

  }



  draw(z = 1, local = false) {

    if (!this.show) return;

    let lineW = 2 * z;

    let pointing = game.stage === STAGE.PLAYING && this.tile === game.player.tile;

    let size = game.hitSize * (pointing ? 1.43 : 1);

    let playerC = COLOR[game.player.id];

    push();

    local ? translate(this.x * z, this.y * z) : translate(...this.xy().times(z));

    strokeWeight(lineW);

    this.link ? stroke(0) : noStroke();

    //shadow

    if(game.stage === STAGE.PLAYING && this.tile === game.player.tile){

      fill(0);

      circle(lineW * 2, lineW * 2, z * size);

    }

    //main

    fill(this.wrong ? GLOW.WRONG : this.trail ? playerC : this.c);

    circle(0, 0, z * size);

    // arrow

    if (game.stage === STAGE.PLAYING) {

      rotate(this.r + (local ? 0 : this.tile.r));

      size *= 0.25;

      fill(this.trail ? this.c : playerC);

      let coords = [size, 0, -size * 0.68, size, -size * 0.34, 0, -size * 0.68, -size];

      quad(...coords.times(z));

    }

    pop();

  }



  edgeDist(edge) {

    return dist(...this.xy(), ...edge.xy());

  }



  isMe(inX, inY) {

    if (!this.show) return false;

    let [x, y] = parsexy(inX, inY);

    return dist(x, y, ...this.xy()) < game.hitSize;

  }



  getTrail(callBack) {

    if (!this.link) return callBack(game.overboard, this);

    if (this.link.paths) this.link.paths.map(edge => edge.getTrail(callBack));

    callBack(this.link.tile, this);

  }



  hint(show = true){

    if (!show) return say();

    say(HINT.EXPLORE_PATH);

  }

  

  set show(v) {

    this._show = v && this.type === EDGE.ROAD;

  }



  get show() {

    if(!this.visible || !this.tile.visible) return false;

    return this._show || this.trail || this.wrong ||

      game.stage === STAGE.SETUP && this.isRoad && this.tile.selected ||

      game.stage === STAGE.PLAYING && this.isRoad && game.player.tile === this.tile;

  }

  

  set isSide(v) {

    if (this.isRoad) v = true;

    if (!v) {

      this.type = null;

      this.c = color(0);

      this.isRoad = false;

    }

  }



  get isSide() {

    return this.type !== null;

  }



}
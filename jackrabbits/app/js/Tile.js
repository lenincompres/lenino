/*

  Extends Piece. Actually creates an tile from a Piece

*/

class Tile extends Piece {



  constructor(piece) {

    super(piece.img);

    // Variables from original piece

    this.x = piece.x;

    this.y = piece.y;

    this.z = piece.z;

    this.r = 0;

    this.depth = piece.depth;

    this.visible = piece.visible;

    // Carry over all variables from PieceSet

    this.id = piece.id;

    //this.group = piece.group;

    this.type = piece.type;

    this.group = piece.group;

    this.level = piece.level;

    this.suit = SUIT.toArray().first(s => s === piece.order);

    this.role = this.type === TILE.HEX ? (this.suit ? ROLE.ROYAL : ROLE.toArray()[this.level]) :

      this.type === TILE.TRIANGLE ? piece.order :

      this.type === TILE.RHOMBUS ? RHOMBUS[this.suit] : ROLE.OVERBOARD;

    this.selected = false;

    //shoreline color, Tile particular variables

    this.edges = [];

    this.roads = [];

  }



  drawShore(z = 1) {

    if (!this.visible || this === game.overboard) return;

    z *= this.z;

    push();

    translate(this.x * z, this.y * z);

    rotate(this.r);

    if (!this.strokeW) this.strokeW = game.hitSize * z;

    strokeWeight(this.strokeW);

    stroke(COLOR[EDGE.SEA]);

    if (this.strokeW < game.hitSize * z * 3) this.strokeW *= 1.2;

    if (this.strokeW > game.hitSize * z * 3.5) this.strokeW *= 0.8;

    this.edges.filter(edge => !edge.isSide).forEach((edge, i, arr) => {

      let next = arr[(i + 1) % arr.length];

      if (!edge.link && !next.link) line(edge.x * z, edge.y * z, next.x * z, next.y * z);

    });

    pop();

  }



  hint(show = true) {

    this.selected = show;

    if (!show) return say();

    if (this.role === ROLE.ROYAL) return say(HINT.SAYS, this.role, this);

    if (game.player.tile.role === ROLE.CAVE || game.player.tile.role === ROLE.UNDERGROUND) return say();

    say(HINT.SAYS, this.role);

  }



  findEdges(r = 0, n = 6) {

    let edges = [];

    Array(n).fill().forEach(_ => {

      edges.push(new Edge(r, this));

      r += TWO_PI / n;

    });

    this.addEdges(edges);

  }



  copyEdges(tile) {

    this.edges = [];

    this.addEdges(tile.edges.map(edge => new Edge(edge.r, this)));

  }



  addEdges(edges) {

    this.edges.push(...edges);

    this.edges.sort((a, b) => a.r - b.r).forEach((edge, i) => edge.isSide = i % 2);

    this.roads = this.edges.filter(edge => edge.isRoad);

    this.setPaths();

  }



  setPaths() {

    let paths = [];

    this.roads.forEach(road => {

      paths = this.roads.filter(r => r !== road);

      if (this.type === TILE.HEX) road.paths = [];

      else if (this.type === TILE.TRIANGLE) road.paths = paths;

      if (this.type === TILE.RHOMBUS) {

        paths.sort((a, b) => dist(road.x, road.y, a.x, a.y) - dist(road.x, road.y, b.x, b.y));

        if (this.suit === SUIT.HEARTS || this.suit === SUIT.SHIELDS) road.paths = [paths[0]];

        else if (this.suit === SUIT.SPADES || this.suit === SUIT.HORSESHOES) road.paths = [paths[1]];

        else if (this.suit === SUIT.CLUBS || this.suit === SUIT.DIAMONDS) road.paths = [paths[2]];

        else if (this.suit === SUIT.ICESKULLS) road.paths = paths;

        else road.paths = [];

      }

    });

  }



  findLinkage(ports) { // Finds the closest pair (linkage) of roads between the grabbed tile and the board.

    let linkage = [];

    ports.forEach(mapRoad => {

      let mapRoadxy = mapRoad.xy();

      linkage.push(

        this.roads.map(tileRoad => {

          return {

            tileRoad: tileRoad,

            mapRoad: mapRoad,

            distance: dist(...tileRoad.xy(), ...mapRoadxy)

          };

        }).sort((b, a) => a.distance - b.distance).pop()

      );

    });

    return linkage.sort((b, a) => a.distance - b.distance).pop();

  }



  set island(tile) {

    this.ports = this.roads.filter(road => !road.link);

    if (this._island !== tile) {

      this._island = tile;

      this.roads.forEach(road => road.link ? road.link.tile.island = tile : null);

    }

  }



  get island(){

    return this._island;

  }



  // this is called when clicked during PLAYING stage

  pick(){

    if(game.stage === STAGE.PLAYING) game.tryMove(this);

  }



  get selected() {

    return this.glow;

  }



  set selected(val) {

    this.glow = val ? game.stage === STAGE.SETUP ? GLOW.IDLE : GLOW.RIGHT : null;

  }



  set placed(val) {

    this.edges.forEach(edge => edge.wrong = false); //clears wrong edges from last time

    this.flat = val;

    this.glow = null;

    this.visible = true;

  }



  set picked(val) {

    if (val) this.stop();

    if (this.edges) this.edges.forEach(edge => edge.wrong = false); //clears wrong edges from last time

    this.glow = val ? GLOW.IDLE : null;

    this.visible = true;

  }



  set wrong(val) {

    this.glow = val ? GLOW.WRONG : null;

    this.visible = true;

  }



  get wrong() {

    return this.glow === GLOW.WRONG;

  }



}
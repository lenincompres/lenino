class Player {

  constructor(rabbit, tile, cards = [], tiles = []) {

    this.rabbit = rabbit;

    this.rabbit.drag = 0.3;

    this.rabbit.r = 0;

    this.d = this.rabbit.w * 0.8;

    this.id = this.rabbit.order;

    this.cards = cards;

    this.tiles = tiles;

    this.rides = [];

    this.tile = tile ? tile : game.castle;

    this.carrots = pieces.filter(piece => piece.group === PIECE.CARROT && piece.order === this.rabbit.order);

    this.carrots.forEach(carrot => carrot.hint = v => say(v === false || !carrot.tile ? '' : HINT.REMOVE_CARROT, carrot));

  }



  goTo(tile) {

    if (tile) this.tile = tile;

    this.rabbit.goTo(...this.offset);

  }



  position(tile, y = false) {

    if (y) return this.rabbit.position(tile, y);

    if (tile) this.tile(tile);

    this.rabbit.position(...this.offset);

  }



  update() {

    let isTurn = this.isTurn;

    this.rabbit.z = isTurn && this.tile.type === TILE.HEX ? 1 : 0.75;

    this.rabbit.turnTo(isTurn ? 0 : this.angle - PI / 4);

  }



  draw(zoom) {

    if (selectedPiece !== this && !(game.halted && this.ride)) this.goTo();

    if (game.stage === STAGE.PRESET || game.stage === STAGE.SETUP) return this.rabbit.draw(zoom);

    if (this.ride) {

      let ridePiece = pieces.first(r => r.order === this.ride);

      ridePiece.z = this.rabbit.z;

      ridePiece.x = this.x;

      ridePiece.y = this.y + this.rabbit.height * 0.5;

      ridePiece.draw(zoom);

    }

    this.carrots.forEach((carrot, i) => {

      carrot.z = this.rabbit.z * 0.86;

      if (carrot.tile) {

        let offset = game.player.tile === carrot.tile ? -carrot.width * 0.5 : 0;

        carrot.r = this.rabbit.r - (offset ? 1 : 0) * PI / 3;

        carrot.position(carrot.tile.x + offset, carrot.tile.y);

        carrot.draw(zoom);

      } else if (game.player === this && this.tile.role === ROLE.ROYAL && !this.tile.holder) {

        let offset = this.rabbit.width * 0.43;

        carrot.position(this.x + offset, this.y + offset * 0.43);

        carrot.r = PI + i * PI / 6;

        carrot.draw(zoom);

      }

    });

    this.rabbit.draw(zoom);

  }



  hold(tile) {

    if (this.holds.length >= this.carrots.length) return prompt(RELEASE_ROYAL, false, tile);

    let carrot = this.carrots.first(c => !c.tile);

    if (!carrot) return state(HINT.NO_CARROTS);

    carrot.tile = tile;

    if (tile.holder) tile.holder.release(tile);

    tile.holder = this;

    game.endTurn();

    state(HINT.GOT_ROYAL, tile);

  }



  release(tile) {

    tile.holder = false;

    let carrot = this.carrots.first(c => c.tile === tile);

    carrot.tile = false;

  }



  addRide(ride) {

    this.rides.push(ride);

    game.rides = game.rides.filter(r => r !== ride);

    state(HINT.USE_JOKER);

  }



  removeRide() {

    this.rides = this.rides.filter(r => r !== this.ride);

    game.rides.push(this.ride);

  }



  get isTurn() {

    return game && game.player === this;

  }



  get x() {

    return this.rabbit.x;

  }



  get y() {

    return this.rabbit.y;

  }



  set tile(tile) {

    if (!tile || tile === this.tile) return;

    this.lastTile = this.tile;

    if (this._tile) this._tile.players = this._tile.players.filter(player => player !== this);

    this._tile = tile;

    this._tile.players = this._tile.players ? [this, ...this._tile.players].uniques() : [this];

    this._tile.players.forEach(p => p.update());

  }



  get tile() {

    return this._tile;

  }



  get offset() {

    let r = this.angle;

    let [dx, dy] = [this.d * cos(r), this.d * sin(r)];

    if (game && this.tile === game.overboard)[dx, dy] = [dx * 5, dy * 5];

    else if (this.isTurn && this.tile !== game.underground)[dx, dy] = [0, 0];

    if (this.tile.type === TILE.RHOMBUS) {

      this.tile.roads.forEach(road => {

        if(!road.visible) return;

        dx += road.x;

        dy += road.y;

      });

      dx /= this.tile.roads.length;

      dy /= this.tile.roads.length;

    }

    return [this.tile.x + dx, this.tile.y + dy];

  }



  get angle() {

    if (this.tile === game.underground || this.tile === game.overboard) return this.tile.players.indexOf(this) * TWO_PI / 6 - TWO_PI / 12;

    let arr = this.tile.players.filter(p => game && game.player !== p);

    let i = arr.indexOf(this);

    if (i < 0) return 0;

    let n = arr.length;

    return i * TWO_PI / n;

  }



  get carrotNum() {

    return this.carrots.filter(c => !c.tile).length;

  }



  get holds() {

    return this.carrots.map(carrot => carrot.tile).filter(c => c);

  }



  get misses() {

    let titles = TITLE.toArray();

    this.holds.forEach(r => titles = titles.filter(t => t !== r.level));

    return titles;

  }



  set won(v) {

    if (!v) return this.update();

    this.rabbit.z = 2;

    this.rabbit.turnTo(10 * PI);

  }



}
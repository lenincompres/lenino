class Game {

  constructor() {

    this.tiles = [];

    this.rabbits = [];

    this.players = [];

    this.triangles = [];

    this.rhombi = [];

    this.hexes = [];

    this.tableTiles = [];

    this.possibleTiles = [];

    this.hitSize = 0.18;

    this.turnCount = 0;

    this.endPos;

    this.moved = false;

    this.playersMin = 2;

    this.playersMax = false;

    this.dice;

    this.rides = RIDE.toArray();

    this.level = LEVEL.INTRO;

    // initialize tiles

    pieces.forEach((piece, i) => {

      if (piece.group === PIECE.TILE) {

        let tile = new Tile(piece);

        //this.tiles.push(tile); //replaces the original piece with the new tile

        if (tile.type === TILE.TRIANGLE) {

          if (this.triangles.length) tile.copyEdges(this.triangles[0]);

          else tile.findEdges(-PI / 6, 6);

          this.triangles.push(tile);

        } else if (tile.type === TILE.RHOMBUS) {

          if (this.rhombi.length) tile.copyEdges(this.rhombi[0]);

          else {

            tile.findEdges();

            tile.findEdges(PI / 2, 2);

          }

          this.rhombi.push(tile);

        } else if (tile.type === TILE.HEX) {

          if (this.hexes.length) tile.copyEdges(this.hexes[0]);

          else tile.findEdges(0, 12);

          this.hexes.push(tile);

          if (!tile.suit) {

            if (tile.level === TITLE.JACK) {

              tile.level = tile.role = ROLE.CASTLE;

              tile.island = tile;

              tile.id = tile.id.split('_').map((v, i, arr) =>

                i === arr.length - 1 ? ROLE.CASTLE : v

              ).join('_');

              tile.x = 0;

              tile.y = 0;

              tile.flat = true;

              this.castle = tile;

            } else if (tile.level === TITLE.QUEEN) {

              tile.level = tile.role = ROLE.UNDERGROUND;

              tile.id = tile.id.split('_').map((v, j, arr) =>

                j === arr.length - 1 ? ROLE.UNDERGROUND : v

              ).join('_');

              tile.flat = true;

              this.underground = tile;

              tile.edges = [];

              tile.findEdges(0, 12);

            } else {

              tile.level = tile.role = ROLE.OVERBOARD;

              tile.id = tile.id.split('_').map((v, j, arr) =>

                j === arr.length - 1 ? ROLE.OVERBOARD : v

              ).join('_');

              this.overboard = tile;

            }

          }

        }

        this.tiles.push(tile);

      } else if (pieces.group !== PIECE.SUIT) {

        piece.y = -piece.h * 0.34;

        piece.x = 0;

        switch (piece.group) {

          case PIECE.RABBIT:

            this.rabbits.push(piece);

            break;

          case PIECE.CARROT:

            piece.pick = _ => prompt(CONFIRM, pen(HINT.REMOVE_CARROT, piece), _ => this.player.release(piece.tile));

        }

      }

    });

    // final settings

    this.tiles.forEach(tile => tile.addGlows(...GLOW.toArray()));

    this.rabbits.forEach(tile => tile.addGlows(GLOW.RIGHT));

    this.hitSize *= this.castle.w * 0.5;

    this.tableTiles.push(this.castle);

    this.setZoom();

    say(HINT.WELCOME);

    state(HINT.CLICK_START);

  }



  setLang(l) {

    lang = l;

    if (this.stage) return;

    say(HINT.WELCOME);

    state(HINT.CLICK_START);

  }



  /* -------------------------------------------------------------------------- */

  /*                                CORE METHODS                                */

  /* -------------------------------------------------------------------------- */



  draw(z = 1) {

    push();

    translate(center.x, center.y);

    //draw the shorelines and tiles

    this.tableTiles.forEach(tile => tile.drawShore(z));

    this.tableTiles.forEach(tile => tile.draw(z));

    this.players.forEach(player => player !== this.player ? player.draw(z) : null);

    if (this.player) {

      this.player.draw(z);

      if (this.stage === STAGE.SETUP) this.tableTiles.forEach(tile => tile.roads.forEach(road => road.draw(z)));

      else if (this.stage === STAGE.PLAYING && !this.willJump && !this.moved) this.player.tile.roads.forEach(p => p.pathLinks.forEach(link => link.draw(z))); // draws all trail roads.

    }

    //draw the pieces during setup

    if (this.stage === STAGE.SETUP) {

      if (selectedPiece) {

        selectedPiece.draw(z);

        selectedPiece.roads.forEach(road => road.draw(z));

      } else this.player.tiles.forEach(tile => tile.draw(z));

    }

    pop();

    if (this.stage === STAGE.PLAYING) this.dice.draw();

    this.update();

  }



  updatePlayers(players) {

    if (this.stage !== STAGE.PRESET) return;

    this.castle.players = [];

    if (!players) players = RABBIT.toArray().filter((_, i) => i < 4);

    this.players = this.rabbits.filter(r => players.includes(r.order)).map(rabbit => new Player(rabbit));

    //this.players.forEach(p => p.update());

    this.setZoom(this.castle);

  }



  dealTiles(suits) {

    this.players.sortRandom();

    if (this.mapLoaded) return this.startGame();

    this.suits = suits ? suits : SUIT.toArray().filter((_, i) => i < 4); //this.players.length);

    this.castle.position(0, 0);

    this.tableTiles = [this.castle];

    // Dealing tiles

    let hexes = this.hexes.filter(tile => this.suits.includes(tile.suit));

    let rhombi = this.rhombi.filter(tile => this.suits.includes(tile.suit));

    let triangles = this.triangles.filter((tile, i) => i < this.suits.length * 3);

    hexes.sortRandom();

    rhombi.sortRandom();

    triangles.sortRandom();

    let nTiles = hexes.length / this.players.length;

    this.players.forEach(player => player.tiles = [...triangles.splice(0, nTiles), ...rhombi.splice(0, nTiles), ...hexes.splice(0, nTiles)]);

    this.players.sortRandom();

    //avoid the clikc counting as grabbing a tile

    setTimeout(_ => {

      this.stage = STAGE.SETUP;

      this.setZoom();

      this.arrangeHand();

      this.nextTile();

    }, 100);

  }



  loadMap(name) {

    this.mapName = name;

    this.tiles.forEach(tile => tile.edges.forEach(edge => edge.link = false));

    if (!name) {

      this.tableTiles.forEach(tile => tile.flat = false);

      this.tableTiles = [this.castle];

      this.castle.flat = true;

      this.linkCoasts();

      this.setZoom(this.castle);

      this.playersMax = false;

      say(HINT.NEW_MAP);

      return this.mapLoaded = false;

    }

    this.tableTiles = [];

    this.players.forEach(player => player.visible = false);

    loadJSON(`json/${name}.json`, map => {

      this.tiles.forEach(tile => {

        if (!map[tile.id]) return;

        Object.assign(tile, map[tile.id]);

        tile.placed = true;

        this.tableTiles.push(tile);

      });

      this.linkCoasts();

      //center castle

      let dx = this.castle.x;

      let dy = this.castle.y;

      this.tiles.forEach(tile => {

        tile.x -= dx;

        tile.y -= dy;

      });

      this.players.forEach(player => player.tile = this.castle);

      this.displayMapInfo(map);

      this.setZoom();

    });

    this.mapLoaded = true;

  }



  displayMapInfo(map) {

    if (map) this.map = map;

    if (this.map.info) {

      this.suits = this.tableTiles.filter(tile => tile.suit).map(tile => tile.suit).uniques();

      let info = this.map.info[lang] ? this.map.info[lang] : this.map.info;

      say(HINT.MAP, info, this.map.info.max, this.suits);

      this.playersMax = this.map.info.max ? this.map.info.max : 4;

    }

  }



  saveMap(name) {

    let map = {};

    let [dx, dy] = [this.castle.x, this.castle.y];

    this.tableTiles.forEach(tile => {

      if (tile !== this.underground) {

        map[tile.id] = {

          x: tile.x - dx,

          y: tile.y - dy,

          r: tile.r

        }

      }

    });

    saveJSON(map, `${name}.json`);

  }



  /* -------------------------------------------------------------------------- */

  /*                                BOARD METHODS                               */

  /* -------------------------------------------------------------------------- */



  setZoom(tiles) {

    if (!tiles) tiles = this.tableTiles;

    if (!Array.isArray(tiles)) tiles = [tiles];

    let tile = this.player ? this.player.tile : tiles[0];

    let [top, right, bottom, left] = [tile.y, tile.x, tile.y, tile.x];

    tiles.forEach(tile => {

      if (!tile || tile === this.overboard) return;

      if (tile.x < left) left = tile.x;

      if (tile.x > right) right = tile.x;

      if (tile.y < top) top = tile.y;

      if (tile.y > bottom) bottom = tile.y;

    });

    let m = this.castle.h * (this.stage === STAGE.SETUP ? 3 : 2);

    let margin = this.castle.h * (this.stage === STAGE.SETUP ? 0.5 : 0);

    zoomTo(min(width / max(right - left + m, width), height / max(bottom - top + m, height)));

    this.goto((right + left) * -0.5, (bottom + top + margin) * -0.5);

  }



  update() {

    if (this.endPos && dist(0, 0, this.endPos.x, this.endPos.y) > 1) {

      let [dx, dy] = [this.endPos.x, this.endPos.y].times(speed);

      this.endPos.x -= dx;

      this.endPos.y -= dy;

      return this.moveBy(dx, dy);

    }

    this.endPos = false;

  }



  goto(x, y = true) { // x can also be a tile to center, and y the choice to zoom into it.

    if (typeof x !== 'number') {

      if (!x.type) this.endPos = false;

      if (y) return this.setZoom(x);

      return this.goto(-x.x, -x.y);

    }

    this.endPos = {

      x: x,

      y: y

    }

  }



  moveBy(deltax, deltay) {

    let tiles = this.stage === STAGE.SETUP && tableHeld && this.target && this.target.flat ?

      this.tableTiles.filter(tile => tile.island === this.target.island) : [this.overboard, ...this.tableTiles];

    tiles.forEach(tile => tile.moveBy(deltax, deltay));

  }



  arrangeHand() {

    let xInit = -this.players[0].tiles.reduce((prev, tile) => tile.w + prev, 0) * 0.5;

    let yInit = center.y / canvasZoom - this.castle.h * 0.68;

    this.players.forEach(player => {

      let prevTile;

      player.tiles.forEach(tile => {

        tile.y = yInit;

        tile.x = (prevTile ? prevTile.x + prevTile.w * 0.5 : xInit) + tile.w * 0.5;

        tile.xyInit = [tile.x, tile.y];

        prevTile = tile;

      })

    });

  }



  /* -------------------------------------------------------------------------- */

  /*                                USER ACTIONS                                */

  /* -------------------------------------------------------------------------- */



  peep(input) {

    if (!input) return squeek();

    if (input.type === EDGE.ROAD) return squeek(pen(input.link ? HINT.ROAD : HINT.PORT));

    if (input.group !== PIECE.TILE) return squeek();

    let OOR = this.moved ? pen(HINT.CANNOT_LEAVE) : pen(HINT.OOR);

    if (this.player.ride || input === this.player.tile || this.possibleTiles.includes(input)) OOR = '';

    squeek(penName(input) + OOR);

  }



  see(x, y) {

    if (!this.stage) return this.target = this.castle.isMe(x, y);

    if (this.stage === STAGE.SETUP) {

      if (this.halted) return;

      if (selectedPiece) return this.target = selectedPiece.isMe(x, y) ? selectedPiece : false;

      return this.target = [...this.player.tiles, ...this.tableTiles].first(t => t.isMe(x, y));

    }

    if (this.stage === STAGE.PLAYING) {

      if (this.halted) return this.target = this.dice && this.dice.isMe(x, y) ? this.dice : false;

      if (this.player.ride === RIDE.BOAT) return this.target = this.player.rabbit.isMe(x, y) ? this.player : false;

      let tries = [this.dice];

      if (!this.willJump) {

        tries.push(...this.player.carrots.filter(carrot => carrot.tile));

        if (!this.moved) tries.push(...this.player.tile.roads);

        tries.push(this.player.tile);

      }

      if (!this.moved || this.willJump) tries.push(...this.possibleTiles);

      this.peep([...tries, ...this.tableTiles].first(t => t.isMe(x, y)));

      return this.target = tries.first(t => t.isMe(x, y));

    }

    return this.target = false;

  }



  pick(x, y) { // mousepressed

    //if (this.halted) return;

    if (!this.target) return this.release();

    if (!this.stage) {

      this.stage = STAGE.PRESET;

      prompt(SETTINGS, _ => this.dealTiles());

    } else if (this.stage === STAGE.SETUP) {

      let tile = this.target;

      if (tile.flat) return tableHeld = true;

      tile.picked = true;

      this.ports = this.getPorts(tile);

      if (!this.ports.length) say(HINT.HEX2HEX);

      else if (this.lastTurnGrab !== this.turnCount) say(tile.type === TILE.HEX ? HINT.HEXTILES : HINT.ROADTILES);

      else if (selectedPiece !== tile) say();

      if (this.lastTurnGrab !== this.turnCount) this.lastTurnGrab = this.turnCount;

      selectedPiece = tile;

    } else if (this.stage === STAGE.PLAYING) {

      if (this.target === this.player) return selectedPiece = this.target;

      return this.target.pick ? this.target.pick() : prompt(EXPLORE, this.target.pathLinks.reverse().uniques());

    }

  }



  release() {

    if (!selectedPiece) return;

    if (this.stage === STAGE.SETUP) {

      if (selectedPiece.placed || selectedPiece === this.underground) return selectedPiece = null;

      selectedPiece.picked = false;

      this.arrangeHand();

      say(HINT.YOU_CAN_DO_IT, this.player);

      this.setZoom();

      selectedPiece = false;

      this.getCoasts();

    }

  }



  turn(clockwise = 1) {

    if (!selectedPiece) return;

    clockwise = dir(clockwise);

    selectedPiece.r += clockwise * PI / 3;

    if (selectedPiece.type === TILE.RHOMBUS && cos(selectedPiece.r) < 0) selectedPiece.r -= PI;

  }



  /* -------------------------------------------------------------------------- */

  /*                                PLACING TILES                               */

  /* -------------------------------------------------------------------------- */



  isLand(x, y) {

    let c = get(x, y);

    return c[3] && abs(hue(c) - hue(color(COLOR[EDGE.SEA]))) > 10 ? c : false;

  }



  getCoasts() { // gets all the edges of the map on the board

    let boardSides = [];

    this.tableTiles.forEach(tile => tile.edges.forEach(edge => {

      if (!edge.link) {

        edge.show = edge.wrong = false;

        boardSides.push(edge);

      }

    }));

    return boardSides;

  }



  getPorts(tile) { // gets all the roads available for linking on the board

    if (!tile) tile = selectedPiece;

    return this.getCoasts().filter(coast => {

      if (coast.type !== EDGE.ROAD) return false;

      coast.show = !coast.link && !(tile.type === TILE.HEX && coast.tile.type === TILE.HEX);

      return coast.show;

    });

  }



  linkCoasts(tile) { // links all edges overlapping on the board

    if (!tile) tile = selectedPiece ? selectedPiece : this.castle;

    let coasts = [...tile.edges, ...this.getCoasts()];

    let wrongLink = false;

    coasts.forEach(coastA => { // Finds newly linked roads

      coasts.forEach(coastB => {

        if (wrongLink) return;

        if (coastB !== coastA && dist(...coastA.xy(), ...coastB.xy()) < this.hitSize) {

          if (wrongLink || !coastA.isSide && !coastB.isSide) return;

          if (coastA.isSide !== coastB.isSide) {

            say(HINT.OVERLAP_2);

            return wrongLink = coastA;

          }

          if (coastA.type !== coastB.type) {

            say(HINT.ROAD2FIELD);

            return wrongLink = coastA;

          }

          if (coastA.isRoad && coastA.tile.type === TILE.HEX && coastB.tile.type === TILE.HEX) {

            say(HINT.HEX2HEX2);

            return wrongLink = coastA;

          }

          coastA.link = coastB;

          coastB.link = coastA;

        }

      });

    });

    if (!wrongLink) return true;

    wrongLink.wrong = true;

    tile.edges.forEach(edge => {

      if (edge.link) edge.link = edge.link.link = undefined

    });

    return false;

  }



  nextTile() {

    if (this.player) this.player.tiles.forEach(tile => tile.visible = false);

    this.player = this.players[this.turnCount % this.players.length];

    this.players.forEach(player => player.update());

    if (!this.player.tiles.length) return this.startGame();

    this.player.tiles.forEach(tile => tile.visible = true);

    say(HINT.PLACINGS, this.turnCount, this.player);

    this.turnCount += 1;

  }



  tryTile() {

    say();

    selectedPiece.visible = false;

    setTimeout(e => {

      let canPlace = this.canTile();

      if (!canPlace) return selectedPiece.wrong = true;

      if (canPlace === selectedPiece) {

        selectedPiece.visible = true;

        return prompt(CONFIRM, pen(HINT.IS_ISLAND), _ => this.placeTile());

      }

      this.placeTile();

    }, 40);

  }



  canTile() {

    if (this.stage != STAGE.SETUP || !selectedPiece || selectedPiece.group !== PIECE.TILE) return false;

    // check port to link

    let linkage = selectedPiece.findLinkage(this.ports);

    if (!linkage) {

      if (dist(selectedPiece.x, selectedPiece.y, this.castle.x, this.castle.y) < this.OFFSHORE * 3) return say(HINT.TRY_ISLAND);

      selectedPiece.island = selectedPiece;

      return true; //create island

    }

    // check if far enough for island

    let isIsland = canvasZoom * linkage.distance > this.OFFSHORE;

    if (isIsland && selectedPiece.type !== TILE.HEX) return say(HINT.TOO_FAR);

    if (isIsland) return selectedPiece;

    // snap tile

    selectedPiece.position(...[selectedPiece.x, selectedPiece.y].plus(linkage.mapRoad.xy().minus(linkage.tileRoad.xy())));

    // check overlap

    if (this.isOverlaping(selectedPiece, isIsland ? 4 * this.hitSize : -this.hitSize)) return say(isIsland ? HINT.MOVE_ISLAND : HINT.OVERLAP);

    // check linking errors

    if (!this.linkCoasts(selectedPiece)) return false;

    // it all checks out

    selectedPiece.island = isIsland ? selectedPiece : linkage.mapRoad.tile.island;

    return true;

  }



  placeTile() {

    this.player.tiles = this.player.tiles.filter(tile => tile !== selectedPiece);

    this.tableTiles.push(selectedPiece);

    selectedPiece.placed = true;

    selectedPiece = null;

    this.arrangeHand();

    this.nextTile();

    this.setZoom();

  }



  isOverlaping(tile, nudge = 0) {

    if (!tile) tile = selectedPiece;

    tile.edges.forEach(edge => edge.wrong = this.isLand(...edge.xy(nudge).times(canvasZoom).plus([center.x, center.y])));

    return tile.edges.isAny(edge => edge.wrong);

  }



  /* -------------------------------------------------------------------------- */

  /*                                PLAYING TURNS                               */

  /* -------------------------------------------------------------------------- */



  startGame() {

    this.ports = false;

    this.placeUnderground();

    selectedPiece = false;

    say(HINT.MAPPED_OUT);

    state(HINT.OBJECTIVE);

    prompt(pen(HINT.DEALING_CARDS), _ => {

      this.player = this.players[0];

      this.stage = STAGE.PLAYING;

      this.overboard.position(this.underground.x, this.underground.y);

      let d = min(width, height) * 0.1;



      this.dice = new Dice(width - d * 2, height - d, d, 2, COLOR[EDGE.ROAD]);

      this.dice.hint = close => say(close === false ? '' : !this.moved ? HINT.DICE_USE :

        this.player.tile === this.overboard ? HINT.GOT_OVERBOARD : HINT.END_TURN);

      this.dice.pick = _ => this.player.tile.type === TILE.HEX ? this.endTurn() : say(HINT.DICE_INNACTIVE);



      say(HINT.FIRST_MOVE, this.player);

      this.turnCount = 0;

      this.newTurn();

    }, pen(HINT.FIRST_TURN));

  }



  placeUnderground() {

    this.tableTiles = this.tableTiles.filter(tile => tile !== this.underground);

    setTimeout(e => {

      this.underground.x = this.OFFSHORE;

      this.underground.y = this.OFFSHORE;

      let nudge = this.OFFSHORE * 1.34;

      let nudgeArr = [0, nudge];

      while (this.isOverlaping(this.underground, nudge)) this.underground.moveBy(...nudgeArr.reverse());

      this.underground.edges.forEach(edge => edge.wrong = false);

      this.tableTiles.push(this.underground);

      this.setZoom();

      //set islands

      let tile = this.castle;

      while (tile) {

        tile.island = tile;

        tile = this.tableTiles.first(t => t.type === TILE.HEX && !t.island);

      }

    }, 30);

  }



  endTurn() {

    if (this.stage === STAGE.OVER) return;

    if (this.player.tile === this.overboard) {

      prompt();

      return this.newTurn();

    } else prompt(INFORM, pen(HINT.GET_EOT), _ => this.newTurn());

  }



  newTurn() {

    this.player = this.players[this.turnCount % this.players.length];

    this.turnCount += 1;

    this.dice.roll();

    this.moved = false;

    this.willJump = false;

    this.halted = false;

    let tile = this.player.tile;

    this.dice.disabled = tile.type !== TILE.HEX;

    if (this.turnCount < this.players.length) say(HINT.NEXT_TURN, this.player);

    this.getPaths();

    if (tile === this.overboard) {

      state(HINT.BACK_ONBOARD);

      return this.tryMove(this.underground);

    } else if (tile === this.underground) prompt(EXPLORE);

    else state(HINT.PATH);

  }



  // all possible tiles its pathLinks (road links that leads to them)

  // also sets paths to the main tile

  getPaths(input) {

    this.path = null;

    this.tableTiles.forEach(t => {

      t.selected = false;

      t.paths = [];

    });

    this.possibleTiles = [];

    let tile = this.player.tile;

    if (input === false || tile === this.overboard || tile === this.underground) return this.setZoom(tile);

    let all = input === true || tile.type !== TILE.RHOMBUS;

    tile.roads.forEach(road => {

      if (all) road.visible = true;

      if (!road.visible) return road.pathLinks = [];

      road.pathLinks = [road];

      road.getTrail((t, link) => {

        link.show = link.visible = true;

        road.pathLinks.push(link);

        t.paths ? t.paths.push(road) : t.paths = [road]; //not sure what this it fors

        if (t !== this.overboard) this.possibleTiles.push(t);

      })

    });

    this.setZoom(this.possibleTiles);

  }



  tryMove(tile, validRoads = false) {

    if (this.player.tile === tile) return this.solveTile();

    //promp to visit a queen

    if (this.level !== LEVEL.INTRO && tile.level === TITLE.QUEEN && game.suits.includes(SUIT.HEARTS))

      return prompt(CONFIRM_CARDS, SUIT.HEARTS, _ => this.moveTo(tile), _ => prompt(EXPLORE, this.player.tile));

    //find entry port

    if (tile !== this.overboard) {

      if (!validRoads) validRoads = tile.roads.filter(road => road.link.trail);

      if (!Array.isArray(validRoads)) validRoads = [validRoads];

      validRoads = [...validRoads.map(e => e.paths).concat(), ...validRoads].uniques();

      tile.roads.forEach(road => road.visible = validRoads.includes(road));

    }

    this.moveTo(tile);

  }



  moveTo(tile) {

    if (!tile || !tile.role) tile = this.overboard;

    this.player.tile = tile;

    prompt();

    state();

    tile.hint(false);

    this.player.ride = false;

    this.willJump = false;

    this.halted = false;

    if (this.isOver()) return;

    this.moved = tile.type === TILE.HEX;

    this.dice.disabled = tile.type !== TILE.HEX;

    if (!this.dice.disabled) state(HINT.TO_END_TURN);

    this.getPaths();

    if (this.moved) prompt(EXPLORE);

    else state(HINT.CLICK_EXPLORE);

    if (tile.type == TILE.TRIANGLE) this.solveTile();

  }



  takeRide(ride, isJoker = false) {

    prompt();

    if (!this.canRide(ride, !isJoker)) return state(HINT.CANNOT_RIDE, ride);

    this.halted = false;

    this.player.ride = ride;

    if (isJoker) this.player.removeRide(ride);

    if (ride === RIDE.HORSE) return this.jump(this.tableTiles.filter(t => t.type === TILE.HEX && t.island === this.player.tile.island), HINT.RIDE_HORSE);

    this.path = false;

    this.jump([], HINT.BOAT_PORT);

    this.setZoom();

  }



  boatRiding(go = true) {

    if (!selectedPiece) return;

    if (!go) {

      selectedPiece = false;

      this.setZoom();

    }

    let [x, y] = [selectedPiece.x, selectedPiece.y];

    let portTile = this.tableTiles.first(tile => tile.isMe(x, y));

    if (portTile && portTile !== this.player.tile) {

      selectedPiece = this.target = false;

      if (portTile.ports.length) prompt(CONFIRM, pen(HINT.BOAT_HERE), _ => {

        if (portTile.type !== TILE.RHOMBUS) return this.tryMove(portTile);

        let [port, lastD] = [false, width];

        portTile.ports.forEach(p => {

          let d = dist(x, y, ...p.xy());

          if (d < lastD) {

            port = p;

            lastD = d;

          }

        });

        return this.tryMove(portTile, port);

      });

      say(HINT.NOT_PORTS);

      this.setZoom();

    }

  }



  jump(tiles = [], hint) {

    this.willJump = true;

    this.getPaths(false);

    state(hint);

    this.possibleTiles = tiles.filter(t => t !== this.player.tile);

    this.setZoom(tiles.length ? [...this.possibleTiles, this.player.tile] : false);

  }



  solveTile(tile = false, execute = false) {

    if (!tile) tile = this.player.tile;

    if (tile.type === TILE.HEX) return prompt(EXPLORE);

    this.setZoom(tile);

    //test rides

    if (!execute && RIDE.toArray().isAny(r => this.canRide(r))) return prompt(EXPLORE);

    //woods

    if (tile.role === ROLE.WOODS) {

      return execute || tile.roads.isAny(road => !road.visible) ?

        prompt(CONFIRM_CARDS, tile, _ => this.getPaths(true)) :

        state(HINT.ALREADY_DID);

    }

    //triangles

    if (tile.type !== TILE.TRIANGLE) return;

    if (tile.role === ROLE.CAVE && this.player.lastTile.role === ROLE.CAVE || this.player.lastTile.role === ROLE.UNDERGROUND) return this.setZoom(this.possibleTiles);

    if (tile.role === ROLE.BEND && !this.rides.length) return state(pen(HINT.NO_RIDES));

    prompt(CONSULT, penConfirm(tile), yes => {

      if (tile.role === ROLE.CAVE) {

        if (yes) return prompt(CONFIRM_ROYAL, _ => this.jump(this.tableTiles.filter(t => t.role === ROLE.CAVE), HINT.SELECT_CAVE), SUIT.CLUBS);

        return this.tryMove(this.underground);

      }

      if (yes) prompt(CONFIRM_ROYAL, _ => {

        if (tile.role === ROLE.FORK) {

          if (tile.ports.length) return prompt(CONSULT, pen(HINT.WHICH_RIDE), ride => this.takeRide(ride), ...this.makeChoices(RIDE.toArray()));

          else return prompt(CONFIRM, pen(HINT.ONLY_HORSE), _ => this.takeRide(RIDE.HORSE));

        } else if (tile.role === ROLE.BEND) {

          if (!this.rides.length) return state(HIT.NO_JOKERS);

          if (this.rides.length === 1) return prompt(CONFIRM, pen(HINT.ONLY_JOKER, this.rides[0]),

            _ => this.player.addRide(this.rides[0]));

          return prompt(CONSULT, pen(HINT.WHICH_JOKER), ride => this.player.addRide(ride), ...this.makeChoices(this.rides));

        }

      }, getSuits(tile));

    });

  }



  makeChoices(arr) {

    return [arr.map(r => (ICON[r] ? ICON[r] + '</br>' : '') + pen(r)), arr.map(r => COLOR[r]), arr];

  }



  isOver() {

    if (this.player.tile !== this.castle || this.player.misses.length) return false;

    this.stage = STAGE.OVER;

    this.player.won = true;

    this.setZoom([this.castle, ...this.player.holds]);

    say(HINT.PLAYER_WINS, this.player);

    prompt(NEW_GAME);

    return true;

  }



  canRide(ride, immediate = false) {

    if (!immediate && !this.player.rides.includes(ride)) return false;

    if (ride === RIDE.BOAT) return !!this.player.tile.ports.length;

    return this.tableTiles.isAny(tile => tile.type === TILE.HEX && tile.island === this.player.tile.island && tile !== this.player.tile);

  }



  /* -------------------------------------------------------------------------- */

  /*                             GETTERS AND SETTERS                            */

  /* -------------------------------------------------------------------------- */



  set player(p) {

    this._player = p;

    this.players.forEach(player => player.update());

    if (this.dice) this.dice.colour = COLOR[this.player.id];

  }



  get player() {

    return this._player;

  }



  set target(target) {

    if (target === this._target) return;

    if (this.stage === STAGE.PLAYING && this._target && this._target.hint) this.target.hint(false);

    this._target = target;

    if (this.stage === STAGE.PLAYING) {

      if (!target) return this.path = false;

      if (target.paths) this.path = target.paths;

      if (!this.path && target.isRoad) this.path = target;

      if (target.hint) target.hint();

    }

  }



  get target() {

    return this._target;

  }



  get OFFSHORE() {

    return this.castle.w * 0.68;

  }



  set path(links) {

    if (this._paths) this._paths.forEach(p => p.pathLinks.forEach(link => link.trail = false));

    if (!links) return this._paths = null;

    this._paths = Array.isArray(links) ? links : [links];

    this._paths.forEach(p => p.pathLinks.forEach(link => link.trail = true));

  }



}
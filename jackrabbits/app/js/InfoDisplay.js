class InfoDisplay extends Display {



  constructor() {

    super();

    this.rabbits = RABBIT.toArray().filter((_, i) => i < 4).map(r => {

      return {

        id: r

      }

    }).sortRandom();

  }



  display(desc, callBack, btnText) {

    state();

    say();

    game.halted = true;

    super.display(desc, _ => {

      if (callBack) callBack();

      game.halted = false;

    }, btnText);

  }



  settings(callBack) {

    this.display(_ => {

      this.add(pen(HINT.SETTINGS), 'h1');



      // Language

      this.add(pen(HINT.LANGUAGE), 'h2');

      let langSelect = this.add(createSelect());

      langSelect.changed(_ => {

        lang = langSelect.value();

        game.map ? game.displayMapInfo() : say(HINT.WELCOME);

        this.settings(_ => callBack());

      });

      LANG.toArray().forEach(l => langSelect.option(l));

      langSelect.selected(lang);



      //Players

      this.add(pen(HINT.PLAYERS), 'h2');

      this.rabbits.forEach(rabbit => {

        let check = createCheckbox(pen(rabbit.id).capitalize());

        check.style('color', COLOR[rabbit.id]);

        this.add(check);

        rabbit.selected = game.players.isAny(p => p.rabbit.order === rabbit.id);

        check.checked(rabbit.selected);

        check.changed(_ => {

          rabbit.selected = check.checked();

          game.updatePlayers(this.rabbits.filter(r => r.selected).map(r => r.id));

          quideDisplay.display();

        });

      });



      //suits



      // maps to load

      this.add(pen(HINT.BOARD), 'h2');

      let mapSelect = this.add(createSelect());

      mapSelect.changed(e => {

        game.loadMap(mapSelect.value());

        state(mapSelect.value() ? HINT.MAP_WARNING : '');

      });

      let mapNames = ['stereotopia', 'prototopia', 'archetopia', '']; //, 'sampleria', 'paragonia'];

      mapNames.forEach(m => mapSelect.option(m ? m.capitalize() : pen(HINT.CREATE_MAP), m));

      if (game.mapName) mapSelect.selected(game.mapName);

      else game.loadMap(mapSelect.value());



      // rules level

      this.add(pen(HINT.RULES), 'h2');

      let levelSelect = this.add(createSelect());

      levelSelect.changed(_ => {

        state(HINT.LEVEL_RECOMMENDED, levelSelect.value());

        game.level = levelSelect.value();

      });

      LEVEL.toArray().forEach(m => levelSelect.option(pen(m), m));



      // start Button

      let goBtn = this.add('OK', 'button');

      goBtn.mouseClicked(_ => {

        let n = this.rabbits.filter(r => r.selected).length;

        if (n < 2 || game.playersMax && n > game.playersMax) return say(HINT.MIN_PLAYERS, game.playersMin, game.playersMax);

        state();

        this.close();

      });

    }, _ => callBack());

  }



  explore(input) {

    this.display(_ => {



      /* ---------------------------------- PATH ---------------------------------- */



      if (Array.isArray(input)) {

        let links = input;

        game.setZoom(links.map(link => link.link.tile));

        this.add(pen(HINT.PATH_TITLE), 'h1');

        links.forEach(link => {

          let tile = link.link.tile ? link.link.tile : game.overboard;

          if (tile.role === ROLE.MOUNTAIN) return;

          this.addLink(penLink(tile), _ => {

            game.tryMove(tile, link.link);

            this.close();

          }, _ => tile.hint(), _ => tile.hint(false));

          if (game.canRide(RIDE.BOAT)) this.addLink(penLink(RIDE.BOAT), _ => {

            game.takeRide(RIDE.BOAT, true);

            this.close();

          }, _ => say(HINT.DISCARD_JOKER), _ => say());

        });

        this.addButton(pen(HINT.CLOSE), _ => {

          game.setZoom(game.possibleTiles);

          this.close();

        });

      }



      /* ---------------------------------- TILE ---------------------------------- */

      else {

        let player = game.player;

        let tile = input ? input : player.tile;

        game.path = false;

        game.setZoom(tile);

        this.add(pen(HINT.TILE_TITLE), 'h1');

        if (tile === game.overboard) this.add(pen(HINT.GOT_OVERBOARD, tile));



        /* ---------------------------- not overboard ---------------------------- */

        else {

          // road

          if (tile.roads.length) this.addLink(penLink(HINT.GO_ON_ROAD), _ => {

            if (game.moved) return state(HINT.END_HERE);

            game.setZoom(game.possibleTiles);

            state(HINT.PATH);

            this.close();

          }, false, false, game.moved ? 'idle' : false);

          // underground

          if (tile.role === ROLE.UNDERGROUND) {

            if (game.moved) this.add(pen(HINT.IN_UNDERGROUND, tile));

            else this.addLink(penLink(HINT.LEAVE_UNDERGROUND), _ => {

              game.jump(game.tableTiles.filter(tile => tile.role === ROLE.CAVE), HINT.CHOOSE_CAVE);

              this.close();

            });

          }

          // castle

          if (tile.role === ROLE.CASTLE) this.addLink(penLink(tile), _ => {

            return state(HINT.MISSING_ROYALS, player);

          }, _ => tile.hint(), _ => tile.hint(false));

          // royal

          if (tile.role === ROLE.ROYAL) this.addLink(penLink(tile), _ => {

            if (tile.holder) return state(HINT.ROYAL_TAKEN, tile);

            this.confirmCards(tile, _ => player.hold(tile), _ => this.explore());

          }, _ => tile.hint(), _ => tile.hint(false), tile.holder ? 'idle' : false);

          // road tile

          if (tile.type !== TILE.HEX) this.addLink(penLink(tile), _ => game.solveTile(tile, true), _ => say(tile), _ => say(), tile.role === ROLE.WOODS && !tile.roads.isAny(road => !road.visible) || tile.role === ROLE.BEND && !game.rides.length ? 'idle' : false);

          // higher level

          if (game.level !== LEVEL.INTRO) {

            if (tile.level === TITLE.JACK && game.suits.includes(SUIT.DIAMONDS)) {

              this.addLink(penLink(SUIT.DIAMONDS, tile.suit), _ => {

                let suits = tile.suit === SUIT.DIAMONDS ? SUIT.toArray().but(SUIT.DIAMONDS) : tile.suit;

                if (player.holds.length) return this.confirmRoyal(_ => this.explore(), suits);

                else this.inform(pen(HINT.TRADE_DONE), _ => this.explore());

              }, _ => say(HINT.SAYS, SUIT.DIAMONDS, tile.suit), _ => say());

            }

            if (tile.level === TITLE.KING && game.suits.includes(SUIT.CLUBS)) {

              this.addLink(penLink(SUIT.CLUBS), _ => {

                if (game.moved) return state(HINT.END_HERE);

                this.confirmCards(SUIT.CLUBS, _ => game.jump(game.tableTiles.filter(t => t !== tile && t.level === TITLE.KING), HINT.FLY_GO), _ => this.explore());

              }, _ => say(HINT.SAYS, SUIT.CLUBS), _ => say(), game.moved ? 'idle' : false);

            }

            if (tile.players.length > 1 && game.suits.includes(SUIT.SPADES)) {

              tile.players.forEach(p => {

                if (p === player) return;

                this.addLink(penLink(SUIT.SPADES, p), _ => {

                  this.confirmCards([SUIT.SPADES, p], _ => {

                    p.tile = game.overboard;

                    if (p.holds.length) return this.confirm(pen(HINT.ATTACK_ROYAL), _ => this.stoleRoyal(p), _ => this.explore());

                    this.explore();

                  }, _ => this.explore());

                }, _ => say(HINT.SAYS, SUIT.SPADES, p), _ => say());

              });

            }

          }



          /* --------------------------------- Rides -------------------------------- */

          player.rides.forEach(ride => {

            let can = game.canRide(ride);

            this.addLink(penLink(ride), _ => {

              if (game.moved) return state(HINT.END_HERE);

              if (!can) return state(HINT.CANNOT_RIDE, ride);

              game.takeRide(ride, true);

            }, _ => say(HINT.DISCARD_JOKER), _ => say(), game.moved || !can ? 'idle' : false);

          });



          /* ----------------- off the board ----------------- */

          if (tile.ports && tile.ports.length) {

            this.addLink(penLink(game.overboard), _ => {

              if (game.moved) return state(HINT.END_HERE);

              game.tryMove(game.overboard);

            }, _ => game.overboard.hint(), _ => game.overboard.hint(false), game.moved ? 'idle' : false);

          }

        }

      }

    });

  }



  confirmCards(input, yesBack = _ => null, noBack = _ => null) {

    let isShow = input === SUIT.HEARTS || input === SUIT.CLUBS;

    if (!Array.isArray(input)) input = [input];

    this.confirm(penConfirm(...input), _ => isShow ? yesBack() : this.confirmRoyal(_ => yesBack(), getSuits(input[0])), _ => noBack());

  }



  confirmRoyal(callBack, suits = []) {

    let royals = game.player.holds;

    if (!royals.length) return callBack();

    if (!Array.isArray(suits)) suits = [suits];

    if (suits.length) {

      royals = royals.filter(royal => suits.includes(royal.suit));

      if (!royals.length) return callBack();

    }

    this.confirm(pen(HINT.TRADE_ROYAL), _ => this.releaseRoyal(_ => callBack()), _ => callBack(), royals);

  }



  stoleRoyal(victim) {

    let player = game.player;

    this.display(_ => {

      this.add(pen(HINT.WHICH_ROYAL));

      victim.holds.forEach(tile => this.addLink(bullet(tile, true) + penName(tile), _ => {

        player.hold(tile);

        this.close();

      }, _ => tile.hint(), _ => tile.hint(false)));

      this.addButton(pen(HINT.NO));

    });

  }



  releaseRoyal(callBack, extra) {

    let player = game.player;

    let royals = player.holds;

    if (extra && extra.group === TILE.HEX) {

      royals = [extra, ...royals];

      extra = extra;

    } else {

      if (Array.isArray(extra)) royals = extra;

      extra = false;

    }

    this.display(_ => {

      this.add(pen(extra ? HINT.RELEASE_ROYAL : HINT.WHICH_ROYAL));

      royals.forEach(tile => this.addLink(bullet(tile, true) + penName(tile), _ => {

        if (!extra) player.release(tile);

        else if (tile !== extra) {

          player.release(tile);

          player.hold(extra);

        }

        this.close();

      }, _ => tile.hint(), _ => tile.hint(false)));

      if (!extra) this.addButton(pen(HINT.NO));

    }, _ => callBack());

  }



}
import Card from "./Card.js";
import TEXT from "./TEXT.js";

const QS = DOM.querystring();
const NAME = QS.jrsyname ? QS.jrsyname : undefined;
const HAND = QS.jrsyhand ? QS.jrsyhand.split(",").map(n => parseInt(n)) : false;

const MY_URL = window.location.href.substr(0, window.location.href.lastIndexOf("/"));

const WIDTH = new Binder(window.innerWidth);
addEventListener("resize", e => WIDTH.value = window.innerWidth);

const [STAGE_INTRO, STAGE_START, STAGE_WISDOM, STAGE_WEALTH, STAGE_DONE] = [0, 1, 2, 3, 4];
const STAGES = [STAGE_INTRO, STAGE_START, STAGE_WISDOM, STAGE_WEALTH, STAGE_DONE];

let nameInput;

const HIDE_MODEL = (binder, test = v => v) => {
  return {
    transition: "0.5s",
    overflow: "hidden",
    style: binder.as(test, {
      true: {
        opacity: 1,
        maxHeight: "100em",
      },
      false: {
        opacity: 0,
        maxHeight: 0,
      },
    }),
  }
};

window.BUTTON_STYLE = {
  ENABLED: (color = "black") => new Object({
    borderColor: color,
    color: color,
    opacity: 1,
    textShadow: "none",
    boxShadow: "inherit",
    pointerEvents: "initial",
  }),
  DISABLED: {
    borderColor: "transparent",
    color: "transparent",
    opacity: 0.3,
    textShadow: `0 0 3px gray`,
    boxShadow: `0 0 2px gray, 0 0 2px gray inset`,
    pointerEvents: "none",
  }
};

class SuitYourself extends HTMLElement {

  constructor(root = "") {
    super();

    this.strength = new Card({
      suit: Card.SUIT.S,
      callback: () => this.updateCount(),
      root: root,
      number: HAND ? HAND[0] : undefined,
    });
    this.charm = new Card({
      callback: () => this.updateCount(),
      suit: Card.SUIT.H,
      root: root,
      number: HAND ? HAND[1] : undefined,
    });
    this.wisdom = new Card({
      callback: () => this.updateCount(),
      suit: Card.SUIT.C,
      root: root,
      number: HAND ? HAND[2] : undefined,
    });
    this.wealth = new Card({
      root: root,
    });
    this.cards = [this.strength, this.charm, this.wisdom, this.wealth];
    this.orderedCards = [];

    this.strength.hintStage = 1;
    this.charm.hintStage = 1;
    this.wisdom.hintStage = 2;
    this.wealth.hintStage = 3;
    this.strength.appearStage = 0;
    this.charm.appearStage = 0;
    this.wisdom.appearStage = 2;
    this.wealth.appearStage = 3;


    this._shareURL = new Binder();
    this._topCards = new Binder([]);
    this._stage = new Binder(HAND ? STAGE_DONE : STAGE_INTRO);
    this.updateCount();
    this.updateShare();

    this.width = new Binder(window.innerWidth);
    window.addEventListener("resize", () => {
      this.width.value = window.innerWidth;
    });

    const TEXT_WIDTH = "28em";

    const css = {
      userSelect: "none",
      "*": {
        margin: 0,
      },
      h: {
        textShadow: "1px 1px 0 black",
        fontFamily: 'title',
        color: "forestgreen",
      },
      p: {
        textIndent: 0,
        textAlign: "center",
      },
      b: {
        textTransform: "uppercase",
        fontFamily: 'title',
      },
      strong: {
        fontWeight: "bolder",
        textShadow: "1px 1px 0 black",
      },
      a: {
        color: "darkblue",
        hover: {
          color: "royalblue",
        }
      },
      button: {
        textTransform: "uppercase",
        fontFamily: 'title',
        borderRadius: "1em",
        borderWidth: "0.5px",
        borderColor: "#333",
        backgroundColor: "#eee",
        boxShadow: "none",
        padding: "0.25em 3%",
        width: "fit-content",
        height: "2em",
        minWidth: "2em",
        margin: "0.25em 0.5em",
        "*": {
          height: "1em",
          pointerEvents: "none",
        },
        hover: {
          boxShadow: "1px 1px 0 black !important",
        },
        active: {
          boxShadow: "1px 1px 0 black inset !important",
        },
      }
    };

    const header = {
      display: "flex",
      flexDirection: "column",
      placeItems: "center",
      maxWidth: TEXT_WIDTH,
      marginBottom: "1em",
      h1: {
        content: this._stage.as(stage => stage === STAGE_DONE, {
          true: TEXT.PAGE_TITLE_DONE[LANG](NAME),
          false: TEXT.PAGE_TITLE[LANG],
        }),
      },
      section: {
        model: HIDE_MODEL(this._stage, stage => stage === STAGE_INTRO),
        p: TEXT.PAGE_DESCRIPTION[LANG],
      }
    };

    const main = {
      position: "relative",
      width: WIDTH.as(v => v + "px"),
      minWidth: "24em",
      ul: {
        id: "mainContent",
        display: "flex",
        flexWrap: "wrap",
        placeContent: "center",
        li: this.cards.map((card, i) => new Object({
          width: "8em",
          zIndex: this._stage.as(stage =>
            stage === STAGE_DONE ?
            4 - this.orderedCards.indexOf(card) :
            4 - i
          ),
          transition: "0.5s",
          style: this._stage.as(
            stage => stage >= card.appearStage, {
              position: "absolute",
              pointerEvents: "none",
              opacity: 0,
            }, {
              position: "relative",
              pointerEvents: "initial",
              opacity: 1,
            }),
          marginLeft: this._stage.as(stage => {
            if (!i) return 0;
            if (!stage) return "1em";
            if (stage < 4) return `${-0.3 * stage}em`;
            return "-8em";
          }),
          marginTop: this._stage.as(stage => {
            if (stage === STAGE_INTRO || stage === STAGE_DONE) return 0;
            return 1.25 * Math.abs(i - stage / 2) + "em";
          }),
          transform: this._stage.as(stage => {
            let ang = stage ? 5 : 0;
            if (stage < 4) ang = -ang * stage + i * 2 * ang;
            else {
              ang = 20;
              let n = 4 - this.orderedCards.indexOf(card);
              ang = -4 * ang + n * ang;
            }
            return `rotate(${ang}deg)`;
          }),
          header: {
            margin: "0.5em auto 0",
            model: HIDE_MODEL(this._stage, stage => stage === card.hintStage),
            textAlign: "center",
            p: TEXT.CARD_HINTS.map(H => H[LANG])[i],
          },
          main: card,
          footer: {
            visibility: this._stage.as(stage => stage < 4, {
              false: "hidden",
              true: "visible",
            }),
            //label: TEXT.YOUR[LANG],
            h2: {
              textTransform: "Capitalize",
              fontSize: "1.25em",
              color: card.suit.color,
              text: TEXT[card.suit.trait][LANG]
            },
          },
        })),
      },
    }

    const instructions = {
      margin: "0 auto",
      width: "fit-content",
      maxWidth: TEXT_WIDTH,
      model: HIDE_MODEL(this._stage, stage => stage !== STAGE_INTRO),
      section: [{
        // shows points you have left
        marginTop: "1em",
        model: HIDE_MODEL(this._stage, stage => [STAGE_START, STAGE_WISDOM].includes(stage)),
        h2: {
          color: this.wealth.suit.color,
          fontSize: "2em",
          text: this.wealth._number.as(number => number - 2),
        },
        h3: {
          fontSize: "1em",
          color: this.wealth.suit.color,
          fontFamily: "body",
          text: TEXT.POINTS_LEFT[LANG],
        },
      }, {
        //additional instructions
        marginTop: "0.5em",
        model: HIDE_MODEL(this._stage, stage => [STAGE_START, STAGE_WEALTH, STAGE_WEALTH].includes(stage)),
        p: {
          content: this._stage.as(stage => stage === STAGE_WEALTH, {
            true: TEXT.WHEN_DONE[LANG],
            false: TEXT.WHEN_READY[LANG],
          }),
        },
      }, {
        // warnings/errors
        color: "crimson",
        marginTop: "0.5em",
        model: HIDE_MODEL(this._topCards, topCards => this.stage === STAGE_WEALTH && topCards.length > 1),
        text: this._topCards.as(topCards => TEXT.TIE[LANG](topCards.map(c => TEXT[c.suit.trait][LANG]))),
      }, {
        // shows results
        model: HIDE_MODEL(this._stage, stage => stage === STAGE_DONE),
        content: this._stage.as(v => {
          if (v < 4) return;
          let suits = this.orderedCards.map(c => Object.assign({
            pct: Math.abs(100 * (c.number - 2) / 8),
          }, c.suit));
          return {
            p: TEXT.DESCRIPTION[LANG](suits[0], NAME),
            ul: {
              marginTop: "1em",
              li: suits.map(suit => this.getPct(suit, root))
            },
          }
        })
      }]
    }

    const controls = {
      overflow: "hidden",
      width: "100%",
      button: {
        fontSize: "1.3em",
        transition: "0.5s",
        style: this._topCards.as(
          topCards => ([STAGE_START, STAGE_WISDOM].includes(this.stage) &&
            this.wealth.number > 2) ||
          (this.stage === STAGE_WEALTH && topCards.length > 1),
          BUTTON_STYLE.ENABLED(),
          BUTTON_STYLE.DISABLED,
        ),
        label: {
          text: this._stage.as(
            TEXT.BEGIN[LANG],
            TEXT.NEXT[LANG] + " ⮕",
            TEXT.NEXT[LANG] + " ⮕",
            TEXT.DONE[LANG],
            NAME ? TEXT.FIND_YOURS[LANG] : TEXT.RESTART[LANG],
          ),
        },
        click: e => {
          if (this.stage == STAGE_DONE && NAME)
            return window.location.href = MY_URL;
          this.nextStage();
        },
      }
    };

    let _canShare = new Binder(false);
    const sharing = {
      margin: "1em 0",
      model: HIDE_MODEL(this._stage, stage => stage === STAGE_DONE && !NAME),
      h6: TEXT.SHARE_HAND[LANG],
      form: {
        marginTop: "0.5em",
        label: {
          textTransform: "capitalize",
          text: `${TEXT.name[LANG]}: `,
        },
        input: {
          width: "8em",
          oninput: e => {
            _canShare.value = e.target.value.length > 2;
            this.updateShare(e.target.value);
          },
        },
        button: {
          ready: elt => !navigator.share ? elt.set("none", "display") : null,
          style: _canShare.as({
            true: BUTTON_STYLE.ENABLED(),
            false: BUTTON_STYLE.DISABLED,
          }),
          text: TEXT.share[LANG],
          click: e => {
            this.storeData();
            if (navigator.share) {
              navigator.share({
                title: TEXT.PAGE_TITLE[LANG],
                text: TEXT.SHARE_MESSAGE[LANG],
                url: this._shareURL.value,
              }).then(() => {
                e.target.set("none", "display");
              }).catch(console.error);
            }
          },
        }
      },
      menu: {
        marginTop: "0.5em",
        a: {
          margin: "0 1em",
          target: "_blank",
          click: e => this.storeData(),
          content: [{
            text: "Facebook➚",
            href: this._shareURL.as(url => `https://www.facebook.com/sharer.php?u=${url}`),
          }, {
            text: "Twitter➚",
            href: this._shareURL.as(url => `https://twitter.com/intent/tweet?url=${url}` + `&text=${TEXT.SHARE_MESSAGE[LANG]}&hashtags=lenino,leninosjackrabbits,jackrabbits,boardgames,personalitytypes`),
          }, {
            text: "LinkedIn➚",
            href: this._shareURL.as(url => `https://www.linkedin.com/sharing/share-offsite/&url=${url}&title=${TEXT.PAGE_TITLE[LANG]}&summary=${TEXT.SHARE_MESSAGE[LANG]}`),
          }]
        }
      }
    };

    this.set({
      id: "suitYourself",
      css: css,
      display: "flex",
      flexDirection: "column",
      placeItems: "center",
      padding: "1em 1em 3em",
      position: "relative",
      border: "1px solid black",
      backgroundColor: "rgba(240,255,240,0.4)",
      header: header,
      main: main,
      footer: {
        section: [instructions, sharing, controls],
      }
    });
  }

  nextStage() {
    this.stage = (STAGES.indexOf(this.stage) + 1) % STAGES.length;
    if (this.stage === STAGE_DONE) {
      this.cards.forEach(c => c.enabled = false);
      window.location.href = '#suitYourself';
    }
    this.updateCount();
  }

  updateCount() {
    let sum = this.cards.reduce((o, c) => o + (c === this.wealth ? 0 : c.number), 0);
    this.wealth.number = Card.MAX + 3 * Card.MIN - sum;
    this.cards.forEach(c => c.canAdd = this.wealth.number > Card.MIN);
    let top = this.cards.reduce((o, c) => c.number > o ? c.number : o, 0);
    this.topCards = this.cards.filter(c => c.number >= top);
    this.orderedCards = [...this.cards].sort((a, b) => b.number - a.number);
  }

  storeData() {
    console.log("Store date for the future:", nameInput.value, this.strength.number, this.charm.number, this.wisdom.number);
  }

  get stage() {
    return this._stage.value;
  }

  set stage(v) {
    this._stage.value = v;
    if (v === STAGE_INTRO) {
      this.cards.forEach((c, i) => {
        c.enabled = false;
        c.number = Card.MIN;
      });
      this.wealth.number = Card.MAX;
    } else if (v === STAGE_START) {
      this.cards.forEach((c, i) => {
        c.enabled = true;
        c.number = Card.MIN;
      });
      this.wealth.enabled = false;
      this.wealth.number = Card.MAX;
    } else if (v === STAGE_DONE) {
      this.updateShare();
    }
  }

  updateShare(name) {
    let url = MY_URL + `/?lang=${LANG}&jksyhand=${this.strength.number},${this.charm.number},${this.wisdom.number}`
    if (name) url += `&jksyname=${name}`;
    this._shareURL.value = url;
  }

  get topCards() {
    return this._topCards.value;
  }

  set topCards(v) {
    this._topCards.value = v;
  }

  getPct(suit, root) {
    if (!suit.pct) return;
    return {
      img: {
        verticalAlign: "middle",
        height: "1em",
        src: root + suit.image
      },
      strong: {
        fontFamily: "title",
        textAlign: "left",
        display: "inline-block",
        width: "3em",
        color: suit.color,
        text: suit.pct + "%",
      }
    }
  }

}

customElements.define("suit-yourself", SuitYourself);

export default SuitYourself;
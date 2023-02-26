import Card from "./Card.js";
import TEXT from "./TEXT.js";

class SuitYourself extends HTMLElement {

  constructor(root = "") {
    super();

    this.strength = new Card({
      suit: Card.SUIT.S,
      callback: () => this.updateCount(),
      root: root,
    });
    this.charm = new Card({
      callback: () => this.updateCount(),
      suit: Card.SUIT.H,
      root: root,
    });
    this.wisdom = new Card({
      callback: () => this.updateCount(),
      suit: Card.SUIT.C,
      root: root,
    });
    this.wealth = new Card({
      root: root,
      number: 10,
    });
    this.cards = [this.strength, this.charm, this.wisdom, this.wealth];

    this.strength.hintStage = 1;
    this.charm.hintStage = 1;
    this.wisdom.hintStage = 2;
    this.wealth.hintStage = 3;
    this.strength.appearStage = 0;
    this.charm.appearStage = 0;
    this.wisdom.appearStage = 2;
    this.wealth.appearStage = 3;

    this._orderedCards = new Binder([]);
    this._topCard = new Binder([]);
    this._stage = new Binder(0);

    this.width = new Binder(window.innerWidth);
    window.addEventListener("resize", () => {
      this.width.value = window.innerWidth;
    });

    const TEXT_WIDTH = "28em";

    let css = {
      "*": {
        margin: 0,
      },
      h: {
        textShadow: "1px 1px 0 black",
        fontFamily: 'title',
        color: "darkgreen",
      },
      p: {
        textIndent: 0,
        textAlign: "center",
      },
      b: {
        textShadow: "1px 1px 0 black",
        fontFamily: 'title',
      },
      a: {
        color: "darkblue",
        hover: {
          color: "royalblue",
        }
      },
      button: {
        borderRadius: "1em",
        boxShadow: "none",
        padding: "0.25em 3%",
        width: "fit-content",
        height: "2em",
        minWidth: "2em",
        margin: "0.1em",
        "*": {
          height: "1em",
          pointerEvents: "none",
        },
        hover: {
          boxShadow: "1px 1px 0 black",
        },
        active: {
          boxShadow: "none",
        }
      }
    };

    let header = {
      display: "flex",
      flexDirection: "column",
      placeItems: "center",
      maxWidth: TEXT_WIDTH,
      h1: {
        text: this._stage.as(v => v < 4,
          TEXT.PAGE_TITLE_DONE[LANG],
          TEXT.PAGE_TITLE[LANG],
        ),
      },
      p: {
        display: this._stage.as(v => v < 4,
          "none",
          "block",
        ),
        text: TEXT.PAGE_SUBTITLE[LANG],
      }
    };

    let main = {
      position: "relative",
      minWidth: "33em",
      ul: {
        id: "mainContent",
        display: "flex",
        flexWrap: "wrap",
        placeContent: "center",
        li: this.cards.map((card, i) => new Object({
          width: "11em",
          transition: "0.5s",
          zIndex: this._orderedCards.as(v => 4 - v.indexOf(card)),
          style: this._stage.as(v => v >= card.appearStage, {
            position: "absolute",
            pointerEvents: "none",
            opacity: 0,
          }, {
            position: "relative",
            pointerEvents: "initial",
            opacity: 1,
          }),
          marginLeft: this._stage.as(v => {
            if (!i) return 0;
            if (!v) return "1em";
            if (v < 4) return `${-0.1 * v}em`;
            return "-11em";
          }),
          marginTop: this._stage.as(v => {
            if (!v || v > 3) return 0;
            return 1.25 * Math.abs(i - v / 2) + "em";
          }),
          transform: this._stage.as(v => {
            let ang = v ? 5 : 0;
            if (v < 4) ang = -ang * v + i * 2 * ang;
            else {
              ang = 20;
              let n = 4 - this.orderedCards.indexOf(card);
              ang = -4 * ang + n * ang;
            }
            return `rotate(${ang}deg)`;
          }),
          header: {
            margin: "0.5em auto 0",
            width: "9em",
            opacity: this._stage.as(v => v === card.hintStage,
              0,
              1,
            ),
            textAlign: "center",
            p: TEXT.CARD_HINTS.map(H => H[LANG])[i]
          },
          main: card,
          footer: {
            visibility: this._stage.as(v => v < 4,
              "hidden",
              "visible",
            ),
            label: TEXT.YOUR[LANG],
            b: {
              fontSize: "1.5em",
              color: card.suit.color,
              text: TEXT[card.suit.trait][LANG]
            },
          },
        })),
      },
    }

    let aside = {
      margin: "0 auto",
      width: "fit-content",
      maxWidth: TEXT_WIDTH,
      transition: "0.5s",
      opacity: this._stage.as(v => !!v,
        0,
        1,
      ),
      section: [{
        // shows points you have left
        marginTop: "1em",
        display: this._stage.as(v => v < 3,
          "none",
          "block",
        ),
        b: {
          fontSize: "2em",
          color: this.wealth.suit.color,
          text: this.wealth._number.as(v => v - 2)
        },
        img: {
          marginLeft: "0.1em",
          height: "1.5em",
          src: root + Card.SUIT.D.image,
        },
        p: TEXT.POINTS_LEFT[LANG],
      }, {
        // shows warnings/errors
        color: "crimson",
        marginTop: "1em",
        display: this._topCard.as(
          v => v.length > 1 && this.stage === 3,
          "none",
          "inherit",
        ),
        text: this._topCard.as(vs => TEXT.TIE[LANG](vs.map(c => TEXT[c.suit.trait][LANG]))),
      }, {
        // shows results
        display: this._stage.as(v => v > 3,
          "none",
          "block",
        ),
        content: this._stage.as(v => {
          if (v < 4) return;
          let suits = this.orderedCards.map(c => Object.assign({
            pct: Math.abs(100 * (c.number - 2) / 8),
          }, c.suit));
          return {
            p: TEXT.DESCRIPTION[LANG](suits[0]),
            ul: {
              marginTop: "1em",
              li: suits.map(s => this.getPct(s, root))
            },
          }
        })
      }]
    }

    let footer = {
      position: "absolute",
      bottom: "1.5em",
      width: "100%",
      margin: "0 auto",
      button: {
        fontSize: "1.3em",
        label: {
          text: this._stage.as(
            TEXT.BEGIN[LANG],
            TEXT.NEXT[LANG] + " ⮕",
            TEXT.NEXT[LANG] + " ⮕",
            TEXT.DONE[LANG],
            TEXT.RESTART[LANG],
          ),
        },
        click: e => this.nextStage(),
      },
    };

    this.set({
      id: "suitYourself",
      css: css,
      display: "flex",
      flexDirection: "column",
      placeItems: "center",
      padding: "1em 1em 5em",
      position: "relative",
      minHeight: "40em",
      border: "1px solid black",
      backgroundColor: "rgba(240,255,240,0.4)",
      header: header,
      main: main,
      aside: aside,
      footer: footer,
    });

    this.updateCount();
  }

  nextStage() {
    if (this.stage === 3 && this.topCard.length == 1) {
      this.cards.forEach(c => c.enabled = false);
      window.location.href = '#suitYourself';
    }
    this.stage = (this.stage + 1) % 5;
    this.updateCount();
  }

  updateCount() {
    let sum = this.cards.reduce((o, c) => o + (c === this.wealth ? 0 : c.number), 0);
    this.wealth.number = Card.MAX + 3 * Card.MIN - sum;
    this.cards.forEach(c => c.canAdd = this.wealth.number > Card.MIN);
    let top = this.cards.reduce((o, c) => c.number > o ? c.number : o, 0);
    this.topCard = this.cards.filter(c => c.number >= top);
    this.orderedCards = [...this.cards].sort((a, b) => b.number - a.number);
  }

  get stage() {
    return this._stage.value;
  }

  set stage(v) {
    this._stage.value = v;
    if (!v) {
      this.cards.forEach((c, i) => {
        c.enabled = false;
        c.number = Card.MIN;
      });
      this.wealth.number = Card.MAX;
    } else if (v === 1) {
      this.cards.forEach((c, i) => {
        c.enabled = true;
        c.number = Card.MIN;
      });
      this.wealth.enabled = false;
      this.wealth.number = Card.MAX;
    }
  }

  get orderedCards() {
    return this._orderedCards.value;
  }

  set orderedCards(v) {
    this._orderedCards.value = v;
  }

  get topCard() {
    return this._topCard.value;
  }

  set topCard(v) {
    this._topCard.value = v;
  }

  getPct(suit, root) {
    if (!suit.pct) return;
    return {
      img: {
        verticalAlign: "middle",
        height: "1em",
        src: root + suit.image
      },
      b: {
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
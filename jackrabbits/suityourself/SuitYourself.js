import Card from "./Card.js";
import TEXT from "./TEXT.js";

class SuitYourself {

  constructor(root = "") {
    this.wealth = new Card(10, Card.SUIT.D, () => null, root);
    this.wealth.enabled = false;
    this.cards = [
      new Card(2, Card.SUIT.S, this.updateCount, root),
      new Card(2, Card.SUIT.H, this.updateCount, root),
      new Card(2, Card.SUIT.C, this.updateCount, root),
      this.wealth,
    ];

    this._orderedCards = new Binder([]);
    this._topCard = new Binder([]);
    this._stage = new Binder(1);
    this.updateCount();

    this.width = new Binder(window.innerWidth);
    window.addEventListener("resize", () => {
      this.width.value = window.innerWidth;
    });

    this.element = DOM.element({
      css: {
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
          backgroundColor: "silver",
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
      },
      paddingBottom: "5em",
      position: "relative",
      minHeight: "42em",
      border: "1px solid black",
      backgroundColor: "rgba(240,255,240,0.4)",
      header: {
        marginBottom: "1em",
        h1: {
          text: this._stage.bind(v => v < 4 ? TEXT.PAGE_TITLE[LANG] : TEXT.PAGE_TITLE_DONE[LANG]),
        },
        p: {
          text: this._stage.bind(v => v < 4 ? TEXT.PAGE_SUBTITLE[LANG] : TEXT.PAGE_SUBTITLE_DONE[LANG]),
        },
      },
      main: {
        marginBottom: "2em",
        position: "relative",
        ul: {
          id: "mainContent",
          display: "flex",
          flexWrap: "wrap",
          minWidth: "22em",
          margin: "0 -2em",
          placeContent: "center",
          li: this.cards.map((c, i) => new Object({
            position: this._stage.bind(v => i <= v ? "relative" : "absolute"),
            zIndex: this._orderedCards.bind(v => 4 - v.indexOf(c)),
            pointerEvents: this._stage.bind(v => i <= v ? "initial" : "none"),
            maxWidth: this._stage.bind(v => i <= v ? "100em" : "3%"),
            opacity: this._stage.bind(v => i <= v ? 1 : 0),
            margin: "0.5em 0",
            marginLeft: this._stage.bind(v => !i || v < 4 ? `${-0.1 * v}em` : "-11em"),
            marginTop: this._stage.bind(v => {
              if (v > 3) return "1em";
              let d = 1.25 * Math.abs(i - v / 2);
              return `${d}em`;
            }),
            transform: this._stage.bind(v => {
              let ang = 5;
              if (v < 4) return `rotate(${-ang * v + i * 2 * ang}deg)`;
              ang = 20;
              let n = 4 - this._orderedCards.value.indexOf(c);
              return `rotate(${-4 * ang + n * ang}deg)`;
            }),
            transition: "0.5s",
            header: {
              visibility: this._stage.bind(v => v < 4 ? "visible" : "hidden"),
              label: TEXT.YOUR[LANG],
              b: {
                fontSize: "1.5em",
                color: c.suit.color,
                text: TEXT[c.suit.trait][LANG]
              },
            },
            main: c.element,
            footer: {
              visibility: this._stage.bind(v => v < 4 ? "visible" : "hidden"),
              margin: "0.5em auto 0",
              width: "9em",
              textAlign: "center",
              p: TEXT.CARD_HINTS.map(H => H[LANG])[i]
            },
          })),
        },
        section: {
          margin: "0 auto",
          width: "fit-content",
          p: [{
            marginTop: "1em",
            display: this._stage.bind(v => v < 3 ? "block" : "none"),
            b: {
              fontSize: "2em",
              color: this.wealth.suit.color,
              text: this.wealth._number.bind(v => v - 2)
            },
            img: {
              marginLeft: "0.1em",
              height: "1.5em",
              src: root + Card.SUIT.D.image,
            },
            label: TEXT.POINTS_LEFT[LANG],
          }, {
            color: "crimson",
            maxWidth: "22em",
            marginTop: "1em",
            display: this._topCard.bind(v => v.length > 1 && this._stage.value >= 3 ? "inherit" : "none"),
            text: this._topCard.bind(vs => TEXT.TIE[LANG] + vs.map((v, i) => (i == vs.length - 1 ? " " + TEXT.AND[LANG] + " " : i > 0 ? ", " : "") + TEXT[v.suit.trait][LANG]).join("")),
          }],
          div: {
            display: this._stage.bind(v => v > 3 ? "block" : "none"),
            margin: "-3em auto",
            maxWidth: "30em",
            content: this._stage.bind(v => {
              if (v < 4) return;
              let suits = this._orderedCards.value.map(c => Object.assign({
                pct: Math.abs(100 * (c.number - 2) / 8),
              }, c.suit));
              return {
                p: TEXT.DESCRIPTION[LANG](suits[0]),
                ul: {
                  display: "flex",
                  justifyContent: "space-evenly",
                  margin: "0.5em 5em",
                  li: suits.map(s => this.getPct(s, root))
                },
              }
            })
          }
        },
      },
      footer: {
        position: "absolute",
        bottom: "1.5em",
        width: "100%",
        margin: "0 auto",
        button: {
          fontSize: "1.3em",
          label: {
            text: this._stage.bind(v => v < 3 ? TEXT.NEXT[LANG] :
              v === 3 ? TEXT.DONE[LANG] : TEXT.RESTART[LANG])
          },
          span: {
            color: this._stage.bind(v => v < 2 ? "teal" : "inherit"),
            display: this._stage.bind(v => v < 3 ? "inherit" : "none"),
            text: " ⮕",
          },
          click: this.nextStage,
        },
      },
    });
  }

  nextStage(e) {
    if (this._stage.value < 3) {
      this._stage.value += 1;
    } else if (this._stage.value > 3) {
      this._stage.value = 1;
      this.cards.forEach((c, i) => {
        if (i < 3) {
          c.enabled = true;
          c.number = Card.MIN;
        } else {
          c.number = Card.MAX;
        }
      });
      this.updateCount();
    } else if (this._stage.value === 3 && this._topCard.value.length == 1) {
      this.cards.forEach(c => c.enabled = false);
      this._stage.value += 1;
    } else {
      this.updateCount();
    }
  }

  updateCount(card) {
    let sum = this.cards.reduce((o, c) => o + (c === this.wealth ? 0 : c.number), 0);
    this.wealth.number = 16 - sum;
    this.cards.forEach(c => c.canAdd = this.wealth.number > 2);
    let top = this.cards.reduce((o, c) => c.number > o ? c.number : o, 0);
    this._topCard.value = this.cards.filter(c => c.number >= top);
    this._orderedCards.value = [...this.cards].sort((a, b) => b.number - a.number);
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

export default SuitYourself;
const THIS_URL = window.location.href.split('?')[0];
const BG_COLOR = '#eee';
const QS = DOM.querystring();
const LANG = QS.lang ? QS.lang.toUpperCase() : "ENG";

let wealth = new Card(10, Card.SUIT.D);
wealth.enabled = false;

let width = new Binder(window.innerWidth);
window.addEventListener("resize", () => {
  width.value = window.innerWidth;
});

const topCard = new Binder([]);

let cards = [
  new Card(2, Card.SUIT.S, updateCount),
  new Card(2, Card.SUIT.H, updateCount),
  new Card(2, Card.SUIT.C, updateCount),
  wealth,
];
const orderedCards = new Binder([]);

const stage = new Binder(1);

const GET_SUITED_MODEL = {
  css: {
    h: {
      textShadow: "1px 1px 0 black",
      fontFamily: 'title',
      color: "darkgreen",
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
      backgroundColor: BG_COLOR,
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
  position: "relative",
  minHeight: "38em",
  header: {
    marginBottom: "1em",
    h1: {
      text: stage.bind(v => v < 4 ? TEXT.PAGE_TITLE[LANG] : TEXT.PAGE_TITLE_DONE[LANG]),
    },
    p: {
      visibility: stage.bind(v => v < 4 ? "visible" : "hidden"),
      text: TEXT.PAGE_SUBTITLE[LANG],
    },
  },
  main: {
    marginBottom: "2em",
    position: "relative",
    ul: {
      id: "mainContent",
      display: "flex",
      flexWrap: "wrap",
      placeContent: "center",
      li: cards.map((c, i) => new Object({
        position: stage.bind(v => i <= v ? "relative" : "absolute"),
        zIndex: orderedCards.bind(v => 4 - v.indexOf(c)),
        pointerEvents: stage.bind(v => i <= v ? "initial" : "none"),
        maxWidth: stage.bind(v => i <= v ? "100em" : "3%"),
        opacity: stage.bind(v => i <= v ? 1 : 0),
        margin: "0.5em 0",
        marginLeft: stage.bind(v => !i || v < 4 ? 0 : "-11em"),
        marginTop: stage.bind(v => {
          if (v > 3) return "1em";
          let d = 1.25 * Math.abs(i - v / 2);
          return `${d}em`;
        }),
        transform: stage.bind(v => {
          let ang = 5;
          if (v < 4) return `rotate(${-ang * v + i * 2 * ang}deg)`;
          ang = 20;
          let n = 4 - orderedCards.value.indexOf(c);
          return `rotate(${-4 * ang + n * ang}deg)`;
        }),
        transition: "0.5s",
        header: {
          visibility: stage.bind(v => v < 4 ? "visible" : "hidden"),
          label: TEXT.YOUR[LANG],
          b: {
            fontSize: "1.5em",
            color: c.suit.color,
            text: SUIT[c.suit.trait][LANG]
          },
        },
        main: c.element,
        footer: {
          visibility: stage.bind(v => v < 4 ? "visible" : "hidden"),
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
        display: stage.bind(v => v < 3 ? "block" : "none"),
        b: {
          fontSize: "2em",
          color: wealth.suit.color,
          text: wealth._number.bind(v => v - 2)
        },
        img: {
          marginLeft: "0.1em",
          height: "1.5em",
          src: Card.SUIT.D.image,
        },
        label: TEXT.POINTS_LEFT[LANG],
      }, {
        color: "crimson",
        maxWidth: "22em",
        marginTop: "1em",
        display: topCard.bind(v => v.length > 1 && stage.value >= 3 ? "inherit" : "none"),
        text: topCard.bind(vs => TEXT.TIE[LANG] + vs.map((v, i) => (i == vs.length - 1 ? " " + TEXT.AND[LANG] + " " : i > 0 ? ", " : "") + SUIT[v.suit.trait][LANG]).join("")),
      }],
      div: {
        display: stage.bind(v => v > 3 ? "block" : "none"),
        margin: "0 auto",
        maxWidth: "30em",
        content: stage.bind(v => {
          if (v < 4) return;
          let suits = orderedCards.value.map(c => Object.assign({
            pct: Math.abs(100 * (c.number - 2) / 8),
          }, c.suit));
          return {
            p: TEXT.DESCRIPTION[LANG](suits[0]),
            ul: {
              display: "flex",
              justifyContent: "space-evenly",
              margin: "0.5em 5em",
              li: suits.map(s => getPct(s))
            },
          }
        })
      }
    },
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    margin: "0 auto",
    button: {
      fontSize: "1.3em",
      label: {
        text: stage.bind(v => v < 3 ? TEXT.NEXT[LANG] :
          v === 3 ? TEXT.DONE[LANG] : TEXT.RESTART[LANG])
      },
      span: {
        color: stage.bind(v => v < 2 ? "teal" : "inherit"),
        display: stage.bind(v => v < 3 ? "inherit" : "none"),
        text: " ⮕",
      },
      click: nextStage,
    },
  },
};

function updateCount(card) {
  let sum = cards.reduce((o, c) => o + (c === wealth ? 0 : c.number), 0);
  wealth.number = 16 - sum;
  cards.forEach(c => c.canAdd = wealth.number > 2);
  let top = cards.reduce((o, c) => c.number > o ? c.number : o, 0);
  topCard.value = cards.filter(c => c.number >= top);
  orderedCards.value = [...cards].sort((a, b) => b.number - a.number);
}
updateCount();

function nextStage(e) {
  if (stage.value < 3) {
    stage.value += 1;
  } else if (stage.value > 3) {
    stage.value = 1;
    cards.forEach((c, i) => {
      if (i < 3) {
        c.enabled = true;
        c.number = Card.MIN;
      } else {
        c.number = Card.MAX;
      }
    });
    updateCount();
  } else if (stage.value === 3 && topCard.value.length == 1) {
    cards.forEach(c => c.enabled = false);
    stage.value += 1;
  } else {
    updateCount();
  }
  setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100);
}
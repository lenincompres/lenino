const THIS_URL = window.location.href.split('?')[0];
const BG_COLOR = '#eee';
const QS = DOM.querystring();
const LANG = QS.lang ? QS.lang.toUpperCase() : "ENG";


let width = new Binder(window.innerWidth);
window.addEventListener("resize", () => {
  width.value = window.innerWidth;
});

const topCard = new Binder([]);

let wealth = {};
wealth.enabled = false;
let cards = [];
const orderedCards = new Binder([]);

const stage = new Binder(1);

const GET_SUITED_MODEL = (root = "") => {
  wealth = new Card(10, Card.SUIT.D, () => null, root);
  wealth.enabled = false;
  cards = [
    new Card(2, Card.SUIT.S, updateCount, root),
    new Card(2, Card.SUIT.H, updateCount, root),
    new Card(2, Card.SUIT.C, updateCount, root),
    wealth,
  ];
  return {
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
    paddingBottom: "5em",
    position: "relative",
    minHeight: "42em",
    border: "1px solid black",
    backgroundColor: "rgba(240,255,240,0.4)",
    header: {
      marginBottom: "1em",
      h1: {
        text: stage.bind(v => v < 4 ? GET_SUITED_TEXT.PAGE_TITLE[LANG] : GET_SUITED_TEXT.PAGE_TITLE_DONE[LANG]),
      },
      p: {
        text: stage.bind(v => v < 4 ? GET_SUITED_TEXT.PAGE_SUBTITLE[LANG] : GET_SUITED_TEXT.PAGE_SUBTITLE_DONE[LANG]),
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
        li: cards.map((c, i) => new Object({
          position: stage.bind(v => i <= v ? "relative" : "absolute"),
          zIndex: orderedCards.bind(v => 4 - v.indexOf(c)),
          pointerEvents: stage.bind(v => i <= v ? "initial" : "none"),
          maxWidth: stage.bind(v => i <= v ? "100em" : "3%"),
          opacity: stage.bind(v => i <= v ? 1 : 0),
          margin: "0.5em 0",
          marginLeft: stage.bind(v => !i || v < 4 ? `${-0.1 * v}em` : "-11em"),
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
            label: GET_SUITED_TEXT.YOUR[LANG],
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
            p: GET_SUITED_TEXT.CARD_HINTS.map(H => H[LANG])[i]
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
            src: root + Card.SUIT.D.image,
          },
          label: GET_SUITED_TEXT.POINTS_LEFT[LANG],
        }, {
          color: "crimson",
          maxWidth: "22em",
          marginTop: "1em",
          display: topCard.bind(v => v.length > 1 && stage.value >= 3 ? "inherit" : "none"),
          text: topCard.bind(vs => GET_SUITED_TEXT.TIE[LANG] + vs.map((v, i) => (i == vs.length - 1 ? " " + GET_SUITED_TEXT.AND[LANG] + " " : i > 0 ? ", " : "") + SUIT[v.suit.trait][LANG]).join("")),
        }],
        div: {
          display: stage.bind(v => v > 3 ? "block" : "none"),
          margin: "-3em auto",
          maxWidth: "30em",
          content: stage.bind(v => {
            if (v < 4) return;
            let suits = orderedCards.value.map(c => Object.assign({
              pct: Math.abs(100 * (c.number - 2) / 8),
            }, c.suit));
            return {
              p: GET_SUITED_TEXT.DESCRIPTION[LANG](suits[0]),
              ul: {
                display: "flex",
                justifyContent: "space-evenly",
                margin: "0.5em 5em",
                li: suits.map(s => getPct(s, root))
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
          text: stage.bind(v => v < 3 ? GET_SUITED_TEXT.NEXT[LANG] :
            v === 3 ? GET_SUITED_TEXT.DONE[LANG] : GET_SUITED_TEXT.RESTART[LANG])
        },
        span: {
          color: stage.bind(v => v < 2 ? "teal" : "inherit"),
          display: stage.bind(v => v < 3 ? "inherit" : "none"),
          text: " ⮕",
        },
        click: nextStage,
      },
    },
  }
};

function getPct(suit, root){
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
}
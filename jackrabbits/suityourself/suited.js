const THIS_URL = window.location.href.split('?')[0];
const BG_COLOR = '#eee';
const QS = DOM.querystring();
const LANG = QS.lang ? QS.lang.toUpperCase() : "ENG";

let wealth = new card(10, SUIT_D);
wealth.enabled = false;

let width = new Binder(window.innerWidth);
window.addEventListener("resize", () => {
  width.value = window.innerWidth;
});

const topCard = new Binder([]);

const MAIN_MENU = {
  width: "100%",
  margin: "0 auto 2.5em",
  maxWidth: "30em",
  height: "1em",
  ul: {
    display: "flex",
    placeContent: "space-around",
    li: {
      content: [{
        display: LANG !== "ENG" ? "block" : "none",
        a: {
          text: "English",
          href: THIS_URL,
        }
      }, {
        display: LANG !== "ESP" ? "block" : "none",
        a: {
          text: "Español",
          href: THIS_URL + "?lang=esp",
        }
      }, {
        a: {
          text: TEXT.GET_JK[LANG],
          href: "http://jackrabbits.lenino.net",
        }
      }, {
        a: {
          text: "Lenino.net",
          href: "http://lenino.net",
          img: {
            verticalAlign: "top",
            height: "2em",
            src: "../../assets/leninoLogo.png",
            alt: "Lenino.net"
          },
        }
      }]
    }
  }
};

let cards = [
  new card(2, SUIT_S, updateCount),
  new card(2, SUIT_H, updateCount),
  new card(2, SUIT_C, updateCount),
  wealth,
];

const stage = new Binder(1);

DOM.style({
  fontFace: [{
    fontFamily: 'title',
    src: '../assets/IrishGrover-Regular.ttf'
  }, {
    fontFamily: 'body',
    src: '../assets/Chalkboard.ttc'
  }],
  html: {
    scrollBehavior: "smooth",
  },
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
    minWidth: "2em",
    margin: "0.1em",
    "*": {
      pointerEvents: "none",
    },
    hover: {
      boxShadow: "1px 1px 0 black",
    },
    active: {
      boxShadow: "none",
    }
  }
})

DOM.set({
  meta: "utf-8",
  title: "Jack Rabbits' Suit Yourself",
  viewport: "width=device-width, minimum-scale=1.0, maximum-scale=1.0",
  icon: "images/icon.png",
  background: "silver",
  textAlign: "center",
  fontFamily: "body",
  backgroundColor: BG_COLOR,
  backgroundImage: 'url(../images/bg.png)',
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  padding: "1em",
  menu: MAIN_MENU,
  container: {
    header: {
      h1: {
        text: stage.bind(v => v < 4 ? TEXT.PAGE_TITLE[LANG] : TEXT.PAGE_TITLE_DONE[LANG]),
      },
      p: {
        display: stage.bind(v => v < 4 ? "block" : "none"),
        text: TEXT.PAGE_SUBTITLE[LANG],
      },
    },
    main: {
      height: "29em",
      marginBottom: "2em",
      ul: {
        id: "mainContent",
        display: "flex",
        flexWrap: "wrap",
        placeContent: "center",
        li: cards.map((c, i) => new Object({
          position: stage.bind(v => i <= v ? "relative" : "absolute"),
          pointerEvents: stage.bind(v => i <= v ? "initial" : "none"),
          maxWidth: stage.bind(v => i <= v ? "100em" : "3%"),
          opacity: stage.bind(v => i <= v ? 1 : 0),
          margin: "0.5em 0",
          //fontSize: width.bind(v => v < 820 ? "0.8em" : "1em"),
          marginTop: stage.bind(v => {
            let d = 1.25 * Math.abs(i - v / 2);
            return `${d}em`
          }),
          transition: "0.5s",
          transform: stage.bind(v => {
            let ang = 5;
            return `rotate(${-ang * v + i * 2 * ang}deg)`
          }),
          header: {
            label: TEXT.YOUR[LANG],
            b: {
              fontSize: "1.5em",
              color: c.suit.color,
              text: SUIT[c.suit.trait][LANG]
            },
          },
          main: c.element,
          footer: {
            margin: "0.5em auto 0",
            width: "9em",
            textAlign: "center",
            p: TEXT.CARD_HINTS.map(H => H[LANG])[i]
          },
        })),
      },
      section: {
        id: "messageSection",
        margin: "0 auto",
        p: {
          display: stage.bind(v => v < 3 ? "block" : "none"),
          b: {
            fontSize: "2em",
            color: wealth.suit.color,
            text: wealth._number.bind(v => v - 2)
          },
          img: {
            marginLeft: "0.1em",
            height: "1.5em",
            src: SUIT_D.image,
          },
          label: TEXT.POINTS_LEFT[LANG],
        }
      },
    },
    footer: {
      bottom: 0,
      width: "100%",
      margin: "0 auto 0.5em",
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
      p: {
        color: "crimson",
        display: topCard.bind(v => v.length > 1 && stage.value >= 3 ? "inherit" : "none"),
        text: topCard.bind(vs => TEXT.TIE[LANG] + vs.map((v, i) => (i == vs.length - 1 ? " " + TEXT.AND[LANG] + " " : i > 0 ? ", " : "") + SUIT[v.suit.trait][LANG]).join("")),
      }
    },
  },
});

function updateCount(card) {
  let sum = cards.reduce((o, c) => o + (c === wealth ? 0 : c.number), 0);
  wealth.number = 16 - sum;
  cards.forEach(c => c.canAdd = wealth.number > 2);
  let top = cards.reduce((o, c) => c.number > o ? c.number : o, 0);
  topCard.value = cards.filter(c => c.number >= top);
}
updateCount();

function nextStage(e) {
  if (stage.value < 3) {
    stage.value += 1;
  } else if (stage.value > 3) {
    window.location.reload();
  } else if (stage.value === 3 && topCard.value.length == 1) {
    cards.sort((a, b) => b.number - a.number);
    let pcts = cards.map(c => Object.assign({
      pct: Math.abs(100 * (c.number - 2) / 8),
    }, c.suit));
    mainContent.set({
      content: "",
      li: {
        margin: "2em 0",
        display: "flex",
        placeContent: "center",
        section: cards.reverse().map((c, i) => {
          let ang = 10;
          c.enabled = false;
          c.element.set({
            transition: "0.5s",
            transform: `rotate(0deg)`,
            marginLeft: i ? "-11em" : 0,
          });
          setTimeout(() => {
            c.element.set({
              transform: `rotate(${-2 * ang + i*ang}deg)`,
              marginLeft: i ? "-9em" : 0,
            });
          }, 10);
          return c.element;
        }),
      },
    });
    messageSection.set({
      content: "",
      maxWidth: "30em",
      content: TEXT.DESCRIPTION[LANG](pcts),
    });
    stage.value += 1;
  } else {
    updateCount();
  }
  setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100);
}
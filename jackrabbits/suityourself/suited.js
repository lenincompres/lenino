const BG_COLOR = '#eee';

let wealth = new card(11, SUIT_D);
wealth.enabled = false;

let cards = [
  new card(1, SUIT_S, updateCount),
  new card(1, SUIT_H, updateCount),
  new card(1, SUIT_C, updateCount),
  wealth,
];

function updateCount(card) {
  let sum = cards.reduce((o, c) => o + (c === wealth ? 0 : c.number), 0);
  wealth.number = 14 - sum;
  cards.forEach(c => c.canAdd = wealth.number > 1);
}
updateCount();

const stage = new Binder(1);

DOM.style({
  fontFace: [{
    fontFamily: 'title',
    src: '../IrishGrover-Regular.ttf'
  }, {
    fontFamily: 'body',
    src: '../Chalkboard.ttc'
  }],
  h: {
    textShadow: "1px 1px 0 black",
    fontFamily: 'title',
    color: "darkgreen",
  },
  b: {
    textShadow: "1px 1px 0 black",
    fontFamily: 'title',
  },
  button: {
    backgroundColor: BG_COLOR,
    borderRadius: "1em",
    boxShadow: "none",
    padding: "0.25em 3%",
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
  header: {
    margin: "1em 0",
    h1: "Suit Yourself",
    p: "Reveal your personality traits according to your natural tendency."
  },
  fontFamily: "body",
  backgroundColor: BG_COLOR,
  backgroundImage: 'url(../images/bg.png)',
  main: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "5em",
    justifyContent: "center",
    section: cards.map((c, i) => new Object({
      position: stage.bind(v => i <= v ? "relative" : "absolute"),
      pointerEvents: stage.bind(v => i <= v ? "initial" : "none"),
      maxWidth: stage.bind(v => i <= v ? "100em" : "3%"),
      opacity: stage.bind(v => i <= v ? 1 : 0),
      margin: "1em -1.5%",
      marginTop: stage.bind(v => {
        let d = 1.5 * Math.abs(i - v / 2);
        return `${d}em`
      }),
      transition: "0.5s",
      transform: stage.bind(v => {
        let ang = 10 / v;
        return `rotate(${-ang * v + i * 2 * ang}deg)`
      }),
      header: {
        label: `This is your `,
        b: {
          fontSize: "1.5em",
          color: c.suit.color,
          text: c.suit.trait
        },
      },
      main: c.element,
      footer: [
        "Increase it at will.",
        "Mind the points left.",
        "Sacrifice other traits.",
        "Bank using the others.",
      ][i],
    })),
  },
  footer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    margin: "1em 0 2em",
    section: {
      display: stage.bind(v => v < 3 ? "block" : "none"),
      p: {
        b: {
          fontSize: "2em",
          color: wealth.suit.color,
          text: wealth._number.bind(v => v - 1)
        },
        img: {
          marginLeft: "0.1em",
          height: "1.5em",
          src: SUIT_D.image,
        },
        label: " left."
      }
    },
    button: {
      fontSize: "1.3em",
      label: {
        text: stage.bind(v => v < 3 ? "Next " :
          "Done")
      },
      span: {
        color: stage.bind(v => stage.value < 2 ? "teal" : "inherit"),
        display: stage.bind(v => stage.value < 3 ? "inherit" : "none"),
        text: "⮕",
      },
      click: e => stage.value < 3 ? stage.value += 1 : null,
    }
  },
});
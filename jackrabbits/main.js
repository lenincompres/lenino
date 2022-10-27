const CARD = (front, back, width = 240, height = 340) => {
  const IMG_STYLE = {
    height: height + 'px',
    width: width + 'px',
    boxShadow: '2px 2px 6px',
    borderRadius: '1em',
    display: 'inline-block',
  };
  return {
    class: "card",
    cursor: 'pointer',
    display: 'inline-block',
    position: 'relative',
    height: height + 'px',
    width: width + 'px',
    div: [{
      class: "front",
      div: {
        style: IMG_STYLE,
        model: front
      }
    }, {
      class: "back",
      div: {
        style: IMG_STYLE,
        model: back
      }
    }],
  }
}

const RANDOM_CARD = () => {
  let [x, y, z] = [0, 0, 0];
  let [w, h] = [240, 340];
  const randomize = () => {
    x = Math.floor(Math.random() * 6);
    y = Math.floor(Math.random() * 3);
    z = Math.floor(Math.random() * 3);
  };
  randomize();
  const opened = new Binder(false);
  let card = CARD({
    backgroundImage: 'url(images/cardBack.png)'
  }, {
    backgroundColor: 'white',
    backgroundImage: opened.bind(val => `url(images/cardFront${z}.png)`),
    backgroundPosition: opened.bind(val => `-${w * x}px -${h * y}px`)
  }, w, h);
  return Object.assign(card, {
    margin: '2px',
    zIndex: opened.bind(val => val ? 0 : 5),
    onclick: e => {
      opened.value = !opened.value;
      if (!opened.value) randomize();
    }
  })
}

DOM.style({
  fontFace: [{
    fontFamily: 'titleFont',
    src: 'url("IrishGrover-Regular.ttf")'
  },{
    fontFamily: 'body',
    src: 'url("markerfeltnormal.ttf")'
  }],
  section: {
    margin: '1em 0'
  },
  h: {
    fontFamily: 'titleFont',
    margin: '1em 0 0 0',
    lineHeight: '1.5em',
  },
  h4: {
    margin: 0
  },
  p: {
    margin: '0 0 1em 0'
  },
  i: {
    fontFamily: 'titleFont',
    fontStyle: 'normal'
  },
  big: {
    fontSize: '1.8em'
  },
  b: {
    textShadow: 'black 1px 1px'
  },
  _wisdom: {
    color: 'teal'
  },
  _courage: {
    color: 'indigo'
  },
  _fortune: {
    color: 'darkgoldenrod'
  },
  _charm: {
    color: 'brown'
  }
});

DOM.set({
  meta: "utf-8",
  title: "Lenino's Jack Rabbits",
  viewport: "width=device-width, minimum-scale=1.0, maximum-scale=1.0",
  icon: "images/icon.png",
  width: '100%',
  height: '100%',
  textAlign: 'center',
  padding: '0px',
  margin: '0px',
  fontFamily: "body",
  backgroundColor: '#EBEBD5',
  backgroundImage: 'url(images/bg.png)',
  fontFamily: 'Calibri, "Myriad Pro", "DejaVu Sans Condensed", Helvetica, Arial, sans-serif',
  main: {
    maxWidth: '500px',
    minWidth: '490px',
    margin: '0 auto',
    padding: '0 0 10px',
    section: [{
      img: {
        src: "images/icon.png"
      },
      h4: [
        "Descubre maravillas mientras viajas",
        "al reino de conejos y barajas.",
      ],
      p: "<b>JACK RABBITS</b> es un juego de mesa retro-ingeniado en base a las cartas de naipes clásicos. Lo caracterizan el manejo de recursos,  la exploración de un tablero distinto en cada partida y los elementos de aventura de fantasía.  El arte y concepto evoca a Alicia en el País de las maravillas,  y la misión es que los conejos mensajeros visiten palacios y consigan cartas reales.  A diferencia de nuestros juegos clásicos,  ofrece fantasía y exploración, en lugar de bancarrota financiera,  asesinato o guerra como tema principal. Tiene diferente niveles de dificultad que lo hacen atractivo para jugadores casuales como para expertos.",
    }, CARD({
      background: 'url(images/splash.png) center center no-repeat',
      backgroundColor: 'lightgoldenrodyellow'
    }, {
      backgroundColor: 'white',
      p: {
        marginTop: '6em',
        text: "El video tutorial viene muy pronto."
      }
    }, 490), {
      /*h2: {
        a: {
          href: "https://lenincompres.github.io/jackRabbitsApp/",
          text: "Virtual Version"
        }
      },
      p: "Lenino is yet to publish the official physical game. In the mean time, you can play online with your own deck of casino cards. This virtual version replaces the board, pieces and dice, and walks you through the instructions."*/
    }, {
      /*h4: [{
          img: {
            src: "images/icon.png"
          }
        },
        "What is a rabbit supposed to do when the king falls dead?",
        "Travel the land trying to find a rightfully suited heir.",
        "Run through paths out of the castle. Try to beat the rest.",
        "Use the cards very wisely to complete the quest."
      ]*/
    }, {
      div: [RANDOM_CARD(), RANDOM_CARD()],
    }, {/*
      h3: '<b class="wisdom">Wisdom</b>, <b class="courage">Courage</b>, <b class="fortune">Fortune</b> & <b class="charm">Charm</b> <br> is what a rabbit has at hand.',*/
    }, {
      img: {
        src: "images/photo1.jpg",
        width: "490",
        height: "auto",
        alt: "game board"
      },
      small: "El juego incluye 38 piezas de madera, 4 conejos, 2 dados, 12 zanahorias y un juego de 54 naipes diseñados para acompañar el tablero. Todo hecho en materiales biodegradables.",
    }, {
      h2: {
        a: {
          href: "instructions.pdf",
          target: "_blank",
          text: "Intrucciones/Instructions",
        }
      }
    }, {
      p: 'Follow Lenino on <a href="https://www.instagram.com/lenino.jackrabbits" target="_blank">Instagram</a>, <a href="https://www.facebook.com/leninomusic" target="_blank">Facebook</a> or <a href="https://www.twitter.com/lenino" target="_blank">Twitter</a>.'
    }, {
      a: {
        href: "http://lenino.net",
        target: "_blank",
        img: {
          src: "../../assets/leninoLogo.png",
          alt: "Lenino.net"
        },
        p: "Lenino.net"
      }
    }]
  },
  onload: e => $(".card").flip()
});
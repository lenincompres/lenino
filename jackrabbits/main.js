const CARD = (front, back, width = 240, height = 340) => {
  const IMG_STYLE = {
    height: height + 'px',
    width: width + 'px',
    boxShadow: '2px 2px 6px',
    borderRadius: '1em',
    display: 'inline-block',
  };
  return {
    textAlign: "center",
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

const RANDOM_CARD = (autoFlip = false, delay = 0) => {
  let [x, y, z] = [0, 0, 0];
  let [w, h] = [240, 340];
  const randomize = () => {
    x = Math.floor(Math.random() * 6);
    y = Math.floor(Math.random() * 3);
    z = Math.floor(Math.random() * 3);
  };
  randomize();
  const opened = new Binder(false);
  let counter = -delay;
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
      counter = 1;
    },
    onready: elt => {
      if (!autoFlip) return;
      setInterval(e => !(counter++ % 5) ? elt.click() : null, 500);
    }
  })
}

const JRName = '<b><span class="charm">J</span><span class="fortune">A</span>C<span class="courage">K</span> R<span class="wisdom">A</span>BBITS</b>';

DOM.style({
  fontFace: [{
    fontFamily: 'titleFont',
    src: 'url("IrishGrover-Regular.ttf")'
  }, {
    fontFamily: 'bodyFont',
    src: 'url("Chalkboard.ttc")'
  }],
  section: {
    margin: '1em 0'
  },
  a: {
    color: "darkblue",
    hover: {
      color: "royalblue",
    }
  },
  h: {
    fontFamily: 'titleFont',
    margin: '1em 0 0 0',
    lineHeight: '1.5em',
    textAlign: 'center',
  },
  h4: {
    margin: 0,
  },
  p: {
    textAlign: "left",
    margin: '0 0 1em 0',
    textIndent: "1.5em",
  },
  i: {
    fontStyle: 'normal'
  },
  big: {
    fontSize: '1.8em'
  },
  b: {
    fontFamily: 'titleFont',
    textShadow: 'black 1px 1px',
  },
  _wisdom: {
    color: 'teal'
  },
  _courage: {
    color: 'darkslateblue'
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
  padding: '0px',
  margin: '0px',
  backgroundColor: '#EBEBD5',
  backgroundImage: 'url(images/bg.png)',
  fontFamily: "bodyFont",
  fontSize: "16px",
  textAlign: "center",
  header: {
    menu: {
      /*
      margin: "0.25em 0 2em",
      ul: {
        display: "flex",
        li: [{
          a: "Kickstarter",
        }, {
          a: "Instagram",
        }, {
          a: "Tabletopia",
        }, {
          a: "Lenino",
        },
      ]
     }
     */
    }
  },
  main: {
    maxWidth: '680px',
    minWidth: '490px',
    margin: '0 auto',
    padding: '0 0 10px',
    section: [CARD({
      background: 'url(images/splash.png) center center no-repeat',
      backgroundColor: 'lightgoldenrodyellow'
    }, {/*
      backgroundColor: 'white',
      p: {
        marginTop: '6em',
        text: "El video tutorial viene muy pronto."
      }*/
    }, 490), {
      h4: [
        "Descubre maravillas mientras viajas",
        "al reino de conejos y barajas.",
      ]
    }, {
      p: [
        `Lenino's ${JRName} es un juego de mesa ingeniado en base a las cartas de naipes clásicos. Lo caracterizan el manejo de recursos, la exploración de un tablero distinto en cada partida, y los elementos de aventura y fantasía.  El arte y concepto evoca a <i>Alicia en el País de las Maravillas</i>, y la misión es que los conejos mensajeros visiten palacios y consigan cartas reales. Tiene diferente niveles de dificultad que lo hacen atractivo para jugadores casuales como para expertos.`
      ],
    }, {
      h2: "Intenta la versión virtual del juego en <b>Tabletopia</b>.",
      a:{
        href: "https://tabletopia.com/games/jack-rabbits",
        target: "_blank",
        img: {
          width: "100%",
          src: "tabletopia_link.png",
        }
      },
      p: "Muy pronto estaremos lanzando una campaña de <b>Kickstarter</b> para fabricar la primera edición oficial del juego. Mantente atento."
    }, {
      div: [RANDOM_CARD(true), RANDOM_CARD(true, 1)],
    }, {
      h4: '<b class="fortune">Fortuna</b>, <b class="courage">Coraje</b>, <b class="wisdom">Sapiencia</b>  y <b class="charm">Encanto</b> <br/>son las cualidades que tienes a mano.',
    }, {
      p: "El juego incluye 38 piezas de madera, 4 conejos, 2 dados, 12 zanahorias y un juego de 54 naipes diseñados para acompañar el tablero. Todo hecho en materiales biodegradables por una compañía independiente, y con una cultura de inclusión y conciencia social, ecológica y global.",
    }, {
      img: {
        src: "images/photo1.jpg",
        width: "490",
        height: "auto",
        alt: "game board"
      },
    }, {
      h2: {
        a: {
          href: "instructions.pdf",
          target: "_blank",
          text: "Intrucciones",
        }
      }
    }, {
      p: 'Síguenos y contáctanos en <a href="https://www.instagram.com/lenino.jackrabbits" target="_blank">Instagram</a>, <a href="https://www.facebook.com/leninomusic" target="_blank">Facebook</a>, <a href="https://www.twitter.com/lenino" target="_blank">Twitter</a> o por <a href="mailto:leninosjackrabbits@gmail.com" target="_blank">correo-electrónico</a>.'
    }, {
      textAlign: "center",
      a: {
        display: "block",
        href: "http://lenino.net",
        target: "_blank",
        img: {
          width: "4em",
          src: "../assets/leninoLogo.png",
          alt: "Lenino.net"
        },
        div: "Lenino.net",
      }
    }]
  },
  onload: e => $(".card").flip()
});
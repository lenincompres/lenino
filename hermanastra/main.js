let sinopsisElement = {
  display: "flex",
  marginTop: "1em",
  figure: {
    img: {
      src: "cover.png",
      maxWidth: "30em",
      minWidth: "15em",
      width: "100%",
    }
  },
  main: {
    align: "left",
    width: "26em",
    minWidth: "15em",
    margin: "1em 0 0 -6em",
    borderRadius: "1em",
    padding: "1em 1.5em",
    tag: "section",
    background: "#fec",
    text: "En uno de sus viajes por el espacio, el tiempo y los hongos, Lenino “El Cantacuentos” conoce a una doncella desencantada cuya hermanastra cenicienta le robó al príncipe azul. Su difunto padrastro arruinó la fortuna de su madre y un joven panadero deshonró a su hermana menor. Según el pueblo, su casa se convirtió en un hostal de brujas y reinas malvadas. Lenino llega allí y sus encantos caribeños revelan el hechizo bajo el cual se encuentra la joven.",
    height: "fit-content",
  }
};

let bioElement = {
  align: "left",
  maxWidth: "50em",
  margin: "2em 0",
  tag: "section",
  content: `<b>Lenin Comprés</b> es un artista dominicano residente en la ciudad de Nueva York; un profesional de los medios interactivos, las ciencias del aprendizaje y las artes escénicas; un pianista autodidacta y renacentista post-moderno. Ejerce como profesor y tecnólogo creativo en la Escuela de Artes <a href="https://tisch.nyu.edu/itp">TISCH de la Universidad de Nueva York</a> y es egresado del <a href="https://www.tc.columbia.edu/human-development/cognitive-studies-in-education/">Teacher’s College de la Universidad de Columbia</a>. Ha escrito obras premiadas en la República Dominicana y escribió junto a Waddys Jáquez el guión de la película <a href="https://www.imdb.com/title/tt7552938/">Mis 500 locos</a> que representó al país en los premios Oscars del 2021. También es el creador del primer juego de mesa original de autoría dominicana, <a href="http://jackrabbits.lenino.net">Lenino’s JACK RABBITS</a>.`,
  figure: {
    margin: "0.5em 0",
    img: {
      src: "spread.png",
      width: "100%",
    }
  },
};

let funcionesElement = {
  fontSize: "1.25em",
  h6: "Próxima función:",
  a: {
    href: "https://tix.do/event/lenino-y-la-hermanastra/",
    target: "_blank",
    content: "<b>2023, 07/08</b>: Casa de Teatro, Santo Domingo. «Tickets»"
  }
}

let creditosElement = {
  marginTop: "3em",
  tag: "ul",
  h1: "Créditos & equipo",
  li: {
    margin: "1em 0",
    content: [{
        h6: "Autoría e interpretación",
        a: {
          text: "Lenin Comprés",
          href: "http://lenino.net",
          target: "_blank",
        },
      },
      {
        h6: "Asesoría escénica",
        p: "Bethania Rivera",
        a: {
          text: "Waddys Jáquez",
          href: "https://www.instagram.com/waddysjaquez",
          target: "_blank",
        },
      },
      {
        h6: "Asesoría musical",
        a: {
          text: "Mariana Cabot",
          href: "https://marianacabot.com/",
          target: "_blank",
        },
      },
      {
        h6: "Equipo técnico",
        p: ["Julián Duque", "Rossy Torres", "Félix Guzmán"]
      },
      {
        h6: "Fotografía",
        a: {
          text: "Mariliana Arvelo",
          href: "https://www.stylishhipkids.com/",
          target: "_blank",
        },
      },
    ]
  }
}

let musicalElement = {
  css: {
    h5: {
      marginTop: "1em",
      before: {
        content: '"«"',
      },
      after: {
        content: '"»"',
      },
    }
  },
  marginTop: "3em",
  h1: "Números musicales",
  p: "Letra y música de Lenin Comprés",
  ul: {
    marginTop: "1em",
    li: [{
      h5: "Este es su cuento",
    }, {
      h5: "Cuentas nuevas",
    }, {
      h5: "Mujer Vieja",
      a: {
        text: "Inspiración: «Äijö» de Värtinä",
        href: "https://open.spotify.com/track/2lLZotRXsQL3k2xX8rhl7q",
        target: "_blank",
      },
    }, {
      h5: "Cantaletas",
      a: {
        text: "Original: «Tedious Ramblings» de Lenino",
        href: "https://open.spotify.com/track/2XIjXfcQdRCJhKDq9LSfO5",
        target: "_blank",
      },
    }, {
      h5: "Mala imagen",
    }, {
      h5: "Casa noble",
      a: [{
        text: "Arreglo: Ambiorix Francisco",
        href: "https://open.spotify.com/artist/1IgORqBInIYlaipClp2Ma8",
        target: "_blank",
      }, {
        display: "block",
        text: "Mezcla: Jarxiel",
        href: "https://open.spotify.com/artist/7vdRAvViSvP53CiwaCauS5",
        target: "_blank",
      }],
    }, {
      h5: "Entrevista sin malicia",
      a: {
        text: "Original: «The Coy and the Candid» de Lenino",
        href: "https://open.spotify.com/track/3VPhykSY1ShrzcwyK9bYUS",
        target: "_blank",
      },
    }, {
      h5: "La ve",
      a: {
        text: "Original: «That Time» de Regina Spektor",
        href: "https://open.spotify.com/track/2lLZotRXsQL3k2xX8rhl7q",
        target: "_blank",
      },
    }]
  }
}

DOM.set({
  title: "Lenino & La Hermanastra",
  charset: "UTF-8",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1.0,
    userScalable: "no",
  },
  keywords: "lenin, lenino, lenin compres, jackrabbits, jack rabbits, rabbit candy jar, cantacuentos",
  description: "Lenino is a creative storyteller—the affectionate alter-ego of Lenin Compres—an explorer of sience, technology and arts who was born in the Caribbean and has lived in New York City all his “adult” life.",
  link: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
  icon: "icon.png",
  font: [{
    fontFamily: 'title',
    src: 'url("./CinzelDecorative-Regular.ttf")',
  }, {
    fontFamily: 'body',
    src: 'url("./Skia Regular.ttf")',
  }, {
    fontFamily: 'fancy',
    src: 'url("./Party LET Plain.ttf")',
  }],
  css: {
    h: {
      fontFamily: "title",
    },
    i: {
      fontFamily: "fancy",
    },
    b: {
      fontFamily: "title",
    },
    a: {
      color: "#09a",
      hover: {
        textDecoration: "underline",
      },
    },
    body: {
      fontFamily: "body",
    },
  },
  fontSize: "12pt",
  lineHeight: "1.4em",
  background: "#fec",
  header: {
    background: "#012",
    color: "white",
    padding: "2em 0.5em 0.5em",
    fontSize: "1.5em",
    lineHeight: "1.4em",
    align: "center",
    h1: "Lenino <i>& la hermanastra</i>",
    p: {
      fontSize: "0.8em",
      marginTop: "0.5em",
      text: "Un monólogo musical rococómico"
    }
  },
  main: {
    padding: "1em",
    margin: "0.5em auto",
    maxWidth: "800px",
    align: "center",
    section: [
      funcionesElement,
      sinopsisElement,
      bioElement,
      creditosElement,
      musicalElement,
    ],
  },
  footer: {
    align: "center",
    background: "#012",
    color: "white",
    margin: "3em auto 0",
    padding: "2em 1em 2em",
    a: {
      img: {
        width: "2em",
        src: "../assets/leninoLogoW.png",
      },
      href: "http://lenino.net",
      p: "lenino.net",
    }
  }
});
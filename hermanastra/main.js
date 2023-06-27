let sinopsisElement = {
  display: "flex",
  marginTop: "1em",
  figure: {
    img: {
      src: "cover.png",
      maxWidth: "30em",
      minWidth: "15em",
      width: "80%",
    }
  },
  main: {
    align: "left",
    width: "25em",
    minWidth: "15em",
    margin: "2em 0 0 -6em",
    borderRadius: "1em",
    padding: "1em 1.5em",
    tag: "section",
    background: "#fec",
    text: "En uno de sus viajes por el espacio, el tiempo y los hongos, Lenino “El Cantacuentos” conoce a una doncella desencantada cuya hermanastra cenicienta le robó a su príncipe azul. Su difunto padrastro arruinó la fortuna de su madre y un joven panadero deshonró a su hermana menor. Según el pueblo, su casa se convirtió en un hostal de brujas y reinas malvadas. Lenino llega allí y sus encantos caribeños revelan el hechizo del cual la joven era víctima.",
    height: "fit-content",
  }
};

let bioElement = {
  align: "left",
  maxWidth: "40em",
  margin: "2em auto",
  tag: "section",
  content: `<b>Lenin Comprés</b> es un artista dominicano residente en la ciudad de Nueva York; un profesional de los medios interactivos, las ciencias del aprendizaje y las artes escénicas; un pianista autodidacta y renacentista post-moderno. Ejerce como profesor y tecnólogo creativo en la Escuela de Artes TISCH de la Universidad de Nueva York y es egresado del Teacher’s College de la Universidad de Columbia. Ha escrito obras premiadas en la República Dominicana y escribió junto a Waddys Jáquez el guión de la película <a href="https://www.imdb.com/title/tt7552938/">Mis 500 locos</a> que representó al país en los premios Oscars del 2021. También es el creador del primer juego de mesa original de autoría dominicana, <a href="http://jackrabbits.lenino.net">Lenino’s JACK RABBITS</a>.`,
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
  h2: "Créditos & equipo",
  li: {
    margin: "1em 0",
    content: [{
        h6: "Autoría e interpretación:",
        span: "Lenin Comprés"
      },
      {
        h6: "Asesoría escénica:",
        span: "Waddys Jáquez</br>Bethania Rivera"
      },
      {
        h6: "Asesoría musical:",
        span: "Mariana Cabot</br>Ambiorix Francisco"
      },
      {
        h6: "Equipo técnico:",
        span: "Julián Duque</br>Rossy Torres</br>Félix Guzmán"
      },
      {
        h6: "Fotografía:",
        span: "Mariliana Arvelo",
      },
    ]
  }
}

let musicalElement = {
  marginTop: "3em",
  h2: "Números musicales",
  h5: {
    marginTop: "1em",
    class: "quote",
    content: [
      "Este es su cuento",
      "Nuevas cuentas",
      "Cantaletas",
      "Mala imagen",
      "Casa noble",
      "Entrevista sin malicia",
      "La ve",
    ]
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
    src: 'url("./CinzelDecorative-Regular.ttf")'
  }, {
    fontFamily: 'body',
    src: 'url("./Skia Regular.ttf")'
  }],
  css: {
    h: {
      fontFamily: "title",
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
    i: {
      fontFamily: "fantasy",
    },
    _quote: {
      before: {
        content: '"“"',
      },
      after: {
        content: '"”"',
      },
    }
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
      href: "https://lenino.net",
      p: "lenino.net",
    }
  }
});
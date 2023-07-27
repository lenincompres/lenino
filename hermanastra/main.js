
import creditosModel from "./modules/credits.js";
import songsModel from "./modules/songs.js";
import funcionesModel from "./modules/funciones.js";
import galleryModel from "./modules/gallery.js";
import { COLOR } from "./settings.js";

let sinopsisModel = {
  display: "flex",
  marginTop: "1em",
  figure: {
    img: {
      src: "media/cover.png",
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
    background: COLOR.LIGHT,
    text: "En uno de sus viajes por el espacio, el tiempo y los hongos, Lenino “El Cantacuentos” conoce a una doncella desencantada cuya hermanastra cenicienta le robó al príncipe azul. Su difunto padrastro arruinó la fortuna de su madre y un joven panadero deshonró a su hermana menor. Según el pueblo, su casa se convirtió en un hostal de brujas y reinas malvadas. Lenino llega con sus encantos caribeños a descubrir el hechizo bajo el cual se encuentra.",
    height: "fit-content",
  }
};

let bioModel = {
  align: "left",
  maxWidth: "50em",
  margin: "2em 0",
  tag: "section",
  content: `<b>Lenin Comprés</b> es un artista dominicano residente en la ciudad de Nueva York; un profesional de los medios interactivos, las ciencias del aprendizaje y las artes escénicas; un pianista autodidacta y renacentista post-moderno. Ejerce como profesor y tecnólogo creativo en la Escuela de Artes <a href="https://itp.nyu.edu/itp/people/?tab=staff">TISCH de la Universidad de Nueva York</a> y es egresado del <a href="https://www.tc.columbia.edu/human-development/cognitive-studies-in-education/">Teacher’s College de la Universidad de Columbia</a>. Ha escrito obras premiadas en la República Dominicana y escribió junto a Waddys Jáquez el guión de la película <a href="https://www.imdb.com/title/tt7552938/">Mis 500 locos</a> que representó al país en los premios Oscars del 2021. También es el creador del primer juego de mesa original de autoría dominicana, <a href="http://jackrabbits.lenino.net">Lenino’s JACK RABBITS</a>.`,
  figure: {
    margin: "0.5em 0",
    img: {
      src: "media/spread.png",
      width: "100%",
    }
  },
};


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
  icon: "media/icon.png",
  font: [{
    fontFamily: 'title',
    src: 'url("./fonts/CinzelDecorative-Regular.ttf")',
  }, {
    fontFamily: 'body',
    src: 'url("./fonts/Skia Regular.ttf")',
  }, {
    fontFamily: 'fancy',
    src: 'url("./fonts/Party LET Plain.ttf")',
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
  },

  fontFamily: "body",
  fontSize: "11pt",
  lineHeight: "1.4em",
  background: COLOR.LIGHT,

  header: {
    background: COLOR.DARK,
    color: "white",
    padding: "2em 0.5em 0.5em",
    fontSize: "1.7em",
    lineHeight: "1.4em",
    align: "center",
    h1:[ "Lenino", {
      color: COLOR.HIGHLIGHT,
      marginBottom: "-0.3em",
      i: "&",
    }, {
      i: "la hermanastra"
    }],
    p: {
      fontSize: "0.7em",
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
      //funcionesElement,
      sinopsisModel,
      bioModel,
      creditosModel,
      galleryModel,
      songsModel,
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
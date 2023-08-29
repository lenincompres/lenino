
import creditsModel from "./modules/credits.js";
import songlistModel from "./modules/songs.js";
import funcionesModel from "./modules/funciones.js";
import galleryModel from "./modules/gallery.js";
import aboutModel from "./modules/about.js";
import { COLOR, INC } from "./settings.js";
import sponsorsModel from "./modules/sponsors.js";

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
      textAlign: "center",
      margin: "0.5em 0 0.1em",
      fontFamily: "title",
    },
    i: {
      fontFamily: "fancy",
    },
    b: {
      fontFamily: "title",
    },
    a: {
      color: COLOR.BRIGHT,
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
    backgroundImage: "url(media/leaves.jpg)",
    backgroundPositionX: INC.as(i => `-${3*i}px`),
    backgroundPositionY: INC.as(i => `${3*i}px`),
    color: COLOR.LIGHT,
    padding: "0.5em",
    fontSize: "1.8em",
    lineHeight: "1.4em",
    align: "center",
    textDecoration: "0 0.1em 0.3em black",
    h1:[ "Lenino", {
      color: COLOR.HIGHLIGHT,
      margin: "-0.3em 0 -0.8em",
      i: "&",
    }, {
      i: "La Hermanastra"
    }],
    p: {
      color: COLOR.ACCENT,
      fontSize: "0.7em",
      text: "Un monólogo musical rococómico"
    },
  },
  aside: sponsorsModel,

  main: {
    padding: "1em",
    margin: "0 auto",
    maxWidth: "800px",
    align: "center",
    section: [
      funcionesModel,
      aboutModel,
      galleryModel,
      creditsModel,
      {
        margin: "0 -1em",
        figure: {
          margin: "0.5em 0",
          img: {
            src: "media/spread.png",
            width: "100%",
          }
        }
      },
      songlistModel,
    ],
  },

  footer: {
    align: "center",
    background: "black",
    color: "white",
    margin: "3em auto 0",
    padding: "2em 1em 2em",
    backgroundImage: "url(media/leavesBWW.jpg)",
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
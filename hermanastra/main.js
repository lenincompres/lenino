import creditsModel from "./modules/credits.js";
import songlistModel from "./modules/songs.js";
import funcionesModel from "./modules/funciones.js";
import galleryModel from "./modules/gallery.js";
import aboutModel from "./modules/about.js";
import {
  COLOR,
  INC
} from "./settings.js";
import sponsorsModel from "./modules/sponsors.js";
import Copy from "../lib/Copy.js";
import bookingModel from "./modules/booking.js";

DOM.set({
  head: {
    icon: "media/icon.png",
    title: "La Hermanastra",
    charset: "UTF-8",
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1.0,
      userScalable: "no",
    },
    keywords: "lenin, lenino, lenin compres, jackrabbits, jack rabbits, rabbit candy jar, cantacuentos",
    description: "Lenino is a creative storyteller—the affectionate alter-ego of Lenin Compres—an explorer of sience, technology and arts who was born in the Caribbean and has lived in New York City all his “adult” life.",
    author: "Lenin Compres",
    image: "media/cover.png",
    "og:type": "website",
    link: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
  },

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
    a: {
      color: COLOR.BRIGHT,
      hover: {
        textDecoration: "underline",
      },
    },
    b: {
      fontFamily: "title",
    },
    i: {
      fontFamily: "fancy",
    },
  },

  fontFamily: "body",
  fontSize: "11pt",
  lineHeight: "1.4em",
  background: COLOR.LIGHT,

  header: {
    background: COLOR.DARK,
    backgroundImage: "url(media/leaves.jpg)",
    backgroundPositionX: INC.as(i => `-${4*i}px`),
    backgroundPositionY: INC.as(i => `${4*i}px`),
    color: COLOR.LIGHT,
    padding: "0.5em",
    fontSize: "1.8em",
    lineHeight: "1.4em",
    align: "center",
    textDecoration: "0 0.1em 0.3em black",
    h1: ["Lenino", {
      color: COLOR.HIGHLIGHT,
      margin: "-0.3em 0 -0.8em",
      i: "&",
    }, {
      i: Copy.text({
        es: "La Hermanastra",
        en: "The Stepsister",
      }),
    }],
    p: {
      color: COLOR.ACCENT,
      fontSize: "0.7em",
      text: Copy.text({
        es: "Un monólogo musical rococómico",
        en: "A Rococomic Musical Monologue",
      }),
    },
    menu: {
      fontSize: '1rem',
      position: "absolute",
      right: 0,
      top: 0,
      margin: "0.5em 1.5em",
      zIndex: 100,
      a: {
        color: 'wheat',
        hover: {
          textShadow: "0 0 2px white",
        },
        after: {
          content: '" »"',
        },
        content: Copy.getToggleLink(Copy.LANG.es, Copy.LANG.en),
      }
    },
  },

  //aside: sponsorsModel,

  main: {
    align: "center",
    margin: "0 auto",
    css: {
      section: {
        margin: "0 auto",
        padding: "1em",
        maxWidth: "800px",
      }
    },
    section: [
      funcionesModel,
      aboutModel,
      galleryModel,
      creditsModel,
      {
        border: "2px solid rgba(0,0,0,30)",
        boxShadow: "inset 2px 2px 5px black",
        borderRadius: "5px",
        maxWidth: "900vw",
        width: "86vw",
        height: "230px",
        backgroundImage: "url(media/spread.png)",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      },
      bookingModel,
      //songlistModel,
    ],
    onscroll: e => {
      lastKnownScrollPosition = window.scrollY;
    }
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
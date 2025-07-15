import * as STYLE from "./src/style.js";
import Pager from "./lib/Pager.js";
import Copy from "./lib/Copy.js";
import SOCIAL_LINKS from "./src/pages/data/social.js";
import CardScroll from "./src/CardScroll.js";
import news from "./src/pages/data/news.js";
import bioPage from "./src/pages/bio.js";
import projectsPage from "./src/pages/projects.js";
import contactPage from "./src/pages/contact.js";
import programsPage from "./src/pages/programs.js";

binderSet({
  hoverPage: false,
  isMobile: false,
  isWide: false,
});

function checkViewport(e) {
  isMobile = window.innerWidth < 780;
  isWide = window.innerWidth > 1050;
};

Copy.add({
  tagline: {
    en: "Tales and Tools for Creativity and Learning",
    es: "Un portal para la creatividad y el aprendizaje",
  },
  educator: {
    en: "education",
    es: "educación",
  },
  creativist: {
    en: "creativist",
    es: "creativismo",
  },
  about: {
    en: "About",
    es: "Reseña"
  },
  home: {
    en: "Home",
    es: "Inicio",
  },
  portfolio: {
    es: "Portafolio",
    en: "Portfolio",
  },
  offerings: {
    es: "Propuestas",
    en: "Offerings",
  },
  contact: {
    es: "Contacto",
    en: "Contact Us",
  },
});

let newsScroll = new CardScroll(news);
newsScroll.start();
window.addEventListener('hashchange', () => {
  newsScroll.clear();
  newsScroll.start();
});

Pager.add({
  [Copy.KEY.home]: {
    section: newsScroll,
  },
  [Copy.KEY.about]: bioPage,
  [Copy.KEY.offerings]: programsPage,
  [Copy.KEY.portfolio]: projectsPage,
  [Copy.KEY.contact]: contactPage,
});

DOM.set({
  title: "Lenino.net",
  keywords: "lenin, lenino, lenin compres, jackrabbits, jack rabbits, rabbit candy jar, cantacuentos",
  description: Copy.text({
    en: "Prof. Lenino is a creative storyteller—the affectionate alter-ego of Lenin Comprés—an explorer of sience, technology and arts who was born in the Caribbean and has lived in New York City all his “adult” life.",
    es: "El Profesor Lenino es un narrador creativo, el alter ego de Lenin Comprés, un explorador de la ciencia, la tecnología y el arte, nacido en el Caribe y residente en Nueva York durante toda su vida “adulta”."
  }),
  link: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css",
  icon: "assets/icon.png",
  css: {
    a: {
      color: STYLE.COLOR.LINK,
      hover: {
        color: STYLE.COLOR.HIGHLIGHT,
      },
      __fa: {
        color: "white",
        width: "1.9em",
        height: "1.9em",
        padding: "0.45em",
        margin: "0 0.2em",
        textAlign: "center",
        borderRadius: "0.2em",
        verticalAlign: "text-bottom",
        boxShadow: STYLE.SHADOW.NORMAL,
        hover: {
          boxShadow: STYLE.SHADOW.HIGHLIGHT,
        }
      },
    },
    h: {
      fontFamily: 'title',
      color: STYLE.COLOR.LINK,
    },
    h2: {
      fontSize: "1.35em",
    },
    h3: {
      fontSize: "1rem",
    },
    p: {
      lineHeight: "1.35em",
      textAlign: "justify",
      li: {
        listStyleType: "disc",
        marginLeft: "1em",
      }
    },
    "p:not(:first-of-type)": {
      marginTop: ".6em",
    },
  },
  font: {
    fontFamily: 'title',
    src: 'url("./assets/BowlbyOneSC-Regular.ttf")'
  },
  fontFamily: 'arial',
  fontSize: "14px",
  backgroundColor: "#023",
  container: {
    model: STYLE.FLEX,
    margin: "0 auto",
    maxWidth: "860px",
    overflowX: "hidden",
    main: {
      position: "relative",
      maxWidth: _isWide.as("100%", "900px"),
      width: "100%",
      boxShadow: "2px 2px 4px",
      backgroundColor: STYLE.COLOR.BACKGROUND,
      backgroundImage: "url(assets/leninoYourCard.jpg)",
      backgroundSize: _isMobile.as("900px", "initial"),
      backgroundPosition: "center top",
      backgroundAttachment: "fixed",
      menu: {
        position: "absolute",
        right: 0,
        margin: "1em",
        zIndex: 100,
        a: {
          hover: {
            textShadow: "0 0 2px white",
          },
          after: {
            content: '" »"',
          },
          color: _isMobile.as(STYLE.COLOR.PALE, STYLE.COLOR.LINK_DARK),
          content: Copy.getToggleLink(Copy.LANG.es, Copy.LANG.en),
        }
      },
      header: {
        model: [STYLE.PAGE, STYLE.FLEX, STYLE.SLIDE(0)],
        alignItems: "center",
        placeContent: "center",
        padding: "0.5em",
        zIndex: 10,
        height: "auto",
        position: _isMobile.as("absolute", "relative"),
        width: _isMobile.as("fit-content", "100%"),
        margin: _isMobile.as("1em 0.6em", 0),
        flexDirection: _isMobile.as("row", "column"),
        borderRadius: _isMobile.as(".5em", 0),
        h1: {
          height: "1em",
          img: {
            src: "assets/leninoLogo.png",
            alt: "Lenino's Logo",
            height: "2.5rem",
            margin: '0 0.15em',
            verticalAlign: "text-top",
          },
          a: {
            fontSize: "2.3rem",
            verticalAlign: "super",
            lineHeight: "1.3rem",
            href: "#home",
            fontFamily: "title",
            text: "Lenino",
            click: e => Pager.key = Pager.default,
          }
        },
        tagline: {
          maxWidth: "22em",
          margin: "0 0.5em",
          i: `“${Copy.at.tagline}”`,
        },
        menu: {
          display: _isMobile.as("block", "none"),
          a: SOCIAL_LINKS,
        },
        //onready: queueDown,
      },
      nav: {
        style: STYLE.FLEX,
        model: STYLE.SLIDE(1),
        flexDirection: "column",
        color: "rgb(245, 220, 154)",
        zIndex: 5,
        alignContent: _isMobile.as("left", "center"),
        height: _isMobile.as("fit-content", "3.5em"),
        width: _isMobile.as("fit-content", "100%"),
        backgroundColor: _isMobile.as(
          "rgba(255,255,255,0.5)",
          "black",
        ),
        padding: _isMobile.as("4.5em 0.5em 0.5em", "0.5em 0"),
        borderRadius: _isMobile.as("0.5em", 0),
        margin: _isMobile.as("2em 0 0 0.6em", 0),
        position: _isMobile.as("absolute", "relative"),
        ul: {
          style: STYLE.FLEX,
          flexDirection: _isMobile.as("column", "row"),
          li: Pager.keys.map((name, i) => ({
            display: i ? "block" : "none",
            a: {
              color: STYLE.COLOR.PAGE,
              width: _isMobile.as(val => val && name === Pager.keys.slice(-1)[0], "5.7em", "2.5em"),
              lineHeight: "1em",
              padding: ".3em 0",
              margin: "0.2em",
              fontSize: "1.25em",
              textAlign: "center",
              borderRadius: "0.25em",
              fontWeight: "normal",
              overflow: "hidden",
              textOverflow: "ellipsis",
              backgroundColor: Pager._key.as({
                [name]: STYLE.COLOR.LINK_DARK,
                default: STYLE.COLOR.LINK,
              }),
              display: "block",
              //display: _isMobile.as(val => (val || name !== Pager.keys.slice(-1)[0]) && name !== Pager.keys[0], "none", "block"),
              boxShadow: {
                bind: [_hoverPage, Pager._key],
                as: (over, current) => current === name ? STYLE.SHADOW.INSET : over === name ? STYLE.SHADOW.HIGHLIGHT : STYLE.SHADOW.NORMAL,
              },
              text: _isMobile.as(val => val && name === Pager.keys.slice(-1)[0], Copy.at[name], "💬", ),
              onclick: e => Pager.key = name,
              mouseover: e => hoverPage = name,
              mouseout: e => hoverPage = false,
            },
          })),
        },
      },
      article: {
        model: STYLE.FLEX,
        justifyContent: _isMobile.as("flex-start", "center"),
        minHeight: _isMobile.as(["40em", "calc(100vh - 14.7em)"]),
        height: "fit-content",
        width: _isMobile.as("51em", "100%"),
        margin: _isMobile.as("6em 0 1.5em 10em", "0 0 1em 0"),
        content: Pager._content,
      },
      footer: {
        css: {
          padding: "1em",
          backgroundColor: "#11161A",
          color: "silver",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          a: {
            color: STYLE.COLOR.HIGHLIGHT,
          }
        },
        section: [{
          markdown: Copy.text({
            es: "Creado por Lenin Comprés usando [DOM.js](https://github.com/lenincompres/DOM.js/blob/main/README.md).",
            en: "Created by Lenin Comprés using [DOM.js](https://github.com/lenincompres/DOM.js/blob/main/README.md).",
          }),
        }, {
          a: {
            href: "#contact",
            text: Copy.text({
              es: "Contáctanos aquí",
              en: "Contact us here",
            })
          },
        }]
      },
    },
  },
  onload: checkViewport,
  onresize: checkViewport,
});
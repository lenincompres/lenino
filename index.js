import * as STYLE from "./modules/style.js";
import PAGES from "./modules/pages.js";
import INSTAGRAM from "./modules/widgets/instagram.js";
import TWITTER from "./modules/widgets/twitter.js";
import MUSICPLAYER from "./modules/widgets/musicplayer.js";
import SOCIAL_LINKS from "./modules/widgets/social.js";
import slideDown from "./modules/animations.js";
import Copy from "./classes/Copy.js";

window.THIS_URL = window.location.href.split('#')[0].split('?')[0];
const QS = DOM.querystring();
window.LANG = QS.lang ? QS.lang : "en";

const _IS_MOBILE = new Binder();
const _IS_WIDE = new Binder();
const _CURRENT_PAGE = new Binder(0);
const _HOVER_PAGE = new Binder();

const pageNames = Object.keys(PAGES);

function setSize(e) {
  _IS_MOBILE.value = window.innerWidth < 780;
  _IS_WIDE.value = window.innerWidth > 1050;
};

if (window.location.hash) _CURRENT_PAGE.value = window.location.hash.split("#")[1];

Copy.add({
  storyteller: {
    en: "storyteller",
    es: "cantacuentos",
  },
  educator: {
    en: "educator",
    es: "educador",
  },
});

DOM.set({
  title: "Lenino.net",
  keywords: "lenin, lenino, lenin compres, jackrabbits, jack rabbits, rabbit candy jar, cantacuentos",
  description: "Prof. Lenino is a creative storyteller—the affectionate alter-ego of Lenin Compres—an explorer of sience, technology and arts who was born in the Caribbean and has lived in New York City all his “adult” life.",
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
        width: "2em",
        height: "2em",
        padding: "0.5em",
        margin: "0 0.25em",
        textAlign: "center",
        borderRadius: "0.25em",
        verticalAlign: "text-bottom",
        boxShadow: STYLE.SHADOW.NORMAL,
        hover: {
          boxShadow: STYLE.SHADOW.HIGHLIGHT,
        }
      },
    },
  },
  font: {
    fontFamily: 'title',
    src: 'url("./assets/markerfeltnormal.ttf")'
  },
  fontSize: "14px",
  backgroundColor: "#023",
  container: {
    model: STYLE.FLEX,
    margin: "0 auto",
    maxWidth: "800px",
    main: {
      position: "relative",
      maxWidth: _IS_WIDE.as("100%", "800px"),
      width: "100%",
      boxShadow: "2px 2px 4px",
      backgroundColor: STYLE.COLOR.BACKGROUND,
      backgroundImage: "url(assets/leninoYourCard.jpg)",
      backgroundSize: _IS_MOBILE.as("100%", "initial"),
      backgroundPosition: "center top",
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
          color: _IS_MOBILE.as(STYLE.COLOR.PALE, STYLE.COLOR.LINK_DARK),
          content: Copy.getToggleLink(Copy.LANG.es, Copy.LANG.en),
        }
      },
      header: {
        model: [STYLE.PAGE, STYLE.FLEX],
        alignItems: "center",
        placeContent: "center",
        padding: "0.5em",
        zIndex: 10,
        height: "auto",
        position: _IS_MOBILE.as("absolute", "relative"),
        width: _IS_MOBILE.as("fit-content", "100%"),
        margin: _IS_MOBILE.as("1em", 0),
        flexDirection: _IS_MOBILE.as("row", "column"),
        borderRadius: _IS_MOBILE.as(".5em", 0),
        span: {
          //span: 'Prof. ',
          img: {
            src: "assets/leninoLogo.png",
            alt: "Lenino's Logo",
            height: "30",
            marginRight: '0.5em'
          },
          a: {
            //verticalAlign: 'middle',
            fontSize: "2.3em",
            href: "#home",
            span: {
              fontFamily: "title, Georgia, \"Times New Roman\", Times, serif",
              text: "Lenino",
            },
            click: e => _CURRENT_PAGE.value = pageNames[0],
          }
        },
        tagline: {
          margin: "0 .6em",
          text: Copy.get('storyteller') + ' · inventor · ' + Copy.get('educator'),
        },
        menu: {
          display: _IS_MOBILE.as("block", "none"),
          a: SOCIAL_LINKS,
        },
        onready: slideDown,
      },
      nav: {
        style: STYLE.FLEX,
        flexDirection: "column",
        color: "rgb(245, 220, 154)",
        zIndex: 5,
        alignContent: _IS_MOBILE.as("left", "center"),
        height: _IS_MOBILE.as("fit-content", "3.5em"),
        width: _IS_MOBILE.as("fit-content", "100%"),
        backgroundColor: _IS_MOBILE.as(
          "rgba(255,255,255,0.5)",
          "black",
        ),
        padding: _IS_MOBILE.as("4.5em 0.5em 0.5em", "0.5em 0"),
        borderRadius: _IS_MOBILE.as("0.5em", 0),
        margin: _IS_MOBILE.as("2em 0 0 1.1em", 0),
        position: _IS_MOBILE.as("absolute", "relative"),
        a: {
          color: STYLE.COLOR.PAGE,
          width: "5em",
          padding: ".25em",
          margin: "0.2em",
          fontSize: "1.25em",
          textAlign: "center",
          borderRadius: "0.25em",
          fontWeight: "normal",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          content: pageNames.map(name => ({
            backgroundColor: _CURRENT_PAGE.as({
              [name]: STYLE.COLOR.LINK_DARK,
              default: STYLE.COLOR.LINK,
            }),
            display: _IS_MOBILE.as(val => (val || name !== pageNames.slice(-1)[0]) && name !== pageNames[0], "none", "block"),
            boxShadow: bind([_HOVER_PAGE, _CURRENT_PAGE], (over, current) =>
              current === name ?
              STYLE.SHADOW.INSET :
              over === name ?
              STYLE.SHADOW.HIGHLIGHT :
              STYLE.SHADOW.NORMAL
            ),
            href: "#" + name,
            text: Copy.get(name),
            click: e => _CURRENT_PAGE.value = name,
            mouseover: e => _HOVER_PAGE.value = name,
            mouseout: e => _HOVER_PAGE.value = false,
          }))
        },
        onready: slideDown
      },
      article: {
        model: STYLE.FLEX,
        justifyContent: _IS_MOBILE.as("flex-start", "center"),
        minHeight: "607px",
        width: _IS_MOBILE.as("47em", "100%"),
        margin: _IS_MOBILE.as("6em 0 1.5em 9em", "0 0 1em 0"),
        content: _CURRENT_PAGE.as(p => PAGES[p] ? PAGES[p] : undefined),
      },
      footer: {
        padding: "1em",
        backgroundColor: "#11161A",
        color: "gray",
        textAlign: "center",
      },
    },
  },
  onload: setSize,
  onresize: setSize,
});
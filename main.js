import * as STYLE from "./modules/style.js";
import PAGES from "./modules/pages.js";
import INSTAGRAM from "./modules/widgets/instagram.js";
import TWITTER from "./modules/widgets/twitter.js";
import MUSICPLAYER from "./modules/widgets/musicplayer.js";
import SOCIAL_LINKS from "./modules/widgets/social.js";
import slideDown from "./modules/animations/slideDown.js";

window.THIS_URL = window.location.href.split('#')[0].split('?')[0];
const QS = DOM.querystring();
window.LANG = QS.lang ? QS.lang.toUpperCase() : "ENG";

const _isMobile = new Binder();
const _isWide = new Binder();

const _currentPage = new Binder(0);
const _hoverPage = new Binder();
const pageNames = Object.keys(PAGES);
window.tags = new Binder([]);

function setSize(e) {
  _isMobile.value = window.innerWidth < 780;
  _isWide.value = window.innerWidth > 1050;
};
setSize();

if (window.location.hash) _currentPage.value = window.location.hash.split("#")[1].toUpperCase();

const TEXT = {
  bio: {
    ENG: "bio",
    ESP: "bio",
  },
  projects: {
    ENG: "projects",
    ESP: "proyectos",
  },
  bio: {
    ENG: "bio",
    ESP: "bio",
  },
  storyteller: {
    ENG: "storyteller",
    ESP: "cantacuentos",
  },
  educator: {
    ENG: "educator",
    ESP: "educador",
  },
};

DOM.set({
  head: {
    title: "Lenino.net",
    keywords: "lenin, lenino, lenin compres, jackrabbits, jack rabbits, rabbit candy jar, cantacuentos",
    description: "Lenino is a creative storyteller—the affectionate alter-ego of Lenin Compres—an explorer of sience, technology and arts who was born in the Caribbean and has lived in New York City all his “adult” life.",
    link: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
    icon: "assets/icon.png",
  },
  css: {
    a: {
      color: STYLE.COLOR.LINK,
      hover: {
        color: STYLE.COLOR.HIGHLIGHT,
      },
    },
    a_fa: {
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
      maxWidth: _isWide.as("100%", "800px"),
      width: "100%",
      boxShadow: "2px 2px 4px",
      backgroundColor: STYLE.COLOR.BACKGROUND,
      backgroundImage: "url(assets/leninoYourCard.jpg)",
      backgroundSize: _isMobile.as("100%", "initial"),
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
          color: _isMobile.as(STYLE.COLOR.PALE, STYLE.COLOR.LINK_DARK),
          content: [{
            display: window.LANG !== "ENG" ? "block" : "none",
            text: "English »",
            href: THIS_URL,
          }, {
            display: window.LANG !== "ESP" ? "block" : "none",
            text: "Español »",
            href: THIS_URL + "?lang=esp",
          }]
        }
      },
      header: {
        model: [STYLE.PAGE, STYLE.FLEX],
        alignItems: "center",
        placeContent: "center",
        padding: "0.5em",
        zIndex: 10,
        height: "auto",
        position: _isMobile.as("absolute", "relative"),
        width: _isMobile.as("fit-content", "100%"),
        margin: _isMobile.as("1em", 0),
        flexDirection: _isMobile.as("row", "column"),
        borderRadius: _isMobile.as(".5em", 0),
        a: {
          fontSize: "2.3em",
          href: "#home",
          img: {
            src: "assets/leninoLogo.png",
            height: "30",
          },
          span: {
            fontFamily: "title, Georgia, \"Times New Roman\", Times, serif",
            text: "Lenino",
          },
          click: e => _currentPage.value = pageNames[0],
        },
        tagline: {
          margin: "0 .6em",
          text: `${TEXT.storyteller[LANG]} · inventor · ${TEXT.educator[LANG]}`,
        },
        menu: {
          display: _isMobile.as("block", "none"),
          a: SOCIAL_LINKS,
        },
        onready: slideDown,
      },
      nav: {
        style: STYLE.FLEX,
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
        padding: _isMobile.as(
          "4.5em 0.5em 0.5em",
          "0.5em 0"
        ),
        borderRadius: _isMobile.as("0.5em", 0),
        margin: _isMobile.as("2em 0 0 2em", 0),
        position: _isMobile.as("absolute", "relative"),
        a: {
          color: STYLE.COLOR.PAGE,
          width: "4em",
          padding: ".25em",
          margin: "0.25em",
          fontSize: "1.25em",
          textAlign: "center",
          borderRadius: "0.25em",
          fontWeight: "normal",
          content: pageNames.map(name => new Object({
            backgroundColor: _currentPage.as({
              [name]: STYLE.COLOR.LINK_DARK,
              default: STYLE.COLOR.LINK,
            }),
            display: _isMobile.as(
              val => (val || name !== pageNames.slice(-1)[0]) && name !== pageNames[0],
              "none",
              "block",
            ),
            boxShadow: bind(
              [_hoverPage, _currentPage],
              (over, current) =>
              current === name ?
              STYLE.SHADOW.INSET :
              over === name ?
              STYLE.SHADOW.HIGHLIGHT :
              STYLE.SHADOW.NORMAL
            ),
            href: "#" + name,
            text: name.toLowerCase(),
            click: e => _currentPage.value = name,
            mouseover: e => _hoverPage.value = name,
            mouseout: e => _hoverPage.value = false,
          }))
        },
        onready: slideDown
      },
      article: {
        model: STYLE.FLEX,
        justifyContent: _isMobile.as("flex-start", "center"),
        minHeight: "607px",
        width: _isMobile.as("47em", "100%"),
        margin: _isMobile.as("6em 0 1.5em 9em", "0 0 1em 0"),
        content: _currentPage.as(p => PAGES[p] ? PAGES[p](LANG) : undefined),
      },
      footer: {
        padding: "1em",
        backgroundColor: "#11161A",
        color: "gray",
        textAlign: "center",
      },
    },
  },
  onresize: setSize,
});
}

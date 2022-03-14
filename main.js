import * as STYLE from "./style.js";
import PAGES from "./pages.js";
import INSTAGRAM from "./widgets/instagram.js";
import TWITTER from "./widgets/twitter.js";
import MUSICPLAYER from "./widgets/musicplayer.js";
import SOCIAL_LINKS from "./widgets/social.js";
import slideDown from "./animations/slideDown.js";

const isMobile = new Binder();
const isWide = new Binder();
const setSize = e => {
  isMobile.value = window.innerWidth < 780;
  isWide.value = window.innerWidth > 1050;
};
DOM.set(setSize, "onresize");
setSize();


const currentPage = new Binder(0);
const hoverPage = new Binder();
const pageNames = Object.keys(PAGES);
window.tags = new Binder([]);

if (window.location.hash) currentPage.value = window.location.hash.split("#")[1].toUpperCase();

DOM.set({
  title: "Lenino.net",
  charset: "UTF-8",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  keywords: "lenin, lenino, lenin compres, jackrabbits, jack rabbits, rabbit candy jar, cantacuentos",
  description: "Lenino is a creative storyteller—the affectionate alter-ego of Lenin Compres—an explorer of sience, technology and arts who was born in the Caribbean and has lived in New York City all his “adult” life.",
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
  icon: "assets/icon.png",
  link: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
  font: "./assets/markerfeltnormal.ttf",
  fontSize: "14px",
  backgroundColor: "#023",
  section: {
    model: STYLE.FLEX,
    margin: "0 auto",
    maxWidth: "1150px",
    main: {
      position: "relative",
      maxWidth: isWide.bind(["100%", "800px"]),
      width: "100%",
      backgroundColor: STYLE.COLOR.BACKGROUND,
      backgroundImage: "url(assets/leninoYourCard.jpg)",
      backgroundSize: isMobile.bind(["100%", "initial"]),
      backgroundPosition: "center top",
      header: {
        model: [STYLE.PAGE, STYLE.FLEX],
        alignItems: "center",
        placeContent: "center",
        padding: "0.5em",
        zIndex: 10,
        height: "auto",
        position: isMobile.bind(["absolute", "relative"]),
        width: isMobile.bind(["fit-content", "100%"]),
        margin: isMobile.bind(["1em", 0]),
        flexDirection: isMobile.bind(["row", "column"]),
        borderRadius: isMobile.bind([".5em", 0]),
        a: {
          fontSize: "2.3em",
          href: "#home",
          img: {
            src: "assets/icon.png",
            height: "30",
          },
          span: {
            fontFamily: "markerfeltnormal, Georgia, \"Times New Roman\", Times, serif",
            text: "Lenino",
          },
          click: e => currentPage.value = pageNames[0],
        },
        tagline: {
          margin: "0 .6em",
          text: "storyteller · inventor · educator",
        },
        menu: {
          display: isMobile.bind(["block", "none"]),
          a: SOCIAL_LINKS,
        },
        onready: slideDown,
      },
      nav: {
        model: STYLE.FLEX,
        flexDirection: "column",
        color: "rgb(245, 220, 154)",
        zIndex: 5,
        alignContent: isMobile.bind(["left", "center"]),
        height: isMobile.bind(["fit-content", "3.5em"]),
        width: isMobile.bind(["fit-content", "100%"]),
        backgroundColor: isMobile.bind(val => `rgba(${val ? "0,0,0" : "255,255,255"},0.5)`),
        padding: isMobile.bind(["4.5em 0.5em 0.5em", "0.5em 0"]),
        borderRadius: isMobile.bind(["0.5em", 0]),
        margin: isMobile.bind(["2em 0 0 2em", 0]),
        position: isMobile.bind(["absolute", "relative"]),
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
            backgroundColor: currentPage.bind({
              [name]: STYLE.COLOR.LINK_DARK,
              default: STYLE.COLOR.LINK,
            }),
            display: isMobile.bind(val => (val || name !== pageNames.slice(-1)[0]) && name !== pageNames[0] ? "block" : "none"),
            boxShadow: DOM.bind([hoverPage, currentPage], (over, current) =>
              current === name ? STYLE.SHADOW.INSET :
              over === name ? STYLE.SHADOW.HIGHLIGHT :
              STYLE.SHADOW.NORMAL),
            href: "#" + name,
            text: name.toLowerCase(),
            click: e => currentPage.value = name,
            mouseover: e => hoverPage.value = name,
            mouseout: e => hoverPage.value = false,
          }))
        },
        onready: slideDown
      },
      article: {
        model: STYLE.FLEX,
        justifyContent: isMobile.bind(["flex-start", "center"]),
        minHeight: "607px",
        width: isMobile.bind(["47em", "100%"]),
        margin: isMobile.bind(["6em 0 1.5em 9em", "0 0 1em 0"]),
        content: currentPage.bind(p => PAGES[p]),
      },
      footer: {
        backgroundColor: "black",
        paddingTop: "2em",
        iframe: {
          height: isMobile.bind(["760px", "100vh"]),
          width: "100%",
          src: "projects/pre/",
        }
      },
    },
    sidebar: {
      backgroundColor: "white",
      width: isWide.bind(["100%", "350px"]),
      section: {
        overflow: "auto",
        width: "100%",
        height: isMobile.bind(["750px", "100vh"]),
        content: [MUSICPLAYER, TWITTER]
      },
    }
  }
});
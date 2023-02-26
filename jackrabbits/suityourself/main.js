import SuitYourself from "./SuitYourself.js";
import GET_SUITED_TEXT from "./TEXT.js";

const THIS_URL = window.location.href.split('?')[0];
const QS = DOM.querystring();
window.LANG = QS.lang ? QS.lang.toUpperCase() : "ENG";

const MAIN_MENU = {
  width: "100%",
  margin: "0 auto 2.5em",
  maxWidth: "30em",
  height: "1em",
  ul: {
    display: "flex",
    placeContent: "space-around",
    li: {
      content: [{
        display: LANG !== "ENG" ? "block" : "none",
        a: {
          text: "English",
          href: THIS_URL,
        }
      }, {
        display: LANG !== "ESP" ? "block" : "none",
        a: {
          text: "Español",
          href: THIS_URL + "?lang=esp",
        }
      }, {
        a: {
          text: GET_SUITED_TEXT.GET_JK[LANG],
          href: "http://jackrabbits.lenino.net",
        }
      }, {
        a: {
          text: "Lenino.net",
          href: "http://lenino.net",
          img: {
            verticalAlign: "top",
            height: "2em",
            src: "../../assets/leninoLogo.png",
            alt: "Lenino.net"
          },
        }
      }]
    }
  }
};

let game = new SuitYourself();

DOM.style({
  fontFace: [{
    fontFamily: 'title',
    src: '../assets/IrishGrover-Regular.ttf'
  }, {
    fontFamily: 'body',
    src: '../assets/Chalkboard.ttc'
  }],
});

DOM.set({
  meta: "utf-8",
  title: "Jack Rabbits' Suit Yourself",
  viewport: "width=device-width, minimum-scale=1.0, maximum-scale=1.0",
  icon: "images/icon.png",
  background: "silver",
  textAlign: "center",
  fontFamily: "body",
  backgroundColor: " silver",
  backgroundImage: 'url(../images/bg.png)',
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  padding: "1em",
  menu: MAIN_MENU,
  container: game.element,
});
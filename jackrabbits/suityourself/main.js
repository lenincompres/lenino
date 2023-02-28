import TopMenu from "../TopMenu.js";
import TEXT from "./TEXT.js";
import SuitYourself from "./SuitYourself.js";

const QS = DOM.querystring();
const NAME = QS.name ? QS.name : undefined;
const HAND = QS.hand ? QS.hand.split(",").map(n => parseInt(n)) : false;
console.log(HAND, QS.name);

DOM.set({
  meta: "utf-8",
  title: "Jack Rabbits' Suit Yourself",
  viewport: "width=device-width, minimum-scale=1.0, maximum-scale=1.0",
  icon: "../images/icon.png",
  font: [{
    fontFamily: 'title',
    src: '../assets/IrishGrover-Regular.ttf'
  }, {
    fontFamily: 'body',
    src: '../assets/Chalkboard.ttc'
  }],
  margin: "0 auto",
  maxWidth: "50em",
  background: "silver",
  textAlign: "center",
  fontFamily: "body",
  backgroundColor: " silver",
  backgroundImage: 'url(../images/bg.png)',
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  padding: "1em",
  menu: new TopMenu(),
  main: new SuitYourself(undefined, HAND, NAME),
});
import TopMenu from "../TopMenu.js";
import TEXT from "./TEXT.js";
import SuitYourself from "./SuitYourself.js";

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
  script: "//cdn.jsdelivr.net/npm/share-buttons/dist/share-buttons.js",
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
  main: new SuitYourself(),
});
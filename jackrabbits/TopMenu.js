
window.THIS_URL = window.location.href.substr(0, window.location.href.lastIndexOf("/"));

const QS = DOM.querystring();
window.LANG = QS.lang ? QS.lang.toUpperCase() : "ENG";

class TopMenu extends HTMLElement {
  constructor() {
    super();

    this.set({
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
                href: THIS_URL + "/index.html?lang=esp",
              }
            }, {
              a: {
                text: TopMenu.TEXT.JK[LANG],
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
                  alt: "Lenino.net logo"
                },
              }
            }]
          }
        }
      });
    }

    static TEXT ={
      JK: {
        ENG: "Jack Rabbits' Game",
        ESP: "Juego de Jack Rabbits",
      }
    }

  }

  customElements.define("lenino-top-menu", TopMenu);
  
  export default TopMenu;
import SuitYourself from "./suityourself/SuitYourself.js";
import TopMenu from "./TopMenu.js";
import TEXT from "./TEXT.js";

const THIS_URL = window.location.href.split('#')[0].split('?')[0];

const CARD = (front, back, width = 240, height = 340) => {
  const IMG_STYLE = {
    height: height + 'px',
    width: width + 'px',
    boxShadow: '2px 2px 6px',
    borderRadius: '1em',
    display: 'inline-block',
  };
  return {
    textAlign: "center",
    class: "card",
    cursor: 'pointer',
    display: 'inline-block',
    position: 'relative',
    height: height + 'px',
    width: width + 'px',
    div: [{
      class: "front",
      div: {
        style: IMG_STYLE,
        model: front
      }
    }, {
      class: "back",
      div: {
        style: IMG_STYLE,
        model: back
      }
    }],
  }
}

const RANDOM_CARD = (autoFlip = false, delay = 0) => {
  let [x, y, z] = [0, 0, 0];
  let [w, h] = [240, 340];
  const randomize = () => {
    x = Math.floor(Math.random() * 6);
    y = Math.floor(Math.random() * 3);
    z = Math.floor(Math.random() * 3);
  };
  randomize();
  const opened = new Binder(false);
  let counter = -delay;
  let card = CARD({
    backgroundImage: 'url(images/cardBack.png)'
  }, {
    backgroundColor: 'white',
    backgroundImage: opened.bind(val => `url(images/cardFront${z}.png)`),
    backgroundPosition: opened.bind(val => `-${w * x}px -${h * y}px`)
  }, w, h);
  return Object.assign(card, {
    margin: '2px',
    zIndex: opened.bind(val => val ? 0 : 5),
    onclick: e => {
      opened.value = !opened.value;
      if (!opened.value) randomize();
      counter = 1;
    },
    onready: elt => {
      if (!autoFlip) return;
      setInterval(e => !(counter++ % 5) ? elt.click() : null, 500);
    }
  })
}

const JRName = '<b><span class="charm">J</span><span class="fortune">A</span>C<span class="courage">K</span> R<span class="wisdom">A</span>BBITS</b>';

const css = {
  section: {
    margin: '1em 0'
  },
  a: {
    color: "darkblue",
    hover: {
      color: "royalblue",
    }
  },
  h: {
    fontFamily: 'title',
    margin: '1em 0 0 0',
    lineHeight: '1.5em',
    textAlign: 'center',
  },
  h4: {
    margin: 0,
  },
  p: {
    textAlign: "left",
    margin: '0 0 1em 0',
    textIndent: "1.5em",
  },
  i: {
    fontStyle: 'normal'
  },
  big: {
    fontSize: '1.8em'
  },
  b: {
    fontFamily: 'title',
    textShadow: 'black 1px 1px',
  },
  _wisdom: {
    color: 'teal'
  },
  _courage: {
    color: 'darkslateblue'
  },
  _fortune: {
    color: 'darkgoldenrod'
  },
  _charm: {
    color: 'brown'
  },
};

const LAUNCH_EVENT = {
  background: "darkgreen",
  borderRadius: "0.5em",
  boxShadow: "1px 1px 3px black",
  color: "ivory",
  a: {
    src: "https://www.eventbrite.com/e/jack-rabbits-launch-event-tickets-599686116317",
    img: {
      src: "assets/cover.png",
      width: "100%",
    }
  },
  overflow: "hidden",
  p: {
    padding: "0 2em",
    content: TEXT.LAUNCH_DESCRIPTION[LANG]
  }
};

const MAILING_LIST = {
  padding: "0 1em",
  background: "darkgreen",
  borderRadius: "0.5em",
  boxShadow: "1px 1px 3px black",
  h2: {
  padding: "0.25em",
    text: TEXT.SUBSCRIBE[LANG],
  },
  backgroundColor: "ivory",
  paddingBottom: "1em",
  iframe: {
    src: "mailinglist.html",
    width: "100%",
    height: "auto",
  }
}

const TABLETOPIA = {
  h2: TEXT.TABLETOPIA.TITLE[LANG],
  a: {
    href: "https://tabletopia.com/games/jack-rabbits",
    target: "_blank",
    img: {
      width: "100%",
      src: "images/tabletopia_link.png",
    }
  },
  p: TEXT.TABLETOPIA.INFO[LANG]
};

const GALLERY = {
  img: {
    src: "images/photo1.jpg",
    width: "100%",
    height: "auto",
    alt: "game board",
  },
};

const FOOTER = {
  h2: {
    a: {
      href: "assets/instructions.pdf",
      target: "_blank",
      text: TEXT.INSTRUCTIONS[LANG],
    }
  },
  p: TEXT.FOLLOW_US[LANG],
  section: {
    textAlign: "center",
    a: {
      display: "block",
      href: "http://lenino.net",
      target: "_blank",
      img: {
        width: "4em",
        src: "../assets/leninoLogo.png",
        alt: "Lenino.net"
      },
      div: "Lenino.net",
    }
  }
};

const CARD_FLIP = {
  div: [RANDOM_CARD(true), RANDOM_CARD(true, 1)],
  h4: TEXT.CATCH_PRHASE[LANG],
};

DOM.set({
  font: [{
    fontFamily: 'title',
    src: 'url("assets/IrishGrover-Regular.ttf")'
  }, {
    fontFamily: 'body',
    src: 'url("assets/Chalkboard.ttc")'
  }],
  meta: "utf-8",
  title: "Lenino's Jack Rabbits",
  viewport: "width=device-width, minimum-scale=1.0, maximum-scale=1.0",
  icon: "images/icon.png",
  css: css,
  width: '100%',
  height: '100%',
  padding: '1.5em',
  margin: '0px',
  overflowX: "hidden",
  backgroundColor: '#EBEBD5',
  backgroundImage: 'url(images/bg.png)',
  fontFamily: "body",
  fontSize: "16px",
  textAlign: "center",
  header: new TopMenu(),
  main: {
    maxWidth: '680px',
    margin: '0 auto',
    padding: '0 0 10px',
    section: [
      LAUNCH_EVENT,
      MAILING_LIST,
      {
        h4: TEXT.SUBTITLE[LANG],
      }, {
        p: `Lenino's ${JRName} ` + TEXT.INTRO[LANG],
      }, {
        margin: "0 -10em",
        div: CARD({
          background: 'url(images/splash.png) center center no-repeat',
          backgroundColor: 'lightgoldenrodyellow'
        }, {}, 490)
      }, {
        p: TEXT.CONTAINS[LANG],
      },
      TABLETOPIA,
      CARD_FLIP,
      new SuitYourself(THIS_URL + "/suityourself/"),
      GALLERY,
      FOOTER
    ]
  },
  onload: e => $(".card").flip(),
});
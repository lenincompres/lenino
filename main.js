import * as STYLE from './style.js';
import PAGES from './pages.js';
import INSTAGRAM from './widgets/instagram.js';
import TWITTER from './widgets/twitter.js';
import MUSICPLAYER from './widgets/musicplayer.js';
import SOCIAL_LINKS from './widgets/social.js';
import slideDown from './animations/slideDown.js';

const isMobile = new Binder(window.innerWidth < 850);
const currentPage = new Binder(0);
const hoverPage = new Binder();
const pageNames = Object.keys(PAGES);
window.tags = new Binder([]);

if (window.location.hash) currentPage.value = window.location.hash.split('#')[1].toUpperCase();

DOM.style({
  a: {
    color: STYLE.COLOR.LINK,
    hover: {
      color: STYLE.COLOR.HIGHLIGHT
    },
  },
  a_fa: {
    color: 'white',
    width: '2em',
    height: '2em',
    padding: '0.5em',
    margin: '0 0.25em',
    textAlign: 'center',
    borderRadius: '0.25em',
    verticalAlign: 'text-bottom',
    boxShadow: STYLE.SHADOW.NORMAL,
    hover: {
      boxShadow: STYLE.SHADOW.HIGHLIGHT
    }
  }
});

DOM.set({
  title: 'Lenino.net',
  charset: 'UTF-8',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  keywords: 'lenin, lenino, lenin compres, jackrabbits, jack rabbits, rabbit candy jar, cantacuentos',
  description: 'Lenino is a creative storyteller—the affectionate alter-ego of Lenin Compres—an explorer of sience, technology and arts who was born in the Caribbean and has lived in New York City all his "adult" life.',
  icon: 'assets/icon.png',
  link: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
  font: './assets/markerfeltnormal.ttf',
  fontSize: '14px',
  backgroundColor: '#023',
  div: {
    model: STYLE.FLEX,
    margin: '0 auto',
    maxWidth: '1150px',
    main: {
      position: 'relative',
      maxWidth: '800px',
      width: '100%',
      backgroundColor: STYLE.COLOR.BACKGROUND,
      backgroundImage: 'url(assets/leninoYourCard.jpg)',
      backgroundSize: isMobile.bind(val => val ? 'initial' : '100%'),
      backgroundPosition: 'center top',
      header: {
        model: [STYLE.PAGE, STYLE.FLEX],
        alignItems: 'center',
        placeContent: 'center',
        padding: '0.5em',
        zIndex: 10,
        height: 'auto',
        position: isMobile.bind(val => val ? 'relative' : 'absolute'),
        width: isMobile.bind(val => val ? '100%' : 'fit-content'),
        margin: isMobile.bind(val => val ? 0 : '1em'),
        flexDirection: isMobile.bind(val => val ? 'column' : 'row'),
        borderRadius: isMobile.bind(val => val ? 0 : '.5em'),
        a: {
          fontSize: '2.3em',
          href: '#home',
          img: {
            src: 'assets/icon.png',
            height: '30'
          },
          span: {
            fontFamily: 'markerfeltnormal, Georgia, "Times New Roman", Times, serif',
            text: 'Lenino'
          },
          click: e => currentPage.value = pageNames[0]
        },
        tagline: {
          margin: '0 .6em',
          text: 'storyteller · inventor · educator'
        },
        menu: {
          display: isMobile.bind(val => val ? 'none' : 'block'),
          a: SOCIAL_LINKS
        },
        onready: slideDown
      },
      nav: {
        model: STYLE.FLEX,
        flexDirection: 'column',
        color: 'rgb(245, 220, 154)',
        zIndex: 5,
        alignContent: isMobile.bind(val => val ? 'center' : 'left'),
        height: isMobile.bind(val => val ? '3.5em' : 'fit-content'),
        width: isMobile.bind(val => val ? '100%' : 'fit-content'),
        backgroundColor: isMobile.bind(val => `rgba(${val ? '0,0,0' : '255,255,255'},0.5)`),
        padding: isMobile.bind(val => val ? '0.5em 0' : '4.5em 0.5em 0.5em'),
        borderRadius: isMobile.bind(val => val ? 0 : '0.5em'),
        margin: isMobile.bind(val => val ? 0 : '2em 0 0 2em'),
        position: isMobile.bind(val => val ? 'relative' : 'absolute'),
        a: {
          color: STYLE.COLOR.PAGE,
          width: '4em',
          padding: '.25em',
          margin: '0.25em',
          fontSize: '1.25em',
          textAlign: 'center',
          borderRadius: '0.25em',
          fontWeight: 'normal',
          content: pageNames.map(name => new Object({
            backgroundColor: currentPage.bind(current => current === name ? STYLE.COLOR.LINK_DARK : STYLE.COLOR.LINK),
            display: isMobile.bind(val => (val || name !== pageNames.slice(-1)[0]) && name !== pageNames[0] ? 'block' : 'none'),
            boxShadow: DOM.bind([hoverPage, currentPage], (over, current) =>
              current === name ? STYLE.SHADOW.INSET :
              over === name ? STYLE.SHADOW.HIGHLIGHT :
              STYLE.SHADOW.NORMAL),
            href: '#' + name,
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
        justifyContent: isMobile.bind(val => val ? 'center' : 'flex-start'),
        minHeight: isMobile.bind(val => val ? '600px' : '815px'),
        width: isMobile.bind(val => val ? '100%' : '47em'),
        margin: isMobile.bind(val => val ? 0 : '6em 0 0 9em'),
        content: currentPage.bind(p => PAGES[p])
      },
      footer: INSTAGRAM,
    },
    sidebar: {
      backgroundColor: 'white',
      width: isMobile.bind(val => val ? '100%' : '350px'),
      section: [MUSICPLAYER, TWITTER]
    }
  },
  onresize: e => isMobile.value = window.innerWidth < 850
});
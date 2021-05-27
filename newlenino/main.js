import * as STYLE from './modules/style.js'
import PAGES from './modules/pages.js'
import INSTAGRAM from './modules/widgets/instagram.js'
import TWITTER from './modules/widgets/twitter.js'
import MUSICPLAYER from './modules/widgets/musicplayer.js'
import SOCIAL_LINKS from './modules/widgets/social.js'
import slideDown from './modules/animations/slideDown.js'

const isMobile = new Binder(window.innerWidth < 850);
const currentPage = new Binder(0);;
const hoverPage = new Binder();
const pageNames = Object.keys(PAGES);

if (window.location.hash) currentPage.value = window.location.hash.split('#')[1].toUpperCase()

DOM.create({
  title: 'Lenino.net',
  charset: 'UTF-8',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  keywords: 'lenin, lenino, lenin compres, jackrabbits, jack rabbits, rabbit candy jar, cantacuentos',
  description: 'Lenino is a creative storyteller—the affectionate alter-ego of Lenin Compres—an explorer of sience, technology and arts who was born in the Caribbean and has lived in New York City all his "adult" life. His studies range from telecommunication engineering and interactive media to cognitive studies in education. His trainings range from acting and scriptwriting to modern dance and vocals. He is a self-taught piano player and a self-professed nerd—a post-modern renaissance man.',
  icon: 'assets/icon.png',
  link: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
  font: './assets/markerfeltnormal.ttf',
  style: {
    a: {
      color: STYLE.COLOR.LINK,
      hover: {
        color: STYLE.COLOR.HIGHLIGHT
      },
      _fa: {
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
    }
  },
  fontSize: '14px',
  backgroundColor: '#023',
  div: {
    style: STYLE.FLEX,
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
        style: [STYLE.PAGE, STYLE.FLEX],
        flexDirection: isMobile.bind(val => val ? 'column' : 'row'),
        alignContent: 'center',
        height: isMobile.bind(val => val ? '4em' : 'auto'),
        alignItems: 'flex-end',
        position: isMobile.bind(val => val ? 'relative' : 'absolute'),
        width: isMobile.bind(val => val ? '100%' : 'fit-content'),
        padding: '0.5em',
        margin: isMobile.bind(val => val ? 0 : '1em'),
        zIndex: 10,
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
            content: 'Lenino'
          },
          click: e => currentPage.value = pageNames[0]
        },
        tagline: {
          padding: '.2em .6em',
          content: '<b>Cantacuentos</b></br>storyteller · inventor · educator'
        },
        menu: {
          display: isMobile.bind(val => val ? 'none' : 'bock'),
          a: SOCIAL_LINKS
        },
        onready: slideDown
      },
      nav: {
        style: STYLE.FLEX,
        flexDirection: 'column',
        alignContent: isMobile.bind(val => val ? 'center' : 'left'),
        height: isMobile.bind(val => val ? '3.5em' : 'fit-content'),
        width: isMobile.bind(val => val ? '100%' : 'fit-content'),
        backgroundColor: isMobile.bind(val => `rgba(${val ? '0,0,0' : '255,255,255'},0.5)`),
        padding: isMobile.bind(val => val ? '0.5em 0' : '5.75em 0.5em 0.5em'),
        zIndex: 5,
        borderRadius: isMobile.bind(val => val ? 0 : '0.5em'),
        color: 'rgb(245, 220, 154)',
        margin: isMobile.bind(val => val ? 0 : '0.25em 0 0 2em'),
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
        style: STYLE.FLEX,
        flexDirection: isMobile.bind(val => val ? 'column' : 'row'),
        alignContent: isMobile.bind(val => val ? 'center' : 'start'),
        minHeight: isMobile.bind(val => val ? '600px' : '815px'),
        width: isMobile.bind(val => val ? '100%' : '47em'),
        margin: isMobile.bind(val => val ? 0 : '6em 0 0 9em'),
        content: currentPage.bind(p => PAGES[p])
      },
      div: INSTAGRAM,
    },
    sidebar: {
      width: isMobile.bind(val => val ? '100%' : '350px'),
      backgroundColor: 'white',
      section: [MUSICPLAYER, TWITTER]
    }
  },
  onresize: e => isMobile.value = window.innerWidth < 850
});
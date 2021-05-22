import * as STYLE from './modules/style.js'
import PAGES from './modules/pages.js'
import INSTAGRAM from './modules/widgets/instagram.js'
import TWITTER from './modules/widgets/twitter.js'
import MUSICPLAYER from './modules/widgets/musicplayer.js'
import SOCIAL_LINKS from './modules/widgets/social.js'
import slideDown from './modules/animations/slideDown.js'


const isMobile = new Binder(window.innerWidth < 850);
window.addEventListener('resize', e => isMobile.value = window.innerWidth < 850);

const currentPage = new Binder();
if (window.location.hash) currentPage.value = window.location.hash.split('#')[1].toUpperCase();

const navHover = new Binder();

var pageNames = Object.keys(PAGES);

DOM.create({

  div_container: {
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
        flexDirection: isMobile.bind(val => val ? 'column' : undefined),
        alignContent: isMobile.bind(val => val ? 'center' : undefined),
        height: isMobile.bind(val => val ? '4em' : undefined),
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
          img_logo: {
            src: 'assets/icon.png',
            height: '30'
          },
          span: {
            fontFamily: 'markerfeltnormal, Georgia, "Times New Roman", Times, serif',
            content: 'Lenino'
          },
          onclick: e => currentPage.value = pageNames[0]
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
        height: isMobile.bind(val => val ? '4em' : 'fit-content'),
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
            backgroundColor: DOM.bind(currentPage, current => current === name ? STYLE.COLOR.LINK_DARK : STYLE.COLOR.LINK),
            display: isMobile.bind(val => (val || name !== pageNames.slice(-1)[0]) && name !== pageNames[0] ? 'block' : 'none'),
            boxShadow: DOM.bind([navHover, currentPage], (over, current) =>
              current === name ? STYLE.SHADOW.INSET :
              over === name ? STYLE.SHADOW.HIGHLIGHT :
              STYLE.SHADOW.NORMAL),
            href: '#' + name,
            text: name.toLowerCase(),
            onclick: e => currentPage.value = name,
            onmouseover: e => navHover.value = name,
            onmouseout: e => navHover.value = false,
          }))
        },

        onready: slideDown
      },

      article: {
        style: STYLE.FLEX,
        flexDirection: isMobile.bind(val => val ? 'column' : 'row'),
        alignContent: isMobile.bind(val => val ? 'center' : undefined),
        minHeight: isMobile.bind(val => val ? '600px' : '815px'),
        width: isMobile.bind(val => val ? '100%' : '47em'),
        margin: isMobile.bind(val => val ? 0 : '6em 0 0 9em'),
        content: DOM.bind(currentPage, p => PAGES[p], PAGES[0])
      },

      div: INSTAGRAM,
    },

    sidebar: {
      width: isMobile.bind(val => val ? '100%' : '350px'),
      backgroundColor: 'white',
      section: [MUSICPLAYER, TWITTER]
    }
  }
});
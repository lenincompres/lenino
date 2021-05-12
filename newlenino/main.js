import {
  COLOR,
  STYLE,
  SHADOW
} from './modules/style.js'
import PAGES from './modules/pages.js'
import INSTAGRAM from './modules/widgets/instagram.js'
import TWITTER from './modules/widgets/twitter.js'
import MUSICPLAYER from './modules/widgets/musicplayer.js'
import SOCIAL_LINKS from './modules/widgets/social.js'
import slideDown from './modules/animations/slideDown.js'

var pageNames = Object.keys(PAGES);
var BREAK_POINT = window.innerWidth < 850;

domify({

  div_container: {
    style: STYLE.FLEX,
    margin: '0 auto',
    maxWidth: '1150px',

    main: {
      position: 'relative',
      maxWidth: '800px',
      width: '100%',
      backgroundColor: COLOR.BACKGROUND,
      backgroundImage: 'url(assets/leninoYourCard.jpg)',
      backgroundSize: BREAK_POINT ? 'initial' : '100%',
      backgroundPosition: 'center top',

      header: {
        style: [STYLE.PAGE, STYLE.FLEX],
        flexDirection: BREAK_POINT ? 'column' : undefined,
        alignContent: BREAK_POINT ? 'center' : undefined,
        height: BREAK_POINT ? '4em' : undefined,
        alignItems: 'flex-end',
        position: BREAK_POINT ? 'relative' : 'absolute',
        width: BREAK_POINT ? '100%' : 'fit-content',
        padding: '0.5em',
        margin: BREAK_POINT ? 0 : '1em',
        zIndex: 10,
        borderRadius: BREAK_POINT ? 0 : '.5em',

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
          display: BREAK_POINT ? 'none' : 'bock',
          a: SOCIAL_LINKS
        },

        onready: slideDown
      },

      nav: {
        style: STYLE.FLEX,
        flexDirection: 'column',
        alignContent: BREAK_POINT ? 'center' : 'left',
        height: BREAK_POINT ? '4em' : 'fit-content',
        width: BREAK_POINT ? '100%' : 'fit-content',
        backgroundColor: `rgba(${BREAK_POINT ? '0,0,0' : '255,255,255'},0.5)`,
        padding: BREAK_POINT ? '0.5em 0' : '5.75em 0.5em 0.5em',
        zIndex: 5,
        borderRadius: BREAK_POINT ? 0 : '0.5em',
        color: 'rgb(245, 220, 154)',
        margin: BREAK_POINT ? 0 : '0.25em 0 0 2em',
        position: BREAK_POINT ? 'relative' : 'absolute',

        a: {
          color: COLOR.PAGE,
          width: '4em',
          padding: '.25em',
          margin: '0.25em',
          fontSize: '1.25em',
          textAlign: 'center',
          borderRadius: '0.25em',
          fontWeight: 'normal',

          content: pageNames.map(name => new Object({
            backgroundColor: dombind('currentPage', current => current === name ? COLOR.LINK_DARK : COLOR.LINK),
            display: name !== pageNames[0] && (BREAK_POINT || (name !== pageNames.slice(-1)[0])) ? 'block' : 'none',
            boxShadow: dombind(['navHover', 'currentPage'], (over, current) =>
              current === name ? SHADOW.INSET :
              over === name ? SHADOW.HIGHLIGHT :
              SHADOW.NORMAL),

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
        flexDirection: BREAK_POINT ? 'column' : 'row',
        alignContent: BREAK_POINT ? 'center' : undefined,
        minHeight: BREAK_POINT ? '600px' : '815px',
        width: BREAK_POINT ? '100%' : '47em',
        margin: BREAK_POINT ? 0 : '6em 0 0 9em',
        content: dombind('currentPage', p => PAGES[p], PAGES[0])
      },

      div: INSTAGRAM,
    },

    sidebar: {
      width: BREAK_POINT ? '100%' : '350px',
      backgroundColor: 'white',
      section: [MUSICPLAYER, TWITTER]
    }
  }
});

if (window.location.hash) currentPage.value = window.location.hash.split('#')[1].toUpperCase();
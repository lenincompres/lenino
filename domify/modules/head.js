import STYLE from './styles.js'

document.head.domify({
  title: 'Domify | A Simple Sample',
  meta: [{
    charset: 'UTF-8'
  }, {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0'
  }],
  link: {
    rel: 'icon',
    href: 'assets/icon.ico'
  },
  style: [CSS_RESET, {
    'h1, p, article ul': STYLE.PARAGRAPH,
    h1: {
      fontSize: '1.5em',
      marginTop: '1em'
    },
    small: {
      fontSize: '0.75em'
    },
    b: {
      fontWeight: 'bold'
    },
    i: {
      fontFamily: 'courier',
      background: STYLE.COLOR.LIGHT,
      padding: '0.5em'
    },
    a: [STYLE.LINK, {
      hover: {
        color: STYLE.COLOR.PRIMARY,
        textDecoration: 'underline'
      }
    }],
    nav:{
      a: [STYLE.MENU_LINK, {
        hover: {
          color: STYLE.COLOR.PRIMARY,
          textDecoration: 'underline'
        }
      }]
    },
    pre: STYLE.CODE,
    article: {
      ul: {
        marginLeft: '2em',
        li: {
          textIndent: 0,
          before: {
            position: 'relative',
            content: '"•"',
            marginLeft: '-1em',
            marginRight: '0.5em'
          }
        }
      }
    },
    button: [STYLE.LINK, STYLE.BUTTON]
  }]
});
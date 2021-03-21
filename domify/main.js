import {
  STYLE,
  CSS,
  COLOR
} from './modules/styles.js'
import PAGES from './modules/pages.js'

domify({
  style: 'font: 14px tahoma; padding: 1em',
  backgroundImage: 'url(assets/background.jpeg)',
  main: {
    style: STYLE.PAGE,
    header: {
      padding: '0.2em 2em 1em',
      color: COLOR.PALE,
      backgroundColor: COLOR.DARK,
      button: {
        float: 'right',
        marginTop: '1em',
        innerText: 'Repo',
        onclick: function () {
          window.open('https://github.com/lenincompres/domify', '_blank');
        }
      },
      h1: 'Domify | <small>A Simple Sample</small>'
    },
    nav: {
      background: COLOR.PALE,
      padding: '0.7em 0 0 1em',
      a: PAGES.map((page, index) => {
        let a = {
          innerText: page.data,
          onclick: e => currentPage.value = index,
          background: {
            bind: 'currentPage',
            onvalue: value => value === index ? 'white' : 'none'
          }
        };
        return a;
      })
    },
    article: {
      margin: '2em',
      html: {
        bind: 'currentPage',
        value: 0,
        onvalue: value => PAGES[value]
      }
    },
    menu: {
      margin: '1em',
      height: '2em',
      paddingTop: '1em',
      borderTop: '1px solid ' + COLOR.MILD,
      button: [{
        float: 'left',
        text: 'Back',
        onclick: e => currentPage.value -= 1,
        display: {
          bind: 'currentPage',
          onvalue: value => value > 0 ? 'block' : 'none'
        }
      }, {
        float: 'right',
        text: 'Next',
        onclick: e => currentPage.value += 1,
        display: {
          bind: 'currentPage',
          onvalue: value => value < PAGES.length - 1 ? 'block' : 'none'
        }
      }]
    },
    footer: {
      style: STYLE.DARK,
      span: 'by ',
      a: {
        color: COLOR.MILD,
        target: '_bank',
        href: 'http://lenino.net',
        text: 'Lenin Comprés'
      }
    }
  },
  css: CSS,
});
import {
  STYLE,
  CSS,
  COLOR
} from './modules/styles.js'
import PAGES from './modules/pages.js'

domify({
  style: {
    lang: 'css',
    content: CSS
  },
  main: {
    style: STYLE.PAGE,
    header: {
      style: {
        padding: '0.2em 2em 1em',
        color: COLOR.PALE,
        backgroundColor: COLOR.DARK
      },
      button: {
        style: 'float: right; margin-top: 1em',
        text: 'Repo',
        onclick: function () {
          window.open('https://github.com/lenincompres/domify', '_blank');
        }
      },
      h1: 'Domify | <small>A Simple Sample</small>'
    },
    nav: {
      padding: '0.7em 0 0 1em',
      backgroundColor: COLOR.PALE,
      a: PAGES.map((page, index) => {
        let a = {
          text: page.data,
          onclick: e => currentPage.value = index,
          background: dombind('currentPage', val => val === index ? 'white' : 'none')
        };
        return a;
      })
    },
    article: {
      margin: '2em',
      content: dombind('currentPage', val => PAGES[val], 0)
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
        display: dombind('currentPage', val => val > 0 ? 'block' : 'none')
      }, {
        float: 'right',
        text: 'Next',
        onclick: e => currentPage.value += 1,
        display: dombind('currentPage', val => val < PAGES.length - 1 ? 'block' : 'none')
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
});
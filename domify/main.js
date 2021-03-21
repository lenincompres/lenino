import STYLE from './modules/styles.js'
import pages from './modules/pages.js'
import './modules/head.js'

domify({
  style: 'font: 14px tahoma; padding: 1em',
  backgroundImage: 'url(assets/background.jpeg)',
  main: {
    style: STYLE.PAGE,
    header: {
      style: {
        padding: '0.2em 2em 1em',
        color: STYLE.COLOR.PALE,
        backgroundColor: STYLE.COLOR.DARK
      },
      button: {
        float: 'right',
        marginTop: '1em',
        innerText: 'Repo',
        onclick: function(){
          window.open('https://github.com/lenincompres/domify', '_blank');
        }
      },
      h1: 'Domify | <small>A Simple Sample</small>'
    },
    nav: {
      background: STYLE.COLOR.PALE,
      padding: '0.7em 0 0 1em',
      a: pages.map((page, index) => {
        let a = {
          text: page.link,
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
        onvalue: value => pages[value]
      }
    },
    menu: {
      margin: '1em',
      height: '2em',
      paddingTop: '1em',
      borderTop: '1px solid ' + STYLE.COLOR.MILD,
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
          onvalue: value => value < pages.length - 1 ? 'block' : 'none'
        }
      }]
    },
    footer: {
      style: STYLE.DARK,
      span: 'by ',
      a: {
        color: STYLE.COLOR.MILD,
        target: '_bank',
        href: 'http://lenino.net',
        text: 'Lenin Comprés'
      }
    }
  },
});
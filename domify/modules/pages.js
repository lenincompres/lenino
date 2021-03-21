const PAGES = [{
    data: 'Home',
    h1: 'Let\'s Domify Things',
    div: [{
      p: 'Javascript is so powerful that it\'s about time we retire HTML, CSS and pretty much all JS frameworks.'
    }, {
      p: 'Here is all the HTML you need on your <i>index.html</i> file.'
    }, {
      pre: {
        text: `<script src="lib/domify.js"></script>`
      }
    }, {
      p: 'Is this unsettling? Do you want to be fancy? OK, then do this:'
    }, {
      pre: {
        text: `<!DOCUMENT>
<html>
  <head>
    <script src="lib/domify.js"></script>
  </head>
  <body>
  </body>
</html>`
      }
    }, {
      p: 'Now, let\'s make a webpage. Here is some code you can put in a file called <i>main.js</i>, which is the default <b>entry point</b> for our javascript code.'
    }, {
      pre: {
        text: `domify({
  main: {
    header: {
      h1: 'Domify | <small>A Simple Sample</small>'
    },
    nav: {
      a: ['Home','Elements', 'Head', 'Binding', 'Glossary', 'P5 js']
    },
    article: {
      h1: 'Let's Domify Things',
      p: 'Javascript is so powerful...'
    },
    menu: {
      button: ['Back', 'Next']
    }
    footer: {
      span: 'by Lenin Comprés'
    }
  },
});`
      }
    }, {
      p: 'The domify function creates a DOM structure in the document.body based on a JS structural object. It recognizes object names as tags of child elements, and creates the same hierarchy. String values will become the HTML content of the element. And when given an array, domify creates several elements of that tag—as in <i>nav a</i>.'
    }, {
      p: 'Of course, that\s not it. Domify also recognizes <b>attributes</b>, <b>styles</b> and <b>event handlers</b>. Check this out.'
    }, {
      pre: `/* assume we have these constant objects (STYLE, CSS, COLOR, PAGES) 
from a module, json file, or declared before in the code.*/

domify({
  style: 'font: 14px tahoma; padding: 1em',
  main: {
    style: STYLE.PAGE,
    header: {
      style: {
        padding: '0.2em 2em 1em',
        color: COLOR.PALE,
        backgroundColor: COLOR.DARK
      },
      button: {
        float: 'right',
        marginTop: '1em',
        text: 'Repo',
        onclick: function () {
          window.open('https://github.com/lenincompres/domify', '_blank');
        }
      },
      h1: 'Domify | &lt;small>A Simple Sample&lt;/small>'
    },
    nav: {
      background: COLOR.PALE,
      padding: '0.7em 0 0 1em',
      a: PAGES.map((page, index) => {
        let a = {
          text: page.data,
          onclick: () => currentPage.value = index,
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
        onclick: () => currentPage.value -= 1,
        display: {
          bind: 'currentPage',
          onvalue: value => value > 0 ? 'block' : 'none'
        }
      }, {
        float: 'right',
        text: 'Next',
        onclick: () => currentPage.value += 1,
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
  backgroundImage: 'url(assets/background.jpeg)',
  css: CSS
});`
    }, {
      p: ['This is the actual code for this very tutorial website. The <a onclick="currentPage.value += 1">following pages</a> will unpack this code.','But, if you are an experienced web developer, here are some highlights you may want to look back and notice.'],
      ul: {
        li: [
          'The <i>style</i> attribute can be assigned as a CSS string. See first <i>style</i>.',
          'Or, it can be a previously declared in a variable. See the <i>main</i>.',
          'The style properties could be an object with <b>camelCase</b> properties. See the <i>header</i>.',
          'Conversely, you may assign style properties directly using <b>camelCase</b>. See the first <i>button</i>.',
          'Event handlers can be declared right on the structural object—see instances of <i>onclick:</i>. They can also be assigned a method.',
          'You can bind the <b>content</b>, <b>styles</b> and <b>attributes</b> of an element (or several ones) to a global variable. See instances of <i>bind:</i>.'
        ]
      }
    }]
  },
  {
    data: 'Elements',
    h1: 'Create elements by giving them and ID',
    p: 'Coming soon.'
  },
  {
    data: 'Head & Styles',
    h1: 'Domify can be called to set up the document\s head',
    p: 'Coming soon.'
  },
  {
    data: 'Binding',
    h1: 'This is pretty nifty',
    p: 'Coming soon.'
  },
  {
    data: 'Glossary',
    h1: 'What if a word is an Atrtribute, Style and Tag?',
    p: 'Coming soon.'
  },
  {
    data: 'P5.js',
    h1: 'Yes, you can domify P5.js elements',
    div: [{
      p: ['Don\'t know what P5.js is? Then <a href="https://p5js.org/" target="_blank">get to know</a>.',
        'But basically that\'s it. If you call <i>p5.domify</i>, or if you call the <i>domify</i> method from a p5.Element, then all elements created in the dom structure will be p5 Elements. And you may set up their event triggers and methods right on the domify calls. Like so...'
      ]
    }]
  }
];

export default PAGES;
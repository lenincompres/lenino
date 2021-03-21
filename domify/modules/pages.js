let pages = [{
    link: 'Home',
    h1: 'Let\'s Domify Things',
    div: [{
      p: 'Javascript is so powerful that it\'s about time we retire HTML, CSS and pretty much all JS frameworks.'
    }, {
      p: 'Here is all the HTML you may ever need on your <i>index.html</i> index file.'
    }, {
      pre: {
        text: `<script src="lib/domify.js"></script>
<script type="module" src="main.js"></script>`
      }
    }, {
      p: 'Virtually all browsers know how to complete the rest. But, if you want to be fancy, then do...'
    }, {
      pre: {
        text: `<!DOCUMENT>
<html>
  <head>
    <script src="lib/domify.js"></script>
  </head>
  <body>
    <script type="module" src="main.js"></script>
  </body>
</html>`
      }
    }, {
      p: 'The library dependecies can be added in the <i>head</i> tag, and the code for the webpage/webapp in the <i>body</i> tag. Now, let\'s make a webpage. Here is some code you can put in that <i>main.js</i> file.'
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
      p: 'The domify function creates a DOM structure in the document.body based on a JS structural object. It recognizes object names as tags of child elements and creates then in he same structural hierarchy. If provided with a string, this becomes the HTML content of the elemt. And when given an array, it will create several elements of that tag.'
    }, {
      p: 'But not only that, domify also recognizes attributes, styles and () triggers. Check this out.'
    }, {
      pre: `import <b>STYLE</b> from './modules/styles.js'
import <b>pages</b> from './modules/<b>pages</b>.js'

domify({
  style: 'font: 14px tahoma; padding: 1em',
  main: {
    style: <b>STYLE</b>.PAGE,
    header: {
      style: {
        padding: '0.2em 2em 1em',
        color: <b>STYLE.COLOR</b>.PALE,
        backgroundColor: <b>STYLE.COLOR</b>.DARK
      },
      button: {
        float: 'right',
        marginTop: '1em',
        innerText: 'Repo',
        onclick: function(){
          window.open('https://github.com/lenincompres/domify', '_blank');
        }
      },
      h1: 'Domify | &lt;small>A Simple Sample&lt;/small>'
    },
    nav: {
      background: <b>STYLE.COLOR</b>.PALE,
      padding: '0.7em 0 0 1em',
      a: <b>pages</b>.map((page, index) => {
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
        onvalue: value => <b>pages</b>[value]
      }
    },
    menu: {
      margin: '1em',
      height: '2em',
      paddingTop: '1em',
      borderTop: '1px solid ' + <b>STYLE.COLOR</b>.MILD,
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
          onvalue: value => value < <b>pages</b>.length - 1 ? 'block' : 'none'
        }
      }]
    },
    footer: {
      style: <b>STYLE</b>.DARK,
      span: 'by ',
      a: {
        color: <b>STYLE.COLOR</b>.MILD,
        target: '_bank',
        href: 'http://lenino.net',
        text: 'Lenin Comprés'
      }
    }
  },
});`
    }, {
      p: 'This is the core code for this very tutorial website. The following pages will unpack this code. But, if you are an experienced web developer, here are the highlights you may want to look back and notice.',
      ul: {
        li: [
          'The <i>style</i> attribute can be assigned as a string directly. See first <i>style</i>.',
          'Or it can be an object containing all the individual style propertiesin camelCase. See the <i>main</i>.',
          'Conversely, you may skip the <i>style</i> object and assign althogether the style properties directly. See the <i>header</i>.',
          'If an object is an array, domify knows to create several elements. Or, in the case of an array of style objects, consolidate all the styles in them. See the <i>nav</i>.',
          'You may defined variables to hold things like colors, values or whole objects to assign to you new elements. See wherever <i><b>STYLE.COLOR</b></i> or <i><b>STYLE</b></i> constants are invoked.',
          'You can bind properties, styles and attributes of an element (or several ones) to a global variable. See wherever you find <i>bind</i>.'
        ]
      }
    }]
  },
  {
    link: 'Elements',
    h1: 'Create elements by giving them and ID',
    p: 'Coming soon.'
  },
  {
    link: 'Head',
    h1: 'Domify can be called to set up the document\s head',
    p: 'Coming soon.'
  },
  {
    link: 'Binding',
    h1: 'This is pretty nifty',
    p: 'Coming soon.'
  },
  {
    link: 'Glossary',
    h1: 'What if a word is an Atrtribute, Style and Tag?',
    p: 'Coming soon.'
  },
  {
    link: 'P5 js',
    h1: 'Yes, there\'s p5.domify',
    p: 'Coming soon.'
  }
];

export default pages;
const PAGES = [{
    data: 'Home',
    h1: 'Let\'s Domify Things',
    div: [{
      p: 'Javascript is so powerful that it could retire HTML, CSS and pretty much all JS frameworks.'
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
      p: 'Now, let\'s make a webpage. Here is some code you can put in a file called <i>main.js</i>, which is the default <b>entry point</b> for a domified webapp.'
    }, {
      pre: {
        text: `domify({
  main: {
    header: {
      h1: 'Domify | <small>A Simple Sample</small>'
    },
    nav: {
      a: ['Home','Elements', 'Styling',  'Head', 'Binding', 'Glossary', 'P5.js']
    },
    article: {
      h1: 'Let's Domify Things',
      p: 'Javascript is so powerful...'
    },
    menu: {
      button: ['Back', 'Next']
    }
    footer: 'by Lenin Comprés'
  },
});`
      }
    }, {
      p: 'The domify function creates a DOM structure based on a JS structural object. It recognizes names as tags for the child elements, and creates the same hierarchy. String values become the HTML content of the element. And when given an array, domify creates several elements with that tag—as in <i>nav a</i>.'
    }, {
      p: 'Of course, that\'s not it. The thing is that domify not only recognizes <b>tags</b>, but also <b>attributes</b>, <b>styles</b>, <b>event handlers</b>, and the <b>inner content</b>—as <i>content</i> or <i>innerText</i>/<i>text</i> and <i>innerHTML</i>/<i>html</i>. Check this out.'
    }, {
      pre: `/* assume we got the constant objects (STYLE, COLOR, PAGES, CSS) 
from a module import, json file, or a previous declaration in the code.*/

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
      h1: 'Domify | &lt;small>A Simple Sample&lt;/small>'
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
});`
    }, {
      p: 'This is the actual code for this very tutorial website. The following pages break down the elements used in this. But, if you are an experienced web developer eager to assess it on your own, here are the highlights to notice.',
      ul: {
        li: [{
            content: 'Styles can me assigned in many ways.',
            /*ul: {
              li:['The <i>style</i> attribute can be a CSS string in its own element—see first <i>style</i>.', 'It can be a previously declared in a variable—see <i>main</i>.', 'Style properties may be within a <b>style</b> object with <b>camelCase</b>—see <i>header</i>', 'It can be directly on the element\'s attibute—see first <i>button</i>.', 'And individual styles can also be assign directly as element\'s properties using camelCase—see <i>nav</i>.']
            }*/
          },
          'Event handlers can be assigned a method. See instances of <i>onclick:</i>.',
          'You can bind the <b>content</b>, <b>styles</b> and <b>attributes</b> of elements to a global variable. See instances of <i>dombind</i>.'
        ]
      }
    }]
  },
  {
    data: 'Elements',
    h1: 'Here are the basics',
    div: [{
      p: 'The domify function creates the DOM elements in the document.body. If called before the body is loaded, it will listen fo the onload event to execute. It returns the container element, in this case document.body.',
      pre: `domify({
  header: {
    h1: 'A Domified Page'
  },
  main: {
    article: {
      h2: 'Basic domified object',
      p: '&lt;b>This&lt;/b> is a paragraph.'
    }
  },
  footer: {
    p: 'Made with domify'
  }
});`
    }, {
      p: 'You may provide the element where the structure should be created as the following argument.',
      pre: `domify({
    h1: 'Hello world',
    p: 'This &lt;b>is&lt;/b> a paragraph.'
  }, someElement, true);`,
      p_: 'A <b>true</b> boolean will indicate the new structure should <b>replace</b> any existing one in the element, instead of the default <b>append</b> mode. Specifying <b>false</b> here will <b>prepend</b> the struture instead.'
    }, {
      p: 'You may also provide a string to indicate the tag of a new element where the DOM structure will be created. The following example creates a <i>main</i> element with the domified structure. It returns this <i>main</i> element, and appends it in <i>someElement</i>.',
      pre: `domify({
  h1: 'Hello world',
  p: 'This is &lt;b>a&lt;/b> paragraph.'
}, 'main', someElement);`
    }, {
      p: 'Domify is agnostic about the order of the arguments that follow the first one: A boolean is a flag to clear the element. A String is a the tag for a new element. An element is where it should be created. Aditionally, you can call domify as an Element method.',
      pre: `someElement.domify({
  h1: 'Hello world',
  p: 'This is a &lt;b>paragraph&lt;/b>.'
}, 'main');`
    }, {
      h1: 'Global elements and element <i>id</i>',
      p: 'Domify recognizes property names of element attributes and event handlers. See if you can find the following in the code.',
      ul: {
        li: ['Use <i>text:</i> or <i>innerText:</i>, and <i>content:</i>, <i>html:</i> or <i>innerHTML:</i> for the element\'s content.',
          'Add event listeners with their arguments in an array.',
          '<b>Give elements an <i>id</i> to create global elements with that name.</b>'
        ]
      },
      pre: `domify({
  input: {
    id: 'myInput',
    placeholder: 'Type value here',
    onchange: e => alert(myInput.value)
  },
  button: {
    id: 'goBtn',
    text : 'Go',
    addEventListener: ['click', e => myInput.value = 'Button pressed']
  }
});

myInput.style.border = 'none';
goBtn.click();`
    }, {
      p: 'You may assign id\'s in the property name by separating it from the tag with an underscore (<i>_</i>). Example: <i>div_mainField:</i>, this will create a div element with an id of <b>mainField</b>. Also, if a name is not identified as a tag, attribute or style, domify interprets it as an id and assumes a div tag. Any id or tag property will replace those interpreted from the name.',
      pre: `domify({
  input_myField: {
    placeholder: 'Type value here',
  },
  goBtn: {
    tag: 'button',
    text : 'Go',
    onclick: e => myField.value = 'Button pressed'
  }
});

myInput.style.border = 'none';
goBtn.click();`,
      p_: 'Also, if a name is preceded by an underscore, domify understand this as a <i>div</i> element. So, <i>_mainField</i> will create a <b>div</b> element with an id and variable named <b>mainField</b>.',
      p__: 'Domify also adds a class to the element for every word in  its name after an underscore (<b>including the id</b>). Then <i>button_acceptDeal_hotStyle_largeButton</i> creates a <b>button</b> element with an id and variable name of <b>acceptDeal</b>, and the classes of <b>acceptDeal</b>, <b>hotStyle</b> and <b>largeButton</b>. Something like <i>__bright</i> will create a <b>div</b> with a <b>class</b> of <b>bright</b> and no id.'
    }, {
      h1: 'Array of elements',
      p: 'Use arrays to create multiple alements of the same tag. Giving the array an id (using the underscore method) creates a global array that holds these elements.',
      pre: `domify({
  ul: {
    li_listedThings: [
      'first item',
      'second item',
      'a third for good meassure'
    ]
  }
});

listedThings[1].style.backgroundColor = 'yellow';`
    }]
  },
  {
    data: 'Styling',
    h1: 'There are several ways to style elements with domify',
    div: [{
      p: 'If a <i>style</i> property is assigned a string, this is placed verbatim in the attribute of the  element, and replace anything previously there.',
      pre: `document.body.domify({
  main:{
    style: 'margin: 20px; font-family: Tahoma; background-color: gray;',
    content: 'This style is in the attribute of this main element.'
  }
});`
    }, {
      p: 'The style property may be an object holding properties and their values, using their JS names (in camelCase).',
      pre: `document.body.domify({
  main:{
    style: {
      margin: '20px',
      fontFamily: 'Tahoma',
      backgroundColor: 'gray'
    },
    content: 'This assign the style values directly to the properties.'
  }
});`,
      p_: 'You may also assign individual style properties (in camelCase) directly—without wrapping them in a <i>style</i> object.',
      pre_: `document.body.domify({
  main:{
    margin: '20px',
    fontFamily: 'Tahoma',
    backgroundColor: 'gray',
    content: 'This delivers the same results.'
  }
});`
    }, {
      p: 'If the style is an object with a <b>content</b>, this will create a style tag with proper CSS language in it. It applies the styling to the whole page using selectors.',
      pre: `document.body.domify({
  main:{
    style: {
      lang: 'css',
      content: 'main { margin: 20px; font-family: Tahoma; color:gray; }';
    },
    content: 'This style is applied to all main tags in the page.'
  }
});`
    }, {
      p: 'It is recommended to only do this in the head element. You may also take advantage of domify interpreting JS structural objects into CSS—nesting and all.',
      pre: `document.head.domify({
  style: {
    lang: 'css',
    content: {
      main { 
        margin: '20px',
        fontFamily: 'Tahoma',
        color: 'gray'
      },
      'p, article>*': {
        margin: '2em'
      },
      nav: {
        a: {
          color: 'blue',
          hover: {
            backgroundColor: 'yellow'
          }
        }
      }
    }
  }
};`
    }, {
      p: 'Domify recognizes pseudo-elements and pseudo-classes. And selectors written with underscores (<i>_</i>) are interpreted as such: <i>tag_idName_className_extraClass</i>. In this sense <i>_myImput</i> will be an id (#myInput), and <i>__warning</i> a class (.warning). Something like <i>menu_topMenu_cloud_intense</i> becomes <i>menu#topMenu.cloud.intense</i>.',
    }]
  },
  {
    data: 'Initializing',
    h1: '',
    div: [{
      p: 'Just as any other element, you may domify the head element. For example:',
      pre: `document.head.domify({
  title: 'Title of the webpage',
  meta: {
    charset: 'UTF-8'
  },
  link : [{
    rel: 'icon',
    href: 'icon.ico'
  }, {
    rel: 'style',
    href: 'style.css'
  }], 
  style: {
    type: 'css',
    content: CSS
  },
  script: {
    type: 'module',
    src: 'main.js' 
  }
}, true);`,
      p_: 'The domify library will initialize the head if it finds an <i>ini.json</i> file in the root folder. This can contain any of the following properies to replace their default values. These are the default values.',
      pre_: `{
  "title": "A Domified Site",
  "viewport": "width=device-width, initial-scale=1.0",
  "charset": "UTF-8",
  "icon": "assets/icon.ico",
  "meta": [],
  "resetCSS": true,
  "style": [],
  "link": [],
  "script": [],
  "entryPoint": "main.js",
  "module": true,
  "postscript": []
}`,
      p__: 'The <i>meta</i>, <i>link</i>, <i>script</i>, <i>postscript</i> and <i>style</i> may be a single object or an array of these elements. The <b>script</b> gets added to the head—before the entry point—, while <b>postscript</b> get added in the body after the entry point.'
    }]
  },
  {
    data: 'Binding',
    div: {
      p: 'Any element\'s attribute, content, styling, can be bound to a blobal object. When the <i>value</i> property of this variable changes, it will automatically update all elements bound to it. To create a bind assign a <i>dombind</i> call to the element property with the name of the object to bind. If this object does not exist, the bind will create it.',
      pre: `domify({
  input: {
    value: dombind('myBindVar'),
    placeholder: 'This will change',
  },
  button: {
    text : 'Go',
    onclick: e => myBindVar.value = 'Button pressed'
  }
});`,
      p_: 'You may also give the <b>dombind</b> a function to be called whenever the value is changed. This function should return the correct value to assign to the element\'s property.',
      pre_: `domify({
  div: {
    padding: '20px',
    background: dombind('enabledField', value => value ? 'lime': 'red', true)
    },
    input: {
      enabled: dombind('enabledField'),
      value: dombind('enabledField', value => value ? 'Enabled' : 'Disabled')
    }
    button : {
      text: 'toggle',
      onclick: () => enabledField.value = !enabledField.value
    }
  }
});`,
      p__: 'You may also give <b>dombind</b> a default value for the bind. In this case that value was <i>true</i>. Domify is agnostic about the order of the onvalue function and the default value passed after the name of the bind.'
    }
  },
  {
    data: 'Glossary',
    div: [{
      h1: 'Element tag names',
      div: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        a: HTML_TAGS.map(tag => {
          if(tag == 'h1') tag = 'hn';
          if(tag.startsWith('h') && tag !== 'hn') return;
          return {
            flex: '0 0 10em',
            text: tag,
            onclick: _ => window.open(`https://www.w3schools.com/tags/tag_${tag}.asp`, '_blank')
          }
        })
      }
    }, {
      h1: 'Element attributes',
      div: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        a: HTML_ATTRIBUTES.map(att => {
          return {
            flex: '0 0 10em',
            text: att,
            onclick: _ => window.open(`https://www.w3schools.com/tags/att_${att}.asp`, '_blank')
          }
        })
      }
    },  {
      h1: 'Style properties',
      div: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        a: ["alignContent", "alignItems", "alignSelf", "animation", "animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationTimingFunction", "animationPlayState", "background", "backgroundAttachment", "backgroundColor", "backgroundImage", "backgroundPosition", "backgroundRepeat", "backgroundClip", "backgroundOrigin", "backgroundSize", "backfaceVisibility", "border", "borderBottom", "borderBottomColor", "borderBottomLeftRadius", "borderBottomRightRadius", "borderBottomStyle", "borderBottomWidth", "borderCollapse", "borderColor", "borderImage", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeft", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRadius", "borderRight", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderSpacing", "borderStyle", "borderTop", "borderTopColor", "borderTopLeftRadius", "borderTopRightRadius", "borderTopStyle", "borderTopWidth", "borderWidth", "bottom", "boxDecorationBreak", "boxShadow", "boxSizing", "captionSide", "caretColor", "clear", "clip", "color", "columnCount", "columnFill", "columnGap", "columnRule", "columnRuleColor", "columnRuleStyle", "columnRuleWidth", "columns", "columnSpan", "columnWidth", "content", "counterIncrement", "counterReset", "cursor", "direction", "display", "emptyCells", "filter", "flex", "flexBasis", "flexDirection", "flexFlow", "flexGrow", "flexShrink", "flexWrap", "cssFloat", "font", "fontFamily", "fontSize", "fontStyle", "fontVariant", "fontWeight","fontSizeAdjust", "fontStretch", "hangingPunctuation", "height", "hyphens", "icon", "imageOrientation", "isolation", "justifyContent", "left", "letterSpacing", "lineHeight", "listStyle", "listStyleImage", "listStylePosition", "listStyleType", "margin", "marginBottom", "marginLeft", "marginRight", "marginTop", "maxHeight", "maxWidth", "minHeight", "minWidth", "navDown", "navIndex", "navLeft", "navRight", "navUp", "objectFit", "objectPosition", "opacity", "order", "orphans", "outline", "outlineColor", "outlineOffset", "outlineStyle", "outlineWidth", "overflow", "overflowX", "overflowY", "padding", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop", "pageBreakAfter", "pageBreakBefore", "pageBreakInside", "perspective", "perspectiveOrigin", "position", "quotes", "resize", "right", "scrollBehavior", "tableLayout", "tabSize", "textAlign", "textAlignLast", "textDecoration", "textDecorationColor", "textDecorationLine", "textDecorationStyle", "textIndent", "textJustify", "textOverflow", "textShadow", "textTransform", "top", "transform", "transformOrigin", "transformStyle", "transition", "transitionProperty", "transitionDuration", "transitionTimingFunction", "transitionDelay", "unicodeBidi", "userSelect", "verticalAlign", "visibility", "whiteSpace", "width", "wordBreak", "wordSpacing", "wordWrap", "widows", "zIndex"].map(p => {
          return {
            flex: '0 0 12em',
            text: p,
            onclick: _ => window.open(`https://www.w3schools.com/cssref/css3_pr_${p.camelCase('-')}.asp`, '_blank')
          }
        })
      }
    },  {
      h1: 'Pseudo elements and pseudo clases',
      div: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        a: [...PSEUDO_ELEMENTS, ...PSEUDO_CLASSES].map(p => {
          return {
            flex: '0 0 10em',
            text: p,
            onclick: _ => window.open(`https://www.w3schools.com/cssref/sel_${p}.asp`, '_blank')
          }
        })
      }
    }]
  },
  {
    data: 'P5.js',
    h1: 'Yes, you can domify P5.js elements',
    div: [{
      p: ['Don\'t know what P5.js is? Then <a href="https://p5js.org/" target="_blank">get to know</a>.',
        'But that\'s it. You may call <i>p5.domify</i> or if you call the <i>domify</i> method from a p5.Element. All elements created in the dom structure will be p5 Elements. And you may set up their event triggers and methods right on the domify calls. Like so...'
      ],
      pre: `someP5Element.domify({
  h1: 'Hello world',
  p: 'This is a paragraph.'
});

p5.domify({
  h1: 'goBtn is a p5 element',
  button: {
    id: goBtn,
    text: 'Go',
    mouseClicked: handlerFunction
  }
);`
    }]
  }
];

export default PAGES;
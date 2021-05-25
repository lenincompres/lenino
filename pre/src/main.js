import getCube from "./cube.js";
import * as questionnaire from "./questionnaire.js";
import * as results from "./results.js";
import * as style from "./style.js";

const rgb = DOM.querystring().rgb;

questionnaire.results.bind(results.feature);

document.head.create({
  title: 'PRE Spectrum',
  meta: [{
    charset: "UTF-8"
  }, {
    name: "keywords",
    content: "3dpsyche, psychology, test, psychology test, personality type, personality, temperament, tendencies, states of mind, emotional state, MBTI, Myers-Briggs, ENTP, ENTJ, INTP, INTJ, ENFP, ENFJ, INFP, INFJ, ESTP, ESTJ, ISTP, ISTJ, ISFP, ISFJ, ESFP, ESFJ, jung, carl jung, freud, sigmund freud, rational, emotional, physical, mind body and soul, abstraction"
  }, {
    name: "description",
    content: "A psychometric tool to visualize Physical, Rational & Emotional focus."
  }, {
    name: "viewport",
    content: "width=device-width, minimum-scale=1.0, maximum-scale=1.0"
  }],
  link: {
    rel: "icon",
    href: "assets/favicon.gif",
    type: "image/gif"
  }
});

DOM.style({
  body: {
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
  },
  a: {
    color: 'white',
    textDecoration: 'none',
    textShadow: '1px 1px 1px black',
    hover: {
      opacity: '0.75'
    }
  },
  h: {
    fontFamily: 'fantasy',
  },
  h1: {
    fontSize: '3em',
    color: 'white',
    textShadow: '0 0 3px black',
  }
});

const cubeElement = new Binder();
let cube = getCube(cube => cubeElement.value = cube, {
  noLabels: true
});
cube.onclick = s => s ? window.location.href = './?rgb=' + s.code.codeToHex() : null;
const cubeModel = {
  div: {
    margin: '0 auto',
    width: 'fit-content',
    position: 'relative',
    select: !rgb ? undefined : {
      position: 'absolute',
      top: '3em',
      right: 0,
      textAlignLast: 'right',
      onchange: e => cube.view(e.target.value),
      option: [{
        value: 'text',
        text: ''
      }, {
        value: 0,
        text: 'Top view'
      }, {
        value: -1,
        text: 'Center view'
      }, {
        value: -2,
        text: 'Base view'
      }, {
        value: 1,
        text: 'Physical break'
      }, {
        value: 2,
        text: 'Rational break'
      }, {
        value: 3,
        text: 'Emotional break'
      }]
    },
    canvas: cubeElement
  },
};

const takeTheTest = {
  fontSize: '1.25em',
  href: './',
  text: 'Take the questionnaire and find yours'
}

DOM.create({
  textAlign: 'center',
  overflowX: 'hidden',
  backgroundColor: rgb ? '#' + rgb : questionnaire.favorite,
  header: {
    backgroundColor: style.lightSreen,
    padding: '1em 0.5em',
    h1: 'PRE Spectrum',
    h4: 'Physical, Rational & Emotional',
    div: {
      marginTop: '-3em',
      content: cubeModel
    }
  },
  main: rgb ? undefined : questionnaire.model,
  footer: {
    boxShadow: rgb ? '0 -1em 1em #' + rgb : results.feature.bind(v => '0 -1em 1em ' + v),
    backgroundColor: rgb ? '#' + rgb : results.feature,
    section: {
      style: style.section,
      display: 'flex',
      flexDirection: 'column',
      h1: 'Results',
      div: results.model,
      a: [rgb ? takeTheTest : {
        target: '_blank',
        href: results.feature.bind(v => './?rgb=' + v.substr(1)),
        text: 'Here is a link for these results, if you care to share or save it.'
      }, {
        fontSize: 'small',
        margin: '2em 0 0',
        href: 'http://lenino.net',
        target: '_blank',
        text: 'Created by Lenin Compres'
      }]
    }
  }
});

if (rgb) results.feature.value = rgb;
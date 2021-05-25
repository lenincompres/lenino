import getCube from "./cube.js";
import * as questionnaire from "./questionnaire.js";
import * as results from "./results.js";
import * as style from "./style.js";

const rgb = DOM.querystring().rgb;
questionnaire.results.addListener(v => {
  results.feature.value = v;
});

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
let cube = getCube(cube => cubeElement.value = cube);
cube.onclick = s => {
  console.log(s);
  s ? window.location.href = './?rgb=' + s.code.codeToHex() : null;
};
const cubeModel = {
  div: {
    canvas: cubeElement
  },
  select: {
    option: ['- Views -', {
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
    }],
    onchange: e => cube.view(e.target.value)
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
  backgroundColor: questionnaire.favorite,
  header: {
    backgroundColor: style.lightSreen,
    padding: '1em 0.5em',
    h1: 'PRE Spectrum',
    h4: 'Physical, Rational & Emotional psichometric tool',
    div: {
      marginTop: '-3em',
      content: cubeModel
    }
  },
  main: rgb ? undefined : questionnaire.model,
  footer: {
    boxShadow: '0 0 3em black',
    backgroundColor: results.feature,
    section: {
      style: style.section,
      h1: 'Results',
      div: results.model,
      a: rgb ? takeTheTest : {
        target: '_blank',
        href: results.feature.bind(v => './?rgb=' + v.substr(1)),
        text: results.feature.bind(v => 'A link for these results: ' + v)
      },
      p: {
        display: 'block',
        fontSize: 'small',
        margin: '3em 0 0',
        html: 'Created by <a href="http://www.lenino.net" target="_blank">Lenin Compres</a>'
      }
    }
  }
});
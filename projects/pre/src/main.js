import getCube from "./cube.js";
import * as questionnaire from "./questionnaire.js";
import * as results from "./results.js";
import * as style from "./style.js";

const QS = DOM.querystring();
let rgb = QS.rgb ? '#' + QS.rgb : undefined;
let fav = QS.color ? '#' + QS.color : undefined;

questionnaire.results.bind(results.feature);
if (rgb) results.feature.value = rgb;

DOM.style({
  body: {
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
    fontSize: '15px',
  },
  b: {
    fontWeight: 'bold'
  },
  a: {
    color: 'white',
    textDecoration: 'none',
    textShadow: '1px 1px 1px black',
    hover: {
      after: {
        paddingLeft: '1em'
      }
    },
    after: {
      transition: 'ease-in 0.1s',
      fontSize: '0.68em',
      verticalAlign: 'top',
      paddingLeft: '0.25em',
      content: '"→"'
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

DOM.create({
  title: 'PRE Spectrum',
  charset: 'UTF-8',
  viewport: 'width=device-width, initial-scale=1, minimum-scale=1',
  keywords: '3dpsyche, psychology, test, psychology test, personality type, personality, temperament, tendencies, states of mind, emotional state, MBTI, Myers-Briggs, ENTP, ENTJ, INTP, INTJ, ENFP, ENFJ, INFP, INFJ, ESTP, ESTJ, ISTP, ISTJ, ISFP, ISFJ, ESFP, ESFJ, jung, carl jung, freud, sigmund freud, rational, emotional, physical, mind body and soul, abstraction',
  description: 'A psychometric tool to visualize Physical, Rational & Emotional focus.',
  icon: 'assets/favicon.gif',
  textAlign: 'center',
  backgroundColor: rgb ? rgb : questionnaire.favorite,
  header: {
    backgroundColor: style.lightSreen,
    boxShadow: '0 1em 1em ' + style.lightSreen,
    paddingTop: '3em',
    h1: {
      cursor: 'pointer',
      text: 'PRE Spectrum',
      onclick: e => window.location.href = './'
    },
    h4: 'Physical, Rational & Emotional',
    div: {
      id: 'cubeContainer',
      display: 'flex',
      flexDirection: 'column',
      placeContent: 'center',
      small: 'Loading color spectrum…',
      height: '400px',
      margin: '-2em auto 0'
    },
    select: {
      display: 'block',
      zIndex: 10,
      position: 'relative',
      margin: '-2em auto 3em',
      textAlignLast: 'center',
      option: [{
        value: 'none',
        text: 'Animated'
      }, {
        value: 1,
        text: 'Physical Plains'
      }, {
        value: 2,
        text: 'Rational Plains'
      }, {
        value: 3,
        text: 'Emotional Plains'
      }, {
        value: 4,
        text: 'Base|Top'
      }, {
        value: 0,
        text: 'Top View'
      }, {
        value: -1,
        text: 'Center View'
      }, {
        value: -2,
        text: 'Base View'
      }],
      onchange: e => cube.view(e.target.value)
    },
  },

  main: rgb ? undefined : questionnaire.model,

  footer: {
    boxShadow: rgb ? '0 -1em 1em ' + rgb : results.feature.bind(v => '0 -1em 1em ' + v),
    backgroundColor: rgb ? rgb : results.feature,
    section: {
      style: style.section,
      display: 'flex',
      flexDirection: 'column',
      h1: rgb && !fav ? 'Featured' : 'Results',
      p: !rgb || fav ? {
        margin: '1em 0 -2.25em -11em',
        zIndex: 1,
        text: 'Closests:'
      } : undefined,
      div: results.model,
      a: {
        target: '_blank',
        content: [{
          display: rgb ? 'none' : 'block',
          href: DOM.bind([results.feature, questionnaire.favorite], (r, f) => './?rgb=' + r.substr(1) + '&color=' + f.substr(1)),
          text: 'Here is a link with these results for you to save or share.'
        }, !fav ? undefined : {
          margin: '0 auto',
          padding: '0.5em 1em',
          width: 'fit-content',
          borderRadius: '0.5em',
          boxShadow: '1px 1px 2px black',
          backgroundColor: fav,
          href: './?rgb=' + fav.substr(1),
          text: 'You also have this favorite color: ' + fav
        }, {
          fontSize: '1.25em',
          marginTop: '2em',
          href: './',
          text: 'Take the questionnaire.'
        }, {
          fontSize: 'small',
          marginTop: '3em',
          href: 'http://lenino.net',
          text: 'Created by Lenin Compres'
        }, {
          fontSize: 'small',
          marginTop: '0.68em',
          href: 'https://github.com/lenincompres/DOM.create',
          text: 'Developed with DOM.create'
        }]
      }
    }
  }
});

let cube = getCube({
  noLabels: true,
  container: cubeContainer,
  onclick: s => s ? window.location.href = './?rgb=' + s.code.codeToHex() : null,
});
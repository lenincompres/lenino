import getCube from "./cube.js";
import * as questionnaire from "./questionnaire.js";
import * as results from "./results.js";
import * as style from "./style.js";

const QS = DOM.querystring();
let rgb = QS.rgb;
let fav = QS.color;
if (rgb) rgb = '#' + rgb;
if (fav) fav = '#' + fav;

questionnaire.results.bind(results.feature);

document.head.create({
  title: 'PRE Spectrum',
  meta: [{
    charset: "UTF-8"
  }, {
    name: "viewport",
    content: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1'
  }, {
    name: "keywords",
    content: "3dpsyche, psychology, test, psychology test, personality type, personality, temperament, tendencies, states of mind, emotional state, MBTI, Myers-Briggs, ENTP, ENTJ, INTP, INTJ, ENFP, ENFJ, INFP, INFJ, ESTP, ESTJ, ISTP, ISTJ, ISFP, ISFJ, ESFP, ESFJ, jung, carl jung, freud, sigmund freud, rational, emotional, physical, mind body and soul, abstraction"
  }, {
    name: "description",
    content: "A psychometric tool to visualize Physical, Rational & Emotional focus."
  }],
  link: {
    rel: "icon",
    href: "assets/favicon.gif",
    type: "image/gif"
  },
  style: {
    body: {
      fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
      fontSize: '13px',
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
  }
});

const cubeElement = new Binder();
let cube = getCube({
  noLabels: true,
  onclick: s => s ? window.location.href = './?rgb=' + s.code.codeToHex() : null,
  onready: cube => cubeElement.value = cube
});

DOM.create({
  textAlign: 'center',
  backgroundColor: rgb ? rgb : questionnaire.favorite,
  header: {
    backgroundColor: style.lightSreen,
    boxShadow: '0 1em 1em ' + style.lightSreen,
    paddingTop: '2em',
    h1: 'PRE Spectrum',
    h4: 'Physical, Rational & Emotional',
    div: {
      margin: '-2em auto 0',
      position: 'relative',
      canvas: cubeElement,
      select: !rgb ? undefined : {
        position: 'absolute',
        top: '3em',
        right: 0,
        textAlignLast: 'right',
        option: ['', {
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
      onchange: e => cube.view(e.target.value)
    }
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
      p: !fav ? undefined : {
        marginBottom: '-1.5em',
        zIndex: 1,
        text: 'Closests'
      },
      div: results.model,
      a: {
        target: '_blank',
        content: [{
          display: rgb ? 'none' : 'block',
          href: results.feature.bind(v => './?rgb=' + v.substr(1) + '&color=' + questionnaire.favorite.value.substr(1)),
          text: 'Here is a link with these results for you to save or share.'
        }, !fav ? undefined : {
          margin: '0 auto',
          padding: '0.5em 1em',
          width: 'fit-content',
          borderRadius: '0.5em',
          boxShadow: '1px 1px 2px black',
          backgroundColor: fav,
          href: './?rgb=' + fav.substr(1),
          text: 'Your also have this favorite color: ' + fav
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
          text: 'Developed with DOM.create and P5.js'
        }]
      }
    }
  }
});

if (rgb) results.feature.value = rgb;
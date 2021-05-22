import { questionSection } from "./questions.js";
import { resultsSection } from "./results.js";

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
  },
  script: ["lib/p5.js", "lib/p5.dom.min.js"]
})


DOM.style({
  body: {
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    overflowX: 'hidden',
  },
  a: {
    color: '#3c9',
    textDecoration: 'none',
    textShadow: '1px 1px 1px black',
  },
  h: {
    fontFamily: 'fantasy',
  }
});

DOM.create({
  header: {
    backgroundColor: 'silver',
    padding: '3em 0.5em',
    textShadow: '1px 1px 1px black',
    h1: 'The PRE Model',
    p: 'Visualize Physical, Rational & Emotional focus'
  },
  main: {
    width: 'calc(100% - 1em)',
    maxWidth: '35em',
    margin: '0.5em auto 2em',
    p: [
      'Rate each option individually, but mind how they compare to others.',
      'When contrasting options, indicate how much you lean to either.'
    ],
    section: questionSection.bind()
  },
  footer: {
    backgroundColor: 'silver',
    padding: '2em 0.5em',
    color: 'black',
    section: resultsSection,
    p: {
      display: 'block',
      fontSize: 'small',
      margin: '3em 0 0',
      html: 'Created by <a href="http://www.lenino.net" target="_blank">Lenin Compres</a>'
    }
  }
}, 'container');
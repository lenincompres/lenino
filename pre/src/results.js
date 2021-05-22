import p5Cube from "./cube.js";
import Bar from './Bar.js';
import { p5State } from "./State.js";

var mousePos = {};
var state;

let barMap = {
  i: new Bar('I|E', '6em', 'assets/extremes.gif', 'gray'),
  s: new Bar('S|N', '6em', 'red', 'cyan'),
  f: new Bar('F|T', '6em', 'blue', 'lime'),
  j: new Bar('J|P', '6em', 'white', 'black'),
  id: new Bar('Id', '6em', 'magenta'),
  ego: new Bar('Ego', '6em', 'yellow'),
  sup: new Bar('Sup.', '6em', 'cyan'),
  r: new Bar('Phys.', '6em', 'red'),
  g: new Bar('Rati.', '6em', 'lime'),
  b: new Bar('Emot.', '6em', 'blue')
}

let cube = p5Cube();
console.log(cube)
//cube.onmouseover = s => s ? showMe('#' + s.code.codeToHex()) : null;
//cube.onmouseout = s => showMe();

const stateBinder = new Binder();
const results = new Binder([]);

export const resultsSection = {
  h1: 'Results',
  p: 'Closest average state and its archetype',
  a_exploreLink: {
    text: 'Unique link for these results here',
    target: '_blank'
  },
  ul: {
    li_results: results.bind(rs => rs.map((r, i) => new Object({
      span: ['PRE results', 'Present Life', 'Favorite Color'][i],
      b: '',
      i: ''
    })))
  },
  state: {
    approx: '≈ Closest',
    canvas: stateBinder.bind(),
    archetype: ''
  },
  psych: {
    p: 'For the psych nerds',
    span_stat: [{
      p: 'PRE',
      div: [barMap.r.dom, barMap.g.dom, barMap.b.dom]
    }, {
      p: {
        a: {
          text: 'Freud',
          href: 'https://en.wikipedia.org/wiki/Id,_ego_and_super-ego',
          target: '_blank'
        }
      },
      div: [barMap.id.dom, barMap.ego.dom, barMap.sup.dom]
    }, {
      p: {
        a: {
          text: 'Jung',
          href: 'https://en.wikipedia.org/wiki/Jungian_cognitive_functions',
          target: '_blank'
        }
      },
      div: [barMap.i.dom, barMap.s.dom, barMap.f.dom],
    }, {
      p: {
        a: {
          text: 'MBTI',
          href: 'https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator',
          target: '_blank'
        }
      },
      div: barMap.j.dom,
      p: {
        id: 'mbti'
      }
    }]
  },
  cube: {
    canvas: cube.canvas,
    select: {
      option: ['- Choose view -', {
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
  }
}

export const updateResults = questions => {

  const getAnswer = (j, i) => questions[j].answers[i].value;
  
  const getAverage = (first, last) => {
    var output = Array(questions[first].answers.length).fill(0);
    questions.filter((q, i) => i >= first && i <= last).forEach(q => output = output.plus(q.answers.map(a => a.value)));
    return output.times(1 / (last - first + 1));
  }
  
  const getColor = (h, s, b) => {
    p5.colorMode(HSL);
    var colour = p5.color(h, s, b);
    return ('#' + hexColor(colour));
  }

  var f = 255 / 100;
  //Sorter
  var h = p5.hue(p5.color(...getAverage(1, 6).times(f)));
  var light = getAverage(7, 10).reduce((o, v) => v + o, 0) / 3;
  var sat = getAverage(11, 14).reduce((o, v) => v + o, 0) / 3;
  results = [getColor(h, sat, light)];
  dom.actual.elt.style.backgroundColor = dom.actualRGB.elt.innerText = dom.actualRGB.elt.style.color = dom.exploreLink.elt.style.color = results[0];
  dom.exploreLink.attribute('href', 'explore.html?' + results[0].substr(1));
  dom.results[0].mouseOver(e => showMe(0));
  dom.results[0].mouseOut(e => showMe());

  //daily
  i = 15;
  var dailyH = p5.hue(p5.color(getAnswer(i, 0) * f, getAnswer(i, 1) * f, getAnswer(i, 2) * f));
  var dailyL = getAnswer(i, 3);
  var dailyS = getAnswer(i, 4);
  results.push(getColor(dailyH, dailyS, dailyL));
  dom.daily.elt.style.backgroundColor = dom.dailyRGB.elt.innerText = dom.dailyRGB.elt.style.color = results[1];
  dom.results[1].mouseOver(e => showMe(1));
  dom.results[1].mouseOut(e => showMe());

  //favorite
  colorMode(RGB);
  var favH = p5.hue(p5.color(getAnswer(0, 0) * f, getAnswer(0, 1) * f, getAnswer(0, 2) * f));
  var favL = getAnswer(0, 3);
  var favS = getAnswer(0, 4);
  results.push(getColor(favH, favS, favL));
  dom.header.elt.style.backgroundColor = dom.favorite.elt.style.backgroundColor = dom.favoriteRGB.elt.innerText = dom.favoriteRGB.elt.style.color = results[2];
  dom.results[2].mouseOver(e => showMe(2));
  dom.results[2].mouseOut(e => showMe());

  showMe();

};

/*
let setup = function () {
  let args = DOM.querystring();
  if (args.sorter) document.body.classList.add('sorter');
  //stats
  canvas = createCanvas(100, 100);
  //state = p5State();
}
*/
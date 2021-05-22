var results;
var state;
var cube;
var barMap;
var questions;
var states = ['808080'];
var sliders = [];
var favH;
var favL;
var favS;
var frequencies = ['relaxed', 'flexible', 'intense'];

function preload() {
  symbolSprite = loadImage('assets/symbolsprite18.png');
  symbolInfo = loadJSON('states.json');
}

function setup() {
  var values = [];
  states = getArgs();
  results = states.length ? ['#' + states[0]] : ['#808080'];
  var c = color(results[0]);
  values = [100 * red(c) / 255, 100 * green(c) / 255, 100 * blue(c) / 255, lightness(c), saturation(c)];

  //stats
  canvas = createCanvas(120, 120);
  cube = p5Cube();
  cube.onmouseover = s => s ? showMe('#' + s.code.codeToHex()) : null;
  cube.onmouseout = s => showMe();
  barMap = {
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

  questions = [{
    options: [
      "Physically",
      "Rationally",
      "Emotionally",
      ["Laxed", "Tense"],
      ["External", "Internal"]
    ],
    answers: []
  }];
  questions.forEach(q => {
    q.answers = [];
    q.article = {
      h1: q.question,
      div: q.options.map((o, i) => {
        var isVS = Array.isArray(o);
        var a = {
          hint: null,
          desc: null,
          value: values[i] ? round(values[i]) : isVS ? 50 : 1
        };
        if (!isVS) o = {
          _style: `color:${['maroon','green','navy'][i]}`,
          b: o + ' ',
          span: {
            _text: frequencies[floor(map(a.value, 0, 100, 0, frequencies.length))],
            onelement: elt => a.desc = elt
          }
        };
        q.answers.push(a);
        return {
          _class: isVS ? 'answer versus' : 'answer',
          div: {
            p: o
          },
          input: {
            _type: 'range',
            _min: 1,
            _max: 99,
            _value: a.value,
            oninput: e => {
              var v = parseInt(e.target.value);
              a.desc.html(frequencies[floor(map(v, 0, 100, 0, frequencies.length))]);
              a.value = q.reverse ? 100 - v : v;
              update(i);
            },
            onelement: elt => sliders.push(elt.elt)
          }
        }
      })
    }
  });

  createDOM({
    header_header: {
      h1: 'The PRE Model',
      p: 'A tool to visualize Physical, Rational & Emotional focus'
    },
    footer_footer: {
      state: {
        _class: 'big',
        i_actualRGB: '',
        section: {
          article: questions[0].article
        },
        approx: '≈ Closest',
        canvas: canvas,
        archetype: ''
      },
      psych: {
        p: 'For the psych nerds',
        span__stat: [{
          p: 'PRE',
          div: [barMap.r.dom, barMap.g.dom, barMap.b.dom]
        }, {
          p: {
            a: {
              _text: 'Freud',
              _href: 'https://en.wikipedia.org/wiki/Id,_ego_and_super-ego',
              _target: '_blank'
            }
          },
          div: [barMap.id.dom, barMap.ego.dom, barMap.sup.dom]
        }, {
          p: {
            a: {
              _text: 'Jung',
              _href: 'https://en.wikipedia.org/wiki/Jungian_cognitive_functions',
              _target: '_blank'
            }
          },
          div: [barMap.i.dom, barMap.s.dom, barMap.f.dom],
        }, {
          p: {
            a: {
              _text: 'MBTI',
              _href: 'https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator',
              _target: '_blank'
            }
          },
          div: barMap.j.dom,
          p_mbti: ''
        }]
      },
      cube: {
        canvas: cube.canvas,
        select: {
          option: ['- Choose view -', {
            _value: 0,
            _text: 'Top view'
          }, {
            _value: -1,
            _text: 'Center view'
          }, {
            _value: -2,
            _text: 'Base view'
          }, {
            _value: 1,
            _text: 'Physical break'
          }, {
            _value: 2,
            _text: 'Rational break'
          }, {
            _value: 3,
            _text: 'Emotional break'
          }],
          onchange: e => cube.view(e.target.value)
        },
      },
      p_credits: 'Created by <a href="http://www.lenino.net" target="_blank">Lenin Compres</a>'
    }
  }, 'container');
  sliders[3].setAttribute('disabled', 'true');
  sliders[4].setAttribute('disabled', 'true');
  update();
}

function update(n = 0) {
  var f = 255 / 100;
  var vals = [getAnswer(0, 0), getAnswer(0, 1), getAnswer(0, 2), getAnswer(0, 3), getAnswer(0, 4)];
  colorMode(RGB)
  var c = color(vals[0] * f, vals[1] * f, vals[2] * f);
  var l = lightness(c);
  if (n < 3) {} else {
    var d = (vals[3] - l) / 3;
    vals[0] += d;
    vals[1] += d;
    vals[2] += d;
    var c = color(vals[0] * f, vals[1] * f, vals[2] * f);
    var l = lightness(c);
  }
  vals[3] = (vals[0] + vals[1] + vals[2]) / 3;
  vals[4] = getI(vals[0], vals[1], vals[2]);
  sliders.forEach((slider, i) => slider.value = vals[i]);
  //favorite
  results = ['#' + hexColor(c)];
  dom.header.elt.style.backgroundColor = dom.actualRGB.elt.innerText = dom.actualRGB.elt.style.color = results[0];
  showMe();
}
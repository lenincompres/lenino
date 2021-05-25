import Bar from './Bar.js';
import State from "./State.js";
import states from "./states.js";
import * as style from "./style.js";
import * as AUX from "./functions.js";

var defaultRGB = DOM.querystring().rgb ? '#' + DOM.querystring().rgb : '#808080';

export const feature = new Binder(defaultRGB);
export const mbti = new Binder('----');

const bars = {
  i: new Bar('*E|I', '6em', 'gray', 'assets/extremes.gif'),
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
const psychModel = {
  style: style.floatingSign,
  fontSize: 'small',
  margin: '1em 0',
  header: {
    span: 'Exact results: ',
    b: {
      text: feature
    }
  },
  ul: {
    css: {
      margin: '1em 0',
      display: 'flex',
      li: {
        display: 'inline - block ',
        margin: '.25em',
        verticalAlign: 'top',
        p: {
          margin: '.75em 0 0.25em'
        },
      }
    },
    li: [{
      a: {
        text: 'PRE',
        href: './'
      },
      div: [bars.r.model, bars.g.model, bars.b.model]
    }, {
      a: {
        text: 'Freud',
        href: 'https://en.wikipedia.org/wiki/Id,_ego_and_super-ego',
        target: '_blank'
      },
      div: [bars.id.model, bars.ego.model, bars.sup.model]
    }, {
      a: {
        text: 'Jung',
        href: 'https://en.wikipedia.org/wiki/Jungian_cognitive_functions',
        target: '_blank'
      },
      div: [bars.i.model, bars.s.model, bars.f.model],
    }, {
      a: {
        text: 'MBTI',
        href: 'https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator',
        target: '_blank'
      },
      div: bars.j.model,
      p: {
        fontType: 'monotype',
        fontSize: '1.25em',
        color: feature,
        textShadow: '1px 1px 1px black',
        text: mbti
      }
    }]
  },
  footer: {
    fontSize: '0.68em',
    text: '* Extroversion (E) refers to being sociable: a conjuction between outgoing, empathetic, open, agreeable.'
  }
};

const stateElement = new Binder();
var stateP5 = new p5(function (me) {
  me.setup = _ => {
    stateElement.value = me.createCanvas(100, 100).elt;
    me.translate(me.width / 2, me.height / 2);
    me.update = (code) => {
      me.clear();
      let state = new State(me, {
        center: code,
      });
      state.draw();
    }
    me.update(defaultRGB.hexToCode());
  }
});

feature.addListener(v => {
  stateP5.update(v.hexToCode());
  breakdown(v);
});

export const model = {
  div: {
    backgroundColor: 'white',
    margin: '0 auto',
    borderRadius: '0.5em',
    boxShadow: '1px 1px 2px black',
    position: 'relative',
    width: 'fit-content',
    fontSize: 'small',
    padding: '1em',
    p: 'Closest state/archetype',
    div: {
      canvas: stateElement
    },
    h5: {
      text: feature.bind(v => 'The ' + states[v.hexToCode()].archetype)
    }
  },
  section: psychModel
}

function breakdown(hex) {
  var f = 100 / 255;
  var mb = {};
  var c = AUX.color(hex);
  var d = 2; // threshold to decide on a letter
  var rgb = AUX.rgb(c);
  mb.r = f * rgb[0];
  mb.g = f * rgb[1];
  mb.b = f * rgb[2];
  mb.l = AUX.lightness(c);
  mb.s = 100 * mb.r / (0.5 * (mb.g + mb.b) + mb.r);
  mb.f = 100 * mb.b / (mb.g + mb.b);
  mb.j = (mb.r + mb.g + mb.b) / 3;
  var half = 50;
  mb.i = 100 * AUX.dist(half, half, half, mb.r, mb.g, mb.b) / AUX.dist(0, 0, 0, half, half, half);

  mb.type = ['I', 'E', '-'][mb.i > 50 + d ? 0 : mb.i < 50 - d ? 1 : 2];
  mb.type += ['S', 'N', '-'][mb.s > 50 + d ? 0 : mb.s < 50 - d ? 1 : 2];
  mb.type += ['F', 'T', '-'][mb.f > 50 + d ? 0 : mb.f < 50 - d ? 1 : 2];
  mb.type += ['J', 'P', '-'][mb.j > 50 + d ? 0 : mb.j < 50 - d ? 1 : 2];
  mbti.value = mb.type;

  bars.r.value = mb.r;
  bars.g.value = mb.g;
  bars.b.value = mb.b;
  bars.i.value = mb.i;
  bars.s.value = mb.s;
  bars.f.value = mb.f;
  bars.j.value = mb.j;
  bars.id.value = 0.5 * (mb.r + mb.b);
  bars.ego.value = 0.5 * (mb.g + mb.r);
  bars.sup.value = 0.5 * (mb.g + mb.b);
}

export default model;
import Bar from './Bar.js';
import State from "./State.js";
import states from "./states.js";
import * as style from "./style.js";
import * as AUX from "./functions.js";

export const mbti = new Binder('----');
export const feature = new Binder('#808080');

const bars = {
  e: new Bar('*E|I', '6em', 'gray', 'assets/extremes.gif'),
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

feature.addListener(hex => {
  if(!hex) return;

  if (stateP5.update) stateP5.update(hex.hexToCode());

  let [r, g, b] = AUX.rgb(hex).map(v => v * 100 / 255);
  let e = 100 - 100 * AUX.dist(50, 50, 50, r, g, b) / AUX.dist(0, 0, 0, 50, 50, 50);
  let s = 100 * r / (0.5 * (g + b) + r);
  let f = 100 * b / (g + b);
  let j = (r + g + b) / 3;

  const binar = (v, A, B, N = '-', T = 100, D = 2) => v > T / 2 + D ? A : v < T / 2 - D ? B : N;
  mbti.value = binar(e, 'E', 'I') + binar(s, 'S', 'N') + binar(f, 'F', 'T') + binar(j, 'J', 'P');

  bars.r.value = r;
  bars.g.value = g;
  bars.b.value = b;
  bars.e.value = e;
  bars.s.value = s;
  bars.f.value = f;
  bars.j.value = j;
  bars.id.value = 0.5 * (r + b);
  bars.ego.value = 0.5 * (g + r);
  bars.sup.value = 0.5 * (g + b);
});

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
      div: [bars.f.model, bars.s.model, bars.e.model],
    }, {
      a: {
        text: 'MBTI',
        href: 'https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator',
        target: '_blank'
      },
      div: bars.j.model,
      p: {
        fontSize: '1.25em',
        letterSpacing: '0.25em',
        fontFamily: 'monospace',
        border: 'solid 1px',
        margin: '1em 0 0 3em',
        text: mbti
      }
    }]
  },
  footer: {
    fontSize: '0.68em',
    text: '* Extroversion (E) here refers to being sociable: a combination of outgoing, empathetic, open, agreeable.'
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
    me.update(feature.value.hexToCode());
  }
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
    p: 'State & archetype',
    div: {
      canvas: stateElement
    },
    h5: {
      text: feature.bind(v => v ? 'The ' + states[v.hexToCode()].archetype : '')
    }
  },
  section: psychModel
}

export default model;
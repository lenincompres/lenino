import Bar from './Bar.js';
import State from "./State.js";
import states from "./states.js";
import * as style from "./style.js";
import * as AUX from "./functions.js";

export const mbti = new Binder('- - - -');
export const feature = new Binder('#808080');
const featureInfo = new Binder();

feature.bind(featureInfo, v => {
  let info = states[v.hexToCode()];
  const level = (d, i) => new Object({
    b: {
      color: ['red','lime','blue'][d],
      text: '■ '
    },
    span: [['Physically', 'Rationally', 'Emotionally'][d] + ' ', {
      fontWeight: 'bold',
      textShadow: i == 2 ? '0 0 1px black, 0 0 1px black, 0 0 1px black' : undefined,
      color: ['black', 'gray', 'white'][i],
      text: ['relaxed', 'flexible', 'tense'][i]
    }]
  });
  info.p = level(0, parseInt(info.code[0]));
  info.r = level(1, parseInt(info.code[1]));
  info.e = level(2, parseInt(info.code[2]));
  return {
    p: `The ${info.colour.toLowerCase()} color of the PRE spectrum is the <i>${info.adjective.toLowerCase()}</i> state. It represents a psyche focused on <i>${info.concept.toLowerCase()}</i>, as an archetypical ${info.archetype.toLowerCase()}.`,
    ul: {
      textAlign: 'left',
      margin: '1em auto 0',
      width: 'fit-content',
      li: [info.p, info.r, info.e]
    }
  }
});

const bars = {
  e: new Bar('*E|I', '6em', 'gray', 'assets/extremes.gif'),
  s: new Bar('S|N', '6em', 'red', 'cyan'),
  f: new Bar('F|T', '6em', 'blue', 'lime'),
  j: new Bar('J|P', '6em', 'white', 'black'),
  id: new Bar('Id', '6em', 'magenta'),
  ego: new Bar('Ego', '6em', 'yellow'),
  sup: new Bar('Sup.', '6em', 'cyan'),
  r: new Bar('Phys…', '6em', 'red'),
  g: new Bar('Rati…', '6em', 'lime'),
  b: new Bar('Emot…', '6em', 'blue')
}

feature.addListener(hex => {
  if (!hex) return;

  if (stateP5.update) stateP5.update(hex.hexToCode());

  let [r, g, b] = AUX.rgb(hex).map(v => v * 100 / 255);
  let getI = n => 100 * Math.pow(Math.abs(n - 50) / 50, 0.68);
  let j = (r + g + b) / 3;
  let f = 100 * b / (g + b);
  let s = 100 * r / (0.5 * (g + b) + r);
  let e = 100 - 100 * AUX.dist(r, g, b, 50, 50, 50) / AUX.dist(0, 0, 0, 50, 50, 50);
  //let e = 100 - (getI(r) + getI(g) + getI(b)) / 3;

  const binar = (v, A, B, N = '-', T = 100, D = 1) => v > T / 2 + D ? A : v < T / 2 - D ? B : N;
  mbti.value = [binar(e, 'E', 'I'), binar(s, 'S', 'N'), binar(f, 'F', 'T'), binar(j, 'J', 'P')].join(' ');

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

const stateElement = new Binder();
var stateP5 = new p5(function (me) {
  me.setup = _ => {
    stateElement.value = me.createCanvas(120, 120).elt;
    me.translate(me.width / 2, me.height / 2);
    me.update = (code) => {
      me.clear();
      let state = new State(me, {
        center: code,
        radius: me.width / 2
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
    width: '18em',
    padding: '1.5em',
    div: {
      canvas: stateElement
    },
    h5: {
      margin: '0.5em 0',
      text: feature.bind(v => v ? `The ${states[v.hexToCode()].archetype}\n(${states[v.hexToCode()].colour2})` : '')
    },
    small: {
      display: 'block',
      width: 'fit-content',
      margin: '0 auto',
      div: {
        content: featureInfo
      }
    }
  },
  section: {
    style: style.floatingSign,
    margin: '1em 0',
    header: {
      text: feature.bind(v => 'Hex code: ' + v)
    },
    ul: {
      fontSize: 'small',
      css: {
        display: 'flex',
        flexWrap: 'wrap',
        placeContent: 'space-evenly',
        li: {
          display: 'inline-block ',
          margin: '0.5em 0',
          width: '9em',
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
          fontSize: '1.5em',
          fontFamily: 'monospace',
          margin: '0.5em 0 0 2em',
          text: mbti
        }
      }]
    },
    footer: {
      fontSize: '0.68em',
      marginTop: '0.5em',
      text: '* Extroversion (E) here refers to being sociable: a combination of outgoing, empathetic, open, agreeable.'
    }
  }
};

export default model;
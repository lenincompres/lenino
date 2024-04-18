/* 
  ChinesePop v2.0 | 20190530 
  https://github.com/lenincompres/lenodeJS 
  Create by: Lenin Compres
*/

import Lenode from './lib/Lenode.js';
import style from './Game.style.js';

const Sound = {
  right: () => (new Audio('./assets/sounds/rain.mp3')).play(),
  wrong: () => (new Audio('./assets/sounds/thunder.mp3')).play(),
  won: () => (new Audio('./assets/sounds/flute.mp3')).play(),
  lost: () => {
    (new Audio('./assets/sounds/thunder.mp3')).play();
    (new Audio('./assets/sounds/sad-chimes.mp3')).play();
  },
  character: (char, delay = 0) => setTimeout(() => (new Audio(`./assets/sounds/say/${char.character}.mp3`)).play(), delay)
}

const Random = {
  number: (t, b = 0) => b + Math.floor(Math.random() * (t - b)),
  item: arr => arr[Math.floor(Math.random() * arr.length)]
}

var current = {
  min: 0,
  max: 3,
  time: 100,
  playing: false
};

var chars = [];

var game = new Lenode({
  timer: {
    div: {}
  },
  level: {
    h1: ''
  },
  controls: {
    left: '<',
    records: '···',
    right: '>'
  },
  rocks: {},
  mistakes: [],
  tiles: [],
  goal: {
    hint: 'Tap to begin.',
    desc: 'Welcome'
  },
  records: [],
  _style: style
});

var app = Lenode.app({
  title: 'ChinesePop',
  icon: 'assets/images/icon',
  styles: ['@import url(https://fonts.googleapis.com/css?family=Satisfy)'],
  fonts: {
    head: 'satisfy'
  },
  colors: {
    hot: '#c30',
    cool: '#099'
  },
  pages: {
    home: game
  },
  container: {
    header: {
      h1: 'Chinese<b>Pop</b>',
      p: 'by ' + Lenode.link('http://www.lenino.net', 'Lenino')
    },
    main: {},
    bg: {},
    _style: {
      textAlign: 'center',
      margin: '.25rem auto',
      minWidth: '18rem',
      maxWidth: '50rem',
      width: 'calc(100vw - .5rem)',
      height: 'calc(100vh - .5rem)',
      boxShadow: '2px 2px 2px',
      borderRadius: '.86rem',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      transition: '.4s',
      header: {
        fontSize: '2.5vh',
        height: '5em',
        backgroundColor: 'rgba(0, 0, 0, .5)',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        boxSizing: 'border-box',
        zIndex: 1,
        h1: {
          padding: '.86em 0 0',
          b: {
            color: '#132',
            textShadow: '0 0 3px white',
            fontWeight: 'bold',
          }
        },
        p: {
          fontSize: '.86em',
        }
      },
      main: {
        zIndex: 1,
      },
      bg: {
        zIndex: 0,
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        backgroundImage: 'url("assets/images/bg.jpg")',
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center 0',
        _light: {
          backgroundBlendMode: 'hard-light'
        },
        _dark: {
          opacity: '.68'
        }
      }
    }
  }
});

/* --------------- CONTROLS ----------- */

app.container.header.h1.onclick = () => gameOver();
game.controls.left.onclick = () => setLevel(current.level - 1);
game.controls.right.onclick = () => setLevel(current.level + 1);
game.controls.records.onclick = () => showRecords();
game.level.onclick = game.goal.onclick = () => current.playing ? Sound.character(current.goal) : start();

/* --------------- SETTINGS -------------- */

Lenode.getJSON('assets/hanziDB.json').then(setup);

function setup(c) {
  chars = c;
  current.records = document.lehead.getCookie('chinesepop-records');
  current.records = !!current.records ? current.records.split(',').map(v => parseInt(v)) : [0];
  current.maxLevel = current.records.length;
  game.addClass('over');
  setLevel();
  setGoal('Tap to begin.', 'Welcome');
  Sound.won();
}

function setLevel(level, advanced = false) {
  level = parseInt(level);
  !level ? level = current.maxLevel : null;
  isNaN(level) ? level = Math.ceil(current.info.maxLevel / 3) : null;
  level < 1 ? level = 1 : level > current.maxLevel ? level = current.maxLevel : null;
  current.level = level;
  var isMax = level === current.maxLevel;
  game.level.replaceChild(current.level, 'h1');
  current.max = (level - 1) * 3;
  current.grid = current.level > 4 ? 4 : 3;
  game.controls.records.setClass('disabled', current.maxLevel < 1);
  game.controls.left.setClass('disabled', level <= 1);
  game.controls.right.setClass('disabled', level >= current.maxLevel).setClass('new', advanced);
  setTiles();
  game.tiles.setClass('perfect', current.records[level - 1] > 0).setClass('burn', current.records[level - 1] < 0).setClass('new', isMax);
  game.rocks.setClass('hidden', isMax || current.records[level - 1] < 1);
  game.mistakes.build(current.records[level - 1] < 0 ? [''] : []);
}

function setTiles(tiles) {
  !tiles ? tiles = chars.slice(current.max, current.max + 3) : null;
  current.tiles = tiles;
  game.replaceChild(tiles.map(t => ({
    char: t.character,
    pinyin: t.pinyin,
    _order: t.frequency - 1
  })), 'tiles');
  game.tiles.forEach(tile => tile.char._text ? tile.onclick = t => tileClicked(t) : tile.addClass('blank'));
  const w = game.tiles._node.offsetWidth;
  const m = 5;
  const c = Math.min(current.grid, tiles.length);
  game.tiles.addStyle({
    li: {
      fontSize: (w / c - m * (c + 1)) + 'px !important',
      margin: m + 'px',
    }
  });
}

function setGoal(hint = '', desc = '') {
  game.goal.desc._text = desc;
  game.goal.hint._text = hint;
  game.goal.flashClass('animate', .5);
}

function setTimer(value = 100) {
  current.time = value;
  game.timer.div.setStyles({
    width: current.time + '%',
    backgroundColor: `rgba(${2.55*value*value/100},${100*1.55*value},${2.55*value})`,
    boxShadow: `0 0 ${8-.08*value}px #fe0`,
    border: `solid 1px rgba(255,255,0,${1 - value/100})`
  });
}

/* -------------- METHODS ------------ */

function showRecords() {
  var n = current.maxLevel,
    arr = [];
  while (n--) {
    var i = (n + 1) * 3;
    arr.push({
      h1: n + 1,
      chars: [chars[i--].character, chars[i--].character, chars[i--].character],
      _class: current.records[n] > 0 ? 'perfect' : current.records[n] < 0 ? 'burn' : null
    });
  }
  game.records.addClass('show').build(arr);
  game.records.forEach(l => l.onclick = () => {
    setLevel(l.h1._text);
    game.records.removeClass('show');
  });
}

function start() {
  current.perfect = true;
  game.rocks.removeClass('hidden');
  game.removeClass('over won');
  current.max = current.level * 3;
  const init = current.grid * current.grid;
  const clueCount = Math.floor(init) * .5;
  var tileSet = [
    chars[current.max - 1],
    chars[current.max - 2],
    chars[current.max - 3]
  ];
  while (tileSet.length < init) {
    let char = tileSet.length < clueCount ?
      chars[Random.number(current.min, current.max)] : {};
    tileSet.push(char);
  }
  setTiles(tileSet);
  game.tiles.shuffle();
  game.mistakes.build([]);
  current.playing = true;
  pickGoal();
  current.timeLoop = setInterval(() => {
    if (current.time > 0) return setTimer(current.time - .5);
    current.time = 101;
    return addTile();
  }, 40);
}

function pickGoal(delay = 0) {
  const tileSet = game.tiles.filter(t => !t.hasClass('blank'));
  if (!tileSet.length) return gameOver(true);
  current.goal = chars[Random.item(tileSet)._order];
  setGoal(current.goal.pinyin, current.goal.definition);
  Sound.character(current.goal, delay);
}

function tileClicked(tile) {
  setTimer(100);
  if (tile.char._text !== current.goal.character) {
    tile.flashClass('wrong', .25);
    game.mistakes.add('');
    return addTile();
  }
  app.container.bg.flashClass('dark', .4);
  game.mistakes.pop();
  tile.build({}).addClass('blank').onclick = null;
  Sound.right();
  pickGoal(450);
}

function addTile() {
  if (current.perfect) {
    current.perfect = false;
    game.rocks.addClass('hidden');
  }
  Sound.wrong();
  app.container.bg.flashClass('light', .2);
  game.mistakes.add('');
  let emptyTiles = game.tiles.filter(tile => tile.hasClass('blank'));
  if (!emptyTiles.length) return gameOver();
  let i = Random.number(current.min, current.max);
  Random.item(emptyTiles).build({
    char: chars[i].character,
    pinyin: chars[i].pinyin,
    _order: i,
  }).removeClass('blank').onclick = t => tileClicked(t);
}

function gameOver(won) {
  if (!current.playing) return;
  var hint = "Retry this level.";
  var desc = "You've lost.";
  current.records[current.level - 1] = -1;
  game.mistakes.build([]);
  if (won) {
    current.records[current.level - 1] = current.perfect === true ? 1 : 0;
    if (!game.mistakes._length) {
      hint = "Level cleared.";
      desc = "You've won!";
      if (current.level === current.maxLevel) {
        var advanced = true;
        hint = "New level reached.";
        current.records.push(0);
        current.maxLevel = current.level + 1;
      };
    } else {
      hint = "To advance, you need no fire.";
      desc = "You've cleared the board!";
    }
  }
  document.lehead.setCookie('chinesepop-records', current.records.join(','));
  won ? Sound.won() : Sound.lost();
  current.playing = false;
  game.addClass('over').setClass('won', !!won);
  setLevel(current.level, advanced);
  setGoal(hint, desc);
  clearInterval(current.timeLoop);
}
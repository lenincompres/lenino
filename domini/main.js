const G = 30;
const G2 = 2 * G;
const MARGIN = 4;
const TABLE = 10;
const COL = 12;
const ROW = 6;
const SIZE = TABLE * G2 + 2 * MARGIN;
const NAMES = ["Minga", "Mon", "Chepe", "Tati"];
const BOARD_SIZE = 6;
const BOARD_0 = 2;

let tiles = [
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 1, 0, 1],
  [0, 1, 1, 1],
  [0, -1, -1, -1],
  [0, 0, 0, -1],
  [0, 1, 0, -1],
  [-1, 1, 1, 0],
  [0, 1, -1, 1],
  [1, 1, 1, -1],
  [-1, 1, -1, 0],
  [0, 0, -1, -1],
  [0, 1, -1, 0],
  [0, 1, 1, -1],
  [-1, 1, -1, 1],
  [0, 1, -1, -1],
  [-1, -1, -1, -1],
  [0, -1, 0, -1],
  [-1, 1, 0, 0],
  [-1, 1, 1, -1],
  [-1, 1, -1, -1],
  [1, 1, 1, 1],
  [-1, 1, 0, -1],
];
let hands = [
  [2 * G2, 0],
  [9 * G2, 2 * G2],
  [2 * G2, 9 * G2],
  [0, 2 * G2],
];
let currentPlayer;

const selectedTileB = new Binder();
const nextBinder = new Binder(false);

function setup() {
  hands = hands.map((xy, i) => Hand(...xy, !(i % 2), NAMES[i], G, MARGIN));

  tiles = tiles.map(plan => Tile(0, 0, plan, G, MARGIN));
  tiles.sort(() => random() - 0.5);
  tiles.forEach((t, i) => {
    let hand = hands[i % hands.length];
    if (hand) hand.addTile(t);
  });

  DOM.set({
    textAlign: "center",
    background: "#89a",
    css: {
      a: {
        color: "rgba(255,255,255,0.86)",
        textShadow: "0 0 2px black",
      },
      h: {
        marginTop: "0.5em",
        textAlign: "center",
      },
    },
    main: {
      display: "flex",
      section: [instructions, {
        width: "100%",
        heading: {
          h1: "DOMiNi",
          p: `by <a target="_blank" href="http://lenino.net">Lenino</a>`,
        },
        main: {
          position: "relative",
          margin: "1em auto",
          width: "fit-content",
          canvas: createCanvas(SIZE, SIZE),
          button: {
            position: "absolute",
            margin: MARGIN + "px",
            right: 0,
            bottom: 0,
            text: selectedTileB.bind(["Pass", "Play"]),
            display: selectedTileB.bind(v => currentPlayer === 3 ? "none" : "block"),
            click: e => nextPlayer(),
          }
        },
        footer: {
          p: "Click to select a tile (mousewheel or press arrows to rotate it). In your turn, drag a tile to place it on the board."
        },
      }]
    }
  });

  nextPlayer();
}

function getTileAt(i, j) {
  return tiles.filter(t => i === t.i && j === t.j)[0];
}

function draw() {
  clear();

  // draws the board
  push()
  stroke(0, 86);
  fill("#abc");
  Array(pow(BOARD_SIZE, 2)).fill().forEach((_, i) => {
    let j = floor(i / BOARD_SIZE)
    i = i % BOARD_SIZE;
    let x = MARGIN + 2 * G2 + i * G2;
    let y = MARGIN + 2 * G2 + j * G2;
    square(x, y, G2);
  });
  pop();

  hands.forEach(h => h.draw());
  tiles.forEach(t => t.draw());
}

function nextPlayer() {
  if (currentPlayer === undefined) {
    currentPlayer = tiles.find(t => t.isBlack).hand;
    selectTile(tiles.find(t => t.isBlack));
  } else {
    currentPlayer.selected = false;
    let i = hands.indexOf(currentPlayer);
    currentPlayer = hands[(i + 1) % hands.length];
  }
  currentPlayer.selected = true;
}

//Handling tiles

function getSelected() {
  return selectedTileB.value;
}

function deselect() {
  let tile = getSelected();
  if (!tile) return;
  tile.selected = false;
  selectedTileB.value = false;
  if (!tile.correct) tile.rebase();
  else {
    tile.hand.removeTile(tile, true);
    nextPlayer();
  };
}

function selectTile(tile) {
  if (getSelected() === tile) return;
  deselect();
  if (!tile) return;
  if (tile.hand !== currentPlayer) {
    // not in the player's hand
    return;
  }
  selectedTileB.value = tile;
  tile.selected = true;
  tiles = tiles.filter(t => t !== tile);
  tiles.push(tile);
}

function mousePressed() {
  if (!tiles) return;
  let closest = getTileAt(floor(mouseX / G2), floor(mouseY / G2));
  selectTile(closest);
}

function rotateSelected(dir) {
  let tile = getSelected();
  if (!tile) return;
  tile.rotate(dir);
  tile.correct = checkMove();
}

let blockWheel = false;

function mouseWheel(e = 0) {
  if (blockWheel) return;
  if (!tiles) return;
  rotateSelected(e.delta);
  blockWheel = true;
  setTimeout(_ => blockWheel = false, 200);
}

function keyPressed() {
  if (!tiles) return;
  if (keyCode === LEFT_ARROW || keyCode === DOWN_ARROW) {
    rotateSelected();
  } else if (keyCode === RIGHT_ARROW || keyCode === UP_ARROW) {
    rotateSelected(-1);
  }
}

function mouseDragged() {
  let tile = getSelected();
  if (!tile) return;
  let [i, j] = [floor(mouseX / G2), floor(mouseY / (G2))];
  if (i < 0 || j < 0) return;
  if (i >= TABLE || j >= TABLE) return;
  if (getTileAt(i, j)) return;
  tile.position(i * G2, j * G2);
  tile.correct = checkMove();
}

function checkMove() {
  let tile = getSelected();
  let [i, j] = [tile.i, tile.j];
  if (i < BOARD_0 ||
    j < BOARD_0 ||
    i > BOARD_0 + BOARD_SIZE - 1||
    j > BOARD_0 + BOARD_SIZE - 1) {
    // out of bounds
    return false;
  }
  let tileT = tiles.find(t => t.i === i && t.j === j - 1);
  let tileR = tiles.find(t => t.i === i + 1 && t.j === j);
  let tileB = tiles.find(t => t.i === i && t.j === j + 1);
  let tileL = tiles.find(t => t.i === i - 1 && t.j === j);
  tile.total = [tileT, tileR, tileB, tileL].reduce((o,v) => v ? o + 1 : o, 0);
  if (!tileT && !tileR && !tileB && !tileL && !tile.isBlack) {
    //putting alone a non black tile
    return false;
  }
  //check matching
  if (tileT &&
    (tile.plan[0] !== tileT.plan[3] ||
      tile.plan[1] !== tileT.plan[2]))
    return false;
  if (tileR &&
    (tile.plan[1] !== tileR.plan[0] ||
      tile.plan[2] !== tileR.plan[3]))
    return false;
  if (tileB &&
    (tile.plan[2] !== tileB.plan[1] ||
      tile.plan[3] !== tileB.plan[0]))
    return false;
  if (tileL &&
    (tile.plan[0] !== tileL.plan[1] ||
      tile.plan[3] !== tileL.plan[2]))
    return false;
  return true;
}
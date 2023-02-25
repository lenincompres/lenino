function getArray(n, f = () => null) {
  return Array(n).fill().map((_, i) => f(i));
}

const [CARD_MIN, CARD_MAX] = [2, 10];

const [SUIT_D, SUIT_H, SUIT_C, SUIT_S] = [{
  symbol: "diamonds",
  alt: "gold",
  cast: "merchant",
  trait: "wealth",
  color: "goldenrod",
  image: "assets/suit-diamonds.png",
}, {
  symbol: "hearts",
  alt: "cups",
  cast: "charmer",
  trait: "charm",
  color: "brown",
  image: "assets/suit-hearts.png",
}, {
  symbol: "clubs",
  alt: "clovers",
  cast: "sage",
  trait: "wisdom",
  color: "teal",
  image: "assets/suit-clovers.png",
}, {
  symbol: "spades",
  alt: "swords",
  cast: "warrior",
  trait: "strength",
  color: "darkslateblue",
  image: "assets/suit-spades.png",
}];


class card {
  constructor(number, suit, callback = () => null) {
    this._buttonEnabled = new Binder(true);
    this._canAdd = new Binder(true);
    this._number = new Binder(2);
    this._suit = new Binder(SUIT_C);
    this.number = number;
    this.callback = () => callback(this);
    let numbers = getArray(2, i => DOM.element({
      display: this._buttonEnabled.bind(v => !v || !i ? "block" : "none"),
      position: "absolute",
      margin: "5% 7%",
      bottom: i % 2 ? 0 : undefined,
      right: i % 2 ? 0 : undefined,
      transform: i % 2 ? "rotate(180deg)" : undefined,
      h2: {
        color: this._suit.bind(v => v.color),
        display: "inline-block",
        text: this._number,
      },
      img: {
        height: "1.3em",
        src: this._suit.bind(s => s.image),
      }
    }));

    this.suit = suit;
    let img_center = {
      opacity: this._number.bind(v => v % 2 ? 1 : 0),
      top: "50%",
      left: "50%",
    };
    let img_middle = getArray(2, i => new Object({
      opacity: this._number.bind(v => [2, 3, 6, 7, 10, 11].includes(v) ? 1 : 0),
      top: ["34%", "66%"][i],
      left: "50%",
      transform: `rotate(${["0", "180"][i]}deg)`,
    }));
    let img_corners = getArray(4, i => new Object({
      opacity: this._number.bind(v => [4, 5, 8, 9, 10, 11].includes(v) ? 1 : 0),
      top: ["25%", "25%", "75%", "75%"][i],
      left: ["28%", "72%", "28%", "72%"][i],
      transform: `rotate(${["-20", "20", "200", "160"][i]}deg)`,
    }));
    let img_sides = getArray(4, i => new Object({
      opacity: this._number.bind(v => [6, 7, 8, 9, 10, 11].includes(v) ? 1 : 0),
      top: ["42%", "42%", "58%", "58%"][i],
      left: ["28%", "72%", "28%", "72%"][i],
      transform: `rotate(${["-60", "60", "240", "120"][i]}deg)`,
    }));
    let imgs = [img_center, ...img_middle, ...img_corners, ...img_sides];
    imgs.forEach(img => img.src = this.suit.image);

    this.element = DOM.element({
      background: "white",
      borderRadius: "1em",
      boxShadow: "1px 1px 3px black",
      position: "relative",
      width: "11em",
      height: "17.5em",
      header: {
        div: numbers
      },
      main: {
        img: {
          transition: "0.5s",
          position: "absolute",
          width: "24%",
          margin: "-12%",
          content: imgs,
        }
      },
      footer: {
        display: this._buttonEnabled.bind(["none", "flex"]),
        position: "absolute",
        bottom: "6%",
        width: "100%",
        justifyContent: "center",
        button: {
          margin: "0 0.5em",
          color: "white",
          borderColor: this.suit.color,
          content: [{
            background: this._number.bind(v => v > CARD_MIN ? this.suit.color : "transparent"),
            color: this._number.bind(v => v > CARD_MIN ? "white" : this.suit.color),
            opacity: this._number.bind(v => v > CARD_MIN ? 1 : 0.4),
            text: "⬇",
            click: e => this.number -= 1,
          }, {
            background: this._canAdd.bind(v => v ? this.suit.color : "transparent"),
            text: "⬆",
            color: this._canAdd.bind(v => v ? "white" : this.suit.color),
            opacity: this._canAdd.bind(v => v ? 1 : 0.4),
            click: e => this.canAdd ? this.number += 1 : null,
          }]
        },
      }
    }, "section");
  }

  set number(v) {
    if (this.number >= CARD_MAX) this.canAdd = false;
    if (v < CARD_MIN || v > CARD_MAX) return;
    this._number.value = v;
    this.callback ? this.callback(v) : null;
  }

  get number() {
    return this._number.value;
  }

  set suit(v) {
    this._suit.value = v;
  }

  get suit() {
    return this._suit.value;
  }

  set canAdd(b) {
    this._canAdd.value = b;
  }

  get canAdd() {
    return this._canAdd.value;
  }

  set enabled(b) {
    this._buttonEnabled.value = b;
  }

  get enabled() {
    this._buttonEnabled.value;
  }

}
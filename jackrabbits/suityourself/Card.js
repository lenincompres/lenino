function getArray(n, f = () => null) {
  return Array(n).fill().map((_, i) => f(i));
}

const [SUIT_D, SUIT_H, SUIT_C, SUIT_S] = [{
  symbol: "diamonds",
  alt: "gold",
  cast: "merchants",
  trait: "wealth",
  color: "goldenrod",
  image: "assets/suit-diamonds.png",
}, {
  symbol: "hearts",
  alt: "cups",
  cast: "charmers",
  trait: "charm",
  color: "brown",
  image: "assets/suit-hearts.png",
}, {
  symbol: "clubs",
  alt: "clovers",
  cast: "sages",
  trait: "wisdom",
  color: "teal",
  image: "assets/suit-clovers.png",
}, {
  symbol: "spades",
  alt: "swords",
  cast: "warriors",
  trait: "strength",
  color: "darkslateblue",
  image: "assets/suit-spades.png",
}];


class card {
  constructor(number, suit, callback = () => null) {
    this._buttonEnabled = new Binder(true);
    this._canAdd = new Binder(true);
    this._number = new Binder(1);
    this._suit = new Binder(SUIT_C);
    this.number = number;
    this.callback = () => callback(this);
    let numbers = getArray(1, i => DOM.element({
      position: "absolute",
      margin: "3% 6%",
      bottom: i % 2 ? 0 : undefined,
      right: i % 2 ? 0 : undefined,
      transform: i % 2 ? "rotate(180deg)" : undefined,
      h1: {
        color: this._suit.bind(v => v.color),
        display: "inline-block",
        text: this._number,
      },
      img: {
        height: "1.5em",
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
      top: ["30%", "70%"][i],
      left: "50%",
      transform: `rotate(${["0", "180"][i]}deg)`,
    }));
    let img_corners = getArray(4, i => new Object({
      opacity: this._number.bind(v => [4, 5, 8, 9, 10, 11].includes(v) ? 1 : 0),
      top: ["20%", "20%", "80%", "80%"][i],
      left: ["25%", "75%", "25%", "75%"][i],
      transform: `rotate(${["-20", "20", "200", "160"][i]}deg)`,
    }));
    let img_sides = getArray(4, i => new Object({
      opacity: this._number.bind(v => [6, 7, 8, 9, 10, 11].includes(v) ? 1 : 0),
      top: ["40%", "40%", "60%", "60%"][i],
      left: ["25%", "75%", "25%", "75%"][i],
      transform: `rotate(${["-60", "60", "240", "120"][i]}deg)`,
    }));
    let imgs = [img_center, ...img_middle, ...img_corners, ...img_sides];
    imgs.forEach(img => img.src = this.suit.image);
    this.element = DOM.element({
      background: "white",
      borderRadius: "0.5em",
      boxShadow: "1px 1px 3px black",
      position: "relative",
      width: "15em",
      height: "22em",
      margin: "0.5em",
      header: {
        div: numbers
      },
      main: {
        img: {
          transition: "0.5s",
          position: "absolute",
          width: "25%",
          margin: "-13%",
          content: imgs,
        }
      },
      footer: {
        display: this._buttonEnabled.bind(["none", "flex"]),
        position: "absolute",
        bottom: "1.2em",
        width: "100%",
        justifyContent: "center",
        button: {
          color: "white",
          content: [{
            background: this._number.bind(v => v > 1 ? this.suit.color : BG_COLOR),
            text: "⬇",
            click: e => this.number -= 1,
          }, {
            background: this._canAdd.bind(v => v ? this.suit.color : BG_COLOR),
            text: "⬆",
            click: e => this.canAdd ? this.number += 1 : null,
          }]
        },
      }
    }, "section");
  }

  set number(v) {
    if(this.number >= 11) this.canAdd = false;
    if (v < 1 || v > 11) return;
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

  set canAdd(b){
    this._canAdd.value = b;
  }

  get canAdd(){
    return this._canAdd.value;
  }

  set enabled(b){
    this._buttonEnabled.value = b;
  }

}
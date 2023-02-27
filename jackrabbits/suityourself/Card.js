function getArray(n, f = () => null) {
  return Array(n).fill().map((_, i) => f(i));
}

class Card extends HTMLElement {
  constructor({
    number = Card.MIN,
    suit = Card.SUIT.D,
    callback = () => null,
    root = "",
    enabled = false,
  }) {
    super();

    this._buttonEnabled = new Binder(enabled);
    this._canAdd = new Binder(true);
    this._number = new Binder(number);
    this._suit = new Binder(suit);

    this.callback = () => callback();

    const DISABLED_COLOR = "#ddd";

    let img_center = {
      opacity: this._number.as(v => v % 2,
        0,
        1,
      ),
      top: "50%",
      left: "50%",
    };
    let img_middle = getArray(2, i => new Object({
      opacity: this._number.as(
        v => [2, 3, 6, 7, 10, 11].includes(v),
        0,
        1,
      ),
      top: ["34%", "66%"][i],
      left: "50%",
      transform: `rotate(${["0", "180"][i]}deg)`,
    }));
    let img_corners = getArray(4, i => new Object({
      opacity: this._number.as(
        v => [4, 5, 8, 9, 10, 11].includes(v),
        0,
        1,
      ),
      top: ["25%", "25%", "75%", "75%"][i],
      left: ["28%", "72%", "28%", "72%"][i],
      transform: `rotate(${["-20", "20", "200", "160"][i]}deg)`,
    }));
    let img_sides = getArray(4, i => new Object({
      opacity: this._number.as(
        v => [6, 7, 8, 9, 10, 11].includes(v),
        0,
        1,
      ),
      top: ["42%", "42%", "58%", "58%"][i],
      left: ["28%", "72%", "28%", "72%"][i],
      transform: `rotate(${["-60", "60", "240", "120"][i]}deg)`,
    }));
    let imgs = [img_center, ...img_middle, ...img_corners, ...img_sides];
    imgs.forEach(img => img.src = root + this.suit.image);

    this.set({
      display: "block",
      background: "white",
      borderRadius: "0.7em",
      boxShadow: "1px 1px 3px black",
      position: "relative",
      width: "8em",
      height: "12em",
      header: {
        section: getArray(2, i => new Object({
          position: "absolute",
          margin: "5% 5%",
          bottom: i % 2 ? 0 : undefined,
          right: i % 2 ? 0 : undefined,
          transform: i % 2 ? "rotate(180deg)" : undefined,
          fontSize: "1.1em",
          p: {
            fontFamily: "title",
            textShadow: "none",
            color: this._suit.as(v => v.color),
            text: this._number,
          },
          img: {
            marginTop: "-0.5em",
            width: "1em",
            src: this._suit.as(s => root + s.image),
          }
        }))
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
        flexDirection: "column",
        placeContent: "space-between",
        placeItems: "center",
        textAlign: 0,
        width: "100%",
        height: "100%",
        display: this._buttonEnabled.as("none", "flex"),
        button: {
          fontSize: "1.05em",
          fontFamily: "title",
          margin: "3%",
          background: "transparent",
          transition: "0.5s",
          opacity: "0.8",
          color: this.suit.color + "!important",
          borderColor: this.suit.color + "!important",
          content: [{
            style: this._canAdd.as(
              BUTTON_STYLE.DISABLED,
              BUTTON_STYLE.ENABLED(this.suit.color),
            ),
            text: "+1",
            click: e => this.canAdd ? this.number += 1 : null,
          }, {
            style: this._number.as(v => v > Card.MIN,
              BUTTON_STYLE.DISABLED,
              BUTTON_STYLE.ENABLED(this.suit.color),
            ),
            text: "-1",
            click: e => this.number -= 1,
          }]
        }

      }
    });
  }

  set number(v) {
    this._number.value = v;
    if (this.number >= Card.MAX) this.canAdd = false;
    if (v < Card.MIN || v > Card.MAX) return;
    this._number.value = v;
    this.callback();
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

  static MIN = 2;
  static MAX = 10;
  static SUIT = {
    D: {
      symbol: "diamonds",
      alt: "gold",
      cast: "merchant",
      trait: "wealth",
      color: "goldenrod",
      image: "assets/suit-diamonds.png",
    },
    H: {
      symbol: "hearts",
      alt: "cups",
      cast: "charmer",
      trait: "charm",
      color: "brown",
      image: "assets/suit-hearts.png",
    },
    C: {
      symbol: "clovers",
      alt: "clubs",
      cast: "sage",
      trait: "wisdom",
      color: "teal",
      image: "assets/suit-clovers.png",
    },
    S: {
      symbol: "spades",
      alt: "swords",
      cast: "warrior",
      trait: "strength",
      color: "darkslateblue",
      image: "assets/suit-spades.png",
    }
  };
}

customElements.define("jk-card", Card);

export default Card;
import {
  COLOR
} from "./style.js";

class CardScroll extends HTMLElement {
  constructor(items = [], SPEED = 500) {
    super();
    // creates binders in the element and setters/getters for their values
    this.SPEED = SPEED;
    this.scrolling = 0;
    this.binderSet({
      items: [], // key as the prop to set/get, and the initial value
      selected: -1, // the actual binder will be _selected
    });
    const diff = (val, i) => i - val;
    const dist = (val, i) => Math.abs(diff(val, i));
    const pct = (val, i) => dist(val, i) / items.length;
    const tang = (val, i, goal) => goal * (1 - pct(val, i) / 2) * diff(val, i) / 2;
    this.set({
      content: this._items.as(items => ({
        display: "block",
        margin: "6em auto",
        position: "relative",
        width: "20em",
        minHeight: "25em",
        section: items.map((item, i) => ({
          position: 'absolute',
          width: "20em",
          minHeight: "25em",
          backgroundColor: "white",
          borderRadius: "2.5em",
          boxShadow: "1px 1px 3px black",
          overflow: "hidden",
          border: "solid 1em white",
          transition: `ease-out ${SPEED}ms`,
          borderColor: this._selected.as(val => val === i ? 'white' : `rgba(34,64,64,${Math.abs(tang(val, i, 1))})`),
          cursor: this._selected.as(val => val === i ? 'auto' : 'pointer'),
          zIndex: this._selected.as(val => items.length - dist(val, i)),
          transform: this._selected.as(val => `rotate(${tang(val, i, 30)}deg)`),
          left: this._selected.as(val => val === i ? 0 : val > i ? '-20em' : '33.3em'),
          top: this._selected.as(val => val === i ? 0 : '10em'),
          fontSize: this._selected.as(val => val === i ? '1em' : `0.6em`),
          main: {
            pointerEvents: this._selected.as(val => val === i ? 'auto' : 'none'),
            content: item,
          },
          div: {
            top: 0,
            left: 0,
            position: 'absolute',
            opacity: this._selected.as(val => val === i ? 0 : Math.abs(tang(val, i, 1))),
            backgroundColor: COLOR.LINK_DARK,
            transition: SPEED + "ms",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          },
          onclick: e => this.selected < i ? this.next() : this.prev(),
        })),
        b: {
          color: "black",
          backgroundColor: "white",
          borderRadius: "3em",
          lineHeight: "1em",
          width: "3em",
          height: "3em",
          padding: "1em",
          textAlign: "center",
          position: "absolute",
          top: "14em",
          zIndex: items.length,
          pointerEvents: "none",
          transition: SPEED + "ms",
          content: [{
            text: "◀",
            left: "-3.3em",
            opacity: this._selected.as(val => val > 0 ? 1 : 0),
          }, {
            text: "▶",
            right: "-3.3em",
            opacity: this._selected.as(val => val > -1 && items.length > 1 && val < items.length - 1 ? 1 : 0),
          }],
        },
      }))
    });
    this.items = Array.isArray(items) ? items : [items];
  }

  clear() {
    this.selected = -1;
  }

  start(delay = 4) {
    clearInterval(this.interval);
    this.scrolling = 1;
    this.interval = setInterval(() => this.scroll(), delay * this.SPEED);
  }

  scroll() {
    if (!this.scrolling) return clearInterval(this.interval);
    this.selected += this.scrolling;
    if (this.items.length <= 1) return clearInterval(this.interval);
    if (this.selected < 0 || this.selected >= this.items.length - 1) this.scrolling *= -1;
  }

  next() {
    clearInterval(this.interval);
    if (this.selected <= this.items.length) this.selected += 1;
  }

  prev() {
    clearInterval(this.interval);
    if (this.selected > 0) this.selected -= 1;
  }

}

customElements.define('card-scroll', CardScroll);
export default CardScroll;
import {
  COLOR
} from "./style.js";

class CardScroll extends HTMLElement {
  constructor(items = [], SPEED = 500) {
    if(!Array.isArray(items)) items = [items];
    super();
    this._ITEMS = new Binder([]);
    this._SELECTED = new Binder(-1);
    this.set({
      content: this._ITEMS.as(items => ({
        margin: "6em auto",
        position: "relative",
        width: "20em",
        minHeight: "30em",
        section: items.map((item, i) => {
          const diff = val => i - val;
          const dist = val => items.length - Math.abs(diff(val));
          const shade = val => Math.abs(diff(val)) / (items.length + 2);
          return {
            position: 'absolute',
            width: "20em",
            backgroundColor: "white",
            borderRadius: "2em",
            boxShadow: "1px 1px 3px black",
            overflow: "hidden",
            border: "solid 1em white",
            transition: SPEED + "ms",
            borderColor: this._SELECTED.as(val => val === i ? 'white' : `rgba(34,64,64,${shade(val)})`),
            cursor: this._SELECTED.as(val => val === i ? 'auto' : 'pointer'),
            zIndex: this._SELECTED.as(dist),
            transform: this._SELECTED.as(val => `rotate(${ 30 * items.length * (1-shade(val)) * diff(val)/items.length}deg)`),
            left: this._SELECTED.as(val => val === i ? 0 : val > i ? '-20em' : '33.3em'),
            top: this._SELECTED.as(val => val === i ? 0 : '25%'),
            fontSize: this._SELECTED.as(val => val === i ? '1em' : `0.6em`),
            main: {
              pointerEvents: this._SELECTED.as(val => val === i ? 'auto' : 'none'),
              content: item,
            },
            div: {
              top: 0,
              left: 0,
              position: 'absolute',
              opacity: this._SELECTED.as(val => val === i ? 0 : shade(val)),
              backgroundColor: COLOR.LINK_DARK,
              transition: SPEED + "ms",
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            },
            onclick: e => this._SELECTED.value != i ? this.selected += i > this.selected ? 1 : -1 : null,
          }
        }),
        b: {
          color: "black",
          backgroundColor: "white",
          borderRadius: "1.5em",
          lineHeight: "1em",
          width: "3em",
          height: "3em",
          padding: "1em",
          textAlign: "center",
          position: "absolute",
          top: "50%",
          zIndex: items.length,
          pointerEvents: "none",
          transition: SPEED + "ms",
          content: [{
            left: "-20%",
            text: "◀",
            opacity: this._SELECTED.as(val => val > 0 ? 1 : 0),
          }, {
            text: "▶",
            right: "-20%",
            opacity: this._SELECTED.as(val => val > -1 && items.length > 1 && val < items.length - 1 ? 1 : 0),
          }],
          onready: me => setTimeout(() => this.selected = 0, 2 * SPEED),
        },
      }))
    });
    this.items = items;
  }

  get selected() {
    return this._SELECTED.value;
  }

  set selected(n) {
    this._SELECTED.value = n;
  }

  get items() {
    return this._ITEMS.value;
  }

  set items(items) {
    if(!Array.isArray(items)) items = [items];
    this._ITEMS.value = items;
  }

  clear() {
    this.selected = -1;
  }

}

customElements.define('card-scroll', CardScroll);
export default CardScroll;
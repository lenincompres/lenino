export class Bar {
  constructor(text, w = '10em', c1 = 'white', c2 = false) {
    this.single = !c2;
    this._value = 50;
    this.text = text;
    this.colours = [c1, c2 ? c2 : 'black'];
    this.width = w;
  }

  get dom() {
    return {
      i: this.text,
      span: {
        _style: {
          backgroundColor: this.colours[1],
          backgroundImage: this.colours[1].includes('.') ? this.colours[1] : '',
          display: 'inline-block',
          width: this.width,
          height: '.68em',
          position: 'relative',
          boxShadow: '0 0 1px black',
          verticalAlign: 'middle'
        },
        i: {
          _style: {
            backgroundColor: 'white',
            display: 'none',
            position: 'absolute',
            boxShadow: '1px 1px 2px black',
            right: 0,
            top: '-1.1em',
            padding: '0 0.25em',
            margin:0,
            pointerEvents: 'none',
            zIndex: 10,
            minWidth: 'fit-content',
          },
          onelement: elt => this.popup = !!window.p5 ? elt.elt : elt
        },
        b: {
          _style: {
            display: 'block',
            backgroundColor: this.colours[0],
            backgroundImage: this.colours[0].includes('.') ? `url(${this.colours[0]})` : '',
            position: 'absolute',
            width: '50%',
            margin: 0,
            height: '100%',
            transition: '0.5s',
          },
          onelement: elt => {
            this.elem = !!window.p5 ? elt.elt : elt;
            this.value = this._value;
          }
        },
        onmouseover: e => this.showPercent(),
        onmouseout: e => this.hidePercent()
      }
    }
  }

  showPercent() {
    this.popup.style.display = 'block';
  }

  hidePercent() {
    this.popup.style.display = 'none';
  }

  set value(v) {
    if (isNaN(v)) return;
    this._value = v;
    var percent = this.single ? parseInt(this._value) + '%' : parseInt(this._value) + '%|' + parseInt(100 - this._value) + '%';
    this.elem.style.width = v + '%';
    this.popup.innerText = percent;
  }

  get value() {
    return this._value;
  }

}

export default Bar;
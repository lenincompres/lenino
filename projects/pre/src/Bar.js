export class Bar {
  
  constructor(text, width = '10em', barColor = 'white', baseColor = false) {
    this.single = !baseColor;
    this.text = text;
    this.baseColor = baseColor ? baseColor : 'black';
    this.barColor = barColor;
    this.width = width;
    this.percent = new Binder(50);
    this.showPercent = new Binder(false);
  }

  get model() {
    return {
      whiteSpace: 'nowrap',
      span: {
        display: 'inline-block',
        minWidth: '3em',
        fontFamily: 'monospace',
        textAlign: 'right',
        marginRight: '0.25em',
        text: this.text
      },
      div: {
        backgroundColor: this.baseColor.includes('.') ? 'black' : this.baseColor,
        backgroundImage: this.baseColor.includes('.') ? `url(${this.baseColor})` : undefined,
        backgroundSize: '6.66%',
        display: 'inline-block',
        width: this.width,
        height: '.68em',
        position: 'relative',
        boxShadow: '0 0 1px black',
        verticalAlign: 'middle',
        cursor:  'pointer',
        b: {
          display: 'block',
          backgroundColor: this.barColor.includes('.') ? 'white' : this.barColor,
          backgroundImage: this.barColor.includes('.') ? `url(${this.barColor})` : undefined,
          backgroundSize: '100%',
          position: 'absolute',
          width: this.percent.bind(v => v + '%'),
          margin: 0,
          height: '100%',
          transition: '0.5s',
        },
        i: {
          backgroundColor: 'white',
          display: this.showPercent.bind(v => v ? 'block' : 'none'),
          position: 'absolute',
          boxShadow: '1px 1px 2px black',
          right: 0,
          top: '-1.1em',
          padding: '0 0.25em',
          margin: 0,
          pointerEvents: 'none',
          zIndex: 10,
          minWidth: 'fit-content',
          text: this.percent.bind(v => Math.round(v) + '%'),
        },
        onmouseover: e => this.showPercent.value = true,
        onmouseout: e => this.showPercent.value = false
      }
    }
  }

  set value(val) {
    if (isNaN(val)) return;
    this.percent.value = val;//this.single ? parseInt(v) + '%' : parseInt(v) + '%|' + parseInt(100 - v) + '%';
  }

  get value() {
    return this.percent.value;
  }

}

export default Bar;
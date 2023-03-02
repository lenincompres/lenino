class Settings {
  constructor(label = "Settings", style = {}){
    this.element = {};
    this.opened = new Binder(false);
    this.count = 0;
    this.list = DOM.element({
      display: "flex",
      flexDirection: "column",
      padding:"0.5em 1em",
      background: "rgba(255,255,255,0.5)",
    }, "ul");
    
    DOM.set(e => this.opened.value = false, "click");
    
    this.element = DOM.element({
      background: "rgba(182,182,182,0.5)",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "fit-content",
      borderBottomLeftRadius: "1em",
      borderBottomRightRadius: "1em",
      style: style,
      main: {
        transition: "0.25s",
        overflow: "hidden",
        maxHeight: this.opened.bind(v => !v ? "1px" : this.count * 2 + "em"),
        ul: this.list
      },
      header:{
        textAlign: "center",
        cursor: "pointer",
        padding:"0.5em",
        label: label,
        onclick: e => this.toggle(e),
      },
      click: e => e.stopPropagation(),
    });
  }
  
  toggle(e){
    this.opened.value = !this.opened.value;
  }
  
  addSlider(label, min = 0, max = 100, val, step = 1){
    if(val === undefined) va = 0.5 * (min + max);
    let slider = createSlider(min, max, val, step);
    this.list.set({
      li: {
        display: "flex",
        justifyContent: "space-between",
        padding: "0.25em",
        label: label + ": ",
        slider: {
          height: "1em",
          content: slider
        },
      }
    });
    this.count += 1;
    return slider;
  }
}
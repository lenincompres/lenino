// declares the class
class Collapsable extends HTMLElement {
  constructor(content, linkTextOpen, linkTextClose, linkModel) {
    super();
    this._opened = new Binder();
    this.name = linkTextOpen;
    if(!linkTextOpen) linkTextOpen = this.getAttribute("open-text");
    if(!linkTextClose) linkTextClose = this.getAttribute("close-text");
    if(!linkTextOpen) linkTextOpen = "Expand";
    if(!linkTextClose) linkTextClose = "Close";
    if(content == undefined) content = this.innerHTML;
    this.contentElt = DOM.let("section", content);
    this.set({
      main: {
        maxHeight: this._opened.as(val => val ? `${this.contentElt.offsetHeight}px` : 0),
        overflow: "hidden",
        transition: "0.5s",
        a: {
          name: this.name,
        },
        section: this.contentElt,
      },
      a: {
        display: "block",
        textAlign: "right",
        model: linkModel,
        href: `#${this.name}`,
        onclick: () => this.toggle(),
        content: this._opened.as(linkTextOpen, linkTextClose),
      }
    }, true);
  }

  toggle(){
    this._opened.value = !this._opened.value;
    setTimeout(() => location.href = `#${this.name}`, 200);
  }
  
}
customElements.define("collabsable-section", Collapsable);

export default Collapsable;
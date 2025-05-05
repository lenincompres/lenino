// declares the class
class Collapsable extends HTMLElement {
  constructor(content, linkTextOpen = "Expand", linkTextClose = "Close", linkModel) {
    super();

    this._opened = new Binder();
    this.name = linkTextOpen;

    let contentElt = DOM.let('section', content);

    this.set({
      main: {
        maxHeight: this._opened.as(val => val ? `${contentElt. offsetHeight}px` : 0),
        overflow: `hidden`,
        transition: `0.5s`,
        a: {
          name: this.name,
        },
        section: contentElt,
      },
      a: {
        display: `block`,
        textAlign: `right`,
        model: linkModel,
        onclick: () => this.toggle(),
        content: this._opened.as(linkTextOpen, linkTextClose),
      }
    });
  }

  toggle(){
    this._opened.value = !this._opened.value;
    setTimeout(() => location.href = `#${this.name}`, 200);
  }
}
customElements.define('collabsable-section', Collapsable);

export default Collapsable;
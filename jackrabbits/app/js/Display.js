class Display {



  constructor(id, closable = false, speed = false) {

    this.div = createDiv();

    this.div.id(id ? id : new.target.name);

    this.div.addClass('display');

    this.closable = closable;

    if (closable) {

      this.closeDiv = createDiv('✖');

      this.closeDiv.style('display', 'block');

      this.closeDiv.style('position', 'absolute');

      this.closeDiv.style('top', '0');

      this.closeDiv.style('right', '0');

      this.closeDiv.style('margin', '0.5em');

      this.closeDiv.style('cursor', 'pointer');

      this.closeDiv.style('font-size', '0.86em');

      this.closeDiv.mouseClicked(_ => this.close());

      this.div.child(this.closeDiv);

    }

    this.displayClass = 'open';

    if (speed) {

      this.div.style('transition', speed + 's');

      this.transition = true;

    }

    this.linkCount = 0;

    setTimeout(_ => document.getElementById(this.div.id()).addEventListener("click", e =>{

      e.stopPropagation();

    }), 100);

  }



  hide() {

    this.div.removeClass(this.displayClass);

  }



  show() {

    this.div.addClass(this.displayClass);

  }



  add(elem, tag = 'div', classes = [], container) {

    if (!elem) return;

    if (typeof classes === 'string') classes = classes.split(' ');

    if (typeof elem === 'string') {

      let html = elem;

      elem = createElement(tag);

      elem.html(html);

    }

    if (classes) {

      if (!Array.isArray(classes)) classes = [classes];

      if (classes.length) classes.forEach(c => elem.addClass(c));

    }

    container ? container.child(elem) : this.div.child(elem);

    return elem;

  }



  display(funcOrElem, onClose, btnText) {

    if (!this.transition) {

      this.div.style('transition', '0.5s');

      this.transition = true;

    }

    let delay = 0;

    if (!this.closed) {

      this.hide();

      delay = 100;

    }

    if (funcOrElem) setTimeout(_ => {

      this.clear();

      if (typeof funcOrElem === 'function') funcOrElem();

      else if (funcOrElem) this.add(funcOrElem);

      if(btnText) this.addButton(btnText);

      this.show();

      if(onClose) this.onClose = _ => onClose();

    }, delay);

    this.last = funcOrElem;

  }



  displayLast() {

    this.display(this.last);

  }



  //false value (0) is at the end of choices.

  consult(desc, callBack = _ => null, choices = false, colors = false, values = false) {

    let answer = false;

    if (!values) values = [true, false];

    if (!choices) choices = [pen(HINT.YES), pen(HINT.NO)];

    if (!colors) colors = [COLOR.BRIGHT, COLOR.WARM, COLOR.HOT];

    this.display(_ => {

      this.add(desc);

      choices.forEach((choice, i) => {

        let btn = this.add(choice, 'button');

        btn.mouseClicked(_ => {

          answer = values[i];

          this.close();

        });

        let colori = round(map(i, 0, choices.length, 0, colors.length));

        btn.style('background-color', colors[colori]);

        if (choices.length === 2) btn.addClass('dual');

      });

    }, _ => callBack(answer));

  }





  confirm(desc, yesBack = _ => null, noBack = _ => null) {

    this.consult(desc, yes => {

      yes ? yesBack() : noBack();

    });

  }



  inform(desc, callBack = _ => null, choice = false, colour = false) {

    choice = choice ? [choice] : ['OK'];

    if(colour) colour = [colour];

    this.consult(desc, _ => callBack(), choice, colour);

  }



  close() {

    if(!this.div.hasClass(this.displayClass)) return this.onClose = false;

    if(this.onClose && typeof this.onClose === 'function') this.onClose();

    this.onClose = false;

    this.hide();

  }



  clear() {

    this.div.html('');

    this.div.child(this.closeDiv);

  }



  addButton(text = 'OK', callBack, colour) {

    let btn = this.add(text, 'button');

    if (colour) btn.style('background-color', colour);

    btn.mouseClicked(_ => callBack ? callBack() : this.close());

    return btn;

  }



  addLink(elem, click, over, out, className) {

    elem = this.add(elem, 'a');

    elem.mouseClicked(_ => click ? click() : this.close());

    if(over) elem.mouseOver(_ => over());

    if(out) elem.mouseOut(_ => out());

    elem.addClass(className);

  }

  /*

    link(htmlOrId, click, over, out, style, isId) {

      let link = isId ? document.getElementById(htmlOrId) : document.createElement('a');

      if (!isId) link.innerHTML = htmlOrId;

      if (style) link.setAttribute('style', style);

      if (click) link.onclick = click;

      if (over) link.onmouseover = over;

      if (out) link.onmouseout = out;

      typeof this.linkCount === 'number' ? this.linkCount += 1 : this.linkCount = 0;

      if (!isId) document.getElementById(this.div.id).appendChild(link);

      return link;

    }



    linkId(id, click, over, out, style) {

      return this.link(id, click, over, out, style, true);

    }

  */

  get closed() {

    return !this.div.hasClass(this.displayClass);

  }



  get element() {

    return document.getElementById(this.div.id());

  }



}
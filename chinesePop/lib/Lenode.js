export default class Lenode {

  constructor(model = {}, name, parent, prepend) {
    new.target.name !== 'Lenode' ? this._class = new.target.name.toLowerCase() : null;
    this._name = !name ? this._class : name;
    this._id = !isNaN(document.lenodeIndexer) ? document.lenodeIndexer += 1 : document.lenodeIndexer = 0;
    if (Lenode.isNode(model)) {
      this._node = model;
      this._tag = model.tagName.toLowerCase();
      [...model.children].forEach(node => new Lenode(node, false, node.tagName, this));
      !this._name ? this._name = model.tagName.toLowerCase() : null;
    } else {
      const tagObj = Lenode.getTagObj(name);
      var classes = tagObj ? [tagObj.className] : [];
      this._tag = Array.isArray(model) ? 'ul' : tagObj ? tagObj.tag : 'div';
      this._class && !classes.includes(this._class) ? classes.push(this._class) : null;
      this._node = Lenode.createNode(this._tag, classes, parent ? parent._node : null);
      typeof model === 'string' ? model.endsWith('.json') ?
        this.buildJSON(model) : this._html = model :
        this.build(model);
    }
    parent && parent._isLenode ? parent.replaceChild(this, this._name, prepend) : null;
    parent ? this.parent = parent : null;
  }

  /* ---------------- MAIN LENODE METHODS --------------- */

  setup() {}

  end() {}

  add(model, name, prepend = false) {
    var child;
    if (model && model._isLenode && model._parent !== this) {
      this[model._name] ? this[model._name].remove() : null;
      this._node[prepend ? 'prepend' : 'appendChild'](model._node);
      model._parent ? model._parent[model._name] = undefined : null;
      model._parent = this;
      child = model;
      name ? model._name = name : 'main';
      name ? model.addClass(name) : name = model._name;
    } else {
      child = Lenode.nodify(model, this._list ? 'li' : name, this, prepend);
      if (child && child._node) {
        child._parent = this;
        child._list ? child._list.forEach((li, i) => li._index = i) : null;
      }
    }
    if (Array.isArray(this._list)) {
      child._index = this._list.length;
      this._list.push(child);
      return child;
    }
    return this[name] = child;
  }

  addStyle(style) {
    if (!style) return;
    const uniq = 'lenode-' + this._id;
    //!this._class ? this.addClass(this._class = uniq) : null;
    this.addClass(this._class = uniq);
    if (style === true)
      return document.lehead.addResource(`css/${this._class}.css`);
    if (typeof style === 'string' && style.endsWith('.css'))
      return document.lehead.addResource(style);
    var styleNode = {
      _html: Lestyle.stylize(style, this._class, this._tag),
      _tag: 'style',
      _type: 'text/css'
    };
    const name = 'style_' + this._class;
    return document.lehead ? document.lehead.replaceChild(styleNode, name) : this.replaceChild(styleNode, name, true);
  }

  build(model = {}) {
    this._children.forEach(child => child.remove());
    this._html = '';
    Array.isArray(model) ? this._list = model.map(o => Lenode.nodify(o, 'li', this)) :
      Object.keys(model).forEach(key => this.add(model[key], key));
    return this;
  }

  replace(model) {
    return this._parent ? this._parent.replaceChild(model, this) : null;
  }

  replaceChild(model, child, prepend = false) {
    var name = child && typeof child === 'string' ? child :
      child ? child._name :
      model._name ? name = model._name : null;
    if (!this[name] || !this[name]._isLenode)
      return this.add(model, name, prepend);
    var oldNode = this[name]._node;
    child = model._isLenode ? model : Lenode.nodify(model, name, this);
    child._name !== name ? child.addClass(name)._name = name : null;
    this._node.contains(oldNode) ? this._node.insertBefore(child._node, oldNode) : this._node.appendChild(child._node);
    oldNode.remove();
    child._parent = this;
    return this[name] = child;
  }

  remove(andDelete = false) { //removes this lenode on the parent
    this._node.parentNode ? this._node.parentNode.removeChild(this._node) : null;
    this._style ? this._style.remove() : null;
    if (andDelete) {
      this.parent ? delete this.parent[this._name] : null;
      delete this;
    }
    return;
  }

  update(model = {}) { //updates this lenode
    return this.parent.replaceChild(model, this._name);
  }

  addJSON(url, name, mapper, prepend = false) {
    return Lenode.getJSON(url, mapper).then(r => {
      var r = this.add(r, name, prepend);
      this.setup();
      return r;
    });
  }

  buildJSON(url, mapper, callBack) {
    return Lenode.getJSON(url, mapper).then(r => {
      var r = this.build(r);
      callBack ? callBack() : this.setup();
      return r;
    });
  }

  updateJSON(url, mapper, callBack) {
    return Lenode.getJSON(url, mapper).then(r => {
      var r = this.update(r);
      callBack ? callBack() : this.setup();
      return r;
    });
  }

  get _children() {
    return Array.isArray(this._list) ? this._list :
      Object.keys(this).filter(key => !key.startsWith('_') && key !== 'parent').map(key => this[key]).filter(child => child && child._isLenode);
  }

  /* ---------------- LENODE LIST METHODS --------------- */

  transfer(item, destination) { //Will also remove the item without passing it to another list
    if (!Array.isArray(this._list)) return this;
    var spliced = this._list.splice(this._list.reduce((a, b) => a !== null ? a : b === item ? b._index : null, null), 1)[0]; //extracts the item
    destination ? destination.add(spliced) : null; //pushes item into destination list
    return this.refresh();
  }

  pop() {
    this.transfer(this.itemAt[this._length - 1])
  }

  refresh() { //makes sure the _node reflects the _list, updates _index
    if (!Array.isArray(this._list)) return this;
    [...this._node.querySelectorAll('li')].forEach(li => li.remove()); //removes all nodes
    this._list.forEach((item, i) => { //adds them back in, in the correct order
      item._index = i;
      item._parent = this;
      this._node.appendChild(item._node);
    });
    return this;
  }

  shuffle() {
    if (!Array.isArray(this._list)) return this;
    var newList = [];
    this._list.forEach(item => newList.splice(Math.round(Math.random() * newList.length), 0, item));
    this._list = newList;
    return this.refresh();
  }

  itemAt(i) {
    if (!Array.isArray(this._list)) return null;
    return this._list[i];
  }

  forEach(func) {
    return this._list.forEach(func);
  }

  map(func) {
    return this._list.map(func);
  }

  reduce(func) {
    return this._list.reduce(func);
  }

  filter(func) {
    return this._list.filter(func);
  }

  get _length() {
    return this._list.length;
  }

  /* ---------------- STYLE METHODS --------------- */

  getStyle(prop) {
    return this._node.style[prop];
  }

  setStyle(prop, value) {
    this._node.style[prop] = value;
    return this;
  }

  setStyles(input = {}) {
    Object.keys(input).forEach(prop => this.setStyle(prop, input[prop]));
    return this;
  }

  hasClass(cls) {
    return this._node.classList.contains(cls);
  }

  addClass(cls, transition = false) {
    return this.setClass(cls, true, transition);
  }

  removeClass(cls, transition = false) {
    return this.setClass(cls, false, transition);
  }

  toggleClass(cls, transition = false) {
    return this.setClass(cls, !this.hasClass(cls), transition);
  }

  setClass(cls, add = true, transition = false) {
    transition ? this.setStyle('transition', typeof transition === 'number' ? `${transition}s` : transition) : null;
    typeof cls === 'string' ? cls = cls.split(' ') : null;
    this._node.classList[add ? 'add' : 'remove'](...cls);
    return this;
  }

  flashClass(cls, duration = 1, callBack = null, transition = false) {
    this.addClass(cls, transition);
    setTimeout(e => {
      this.removeClass(cls);
      typeof callBack === "function" ? callBack() : null;
    }, duration * 1000);
    return this;
  }

  runClasses(classes, duration = 1, callBack, transition = false) {
    if (!classes || !classes.length) return;
    var cls = classes.shift();
    if (!cls) return;
    if (classes.length) {
      this.flashClass(cls, duration, this.runClasses(classes, duration, callBack, transition), transition);
    } else {
      this.addClass(cls, transition);
      callBack ? callBack() : null;
    }
    return this;
  }

  /* ---------------- NODE EQUIVALENCE METHODS --------------- */

  handleEvent(eventName, func) {
    this.setStyle('pointer-events', 'auto');
    this._node[eventName] = e => {
      e.stopPropagation();
      func(e);
    }
  }
  set onclick(func) {
    this.handleEvent('onclick', () => func(this));
  }
  set onchange(func) {
    ;
    this.handleEvent('onchange', () => func(this));
  }
  set onblur(func) {
    this.handleEvent('onblur', () => func(this));
  }

  click() {
    return this._node.click();
  }

  querySelector(selector) {
    return this._node.querySelector(selector);
  }

  querySelectorAll(selector) {
    return this._node.querySelectorAll(selector);
  }

  setAttribute(attribute, value) {
    return this._node.setAttribute(attribute, value);
  }

  getAttribute(attribute) {
    return this._node.getAttribute(attribute);
  }

  get _attributes() {
    var attr = this._node.attributes;
    var val = {};
    Object.keys(attr).map(k => val[attr[k].name] = attr[k].value);
    return val;
  }

  set _html(html) {
    this._node.innerHTML = html;
  }
  set _text(text) {
    this._node.innerText = text;
  }
  set _value(text) {
    this._node.value = text;
  }
  get _html() {
    return this._node.innerHTML;
  }
  get _text() {
    return this._node.innerText;
  }
  get _value() {
    return this._node.value;
  }
  get _isLenode() {
    return Lenode.isNode(this._node);
  }

  /* ---------------- STATIC METHODS --------------- */

  static app(attr) {
    return new Lehead(attr);
  }

  static getTagObj(name) {
    if (!name || name.startsWith('_')) return null;
    var tag = Lenode.isTag(name) ? name : 'div';
    var className = name;
    const nameTag = name.split('_')[0];
    if (Lenode.isTag(nameTag)) {
      tag = nameTag;
      className = name.substr(tag.length + 1);
    }
    return {
      tag: tag,
      className: className
    }
  }

  static nodify(model = {}, name, parent, prepend = false) { //turns an object and children into nested html nodes
    if (model === undefined || model === null || name === '_tag') return;
    if (Lenode.isNode(model)) return new Lenode(model, false, name, parent);
    if (!name) console.log(model);
    const tagObj = Lenode.getTagObj(name);
    var tag = Array.isArray(model) ? 'ul' : model._tag ? model._tag : !tagObj ? null : tagObj.tag;
    var classes = !tagObj ? null : tagObj.className;
    delete model._tag;
    if (!tagObj && parent) { //meant as attribute
      if(name === '_style' && typeof model !== 'string' && !parent._style)
        return  parent._style = parent.addStyle(model);
      ['_html', '_text'].includes(name) ? null :
        name === '_class' ? parent.addClass(model) :
        parent.setAttribute(name.replace(/_/, ''), model);
      return parent[name] = model;
    }
    if (['boolean', 'number', 'string'].includes(typeof model)) { //end lenodes (no children)
      var node = this.createNode(tag, classes, parent._node, {}, prepend);
      node.innerHTML = model;
      return new Lenode(node, false, name, this, prepend);
    }
    ['script', 'link', 'meta', 'style'].includes(tag) ? classes = null : null;
    //creates child lenode and nodifies grand children
    var child = new Lenode(this.createNode(tag, classes, parent._node, {}, prepend), false, name, parent);
    tag === 'main' && !document.lemain ? document.lemain = child : null;
    tag === 'ul' ? child._list = model.map((o, i) => Lenode.nodify(o, 'li_' + i, child)) :
      Object.keys(model).forEach(key => child.add(model[key], key));
    return child;
  }

  static link(page, text, isPage = true, target = '_blank') {
    page.startsWith('http') ? isPage = false : null;
    !text ? text = page : null;
    return isPage ? `<a onclick=lehead.goto("${page}")>${text}</a>` :
      `<a href="${page}" target="${target}">${text}</a>`;
  }

  static createNode(tag = 'div', classes, parentNode, props = {}, prepend = false) {
    var node = document.createElement(tag);
    if (!Lenode.isNode(node)) return;
    if (classes) node.className = Array.isArray(classes) ? classes.join(' ') : classes;
    parentNode ? parentNode[prepend ? 'prepend' : 'appendChild'](node) : null;
    Object.keys(props).forEach(k => node.setAttribute(k, props[k]));
    return node;
  }

  static assign(target, source) { //line Object.assign, but nested
    if (!source) return target;
    var ok = {};
    var wary = Object.keys(source).filter(i => ['string', 'number', 'boolean']
      .includes(typeof source[i]) ? (ok[i] = source[i]) && false : true);
    Object.assign(target, ok);
    wary.forEach(w => Lenode.assign(!target[w] ? target[w] = {} : target[w], source[w]));
    return target;
  }

  static isNode(obj) {
    try {
      return obj instanceof HTMLElement;
    } catch (e) {
      return (typeof obj === "object") && (obj._nodeType === 1) && (typeof obj.style === "object") && (typeof obj.ownerDocument === "object");
    }
  }

  static isTag(tag) {
    return tag && tag.match(/^h[1-9]$/) || ['a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b', 'base', 'basefont', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'datalist', 'dd', 'del', 'dfn', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset', 'head', 'header', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'p', 'param', 'pre', 'progress', 'q', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong', 'style', 'sub', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'u', 'ul', 'var', 'video', 'wbr'].includes(tag);
  }

  static getJSON(url, mapper) {
    return fetch(url).then(r => r.text()).then(r => JSON.parse(r)).then(r => mapper ? r.map(mapper) : r);
  }
}

// -------------   Leahead is the actual app / root / document.lehead

class Lehead extends Lenode {

  constructor(attr = {}) {
    super(document.head);
    const _attr = this._attributes;
    this._args = [];
    this._count = 1;
    this._data = {};
    this._pages = attr.pages ? attr.pages : _attr.pages;
    this._home = attr.homepage ? attr.homepage : _attr.homepage ? _attr.homepage : 'home';
    this._container = attr.container ? attr.container : _attr.container;
    var title = attr.title ? attr.title : _attr.title;
    title ? this.add(title, 'title_site') : null;
    var icon = attr.icon ? attr.icon : _attr.icon;
    icon ? this.addResource(icon.endsWith('.png') ? icon : `${icon}.png`) : null;
    var noscale = attr.noscale ? attr.noscale : typeof _attr.noscale === 'string';
    if (!noscale) this.add({
      _tag: 'meta',
      _name: 'viewport',
      _content: 'width=device-width,initial-scale=1,shrink-to-fit=no'
    }, 'viewport');
    var styles = attr.styles ? attr.styles : [];
    _attr.styles ? styles = [...styles, ..._attr.styles.split(' ')] : null;
    styles.forEach((css, i) => {
      css = css.trim();
      css.startsWith('@') || css.includes('{') ? this.add({
          _tag: 'style',
          _html: css,
          _type: 'text/css'
        }, `style_${i}`) :
        this.addResource(css.search(/.css|http/) > -1 ? css : `${css}.css`, 'css');
    });
    var scripts = attr.scripts ? attr.scripts : [];
    _attr.scripts ? scripts = [...scripts, ..._attr.scripts.split(' ')] : null;
    scripts.forEach(src => {
      src = src.trim();
      this.addResource(src.endsWith('.js') ? src : `${src}.js`, 'js');
    });
    this._fonts = attr.fonts ? attr.fonts : _attr.fonts;
    this._colors = attr.colors ? attr.colors : _attr.colors;
    this._interact = attr.interact ? attr.interact : _attr.interact;
    this._reset = new Lestyle(this._fonts, this._colors, this._interact);
    document.lehead = this;
    document.lebody = new Lenode(document.body);
    document.lebody.addStyle(this._reset.style);
    this.container = this._container;
    window.addEventListener('popstate', () => this.getQuery());
    this.getQuery();
  }

  addResource(path, type) { //adds js/css/icons to the head tag
    type = type ? type : path.split('.').pop();
    const name = path.replace(/\/|\./g, '_');
    var node = {};
    type === 'js' ? node._src = path : node._href = path;
    node._tag = type === 'js' ? 'script' : 'link';
    node._type = type === 'js' ? 'text/javascript' :
      type === 'css' ? 'text/css' : type === 'png' ? 'image/png' : null;
    type === 'css' ? node._rel = 'stylesheet' : type === 'png' ? node._rel = 'icon' : null;
    return this.replaceChild(node, name);
  }

  addPage(page, name) {
    !name && page._name ? name = page._name : null;
    if (!name) return console.log('Page needs a name to be added');
    this._pages[name] = page;
    this.getQuery();
    return page;
  }

  addModule(name, loadPage = true) {
    if (!this._src) {
      this._src = this._attributes.src;
      if (!this._src) {
        var script = null;
        ['Lehead', 'app', 'App', 'index'].filter(s => !script ? script = this.querySelector(`script[src$="${s}.js"]`) : false);
        this._src = script ? script.getAttribute('src').split('/')[0] : 'src';
      };
      !this._src.endsWith('/') ? this._src += '/' : null;
    }
    const inst = !loadPage ? `document.lehead.page = new ${name}()` : `new ${name}()`;
    const mod = this.replaceChild({
      _tag: 'script',
      _type: 'module',
      _html: `import ${name} from './${this._src + name}.js'; ${inst};`
    }, name);
    return loadPage ? this._pageModule = mod : mod;
  }

  lenode(input = {}) {
    if (input._id === 404) this.addModule(input, true);
    if (input._isLenode) return input;
    return this.lenode(!!input.nodify ? new input() :
      typeof input === 'function' ? input() :
      typeof input !== 'string' ? new Lenode(input) :
      this._pages[input] ? this._pages[input] :
      new Lenode({
        _id: 404,
        p_message: `Cannot access <b>${input}</b> page.`
      }));
  }

  set page(page) {
    this._page = typeof page == 'string' ? page : page._name;
    document.lepage = document.lemain.replaceChild(this.lenode(page), 'page');
  }

  set container(container) {
    this._containerSet ? document.lemain = null : null;
    this.body.replaceChild(this.lenode(container), 'container');
    !document.lemain ? document.lemain = this.container.add({}, 'main') : null;
    this._page ? this.route(this._page) : null;
    this._containerSet = true;
  }

  get page() {
    return document.lepage;
  }

  get body() {
    return document.lebody;
  }

  get container() {
    return document.lebody.container;
  }

  goto(page) { //goes to page calling end function of current
    if (this._page === page) return;
    var delay = document.lepage && document.lepage.end ? document.lepage.end() : 0;
    setTimeout(() => this.route(page), delay * 1000);
    return this;
  }

  route(page) { //goed to another page
    if (page) {
      this._args = page.split('/');
      page = this._args.shift();
    } else {
      page = this._home;
      typeof page === 'function' ? page = page.name : null;
      this._args = [];
    }
    if (this._page === page) return;
    if (!page) return;
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?${page}` + '/' + this._args.join('/');
    window.history.pushState({
      path: newurl
    }, '', newurl);
    this._pageModule && this._pageModule.remove ? this._pageModule.remove() : null;
    this.page = page;
  }

  getQuery(e) { //gets query string. First argument is the page
    var page, query = window.location.href.split('?')[1];
    if (query) {
      this._args = query.split('/');
      page = this._args.shift();
    };
    !page ? page = this._home : null;
    const current = document.lepage ? document.lepage._name : null;
    page !== current ? this.goto(page) : new Lebody();
    return page;
  };

  setCookie(cname, cvalue, exdays = 30) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = 'expires=' + d.toUTCString();
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
  }

  getCookie(name) {
    name += '=';
    var ca = decodeURIComponent(document.cookie).split(';')
      .filter(c => c.trim().startsWith(name))[0];
    return ca ? ca.substr(name.length+1) : '';
  }

}

/* --------  RESET */

class Lestyle {
  constructor(font = {}, color = {}, interact = false) {
    font.base = (font.base ? font.base + ',' : '') + 'apple-systrem, BlinkMacSystremFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';
    font.head = (font.head ? font.head + ',' : '') + 'fantasy';
    font.hype = (font.hype ? font.hype + ',' : '') + 'cursive';
    this.fontFaces = {};
    Object.keys(font).forEach(key => {
      if(font[key].includes('.')){
        this.fontFaces[key] = font[key];
        delete font[key];
      }
    });
    !color.medium ? color.medium = 'slategray' : null;
    !color.bright ? color.bright = 'lightskyblue' : null;
    !color.brightest ? color.brightest = 'skyblue' : null;
    !color.dark ? color.dark = 'darkslategray' : null;
    !color.darkest ? color.darkest = '#010' : null;
    !color.light ? color.light = 'lightsteelblue' : null;
    !color.lightest ? color.lightest = 'aliceblue' : null;
    !color.shiny ? color.shiny = 'gold' : null;
    !color.hot ? color.hot = 'crimson' : null;
    !color.cool ? color.cool = 'teal' : null;
    !color.deep ? color.deep = 'indigo' : null;
    this.vars = [...Object.keys(color), ...Object.keys(font)];
    this.style = {
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      fontFamily: font.base,
      fontSize: '86%',
      color: 'black',
      lineHeight: '1.5em',
      backgroundColor: color.dark,
      margin: 0,
      padding: 0,
      '__*': {
        font: 'inherit',
        pointerEvents: interact ? 'default' : 'none',
        userSelect: 'none',
        margin: 0,
        padding: 0,
        border: 'none',
        verticalAlign: 'baseline',
        boxSizing: 'border-box'
      },
      '__article,__aside,__details,__figcaption,__figure,__footer,__header,__hgroup,__menu,__nav,__section': {
        display: 'block'
      },
      '__ol,__ul': {
        listStyle: 'none',
      },
      '__blockquote,__q': {
        quotes: 'none',
        ':before,:after': {
          content: '',
          content: 'none'
        }
      },
      __table: {
        borderCollapse: 'collapse',
        borderSpacing: 0,
      },
      __p: {
        padding: '.17em 0',
      },
      __a: {
        pointerEvents: 'auto',
        cursor: 'pointer',
        textDecoration: 'none',
        color: color.bright,
        $hover: {
          color: color.dark,
        }
      },
      __button: {
        cursor: 'pointer',
        borderRadius: '.34em',
        backgroundColor: color.bright,
        padding: '.34em .68em',
        margin: '0 .34em',
        color: 'white',
        $hover: {
          backgroundColor: color.dark
        }
      }
    }
    this.style.$root = {};
    Object.keys(color).forEach(k => this.style.$root['--' + k] = color[k]);
    Object.keys(font).forEach(k => this.style.$root['--' + k] = font[k])
    var n = 9;
    while (n--) {
      this.style['__h' + n] = {
        fontFamily: font.head,
        fontSize: (1 + 1 / n) + 'em',
        padding: '.34em 0'
      }
    };
    var s = '';
    Object.keys(this.fontFaces).forEach(key => {
      this.style[ '@font-face' + s] = {
        fontFamily: key,
        src: `url(${this.fontFaces[key]})`
      };
      s+=' ';
    });
  }

  static stylize(model, name) { //turns object into css
    if (!model) return;
    if (typeof model === 'string') return model;
    !name ? new.target ? name = new.target.name : name = this._name : null;
    var style = Lestyle.selector(name, true);
    //:root prop
    if (model.$root) {
      style = Lestyle.stylize(model.$root, ':root') + style;
      delete model.$root;
    }
    //initial props
    style += ' {\n';
    Object.keys(model).forEach(prop => {
      if (['string', 'number'].includes(typeof model[prop])) {
        style += '  ' + Lestyle.uncamel(prop) + ': ' + Lestyle.varify(model[prop]) + ';\n';
        delete model[prop];
      } else if (prop.includes(',')) { // Commas for multiple selectors
        prop.split(',').map(sel => sel.trim())
          .forEach(sel => Lenode.assign(!model[sel] ? model[sel] = {} : model[sel], model[prop]));
        delete model[prop];
      } else if (prop.includes('*')) {
        style = Lestyle.stylize(model[prop], name + Lestyle.selector(prop)) + style;
        delete model[prop];
      } else if (prop.includes('@font')){
        style = Lestyle.stylize(model[prop], prop) + style;
        delete model[prop];
      } else if (prop.includes('@media')){
        style = prop + '{ ' + Lestyle.stylize(model[prop], name) + '}' + style;
        delete model[prop];
      }
    });
    style += '}\n';
    //nested or children selectors
    Object.keys(model).forEach(key => style += Lestyle.stylize(model[key], name + Lestyle.selector(key)));
    return style;
  }

  static selector(sel, first = false){
    const xtr = ['_', '.', ':', '$', '>', '@'].includes(sel.charAt(0));
    const link = first || xtr ? '' : '>';
    sel = sel.replace(/__/g, ' ');
    const tied = sel.startsWith('_');
    tied ? sel = sel.replace(/_/, '') : null;
    (tied || !xtr) && !Lenode.isTag(sel.split(/_|\$|\.|:| |>/)[0]) ? sel = '.' + sel : null;
    return link + sel.replace(/_/g, '.').replace(/\$/g, ':');
  }

  static uncamel(word, s = '-') {
    return word.replace(/([A-Z])/g, s + '$1'.toLowerCase());
  }

  static varify(t){
    if(typeof t !== 'string') return t;
    var vars = document.lehead ? document.lehead._reset.vars : ['base', 'head', 'hype', 'medium', 'darkest', 'dark', 'lightest', 'light', 'bright', 'shiny', 'hot', 'cool', 'intense'];
    vars.forEach(v => t == v || t.includes(' '+v+' ') || t.endsWith(' '+v) ? t = t.replace(v, `var(--${v})`) : null);
    return t;
  }
}
/**
 * Creates DOM structures from a JS object (structure)
 * @author Lenin Compres <lenincompres@gmail.com>
 * @repository https://github.com/lenincompres/DOM.create
 */

Element.prototype.create = function (model, ...args) {
  if ([null, undefined].includes(model)) return;
  if (Array.isArray(model.content)) return model.content.forEach(item => {
    let individual = Object.assign({}, model);
    individual.content = item;
    this.create(individual, ...args);
  });
  let station = args.filter(a => typeof a === 'string')[0]; // style|attr|tag|inner…|on…|name
  if (['tag', 'onready', 'id'].includes(station)) return;
  if (station === 'css') return this.css(model);
  if (['text', 'innerText'].includes(station)) return this.innerText = model;
  if (['html', 'innerHTML'].includes(station)) return this.innerHTML = model;
  if (model._bonds) model = model.bind();
  if (model.binders) return model.binders.forEach(binder => binder.bind(this, station, model.onvalue));
  const TAG = this.tagName.toLowerCase();
  const IS_HEAD = TAG === 'head';
  const CLEAR = args.filter(a => typeof a === 'boolean')[0] === true || station === 'content';
  const PREPEND = args.filter(a => typeof a === 'boolean')[0] === false;
  const IS_PRIMITIVE = DOM.isPrimitive(model);
  if (station === 'content' && TAG === 'meta') station = '*content'; // disambiguate 
  if (!station) station = 'content';
  let [tag, ...cls] = station.split('_');
  if (station.includes('.')) {
    cls = station.split('.');
    tag = cls.shift();
  }
  let id;
  if (tag.includes('#'))[tag, id] = tag.split('#');
  let lowTag = (model.tag ? model.tag : tag).toLowerCase();
  if (lowTag != tag) id = tag; // camelCase tags are interpreted as id
  tag = lowTag;
  if (model.id) id = model.id;
  let p5Elem = args.filter(a => a && a.elt)[0];
  let elt = model.tagName ? model : model.elt ? model.elt : false;
  if (elt) {
    if (id) DOM.addID(id, elt);
    else if (tag != elt.tagName.toLowerCase()) DOM.addID(tag, elt);
    if (cls) cls.forEach(c => c ? elt.classList.add(c) : null);
    return this[PREPEND ? 'prepend' : 'append'](elt);
  }
  if (TAG === 'style' && !model.content && !IS_PRIMITIVE) model = DOM.css(model);
  if (station === 'content' && !model.binders) {
    if (CLEAR) this.innerHTML = '';
    if (IS_PRIMITIVE) return this.innerHTML = model;
    let keys = PREPEND ? Object.keys(model).reverse() : Object.keys(model);
    keys.forEach(key => this.create(model[key], key, p5Elem, PREPEND ? false : undefined));
    return this;
  }
  if (Array.isArray(model)) {
    if (station === 'class') return model.forEach(c => c ? this.classList.add(c) : null);
    if (station === 'addEventListener') return this.addEventListener(...model);
    let map = model.map(s => this.create(s, tag + cls.join('.'), p5Elem, PREPEND ? false : undefined));
    if (id) DOM.addID(id, map);
    return map;
  }
  if (station === 'addEventListener') return model.options ? this.addEventListener(model.type, model.listener, model.options) : this.addEventListener(model.type, model.listener, model.useCapture, model.wantsUntrusted);
  if (tag === 'style') {
    if (IS_PRIMITIVE && !IS_HEAD) return this.setAttribute(tag, model);
    if (IS_HEAD && !model.content) return DOM.style(model);
    if (!model.content) {
      if (CLEAR) this.setAttribute(tag, '');
      return Object.entries(model).forEach(([key, value]) => value && value.binders ? value.binders.forEach(binder => binder.bind(this, key, value.onvalue)) : this.style[key] = value);
    }
    if (!['boolean', 'number', 'string'].includes(typeof model.content)) model.content = DOM.css(model.content);
  }
  if (typeof model === 'function') {
    if (p5Elem && typeof p5Elem[station] === 'function') return p5Elem[station](model);
    return this[station] = model;
  }
  if (IS_PRIMITIVE) {
    if (IS_HEAD) {
      const type = DOM.getType(model);
      if (tag === 'title') return this.innerHTML += `<title>${model}</title>`;
      if (tag === 'icon') return this.innerHTML += `<link rel="icon" href="${model}">`;
      if (tag === 'charset') return this.innerHTML += `<meta charset="${model}">`;
      if (['viewport', 'keywords', 'description'].includes(tag)) return this.innerHTML += `<meta name="${tag}" content="${model}">`;
      if (tag === 'font') return DOM.style({
        fontFace: {
          fontFamily: model.split('/').pop().split('.')[0],
          src: `url(${model})`
        }
      });
      if (tag === 'link') return this.create({
        rel: type,
        href: model
      }, 'link');
      if (tag === 'script') return this.create({
        type: type,
        src: model
      }, 'script');
    }
    let done = (this.style[station] !== undefined) ? (this.style[station] = model) : undefined;
    station = station.replace('*', ''); // disambiguate 
    if (DOM.isAttribute(station)) done = !this.setAttribute(station, model);
    if (station === 'id') DOM.addID(model, this);
    if (done !== undefined) return;
  }
  let elem = (model.tagName || model.elt) ? model : false;
  if (!elem) {
    if (!tag || !isNaN(tag)) tag = 'div';
    elem = p5Elem ? createElement(tag) : document.createElement(tag);
    elem.create(model, p5Elem);
  }
  elt = p5Elem ? elem.elt : elem;
  if (cls) cls.forEach(c => c ? elt.classList.add(c) : null);
  if (id) elt.setAttribute('id', id);
  this[PREPEND ? 'prepend' : 'append'](elt);
  if (model.onready) model.onready(elem);
  return elem;
};

// Adds create methdod to P5 elements
if (typeof p5 !== 'undefined') {
  p5.create = (...args) => DOM.create(...args, createDiv());
  p5.Element.prototype.create = function (...args) {
    return this.elt.create(...args, this);
  }
}

// Adds css to the head under the element's ID
Element.prototype.css = function (style) {
  if (this === document.head) return DOM.style(style);
  thisStyle = {};
  let id = this.id;
  if (!id) {
    if (!window.domids) window.domids = [];
    id = 'domid' + window.domids.length;
    this.setAttribute('id', id);
    window.domids.push(id);
  }
  thisStyle[`#${id}`] = style;
  DOM.style(thisStyle);
}

// Used to update the props of an element when the binder's value changes. It can also update other binders' values.
class Binder {
  constructor(val) {
    this._value = val;
    this._bonds = [];
    this._listeners = {};
    this._listenerCount = 0;
    this.onvalue = v => v;
    this.update = bond => {
      if (!bond.target) return;
      let theirValue = bond.onvalue(this._value);
      if (bond.target.tagName) return bond.target.create(theirValue, bond.property);
      bond.target[bond.property] = theirValue
    }
  }
  addListener(func) {
    if (typeof func !== 'function') return;
    this._listeners[this._listeners] = func;
    return this._listenerCount++;
  }
  removeListener(countIndex) {
    delete this._listeners[countIndex];
  }
  bind(...args) {
    let target = args.filter(a => a.tagName || a._bonds)[0];
    if (!target) return DOM.bind(this, ...args);
    if (this._bonds && this._bonds.some(bond => bond === this)) return console.log('Two binders are bound to each other.');
    let onvalue = args.filter(a => typeof a === 'function')[0];
    let property = args.filter(a => typeof a === 'string')[0];
    let bond = {
      target: target,
      property: property ? property : 'value',
      onvalue: onvalue ? onvalue : v => v
    }
    this._bonds.push(bond);
    this.update(bond);
  }
  set value(val) {
    if (val === this._value) return;
    this._value = val;
    this._bonds.forEach(bond => this.update(bond));
    this.onvalue(val);
    Object.values(this._listeners).forEach(listener => listener(val));
  }
  get value() {
    return this._value;
  }
}

// global static methods to handle the DOM
class DOM {
  // created the element and props in the  body or an element passed
  static create(...args) {
    let elt = args.filter(a => a && a.tagName)[0];
    if (!elt) elt = document.body;
    if (elt) return elt.create(...args);
    window.addEventListener('load', _ => DOM.create(...args));
  }
  // returns a bind for element's props to use ONLY whithin a create() model
  static bind(binders, onvalue = v => v) {
    if (!Array.isArray(binders)) binders = [binders];
    if (binders.some(binder => !Array.isArray(binder._bonds))) return console.log(binders, 'Non-binder found.');
    return {
      binders: binders,
      onvalue: _ => onvalue(...binders.map(binder => binder.value))
    }
  }
  // returns a new bind for element's props whithin a create() model, to be updated after a XMLHttpRequest
  static load(url, onload, parseJSON = false) {
    let binder = new Binder();
    let obj = binder.bind(onload);
    DOM.request(url, data => data !== undefined ? binder.value = parseJSON ? JSON.parse(data) : data : null);
    return obj;
  }
  // returns a new bind for element's props whithin a create() model, to be updated after a JSON PARSED XMLHttpRequest
  static loadJSON(url, onload) {
    return DOM.load(url, onload, true);
  }
  // makes a XMLHttpRequest using POST, make (data = false) for GET method
  static request(url, data, onsuccess = _ => null, onerror = _ => null) {
    if (!url) return;
    const GET = data === false;
    if (typeof data === 'function') {
      onerror = onsuccess;
      onsuccess = data;
      data = {};
    }
    let xobj = new XMLHttpRequest();
    xobj.onreadystatechange = _ => xobj.readyState == 4 && xobj.status == '200' ? onsuccess(xobj.responseText) : onerror(xobj.status);
    xobj.open(GET ? 'POST' : 'GET', url, true);
    xobj.send(data);
  }
  // same as before bu terurns a JSON object
  static requestJSON(url, data, onsuccess = _ => null, onerror = _ => null) {
    if (typeof data === 'function') {
      onerror = onsuccess;
      onsuccess = data;
      data = {};
    }
    DOM.request(url, data, d => onsuccess(JSON.parse(d)), onerror);
  };
  // adds styles to the head as global CSS
  static style(style) {
    if (window.domstyleElem === undefined) {
      window.domstyleElem = document.head.create({
        content: '/* Created with DOM.js style */'
      }, 'style');
      let reset = {
        '*': {
          boxSizing: 'border-box',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          verticalAlign: 'baseline',
          lineHeight: '1.25em',
          margin: 0,
          padding: 0,
          border: 0,
          borderSpacing: 0,
          borderCollapse: 'collapse',
          listStyle: 'none',
          quotes: 'none',
          content: 'none',
          fontWeight: 'normal',
          backgroundColor: 'transparent',
        },
        body: {
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
        },
        'b, strong': {
          fontWeight: 'bold',
        },
        'i, em': {
          fontStyle: 'itallic',
        },
        'a, button': {
          textDecoration: 'none',
          cursor: 'pointer',
        }
      };
      const H = 6;
      (new Array(H)).fill().forEach((_, i) => reset[`h${i + 1}`] = new Object({
        fontSize: `${Math.round(100 * (2 - i / H)) / 100}em`,
      }));
      DOM.style(reset);
    }
    if (!style) return;
    if (Array.isArray(style)) return style.forEach(s => DOM.style(s));
    if (typeof style !== 'string') style = DOM.css(style);
    document.head.create({
      content: style
    }, 'style');
  }
  /* converts JSON to CSS, nestings and all. Models can have id: & class: properties to be added to the selector.
  "_" in selectors are turned into ".". Use a trailing "_" to affect any selector under the parent, instead of default immediate child (>), or add an "all: true" property.*/
  static css(sel, model) {
    const assignAll = (arr = [], dest = {}) => {
      arr.forEach(prop => Object.assign(dest, prop));
      return dest;
    }
    if (typeof sel !== 'string') {
      if (!sel) return;
      if (Array.isArray(sel)) sel = assignAll(sel);
      if (sel.tag || sel.id || sel.class) return DOM.css(sel.tag ? sel.tag : '', sel);
      return Object.entries(sel).map(([key, value])  => DOM.css(key, value)).join(' ');
    }
    let extra = [];
    let cls = sel.split('_');
    sel = cls.shift();
    if (sel === 'h') {
      cls = cls.length ? ('.' + cls.join('.')) : '';
      sel = Array(6).fill().map((_, i) => 'h' + (i + 1) + cls).join(', ');
      cls = [];
    }
    if (sel.toLowerCase() === 'fontface') sel = '@font-face';
    if (DOM.isPrimitive(model)) return `${DOM.unCamel(sel)}: ${model};\n`;
    if (Array.isArray(model)) model = assignAll(model);
    if (model.class) cls.push(...model.class.split(' '));
    if (model.id) sel += '#' + model.id;
    delete model.class;
    delete model.id;
    if (cls.length) sel += '.' + cls.join('.');
    let css = Object.entries(model).map(([key, style]) => {
      if (style === undefined || style === null) return;
      if (DOM.isPrimitive(style)) return DOM.css(key, style);
      let sub = DOM.unCamel(key.split('(')[0]);
      let xSel = `${sel}>${key}`;
      if (DOM.isPseudoClass(sub)) xSel = `${sel}:${sub}`;
      else if (DOM.isPseudoElement(sub)) xSel = `${sel}::${sub}`;
      else if (['_', '.'].some(s => key.startsWith(s))) xSel = `${sel}${sub}`;
      else if (['_', '.'].some(s => key.endsWith(s)) || style.all) xSel = `${sel} ${sub}`;
      delete style.all;
      extra.push(DOM.css(xSel, style));
    }).join(' ');
    return (css ? `\n${sel} {\n ${css}}` : '') + extra.join(' ');
  }
  //creates an element and returns the html code for it
  static html(model, tag = 'div') {
    let output;
    let elt = DOM.create({
      content: model,
      onready: e => output = e.outerHTML
    }, tag);
    document.body.removeChild(elt);
    return output;
  }
  // initializes the head and body from model with initial values or json file
  static getSetup = _ => {
    let ini = document.head.querySelector('[create]');
    if (ini) return (ini.getAttribute('create'));
    ini = document.head.querySelector('create');
    if (ini) DOM.setup(ini.innerHTML);
  }
  static setup(ini) {
    if ([undefined, null, false].includes(ini)) return;
    if ([true, ''].includes(ini)) ini = {};
    if (typeof ini === 'string') {
      if (ini.endsWith('.json')) return DOM.requestJSON(ini, data => DOM.setup(data));
      try {
        ini = JSON.parse(ini);
      } catch (e) {
        console.log('Unable to parse DOM setup.', e);
        ini = {};
      }
    }
    const INI = {
      title: 'DOM.created',
      charset: 'UTF-8',
      viewport: 'width=device-width',
      icon: false,
      meta: [],
      link: [],
      reset: true,
      font: [],
      style: [],
      css: [],
      script: [],
      entry: 'main.js',
      module: true,
      postscript: []
    };
    ini = Object.entries(ini).forEach(([key, value]) => {
      delete ini[key];
      ini[key.toLocaleLowerCase()] = value;
    });
    DOM.rename(ini, ['fontface', 'fonts', 'links', 'entrypoint'], ['font', 'font', 'link', 'entry']);
    let settings = Object.assign({}, INI); // combines ini and INI into settings
    Object.assign(settings, ini);
    document.head.create({
      title: settings.title,
      charset: settings.charset,
      viewport: settings.viewport,
      icon: settings.icon,
      font: settings.font,
      meta: DOM.asArray(settings.meta),
      link: DOM.asArray(settings.link),
      script: DOM.asArray(settings.script)
    });
    DOM.style([DOM.asArray(settings.style), DOM.asArray(settings.css)]);
    settings.entry = !settings.entry ? undefined : new Object({
      type: settings.module ? 'module' : undefined,
      src: settings.entry
    })
    DOM.create({
      script: [settings.entry, ...DOM.asArray(settings.postscript)]
    });
    // anything else passed in ini becomes a body prop
    Object.keys(ini).filter(key => INI[key] !== undefined).forEach(key => delete ini[key]);
    DOM.create(ini);
  }
  static querystring() {
    var qs = location.search.substring(1);
    if (!qs) return Object();
    if (qs.includes('=')) return JSON.parse('{"' + decodeURI(location.search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    return qs.split('/');
  }
  // auxiliary methods
  static addID = (id, elt) => {
    if (Array.isArray(elt)) return elt.forEach(e => addID(id, e));
    if (!window[id]) return window[id] = elt;
    if (Array.isArray(window[id])) return window[id].push(elt);
    window[id] = [window[id], elt];
  };
  static isPrimitive = foo => ['boolean', 'number', 'string'].includes(typeof foo);
  static asArray = foo => Array.isArray(foo) ? foo : [foo];
  static unCamel = str => str.replace(/([A-Z])/g, '-' + '$1').toLowerCase();
  static isAttribute = str => ['accept', 'accept-charset', 'accesskey', 'action', 'align', 'alt', 'async', 'autocomplete', 'autofocus', 'autoplay', 'bgcolor', 'border', 'charset', 'checked', 'cite', 'class', 'color', 'cols', 'colspan', 'content', 'contenteditable', 'controls', 'coords', 'data', 'datetime', 'default', 'defer', 'dir', 'dirname', 'disabled', 'download', 'draggable', 'enctype', 'for', 'form', 'formaction', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'http-equiv', 'id', 'ismap', 'kind', 'lang', 'list', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'multiple', 'muted', 'name', 'novalidate', 'open', 'optimum', 'pattern', 'placeholder', 'poster', 'preload', 'readonly', 'rel', 'required', 'reversed', 'rows', 'rowspan', 'sandbox', 'scope', 'selected', 'shape', 'size', 'sizes', 'spellcheck', 'src', 'srcdoc', 'srclang', 'srcset', 'start', 'step', 'style', 'tabindex', 'target', 'title', 'translate', 'type', 'usemap', 'value', 'wrap', 'width'].includes(str);
  static isPseudoClass = str => ['active', 'checked', 'disabled', 'empty', 'enabled', 'first-child', 'first-of-type', 'focus', 'hover', 'in-range', 'invalid', 'last-of-type', 'link', 'only-of-type', 'only-child', 'optional', 'out-of-range', 'read-only', 'read-write', 'required', 'root', 'target', 'valid', 'visited', 'lang', 'not', 'nth-child', 'nth-last-child', 'nth-last-of-type', 'nth-of-type'].includes(str);
  static isPseudoElement = str => ['after', 'before', 'first-letter', 'first-line', 'selection'].includes(str);
  static getType = str => new Object({
    css: 'stylesheet',
    sass: 'stylesheet/sass',
    scss: 'stylesheet/scss',
    less: 'stylesheet/less',
    js: 'text/javascript',
    ico: 'icon'
  })[typeof str === 'string' ? str.split('.').slice(-1)[0] : 'none'];
  static rename = (obj, name, newName) => {
    if (obj[name] === undefined) return;
    if (Array.isArray(name)) return name.forEach((n, i) => rename(obj, n, newName[i]));
    obj[newName] = obj[name];
    delete obj[name];
  }
}
DOM.getSetup();
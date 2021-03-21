/**
 * Creates DOM structures from a JS object (structure)
 * @author Lenin Compres <lenincompres@gmail.com>
 */

const domify = (...args) => document.body ? document.body.domify(...args) : window.addEventListener('load', () => domify(...args));

Element.prototype.domify = Element.prototype.modify = function (structure, ...args) {
  if ([null, undefined].includes(structure)) return;
  let station = args.getFirst(a => typeof a === 'string'); // style|attribute|tag|inner…|onEvent|name
  if (['tag', 'id', 'onready', 'onReady'].includes(station)) return;
  const IS_PRIMITIVE = isPrimitive(structure);
  const IS_FUNCTION = typeof structure === 'function';
  const IS_ARRAY = Array.isArray(structure);
  if (!IS_FUNCTION && structure.bind) {
    if (!window[structure.bind]) window[structure.bind] = new Bind();
    window[structure.bind].bind(this, station, structure.onvalue);
    if(structure.value !== undefined) window[structure.bind].value = structure.value;
    return; 
  }
  if (structure.assign) {
    assignAll(structure.assign, structure);
    delete structure.assign;
    return this.domify(structure, ...args);
  }
  let tagName = this.tagName.toLowerCase();
  let clear = args.getFirst(a => typeof a === 'boolean');
  let elt = args.getFirst(a => a && a.tagName);
  if (elt) return elt.domify(structure, station, clear, p5Elem);
  let p5Elem = args.getFirst(a => a && a.elt);
  let prepend = clear === false;
  if (structure.style && !isPrimitive(structure.style) && tagName !== 'head') structure.style = assignAll(structure.style);
  if (station === 'style' & !IS_PRIMITIVE) {
    if (tagName === 'head') return this.domify(getCSS(structure), station);
    if (clear) this.style = '';
    return Object.keys(structure).forEach(k => this.style[k] = structure[k]);
  }
  if (!station) {
    if (clear) this.innerHTML = '';
    let keys = prepend ? Object.keys(structure).reverse() : Object.keys(structure);
    keys.forEach(key => this.domify(structure[key], key, p5Elem, prepend ? false : undefined));
    return this;
  }
  if (IS_PRIMITIVE) {
    let ext = typeof structure === 'string' ? structure.split('.').slice(-1)[0] : null;
    if (tagName === 'head') {
      if (['style', 'title'].includes(station)) return this.innerHTML += `<${station}>${structure}</${station}>`;
      if (ext === 'css') return this.innerHTML += `<link href="${structure}" rel="stylesheet">`;
      if (ext === 'ico') return this.innerHTML += `<link href="${structure}" rel="icon">`;
    }
    if (ext === 'js') return this.domify({
      src: structure
    }, 'script');
    if (['html', 'innerHTML'].includes(station)) return (this.innerHTML = structure);
    if (['text', 'innerText'].includes(station)) return (this.innerText = structure);
    let indentified = this.style[station] !== undefined ? this.style[station] = structure : undefined;
    if (HTML_ATTRIBUTES.includes(station)) {
      this.setAttribute(station, structure);
      indentified = true;
    }
    if (indentified !== undefined) return;
  } else if (IS_ARRAY) {
    if (station === 'class') return structure.forEach(c => c ? this.classList.add(c) : null);
    if (station === 'addEventListener') return this.addEventListener(...structure);
  } else if (IS_FUNCTION) {
    if (this[station] !== undefined) return this[station] = structure;
    if (p5Elem && typeof p5Elem[station] === 'function') return p5Elem[station](structure);
  }
  if (['html', 'innerHTML'].includes(station)) this.innerHTML = '';
  let [tag, id, ...cls] = station.split('_');
  if (station.includes('.')) {
    cls = station.split('.');
    tag = cls.shift();
  }
  if (tag.includes('#'))[tag, id] = tag.split('#');
  tag = structure.tag ? structure.tag : tag;
  let elem = (structure.tagName || structure.elt) ? structure : false;
  if (!elem) {
    if (!tag || !HTML_TAGS.includes(tag.toLowerCase())) {
      id = tag;
      tag = 'div';
    }
    if (IS_ARRAY) elem = structure.map(o => this.domify(o, [tag, ...cls].join('.'), p5Elem));
    else {
      elem = p5Elem ? createElement(tag) : document.createElement(tag);
      if (IS_PRIMITIVE)(p5Elem ? elem.elt : elem).innerHTML = structure;
      else Object.keys(structure).map(key => elem.domify(structure[key], key, p5Elem));
    }
  }
  elt = (p5Elem ? elem.elt : elem);
  if (id = structure.id ? structure.id : id) {
    if (!IS_ARRAY) elt.setAttribute('id', id);
    window[id] = elem;
  }
  if (IS_ARRAY) return;
  if (cls) cls.forEach(c => elt.classList.add(c));
  let onready = structure.onready ? structure.onready : structure.onReady;
  if (onready) onready(elem);
  this[prepend ? 'prepend' : 'append'](elt);
  return elem;
};

String.prototype.camelCase = function (s = false) {
  return s ? this.replace(/([A-Z])/g, s + '$1').toLowerCase() : this.replace(/^([A-Z])|[\s-_ ]+(\w)/g, (_, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
};

Array.prototype.getFirst = function (f) {
  return this.filter(a => f(a))[0];
}

function assignAll(source = {}, dest = {}) {
  if (!Array.isArray(source)) source = [source];
  source.forEach(s => Object.assign(dest, s));
  return dest;
}

function isPrimitive(s) {
  return ['boolean', 'number', 'string', 'bigInt'].includes(typeof s);
}

function getCSS(sel, obj) {
  if (typeof sel !== 'string') {
    if (Array.isArray(sel)) sel = assignAll(sel);
    return Object.keys(sel).map(key => getCSS(key, sel[key])).join(' ');
  }
  let extra = [],
    id, cls;
  [sel, id, ...cls] = sel.split('_');
  if (id) sel += '#' + id;
  if (cls.length) sel += '.' + cls.join('.');
  if (isPrimitive(obj)) return `${sel.camelCase('-')}: ${obj};`;
  if (Array.isArray(obj)) obj = assignAll(obj);
  let css = Object.keys(obj).map(key => {
    let style = obj[key];
    if (isPrimitive(style)) return getCSS(key, style);
    let sub = key.split('(')[0].camelCase('-');
    let xSel = `${sel} ${key}`;
    if (CSS_PSEUDO_CLASSES.includes(sub)) xSel = `${sel}:${key}`;
    else if (CSS_PSEUDO_ELEMENTS.includes(sub)) xSel = `${sel}::${key}`;
    else if (style.immediate) xSel = `${sel}>${key}`;
    extra.push(getCSS(xSel, style));
  }).join(' ');
  return (css ? `\n${sel} {${css}} ` : '') + extra.join(' ');
}

if (typeof p5 !== 'undefined') {
  p5.domify = (...args) => domify(...args, createDiv());
  p5.Element.prototype.domify = p5.Element.prototype.modify = function (...args) {
    this.elt.domify(...args, this);
  }
}

const HTML_ATTRIBUTES = ['accept', 'accept-charset', 'accesskey', 'action', 'align', 'alt', 'async', 'autocomplete', 'autofocus', 'autoplay', 'bgcolor', 'border', 'charset', 'checked', 'cite', 'class', 'color', 'cols', 'colspan', 'content', 'contenteditable', 'controls', 'coords', 'data', 'datetime', 'default', 'defer', 'dir', 'dirname', 'disabled', 'download', 'draggable', 'enctype', 'for', 'form', 'formaction', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'http-equiv', 'id', 'ismap', 'kind', 'lang', 'list', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'multiple', 'muted', 'name', 'novalidate', 'open', 'optimum', 'pattern', 'placeholder', 'poster', 'preload', 'readonly', 'rel', 'required', 'reversed', 'rows', 'rowspan', 'sandbox', 'scope', 'selected', 'shape', 'size', 'sizes', 'spellcheck', 'src', 'srcdoc', 'srclang', 'srcset', 'start', 'step', 'style', 'tabindex', 'target', 'title', 'translate', 'type', 'usemap', 'value', 'wrap', 'width'];
const HTML_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'h10', 'main', 'a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b', 'base', 'basefont', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'datalist', 'dd', 'del', 'dfn', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'frame', 'frameset', 'head', 'header', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'map', 'mark', 'meta', 'meter', 'menu', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'p', 'param', 'pre', 'progress', 'q', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong', 'style', 'sub', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'u', 'ul', 'var', 'video', 'wbr'];
const CSS_PSEUDO_CLASSES = ['active', 'checked', 'disabled', 'empty', 'enabled', 'first-child', 'first-of-type', 'focus', 'hover', 'in-range', 'invalid', 'last-of-type', 'link', 'only-of-type', 'only-child', 'optional', 'out-of-range', 'read-only', 'read-write', 'required', 'root', 'target', 'valid', 'visited', 'lang', 'not', 'nth-child', 'nth-last-child', 'nth-last-of-type', 'nth-of-type'];
const CSS_PSEUDO_ELEMENTS = ['after', 'before', 'first-letter', 'first-line', 'selection'];
const CSS_RESET = {
  '*': {
    margin: 0,
    padding: 0,
    border: 0,
    boxSizing: 'border',
    fontSize: '100%',
    font: 'inherit',
    verticalAlign: 'baseline',
    lineHeight: '1.5em',
    listStyle: 'none',
    quotes: 'none',
    content: '',
    content: 'none',
    borderCollapse: 'collapse',
    borderSpacing: 0
  }
}

class Bind {
  constructor(val) {
    this._elems = [];
    this._value = val;
  }

  bind(elem, property = 'value', onvalue = v => v) {
    this._elems.push({
      elem: elem,
      property: property,
      onvalue: onvalue
    });
    elem.domify(onvalue(this._value), property);
  }

  set value(val) {
    this._value = val;
    this._elems.forEach(e => e.elem.domify(e.onvalue(val), e.property));
  }

  get value() {
    return this._value;
  }
}
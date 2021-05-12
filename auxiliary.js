/*
 ** Useful functions including createDOM that makes html (or P5) elements from a JS object (or JSON)
 ** created by: Lenin Compres
 */
/* ------------------------------- GENERAL ------------------------------- */
var iterate = (func, n = 1, r) => Array(n).fill().map((_, i) => func(r ? n - i - 1 : i)); //calls func n times passing i (r for reverse); returns arr of func returns.
var queryAll = (selector, elem) => elem ? [...elem.querySelectorAll(selector)] : [...document.querySelectorAll(selector)];
var loadJSON = (url, data, onsuccess, onerror = _ => null) => {
  if (!onsuccess) {
    onsuccess = data;
    data = {};
  }
  var xobj = new XMLHttpRequest();
  xobj.onreadystatechange = _ => xobj.readyState == 4 && xobj.status == '200' ? onsuccess(JSON.parse(xobj.responseText)) : onerror(xobj.responseText);
  xobj.open(data ? 'POST' : 'GET', url, true);
  xobj.send(data);
}
var getJSON = (url, data, callback, errorback) => loadJSON(url + '?' + Object.keys(data).map(key => `${key}=${data[key]}`).join('&'), callback, errorback);
var dir = (n, fail = 0) => n === 0 ? fail : n > 0 ? 1 : -1; //returns 1, fail or -1 depending on the sign of n
var range = (n, a, b) => a < b ? (n < a ? a : n > b ? b : n) : (n < b ? b : n > a ? a : n); //constrains n btw two values
var rgb = (colour, asObj) => { // turns color into [r, g, b] or {r:x, g:y, b:z}
  if (Array.isArray(colour)) return colour.indexed(['r', 'g', 'b']);
  if (!!window.p5) {
    colour = color(colour);
    colour = [red(colour), green(colour), blue(colour)];
  }
  if (typeof colour === 'string') colour = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colour).filter((_, i) => i > 0 && 1 < 4).map(v => parseInt(v, 16));
  return asObj ? rgb(colour) : colour;
}
/* ------------------- STRINGS AND ARRAYS ------------------------- */
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}
String.prototype.camelCase = function (s = false) { // turns to camelCase (or back given a separator)
  return s ? this.replace(/([A-Z])/g, s + '$1').toLowerCase() : this.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
}
String.prototype.markdown = function () { // gets html from markdown (! after link for blank target)
  var _link = (m, txt, href, t, _) => {
    var title = t.length > 1 ? ` title="${t}"` : '';
    var target = [_, t].includes('!') ? ' target ="_blank"' : '';
    var trail = target ? '' : _ ? _ : t;
    return `<a href="${href}"${title}${target}>${txt}</a>${trail}`;
  }
  return this.replace(/\[(.*?)\]\((.*?)\"(.*?)\"\)(.?)/gm, _link).replace(/\[(.*?)\]\((.*?)\)(.?)/gm, _link)
    .replace(/\_\_(.*?)\_\_/gm, '<b>$1</b>').replace(/\_(.*?)\_/gm, '<i>$1</i>')
    .replace(/\*\*(.*?)\*\*/gm, '<b>$1</b>').replace(/\*(.*?)\*/gm, '<i>$1</i>');
}
Array.prototype.plus = function (arr = 0) { // adds arrays to array, or number
  return this.map((n, i) => n + (typeof arr === 'number' ? arr : arr[i % arr.length]));
}
Array.prototype.minus = function (arr = 0) { // substracts arrays or number from array
  return this.plus(typeof arr === 'number' ? -arr : arr.map(v => -v));
}
Array.prototype.times = function (arr = 1) { // multiplies array times array or number
  return this.map((n, i) => n * (typeof arr === 'number' ? arr : arr[i % arr.length]));
}
Array.prototype.mapObject = function (foo) { // returns object with items indexed by Prop, Array, or function
  if (typeof foo === 'string') foo = v => v[foo];
  if (!Array.isArray(foo)) foo = this.map(foo);
  var obj = {};
  this.forEach((val, i) => obj[foo[i % foo.length]] = val);
  return obj;
}
/* ----------------------------CREATE DOM ---------------------------------- */
var styleDOM = (style, elem) => createDOM(style, '_style', elem ? elem : document.body);
var createDOM = (foo, bar, atElem) => { // creates dom elements from a js obj or json/uri; supports p5.
  if ([null, undefined].includes(foo) || ['_tag', '_id', 'onready', 'onReady', 'onelement'].includes(bar)) return;
  if (typeof foo === 'string' && foo.endsWith('.json')) return loadJSON(foo, data => createDOM(data, bar, atElem));
  var isP5 = !!window.p5; // identifies if using p5
  if (!window.dom) window.dom = {}; // creates dom obj to hold id'ed elems
  if (bar && (isP5 ? bar.elt : bar.tagName)) { // creates in this elem: createDOM(obj, elem, [append]) 
    if (!atElem) isP5 ? bar.html('') : bar.innerHTML = ''; // no append, replace content 
    return Object.keys(foo).forEach(key => createDOM(foo[key], key, bar));
  }
  if (atElem && bar) { // event handlers: createDOM(handler, event, elem)
    if (isP5 && ['mousePressed', 'doubleClicked', 'mouseWheel', 'mouseReleased', 'mouseClicked', 'mouseMoved', 'mouseOver', 'mouseOut', 'touchStarted', 'touchMoved', 'touchEnded', 'dragOver', 'dragLeave'].includes(bar))
      return atElem[bar](foo);
    if (['onblur', 'onchange', 'onfocus', 'onselect', 'onsubmit', 'onreset', 'onkeydown', 'onkeypress', 'onkeyup', 'onmouseover', 'onmouseout', 'onmousedown', 'onmouseup', 'onmousemove', 'onclick', 'ondblclick', 'onload', 'onerror', 'onunload', 'onresize'].includes(bar))
      return atElem[bar] = foo;
  }
  if (!bar) bar = 'main'; // default name
  var [tag, id, ...cls] = bar.split('_'); // name as tag_id_classes
  if (bar.includes('.')) { // name as "tag#id.classes"
    cls = bar.split('.');
    tag = cls.shift();
  }
  if (tag.includes('#'))[tag, id] = tag.split('#');
  const TAGGED = tag && tag.match(/^h[1-9]$/) || ['main', 'a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b', 'base', 'basefont', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'datalist', 'dd', 'del', 'dfn', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset', 'head', 'header', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'map', 'mark', 'meta', 'meter', 'menu', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'p', 'param', 'pre', 'progress', 'q', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong', 'style', 'sub', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'u', 'ul', 'var', 'video', 'wbr'].includes(tag);
  tag = foo._tag ? foo._tag : TAGGED ? tag : false;
  var elem = (isP5 ? foo.elt : foo.tagName) ? foo : false; // finds if foo is an elem
  const IS_VAL = ['boolean', 'number', 'string'].includes(typeof foo);
  const IS_ARRAY = !IS_VAL && Array.isArray(foo);
  if (!elem) { // foo is not an element
    if (!tag && id) { // value for prop: createDOM(val, '_prop', elem)
      if (!atElem) return; // no elem to put the prop
      elem = atElem.elt ? atElem.elt : atElem;
      var [prop, val] = [id, String(foo)]; // props start with '_'
      if (prop === 'html') elem.innerHTML = val;
      else if (prop === 'text') elem.innerText = val;
      else if (IS_ARRAY && prop === 'class') foo.forEach(c => elem.classList.add(c));
      else if (!IS_VAL && !IS_ARRAY && prop === 'style') Object.keys(foo).forEach(key => elem.style[key] = foo[key]); // styles passed as foo.prop (camelCase)
      else elem.setAttribute(prop, val);
      return;
    }
    if (!tag) tag = 'div'; // default tag
    if (IS_ARRAY) elem = foo.map(o => createDOM(o, [tag, ...cls].join('.'), atElem)); // creates elems from foo array
    else {
      elem = isP5 ? createElement(tag) : document.body.appendChild(document.createElement(tag));
      if (IS_VAL)(isP5 ? elem.elt : elem).innerHTML = foo.markdown ? foo.markdown() : foo; // no children (markdown html)
      else Object.keys(foo).forEach(key => createDOM(foo[key], key, elem)); // creates children
    }
  }
  id = foo._id ? foo._id : !TAGGED ? bar : id;
  if (id && isNaN(id)) { // adds elem to dom; ignores number ids
    var [unid, i] = [id, 1];
    while (window.dom[unid]) unid = id + i++; // if element exists adds a number after the name
    if (!IS_ARRAY) elem && isP5 ? elem.id(unid.camelCase('-')) : elem.setAttribute('id', unid.camelCase('-'));
    window.dom[unid] = elem;
  }
  if (!IS_ARRAY) {
    if (cls) cls.forEach(c => isP5 ? elem.addClass(c) : elem.classList.add(c));
    if (atElem) isP5 ? atElem.child(elem) : atElem.appendChild(elem);
    var onready = foo.onready ? foo.onready : foo.onReady ? foo.onReady : foo.onelement;
    if (onready) onready(elem); // passes element to function
    return elem;
  }
};

/* ---------------------------------- P5 ------------------------------------ */
if (!!window.p5) {
  var opacate = (c, factor) => { // returns color with changed opacity (alpha)
    c = color(c);
    return color(red(c), green(c), blue(c), 255 * factor);
  };
  var darken = (c, factor = 1) => { // return a color with changed lightness
    colorMode(HSL);
    c = color(c);
    return color(hue(c), saturation(c), lightness(c) * factor);
  };
}
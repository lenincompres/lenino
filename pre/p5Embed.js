/*
embeds p5.php within an iFrame to load a p5 js file 
*/

function p5Embed(filename, container, id, prepend = false) {
  var div = document.createElement('div'),
    iFrame = document.createElement('iframe');
  div.setAttribute('style', 'width:100%;height:100%;overflow:hidden;border:none;margin:0;padding:0;');
  id ? div.id = id : null;
  typeof container === 'string' ? container = document.getElementById(container) : null;
  prepend ? container.prepend(div) : container.appendChild(div);
  iFrame.setAttribute('scrolling', 'no');
  iFrame.setAttribute('style', 'width:100%;height:100%;overflow:hidden;border:none;margin:0;padding:0;');
  iFrame.setAttribute('src', window.location.hostname + '/p5/p5.php?src=' + filename);
  div.prepend(iFrame);
  return iFrame;
}
/* 
creates events in the window to be dispatched from the p5 js with: window.parent.postMessage('eventName', '*'); 
*/
var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
window[eventMethod](eventMethod === 'attachEvent' ? 'onmessage' : 'message', e => {
  window.dispatchEvent(new Event(e.data));
});
// reloads all iFrames so that p5 canvases may be resized
window.addEventListener('resize', () => {
  if(window.innerWidth < 650) return;
  var iframes = [...document.getElementsByTagName('iframe')];
  iframes.forEach(e => e.contentWindow.location.reload());
});

/*
embeds on divs with classes that start with p5-
*/
[...document.querySelectorAll("[class^='p5-']")].forEach(div => {
  var fn = div.textContent;
  if (fn.endsWith('.js')) fn = fn.substr(0, fn.length - 3);
  div.textContent = '';
  p5Embed(fn, div);
});
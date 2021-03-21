/*

  Creates a new p5 canvas to be placed in a new layer.

*/

function Layer(canvasId, containerId, w, h) { // p could be any variable name

  return new p5(layer => {

    layer.setup = function () {

      layer.canvas = layer.createCanvas(w ? w : windowWidth, h ? h : windowHeight);

      layer.canvas.id(canvasId);

      let mainStyle = document.getElementById(canvasId).style;

      mainStyle.zIndex = 0;

      mainStyle.position = 'absolute';

      mainStyle.pointerEvents = 'none';

    };

    layer.draw = () => null;

    layer.hitTest = (x, y) => !!alpha(color(layer.get(x, y)));

  }, containerId);

};
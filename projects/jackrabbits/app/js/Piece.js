/*
  Extends Item to add images from sprites. Assumes center at the middle of the piece
*/
class Piece extends Item {

  constructor(src, col = 0, row = 0, w, h, depth = 3, isCount = false) {
    super(0, 0);
    // setup
    if (!w) {
      isCount = true;
      w = h = 1
    }
    if (!h) h = w;
    if (isCount) { //instead of width and height of grid, number of col and row was passed
      w = src.width / w;
      h = src.height / h;
    }

    // object 
    this.w = int(w);
    this.h = int(h);
    this.z = 1;
    this.visible = true;
    this.depth = depth; // this is the distance for the shadow
    this.img = createImage(this.w, this.h);
    this.img.copy(src, col * this.w, row * this.h, this.w, this.h, 0, 0, this.w, this.h);
    this.glows = {};
  }

  draw(z = 1) {
    this.update();
    if (!this.visible) return;
    push();
    translate(this.x * z, this.y * z);
    rotate(this.r);
    let rel = this.relativeFrame(z);
    // shadow
    if (!this.flat) {
      let r = -TWO_PI / 3 - this.r;
      let [dx, dy] = [this.depth * cos(r), this.depth * sin(r)];
      if (this.glows[0]) image(this.glows[0], rel.x - dx, rel.y - dy, rel.w, rel.h);
    }
    // image
    image(this.img, rel.x, rel.y, rel.w, rel.h);
    // glow
    if (this.glows[this.glow]) image(this.glows[this.glow], rel.x, rel.y, rel.w, rel.h);
    pop();
  }

  relativeFrame(z = 1) {
    z *= this.z;
    let [w, h] = [this.w * z, this.h * z];
    let [x, y] = [-w * 0.5, -h * 0.5];
    return {
      x: x,
      y: y,
      z: z,
      w: w,
      h: h,
    }
  }

  get(x, y, rel = false) {
    if (rel) { // assumes coords from the center of the tile
      x += this.w * 0.5;
      y += this.h * 0.5;
    } else { // assumes coords from the canvas top left corner
      x = (x - this.x) / this.z + this.w * 0.5;
      y = (y - this.y) / this.z + this.h * 0.5;
    }
    return this.img.get(x, y);
  }

  isMe(inX, inY, global = true, z = 1) {
    if (!this.visible) return false;
    let [x, y] = parsexy(inX, inY);
    if (global) {
      x -= this.x;
      y -= this.y;
    }
    if (this.r !== 0) {
      let h = dist(0, 0, x, y);
      let a = atan2(y, x);
      x = h * cos(a - this.r);
      y = h * sin(a - this.r);
    }
    return !!this.get(x, y, global)[3];
  }

  //
  createGlow(colorName = 0){
    if (!window.glowsLog) window.glowsLog = {};
    colorMode(RGB);
    let c = color(colorName);
    let [r,g,b] = [red(c), green(c), blue(c)];
    //create black glow template, also used as shadow
    if (!window.glowsLog[this.type]) {
      window.glowsLog[this.type] = {};
      let glowImg = createImage(this.w, this.h);
      this.img.loadPixels();
      // creates a black gradient from edges in
      let maxRadius = dist(this.w * 0.5, this.h * 0.5, 0, 0);
      for (let angle = TWO_PI; angle > 0; angle -= 0.01) {
        let topRadius;
        for (let radius = maxRadius; radius > 0; radius--) {
          let [x, y] = [this.w * 0.5 + radius * sin(angle), this.h * 0.5 + radius * cos(angle)];
          let pixel = this.img.get(x, y);
          if (pixel[3] > 0) {
            if (!topRadius) topRadius = radius;
            let a = alpha(pixel) * pow(radius / topRadius, 3);
            glowImg.set(x, y, color(r, g, b, a));
            //cover wholes
            glowImg.set(x + 1, y, color(r, g, b, a));
            glowImg.set(x, y + 1, color(r, g, b, a));
          }
        }
      }
      glowImg.updatePixels();
      window.glowsLog[this.type][colorName] = glowImg
      this.glows[colorName] = window.glowsLog[this.type][colorName]; // adds it to this glows as the first one
    }
    return Object.keys(this.glows)[0];
  }

  // TILE GLOWS and Shadows
  addGlows(...glowColors) {
    let baseName = this.createGlow();
    //create other glows based off of the black one
    glowColors.forEach(glowColor => {
      if (!window.glowsLog[this.type][glowColor]) {
        let glowImg = createImage(this.w, this.h);
        let pixArr = color(glowColor);
        pixArr = [red(pixArr), green(pixArr), blue(pixArr), 0];
        glowImg.loadPixels();
        glowImg.pixels.forEach((_, i) => glowImg.pixels[i] = (i % 4) === 3 ? this.glows[baseName].pixels[i] : pixArr[i % 4]);
        glowImg.updatePixels();
        window.glowsLog[this.type][glowColor] = glowImg;
      }
    });
    Object.keys(window.glowsLog[this.type]).forEach(key => this.glows[key] = window.glowsLog[this.type][key]);
  }

  get width(){
    return this.w * this.z;
  }

  get height(){
    return this.h * this.z;
  }

}
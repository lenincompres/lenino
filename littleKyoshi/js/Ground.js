class Ground extends P5Body {

  constructor(x, y, w = 20, h = 20) {

    super(x, y, w, h, {

      friction: 0.5,

      restitution: 0,

      density: 0.5,

      isStatic: true

    });

    this.color = 'sandyBrown';

  }

}
//game pieces set and setup



/*

The 'sets' is an array of objects to get from sprites 

[

  {

    sprite: images grid,

    group: '', name 'group' where this and other sprites fall into: like tiles, or tokens

    type: '', 'type' of this sprite, like square token versus round tokens

    labels: {}, any aditional or more specific type of group names

    cols: 1, //number of cols in the sprite, or an array or tags for each col. This tag becomes the 'order' of the piece

    rows: 1, //number of rows in the sprite, or an array or tags for each row. This tag becomes the 'level' of the piece

    reps: 1 //number of repetitions in the sprite, or an array or tags for each repetition

    break: undefined //if the set should be displayed in another line

    hidden: false

  }

]



The 'id' of every tile becomes 'group_type_order_level_repi' (where repi is repedition count)





You may also indicate the position for displaying the set.

left:

top:

padding: between tiles in the initial placement

peekx & peeky: the fraction in displacement of filed up tiles of repeted sets or 

*/



function PieceSet(sets, left = 0, top = 0, padding = 0, peekx = 0.15, peeky) {

  if (!peeky) peeky = peekx;

  let pieces = [];

  let setFirst;

  let prev = {

    x: left,

    y: top,

    w: 0,

    h: 0

  };



  if(!Array.isArray(sets)) sets = [sets];

  sets.forEach(the => { //each set

    if (!the.reps) the.reps = 1;

    if (!the.cols) the.cols = 1;

    if (!the.rows) the.rows = 1;

    if (typeof the.cols === 'number') the.cols = Array(the.cols).fill();

    if (typeof the.rows === 'number') the.rows = Array(the.rows).fill();



    Array(the.reps).populate(repi => { // each repetition

      the.rows.forEach((row, j) => {

        the.cols.forEach((col, i) => {

          p = new Piece(the.sprite, i, j, the.cols.length, the.rows.length, 3, true);

          Object.assign(p, the.labels);

          p.group = the.group;

          p.type = the.type;

          p.order = col;

          p.level = row;

          p.id = [p.group, p.type, p.order, p.level, repi].filter(v => v).join('_');

          p.visible = !the.hidden;

          if (p.visible) {

            if (!setFirst) setFirst = p;

            if (!i && pieces.length) { // its the first of the line of set repetition

              if (!repi && !(i + j)) { //its the first of the set

                prev = {

                  x: !the.break ? prev.x : left,

                  y: !the.break ? setFirst.y : prev.y + prev.h + padding,

                  w: !the.break ? prev.w * 0.5 + p.w * 0.5 : 0,

                  h: prev.h

                }

                if (p.visible) {

                  setFirst = p;

                }

              } else {

                prev = pieces[pieces.length - the.cols.length];

                prev = {

                  x: the.rows.length > 1 && !(i + j) ? left : prev.x + prev.w * peekx,

                  y: prev.y + prev.h * peeky,

                  w: 0,

                  h: 0

                }

              }

            }

            p.x = prev.x + prev.w + padding;

            p.y = prev.y;

          }

          pieces.push(prev = p);

        });

      });

    });

  });



  return pieces;

}
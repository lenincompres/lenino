/*

LEGEND



x: x position

y: y position

z: z postion, zoom, size

r: angle of rotation in radians

d: distance, delta, difference

a: alpha

t: time elapsed

vx: velocity in x

s: speed (no direcion)

dir: direction (1 or -1)

f: force

i: index (int count)

n: number of times, count

m: mass or value carried

v: value



*/



const LEVEL = {

  BASIC: 'BASIC',

  COMPLETE: 'COMPLETE',

  //ADVANCED: 'ADVANCED',

}



const ROLE = {

  CASTLE: 'CASTLE',

  UNDERGROUND: 'UNDERGROUND',

  OVERBOARD: 'OVERBOARD',

  ROYAL: 'ROYAL',

  CAVE: 'CAVE',

  FORK: 'FORK',

  BEND: 'BEND',

  WOODS: 'WOODS',

  MOUNTAIN: 'MOUNTAIN',

}



const RIDE = {

  HORSE: 'HORSE',

  BOAT: 'BOAT',

}



const TITLE = {

  JACK: 'JACK',

  QUEEN: 'QUEEN',

  KING: 'KING'

}



const TILE = {

  TRIANGLE: 'TRIANGLE',

  RHOMBUS: 'RHOMBUS',

  HEX: 'HEX'

}



const TRIANGLE = {

  CAVE: ROLE.CAVE,

  BEND: ROLE.BEND,

  FORK: ROLE.FORK

}



const SUIT = {

  HEARTS: 'HEARTS',

  SPADES: 'SPADES',

  DIAMONDS: 'DIAMONDS',

  CLUBS: 'CLUBS',

  HORSESHOES: 'HORSESHOES',

  SHIELDS: 'SHIELDS',

  SEASHELLS: 'SEASHELLS',

  TORCHES: 'TORCHES',

  ICESKULLS: 'ICESKULLS',

  BONECHARS: 'BONECHARS',

  MUSHROOMS: 'MUSHROOMS',

  CRYSTALS: 'CRYSTALS'

}



const RHOMBUS = {

  [SUIT.HEARTS]: ROLE.WOODS,

  [SUIT.SPADES]: ROLE.WOODS,

  [SUIT.DIAMONDS]: ROLE.MOUNTAIN,

  [SUIT.CLUBS]: ROLE.MOUNTAIN,

  /*[SUIT.HORSESHOES]: 'ROLE.CANYON',

  [SUIT.SHIELDS]: 'ROLE.FORT',

  [SUIT.SEASHELLS]: 'ROLE.WATER',

  [SUIT.TORCHES]: 'ROLE.VOLCANO',

  [SUIT.ICESKULLS]: 'ROLE.ICE',

  [SUIT.BONECHARS]: 'ROLE.WHIRLPOOL',

  [SUIT.MUSHROOMS]: 'ROLE.SINKHOLE',

  [SUIT.CRYSTALS]: 'ROLE.BLOCK',*/

}



const EDGE = {

  FIELD: 'FIELD',

  SEA: 'SEA',

  ROAD: 'ROAD'

}



const PIECE = { //piece.groups

  SUIT: 'SUIT',

  TILE: 'TILE',

  RABBIT: 'RABBIT',

  CARROT: 'CARROT',

  RIDE: 'RIDE'

}



const RABBIT = {

  CHERRY: 'CHERRY',

  GRAPE: 'GRAPE',

  LEMON: 'LEMON',

  MINT: 'MINT',

  STRAWBERRY: 'STRAWBERRY',

  KIWI: 'KIWI',

  TANGERINE: 'TANGERINE',

  PEANUT: 'PEANUT',

  BLUEBERRY: 'BLUEBERRY',

  PLUM: 'PLUM',

  COFFEE: 'COFFEE',

  PEACH: 'PEACH',

  HONEYDEW: 'HONEYDEW',

  LYCHEE: 'LYCHEE',

}



const COLOR = {

  undefined: 'green',

	LIGHT: 'var(--light)',

	COOL: 'var(--cool)',

	BRIGHT: 'var(--bright)',

	WARM: 'var(--warm)',

	HOT: 'var(--hot)',

	DARK: 'var(--dark)',

  //general

  [EDGE.FIELD]: 'green',

  [EDGE.ROAD]: 'lightGoldenrodYellow',

  [EDGE.SEA]: 'steelBlue',

  // pips

  [SUIT.HEARTS]: 'crimson',

  [SUIT.SPADES]: 'indigo',

  [SUIT.DIAMONDS]: 'darkGoldenrod',

  [SUIT.CLUBS]: 'teal',

  // extension pips

  [SUIT.HORSESHOES]: 'saddleBrown',

  [SUIT.SHIELDS]: 'slateGray',

  [SUIT.SEASHELLS]: 'royalBlue',

  [SUIT.TORCHES]: 'orangeRed',

  [SUIT.ICESKULLS]: 'lavender',

  [SUIT.BONECHARS]: 'black',

  [SUIT.MUSHROOMS]: 'oliveDrab',

  [SUIT.CRYSTALS]: 'white',

  // rabbits

  [RABBIT.CHERRY]: 'red',

  [RABBIT.GRAPE]: 'purple',

  [RABBIT.LEMON]: 'yellow',

  [RABBIT.MINT]: 'mediumSpringGreen',

  // extension rabbits,

  [RABBIT.TANGERINE]: 'orange',

  [RABBIT.BLUEBERRY]: 'blue',

  [RABBIT.STRAWBERRY]: 'deepPink',

  [RABBIT.KIWI]: 'greenYellow',

  [RABBIT.PEANUT]: 'darkKhaki',

  [RABBIT.PEACH]: 'peachPuff',

  [RABBIT.PLUM]: 'plum',

  [RABBIT.COFFEE]: 'maroon',

  [RABBIT.HONEYDEW]: 'powderBlue',

  [RABBIT.LYCHEE]: 'pink',

  // tiles

  [ROLE.BEND]: ['darkGoldenRod','crimson'],

  [ROLE.FORK]: ['darkGoldenRod','indigo'],

  [ROLE.CAVE]: ['teal','black'],

  [ROLE.CASTLE]: 'green',

  [ROLE.UNDERGROUND]: 'black',

  [ROLE.OVERBOARD]: 'black',

  [ROLE.WOODS]:  ['crimson', 'green','indigo'],

  //[ROLE.WOODS]:  'green',

  [TILE.RHOMBUS]: 'green',

  [RIDE.HORSE]: 'saddleBrown',

  [RIDE.BOAT]: 'royalBlue',

}



const ICON = {

  undefined: `<span class="icon-rabbit"></span>`,

  [SUIT.DIAMONDS]: `<span class="icon-diamonds suit"></span>`,

  [SUIT.HEARTS]: `<span class="icon-hearts suit"></span>`,

  [SUIT.SPADES]: `<span class="icon-spades suit"></span>`,

  [SUIT.CLUBS]: `<span class="icon-clubs suit"></span>`,

  [TITLE.JACK]: `<span class="icon-bishop"></span>`,

  [TITLE.QUEEN]: `<span class="icon-queen"></span>`,

  [TITLE.KING]: `<span class="icon-king"></span>`,

  [ROLE.ROYAL]: {

    [TITLE.JACK]: '<i>J</i>',

    [TITLE.QUEEN]: '<i>Q</i>',

    [TITLE.KING]: '<i>K</i>',

  },

  [ROLE.CASTLE] : `<span class="icon-rook""></span>`,

  [ROLE.UNDERGROUND]: `<span class="icon-rabbit"></span>`,

  [ROLE.OVERBOARD]: `<span class="icon-rabbit"></span>`,

  [ROLE.WOODS]: `<span class="icon-rabbit"></span>`,

  [ROLE.BEND]: `<span class="icon-knight"></span>`,

  [ROLE.FORK]: `<span class="icon-knight"></span>`,

  [ROLE.CAVE]: `<span class="icon-rabbit"></span>`,

  [RIDE.BOAT]: `<span class="icon-shells"></span>`,

  [RIDE.HORSE]: `<span class="icon-horseshoes"></span>`,

}



const SUITS = {

  [ROLE.BEND]: [SUIT.DIAMONDS, SUIT.HEARTS],

  [ROLE.FORK]: [SUIT.DIAMONDS, SUIT.SPADES],

  [ROLE.CAVE]: [SUIT.CLUBS],

  [ROLE.WOODS]: [SUIT.HEARTS, SUIT.CLUBS, SUIT.SPADES],

}



const GLOW = {

  WRONG: COLOR[RABBIT.CHERRY],

  IDLE: COLOR[EDGE.SEA],

  RIGHT: COLOR[EDGE.ROAD],

}



const STAGE = {

  PRESET: 'PRESET',

  SETUP: 'SETUP',

  PLAYING: 'PLAYING',

  OVER: 'OVER'

}
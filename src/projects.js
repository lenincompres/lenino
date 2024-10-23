import Copy from "./Copy.js";

Copy.addKey("hermanastra", "jackrabbits", "DOMjs", "locos", "pre", "album", "animacules", "chimes", "eloping", "pieces", "lave", "book", "code", "film", "game", "music", "performance", "theatre", "tool", "writing");

Copy.add({
  [Copy.KEY.book]: {
    en: "book",
    es: "libro",
  },
  [Copy.KEY.code]: {
    en: "code",
    es: "código",
  },
  [Copy.KEY.film]: {
    en: "film",
    es: "cine",
  },
  [Copy.KEY.game]: {
    en: "game",
    es: "juego",
  },
  [Copy.KEY.music]: {
    en: "music",
    es: "música",
  },
  [Copy.KEY.performance]: "performance",
  [Copy.KEY.theatre]: {
    en: "theatre",
    es: "teatro",
  },
  [Copy.KEY.tool]: {
    en: "tool",
    es: "herramienta",
  },
  [Copy.KEY.writing]: {
    en: "writing",
    es: "escritura",
  },
  [Copy.KEY.hermanastra]: [{
    en: "La Hermanastra",
    es: "The Stepsister",
  }, {
    en: "A cabaret style musical monologue that reveals the stepsister's fate after Cinderella steals her prince.",
    es: "Monólogo músical que revela lo que pasó con la hermanastra de la Cenicienta tras perder al príncipe.",
  }],
  [Copy.KEY.jackrabbits]: ["Jack Rabbits", {
    en: "The board game for playing cards on a land of wooden shards",
    es: "El juego de tablero en el que viajas al reino de conejos y barajas.",
  }],
  [Copy.KEY.DOMjs]: ["DOM.js (DOM.set)", {
    en: "JavaScript library that creates and handles DOM structures using a JS structural objects as a model",
    es: "Librería de JavaScript que crea y maneja estructuras de DOM utilizando objetos estructurales de JS como modelo.",
  }],
  [Copy.KEY.locos]: [{
    en: "Mis 500 Locos",
    es: "A State of Madness",
  }, {
    en: "Feature film written by Lenin Compres & Waddys Jaquez, directed by Leticia Tonos, based on book by Antonio Zaglul",
    es: "Película de largometraje escrita por Lenin Comprés y Waddys Jáquez, dirigida por Leticia Tonos, basada en un libro de Antonio Zaglul",
  }],
  [Copy.KEY.pre]: ["3DPsyche", {
    en: "Psychometric tool to visualize the physical, rational and emotional spectrum—interests, focus, personality types.",
    es: "Herramienta psicométrica que visualiza la espectro físico, racional y emocional del interes, el enfoque y la personalidad.",
  }],
  [Copy.KEY.album]: ["Illusions of Duality", {
    en: "Musical album: a storyteller's journey through conflict and empathy",
    es: "Album musical: la travesía del cuentacuentos a través del conflicto y la empatía",
  }],
  [Copy.KEY.animacules]: [{
    en: "Animalcules",
    es: "Animalucos",
  }, {
    en: "A digital story of life. Use movement and voice to survive as an unicellular organism.",
    es: "Una historia digital de la vida. Utiliza tu movimiento y voz para sobrevivir como un organismo unicelular",
  }],
  [Copy.KEY.chimes]: [{
    en: "Photonic Chimes",
    es: "Fotones Musicales",
  }, {
    en: "A refreshing and relaxing piece of creative code.",
    es: "Una pieza de código creativo y relajante.",
  }],
  [Copy.KEY.eloping]: ["Eloping is Fun", {
    en: "Lenino may officiate the wedding of your wildest dreams stress-free, easy and fun.",
    es: "Lenino podría oficiar la boda de tus fantasías sin estrés, con facilidad y diversión.",
  }],
  [Copy.KEY.pieces]: [{
    en: "12 Short Pieces",
    es: "Las 12 Piezas Cortas",
  }, {
    en: "Primeras obras de teatro, dirigidas a la formación de talentos teatrales. Incluye <b>Desayuno en Rojo Chino</b>.",
    es: "First theatre plays by Lenino, aimed at training theater talents. Includes <b>Desayuno en Rojo Chino</b>.",
  }],
  [Copy.KEY.lave]: ["La Ve", {
    en: "Cover of Regina Spektor's “That Time” to celebrate international theatre month at La 37 por las Tablas, Santiago R.D.",
    es: "Cover de “That Time” de Regina Spektor para celebrar el mes internacional del teatro en La 37 por las Tablas, Santiago R.D.",
  }],
});

export const projects = [{
  title: Copy.get(Copy.KEY.hermanastra),
  folder: "hermanastra",
  img: "assets/hermanastra.png",
  desc: Copy.next(),
  tags: [Copy.get(Copy.KEY.music), Copy.get(Copy.KEY.writing), Copy.get(Copy.KEY.theatre), Copy.get(Copy.KEY.performance)]
}, {
  title: Copy.get(Copy.KEY.jackrabbits),
  folder: "jackrabbits",
  link: "http://jackrabbits.lenino.net",
  img: "assets/jackrabbits.png",
  desc: Copy.next(),
  tags: [Copy.get(Copy.KEY.game), Copy.get(Copy.KEY.code)]
}, {
  title: Copy.get(Copy.KEY.DOMjs),
  link: "https://github.com/lenincompres/DOM.js",
  img: "assets/dom.png",
  desc: Copy.next(),
  tags: [Copy.get(Copy.KEY.code)]
}, {
  title: Copy.get(Copy.KEY.locos),
  link: "https://www.imdb.com/title/tt7552938/",
  img: "assets/mis500locos.jpg",
  desc: Copy.next(),
  tags: [Copy.get(Copy.KEY.film), Copy.get(Copy.KEY.writing)]
}, {
  title: Copy.get(Copy.KEY.pre),
  folder: "pre",
  link: "http://pre.lenino.net",
  img: "assets/pre.png",
  desc: Copy.next(),
  tags: [Copy.get(Copy.KEY.tool)],
}, {
  title: Copy.get(Copy.KEY.album),
  folder: "album",
  desc: Copy.next(),
  tags: [Copy.get(Copy.KEY.music), Copy.get(Copy.KEY.writing)],
}, {
  title: Copy.get(Copy.KEY.animacules),
  link: "https://lenincompres.github.io/animacules/",
  img: "assets/animacules.png",
  desc: Copy.next(),
  tags: ['ITP', 'NYU|TISCH', 'P5.js', 'Ml5', 'Machine Learning for the Web'],
  tags: [Copy.get(Copy.KEY.game), Copy.get(Copy.KEY.code)],
}, {
  title: Copy.get(Copy.KEY.chimes),
  link: "chimes/",
  img: "assets/chimes.png",
  desc: Copy.next(),
  tags: ['ITP', 'NYU|TISCH', 'P5.js', 'Ml5', 'Machine Learning for the Web'],
  tags: [Copy.get(Copy.KEY.code), Copy.get(Copy.KEY.music)]
}, {
  title: Copy.get(Copy.KEY.eloping),
  link: "https://elopingisfun.com//about-us/#leninbio",
  img: "https://elopingisfun.com/wp-content/uploads/2023/10/Jenny_2.gif",
  desc: Copy.next(),
  tags: [Copy.get(Copy.KEY.performance)]
}, {
  title: Copy.get(Copy.KEY.pieces),
  folder: "las12piezascortas",
  img: "assets/12piezascortas.png",
  desc: Copy.next(),
  tags: [Copy.get(Copy.KEY.book), Copy.get(Copy.KEY.writing), Copy.get(Copy.KEY.theatre)]
}, {
  title: Copy.get(Copy.KEY.lave),
  link: "https://www.youtube.com/watch?v=Fr4daDGACKs&t=17s",
  img: "https://i.ytimg.com/vi/Fr4daDGACKs/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBbk0ztUHhK0oCNYTrtibFNoLrhkQ",
  desc: Copy.next(),
  tags: [Copy.get(Copy.KEY.music), Copy.get(Copy.KEY.performance), Copy.get(Copy.KEY.theatre)]
}]

export default projects;
import Copy from "../../../lib/Copy.js";
import tags from "./tags.js";

export const projects = [{
  title: Copy.text({
    en: "La Hermanastra",
    es: "The Stepsister",
  }),
  folder: "hermanastra",
  img: "assets/hermanastra.png",
  desc: Copy.text({
    en: "A cabaret style musical monologue that reveals the stepsister's fate after Cinderella steals her prince.",
    es: "Monólogo músical que revela lo que pasó con la hermanastra de la Cenicienta tras perder al príncipe.",
  }),
  tags: [Copy.at.music, Copy.at.writing, Copy.at.theatre, Copy.at.performance]
}, {
  title: "JackRabbits",
  folder: "jackrabbits",
  link: "http://jackrabbits.lenino.net",
  img: "assets/jackrabbits.png",
  desc: Copy.text({
    en: "The board game for playing cards on a land of wooden shards",
    es: "El juego de tablero en el que viajas al reino de conejos y barajas.",
  }),
  tags: [Copy.at.game, Copy.at.code]
}, {
  title: "DOM.js (DOM.set())",
  link: "https://github.com/lenincompres/DOM.js",
  img: "assets/dom.png",
  desc: Copy.text({
    en: "JavaScript library that creates and handles DOM structures using a JS structural objects as a model",
    es: "Librería de JavaScript que crea y maneja estructuras de DOM utilizando objetos estructurales de JS como modelo.",
  }),
  tags: [Copy.at.code]
}, {
  title: Copy.text({
    en: "Mis 500 Locos",
    es: "A State of Madness",
  }),
  link: "https://www.imdb.com/title/tt7552938/",
  img: "assets/mis500locos.jpg",
  desc: Copy.text({
    en: "Feature film written by Lenin Compres & Waddys Jaquez, directed by Leticia Tonos, based on book by Antonio Zaglul",
    es: "Película de largometraje escrita por Lenin Comprés y Waddys Jáquez, dirigida por Leticia Tonos, basada en un libro de Antonio Zaglul",
  }),
  tags: [Copy.at.film, Copy.at.writing]
}, {
  title: "3DPsyche",
  folder: "pre",
  link: "http://pre.lenino.net",
  img: "assets/pre.png",
  desc: Copy.text({
    en: "Psychometric tool to visualize the physical, rational and emotional spectrum—interests, focus, personality types.",
    es: "Herramienta psicométrica que visualiza la espectro físico, racional y emocional del interes, el enfoque y la personalidad.",
  }),
  tags: [Copy.at.tool],
}, {
  title: "Illusions of Duality",
  folder: "album",
  desc: Copy.text({
    en: "Musical album: a storyteller's journey through conflict and empathy",
    es: "Album musical: la travesía del cuentacuentos a través del conflicto y la empatía",
  }),
  tags: [Copy.at.music, Copy.at.writing],
}, {
  title: Copy.text({
    en: "Animalcules",
    es: "Animalucos",
  }),
  link: "https://lenincompres.github.io/animacules/",
  img: "assets/animacules.png",
  desc: Copy.text({
    en: "A digital story of life. Use movement and voice to survive as an unicellular organism.",
    es: "Una historia digital de la vida. Utiliza tu movimiento y voz para sobrevivir como un organismo unicelular",
  }),
  tags: ['ITP', 'NYU|TISCH', 'P5.js', 'Ml5', 'Machine Learning for the Web'],
  tags: [Copy.at.game, Copy.at.code],
}, {
  title: Copy.text({
    en: "Photonic Chimes",
    es: "Fotones Musicales",
  }),
  link: "chimes/",
  img: "assets/chimes.png",
  desc: Copy.text({
    en: "A refreshing and relaxing piece of creative code.",
    es: "Una pieza de código creativo y relajante.",
  }),
  tags: ['ITP', 'NYU|TISCH', 'P5.js', 'Ml5', 'Machine Learning for the Web'],
  tags: [Copy.at.code, Copy.at.music]
}, {
  title: "Eloping is Fun",
  link: "https://elopingisfun.com//about-us/#leninbio",
  img: "https://elopingisfun.com/wp-content/uploads/2023/10/Jenny_2.gif",
  desc: Copy.text({
    en: "Lenino may officiate the wedding of your wildest dreams stress-free, easy and fun.",
    es: "Lenino podría oficiar la boda de tus fantasías sin estrés, con facilidad y diversión.",
  }),
  tags: [Copy.at.performance]
}, {
  title: Copy.text({
    en: "12 Short Pieces",
    es: "Las 12 Piezas Cortas",
  }),
  folder: "las12piezascortas",
  img: "assets/12piezascortas.png",
  desc: Copy.text({
    en: "Primeras obras de teatro, dirigidas a la formación de talentos teatrales. Incluye <b>Desayuno en Rojo Chino</b>.",
    es: "First theatre plays by Lenino, aimed at training theater talents. Includes <b>Desayuno en Rojo Chino</b>.",
  }),
  tags: [Copy.at.book, Copy.at.writing, Copy.at.theatre]
}, {
  title: "La Ve",
  link: "https://www.youtube.com/watch?v=Fr4daDGACKs&t=17s",
  img: "https://i.ytimg.com/vi/Fr4daDGACKs/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBbk0ztUHhK0oCNYTrtibFNoLrhkQ",
  desc: Copy.text({
    en: "Cover of Regina Spektor's “That Time” to celebrate international theatre month at La 37 por las Tablas, Santiago R.D.",
    es: "Cover de “That Time” de Regina Spektor para celebrar el mes internacional del teatro en La 37 por las Tablas, Santiago R.D.",
  }),
  tags: [Copy.at.music, Copy.at.performance, Copy.at.theatre]
}]

export default projects;
import Copy from "../../../lib/Copy.js";
import tags from "./tags.js";

export const projects = [{
  title: Copy.text({
    es: "Terräfirmä",
    en: "Yonder Lands",
  }),
  link: Copy.text({
    es: "https://terrafirma.yonderlands.net/",
    en: "https://www.yonderlands.net/",
  }),
  img: "assets/terrafirma.png",
  desc: Copy.text({
    en: "My debut novel's manuscript: an original and multiethnic prequel to Alice's Wonderland.",
    es: "Manuscrito de mi primera novela: una precuela inédita y multiétnica del País de las Maravillas.",
  }),
  tags: [Copy.at.writing, Copy.at.book]
}, {
  title: "Jack Rabbits",
  folder: "jackrabbits",
  link: "http://jackrabbits.lenino.net",
  img: "assets/jackrabbits.png",
  desc: Copy.text({
    en: "The board game for playing cards</br> on a land of wooden shards.",
    es: "El juego de tablero en el que viajas</br> al reino de conejos y barajas.",
  }),
  tags: [Copy.at.game, Copy.at.code]
}, {
  title: Copy.text({
    es: "La Psiquis 3D (3DPsyche)",
    en: "3D Psyche",
  }),
  link: "http://3dpsyche.lenino.net",
  img: "assets/3dpsyche.png",
  desc: Copy.text({
    en: "Explore the dimensions of your mind: a framework for human perception, determination, and focus.",
    es: "Explora las dimensiones de tu mente: una visualización para la percepción, determinación y enfoque humano.",
  }),
  tags: [Copy.at.tool, Copy.at.code],
}, {
  title: "DOM.js",
  link: "https://github.com/lenincompres/DOM.js",
  img: "assets/dom.png",
  desc: Copy.text({
    en: "JavaScript library that creates and handles DOM structures using JS structural objects as models.",
    es: "Librería de JavaScript que crea y maneja estructuras del DOM utilizando notación de objetos de JS.",
  }),
  tags: [Copy.at.code]
}, {
  title: Copy.text({
    es: "La Hermanastra",
    en: "The Stepsister",
  }),
  folder: "hermanastra",
  img: "assets/hermanastra.png",
  desc: Copy.text({
    en: "A cabaret style musical monologue that reveals the stepsister's fate after Cinderella steals her prince.",
    es: "Monólogo músical que revela el destino de la hermanastra de la Cenicienta tras perder al príncipe.",
  }),
  tags: [Copy.at.music, Copy.at.writing, Copy.at.theatre, Copy.at.performance]
}, {
  title: "Illusions of Duality",
  folder: "album",
  desc: Copy.text({
    en: "Musical album: a storyteller's journey through conflict and empathy",
    es: "Album musical <i>Ilusiones de dualidad</i>: la travesía del cuentacuentos a través del conflicto y la empatía",
  }),
  tags: [Copy.at.music, Copy.at.writing],
}, /*{
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
},*/ {
  title: Copy.text({
    es: "Mis 500 Locos",
    en: "A State of Madness",
  }),
  link: "https://www.imdb.com/title/tt7552938/",
  img: "assets/mis500locos.jpg",
  desc: Copy.text({
    es: "Largometraje co-escrito con Waddys Jáquez, dirigido por Leticia Tonos, basado en un libro de Antonio Zaglul",
    en: "Feature film co-written with Waddys Jaquez, directed by Leticia Tonos, based on book by Antonio Zaglul",
  }),
  tags: [Copy.at.film, Copy.at.writing]
}, {
  title: Copy.text({
    es: "Las 12 Piezas Cortas",
    en: "The 12 Short Pieces",
  }),
  folder: "las12piezascortas",
  img: "assets/12piezascortas.png",
  desc: Copy.text({
    es: "Primeras obras de teatro,  escritas en los 90's en la República Dominicana. Incluye <i>Desayuno en Rojo Chino</i>.",
    en: "Short plays written in the 1990's in the Dominican Republic. Includes <i>Desayuno en Rojo Chino</i>.",
  }),
  tags: [Copy.at.book, Copy.at.writing, Copy.at.theatre]
}, {
  title: Copy.text({
    es: "La Ve",
    en: "La Ve (That Time)",
  }),
  link: "https://www.youtube.com/watch?v=Fr4daDGACKs&t=17s",
  img: "https://i.ytimg.com/vi/Fr4daDGACKs/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBbk0ztUHhK0oCNYTrtibFNoLrhkQ",
  desc: Copy.text({
    en: "Cover of Regina Spektor to celebrate the international theatre month at La 37 por las Tablas, Santiago R.D.",
    es: "Cover de Regina Spektor para celebrar el mes internacional del teatro, en La 37 por las Tablas, R.D.",
  }),
  tags: [Copy.at.music, Copy.at.performance, Copy.at.theatre]
}]

export default projects;
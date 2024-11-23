import Copy from "../../../lib/Copy.js";

const tags = {
  book: {
    en: "book",
    es: "libro",
  },
  code: {
    en: "code",
    es: "código",
  },
  film: {
    en: "film",
    es: "cine",
  },
  game: {
    en: "game",
    es: "juego",
  },
  music: {
    en: "music",
    es: "música",
  },
  performance: "performance",
  theatre: {
    en: "theatre",
    es: "teatro",
  },
  tool: {
    en: "tool",
    es: "herramienta",
  },
  writing: {
    en: "writing",
    es: "escritura",
  },
};

Copy.add(tags);

export default Object.keys(tags);
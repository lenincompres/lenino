class TEXT {
  static GET_JK = {
    ENG: "Get the Jack Rabbits game",
    ESP: "Adquiere Jack Rabbits!",
  }
  static PAGE_TITLE = {
    ENG: "Suit Yourself",
    ESP: "Echa tus cartas",
  }
  static PAGE_TITLE_DONE = {
    ENG: name => name ? `This is <b>${name}</b>'s hand` : "This is your hand",
    ESP: name => name ? `Esta es la mano de <b>${name}</b>` : "Esta es tu mano",
  }
  static YOUR = {
    ENG: "Your ",
    ESP: "Tu ",
  }
  static CARD_HINTS = [{
      ENG: "Use +1 and -1 to change the value.",
      ESP: "Usa +1 y -1 para cambiar el valor.",
    },
    {
      ENG: "See the pips available bellow.",
      ESP: "Ve los puntos disponibles abajo.",
    },
    {
      ENG: "Reduce others to increase this one.",
      ESP: "Reduce otra para incrementar esta.",
    },
    {
      ENG: "Exchage others to increase this.",
      ESP: "Cambia esta usando las otras.",
    },
  ]
  static POINTS_LEFT = {
    ENG: "Pips available",
    ESP: "Puntos disponibles",
  }
  static NEXT = {
    ENG: "next",
    ESP: "continuar",
  }
  static WHEN_READY = {
    ENG: `Increase the cards at will and click <b>${TEXT.NEXT.ENG}</b> when safistied.`,
    ESP: `Incrementa las cartas a tu gusto y luego pincha <b>${TEXT.NEXT.ESP}</b>.`,
  }
  static BEGIN = {
    ENG: "begin",
    ESP: "comenzar",
  }
  static TIE = {
    ENG: suits => `To have a definite suit, you must break the tie between ${TEXT.concat(suits, "and")}.`,
    ESP: suits => `Para para tener un símbolo definitivo, necesitas romper el empate entre ${TEXT.concat(suits, "y")}.`,
  }
  static AND = {
    ENG: "and",
    ESP: "y",
  }
  static DONE = {
    ENG: "done",
    ESP: "listo",
  }
  static WHEN_DONE = {
    ENG: `Click <b>${TEXT.DONE.ENG}</b> when safistied.`,
    ESP: `Pincha <b>${TEXT.DONE.ESP}</b> cuando estés satisfecho.`,
  }
  static RESTART = {
    ENG: "Restart",
    ESP: "Reiniciar",
  }
  static FIND_YOURS = {
    ENG: "Reveal your hand",
    ESP: "Revela tu mano",
  }
  static PAGE_DESCRIPTION = {
    ENG: `Which one is <b>your</b> suit order? The suits represent 4 major pesonality traits. This short interaction will reveal which is the one you value the most. You'll be given 8 extra points (or “pips”) to increase the cards bellow. Click <b>${TEXT.BEGIN.ENG}</b> to start.`,
    ESP: `Los símbolos de las cartas representan 4 grandes rasgos de la personalidad. Con esta breve interacción podrás revelar cuál de ellos valoras más. Tendrás 8 puntos extra parar repartir entre las cartas después de presionar <b>${TEXT.BEGIN.ENG}</b>.`,
  }
  static DESCRIPTION = {
    ENG: (suit, name) => `This is how ${name ? `<b>${name}</b> values` : "you value"} the 4 main personality traits shown in the cards. According to this valuation, the <strong style="color:${suit.color}">${TEXT[suit.symbol].ENG}</strong> are ${name ? `<b>${name}</b>'s` : "your"} main suit. This symbol—also called <strong style="color:${suit.color}">${TEXT[suit.alt].ENG}</strong>—is the one for ${TEXT[suit.cast].ENG} who focus on ${TEXT[suit.symbol].meaning.ENG}.`,
    ESP: (suit, name) => `Así es como ${name ? `<b>${name}</b> valora` : "valoras"} los 4 principales rasgos de la personalidad en las cartas. De acuerdo con esta valoración, ${name ? `el símbolo principal de <b>${name}</b>` : "tu símbolo principal"} es el de <strong style="color:${suit.color}">${TEXT[suit.symbol].ESP}</strong>. Este símbolo, también llamado <strong style="color:${suit.color}">${TEXT[suit.alt].ESP}</strong>, es el de ${TEXT[suit.cast].ESP} enfocandos en ${TEXT[suit.symbol].meaning.ESP}.`,
  }
  static SHARE_HAND = {
    ENG: "Share your hand",
    ESP: "Comparte tu mano",
  }
  static SHARE_MESSAGE ={
    ENG: "This is my hand, how I value the 4 main personality traits shown in the cards. Get to know me.",
    ESP: "Esta es mi mano, como valoro los 4 principales rasgos de la personalidad en las cartas. Ven a conocerme."
  }
  static name = {
    ENG: "name",
    ESP: "nombre",
  }
  static share = {
    ENG: "share",
    ESP: "comparte",
  }
  static diamonds = {
    ENG: "diamonds",
    ESP: "diamantes",
    meaning: {
      ENG: "objectivity, resoursefulness and comfort",
      ESP: "la objetividad, la aptitud y el confort",
    }
  }
  static spades = {
    ENG: "spades",
    ESP: "picas",
    meaning: {
      ENG: "courage, determination and work",
      ESP: "la valentía, la determinación y el esfuerzo",
    }
  }
  static hearts = {
    ENG: "hearts",
    ESP: "corazones",
    meaning: {
      ENG: "pleasure, freedom and art",
      ESP: "el placer, el arte  y la libertad",
    }
  }
  static clovers = {
    ENG: "clovers",
    ESP: "tréboles",
    meaning: {
      ENG: "knowledge, truth and nature",
      ESP: "el conocimiento, la naturaleza y la verdad",
    }
  }
  static gold = {
    ENG: "gold",
    ESP: "oros",
  }
  static swords = {
    ENG: "swords",
    ESP: "espadas",
  }
  static cups = {
    ENG: "cups",
    ESP: "copas",
  }
  static clubs = {
    ENG: "clubs",
    ESP: "bastos",
  }
  static merchant = {
    ENG: "merchants",
    ESP: "mercaderes",
  }
  static warrior = {
    ENG: "warriors",
    ESP: "guerreros",
  }
  static charmer = {
    ENG: "charmers",
    ESP: "encantadores",
  }
  static sage = {
    ENG: "sages",
    ESP: "sabios",
  }
  static wealth = {
    ENG: "wealth",
    ESP: "riqueza",
  }
  static charm = {
    ENG: "charm",
    ESP: "encanto",
  }
  static strength = {
    ENG: "strength",
    ESP: "fuerza",
  }
  static wisdom = {
    ENG: "wisdom",
    ESP: "sabiduría",
  }
  static concat = (cards, and) => {
    let last = cards.pop();
    return `${cards.join(", ")} ${and} ${last}`;
  }
}

export default TEXT;
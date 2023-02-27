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
    ENG: "This is your hand",
    ESP: "Esta es tu mano",
  }
  static PAGE_DESCRIPTION = {
    ENG: "Which one is <b>YOUR</b> suit? The suits represent 4 mayor pesonality traits. This short interaction will reveal which is the one you value the most. You'll be given 8 extra points (pips) to increase the cards bellow. Click <b>BEGIN</b> to start.",
    ESP: "Los símbolos de las cartas representan 4 grandes rasgos de la personalidad. Con esta breve interacción podrás revelar cuál de ellos valoras más. Tendrás 8 puntos extra parar repartir entre las cartas después de presionar <b>COMIENZAR</b>.",
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
      ENG: "Change others to affect this one.",
      ESP: "Cambia esta usando las otras.",
    },
  ]
  static POINTS_LEFT = {
    ENG: "Pips available",
    ESP: "Puntos disponibles",
  }
  static NEXT = {
    ENG: "Next ",
    ESP: "Continuar ",
  }
  static WHEN_READY = {
    ENG: "Modify the cards at will and click <b>NEXT</b> when safistied.",
    ESP: "Modifica las cartas a gusto y luego pincha <b>CONTINUAR</b>.",
  }
  static WHEN_DONE = {
    ENG: "Modify and click <b>DONE</b> when safistied.",
    ESP: "Modifica a gusto y luego pincha <b>LISTO</b>.",
  }
  static BEGIN = {
    ENG: "Begin",
    ESP: "Comenzar",
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
    ENG: "Done",
    ESP: "Listo",
  }
  static RESTART = {
    ENG: "Restart",
    ESP: "Reiniciar",
  }
  static DESCRIPTION = {
    ENG: suit => `According to your valuation, the <b style="color:${suit.color}">${TEXT[suit.symbol].ENG}</b> (also called ${TEXT[suit.alt].ENG}) are your suit. This is the symbol for ${TEXT[suit.cast].ENG} who focus on ${TEXT[suit.symbol].meaning.ENG}.`,
    ESP: suit => `De acuerdo con tu valoración, tu símbolo es el de <b style="color:${suit.color}">${TEXT[suit.symbol].ESP}</b>. Este símbolo, también llamado <b style="color:${suit.color}">${TEXT[suit.alt].ESP}</b>, es el de ${TEXT[suit.cast].ESP} enfocandos en ${TEXT[suit.symbol].meaning.ESP}.`,
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
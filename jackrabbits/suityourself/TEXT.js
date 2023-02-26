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
  static PAGE_SUBTITLE = {
    ENG: "This interaction will reveal the suit you belong to. Each card represents a trait you must value according to your nature. You will have 8 points (pips) to distribute among the cards.",
    ESP: "Esta interacción revelará cuál es tu símbolo. Cada carta representa una cualidad que valóralas de acuerdo a tu naturaleza. Tendrás 8 puntos disponibles para agregarles.",
  }
  static PAGE_SUBTITLE_DONE = {
    ENG: "According to your valuation",
    ESP: "De acuerdo a tu valoración",
  }
  static YOUR = {
    ENG: "Your ",
    ESP: "Tu ",
  }
  static CARD_HINTS = [{
      ENG: "Change the value by clicking +1 or -1.",
      ESP: "Pulsa +1 ó -1 para cambiar el valor.",
    },
    {
      ENG: "Mind the currency available bellow.",
      ESP: "Fíjate en los puntos disponibles abajo.",
    },
    {
      ENG: "If you need pips, reduce other cards.",
      ESP: "Si necesitas puntos, reduce las cartas.",
    },
    {
      ENG: "Modify other cards to affect this one.",
      ESP: "Modifica las demás para cambiar esta.",
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
  static BEGIN = {
    ENG: "Begin",
    ESP: "Comienza",
  }
  static TIE = {
    ENG: suits => `To have a definite suit, you must break the tie between ${TEXT.concat(suits, "and")}.`,
    ESP: suits => `Para definir un símbolo, necesitas romper el empate entre ${TEXT.concat(suits, "y")}.`,
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
    ENG: suit => `According to your valuation, <b style="color:${suit.color}">${TEXT[suit.symbol].ENG}</b> (also called ${TEXT[suit.alt].ENG}) are the ones that suit you best. This is the suit for ${TEXT[suit.cast].ENG} focused on ${TEXT[suit.symbol].meaning.ENG}.`,
    ESP: suit => `De acuerdo con tu valoración, tu símbolo es el de <b style="color:${suit.color}">${TEXT[suit.symbol].ESP}</b> (${TEXT[suit.alt].ESP}). El símbolo de los ${TEXT[suit.cast].ESP} enfocandos en ${TEXT[suit.symbol].meaning.ESP}.`,
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
      ESP: "el arte, el placer y la libertad",
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
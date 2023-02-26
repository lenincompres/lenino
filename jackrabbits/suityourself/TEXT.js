class GET_SUITED_TEXT {
  static GET_JK = {
    ENG: "Get the Jack Rabbits game",
    ESP: "Adquiere Jack Rabbits!",
  }
  static PAGE_TITLE= {
    ENG: "Suit Yourself",
    ESP: "Echa tus cartas",
  }
  static PAGE_TITLE_DONE = {
    ENG: "This is your hand",
    ESP: "Esta es tu mano",
  }
  static PAGE_SUBTITLE = {
    ENG: "Rate these traits according to your natural tendency, and discover which is your suit.",
    ESP: "Valora estos rasgos de acuerdo a tu enfoque natural y revelarás cuál es tu símbolo.",
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
      ENG: "Use the arrows to change the value.",
      ESP: "Cambia el valor usando las flechas.",
    },
    {
      ENG: "Mind the points you have left.",
      ESP: "Fíjate en los puntos disponibles.",
    },
    {
      ENG: "Reduce some traits to gain others.",
      ESP: "Reduce unos para poder subir otros.",
    },
    {
      ENG: "Exchange other traits for this.",
      ESP: "Canjea los demás para adquirir este.",
    },
  ]
  static POINTS_LEFT = {
    ENG: " points left.",
    ESP: " puntos disponibles.",
  }
  static NEXT = {
    ENG: "Next",
    ESP: "Siguiente",
  }
  static TIE = {
    ENG: "To have a definite suit, you must break the tie between ",
    ESP: "Para definir un símbolo, necesitas romper el empate entre ",
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
    ENG: (suit) => `<b style="color:${suit.color};text-transform: capitalize;">${SUIT[suit.symbol].ENG}</b> suit you best. This is the symbol for ${SUIT[suit.cast].ENG} focused on ${SUIT[suit.symbol].meaning.ENG}.`,
    ESP: (suit) => `Tu símbolo es el de <b style="color:${suit.color}">${SUIT[suit.symbol].ESP}</b>, los ${SUIT[suit.cast].ESP} enfocandos en ${SUIT[suit.symbol].meaning.ESP}.`,
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
    ESP: "espadas",
    meaning: {
      ENG: "courage, principles and work",
      ESP: "la valentía, los princípios y el esfuerzo",
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
  static clubs = {
    ENG: "clubs",
    ESP: "bastos",
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
}

export default GET_SUITED_TEXT;

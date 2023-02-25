const TEXT = {
  GET_JK: {
    ENG: "Get the Jack Rabbits game",
    ESP: "Adquiere Jack Rabbits!",
  },
  PAGE_TITLE: {
    ENG: "Suit Yourself",
    ESP: "¿Cuál es tu símbolo?",
  },
  PAGE_TITLE_DONE: {
    ENG: "This is your hand",
    ESP: "Esta es tu mano",
  },
  PAGE_SUBTITLE: {
    ENG: "Rate these traits according to your natural tendency.",
    ESP: "Valora estos rasgos de acuerdo a tu enfoque natural.",
  },
  YOUR: {
    ENG: "Your ",
    ESP: "Tu ",
  },
  CARD_HINTS: [{
      ENG: "Use the arrows to change the value.",
      ESP: "Cambia el valor usando las flechas.",
    },
    {
      ENG: "Mind the points you have left.",
      ESP: "Fíjate en los puntos disponibles.",
    },
    {
      ENG: "Let go from other traits to gain this.",
      ESP: "Renuncia a otros para ganar aquí.",
    },
    {
      ENG: "Exchange your traits for this.",
      ESP: "Canjea los demás para adquirir este.",
    },
  ],
  POINTS_LEFT: {
    ENG: " points left.",
    ESP: " puntos disponibles.",
  },
  NEXT: {
    ENG: "Next",
    ESP: "Siguiente",
  },
  TIE: {
    ENG: "To have a definite suit, you must break the tie between ",
    ESP: "Para definir un símbolo, necesitas romper el empate entre ",
  },
  AND: {
    ENG: "and",
    ESP: "y",
  },
  DONE: {
    ENG: "Done",
    ESP: "Listo",
  },
  RESTART: {
    ENG: "Restart",
    ESP: "Reiniciar",
  },
  DESCRIPTION: {
    ENG: (suits = []) => {
      console.log(suits);
      let suit = suits[0];
      return {
        p: `According to your value of the cards, you're suited with <b style="color:${suit.color}">${SUIT[suit.symbol].ENG}</b>, a symbol for ${SUIT[suit.cast].ENG} focused on ${SUIT[suit.symbol].meaning.ENG}.`,
        ul: {
          margin: "1em",
          li: suits.map(s => getPct(s))
        },
      }
    },
    ESP: (suits = []) => {
      let suit = suits[0];
      return {
        p: `De acuerdo a tu valoración, tu símbolo es el de <b style="color:${suit.color}">${SUIT[suit.symbol].ESP}</b>, el de ${SUIT[suit.cast].ESP} enfocandos en ${SUIT[suit.symbol].meaning.ESP}.`,
        ul: {
          margin: "1em",
          li: suits.map(s => getPct(s))
        },
      };
    },
  },
}

const getPct = (suit) => {
  if(!suit.pct) return;
  return {
    img: {
      verticalAlign: "middle",
      height: "1em",
      src: suit.image
    },
    b: {
      textAlign: "left",
      display: "inline-block",
      width: "3em",
      color: suit.color,
      text: suit.pct + "%",
    }
  }
}

const SUIT = {
  diamonds: {
    ENG: "diamonds",
    ESP: "diamantes",
    meaning: {
      ENG: "objectivity, resoursefulness and comfort",
      ESP: "la objetividad, la aptitud y el confort",
    }
  },
  spades: {
    ENG: "spades",
    ESP: "espadas",
    meaning: {
      ENG: "courage, order and faith",
      ESP: "la valentía, el orden y la fe",
    }
  },
  hearts: {
    ENG: "hearts",
    ESP: "corazones",
    meaning: {
      ENG: "pleasure, freedom and art",
      ESP: "el arte, el placer y la libertad",
    }
  },
  clubs: {
    ENG: "clubs",
    ESP: "bastos",
    meaning: {
      ENG: "knowledge, truth and nature",
      ESP: "el conocimiento, la naturaleza y la verdad",
    }
  },
  gold: {
    ENG: "gold",
    ESP: "oros",
  },
  swords: {
    ENG: "swords",
    ESP: "espadas",
  },
  cups: {
    ENG: "cups",
    ESP: "copas",
  },
  merchant: {
    ENG: "merchants",
    ESP: "mercaderes",
  },
  warrior: {
    ENG: "warriors",
    ESP: "guerreros",
  },
  charmer: {
    ENG: "charmers",
    ESP: "encantadores",
  },
  sage: {
    ENG: "sages",
    ESP: "sabios",
  },
  wealth: {
    ENG: "wealth",
    ESP: "riqueza",
  },
  charm: {
    ENG: "charm",
    ESP: "encanto",
  },
  strength: {
    ENG: "strength",
    ESP: "fuerza",
  },
  wisdom: {
    ENG: "wisdom",
    ESP: "sabiduría",
  },
}
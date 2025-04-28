import Copy from "../../lib/Copy.js";

export const songlistModel = {

  css: {
    h5: {
      marginTop: "1em",
      before: {
        content: '"«"',
      },
      after: {
        content: '"»"',
      },
    }
  },

  marginTop: "1em",

  h2: Copy.text({
    es: "Números musicales",
    en: "Musical Numbers",
  }),
  p: Copy.text({
    es: "Letra y música de Lenin Comprés",
    en: "All lyrics and music by Lenin Comprés, unless otherwise noted.",
  }),
  ul: {
    marginTop: "1em",
    li: [{
      h5: Copy.text({
        es: "Los 4 Trucos Mágicos",
        en: "The 4 Magic Tricks",
      }),
    },{
      h5: Copy.text({
        es: "Este es su cuento",
        en: "This Is Her Story",
      }),
    }, {
      h5: Copy.text({
        es: "Cuentas nuevas",
        en: "Clean Slate",
      }),
    }, {
      h5: Copy.text({
        es: "Mujer vieja",
        en: "Mujer vieja",
      }),
      a: {
        text: Copy.text({
          es: "Inspiración: «Äijö» de Värtinä",
          en: "Inspired by: «Äijö» by Värtinä",
        }),
        href: "https://open.spotify.com/track/35m2JguMQJA0h7uHSsnBuL",
        target: "_blank",
      },
    }, {
      h5: Copy.text({
        es: "Cantaletas",
        en: "Tedious Ramblings",
      }),
      a: {
        text: Copy.text({
          es: "Original: «Tedious Ramblings» de Lenino",
          en: "",
        }),
        href: "https://www.youtube.com/watch?v=HI0THFj81s8",
        target: "_blank",
      },
    }, {
      h5: Copy.text({
        es: "Mala imagen",
        en: "Public Image",
      }),
    }, {
      h5: Copy.text({
        es: "Casa noble",
        en: "Noble Home",
      }),
      a: [{
        text: Copy.text({
          es: "Arreglo: Ambiorix Francisco",
          en: "Arrangement: Ambiorix Francisco",
        }),
        href: "https://open.spotify.com/artist/1IgORqBInIYlaipClp2Ma8",
        target: "_blank",
      }, {
        display: "block",
        text: Copy.text({
          es: "Mezcla: Jarxiel",
          en: "Mixing: Jarxiel",
        }),
        href: "https://open.spotify.com/artist/7vdRAvViSvP53CiwaCauS5",
        target: "_blank",
      }],
    }, {
      h5: Copy.text({
        es: "Entrevista sin malicia",
        en: "The Coy and the Candid",
      }),
      a: {
        text: Copy.text({
          es: "Original: «The Coy and the Candid» de Lenino",
          en: "",
        }),
        href: "https://open.spotify.com/track/3VPhykSY1ShrzcwyK9bYUS",
        target: "_blank",
      },
    }, {
      h5: Copy.text({
        es: "La ve",
        en: "This Was Her Story",
      }),
      a: [{
        text: Copy.text({
          es: "Original: «That Time» de Regina Spektor",
          en: "",
        }),
        href: "https://open.spotify.com/track/2lLZotRXsQL3k2xX8rhl7q",
        target: "_blank",
      },{
        display: "block",
        text:Copy.text({
          es:  "Cover de Lenino",
          en: "",
        }),
        href: "https://www.youtube.com/watch?v=Fr4daDGACKs&t=17s",
        target: "_blank",
      }],
    }]
  },
  
};

export default songlistModel;
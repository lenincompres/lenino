import Copy from "../../lib/Copy.js";

export const creditsModel = {
    marginTop: "3em",
    tag: "ul",
    h2: Copy.text({
      es: "Créditos & equipo",
      en: "Credits & Team",
    }),
    li: {
      margin: "1em 0",
      content: [{
          h6: Copy.text({
            es: "Autoría e interpretación",
            en: "written & performed by",
          }),
          a: {
            text: "Lenin Comprés",
            href: "http://lenino.net",
            target: "_blank",
          },
        },
        {
          h6: Copy.text({
            es: "Asesoría escénica y artística",
            en: "artistic & stage advisor",
          }),
          p: "Bethania Rivera",
          a: {
            text: "Waddys Jáquez",
            href: "https://www.instagram.com/waddysjaquez",
            target: "_blank",
          },
        },
        {
          h6: Copy.text({
            es: "Asesoría musical",
            en: "musical advisor",
          }),
          a: {
            text: "Mariana Cabot",
            href: "https://marianacabot.com/",
            target: "_blank",
          },
        },
        {
          h6: Copy.text({
            es: "Equipo técnico",
            en: "technical team",
          }),
          p: ["Rossy Torres", "Félix Guzmán"]
        },
        {
          h6: Copy.text({
            es: "Fotografía",
            en: "photography",
          }),
          a: {
            text: "Mariliana Arvelo",
            href: "https://www.stylishhipkids.com/",
            target: "_blank",
          },
        },
      ]
    }
  };

  export default creditsModel;
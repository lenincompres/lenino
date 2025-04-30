import Copy from "../../lib/Copy.js";

export const creditsModel = {
    marginTop: "3em",
    tag: "ul",
    h2: Copy.text({
      es: "Créditos",
      en: "Credits",
    }),
    li: {
      margin: "1em 0",
      content: [{
          h3: Copy.text({
            es: "Autoría e interpretación",
            en: "Written & Performed by",
          }),
          a: {
            text: "Lenin Comprés",
            href: "http://lenino.net",
            target: "_blank",
          },
        },
        {
          h3: Copy.text({
            es: "Asesoría escénica y artística",
            en: "Artistic & Stage Advisors",
          }),
          a: {
            text: "Waddys Jáquez",
            href: "https://www.instagram.com/waddysjaquez",
            target: "_blank",
          },
          div: ["Bethania Rivera", "Rossy Torres"],
        },
        {
          h3: Copy.text({
            es: "Asesoría musical",
            en: "Musical Advisor",
          }),
          a: {
            text: "Mariana Cabot",
            href: "https://marianacabot.com/",
            target: "_blank",
          },
        },
        {
          h3: Copy.text({
            es: "Fotografía",
            en: "Photography",
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
import Copy from "./Copy.js";

let news = [];

const addNews = (src, alt, href, desc = "", title = "") => news.push({
  h2: {
    fontFamily: "title",
    textAlign: "center",
    text: title,
  },
  a: {
    href: href,
    target: "_blank",
    img: {
      width: "100%",
      alt: alt,
      src: src,
    },
  },
  div: {
    marginBottom: "1em",
    markdown: desc.replace('{href}', href),
  }
});

addNews(
  "assets/poster.jpg",
  Copy.text({
    es: "desCONCIERTO de Jalogüín",
    en: "A Halloween disCONCERT",
  }),
  "https://www.google.com/maps/place/Ca%C3%B1ave/@40.8644495,-73.9289111,15z/data=!4m6!3m5!1s0x89c2f559184229cb:0x994c7ec6855fdb5!8m2!3d40.8644495!4d-73.9289111!16s%2Fg%2F11g0hldvl4?entry=ttu&g_ep=EgoyMDI0MTAyMC4xIKXMDSoASAFQAw%3D%3D",
  Copy.text({
    es: `Lenino sale de su madriguera a cantarle cuentos a las brujas, ogros, duendes y hadas que se manifiesten la noche del **3 de Noviembre** en [Cañave]({href}).`,
    en: `Lenino comes out of his burrow to sing stories to the witches, ogres, goblins and fairies that appear on the night of **November 3** at [Cañave]({href}).`,
  }),
);

addNews(
  "https://i.etsystatic.com/52679041/r/il/c0dc16/6069187861/il_794xN.6069187861_a4dz.jpg",
  Copy.text({
    es: "Nuevo website y turotial",
    en: "New website and tutorial",
  }),
  "https://jackrabbits.lenino.net/",
  Copy.text({
    es: `**Jack Rabbits** tiene un nuevo [website y video tutorial]({href}). También puedes comprar una copia limitada en introductoria del juego.`,
    en: `**Jack Rabbits** has a new [website and video tutorial]({href}). You can also buy a limited copy of the game there.`,
  }),
  Copy.text({
    es: "¡Nuevo website!",
    en: "New website!",
  }),
);

export default news;
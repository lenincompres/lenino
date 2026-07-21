DOM.set({
  header: {
    section: {
      img: {
        alt: movie.title,
        src: "title.png",
      },
      p: movie.subtitle,
      a_button: {
        text: "Solicitar el guión",
        href: "https://docs.google.com/forms/d/e/1FAIpQLSdim__utpeLGVRwo2z5-qJQ21WPEs1iJ0dCf4ypDQ5agu8D7A/viewform?usp=sharing&ouid=113685914100261088020",
        target: "_blank",
      },
    },
  },
  main: {
    section: [
      {
        class: "synopsis",
        h2: "Sinopsis",
        p: movie.synopsis,
      },
      {
        class: "history",
        h2: "Historia",
        ul: {
          li: Object.entries(movie.history).map(([key, value]) => ({
            h3: key,
            p: value,
          })),
        },
      },
      {
        class: "characters",
        section_caracter: movie.characters.map((character) => ({
          img: {
            src: `${character.name.toLowerCase()}.png`,
          },
          h3: character.name,
          p: character.description,
        })),
      },
      {
        class: "details",
        section: [
          {
            h2: "Tema Central",
            ul: movie.theme,
          },
          {
            h2: "Tono",
            ul: movie.tone,
          },
          {
            h2: "Detalles",
            ul: {
              li: [
                `Formato: ${movie.format}`,
                `Duración: ${movie.duration}`,
                `Género: ${movie.genre}`,
                `Idioma: ${movie.language}`,
                `locación: ${movie.location}`,
                `Estado: ${movie.draft}`,
                `Autor: ${movie.author}`,
              ],
            },
          },
          {
            h2: "Motivos visuales",
            p: movie.visuals.join(", "),
          },
        ],
      },
    ],
  },
  footer: {
    a_button: {
      text: "Solicitar el guión",
      href: "https://docs.google.com/forms/d/e/1FAIpQLSdim__utpeLGVRwo2z5-qJQ21WPEs1iJ0dCf4ypDQ5agu8D7A/viewform?usp=sharing&ouid=113685914100261088020",
      target: "_blank",
    },
    p: "Disponible para productores y directores.",
    backgroundImage: "footer.png",
  },
  p: "© Lenin Comprés Todos los derechos reservados."
  /*
  aside : {
    img: {
      alt: "Poster de la película",
      src: "poster.png",
    },
    click: e => e.target.style.display = "none",
  }*/
});

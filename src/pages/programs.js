import Copy from "../../lib/Copy.js";
import * as STYLE from "../style.js";
import programs from "./data/programs.js";

Copy.add({
  formats: {
    en: "Formats",
    es: "Formatos",
  },
  audience: {
    en: "Audience",
    es: "Público",
  },
  languages: {
    en: "Languages",
    es: "Idiomas",
  },
  bilingual: {
    en: "English / Spanish",
    es: "Inglés / Español",
  },
});

const programsPage = {
  section: {
    style: STYLE.PAGE,
    padding: "2em",
    content: [{
      model: STYLE.SLIDE("left", 2),
      h2: Copy.text({
        en: "Educational Offerings",
        es: "Propuestas Educativas",
      }),
      p: Copy.text({
        en: [
          "<b>Workshops, talks, and tools for transformative learning</b>",
          "Lenino offers dynamic programs at the intersection of creativity, storytelling, and critical reflection. These offerings are designed to meet learners where they are—whether in classrooms, community centers, conferences, or creative residencies. All programs are available in English or Spanish, in-person or online, and can be tailored for youth, educators, or general audiences."
        ],
        es: [
          "<b>Talleres, charlas y herramientas para un aprendizaje transformador</b>",
          "Lenino ofrece programas dinámicos en la intersección entre creatividad, narración y reflexión crítica. Estas propuestas están diseñadas para encontrar participantes donde estén, ya sea en aulas, centros comunitarios, conferencias o residencias creativas. Todos los programas están disponibles en inglés o español, de forma presencial o virtual, y pueden adaptarse para jóvenes, educadores o públicos generales."
        ],
      }),
    }, ...programs.map((program, i) => ({
      model: STYLE.SLIDE("left", i + 3),
      display: "flex",
      flexFlow: "wrap",
      justifyContent: "center",
      a: {
        href: program.url,
        img: {
          width: "9em",
          height: "fit-content",
          marginRight: "0.5em",
          src: program.img,
          alt: `${program.title} image`,
        },
      },
      section: {
        width: "100%",
        maxWidth: "31.8em",
        h3: {
          a: {
            text: program.title,
            href: program.url,
          }
        },
        p: [`<b>${program.tagline}</b>`, program.description, {
          ul: {
            li: [
              `<b>${Copy.at.formats}:</b> ${program.formats}`,
              `<b>${Copy.at.audience}:</b> ${program.audience}`,
              `<b>${Copy.at.languages}:</b> ${Copy.at.bilingual}`,
            ],
          },
        }],
        menu: {
          marginTop: "1em",
          display: "flex",
          justifyContent: "space-evenly",
          a: [{
            display: "block",
            textAlign: "right",
            text: Copy.text({
              en: "Visit the Site",
              es: "Visita la página"
            }),
            href: program.url,
          }, {
            display: "block",
            textAlign: "right",
            text: Copy.text({
              en: "Download Dossier",
              es: "Descarga el dossier"
            }),
            href: program.dossier,
          }],
        },
      },
    }))],
  }
};

export default programsPage;
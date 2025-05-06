import Copy from "../../lib/Copy.js";
import * as STYLE from "../style.js";

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

const programs = [{
  url: "http://3dpsyche.lenino.net",
  img: "assets/3dpsyche.png",
  title: Copy.text({
    en: "The 3D Psyche",
    es: "La Psique Tridimensional",
  }),
  tagline: Copy.text({
    en: "Visual psychology for curious minds",
    es: "Psicología visual para mentes curiosas",
  }),
  description: Copy.text({
    en: "Explore how we think, feel, and act using a vibrant, cube-based framework that maps our states of focus across body, mind, and heart. Perfect for social-emotional learning, self-awareness, and group dynamics",
    es: "Explora cómo pensamos, sentimos y actuamos a través de un modelo vibrante basado en un cubo que mapea nuestros estados de enfoque entre cuerpo, mente y corazón. Ideal para aprendizaje socioemocional, autoconocimiento y dinámicas de grupo.",
  }),
  formats: Copy.text({
    en: "Talk / Workshop / Multi-session Series",
    es: "Charla / Taller / Serie de sesiones",
  }),
  audience: Copy.text({
    en: "Teens – Adults",
    es: "Adolescentes – Personas adultas",
  }),
  dossier: Copy.text({
    en: "http://3dpsyche.lenino.net/educationalDossier.pdf",
    es: "http://3dpsyche.lenino.net/dossierEducativo.pdf",
  }),
}, {
  url: "http://jackrabbits.lenino.net",
  img: "assets/jackrabbits.png",
  title: Copy.text({
    en: "Jack Rabbits: Game, Strategy & Story",
    es: "Jack Rabbits: Juego, Estrategia y Relato",
  }),
  tagline: Copy.text({
    en: "Board game meets creative thinking",
    es: "Juego de mesa y pensamiento creativo",
  }),
  description: Copy.text({
    en: "Enter a wonderland of logic, lore, and luck. Explore the mechanics and design of the Jack Rabbits board game—learning how games can teach math, strategy, poetry, power dynamics, and narrative thinking.",
    es: "Adéntrate en un país de las maravillas de lógica, suerte y leyenda. Explora las mecánicas y el diseño del juego Jack Rabbits—aprendiendo cómo los juegos pueden enseñar matemáticas, estrategia, poesía, sistemas de poder y pensamiento narrativo.",
  }),
  formats: Copy.text({
    en: "Game Lab / Workshop / Artist Talk",
    es: "Laboratorio de juego / Taller / Charla artística",
  }),
  audience: Copy.text({
    en: "Ages 10+",
    es: "Mayores de 10 años",
  }),
  dossier: Copy.text({
    en: "http://jackrabbits.lenino.net/educationalDossier.pdf",
    es: "http://jackrabbits.lenino.net/dossierEducativo.pdf",
  }),
}, {
  url: "http://hermanastra.lenino.net",
  img: "assets/hermanastra.png",
  title: Copy.text({
    en: "The Stepsister",
    es: "La Hermanastra",
  }),
  tagline: Copy.text({
    en: "Fairytales flipped with humor and heart",
    es: "Cuentos de hadas al revés, con humor y corazón",
  }),
  description: Copy.text({
    en: "A musical-theater workshop or performance experience that reimagines Cinderella through the point of view of her curiously vain stepsister. Explores themes of self-image, gender, voice, and power with humor and song.",
    es: "Una experiencia de teatro musical en formato taller o función que reimagina la historia de Cenicienta desde el punto de vista de su hermanastra curiosamente vanidosa. Aborda con humor y canciones temas como la imagen, el género, la voz y el poder.",
  }),
  formats: Copy.text({
    en: "Performance + Q&A / Workshop / Talk",
    es: "Función + Conversatorio / Taller / Charla",
  }),
  audience: Copy.text({
    en: "Ages 14+",
    es: "Mayores de 14 años",
  }),
  dossier: Copy.text({
    en: "http://hermanastra.lenino.net/educationalDossier.pdf",
    es: "http://hermanastra.lenino.net/dossierEducativo.pdf",
  }),
}]

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
        en: ["<b>Workshops, talks, and tools for transformative learning</b>", "Lenino offers dynamic programs at the intersection of creativity, storytelling, and critical reflection. These offerings are designed to meet learners where they are—whether in classrooms, community centers, conferences, or creative residencies. All programs are available in English or Spanish, in-person or online, and can be tailored for youth, educators, or general audiences."],
        es: ["<b>Talleres, charlas y herramientas para un aprendizaje transformador</b>", "Lenino ofrece programas dinámicos en la intersección entre creatividad, narración y reflexión crítica. Estas propuestas están diseñadas para encontrarse con lxs participantes donde estén—ya sea en aulas, centros comunitarios, conferencias o residencias creativas. Todos los programas están disponibles en inglés o español, de forma presencial o virtual, y pueden adaptarse para jóvenes, educadores o públicos generales."],
      }),
    }, ...programs.map((program, i) => ({
      model: STYLE.SLIDE("left", i + 3),
      display: "flex",
      flexFlow: "wrap",
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
        maxWidth: "30em",
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
              es: "Descarga el Dossier"
            }),
            href: program.dossier,
          }],
        },
      },
    }))],
  }
};

export default programsPage;
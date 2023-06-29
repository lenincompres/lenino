import slideDown from "./animations/slideDown.js"
import allProjects from "./projects.js"
import * as STYLE from "./style.js";
import SOCIAL_LINKS from "./widgets/social.js"

const projects = allProjects.filter(p => !p.hidden);
const activeProject = new Binder();
const allTags = new Binder([]);
const ALL = "all";
const activeTag = new Binder(ALL);
const showTag = (tag = ALL) => activeTag.value = activeTag.value === tag ? ALL : tag;
const sortWords = (a, b) => a < b ? -1 : 1;

export const PAGES = {
  HOME: (lang = "ENG") => new Object({}),

  BIO: (lang = "ENG") => new Object({
    section: {
      style: STYLE.PAGE,
      content: [{
          p: lang === "ESP" ? [
            "Lenin Comprés es un artista dominicano residente en la ciudad de Nueva York; un profesional de los medios interactivos, las ciencias del aprendizaje y las artes escénicas; un pianista autodidacta y renacentista post-moderno. Ejerce como profesor y tecnólogo creativo en la Escuela de Artes TISCH de la Universidad de Nueva York y es egresado del Teacher’s College de la Universidad de Columbia. Ha escrito obras premiadas en la República Dominicana y escribió junto a Waddys Jáquez el guión de la película Mis 500 locos que representó al país en los premios Oscars del 2021. También es el creador del primer juego de mesa original de autoría dominicana, Lenino’s JACK RABBITS."
          ] : [
            "Lenin Comprés is a Dominican artist based in New York City; an interactive media, learning sciences, and performing arts professional; a self-taught pianist and post-modern renaissance man. He is a professor and creative technologist at New York University's TISCH School of the Arts and is a graduate of Columbia University's Teacher's College. He has written award-winning works in the Dominican Republic and co-wrote the screenplay for the movie Mis 500 locos, which represented the country at the 2021 Oscars, with Waddys Jáquez. He is also the creator of the first original Dominican-authored board game, Lenino's JACK RABBITS ."
          ]
        }
      ],
      onready: slideDown
    }
  }),

  PROJECTS: (lang = "ENG") => new Object({
    menu: {
      maxWidth: "50em",
      margin: "0 0.5em 0.5em",
      justifyContent: "center",
      display: "flex",
      flexWrap: "wrap",
      content: allTags.bind(val => {
        showTag();
        return {
          a: [ALL, ...val].map(tag => new Object({
            backgroundColor: activeTag.bind({
              [tag]: STYLE.COLOR.LINK_DARK,
              default: STYLE.COLOR.FADED
            }),
            color: activeTag.bind(val => val === tag ? STYLE.COLOR.PAGE : STYLE.COLOR.LINK),
            boxShadow: STYLE.SHADOW.NORMAL,
            borderRadius: "0.25em",
            padding: "0.2em 0.68em",
            margin: "0.3em 0.3em 0 0",
            display: "inline-block",
            text: tag,
            onclick: e => showTag(tag)
          }))
        }
      }),
      span: {
        color: STYLE.COLOR.FADED,
        textShadow: STYLE.SHADOW.TEXT,
        text: activeTag.bind(val => val !== ALL ? projects.filter(p => p.tags.includes(val)).length : projects.length),
      },
      onready: slideDown,
    },
    section: projects.map((project, i) => {
      return {
        model: STYLE.PAGE,
        fontSize: "1em",
        width: "23em",
        cursor: "pointer",
        boxShadow: DOM.bind(activeProject, val => val === i ? STYLE.SHADOW.HIGHLIGHT : STYLE.SHADOW.NORMAL),
        display: activeTag.bind(val => val === ALL || project.tags.includes(val) ? "block" : "none"),
        main: {
          minHeight: "6.5em",
          div: {
            float: "left",
            height: "6em",
            width: "6em",
            marginRight: "0.6em",
            backgroundImage: `url(${project.img ? project.img : project.folder + "/thumbnail.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          },
          h6: {
            marginBottom: "0.25em",
            fontWeight: "bold",
            text: typeof project.title === "string"? project.title : project.title[lang],
          },
          p: project.desc[lang],
        },
        ul: {
          marginTop: "0.2em",
          li: project.tags.sort(sortWords).map(tag => {
            if (!allTags.value.includes(tag)) allTags.value = [...allTags.value, tag].sort(sortWords);
            return {
              borderRadius: "0.25em",
              padding: "0.2em 0.4em",
              marginRight: "0.2em",
              backgroundColor: STYLE.COLOR.PALE,
              color: STYLE.COLOR.LINK,
              border: "solid 1px",
              borderColor: activeTag.bind({
                [tag]: STYLE.COLOR.LINK,
                default: STYLE.COLOR.PALE,
              }),
              display: "inline-block",
              text: tag,
              click: e => {
                activeTag.value = activeTag.value === tag ? false : tag;
                e.stopPropagation();
              }
            }
          })
        },
        mouseover: e => activeProject.value = i,
        mouseout: e => activeProject.value = false,
        click: e => {
          let link = project.link ? project.link : project.folder
          window.open(link, "_blank")
        },
        onready: slideDown
      }
    }),
    onready: () => {
      showTag();
      activeTag.value = false;
    }
  }),

  CONTACT: (lang = "ENG") => new Object({
    menu: {
      fontSize: "3.43em",
      marginTop: "1em",
      textAlign: "center",
      a: SOCIAL_LINKS.map(a => Object.assign({
        margin: "0.25em",
        onready: slideDown
      }, a))
    }
  }),

}

export default PAGES;
import slideDown from "./animations.js"
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
  HOME: (lang = "en") => new Object({}),

  BIO: (lang = "en") => new Object({
    section: {
      style: STYLE.PAGE,
      lineHeight: "1.5em",
      content: [{
          p: lang === "es" ? [
            `<b>Lenin Comprés</b> es un profesional de los medios interactivos, las ciencias del aprendizaje y las artes escénicas. Ejerce como profesor y tecnólogo creativo en la Escuela de Artes <a href="https://itp.nyu.edu/itp/people/?tab=staff">TISCH de la Universidad de Nueva York</a> y es egresado del <a href="https://www.tc.columbia.edu/human-development/cognitive-studies-in-education/">Teacher’s College de la Universidad de Columbia</a>. Ha escrito obras premiadas en la República Dominicana como el guión de la película <a href="https://www.imdb.com/title/tt7552938/">Mis 500 locos</a>, co-escrita junto a Waddys Jáquez y que representó al país en los premios Oscars del 2021. También es el creador del primer juego de mesa original de autoría dominicana, con el primer y único libro instructivo enteramente escrito en verso, <a href="http://jackrabbits.lenino.net">Lenino’s JACK RABBITS</a>.`
          ] : [
            `<b>Lenin Comprés</b> is a professional in interactive media, education sciences, and performing arts. He is a professor and creative technologist at <a href="https://itp.nyu.edu/itp/people/?tab=staff">New York University's TISCH School of the Arts</a> and a graduate of <a href="https://www.tc.columbia.edu/human-development/cognitive-studies-in-education/">Columbia University's Teacher's College</a>. He has written award-winning works in the Dominican Republic such as the script for the movie <a href="https://www.imdb.com/title/tt7552938/">A State of Madness</a>—co-written with Waddys Jáquez—which represented the country at the 2021 Oscars. He is also the creator of the first original Dominican-authored board game—with the first and only instructional booklet written entirely in verse and rhyme—<a href="http://jackrabbits.lenino.net">Lenino’s JACK RABBITS</a>.`
          ]
        }
      ],
      onready: slideDown
    }
  }),

  PROJECTS: (lang = "en") => new Object({
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

  CONTACT: (lang = "en") => new Object({
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
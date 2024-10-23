import slideDown from "./animations.js"
import allProjects from "./projects.js"
import * as STYLE from "./style.js";
import SOCIAL_LINKS from "./social.js";
import Copy from "./Copy.js";
import newsSection from "./news.js";

const projects = allProjects.filter(p => !p.hidden);
const activeProject = new Binder();
const allTags = new Binder([]);
const NONE = "∅";
const activeTag = new Binder(NONE);
const showTag = (tag = NONE) => activeTag.value = activeTag.value === tag ? NONE : tag;
const sortWords = (a, b) => a < b ? -1 : 1;

Copy.add({
  bio: {
    en: "bio",
    es: "biografía"
  },
  home: {
    es: "home",
    en: "inicio",
  },
  projects: {
    es: "proyectos",
    en: "projects",
  },
  contact: {
    es: "contacto",
    en: "contact",
  }
});

export const PAGES = {
  [Copy.KEY.home]: {
    section: newsSection,
  },
  [Copy.KEY.bio]: {
    section: {
      style: STYLE.PAGE,
      lineHeight: "1.5em",
      content: {
        p: Copy.pick({
          es: `Lenin Comprés (también conocido como Prof. Lenino) es un profesional en medios interactivos, ciencias de la educación y artes escénicas. Se desempeña como profesor y tecnólogo creativo en la <a href="https://itp.nyu.edu/itp/people/?tab=staff"> Escuela de Artes TISCH de la Universidad de Nueva York</a> y es graduado de Teachers College de la Universidad de Columbia. Lenin es coautor del guion galardonado de <a href="https://www.imdb.com/title/tt7552938/">Mis 500 locos</a>, que representó a la República Dominicana en los Óscares de 2021. También es el creador de <a href="http://jackrabbits.lenino.net">Lenino’s JACK RABBITS</a>, el primer juego de mesa original escrito por un dominicano, que cuenta con un manual de instrucciones completamente en verso y rima. Como artista, se presenta bajo su seudónimo Lenino como un cuentacuentos musicómico.`,
          en: `Lenin Comprés (also known as Prof. Lenino) is a professional in interactive media, educational sciences, and performing arts. He serves as a professor and creative technologist at <a href="https://itp.nyu.edu/itp/people/?tab=staff">New York University's TISCH School of the Arts</a>  and holds a degree from Columbia University's Teachers College. Lenin is the co-writer of the award-winning script for <a href="https://www.imdb.com/title/tt7552938/">A State of Madness</a>, which represented the Dominican Republic at the 2021 Oscars. He is also the creator of <a href="http://jackrabbits.lenino.net">Lenino’s JACK RABBITS</a>, the first original Dominican-authored board game featuring an instructional booklet written entirely in verse and rhyme. As an artist, he performs as a quirky musical storyteller under his Lenino moniker.`
        }),
      },
      onready: slideDown,
    }
  },
  [Copy.KEY.projects]: {
    menu: {
      maxWidth: "50em",
      margin: "0 0.5em 0.5em",
      justifyContent: "center",
      display: "flex",
      flexWrap: "wrap",
      content: allTags.bind(val => {
        showTag();
        return {
          a: [NONE, ...val].map(tag => ({
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
        text: activeTag.bind(val => val !== NONE ? projects.filter(p => p.tags.includes(val)).length : projects.length),
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
        display: activeTag.bind(val => val === NONE || project.tags.includes(val) ? "block" : "none"),
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
            text: project.title,
          },
          p: project.desc,
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
                activeTag.value = activeTag.value === tag ? NONE : tag;
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
  },
  [Copy.KEY.contact]: {
    menu: {
      fontSize: "3.43em",
      marginTop: "1em",
      textAlign: "center",
      a: SOCIAL_LINKS.map(a => Object.assign({
        margin: "0.25em",
        onready: slideDown
      }, a))
    }
  },
}

export default PAGES;
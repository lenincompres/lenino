import allProjects from "./projects.js"
import * as STYLE from "./style.js";
import SOCIAL_LINKS from "./social.js";
import Copy from "./Copy.js";
import CardScroll from "./CardScroll.js";
import news from "./news.js";
import Pager from "./Pager.js";

const projects = allProjects.filter(p => !p.hidden);
const NONE = "∅";
const _activeProject = new Binder();
const _allTags = new Binder([]);
const _activeTag = new Binder(NONE);
Pager._key.onChange(val => _activeTag.value = NONE);

const showTag = (tag = NONE) => _activeTag.value = tag;
const addTag = (tag) => !_allTags.value.includes(tag) ? (_allTags.value = [..._allTags.value, tag].sort(sortWords)) : null;
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

let newsScroll = new CardScroll(news);
newsScroll.start();
window.addEventListener('hashchange', () => {
  newsScroll.clear();
  newsScroll.start()
});

Pager.add({
  [Copy.KEY.home]: {
    section: newsScroll,
  },
  [Copy.KEY.bio]: {
    section: {
      style: STYLE.PAGE,
      model: STYLE.SLIDE(0, "left"),
      lineHeight: "1.5em",
      content: {
        p: Copy.text({
          es: `Lenin Comprés (también conocido como Prof. Lenino) es un profesional en medios interactivos, ciencias de la educación y artes escénicas. Se desempeña como profesor y tecnólogo creativo en la <a href="https://itp.nyu.edu/itp/people/?tab=staff"> Escuela de Artes TISCH de la Universidad de Nueva York</a> y es graduado de Teachers College de la Universidad de Columbia. Lenin es coautor del guion galardonado de <a href="https://www.imdb.com/title/tt7552938/">Mis 500 locos</a>, que representó a la República Dominicana en los Óscares de 2021. También es el creador de <a href="http://jackrabbits.lenino.net">Lenino’s JACK RABBITS</a>, el primer juego de mesa original escrito por un dominicano, que cuenta con un manual de instrucciones completamente en verso y rima. Como artista, se presenta bajo su seudónimo Lenino como un cuentacuentos musicómico.`,
          en: `Lenin Comprés (also known as Prof. Lenino) is a professional in interactive media, educational sciences, and performing arts. He serves as a professor and creative technologist at <a href="https://itp.nyu.edu/itp/people/?tab=staff">New York University's TISCH School of the Arts</a>  and holds a degree from Columbia University's Teachers College. Lenin is the co-writer of the award-winning script for <a href="https://www.imdb.com/title/tt7552938/">A State of Madness</a>, which represented the Dominican Republic at the 2021 Oscars. He is also the creator of <a href="http://jackrabbits.lenino.net">Lenino’s JACK RABBITS</a>, the first original Dominican-authored board game featuring an instructional booklet written entirely in verse and rhyme. As an artist, he performs as a quirky musical storyteller under his Lenino moniker.`
        }),
      },
    }
  },
  [Copy.KEY.projects]: {
    menu: {
      display: "flex",
      ul: _allTags.as(val => ({
        maxWidth: "50em",
        margin: "0 0.5em 0.5em",
        justifyContent: "center",
        display: "flex",
        flexWrap: "wrap",
        li: [
          [NONE, ...val].map((tag, i) => ({
            a: {
              model: STYLE.SLIDE("left", i),
              backgroundColor: _activeTag.as({
                [tag]: STYLE.COLOR.LINK_DARK,
                default: STYLE.COLOR.PALE
              }),
              color: _activeTag.as(val => val === tag ? STYLE.COLOR.PAGE : STYLE.COLOR.LINK),
              boxShadow: STYLE.SHADOW.NORMAL,
              borderRadius: "0.25em",
              padding: "0.2em 0.68em",
              margin: "0.3em 0.3em 0 0",
              display: "inline-block",
              text: tag,
              onclick: e => showTag(tag),
            },
          })),
          {
            color: STYLE.COLOR.PALE,
            textShadow: STYLE.SHADOW.TEXT,
            text: _activeTag.as(val => val !== NONE ? projects.filter(p => p.tags.includes(val)).length : projects.length),
          }
        ],
      })),
    },
    section: projects.map((project, i) => ({
      style: STYLE.PAGE,
      model: STYLE.SLIDE(),
      position: "relative",
      fontSize: "1em",
      width: "23em",
      cursor: "pointer",
      boxShadow: _activeProject.as(val => val === i ? STYLE.SHADOW.HIGHLIGHT : STYLE.SHADOW.NORMAL),
      display: _activeTag.as(val => val === NONE || project.tags.includes(val) ? "block" : "none"),
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
        li: project.tags.sort(sortWords).map(tag => ({
          borderRadius: "0.25em",
          padding: "0.2em 0.4em",
          marginRight: "0.2em",
          backgroundColor: STYLE.COLOR.PALE,
          color: STYLE.COLOR.LINK,
          border: "solid 1px",
          borderColor: _activeTag.as({
            [tag]: STYLE.COLOR.LINK,
            default: STYLE.COLOR.PALE,
          }),
          display: "inline-block",
          text: tag,
          click: e => {
            _activeTag.value = _activeTag.value === tag ? NONE : tag;
            e.stopPropagation();
          },
          ready: elt => addTag(tag),
        }))
      },
      mouseover: e => _activeProject.value = i,
      mouseout: e => _activeProject.value = false,
      click: e => {
        let link = project.link ? project.link : project.folder
        window.open(link, "_blank")
      },
    })),
    onready: () => {
      showTag();
      _activeTag.value = false;
    }
  },
  [Copy.KEY.contact]: {
    menu: {
      fontSize: "3.43em",
      marginTop: "1em",
      textAlign: "center",
      a: SOCIAL_LINKS.map(a => Object.assign({
        model: STYLE.SLIDE(),
        margin: "0.25em",
      }, a))
    }
  },
});
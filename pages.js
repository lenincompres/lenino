import slideDown from './animations/slideDown.js'
import allProjects from './projects.js'
import * as STYLE from './style.js';
import SOCIAL_LINKS from './widgets/social.js'

const projects = allProjects.filter(p => !p.hidden);
const activeProject = new Binder();
const allTags = new Binder([]);
const ALL = 'all';
const activeTag = new Binder(ALL);
const showTag = (tag = ALL) => activeTag.value = activeTag.value === tag ? ALL : tag;
const sortWords = (a, b) => a < b ? -1 : 1;

export const PAGES = {
  HOME: {},

  BIO: {
    section: {
      style: STYLE.PAGE,
      content: [{
          p: 'Lenino is a creative storyteller—the affectionate alter-ego of Lenin Compres—an explorer of sience, technology and arts who was born in the Caribbean and has lived in New York City all his "adult" life. His studies range from telecommunication engineering and interactive media to cognitive studies in education. His trainings range from acting and scriptwriting to modern dance and vocals. He is a self-taught piano player and a self-professed nerd—a post-modern renaissance man.'
        },
        {
          backgroundColor: 'white',
          p: 'Lenino es un cuenta-cuentos creativo (el alter-ego afectivo de Lenin Comprés), un explorador de la ciencia, la tecnología y el arte nacido en la República Dominicana y residente en Nueva York toda su vida "adulta". Sus estudios van desde ingeniería en medios interactivos hasta las ciencias del aprendizaje. Sus entrenamientos abarcan la actuación, dramaturgia, danza contemporanea y canto. Es un pianista autodidacta y un nerdo profeso (un renacentista post-moderno).'
        }
      ],
      onready: slideDown
    }
  },

  PROJECTS: {
    menu: {
      maxWidth: '50em',
      margin: '0 0.5em 0.5em',
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
            borderRadius: '0.25em',
            padding: '0.2em 0.68em',
            margin: '0.3em 0.3em 0 0',
            display: 'inline-block',
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
        fontSize: '1em',
        width: '23em',
        cursor: 'pointer',
        boxShadow: DOM.bind(activeProject, val => val === i ? STYLE.SHADOW.HIGHLIGHT : STYLE.SHADOW.NORMAL),
        display: activeTag.bind(val => val === ALL || project.tags.includes(val) ? 'block' : 'none'),
        main: {
          minHeight: '6.5em',
          div: {
            float: 'left',
            height: '6em',
            width: '6em',
            marginRight: '0.6em',
            backgroundImage: `url(${project.img ? project.img : 'projects/' + project.folder + '/thumbnail.jpg'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          },
          h6: {
            marginBottom: '0.25em',
            fontWeight: 'bold',
            text: project.title
          },
          p: project.desc,
        },
        ul: {
          marginTop: '0.2em',
          li: project.tags.sort(sortWords).map(tag => {
            if (!allTags.value.includes(tag)) allTags.value = [...allTags.value, tag].sort(sortWords);
            return {
              borderRadius: '0.25em',
              padding: '0.2em 0.4em',
              marginRight: '0.2em',
              backgroundColor: STYLE.COLOR.PALE,
              color: STYLE.COLOR.LINK,
              border: 'solid 1px',
              borderColor: activeTag.bind({
                [tag]: STYLE.COLOR.LINK,
                default: STYLE.COLOR.PALE,
              }),
              display: 'inline-block',
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
          let link = project.link ? project.link : 'projects/' + project.folder
          window.open(link, '_blank')
        },
        onready: slideDown
      }
    }),
    onready: () => {
      showTag();
      activeTag.value = false;
    }
  },

  CONTACT: {
    menu: {
      fontSize: '3.43em',
      marginTop: '1em',
      textAlign: 'center',
      a: SOCIAL_LINKS.map(a => Object.assign({
        margin: '0.25em',
        onready: slideDown
      }, a))
    }
  }

}

export default PAGES;
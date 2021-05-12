import slideDown from './animations/slideDown.js'
import projects from './projects.js'
import * as STYLE from './style.js';
import SOCIAL_LINKS from './widgets/social.js'

const activeProject = new Binder();

export const PAGES = {
  HOME: {},

  BIO: {
    section: [
      'Lenino is a creative storyteller—the affectionate alter-ego of Lenin Compres—an explorer of sience, technology and arts who was born in the Caribbean and has lived in New York City all his "adult" life. His studies range from telecommunication engineering and interactive media to cognitive studies in education. His trainings range from acting and scriptwriting to modern dance and vocals. He is a self-taught piano player and a self-professed nerd—a post-modern renaissance man.',
      'Lenino es un cuenta-cuentos creativo (el alter-ego afectivo de Lenin Comprés), un explorador de la ciencia, la tecnología y el arte nacido en la República Dominicana y residente en Nueva York toda su vida "adulta". Sus estudios van desde ingeniería en medios interactivos hasta las ciencias del aprendizaje. Sus entrenamientos abarcan la actuación, dramaturgia, danza contemporanea y canto. Es un pianista autodidacta y un nerdo profeso (un renacentista post-moderno).'
    ].map((p, i) => new Object({
      style: STYLE.PAGE,
      backgroundColor: i % 2 ? 'white' : undefined,
      p: p,
      onready: slideDown
    }))
  },

  PROJECTS: {
    section: projects.filter(p => !p.hidden).map((project, i) => new Object({
      style: STYLE.PAGE,
      fontSize: '1em',
      width: window.innerWidth > 850 ? 'calc(50% - 1em)' : undefined,
      cursor: 'pointer',
      boxShadow: DOM.bind(activeProject, val => val === i ? STYLE.SHADOW.HIGHLIGHT : STYLE.SHADOW.NORMAL),
      img: {
        float: 'left',
        height: '6em',
        marginRight: '0.86em',
        src: project.img
      },
      h6: {
        marginBottom: '0.25em',
        text: project.title
      },
      p: project.desc,
      onmouseover: e => activeProject.value = i,
      onmouseout: e => activeProject.value = false,
      onclick: e => window.open(project.link, '_blank'),
      onready: slideDown
    }))
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
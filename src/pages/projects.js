import Copy from "../Copy.js";
import * as STYLE from "../style.js";
import allProjects from "../projects.js";
import Pager from "../Pager.js";

const projects = allProjects.filter(p => !p.hidden);
const NONE = "∅";
const _activeProject = new Binder();
const _allTags = new Binder([]);
const _activeTag = new Binder(NONE);
Pager._key.onChange(val => _activeTag.value = NONE);

const showTag = (tag = NONE) => _activeTag.value = tag;
const addTag = (tag) => !_allTags.value.includes(tag) ? (_allTags.value = [..._allTags.value, tag].sort(sortWords)) : null;
const sortWords = (a, b) => a < b ? -1 : 1;

const projectsPage = {
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
    model: STYLE.SLIDE(i),
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
};

export default projectsPage;
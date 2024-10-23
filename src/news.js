import Copy from "./Copy.js";
import {
  COLOR
} from "./style.js";

const _SELECTED_NEWS = new Binder(-1);

const news = [{
  title: Copy.pick({
    es: "¡Noticias!",
    en: "News!",
  }),
  img: "assets/poster.jpg",
  desc: Copy.pick({
    es: 'Es Octubre y Lenino sale de su madriguera a cantarle cuentos a las brujas, ogros, duendes y hadas que se manifiesten la noche del 3 de Noviembre en ',
    en: `It is October and Lenino comes out of his burrow to sing stories to the witches, ogres, goblins and fairies that appear on the night of November 3 at `,
  }),
  link: {
    target: "_blank",
    href: "https://www.google.com/maps/place/Ca%C3%B1ave/@40.8644495,-73.9289111,15z/data=!4m6!3m5!1s0x89c2f559184229cb:0x994c7ec6855fdb5!8m2!3d40.8644495!4d-73.9289111!16s%2Fg%2F11g0hldvl4?entry=ttu&g_ep=EgoyMDI0MTAyMC4xIKXMDSoASAFQAw%3D%3D",
    text: "Cañave",
  },
}];

const newsSection = DOM.element({
  margin: "6em auto",
  position: "relative",
  width: "20em",
  section: news.map((n, i) => ({
    position: 'absolute',
    width: "20em",
    left: _SELECTED_NEWS.as(val => val === i ? 0 : val > i ? '-20em' : '20em'),
    right: 0,
    backgroundColor: "white",
    borderRadius: "1.5em",
    boxShadow: "1px 1px 3px black",
    padding: "1em",
    transform: _SELECTED_NEWS.as(val => val === i ? `rotate(${-5+i}deg)` : val > i ? "rotate(-45deg)" : "rotate(40deg)"),
    transition: "1000ms",
    opacity: _SELECTED_NEWS.as(val => val === i ? 1 : 0),
    h2: {
      textAlign: "center",
      text: n.title,
    },
    img: {
      width: "100%",
      src: n.img,
    },
    p: {
      text: n.desc,
      a: n.link,
      span: '.',
    },
    onready: me => setTimeout(() => i === 0 ? _SELECTED_NEWS.value = i : null, 1000),
  })),
  a: {
    hover: {
      backgroundColor: COLOR.LINK + "! important",
      color: "white",
    },
    backgroundColor: "white",
    padding: "1em",
    borderRadius: "1.5em",
    lineHeight: "1em",
    width: "3em",
    textAlign: "center",
    boxShadow: "1px 1px 3px black",
    position: "absolute",
    top: "10em",
    content: [{
      left: "-4em",
      text: "◀",
      display: _SELECTED_NEWS.as(val => val > 0 ? "block" : "none"),
      click: () => _SELECTED_NEWS.value = _SELECTED_NEWS.value - 1,
    }, {
      text: "▶",
      right: "-4em",
      display: _SELECTED_NEWS.as(val => news.length > 1 && val < news.length - 1 ? "block" : "none"),
      click: () => _SELECTED_NEWS.value = _SELECTED_NEWS.value + 1,
    }],
  }
}, 'aside');

export default newsSection;
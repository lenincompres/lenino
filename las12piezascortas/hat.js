import Copy from "../lib/Copy.js";

// Save current body content to restore later
const bodyHTML = document.body.innerHTML;

// Determine current page from URL
const pageName = window.location.pathname.split("/").pop().split(".").shift();


const pages = {
  "Prólogo": "prologo",
  "Introducción": "introduccion",
  "Pajarito volando": "pajarito",
  "Mantequilla y mermelada": "mantequilla",
  "La zorra boba": "zorra",
  "Suerte a medias": "suerte",
  "Historia de amor de un tal sobre la queseyó de nosedonde": "historia",
  "¿Cuál es el coro?": "coro",
  "Hay locos": "locos",
  "Cuestión y tiempo": "cuestion",
  "Dibujo de un sueño": "dibujo",
  "Tras unas tetas, greñas y tacones": "tetas",
  "Estratagemas y escaramuzas de Patricio Mella": "patricio",
  "Desayuno en rojo chino": "desayuno"
};

// List of all page names for the menu
const pageNames = [Object.keys(pages)[0], ...Object.keys(pages).slice(1)];

const _showNav = new Binder(false);


DOM.set({
  link: "style.css",
  script: "https://cdn.jsdelivr.net/npm/marked/marked.min.js",
  content: "",
  header: {
    h1: {
      a: {
        href: "./",
        text: "Las 12 piezas cortas - ",
        small: "Lenin A. Comprés",
      },
      b_nav: {
        cursor: "pointer",
        hover: { backgroundColor: "#fff3" },
        text: _showNav.as("☰", "×"),
        position: "absolute",
        top: 0,
        right: 0,
        padding: "0.5em 1em",
        width: "3em",
        height: "3em",
        textAlign: "center",
      },
        onclick: () => _showNav.value = !_showNav.value,
    },
    nav: {
      display: _showNav.as("none ", "block"),
      content: DOM.linkMenu(pageNames.map(key => ({
        alt: key,
        href: `${pages[key]}.html`,
        html: key,
      }))),
    }
  },
  main: {
    article: {
      id: "content",
      backgroundColor: `var(--${pageName})`,
    },
  },
  footer: {
    section_verse: {
      p: Copy.at.subscribe,
    },
    menu_bulletMenu: DOM.linkMenu({
      class: ["button", "buy"],
      marginTop: "-1em",
      href: "https://www.etsy.com/listing/1724318334/leninos-jack-rabbits",
      target: "_blank",
      text: Copy.at.buy,
    }, {
      href: "http://instagram.com/lenino.jackrabbits",
      target: "_blank",
      text: "Instagram",
    }, {
      class: "button",
      marginTop: "-1em",
      href: `https://${Copy.lang === Copy.LANG.es.code ? 'terrafirma' : 'www'}.yonderlands.net`,
      target: "_blank",
      text: Copy.at.novel,
    }),
    section: {
      marginTop: "1em",
      markdown: Copy.text({
        es: "Creado por [Lenin Comprés](https://lenino.net) usando [DOM.js](https://github.com/lenincompres/DOM.js/blob/main/README.md).",
        en: "Created by [Lenin Comprés](https://lenino.net) using [DOM.js](https://github.com/lenincompres/DOM.js/blob/main/README.md).",
      }),
    },
  },
});

// Restore original body content
content.let("content", bodyHTML);
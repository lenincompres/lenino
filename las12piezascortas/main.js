const COLOR = {
  LINK: 'rgb(0, 102, 102)',
  HL: 'rgb(0, 180, 180)',
  BG: 'rgb(68, 85, 51)',
  PAGE: '#F5DC9A'
}

DOM.style({
  a:{
    color: COLOR.LINK,
    hover: {
      color: COLOR.HL
    }
  }
})

DOM.set({
  title: 'Lenino - Las 12 Piezas Cortas',
  charset: 'UTF-8',
  icon: '../../assets/icon.png',
  image: 'thumbnail.jpg',
  meta: {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0"
  },
  menu: {
    css: {
      backgroundColor: COLOR.PAGE,
      position: 'fixed',
      top: '4em',
      left: '-15.5em',
      padding: '0.5em 1em',
      transition: '0.5s',
      width: '15em',
      zIndex: 1,
      boxShadow: '1px 1px 2px black',
      hover: {
        left: 0,
      },
      before: {
        content: '"Índice"',
        position: 'absolute',
        backgroundColor: COLOR.LINK,
        color: 'white',
        padding: '0.5em 1em 0.5em 1.5em',
        top: 0,
        display: 'block',
        borderTopRightRadius: '1em',
        left: '12em',
        borderBottomRightRadius: '1em',
        boxShadow: '1px 1px 2px black',
        fontSize: '1.25em',
      },
      a: {
        display: 'block',
        margin: '0.5em',
        lastChild: {
          bottom: 0,
          backgroundColor: COLOR.LINK,
          color: 'white',
          padding: '0.5em 1em',
          textAlign: 'center',
        }
      }
    },
    a: {
      id: 'links',
      onclick: e => loadPage(e.target.getAttribute('href').split('#')[1]),
      content: [{
          text: 'Prólogo',
          href: "#4"
        },
        {
          text: 'Pajarito volando',
          href: "#8"
        },
        {
          text: 'Mantequilla y mermelada',
          href: "#19"
        },
        {
          text: 'La zorra boba',
          href: "#32"
        },
        {
          text: 'Suerte a medias',
          href: "#37"
        },
        {
          text: 'Historia de amor de un tal sobre la queseyó de nosedonde',
          href: "#47"
        },
        {
          text: '¿Cuál es el coro?',
          href: "#51"
        },
        {
          text: 'Hay locos',
          href: "#58"
        },
        {
          text: 'Cuestión y tiempo',
          href: "#67"
        },
        {
          text: 'Dibujo de un sueño',
          href: "#82"
        },
        {
          text: 'Tras unas tetas, greñas y tacones',
          href: "#86"
        },
        {
          text: 'Estratagemas y escaramuzas de Patricio Mella',
          href: "#90"
        },
        {
          text: 'Desayuno en rojo chino',
          href: "#94"
        },
        {
          text: 'Get it on Amazon',
          href: "https://www.amazon.com/Las-12-Piezas-Cortas-Compres/dp/1517611024/",
          target: "_blank"
        }
      ]
    }
  },
  iframe: {
    id: 'iframe',
    position: 'fixed',
    height: '100vh',
    width: '100vw',
    zIndex: 0,
    src: "las12piezascortas.pdf"
  },
  footer: {
    position: 'fixed',
    width: '100vw',
    zIndex: 2,
    backgroundColor: COLOR.PAGE,
    bottom: 0,
    textAlign: 'center',
    width: '30em',
    left: 'calc(50vw - 15em)',
    padding: '0.5em 2em',
    boxShadow: '1px 1px 2px black',
    html: 'Copyright © 2014, <a href="http://lenino.net">Lenino A. Comprés</a>. All rights reserved.'
  }
});

var pdf = iframe.get('src');

function loadPage(pageId) {
  if (!pageId) return;
  iframe.set(`${pdf}#page=${pageId}`, 'src');
  iframe.contentWindow.location.reload();
}

loadPage(window.location.hash);
'use strict';

var socialLinks = [{
  _href: 'http://www.facebook.com/leninomusic',
  _class: 'fa fa-facebook'
}, {
  _href: 'http://www.twitter.com/lenino',
  _class: 'fa fa-twitter'
}, {
  _href: 'http://www.instagram.com/lenino',
  _class: 'fa fa-instagram'
}, {
  _href: 'https://www.youtube.com/watch?v=Fr4daDGACKs&list=PLGFDuSemQn5uWrifLAq-dDqeYcN0HY3e0',
  _class: 'fa fa-youtube'
}];

createDOM({
  main: {
    header: {
      a_homeLink: {
        _href: '#home',
        onclick: () => loadPage('#home'),
        img__logo: {
          _src: 'lenino/images/icon.png',
          _height: 30
        }
      },
      h1: 'Lenino',
      div_tagline: '**El Cantacuentos** musician · storyteller · inventor · educator',
      menu_topLinks: {
        a: socialLinks
      }
    },
    nav__slide: {
      a: ['Home', 'Bio', ' Projects', 'Contact']
    },
    section: {
      article: [{
        _id: 'home',
        a_feature: {
          _target: ' _blank',
          _href: 'https://itp.nyu.edu/shows/spring2020',
          img: {
            _src: 'lenino/images/springshowcase.jpg',
          },
          span: "Interactive Media Arts - NYU TISCH</br>Check out our student's projects. I built the site!"
        }
      }, {
        _id: 'bio',
        div: [{
            _class: 'info slide',
            p: 'Lenino is a musical storyteller, the affectionate alter-ego of Lenin Compres, an artist inventor, an explorer of sience, education and technology who was born in the Caribbean and has lived in New York City all his "adult" life. His studies range from telecommunication engineering and web development to cognitive studies and education. His trainings range from acting and scriptwriting to modern dance and vocals. He is a self-taught piano player and a self-professed nerd. He is a jack of all trades, a post-modern renaissance man.'
          },
          {
            _class: 'info slide',
            p: 'Lenino es un canta-cuentos, el alter-ego afectivo de Lenin Comprés, un artista inventor, un explorador de la ciencia, educación y tecnología nacido en la República Dominicana y residente en Nueva York toda su vida "adulta". Sus estudios van desde ingeniería en telecomunicaciones hasta ciencias del aprendizaje. Sus entrenamientos abarcan la actuación, dramaturgia, danza contemporanea y canto. Es un pianista autodidacta y un nerdo profeso. Es un renacentista post-moderno.'
          }
        ]
      }]
    },
    div__instagram: {
      a: {
        _href: 'http://instagram.com/lenino',
        _target: '_blank',
        img: {
          _src: 'lenino/images/instagram_logo.png'
        },
        script: {
          _src: 'https://cdn.lightwidget.com/widgets/lightwidget.js'
        }
      }
    }
  },
  aside: {
    div: [{
        a: {
          _href: 'http://jackrabbits.lenino.net',
          _target: '_blank',
          img: {
            _src: 'jackrabbits/images/splash.png',
            _width: '100%'
          }
        },
      },
      /*{
           _id: 'musicplayer',
           iframe: {
             _width: '100%',
             _scrolling: 'auto',
             _frameborder: 'no',
             _src: 'http://lenino.net/album/'
           }
         }, */
      {
        _id: 'twitter',
        a__twitterTimeline: '[Tweets by lenino](https://twitter.com/lenino)!',
        script: {
          _charset: 'utf-8',
          _src: '//platform.twitter.com/widgets.js'
        }
      }
    ]
  }
}, 'div#container');

/*

var selected;
var links = [...document.querySelectorAll('.link')];
links.forEach(link => link.onclick = () => loadPage(link.getAttribute('href')));
//loadPage(window.location.hash ? window.location.hash : '#home');
function loadPage(pageId) {
	links.forEach(link => link.classList.toggle('active', pageId === link.getAttribute('href')));
	var page = document.getElementById(pageId.split('#')[1]);
	if (selected === page) return;
	try {
		selected.style.display = 'none';
	} catch (e) {}
	try {
		page.style.display = 'block';
		setTimeout(function () {
			//window.location.hash = pageId;
			window.scrollTo(0, 0);
		}, 100);
	} catch (e) {}
	selected = page;
}

document.querySelector(".info").append('<a href="#" onclick="javascript:loadPage()" class="close">&#10005;</a>');
document.querySelector("#musicplayer iframe").setAttribute('src', 'http://lenino.net/album/#' + Math.floor(Math.random() * 12));
*/
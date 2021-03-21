'use strict';

var selected;
var links = [...document.querySelectorAll('.link')];
links.forEach(link => link.onclick = () => loadPage(link.getAttribute('href')));

loadPage(window.location.hash ? window.location.hash : '#home');
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
			window.location.hash = pageId;
			window.scrollTo(0, 0);
		}, 100);
	} catch (e) {}
	selected = page;
}

document.querySelector(".info").append('<a href="#" onclick="javascript:loadPage()" class="close">&#10005;</a>');

document.querySelector("#musicplayer iframe").setAttribute('src', 'http://lenino.net/album/#' + Math.floor(Math.random() * 12));

loadJSON('lenino/json/projects.json', null, projects => {
	console.log(projects);
	projects.forEach((project, i) => createDOM({
		_class: ['grid', 'info', 'slide'],
		_style: `-webkit-animation-delay:0.${i}s; animation-delay:0.${i}s;`,
		onclick: e => window.open(project.link, '_blank'),
		img: {
			_src: project.img
		},
		strong: project.title,
		br: '',
		span: project.desc
	}, 'div', document.getElementById('projects')));
});
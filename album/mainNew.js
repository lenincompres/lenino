// JavaScript Document

var chords;

var chordi = 0;

var mobile = $(window).width() <= 600;



var body = document.getElementsByTagName('body');

var menu = document.getElementsByTagName('menu');

var menuLinks = [...document.querySelectorAll('menu li')];

var songs = [...document.querySelectorAll('article')].map(elem => {

  return {

    elem: elem,

    title: elem.querySelector('h1'),

    chords:  [...elem.querySelectorAll('b')],

  }

});



setIndex();

setSongLinks();

body.style.backgroundPositionX = parseInt(Math.random() * 10000) + 'px';

if (mobile) menuLinks[0].click();

var anchor = window.location.hash.substring(1);

if (anchor) setTimeout(_ => menuLinks[anchor].click(), 500);

//popup('<b>Welcome to Lenino\'s debut album portal.</b></p><img onclick='closeModal()' class='card' src='duality.jpg' /><p><b>Illusions of Duality</b>: a storyteller\'s journey through conflict and empathy.</small>');

setFooter();



var footer = document.getElementsByTagName('footer');

var footerH = footer.height();

var btmScroll = body.height() - footerH - window.height();

window.onscroll = _ => footer.classList.toggle('fixed', window.scrollTop() <= btmScroll);



function setFooter() {

  footer.classList.add('fixed');

  btmScroll = body.height() - footerH - window.height();

  window.onscroll();

}



var indexes = [0, 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];



function setIndex() {

  menu.innerHTML = '<ul>';

  body.setAttribute('id', '0');

  songs.forEach((song, i) => {

    var index = i+1;

    var bonus = song.classList.contains('bonus') ? ' class='bonus' ' : '';

    menu.innerHTML += `<li anchor="${index}" ${bonus}><b class="card-bullet">${indexes[index]}</b><a>${song.title.innerText}</a></li>`;

    song.setAttribute('id', index);

  });

  menu.innerHTML += '</ul>';

  //links actions

  var isFixed = menu.style.position === 'fixed';

  //if (isFixed) $('main').css('margin-top', index.outerHeight() + 'px');

  menuLinks.forEach(link => link.onclick => _ => gotoSong()); 

  [...document.querySelectorAll('#top_link')]

  $('menu li, #top_link').click(function () {

    var id = $(this).attr('anchor');

    $('.selected').removeClass('selected');

    $('#' + id).addClass('selected');

    $(this).addClass('selected');

    if (mobile || isFixed) {

      $('html').scrollTop(0);

    } else {

      var y = $('#' + id).offset().top - (isFixed ? index.outerHeight() : 0);

      $('html').animate({

        'scrollTop': y

      }, 1000);

    }

    if (!mobile) location.hash = id > 0 ? ('#' + id) : '';

    setFooter();

  });

}



var audio = new Audio();



function setSongLinks() {

  //setup audio

  audio.loop = false;

  audio.autoplay = false;

  audio.onerror = stopAudio;

  //links

  $('article h1').each(function (index, element) {

    var a = new Audio();

    var t = $(this);

    var id = parseInt(t.parent().attr('id'));

    t.before('<i class='index'>' + indexes[id] + '</i>').after('<b class='play'></b><div class='progress'><hr><div>');

    if (t.attr('bc')) {

      t.before('<a class='purchase' target='_black' href='https://lenino.bandcamp.com/track/' + t.attr('bc') + ''>Buy it ♥</a>');

    }

  });

  $('article b.play').click(function () {

    var p = $(this).parent();

    var t = p.find('h1');

    if (p.hasClass('playing')) {

      stopAudio();

    } else {

      var url = 'https://soundcloud.com/leninomusic/' + t.attr('sc');

      if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {

        popup('This site does not support iOS. Please visit the album on SoundCloud.</br><big><big><a href='https://soundcloud.com/leninomusic/sets/illusions-of-duality' target='_blank' class='fa fa-soundcloud'></a></big></big>');

      } else {

        //soundcloud play

        mayAnimate = false;

        SCwidget.load(url, scSettings);

        scPlayer.css({

          top: p.position().top + 'px'

        });

        scPlayer.removeClass('hidden'); // to see the player immediately after clicking to play

        p.addClass('sc');

        p.find('.play').addClass('rotate');

        var i = parseInt(p.attr('id')) - 1;

        if (!mobile) location.hash = '#' + (i + 1);

        $('.playing').removeClass('playing');

        p.addClass('playing');

        $('menu li').eq(i).addClass('playing');

      }

    }

  });

}

$('article h1').click(function () {

  $(this).parent().find('b.play').click();

});



function stopAudio() {

  $('.playing').removeClass('playing');

  $('.rotate').removeClass('rotate');

  audio.removeEventListener('ended', playNext);

  audio.pause();

  $('article hr').removeAttr('style');



  //soundcloud

  scPlayer.addClass('hidden');

  SCwidget.pause();

}



function playAudio(file) {

  stopAudio();

  audio.src = file;

  audio.addEventListener('ended', playNext);

  audio.addEventListener('timeupdate', progressBar, true);

  audio.play();

}



function progressBar(e) {

  var p = 100 * audio.currentTime / audio.duration;

  $('article.playing hr').width(p + '%');

}



function playNext(e) {

  var i = parseInt($('article.playing').attr('id'));

  stopAudio();

  var link = $('menu li').eq(i);

  var btn = $('article b.play').eq(i);

  var article = btn.parent();



  //unlock bonus

  if (article.hasClass('bonus') && !article.hasClass('unlocked')) {

    modalMessage.innerHTML = '<p><b>Congratulations!!! You have unlocked a bonus track.</b></p><p>And joy.</p><p><small>(Pun intended)</small></p></p>';

    modal.style.display = 'block';

    article.addClass('unlocked');

    link.addClass('unlocked');

  }



  link.click();

  btn.click();

};



function toggleChords() {

  if ($('body').hasClass('no-chords')) {

    $('body').removeClass('no-chords');

    $('article p').show();

  } else {

    removeEmptyLines();

  }

}



function removeEmptyLines() {

  $('body').addClass('no-chords');

  $('article').each(function () {

    var last = true;

    $(this).find('p').each(function () {

      var p = $(this);

      var t = p.html().replace(/<b(.|\n|\r)+\/b>/ig, '').replace(/&nbsp;/ig, '');

      if (!t.length) {

        if (last) {

          p.hide();

        }

        last = true;

      } else {

        last = false;

      }

    });

  });

}

removeEmptyLines();



//punt links on chords

$('article p b').click(function () {

  window.open('http://www.8notes.com/piano_chord_chart/' + $(this).text().trim() + '.asp', 'chords');

});



//animate background

$(document).ready(function () {

  $('section[data-type='background']').each(function () {

    var $bgobj = $(this); // assigning the object

    $(window).scroll(function () {

      var yPos = -($window.scrollTop() / $bgobj.data('speed'));

      // Put together our final background position

      var coords = '50% ' + yPos + 'px';

      // Move the background

      $bgobj.css({

        backgroundPosition: coords

      });

    });

  });

});

var mayAnimate = true;

window.onblur = function () {

  mayAnimate = false;

}

window.onfocus = function () {

  mayAnimate = true;

}



//rotate





function shiftBG(nx, ny, d) {

  if (!mayAnimate) return;

  nx = nx ? nx : 2000;

  ny = ny ? ny : 2000;

  d = d ? d : 15000;

  var rx = parseInt($('body').css('background-position-x').replace(/\D/g, '')) + parseInt(Math.random() * nx - .5 * nx);

  var ry = parseInt($('body').css('background-position-y').replace(/\D/g, '')) + parseInt(Math.random() * ny - .5 * ny);

  if (mobile) return;

  else $('body').animate({

    'background-position-x': rx,

    'background-position-y': ry

  }, d);

}



if (!mobile) {

  shiftBG();

  setInterval(shiftBG, 20000);

}



// Get the modal

var modal = document.getElementById('myModal');

var modalMessage = document.getElementById('modalMessage');

var span = document.getElementsByClassName('close')[0];

span.onclick = function () {

  closeModal();

}

window.onclick = function (event) {

  if (event.target == modal) {

    closeModal();

  }

}



function closeModal() {

  modal.style.display = 'none';

}



function popup(m) {

  modalMessage.innerHTML = '<p>' + m + '</p>';

  modal.style.display = 'block';

}



/*------ YOUTUBE -----------



var tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';

var firstScriptTag = document.getElementsByTagName('script')[0];

firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



var player;



function onYouTubeIframeAPIReady() {

  player = new YT.Player('player', {

    height: 'auto',

    width: '100%',

    videoId: 'M7lc1UVf-VE',

    events: {

      'onReady': onPlayerReady,

      'onStateChange': onPlayerStateChange

    }

  });

}

function onPlayerReady(event) {

  event.target.playVideo();

}

function onPlayerStateChange(event) {

  console.log(event);

  switch (event.data) {

    case YT.PlayerState.UNSTARTED:

      console.log('unstarted');

      break;

    case YT.PlayerState.ENDED:

      console.log('ended');

      break;

    case YT.PlayerState.PLAYING:

      console.log('playing');

      break;

    case YT.PlayerState.PAUSED:

      console.log('paused');

      break;

    case YT.PlayerState.BUFFERING:

      console.log('buffering');

      break;

    case YT.PlayerState.CUED:

      console.log('video cued');

      break;

  }

}

function stopVideo() {

  player.stopVideo();

}

*/





// SOUNDCLOUD WIDGET



//make sure the SC API is linked



//create Player

var scPlayer = $('#player');

var scSettings = {

  show_artwork: false,

  auto_play: true,

  color: 0xffffff,

  buying: true,

  sharing: true,

  download: false,

  show_playcount: false,

  show_user: false,

  start_track: 0,

  single_active: false

};

var widgetIframe = document.getElementById('player'),

  SCwidget = SC.Widget(widgetIframe);

SCwidget.bind(SC.Widget.Events.READY, function () {

  SCwidget.bind(SC.Widget.Events.LOAD_PROGRESS, function () {

    //getPosition(callback);

  });

  SCwidget.bind(SC.Widget.Events.FINISH, function () {

    playNext();

  });

  SCwidget.bind(SC.Widget.Events.PLAY_PROGRESS, function () {

    //getPosition(callback);

  });

  SCwidget.bind(SC.Widget.Events.PLAY, function () {

    //getDuration(callback);

    mayAnimate = true;

    $('.rotate').removeClass('rotate');

    scPlayer.removeClass('hidden');

  });

});
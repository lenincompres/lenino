<?php
?>

<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta property="og:image" content="http://lenino.net/images/logo.jpg" />
  <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />
  <title>Lenino</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="icon" href="images/icon.png" type="image/png">
  <link rel="stylesheet" type="text/css" href="style.css">
  <script src="http://www.google.com/jsapi" type="text/javascript"></script>
</head>

<body>
  <!--div id="fb-root"></div>
  <script>
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3&appId=6540774748";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  </script-->
  <div class="container">
    <div class="page">
      <div class="header">
        <a id="homelink" href="#home" onclick="javascript:loadPage('#home')"><img class="logo" src="images/icon.png"
            height="30" alt="" />Lenino</a>
        <div id="tagline"><b>El Cantacuentos</b></br>musician · storyteller · inventor · educator</div>
        <div id="toplinks">
          <!--div class="fb-like" data-href="http://facebook.com/leninomusic" data-layout="button_count" data-action="like"
            data-show-faces="false" data-share="false"></div-->
          <a href="http://www.facebook.com/leninomusic" class="fa fa-facebook"></a>
          <a href="http://www.twitter.com/lenino" class="fa fa-twitter"></a>
          <a href="http://www.instagram.com/lenino" class="fa fa-instagram"></a>
          <a href="https://www.youtube.com/watch?v=Fr4daDGACKs&list=PLGFDuSemQn5uWrifLAq-dDqeYcN0HY3e0"
            class="fa fa-youtube"></a>
        </div>
      </div>
      <ul class="menu slide">
        <li><a class="link" href="#home">Home</a></li>
        <li><a class="link" href="#bio">Bio</a></li>
        <!--li><a class="link" href="#music">Music</a></li-->
        <!--li><a class="link" href="#videos">Videos</a></li-->
        <!--li><a class="link" href="#merch">Merch</a></li-->
        <li><a class="link" href="#projects">Projects</a></li>
        <!--li><a class="link" href="#events">Events</a></li-->
        <li><a class="link extra" href="#contact">Contact</a></li>
      </ul>
      <div class="main">
        <div class="content" id="home">
          <a id="feature" target="_blank" href="https://itp.nyu.edu/shows/spring2020"><img src="images/springshowcase.jpg"/>Interactive Media Arts - NYU TISCH</br>Check out our student's projects.</br>I built the site!</a>
        </div>
        <div class="content slide" id="videos">
          <div class="info">
            <iframe height="315" width="100%"
              src="https://www.youtube.com/embed/videoseries?list=PLGFDuSemQn5uWrifLAq-dDqeYcN0HY3e0&showinfo=1"
              frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
        <div class="content" id="music">
          <div class="info slide">Lenino's debut album is here! <a href="/album">Click to view fullsize.</a></p>
            </p><iframe width="100%" height="550" scrolling="yes" frameborder="no" allow="autoplay"
              src="http://lenino.net/album"></iframe>
            <p>
              Find the album on
              <a href="https://open.spotify.com/album/40aYH4mpVIFKMREPSNoYIg" target="_blank">Spotify</a>,
              <a href="https://itunes.apple.com/us/album/illusions-of-duality/1442301880" target="_blank">iTunes</a>,
              <a href="https://store.cdbaby.com/cd/lenino" target="_blank">cdBaby</a>,
              <a href="https://lenino.bandcamp.com/releases" target="_blank">bandcamp</a>,
              <a href="https://soundcloud.com/leninomusic/sets/illusions-of-duality" target="_blank">soundcloud</a> and
              <a href="https://choon.co/artists/lenino/" target="_blank">Choon</a>.
            </p>
          </div>
        </div>
        <div class="content" id="bio">
          <div class="info slide">
            <p><i>Lenino is a musical storyteller, the affectionate alter-ego of Lenin Compres, an artist inventor, an
                explorer of sience, education and technology who was born in the Caribbean and has lived in New York
                City all his "adult" life. His studies range from telecommunication engineering and web development to
                cognitive studies and education. His trainings range from acting and scriptwriting to modern dance and
                vocals. He is a self-taught piano player and a self-professed nerd. He is a jack of all trades, a
                post-modern renaissance man.</i></p>
          </div>
          <div class="info slide">
            <p>Lenino es un canta-cuentos, el alter-ego afectivo de Lenin Comprés, un artista inventor, un explorador de
              la ciencia, educación y tecnología nacido en la República Dominicana y residente en Nueva York toda su
              vida "adulta". Sus estudios van desde ingeniería en telecomunicaciones hasta ciencias del aprendizaje. Sus
              entrenamientos abarcan la actuación, dramaturgia, danza contemporanea y canto. Es un pianista autodidacta
              y un nerdo profeso. Es un renacentista post-moderno.</p>
          </div>
        </div>
        <div class="content" id="merch">
          <?php
        $string = file_get_contents("json/merch.json");
        $items = json_decode($string, true);
        foreach ($items as $item){?>
          <div class="grid slide info<? if($item['link']){ ?> hot"
            onClick="window.open('<?php echo $item['link'] ?>','_blank')<? } ?>">
            <img src="<?php echo $item['img'] ?>" align="left" />
            <b><?php echo $item['title'] ?></b><br /><?php echo $item['desc'] ?></br>
            <? if($item['paypal']){ ?><br />
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
              <b><?php echo $item['price'] ?></b>
              <input type="hidden" name="cmd" value="_s-xclick">
              <input type="hidden" name="hosted_button_id" value="<?php echo $item['paypal'] ?>">
              <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynow_SM.gif" border="0"
                name="submit" alt="PayPal - The safer, easier way to pay online!" align="center">
              <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
            </form>
            <? } else if($item['link']){ ?><br /><a href="#">Visit the site</a>
            <? } ?>
          </div>
          <? } ?>
        </div>
        <div class="content" id="events">
          <div class="info">
            <?php
        $string = file_get_contents("json/events.json");
        $items = json_decode($string, true);
        foreach ($items as $item){?>
            <a class="event slide" href="<? echo $item['link'] ?>" target="_blank"
              style="background-image: url(images/events/<?php echo $item['img'] ?>)">
              <b>
                <? echo $item['date'] ?></b>
              <? echo $item['info'] ?>
            </a>
            <? } ?>
          </div>
        </div>
        <div class="content" id="contact">
          <a href="http://www.facebook.com/leninomusic" class="fa fa-facebook"></a>
          <a href="http://www.twitter.com/lenino" class="fa fa-twitter"></a>
          <a href="http://www.instagram.com/lenino" class="fa fa-instagram"></a>
          <a href="https://www.youtube.com/watch?v=Fr4daDGACKs&list=PLGFDuSemQn5uWrifLAq-dDqeYcN0HY3e0"
            class="fa fa-youtube"></a>
        </div>
        <div class="content" id="sent">
          <div class="info">
            <p>Your Message has been sent.</p>
          </div>
        </div>
        <div class="content" id="projects">
          <?php
		$string = file_get_contents("json/projects.json");
		$projects = json_decode($string, true);
    $i = 0;
		foreach ($projects as $project){?>
          <div class="grid info slide" style="
          -webkit-animation-delay: <?php echo $i ?>s;
          animation-delay:  <?php echo $i; $i+=.1; ?>s;" onClick="window.open('<?php echo $project['link'] ?>','_blank')">
            <img src="<?php echo $project['img'] ?>" align="left">
            <strong><?php echo $project['title'] ?></strong><br />
            <?php echo $project['desc'] ?>
          </div>
          <?php }?>
        </div>
      </div>
      <div class="instagram"> 
        <a href="http://instagram.com/lenino" target="_blank"><img src="images/instagram_logo.png" /></a>
        <!-- LightWidget WIDGET --><script src="https://cdn.lightwidget.com/widgets/lightwidget.js"></script><iframe src="//lightwidget.com/widgets/f00bc46ac23859a5aacb66ac5f4e54be.html" scrolling="no" allowtransparency="true" class="lightwidget-widget" style="width:100%;border:0;overflow:hidden;"></iframe>
      </div>
    </div>
    <div class="sidebar">
      <div><a target="_blank" href="http://jackrabbits.lenino.net"><img width="100%"
            src="jackrabbits/images/splash.png" /></a></div>
      <!--div> <a href="http://jackrabbits.lenino.net"><img src="jackrabbits/images/splash.png" width="100%" alt=""/></a> </div-->
      <div id="musicplayer">
        <iframe width="100%" height="100%" scrolling="auto" frameborder="no"
          src="http://lenino.net/album/?random=true?>"></iframe>
      </div>
      <div id="twitter"> <a class="twitter-timeline" href="https://twitter.com/lenino">Tweets by lenino</a>
        <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
      </div>
    </div>
    <script type="text/javascript" src="main.js"></script>
</body>

</html>
import Copy from "../../lib/Copy.js";
import {
  COLOR
} from "../settings.js";

export const aboutModel = {
  main: {
    display: "flex",
    marginTop: "1em",
    figure: {
      img: {
        src: "media/cover.png",
        maxWidth: "30em",
        minWidth: "15em",
        width: "100%",
      }
    },
    section: {
      align: "left",
      width: "26em",
      minWidth: "15em",
      height: "fit-content",
      margin: "1em 0 0 -6em",
      borderRadius: "1em",
      padding: "1em 1.5em",
      tag: "section",
      background: COLOR.LIGHT,
      h5: Copy.text({
        es: "Sinopsis",
        en: "Synopsis",
      }),
      p: Copy.text({
        es: "En uno de sus viajes por el espacio, el tiempo, los espejos y los hongos, Lenino “el Cantacuentos” conoce a una doncella desencantada cuya hermanastra cenicienta le robó al príncipe azul. Su difunto padrastro arruinó la fortuna de su madre, y un joven panadero deshonró a su hermana menor. Según el pueblo, su casa se convirtió en un hostal de brujas y reinas malvadas. Lenino llega con sus encantos caribeños a descubrir el hechizo bajo el cual se encuentra la joven.",
        en: "On one of his travels through space, time, mirrors, and mushrooms, Lenino “the Singing Storyteller” meets a disenchanted maiden whose ashy stepsister stole away her prince. Her late stepfather squandered her mother’s fortune, and a young baker brought shame upon her younger sister. According to the townsfolk, their house became a hostel for witches and evil queens. Lenino, with his Caribbean charms, arrives to uncover the spell that binds the young woman.",
      }),
    },
  },
  footer: {
    align: "left",
    maxWidth: "50em",
    margin: "1em",
    tag: "section",
    html: Copy.text({
      es: `<b>Lenin Comprés</b> (Prof. Lenino) es un artista integral, un profesional de los medios interactivos, las ciencias del aprendizaje y las artes escénicas. Es un pianista autodidacta y renacentista post-moderno. Ejerce como profesor y tecnólogo creativo en la Escuela de Artes <a href="https://itp.nyu.edu/itp/people/?tab=staff">TISCH de la Universidad de Nueva York</a> y es egresado del <a href="https://www.tc.columbia.edu/human-development/cognitive-studies-in-education/">Teacher’s College de la Universidad de Columbia</a>. Ha escrito obras premiadas en la República Dominicana como el guión de la película <a href="https://www.imdb.com/title/tt7552938/">Mis 500 locos</a>, coescrita junto a Waddys Jáquez y que representó al país en los premios Oscars del 2021. También es el creador del primer juego de mesa original de autoría dominicana, <a href="http://jackrabbits.lenino.net">Lenino’s JACK RABBITS</a>.`,
      en: `<b>Lenin Comprés</b> (Prof. Lenino) is an interdisciplinary artist—a professional in interactive media, learning sciences, and the performing arts. A self-taught pianist and postmodern renaissance man, he teaches and works as a creative technologist at <a href="https://itp.nyu.edu/itp/people/?tab=staff">NYU’s Tisch School of the Arts</a>. He holds a degree from <a href="https://www.tc.columbia.edu/human-development/cognitive-studies-in-education/">Columbia University’s Teachers College</a>.
      In the Dominican Republic, he has written award-winning works, including the screenplay for the film <a href="https://www.imdb.com/title/tt7552938/">A State of Madness</a> (co-written with Waddys Jáquez), which represented the country at the 2021 Oscars. He is also the creator of <a href="http://jackrabbits.lenino.net">Lenino’s JACK RABBITS</a>, the first original Dominican-authored board game.`,
    }),
  }
};

export default aboutModel;
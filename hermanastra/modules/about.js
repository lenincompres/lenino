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
        en: ["On one of his journeys through space, time, mirrors, and mischief, Lenino “The Singing Storyteller” meets a disenchanted maiden whose stepsister—yes, that Cinderella—stole her prince. Her late stepfather ruined the family fortune, her younger sister ran off with a baker, and now the town whispers that their once-noble house has become a haven for witches and evil queens.",
          "With Caribbean flair and a touch of theatrical magic, Lenino uncovers the spell cast upon this young woman. The Stepsister is a playful, musical retelling that flips the script on classic fairytales, exposing the truths hidden beneath glass slippers and royal weddings. It’s a tale of pride, freedom, and finding joy beyond the confines of happily-ever-after."
        ],
      }),
    },
  },
  footer: {
    align: "left",
    maxWidth: "50em",
    margin: "1em",
    tag: "section",
    p: Copy.text({
      es: `<b>Lenin Comprés</b> (Prof. Lenino) es un artista integral, un profesional de los medios interactivos, las ciencias del aprendizaje y las artes escénicas. Es un pianista autodidacta y renacentista post-moderno. Ejerce como profesor y tecnólogo creativo en la Escuela de Artes <a href="https://itp.nyu.edu/itp/people/?tab=staff">TISCH de la Universidad de Nueva York</a> y es egresado del <a href="https://www.tc.columbia.edu/human-development/cognitive-studies-in-education/">Teacher’s College de la Universidad de Columbia</a>. Ha escrito obras premiadas en la República Dominicana como el guión de la película <a href="https://www.imdb.com/title/tt7552938/">Mis 500 locos</a>, coescrita junto a Waddys Jáquez y que representó al país en los premios Oscars del 2021. También es el creador del primer juego de mesa original de autoría dominicana, <a href="http://jackrabbits.lenino.net">Lenino’s JACK RABBITS</a>.`,
      en: [
        `<b>Lenin Comprés</b> (Prof. Lenino) is a queer Latino multidisciplinary artist, creative technologist, and educator specializing in interactive media, learning sciences, and performing arts. A self-taught pianist and postmodern renaissance storyteller, Lenin serves as a professor and creative technologist at <a href="https://itp.nyu.edu/itp/people/?tab=staff">NYU Tisch School of the Arts</a>. He holds a degree from <a href="https://www.tc.columbia.edu/human-development/cognitive-studies-in-education/">Columbia University's Teachers College</a> and blends technology, theater, and narrative to inspire critical thinking and cultural reflection.`,
        `As a queer artist, Lenin’s work champions diverse voices and reimagines traditional narratives through a lens of empathy, identity, and social critique. He co-wrote the award-winning screenplay for <a href="https://www.imdb.com/title/tt7552938/">A State of Madness (Mis 500 Locos)</a>, representing the Dominican Republic at the 2021 Oscars. He is also the creator of <a href="http://jackrabbits.lenino.net">Lenino's JACK RABBITS</a>, the first original Dominican board game of its kind.`,
        `His performances combine storytelling, humor, and music to challenge conventions and celebrate the beauty of difference and the power of rethinking the stories we thought we knew.`
      ],
    }),
  }
};

export default aboutModel;
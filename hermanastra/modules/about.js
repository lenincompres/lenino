import { COLOR } from "../settings.js";

export const aboutModel = {
  main:{
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
      margin: "1em 0 0 -6em",
      borderRadius: "1em",
      padding: "1em 1.5em",
      tag: "section",
      background: COLOR.LIGHT,
      h5: "Sinopsis",
      p: "En uno de sus viajes por el espacio, el tiempo y los hongos, Lenino “El Cantacuentos” conoce a una doncella desencantada cuya hermanastra cenicienta le robó al príncipe azul. Su difunto padrastro arruinó la fortuna de su madre y un joven panadero deshonró a su hermana menor. Según el pueblo, su casa se convirtió en un hostal de brujas y reinas malvadas. Lenino llega con sus encantos caribeños a descubrir el hechizo bajo el cual se encuentra la joven.",
      height: "fit-content",
    },
  },
  footer: {
    align: "left",
    maxWidth: "50em",
    margin: "1em 0",
    tag: "section",
    html: `<b>Lenin Comprés</b> es un artista dominicano residente en Nueva York; un profesional de los medios interactivos, las ciencias del aprendizaje y las artes escénicas; un pianista autodidacta y renacentista post-moderno. Ejerce como profesor y tecnólogo creativo en la Escuela de Artes <a href="https://itp.nyu.edu/itp/people/?tab=staff">TISCH de la Universidad de Nueva York</a> y es egresado del <a href="https://www.tc.columbia.edu/human-development/cognitive-studies-in-education/">Teacher’s College de la Universidad de Columbia</a>. Ha escrito obras premiadas en la República Dominicana y escribió junto a Waddys Jáquez el guión de la película <a href="https://www.imdb.com/title/tt7552938/">Mis 500 locos</a> que representó al país en los premios Oscars del 2021. También es el creador del primer juego de mesa original de autoría dominicana, <a href="http://jackrabbits.lenino.net">Lenino’s JACK RABBITS</a>.`,
    figure: {
      margin: "0.5em 0",
      img: {
        src: "media/spread.png",
        width: "100%",
      }
    }
  }
};

export default aboutModel;
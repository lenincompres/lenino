import Copy from "../Copy.js";
import * as STYLE from "../style.js";

const bioPage = {
  section: {
    style: STYLE.PAGE,
    model: STYLE.SLIDE("left", 2),
    lineHeight: "1.5em",
    content: {
      p: Copy.text({
        es: `Lenin Comprés (también conocido como Prof. Lenino) es un profesional en medios interactivos, ciencias de la educación y artes escénicas. Se desempeña como profesor y tecnólogo creativo en la <a href="https://itp.nyu.edu/itp/people/?tab=staff"> Escuela de Artes TISCH de la Universidad de Nueva York</a> y es graduado de Teachers College de la Universidad de Columbia. Lenin es coautor del guion galardonado de <a href="https://www.imdb.com/title/tt7552938/">Mis 500 locos</a>, que representó a la República Dominicana en los Óscares de 2021. También es el creador de <a href="http://jackrabbits.lenino.net">Lenino’s JACK RABBITS</a>, el primer juego de mesa original escrito por un dominicano, que cuenta con un manual de instrucciones completamente en verso y rima. Como artista, se presenta bajo su seudónimo Lenino como un cuentacuentos musicómico.`,
        en: `Lenin Comprés (also known as Prof. Lenino) is a professional in interactive media, educational sciences, and performing arts. He serves as a professor and creative technologist at <a href="https://itp.nyu.edu/itp/people/?tab=staff">New York University's TISCH School of the Arts</a>  and holds a degree from Columbia University's Teachers College. Lenin is the co-writer of the award-winning script for <a href="https://www.imdb.com/title/tt7552938/">A State of Madness</a>, which represented the Dominican Republic at the 2021 Oscars. He is also the creator of <a href="http://jackrabbits.lenino.net">Lenino’s JACK RABBITS</a>, the first original Dominican-authored board game featuring an instructional booklet written entirely in verse and rhyme. As an artist, he performs as a quirky musical storyteller under his Lenino moniker.`
      }),
    },
  }
};

export default bioPage;
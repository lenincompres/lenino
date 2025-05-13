import Copy from "../../lib/Copy.js";
import * as STYLE from "../style.js";

const bioPage = {
  section: {
    style: STYLE.PAGE,
    padding: "2em",
    content: [{
      model: STYLE.SLIDE("left", 2),
      h2: Copy.text({
        en: "Purpose",
        es: "Propósito",
      }),
      p: Copy.text({
        en: [
          "<b>Lenino blends storytelling, play, and technology to spark learning, reflection, and wonder—across classrooms, stages, and minds. Each project invites deeper connection with the self, others, and the natural world.</b>",
          "Lenino is rooted in a deep respect for diversity in all its forms—ecological, cultural, and human—and celebrates a world of many minds, bodies, and hearts, across ethnicities, sexualities, neurotypes, abilities, and lived experiences—and even species. The tools and stories you’ll find on this portal invite everyone—whether at the margins or the center, at the top or the base—to engage, belong, and wonder."
        ],
        es: [
          "<b>Lenino entrelaza narrativa, juego y tecnología para despertar aprendizaje, reflexión y asombro en aulas, escenarios y mentes. Cada proyecto invita a una conexión más profunda con uno mismo, con los demás y con el mundo natural.</b>",
          "Lenino se basa en un profundo respeto por la diversidad en todas sus formas, ecológica, cultural y humana, para celebrar un mundo de muchas mentes, cuerpos y corazones, abarcando etnicidades, orientaciones sexuales, neurodivergencias, capacidades y experiencias vividas, e incluso especies. Las herramientas y relatos que encontrarás en este portal invitan a todas las personas (ya sea desde los márgenes o el centro, desde la cima o la base) a participar, pertenecer y maravillarse."
        ],
      }),
    }, {
      model: STYLE.SLIDE("left", 3),
      h3: "Bio",
      p: Copy.text({
        es: `<b>Lenin Comprés</b> (también conocido como <bLenino</b>) es un profesional en medios interactivos, ciencias de la educación y artes escénicas. Se desempeña como profesor y tecnólogo creativo en la <a href="https://itp.nyu.edu/itp/people/?tab=staff"> Escuela de Artes TISCH de la Universidad de Nueva York</a> y es graduado de Teachers College de la Universidad de Columbia. Lenin es coautor del guión galardonado de <a href="https://www.imdb.com/title/tt7552938/">Mis 500 locos</a>, que representó a la República Dominicana en los Óscares de 2021. También es el creador de <a href="http://jackrabbits.lenino.net">Lenino’s JACK RABBITS</a>, el primer juego de mesa original escrito por un dominicano, que cuenta con instrucciones completamente en verso y rima. Como artista, se presenta bajo su seudónimo Lenino como un cuentacuentos musicómico.`,
        en: `<b>Lenin Comprés</b> (also known as <b>Lenino</b>) is a professional in interactive media, educational sciences, and performing arts. He serves as a professor and creative technologist at <a href="https://itp.nyu.edu/itp/people/?tab=staff">New York University's TISCH School of the Arts</a>  and holds a degree from Columbia University's Teachers College. Lenin is the co-writer of the award-winning script for <a href="https://www.imdb.com/title/tt7552938/">A State of Madness</a>, which represented the Dominican Republic at the 2021 Oscars. He is also the creator of <a href="http://jackrabbits.lenino.net">Lenino’s JACK RABBITS</a>, the first original Dominican-authored board game featuring instructions written entirely in verse and rhyme. As an artist, he performs as a quirky musical storyteller under his Lenino moniker.`
      }),
    }]
  }
};

export default bioPage;
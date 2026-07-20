import Copy from "../../lib/Copy.js";

const data = [
  {
    date: new Date("2025", "10", "29"),
    place: "Teatro Don Bosco, Moca, RD.",
  },
  {
    date: new Date("2025", "10", "28"),
    place: "La 37 Por las Tablas, Santiago, RD.",
  },
  {
    date: new Date("2024", "10", "3"),
    place: "Cañave, New York, NY.",
    link: "https://www.instagram.com/canavenyc/?hl=en",
    free: true,
  },
  {
    date: new Date("2024", "09", "20"),
    place: "Blackthorn Resort, Catskill, NY.",
  },
  {
    date: new Date("2023", "07", "30"),
    place: "Gran Teatro del Cibao, Santiago, RD.",
  },
  {
    date: new Date("2023", "06", "08"),
    place: "Casa de Teatro, Santo Domingo, RD.",
  },
  {
    date: new Date("2023", "00", "20"),
    place: "Teatro Matacandelas, Medellín, Col.",
  },
];

const date = new Date();
const today  = new Date((new Date()).valueOf() - 1000*60*60*24);

function printDate(d) {
  const thisTime  = d.date.getTime();
  const monthNames = ["Ene.", "Feb.", "Mar.", "Abr.", "May.", "Jun.", "Jul.", "Ago.", "Sept.", "Oct.", "Nov.", "Dic."];
  let text = `<b>${d.date.getFullYear()}, ${monthNames[d.date.getMonth()]} ${d.date.getDate()}</b>: ${d.place}`;
  console.log(thisTime, today, d.place, `${date.getFullYear()}, ${monthNames[date.getMonth()]} ${date.getDate()}` );
  if(!d.link || thisTime < today) return text;
  return {
    a:{ 
      href: d.link,
      target: "_blank",
      span: text,
      i: {
        border: "0.5px dotted black",
        borderBottomStyle: "none",
        borderTopStyle: "none",
        boxShadow: "1px 1px 2px black",
        margin: "0.5em",
        padding: "0.2em 0.7em",
        background: "#fe6",
        text: d.free ? "Free" : "Tickets",
        ready: blinking
      },
    }
  };
};

let blinking = (elt, t = 0.3) => {
  let isOn = true;
  elt.set({
    opacity: "1",
    transition: t + "s",
  });
  setInterval(() => {
    elt.set({
      opacity: isOn ? "0.3" : "1",
    });
    isOn = !isOn;
  }, t * 1000)
};

const upcoming = data.filter(d => d.date.getTime() > today);

export const funcionesModel = {
  main: !upcoming ? undefined : {
    display: upcoming.length ? "block" : "none",
    fontSize: "1.25em",
    marginBottom: "1.5em",
    h2: Copy.text({
      es: "Próximas funciónes",
      en: "Upcoming Shows",
    }),
    p:  upcoming.map(printDate),
  },
  ul: {
    h2: Copy.text({
      es: "Funciones pasadas",
      en: "Past Shows",
    }),
    li: data.filter(d => !upcoming.includes(d)).map(printDate),
  }
};

export default funcionesModel;
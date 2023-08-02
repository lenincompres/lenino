
const data = [
  {
    date: new Date("2023", "07", "30"),
    place: "Gran Teatro del Cibao, Santiago, RD.",
    link: "https://tix.do/event/lenino-y-la-hermanastra-2/",
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
const now  = (new Date()).getTime();

function printDate(d) {
  const thisTime  = d.date.getTime();
  const monthNames = ["Ene.", "Feb.", "Mar.", "Abr.", "May.", "Jun.", "Jul.", "Ago.", "Sept.", "Oct.", "Nov.", "Dic."];
  let text = `<b>${d.date.getFullYear()}, ${monthNames[d.date.getMonth()]} ${d.date.getDate()}</b>: ${d.place}`;
  console.log(thisTime, now, d.place, `${date.getFullYear()}, ${monthNames[date.getMonth()]} ${date.getDate()}` );
  if(!d.link || thisTime < now) return text;
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
        text: "Tickets",
        ready: blinking
      }
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

const upcoming = data.filter(d => d.date.getTime() > now);

export const funcionesModel = {
  main: !upcoming ? undefined : {
    fontSize: "1.25em",
    marginBottom: "1.5em",
    h6: "Próximas funciónes",
    p:  upcoming.map(printDate),
  },
  ul: {
    h6: "Funciones pasadas",
    li: data.filter(d => !upcoming.includes(d)).map(printDate),
  }
};

export default funcionesModel;
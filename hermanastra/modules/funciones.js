

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
  }
  
  export const funcionesModel = {
    fontSize: "1.25em",
    h6: "Próxima función:",
    a: {
      href: "https://tix.do/event/lenino-y-la-hermanastra/",
      target: "_blank",
      span: "<b>2023, 07/08</b>: Casa de Teatro, Santo Domingo.",
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

  export default funcionesModel;
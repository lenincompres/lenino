import Copy from "../../lib/Copy.js";
import Collapsable from "../Collapsable.js";

export const bookingModel = {
  marginTop: "3em",
    h2: Copy.text({
      es: "Contacto y Reservas",
      en: "Contact & Booking",
    }),
    i: "Educational and cultural rates available.",
    p: {
      margin: "1em 0",
      textAlign: "left",
      content: ["Performances of The Stepsister include a 50-60 minute solo show with live piano, theatrical storytelling, and an optional post-show discussion. Workshops and extended educational sessions can be added upon request.", "Discounts available for multiple bookings or community programs. Let’s work together to tailor the experience to your audience and budget."],
    },
    section: new Collapsable({
      iframe: {
        src: "https://docs.google.com/forms/d/e/1FAIpQLSf-QRMN0oLrpjbgQ6ZBX8I8ggWsWd5byyIw91QMhL4GMDcAtg/viewform?usp=sharing",
        width: "100%",
        height: 1550,
      }
    }, Copy.text({
      en: "✉️ Contact Us",
      es: "✉️ Contáctanos",
    }), Copy.text({
      en: "✉️ Close Form",
      es: "✉️ Cerrar Formulario"
    })),
};

export default bookingModel;
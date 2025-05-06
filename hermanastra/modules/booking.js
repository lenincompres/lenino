import Copy from "../../lib/Copy.js";
import Collapsable from "../Collapsable.js";

export const bookingModel = {
  marginTop: "3em",
  h2: Copy.text({
    es: "Contacto y Reservas",
    en: "Contact & Booking",
  }),
  i: Copy.text({
    en: "Educational and cultural rates available.",
    es: "Tarifas educativas y culturales disponibles.",
  }),
  p: {
    margin: "1em 0",
    textAlign: "left",
    content: Copy.text({
      en: ["Performances of The Stepsister include a 50–60-minute solo show with live piano, theatrical storytelling, and an optional post-show discussion. Workshops or extended educational sessions can also be added.", "Discounts are available for multiple bookings or community programs, and we’re happy to send a dossier to help tailor the experience to your audience and budget."],
      es: ["Las funciones de La Hermanastra incluyen un espectáculo unipersonal de 50 a 60 minutos con piano en vivo, narración teatral y una charla opcional después de la presentación. También se pueden agregar talleres o sesiones educativas ampliadas.","Ofrecemos descuentos para funciones múltiples o programas comunitarios, y podemos enviarte un dossier con toda la información para adaptar la experiencia a tu público y presupuesto."],
    }),
  },
  section: new Collapsable({
    iframe: {
      src: "https://docs.google.com/forms/d/e/1FAIpQLSf-QRMN0oLrpjbgQ6ZBX8I8ggWsWd5byyIw91QMhL4GMDcAtg/viewform?embedded=true",
      width: "100%",
      height: window.innerWidth > 800 ? 1440 : 1600,
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
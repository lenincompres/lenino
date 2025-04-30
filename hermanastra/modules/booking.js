import Copy from "../../lib/Copy.js";

export const bookingModel = {
  marginTop: "3em",
  tag: "ul",
  section: {
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
    section: [
      /*{
              h3: "Typical Ranges:",
              li: {
                content: [
                  "<b>High Schools:</b> $800 – $1,500 USD",
                  "<b>Universities:</b> $1,500 – $2,500 USD",
                  "<b>Cultural Centers & Festivals:</b> $1,000 – $2,000 USD",
                ]
              },
              p: {
                textAlign: "left",
                text: "Discounts available for multiple bookings or community programs. Let’s work together to tailor the experience to your audience and budget.",
              },
            },*/
      {
        li: {
          content: [
            `<a href="mailto:lenincompres@gmail.com">lenincompres@gmail.com</a>`,
            `<a>www.lenino.net/hermanastra`,
            "Based in NYC. Available across the Tri-State Area.",
          ]
        },
      }
    ]
  },
};

export default bookingModel;
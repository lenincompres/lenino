import SOCIAL_LINKS from "../social.js";
import * as STYLE from "../style.js";

const contactPage = {
  menu: {
    fontSize: "3.43em",
    marginTop: "1em",
    ul: {
      style: STYLE.FLEX,
      justifyContent: "center",
      li: SOCIAL_LINKS.map((a, i) => ({
        a: {
          model: [a, STYLE.SLIDE(i)],
          margin: "0.25em",
        }
      }))
    }
  }
};

export default contactPage;
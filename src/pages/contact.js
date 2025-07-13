import SOCIAL_LINKS from "./data/social.js";
import * as STYLE from "../style.js";

const contactPage = {
  iframe: {
    src: "https://docs.google.com/forms/d/e/1FAIpQLScAZWRx8a_YpAN89piURPuHzXnNv-8v0Kq5CubgZPVHcqZpyg/viewform?embedded=true",
    width: "100%",
    height: 1600,
  }
  /*
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
  }*/
};

export default contactPage;
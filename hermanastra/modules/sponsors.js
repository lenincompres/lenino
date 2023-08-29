import {
  INC
} from "../settings.js";

const sponsors = [
  "coopcovi.png",
  "arte2.png",
  "andamioscibao.png",
  "espejo.png",
  "la37.png",
  "popular.png",
  "granteatro.png",
];

export const sponsorsModel = {
  overflowY: "hidden",
  background: "white",
  ul: {
    id: "eltSponsors",
    width: "100%",
    display: "flex",
    //pointerEvents: "none",
    li: [...sponsors, ...sponsors, ...sponsors].map(u => new Object({
        margin: "0 2em",
      img: {
        height: "7em",
        src: "media/sponsors/" + u,
      }
    })),
    marginLeft: INC.as(i => {
      let w = eltSponsors.getBoundingClientRect().width;
      return `-${w*i/100}px`;
    }),
  },
}

export default sponsorsModel;
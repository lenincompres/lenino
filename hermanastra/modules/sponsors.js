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
  overflow: "hidden",
  background: "white",
  ul: {
    id: "eltSponsors",
    width: "fit-content",
    display: "flex",
    //pointerEvents: "none",
    li: [...sponsors, ...sponsors, ...sponsors].map(u => new Object({
      margin: "0 2em",
      img: {
        height: "6em",
        src: "media/sponsors/" + u,
      }
    })),
    marginLeft: INC.as(i => {
      let w = eltSponsors.offsetWidth  / 3;
      return `-${w * i / 100}px`;
    }),
  },
}

export default sponsorsModel;
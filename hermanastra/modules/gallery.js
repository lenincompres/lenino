

import { COLOR } from "../settings.js";

let videoPlayingBinder = new Binder(false);
let videoBinder = new Binder();
function toggleVideo(){
  videoPlayingBinder.value ? videoBinder.value.pause() : videoBinder.value.play();
  videoPlayingBinder.value = !videoPlayingBinder.value;
}

export const galleryModel = {
    backgroundImage: "url(media/icon.png)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
    height: "800px",
    textAlign: "center",
    padding: "185px 0",
    position: "relative",
    figure: {
      display: "inline-block",
      background: COLOR.ACCENT,
      borderRadius: "50%",
      width: "410px",
      height: "520px",
      overflow: "hidden",
      video: {
        src: "media/20230708-reviews.mp4",
        height: "100%",
        width: "100%",
        done: elt => videoBinder.value = elt,
      },
    },
    footer: {
      position: "absolute",
      bottom: "50px",
      left: 0,
      width: "100%",
      fontSize: "20px",
      section: {
        fontFamily: "title",
        margin: "0 auto",
        display: "inline-block",
        width: "6em",
        padding: "1em 0",
        fontSize: "24px",
        cursor: "pointer",
        color: "black",
        borderRadius: "50%",
        display: videoBinder.as(["none", "inline-block"]),
        background: COLOR.LIGHT,
        h6: {
        text: videoPlayingBinder.as(["Play ▶", "Pause"]),
        },
        border: "8px solid black",
        click: toggleVideo,
      },
    }
  };

  export default galleryModel;
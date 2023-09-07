

import { COLOR } from "../settings.js";

let videoPlayingBinder = new Binder(false);
let videoBinder = new Binder();
function toggleVideo(){
  videoPlayingBinder.value ? videoBinder.value.pause() : videoBinder.value.play();
  videoPlayingBinder.value = !videoPlayingBinder.value;
}

const videoURL = "https://www.youtube.com/embed/b85cTByApjM";
const isYoutube = videoURL.includes("youtube");

export const galleryModel = {
    backgroundImage: "url(media/icon.png)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "calc(100%c + 2em)",
    height: "800px",
    textAlign: "center",
    padding: "185px 0",
    position: "relative",
    figure: {
      boxShadow: "0 0 50px" + COLOR.ACCENT,
      display: "inline-block",
      background: "black",
      borderRadius: "50%",
      maxWidth: "100%",
      width: "410px",
      height: "520px",
      overflow: "hidden",
      video: {
        tag: isYoutube ? "iframe" : "video",
        src: videoURL, 
        height: "100%",
        marginLeft: "-66%",
        width: "225%",
        done: elt => videoBinder.value = elt,
      },
    },
    footer: {
      display: isYoutube ? "none" : "block",
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
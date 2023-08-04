import { URLMUSIC } from "./url.js";
const musicId = document.querySelector("#musicBg");

export class MUSIC {
  getMusic() {
    const music = URLMUSIC;
    musicId.loop = true;
    musicId.src = music;
    musicId.play();
    musicId.volume = 0.4;
  }
}

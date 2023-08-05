import { URLMUSIC, URLPICKAXE } from "./url.js";
const musicId = document.querySelector("#musicBg");
const pickaxeSOundId = document.querySelector("#pickaxeSound");

export class MUSIC {
  getMusic() {
    const music = URLMUSIC;
    musicId.loop = true;
    musicId.src = music;
    musicId.play();
    musicId.volume = 0.4;
  }
  getpickAxeSound() {
    const pickaxeSound = URLPICKAXE;
    pickaxeSOundId.src = pickaxeSound;
    pickaxeSOundId.volume = 0.4;
    pickaxeSOundId.play();
  }
}

import { MUSIC } from "./bgMusic.js";
const music = new MUSIC();

export class ALERTS {
  tutorial() {
    Swal.fire({
      title: "Bienvenido",
      text: "Presiona la pica para minar.",
      imageUrl: "multimedia/img/Tutorial.webp",
      imageWidth: 400,
      imageHeight: 400,
      imageAlt: "tutorial",
      color: "#3b4b44;",
      background: "#e4d1b9",
      backdrop: `#6d533548`,
      confirmButtonColor: "#70442f",
    }).then(() => {
      music.getMusic();
    });
  }
  localStorageReset() {
    Swal.fire({
      text: 'Porfavor recargar paguina, este boton ayuda con un "localStorage.clear()". En este proyecto tanto el oro como los valores de las minas quedan guardados.',
      imageAlt: "tutorial",
      color: "#3b4b44;",
      background: "#e4d1b9",
      backdrop: `#6d533548`,
      confirmButtonColor: "#70442f",
    });
  }
  Msngold() {
    Toastify({
      text: "Oro insuficiente",
      duration: 3000,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        color: "black",
      },
    }).showToast();
  }
}

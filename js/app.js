let gold = 0;
let textWarning = "";
let allPower = [];
let loadGoldData = localStorage.getItem("totalGold") || 0;
const carrucel = document.querySelector(".container__carrucel__cards");
const goldUi = document.querySelector("#oro");
const resetgoldBtn = document.querySelector("#resetGold");
const warningUi = document.querySelector("#warning");
const digBtn = document.querySelector("#dig");

document.addEventListener("DOMContentLoaded", () => {
  const buyPickaxeBtn = document.querySelector("#button0");
  const buygroundDigBtn = document.querySelector("#button1");
  const buystoneDigBtn = document.querySelector("#button2");
  const buycopperDigBtn = document.querySelector("#button3");

  buyPickaxeBtn.addEventListener("click", buyPickaxe);
  buygroundDigBtn.addEventListener("click", buygroundDig);
  buystoneDigBtn.addEventListener("click", buystoneDig);
  buycopperDigBtn.addEventListener("click", buycopperDig);
  loadGold();
});

class Digger {
  constructor(objDigger) {
    this.name = objDigger.name;
    this.id = objDigger.id;
    this.cost = objDigger.cost;
    this.power = objDigger.power;
    this.lvl = objDigger.lvl;
    this.buyed = objDigger.buyed;
    this.image = objDigger.image;
    carrucel.innerHTML += `
    <div class="card">
    <div class="card__lvl">
        <p>Lv.<span class="card__lvl__text">${this.lvl}</span></p>
    </div>
    <div class="card__info">
        <div class="card__info__img">
            <img src="${this.image}" alt="">
        </div>
        <div class="card__info__text">
            <p><span class="card__info__text__name">${this.name}</span></p>
            <p>Poder: <span class="card__info__text__power">${this.power}</span></p>
            <span class="card__info__text__cost">${this.cost}$</span>
            <button class="card__info__text__button" id="button${this.id}">
                <div class="card__info__text__button__cost">
                <p>Comprar</p>
                </div>
            </button>
        </div>
        </div>
    </div>`;
  }
  checkGold() {
    if (gold >= this.cost) {
      this.firstBuy();
      updateWarning("");
    } else {
      Msngold();
    }
  }
  firstBuy() {
    if (this.buyed) {
      this.buyUpgrade();
    } else {
      this.buyed = true;
      this.buyUpgrade();
    }
  }
  buyUpgrade() {
    gold -= this.cost;
    this.lvl++;
    this.power += Math.round(this.cost / 6);
    this.cost = this.lvl * this.power * 5;
    saveGold();
    updateGold();
    updateDiggersVal(this.id);
    savediggers();
  }
}
const createDiggers = (Object) => {
  for (const digger of Object) {
    const newDigger = new Digger(digger);
    allPower.push(newDigger);
  }
};
const displayDiggers = () => {
  const newDiggers = `[
    {
      "name": "Pico",
      "id": 0,
      "cost": 10,
      "power": 1,
      "lvl": 1,
      "buyed": true,
      "image": "multimedia/img/pickaxe.webp"
    },
    {
      "name": "Mina de tierra",
      "id": 1,
      "cost": 100,
      "power": 0,
      "lvl": 0,
      "buyed": false,
      "image": "multimedia/img/clayDig.webp"
    },
    {
      "name": "Mina de piedra",
      "id": 2,
      "cost": 1000,
      "power": 0,
      "lvl": 0,
      "buyed": false,
      "image": "multimedia/img/StoneDig.webp"
    },
    {
      "name": "Mina de cobre",
      "id": 3,
      "cost": 10000,
      "power": 0,
      "lvl": 0,
      "buyed": false,
      "image": "multimedia/img/cooperDig.webp"
    }
  ]`;
  const jsonDiggers = JSON.parse(newDiggers);
  createDiggers(jsonDiggers);
};
const loadDiggers = () => {
  const diggersSaved = JSON.parse(localStorage.getItem("digger"));
  diggersSaved === null ? displayDiggers() : createDiggers(diggersSaved);
};

loadDiggers();

const buyPickaxe = () => allPower[0].checkGold();
const buygroundDig = () => allPower[1].checkGold();
const buystoneDig = () => allPower[2].checkGold();
const buycopperDig = () => allPower[3].checkGold();

const cardLvlUi = document.querySelectorAll(".card__lvl__text");
const cardCostUi = document.querySelectorAll(".card__info__text__cost");
const cardPowerUi = document.querySelectorAll(".card__info__text__power");

const dig = () => {
  let totalPower = 0;
  allPower.forEach((dig) => {
    if (dig.buyed) {
      totalPower += dig.power;
    }
  });
  gold += totalPower;
  updateGold();
};
const updateDiggersVal = (digger) => {
  cardLvlUi[digger].textContent = `${allPower[digger].lvl}`;
  cardCostUi[digger].textContent = `${allPower[digger].cost}$`;
  cardPowerUi[digger].textContent = `${allPower[digger].power}`;
};
const updateGold = () => {
  goldUi.textContent = gold;
  saveGold();
  updateWarning("");
};
const reset = () => {
  localStorage.clear();
  updateWarning(
    'porfavor recargar paguina, este boton ayuda con un "localStorage.clear()"'
  );
};
const loadGold = () => {
  gold = Number(loadGoldData);
  updateGold();
};
const saveGold = () => (localStorage.totalGold = gold);
const updateWarning = (mensaje) => (warningUi.textContent = mensaje);
const savediggers = () => {
  let diggersPower = JSON.stringify(allPower);
  localStorage.setItem("digger", diggersPower);
};

resetgoldBtn.addEventListener("click", reset);
digBtn.addEventListener("click", dig);

Swal.fire({
  title: "Bienvenido",
  text: "Presiona la pica para minar.",
  imageUrl: "multimedia/img/Tutorial.webp",
  imageWidth: 400,
  imageHeight: 400,
  imageAlt: "tutorial",
  //color text
  color: "black",
  //color panel
  background: "green",
  //bgColor outside
  backdrop: `rgba(0,0,123,0.4)`,
  //bgColor button
  confirmButtonColor: "blue",
});

const Msngold = () => {
  Toastify({
    text: "Oro insuficiente",
    duration: 3000,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
      color: "black",
    },
  }).showToast();
};

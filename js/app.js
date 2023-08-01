let gold = 0;
let textWarning = "";
let allPower = [];
let loadGoldData = localStorage.getItem("totalGold") || 0;
let url = "../json/diggers.json";

const carrucel = document.querySelector(".container__carrucel__cards");
const goldUi = document.querySelector("#oro");
const resetgoldBtn = document.querySelector("#resetGold");
const warningUi = document.querySelector("#warning");
const digBtn = document.querySelector("#dig");

class Digger {
  constructor(objDigger) {
    this.name = objDigger.name;
    this.id = objDigger.id;
    this.cost = objDigger.cost;
    this.power = objDigger.power;
    this.lvl = objDigger.lvl;
    this.buyed = objDigger.buyed;
    this.image = objDigger.image;
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
    this.power += Math.round(this.cost / 3);
    this.cost = this.lvl * this.power * 5;
    saveGold();
    updateGold();
    updateDiggersVal(this.id);
    savediggers();
  }
}
const buyPickaxe = () => allPower[0].checkGold();
const buygroundDig = () => allPower[1].checkGold();
const buystoneDig = () => allPower[2].checkGold();
const buycopperDig = () => allPower[3].checkGold();

const createDiggers = (Object) => {
  Object.forEach((element) => {
    carrucel.innerHTML += `
    <div class="card">
    <div class="card__lvl">
      <p>Lv.<span class="card__lvl__text">${element.lvl}</span></p>
    </div>
    <div class="card__info">
        <div class="card__info__img">
            <img src="${element.image}" alt="">
        </div>
        <div class="card__info__text">
            <p><span class="card__info__text__name">${element.name}</span></p>
            <p>Poder: <span class="card__info__text__power">${element.power}</span></p>
            <span class="card__info__text__cost">${element.cost}$</span>
            <button class="card__info__text__button" id="button${element.id}">
                <div class="card__info__text__button__cost">
                <p>Comprar</p>
                </div>
            </button>
        </div>
        </div>
    </div>`;
    const newDigger = new Digger(element);
    allPower.push(newDigger);
  });
  const buyPickaxeBtn = document.querySelector("#button0");
  const buygroundDigBtn = document.querySelector("#button1");
  const buystoneDigBtn = document.querySelector("#button2");
  const buycopperDigBtn = document.querySelector("#button3");
  buyPickaxeBtn.addEventListener("click", buyPickaxe);
  buygroundDigBtn.addEventListener("click", buygroundDig);
  buystoneDigBtn.addEventListener("click", buystoneDig);
  buycopperDigBtn.addEventListener("click", buycopperDig);
};
const getDiggers = () => {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      createDiggers(res);
    });
};
const loadDiggers = () => {
  const diggersSaved = JSON.parse(localStorage.getItem("digger"));
  diggersSaved === null ? getDiggers() : createDiggers(diggersSaved);
};

loadDiggers();

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
  const cardLvlUi = document.querySelectorAll(".card__lvl__text");
  const cardCostUi = document.querySelectorAll(".card__info__text__cost");
  const cardPowerUi = document.querySelectorAll(".card__info__text__power");
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

const tutorial = () => {
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
    background: "#73B873",
    //bgColor outside
    backdrop: `rgba(0,0,123,0.4)`,
    //bgColor button
    confirmButtonColor: "blue",
  });
};

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

loadGold();
tutorial();

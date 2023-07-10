let gold = 0;
let textWarning = "";
let allPower = [];
const carrucel = document.querySelector(".container__carrucel__card");
const goldUi = document.querySelector("#oro");
const warningUi = document.querySelector("#warning");

document.addEventListener("DOMContentLoaded", () => {
  const buyPickaxeBtn = document.querySelector("#button0");
  const buygroundDigBtn = document.querySelector("#button1");
  const buystoneDigBtn = document.querySelector("#button2");
  const buycopperDigBtn = document.querySelector("#button3");
  const digBtn = document.querySelector("#dig");

  buyPickaxeBtn.addEventListener("click", buyPickaxe);
  buygroundDigBtn.addEventListener("click", buygroundDig);
  buystoneDigBtn.addEventListener("click", buystoneDig);
  buycopperDigBtn.addEventListener("click", buycopperDig);
  digBtn.addEventListener("click", dig);
});

class Digger {
  constructor(name, id, cost, power, lvl, buyed, image) {
    this.name = name;
    this.id = id;
    this.cost = cost;
    this.power = power;
    this.lvl = lvl;
    this.buyed = buyed;
    this.image = image;
    allPower.push(this);
    carrucel.innerHTML += `<button class="card" id="button${this.id}">
      <span class="card__name">${this.name}</span>
      <span class="card__lvl">Lvl: ${this.lvl}</span>
      <span class="card__cost">Precio: ${this.cost}$</span>
      <span class="card__power">Poder: ${this.power}</span>
      <span class="card__image"><img src="${this.image}" alt=""></span>
      </button>`;
  }
  checkGold() {
    if (gold >= this.cost) {
      this.firstBuy();
      updateWarning("");
    } else {
      console.log("Oro insuficiente");
      updateWarning("Oro insuficiente");
      displayMenu();
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
    this.power += Math.round(this.cost / 4);
    this.cost = this.lvl * this.power * 4;
    displayMenu();
    updateGold();
    updateDiggersVal(this.id);
  }
}

const pickaxe = new Digger("Pico", 0, 10, 1, 1, true, "");
const groundDig = new Digger("Mina de tierra", 1, 100, 0, 0, false, "");
const stoneDig = new Digger("Mina de piedra", 2, 1000, 0, 0, false, "");
const copperDig = new Digger("Mina de cobre", 3, 10000, 0, 0, false, "");

const buyPickaxe = () => pickaxe.checkGold();
const buygroundDig = () => groundDig.checkGold();
const buystoneDig = () => stoneDig.checkGold();
const buycopperDig = () => copperDig.checkGold();

const cardLvlUi = document.querySelectorAll(".card__lvl");
const cardCostUi = document.querySelectorAll(".card__cost");
const cardPowerUi = document.querySelectorAll(".card__power");
const cardImageUi = document.querySelectorAll(".card__image");

//cambiar
/*const display = () => {
  let comand = prompt("desea jugar Y/N");
  if (comand === "y" || comand === "Y") {
    displayMenu();
  } else {
    exitGame();
    display();
  }
};*/

const dig = () => {
  let totalPower = 0;
  allPower.forEach((dig) => {
    if (dig.buyed) {
      totalPower += dig.power;
    }
  });
  gold += totalPower;
  updateGold();
  displayMenu();
};

const updateDiggersVal = (digger) => {
  console.log(cardLvlUi);
  cardLvlUi[digger].textContent = `Lvl: ${allPower[digger].lvl}`;
  cardCostUi[digger].textContent = `Precio: ${allPower[digger].cost}$`;
  cardPowerUi[digger].textContent = `Poder: ${allPower[digger].power}`;
};
//añadir a la pg
const displayMenu = () => {
  console.log("------------------------------");
  console.log(`Oro: ${gold}`);
  console.log("------------------------------");
  console.log(`Opciones`);
  console.log(`1: Escabar`);
  allPower.forEach((digger) => {
    console.log(
      `${digger.console}: Mejorar ${digger.name} lvl: ${digger.lvl}, ${digger.cost}$, poder: ${digger.power}.`
    );
  });
  console.log(`6: Salir`);
  console.log("------------------------------");
  //selectMenu();
};

//añadir a la pg
/*const selectMenu = () => {
  let comand = prompt("Opciones");
  switch (comand) {
    case "1":
      dig();
      break;
    case "2":
      pickaxe.checkGold();
      break;
    case "3":
      groundDig.checkGold();
      break;
    case "4":
      stoneDig.checkGold();
      break;
    case "5":
      copperDig.checkGold();
      break;
    case "6":
      endGame();
      break;
    default:
      console.log("------------------------------");
      console.log("Comando no valido");
      console.log("------------------------------");
      displayMenu();
      break;
  }
};*/

const updateGold = () => {
  goldUi.textContent = gold;
  updateWarning("");
};
const updateWarning = (mensaje) => (warningUi.textContent = mensaje);

//añadir a la pg
const endGame = () => console.log("Chao todo el oro se perdio :(");
const exitGame = () => console.log("Chao");

//display();

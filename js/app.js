let gold = 100000000000000000000;
let allPower = [];
const carrucel = document.querySelector(".container__carrucel__card");

//document.addEventListener("DOMContentLoaded", () => {});

class Digger {
  constructor(name, cost, power, lvl, buyed, console) {
    this.name = name;
    this.cost = cost;
    this.power = power;
    this.lvl = lvl;
    this.buyed = buyed;
    this.console = console;
    allPower.push(this);
    carrucel.innerHTML += `<button class="card" id="button${this.console}">
      <span class="card__name">${this.name}</span>
      <span class="card__lvl">Lvl: ${this.lvl}</span>
      <span class="card__cost">Precio Mejora: ${this.cost}$</span>
      <span class="card__power">Poder: ${this.power}</span>
      <span class="card__image"><img src="" alt=""></span>
      </button>`;
  }
  checkGold() {
    if (gold >= this.cost) {
      this.firstBuy();
    } else {
      console.log("Oro insuficiente");
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
    this.power += this.cost / 2;
    this.cost = this.lvl * this.power * 4;
    displayMenu();
  }
}

const pickaxe = new Digger("Pico", 10, 1, 1, true, 2);
const groundDig = new Digger("Mina de tierra", 100, 0, 0, false, 3);
const stoneDig = new Digger("Mina de piedra", 1000, 0, 0, false, 4);
const copperDig = new Digger("Mina de cobre", 10000, 0, 0, false, 5);

const buyPickaxeBtn = document.querySelector("#button2");
const buygroundDigBtn = document.querySelector("#button3");
const buystoneDigBtn = document.querySelector("#button4");
const buycopperDigBtn = document.querySelector("#button5");

const buyPickaxe = () => {
  return pickaxe.checkGold();
};
const buygroundDig = () => {
  return groundDig.checkGold();
};
const buystoneDig = () => {
  return stoneDig.checkGold();
};
const buycopperDig = () => {
  return copperDig.checkGold();
};

buyPickaxeBtn.addEventListener("click", buyPickaxe);
buygroundDigBtn.addEventListener("click", buygroundDig);
buystoneDigBtn.addEventListener("click", buystoneDig);
buycopperDigBtn.addEventListener("click", buycopperDig);

//cambiar
const display = () => {
  let comand = prompt("desea jugar Y/N");
  if (comand === "y" || comand === "Y") {
    displayMenu();
  } else {
    exitGame();
    display();
  }
};

//añadir btn
const dig = () => {
  let totalPower = 0;
  allPower.forEach((dig) => {
    if (dig.buyed) {
      totalPower += dig.power;
    }
  });
  gold += totalPower;
  displayMenu();
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
const selectMenu = () => {
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
};

//añadir a la pg
const endGame = () => console.log("Chao todo el oro se perdio :(");
const exitGame = () => console.log("Chao");

display();

let gold = 0;
let allPower = [];

class Digger {
  constructor(name, cost, power, lvl, buyed, console) {
    this.name = name;
    this.cost = cost;
    this.power = power;
    this.lvl = lvl;
    this.buyed = buyed;
    this.console = console;
    allPower.push(this);
  }
  checkGold(digger) {
    if (gold >= digger.cost) {
      this.firstBuy(digger);
    } else {
      console.log("Oro insuficiente");
      displayMenu();
    }
  }
  firstBuy(digger) {
    if (digger.buyed) {
      this.buyUpgrade(digger);
    } else {
      digger.buyed = true;
      this.buyUpgrade(digger);
    }
  }
  buyUpgrade(digger) {
    gold -= digger.cost;
    digger.lvl++;
    digger.power += digger.cost / 2;
    digger.cost = digger.lvl * digger.power * 4;
    displayMenu();
  }
}

const pickaxe = new Digger("Pico", 10, 1, 1, true, 2);
const groundDig = new Digger("Mina de tierra", 100, 0, 0, false, 3);
const stoneDig = new Digger("Mina de piedra", 1000, 0, 0, false, 4);
const copperDig = new Digger("Mina de cobre", 10000, 0, 0, false, 5);

const display = () => {
  let comand = prompt("desea jugar Y/N");
  if (comand === "y" || comand === "Y") {
    displayMenu();
  } else {
    exitGame();
    display();
  }
};

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
  selectMenu();
};

const selectMenu = () => {
  let comand = prompt("Opciones");
  switch (comand) {
    case "1":
      dig();
      break;
    case "2":
      allPower[0].checkGold(allPower[0]);
      break;
    case "3":
      allPower[1].checkGold(allPower[1]);
      break;
    case "4":
      allPower[2].checkGold(allPower[2]);
      break;
    case "5":
      allPower[3].checkGold(allPower[3]);
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

const endGame = () => console.log("Chao todo el oro se perdio :(");
const exitGame = () => console.log("Chao");

display();

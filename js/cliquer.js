let gold = 0;
let pickaxeUpdateCost = 10;
let piackaceLvl = 1;
let piackacePower = 1;
let digFibocost = 10;
let digFibolvl = 0;
let digFiboPower = 0;

class diggers {
  constructor(updateCost, lvl, power) {
    this.updateCost = updateCost;
    this.lvl = lvl;
    this.power = power;
  }
  buyUpgrade() {
    if (gold >= this.updateCost) {
      gold -= this.updateCost;
      this.lvl++;
      this.power += this.updateCost / 2;
      this.updateCost = this.lvl * this.power * 4;
      displayMenu();
    } else {
      console.log("Oro insuficiente");
      displayMenu();
    }
  }
}

const display = () => {
  let comand = prompt("desea jugar Y/N");
  if (comand === "y" || comand === "Y") {
    console.log("display juego");
    displayMenu();
  } else {
    exitGame();
    display();
  }
};

const dig = () => {
  let totalPower = digFiboPower + piackacePower + groundDig.power;
  gold += totalPower;
  displayMenu();
};

const displayMenu = () => {
  console.log("------------------------------");
  console.log(`Oro: ${gold}`);
  console.log("------------------------------");
  console.log(`Opciones`);
  console.log(`1: Escabar`);
  console.log(
    `2: Mejorar pico lvl:${piackaceLvl}, ${pickaxeUpdateCost}$ poder: ${piackacePower}`
  );
  console.log(
    `3: Mina fibonacci lvl:${digFibolvl}, ${digFibocost}$, poder: ${digFiboPower}`
  );
  console.log(
    `4: Mejorar mina lvl:${groundDig.lvl}, ${groundDig.updateCost}$, poder: ${groundDig.power}`
  );
  console.log(`5: Salir`);
  console.log("------------------------------");
  selectMenu();
};

const pickaxeUpgrade = () => {
  if (gold >= pickaxeUpdateCost) {
    gold -= pickaxeUpdateCost;
    piackaceLvl++;
    piackacePower += 5;
    pickaxeUpdateCost = piackaceLvl * piackacePower;
    displayMenu();
  } else {
    console.log("Oro insuficiente");
    displayMenu();
  }
};

const fibonacci = (num) => {
  if (gold >= digFibocost) {
    let val1 = 0;
    let val2 = 1;
    let digFiboVal = 0;
    for (let index = 0; index <= num; index++) {
      if (num <= 1) {
        digFiboVal++;
      }
      digFiboVal = val1 + val2;
      val1 = val2;
      val2 = digFiboVal;
    }
    gold -= digFibocost;
    digFiboPower = digFiboVal;
    digFibolvl++;
    digFibocost *= 2;
    displayMenu();
  } else {
    console.log("Oro insuficiente");
    displayMenu();
  }
};

const selectMenu = () => {
  let comand = prompt("Opciones");
  switch (comand) {
    case "1":
      dig();
      break;
    case "2":
      pickaxeUpgrade();
      break;
    case "3":
      fibonacci(digFibolvl);
      break;
    case "4":
      groundDig.buyUpgrade();
      break;
    case "5":
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

const groundDig = new diggers(100, 0, 0);

display();

let gold = 0;
let pickaxeUpdateCost = 10;
let piackaceLvl = 1;
let piackacePower = 1;
let allPower = [piackacePower];

class Diggers {
  constructor(updateCost, lvl, power, buy, id) {
    this.updateCost = updateCost;
    this.lvl = lvl;
    this.power = power;
    this.buy = buy;
    this.id = id;
  }
  checkGold() {
    if (gold >= this.updateCost) {
      this.firstBuy();
    } else {
      console.log("Oro insuficiente");
      displayMenu();
    }
  }
  firstBuy() {
    if (this.buy) {
      console.log("ya lo tenia");
      this.buyUpgrade();
    } else {
      console.log("lo compro");
      allPower.push(this.power);
      this.buy = true;
      this.buyUpgrade();
    }
  }
  buyUpgrade() {
    gold -= this.updateCost;
    this.lvl++;
    this.power += this.updateCost / 2;
    allPower[this.id] = this.power;
    console.log(this.id);
    this.updateCost = this.lvl * this.power * 4;
    console.log(allPower);
    displayMenu();
  }
}

const groundDig = new Diggers(100, 0, 0, false, 1);

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
  let totalPower = 0;
  for (let index = 0; index <= allPower.length - 1; index++) {
    totalPower += allPower[index];
  }
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
    `3: Mejorar mina lvl:${groundDig.lvl}, ${groundDig.updateCost}$, poder: ${groundDig.power}`
  );
  console.log(`4: Salir`);
  console.log("------------------------------");
  selectMenu();
};

const pickaxeUpgrade = () => {
  if (gold >= pickaxeUpdateCost) {
    gold -= pickaxeUpdateCost;
    piackaceLvl++;
    piackacePower += 5;
    allPower[0] = piackacePower;
    pickaxeUpdateCost = piackaceLvl * piackacePower;
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
      groundDig.checkGold();
      break;
    case "4":
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

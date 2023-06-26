let gold = 0;

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
      this.buyUpgrade();
    } else {
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
    this.updateCost = this.lvl * this.power * 4;
    displayMenu();
  }
}

const pickaxeDig = new Diggers(10, 1, 1, true, 0);
const groundDig = new Diggers(100, 0, 0, false, 1);

const allPower = [pickaxeDig.power];

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
    `2: Mejorar pico lvl:${pickaxeDig.lvl}, ${pickaxeDig.updateCost}$ poder: ${pickaxeDig.power}`
  );
  console.log(
    `3: Mejorar mina lvl:${groundDig.lvl}, ${groundDig.updateCost}$, poder: ${groundDig.power}`
  );
  console.log(`4: Salir`);
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
      pickaxeDig.checkGold();
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

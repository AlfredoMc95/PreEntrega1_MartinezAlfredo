let gold = 0;

const checkGold = (digger) => {
  if (gold >= digger.cost) {
    firstBuy(digger);
  } else {
    console.log("Oro insuficiente");
    displayMenu();
  }
};

const firstBuy = (digger) => {
  if (digger.firstBuy) {
    buyUpgrade(digger);
  } else {
    digger.buyed = true;
    buyUpgrade(digger);
  }
};

const buyUpgrade = (digger) => {
  gold -= digger.cost;
  digger.lvl++;
  digger.power += digger.cost / 2;
  digger.cost = digger.lvl * digger.power * 4;
  displayMenu();
};

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
  Digger.forEach((dig) => {
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
  Digger.forEach((digger) => {
    console.log(
      `${digger.console}: Mejorar ${digger.name} lvl: ${digger.lvl}, ${digger.cost}$, poder: ${digger.power}.`
    );
  });
  console.log(`4: Salir`);
  console.log("------------------------------");
  selectMenu();
};

// revisar
const selectMenu = () => {
  let comand = prompt("Opciones");
  switch (comand) {
    case "1":
      dig();
      break;
    case "2":
      checkGold(Digger[0]);
      break;
    case "3":
      checkGold(Digger[1]);
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

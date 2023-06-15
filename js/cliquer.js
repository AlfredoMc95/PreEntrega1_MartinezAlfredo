let gold = 0;
let pickaxeUpdateCost = 10;
let piackaceLvl = 1;
let piackacePower = 1;
let digFibocost = 10;
let digFibolvl = 0;
let digFiboPower = 0;

const iniciar = () => {
  let comand = prompt("desea jugar Y/N");
  if (comand === "y" || comand === "Y") {
    console.log("iniciar juego");
    displayMenu();
  } else {
    exitGame();
    iniciar();
  }
};
const dig = () => {
  let totalPower = digFiboPower + piackacePower;
  gold += totalPower;
  displayMenu();
};
const displayMenu = () => {
  console.log("------------------------------");
  console.log(`Oro: ${gold}`);
  console.log("------------------------------");
  console.log(`Opciones`);
  console.log(`1: Escabar`);
  console.log(`2: Mejorar pico lvl:${piackaceLvl}, ${pickaxeUpdateCost}$`);
  console.log(
    `3: Mina fibonacci lvl:${digFibolvl}, ${digFibocost}$, poder: ${digFiboPower}`
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

iniciar();

const colors = document.querySelectorAll('.colors'); //palette de choix  des couleurs
const colorsOrder = ["red", "yellow", "blue", "green", "orange", "purple"];

var colorCodes = [];
var essai = [];
var solution = [];
var comment = "";




const go = document.getElementById('go'); // bouton d'envoi
const newGame = document.getElementById('new'); // bouton nouveau jeu
const unset = document.getElementById('unset'); // bouton annuler

let line = 0;
let item = 1;


chooseRandom(); // choisit une combinaison de couleurs et stocke nas 'solution'
tryALine();
newTry();

// initialisation d'un nouvel essai
function newTry() {
  line++;
  item = 1;
  essai = [];
}


/**
 * choisit une combinaison aléatoire de 4 chiffres entre 0 et 5, 
 * puis crée le tableau 'solution' en utilisant ces chiffres 
 * comme index du tableau de couleurs colorsOrder
 * 
 * @returns array
 */
function chooseRandom() {

  for (let i = 1; i <= 4; i++) {
    const colorCode = Math.floor(Math.random() * 6);
    if (!colorCodes.includes(colorCode)) {
      colorCodes.push(colorCode);
    } else {
      i--;
    }
  }
  solution = colorCodes.map(colorCodes => colorsOrder[colorCodes]);
  console.log("solution : " + solution);
//  console.log("scores:" + scores);

  return solution;
}


//affiche dans la ligne active les couleurs selectionnées
function tryALine() {
  colors.forEach(color => {
    color.addEventListener('click', colorHandler => {
      colorName = color.id;
      document.getElementById(line + "_" + item).classList.add(colorName);
      essai.push(colorName);
      item++;
      if (item > 4) {
        colorHandler.preventDefault();
      }
    })
  });
}

// écoute le bouton 'envoyer', teste l'essai, affiche si il y a de bonnes couleurs, des pions bien placés...
go.addEventListener('click', e => {
  while (essai.length < 4) {
    go.preventDefault();
  }
  console.log(`essai n°${line} :` + essai);

  let intersection = [];
  let goodPlace = 0;
  let verif = [...solution];
  essai.forEach((element1, index1) => {
    verif.forEach((element2, index2) => {
      if (element1 == element2 && !(intersection.includes(index1))) {
        intersection.push(index1);
        delete verif[index2];
      }
    })
  })
  console.log("intersection : " + intersection);
  if (intersection.length > 0) {
    for (let i = 0; i < intersection.length; i++) {
      let index = intersection[i];
      if (essai[index] == solution[index]) {
        goodPlace++;

      }
    }
    if (goodPlace == 4) {
      console.log('gagné !');
      item = 1;
      for (i = 1; i <= 4; i++) {
        document.getElementById(line + "_" + item + '_' + i).classList.add('black');
      };
      if(line<5) {
        comment = "Bravo !"
      }
      if(line>5 && line <8) {
        comment = "Pas mal"
      }
      if(line>=8) {
        comment = "entraîne toi :)"
      }
      document.getElementById('message').textContent = `${line} coups ! ${comment}`;
      printResultats();

      colors.forEach(color => {
        color.removeEventListener('click', colorHandler)
      });
    }
    console.log(intersection.length + ' en commun, ' + goodPlace + ' bien placé(s)');

    if (intersection.length > 0) {
      item = 1;
      if (goodPlace > 0) {
        for (i = 1; i <= goodPlace; i++) {
          document.getElementById(line + "_" + item + '_' + i).classList.add('black');
        }
      }
      for (i = goodPlace + 1; i <= intersection.length; i++) {
        document.getElementById(line + "_" + item + '_' + i).classList.add('white');
      }
    }
  }
  if (line == 10 && goodPlace != 4) {
    document.getElementById('message').textContent = `Perdu ...`;
    printResultats();
    e.preventDefault();

  }

  newTry();
})


//  affiche la solution en haut de l'écran
function printResultats() {

  solution.forEach((element, index) => {
    document.getElementById('0_' + (index + 1)).classList.remove("hidden");

    document.getElementById('0_' + (index + 1)).classList.add(element);
  });
}

unset.addEventListener('click', e => {
  item = 1;
  essai.forEach(element => {
    document.getElementById(line + "_" + item).classList.remove(element);
    item++;
  })

  essai = [];
  item = 1;
})

newGame.addEventListener('click', e => {
  essai = [];
  for (line = 1; line <= 10; line++) {
    for (item = 1; item <= 4; item++) {
      document.getElementById(line + '_' + item).classList.remove('red');
      document.getElementById(line + '_' + item).classList.remove('orange');
      document.getElementById(line + '_' + item).classList.remove('yellow');
      document.getElementById(line + '_' + item).classList.remove('purple');
      document.getElementById(line + '_' + item).classList.remove('blue');
      document.getElementById(line + '_' + item).classList.remove('green');
      document.getElementById(line + '_1_' + item).classList.remove('white');
      document.getElementById(line + '_1_' + item).classList.remove('black');

    }
  }
  for (item = 1; item <= 4; item++) {
    document.getElementById('0_' + item).classList.remove('red');
    document.getElementById('0_' + item).classList.remove('orange');
    document.getElementById('0_' + item).classList.remove('yellow');
    document.getElementById('0_' + item).classList.remove('purple');
    document.getElementById('0_' + item).classList.remove('blue');
    document.getElementById('0_' + item).classList.remove('green');
    document.getElementById('0_' + item).classList.add('hidden');
  }
  solution = [];
  document.getElementById('message').textContent = "";
  console.log('ok');
  line = 1;
  item = 1;
  result = [];
  chooseRandom();
  colors.forEach(color => {
    color.removeEventListener('click', colorHandler, true)
  });
  tryALine();

})



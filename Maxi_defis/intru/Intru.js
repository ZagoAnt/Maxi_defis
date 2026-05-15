const carre = document.getElementById("carre");
const levelDiv = document.getElementById("level");
const explanationLeft = document.getElementById("explanation-left");
const explanationRight = document.getElementById("explanation-right");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const gameOverModal = document.getElementById("gameOverModal");
const replayBtn = document.getElementById("replayBtn");
const menuBtn = document.getElementById("menuBtn");
const playerNameInput = document.getElementById("playerName");

// Score et gestion du temps
let totalScore = 0;
let levelTimeLimit = 90; // 1 min 30 sec
let timeRemaining = levelTimeLimit;
let timerInterval = null;
let victoire;
let currentLevel;

// liste d'équations
const equations_lvl1 = [
  "2 * 2 = 4",
  "3 * 3 = 9",
  "5 * 5 = 25",
  "6 * 6 = 36",
  "7 * 7 = 49",
  "9 * 9 = 81"
];
const equations_lvl1_fausses = [
    "2 * 2 = 5",
    "3 * 3 = 8",
    "5 * 5 = 24",
    "6 * 6 = 35",
    "7 * 7 = 48",
    "9 * 9 = 90"
];

const equations_lvl2 = [
    "2 * 3 = 6",
    "4 * 5 = 20",
    "6 * 7 = 42",
    "8 * 9 = 72",
    "10 * 11 = 110",
    "12 * 13 = 156"
];

const equations_lvl2_fausses = [
    "2 * 2 = 4",
    "4 * 4 = 16",
    "6 * 6 = 36",
    "8 * 8 = 64",
    "10 * 10 = 100",
    "12 * 12 = 144"
];

const equations_lvl3 = [
    "2x - 8 = 0",
    "5x - 15 = 0",
    "7x - 21 = 0",
    "4x - 12 = 0",
    "9x - 18 = 0",
    "3x - 27 = 0 "
];

const equations_lvl3_fausses = [
    "2x + 8 = 0",
    "5x + 15 = 0",
    "7x + 21 = 0",
    "4x + 12 = 0",
    "9x + 18 = 0",
    "3x + 27 = 0"
];

const equations_lvl4 = [
    "x² - 6x + 9 = 0",
    "2x² - 8x + 8 = 0",
    "x² + 10x + 25 = 0",
    "3x² - 12x + 12 = 0",
    "4x² + 20x + 25 = 0",
    "5x² - 30x + 45 = 0"
];

const equations_lvl4_fausses = [
    "x² - 5x + 6 = 0",
    "2x² - 7x + 3 = 0",
    "x² + x - 12 = 0",
    "3x² - 10x + 3 = 0",
    "4x² + 4x - 15 = 0",
    "5x² - 13x + 6 = 0"
];

const equations_lvl5 = [
    "x^3 + 2x² - 3x + 1 = 0",
    "2x^3 + 5x² - 4x + 6 = 0",
    "3x^3 + x² - 7x + 2 = 0",
    "4x^3 + 6x² - 5x + 8 = 0",
    "5x^3 + 3x² - 9x + 4 = 0",
    "6x^3 + 2x² - 8x + 10 = 0"
];

const equations_lvl5_fausses = [
    "x^3 - 2x² + 3x - 1 = 0",
    "2x^3 - 5x² + 4x - 6 = 0",
    "3x^3 - x² + 7x - 2 = 0",
    "4x^3 - 6x² + 5x - 8 = 0",
    "5x^3 - 3x² + 9x - 4 = 0",
    "6x^3 - 2x² + 8x - 10 = 0"
];

const limites_lvl6 = [
    "lim(x->+∞) 1/x",
    "lim(x->+∞) 5/x²",
    "lim(x->+∞) (3x+1)/(x²)",
    "lim(x->+∞) 7/(2x+5)",
    "lim(x->+∞) (x+4)/(x²+1)",
    "lim(x->+∞) 9/(x³)"
];

const limites_lvl6_fausses = [
    "lim(x->+∞) x",
    "lim(x->+∞) x²",
    "lim(x->+∞) x³ - 2x",
    "lim(x->+∞) 5x + 3",
    "lim(x->+∞) (x² + 1)/(x + 1)",
    "lim(x->+∞) (2x³ - x)/(x² + 1)"
];

const primitives_lvl7 = [
    "∫ln(x)dx = xln(x) - x + C",
    "∫ln(x)dx = x(ln(x) - 1) + C",
    "∫ln(x)dx = ln(x^x) - x + C",
    "∫ln(x)dx = xln(x/e) + C",
    "∫ln(x)dx = x·ln(x) - x + C",
    "∫ln(x)dx = x(ln(x)-1) + k"
];

const primitives_lvl7_fausses = [
    "∫ln(x)dx = xln(x) + C",
    "∫ln(x)dx = (ln(x))²/2 + C",
    "∫ln(x)dx = xln(x) - 1 + C",
    "∫ln(x)dx = ln(x^x) + C",
    "∫ln(x)dx = x²ln(x) - x²/2 + C",
    "∫ln(x)dx = x(ln(x)+1) + C"
];

const equations_exp_lvl8 = [
  "e^x = 7",
  "e^(2x) = 25",
  "3e^x = 12",
  "e^x + 2 = 11",
  "e^x - 5 = 0",
  "2e^(x+1) = 6"
];

const equations_exp_lvl8_fausses = [
  "e^x = 1/3",
  "e^(2x) = 1/25",
  "4e^x = 1",
  "e^x + 5 = 6",
  "2e^(x+1) = 1",
  "e^x - 0.2 = 0"
];

// niveau de départ
const startingLevel = 1;

const levels = [
  { correct: equations_lvl1, false: equations_lvl1_fausses },
  { correct: equations_lvl2, false: equations_lvl2_fausses },
  { correct: equations_lvl3, false: equations_lvl3_fausses },
  { correct: equations_lvl4, false: equations_lvl4_fausses },
  { correct: equations_lvl5, false: equations_lvl5_fausses },
  { correct: limites_lvl6, false: limites_lvl6_fausses },
  { correct: primitives_lvl7, false: primitives_lvl7_fausses },
  { correct: equations_exp_lvl8, false: equations_exp_lvl8_fausses }
];

const explanations = [
  "Trouve l'équation fausse parmi les multiplications simples.",
  "Trouve l'équation fausse parmi les multiplications, la logique ici c'est que toutes les mauvais calculs possède une valeur au carré.",
  "Trouve l'équation fausse : regarde les signes devant les x.",
  "Trouve l'équation fausse : trouve delta et tu comprendras.",
  "Trouve l'équation fausse : regarde les signes.",
  "Trouve la limite fausse : évalue la limite à l'infini.",
  "Trouve la primitive fausse : certaine sont fausses.",
  "Trouve l'équation fausse : regarde le signe de la valeur de x."
];

let index_equations = [-1, -1, -1, -1, -1, -1]; // tableau pour stocker les index des équations affichées

// Fonction pour démarrer le timer
function startTimer() {
  timeRemaining = levelTimeLimit;
  timerDisplay.textContent = timeRemaining;
  
  if (timerInterval) clearInterval(timerInterval);
  
  timerInterval = setInterval(() => {
    timeRemaining--;
    timerDisplay.textContent = timeRemaining;
    
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      handleTimeOut();
    }
  }, 1000);
}

// Fonction pour arrêter le timer
function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
}

function updateModalButtonsState() {
  const hasName = playerNameInput.value.trim().length > 0;
  replayBtn.disabled = !hasName;
  menuBtn.disabled = !hasName;
}

function resetBackground() {
  document.body.classList.remove("error-flash", "error-static");
}

function startErrorFlash() {
  document.body.classList.remove("error-static");
  document.body.classList.add("error-flash");
  setTimeout(() => {
    document.body.classList.remove("error-flash");
    document.body.classList.add("error-static");
  }, 1500);
}

// Fonction pour gérer l'expiration du temps
function handleTimeOut() {
  const allDivs = carre.querySelectorAll('.equation');
  allDivs.forEach(div => {
    div.style.pointerEvents = "none";
  });
  showExplanation(currentLevel);
}

// fonction pour afficher 4 équations
function afficherEquations(equationsCorrectes, equationsFausses) {
  resetBackground();
  carre.innerHTML = "";
  index_equations = [-1, -1, -1, -1, -1, -1]; // reset
  startTimer(); // Démarrer le timer pour ce niveau
  let positionFausse = aleatoire(0, 3); // case où sera la fausse
  for (let i = 0; i < 4; i++) {
    let change = true;
    let index;
    let source; 
    if (i === positionFausse) {
      source = equationsFausses;
    } else {
      source = equationsCorrectes;
    }
    while (change === true) {
      index = aleatoire(0, source.length - 1);
      let trouve = false;
      for (let j = 0; j < index_equations.length; j++) {
        if (index_equations[j] === index) {
          trouve = true;
          break;
        }
      }
      if (trouve === false) {
        index_equations[i] = index;
        change = false;
      }
    }
    const div = document.createElement("div");
    div.classList.add("equation");
    div.textContent = source[index];
    if (i === positionFausse) {
      div.dataset.faux = "true";
    } else {
      div.dataset.faux = "false";
    }
    div.addEventListener('click', function() {
      if (this.dataset.faux === "true") {
        stopTimer();
        this.style.background = "green";
        const allDivs = carre.querySelectorAll('.equation');
        allDivs.forEach(div => {
          if (div !== this) {
            div.style.background = "red";
          }
        });
        
        // Calculer le score basé sur le temps restant
        const levelScore = Math.floor(timeRemaining / 10);
        totalScore += levelScore;
        scoreDisplay.textContent = totalScore;
        
        setTimeout(() => {
          this.style.border = "";
          allDivs.forEach(div => div.style.background = "");
          // Auto-advance to next level
          currentLevel++;
          if (currentLevel > levels.length) {
            // Jeu terminé - Afficher la modale
            victoire = 1;
            document.getElementById("finalLevel").textContent = currentLevel - 1;
            document.getElementById("finalScore").textContent = totalScore;
            playerNameInput.value = "";
            updateModalButtonsState();
            gameOverModal.classList.remove("hidden");
            carre.innerHTML = "";
            hideExplanations();
          } else {
            victoire = 0;
            levelDiv.textContent = `Niveau ${currentLevel}`;
            afficherEquations(levels[currentLevel - 1].correct, levels[currentLevel - 1].false);
            hideExplanations();
          }
        }, 1000);
      } else {
        stopTimer();
        startErrorFlash();
        this.style.background = "red";
        const allDivs = carre.querySelectorAll('.equation');
        allDivs.forEach(div => {
          div.style.pointerEvents = "none";
          if(div.dataset.faux === "true") {
            div.style.background = "green";
            }
          else {
            div.style.background = "red";
          }
        });
        showExplanation(currentLevel);
        setTimeout(() => {
          this.style.background = "";
          allDivs.forEach(div => div.style.background = "");
          hideExplanations();
        }, 15000);

        setTimeout(() => {
          const lastCompletedLevel = currentLevel > 1 ? currentLevel - 1 : 0;
          document.getElementById("finalLevel").textContent = lastCompletedLevel;
            document.getElementById("finalScore").textContent = totalScore;
            playerNameInput.value = "";
            updateModalButtonsState();
            gameOverModal.classList.remove("hidden");
        }, 7000);
        //alert("Ce n'est pas l'intrus.");
      }
    });
    carre.appendChild(div);
  }
}
document.addEventListener('contextmenu', function (event) {event.preventDefault();}); //Empêche l'apparition du menu en faisant clic droit
function aleatoire(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showExplanation(level) {
  const explanation = explanations[level - 1];
  const isLeft = Math.random() < 0.5;
  if (isLeft) {
    explanationLeft.textContent = explanation;
    explanationLeft.style.opacity = "1";
    explanationRight.style.opacity = "0";
  } else {
    explanationRight.textContent = explanation;
    explanationRight.style.opacity = "1";
    explanationLeft.style.opacity = "0";
  }
}

function hideExplanations() {
  explanationLeft.style.opacity = "0";
  explanationRight.style.opacity = "0";
}

currentLevel = startingLevel >= 1 && startingLevel <= levels.length ? startingLevel : 1;
levelDiv.textContent = `Niveau ${currentLevel}`;
afficherEquations(levels[currentLevel - 1].correct, levels[currentLevel - 1].false);
hideExplanations();

// Gestionnaires d'événements pour la modale
replayBtn.addEventListener('click', () => {
  sauvegarde();
  // Réinitialiser le jeu
  totalScore = 0;
  currentLevel = 1;
  scoreDisplay.textContent = totalScore;
  levelDiv.textContent = `Niveau ${currentLevel}`;
  gameOverModal.classList.add("hidden");
  afficherEquations(levels[currentLevel - 1].correct, levels[currentLevel - 1].false);
  hideExplanations();
});

menuBtn.addEventListener('click', () => {
  sauvegarde();
  setTimeout(() => {window.location.href = "../Menu/html/menu.html";}, 2000);
});

playerNameInput.addEventListener('input', updateModalButtonsState);
updateModalButtonsState();

function sauvegarde(){
    const now = new Date();
    const date = now.toLocaleDateString("fr-FR");
    const heure = now.toLocaleTimeString("fr-FR", {hour: "2-digit",minute: "2-digit"});
    let pseudo = document.getElementById("playerName").value;
    let partie = {
                    pseudo: pseudo,
                    victoire: victoire,
                    score: totalScore,
                    level:currentLevel,
                    date: `${date} ${heure}`
                };
    fetch("https://eliot.zagant27.workers.dev/save/intru", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(partie)
        })
        .then(res => res.json())
        .then(data => console.log(data));
}
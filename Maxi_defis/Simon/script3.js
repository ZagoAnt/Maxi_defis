// Définition des constantes et variables globales
const keys = ["do", "re", "mi", "fa", "sol", "la", "si", "do-sharp", "re-sharp", "fa-sharp", "sol-sharp", "si-flat"];
const couleur = ["vert-fonce", "rose", "blanc", "bleu-ciel", "orange", "violet"];
const color = ["vert", "rouge", "jaune", "bleu"];
let gameOver = false;
let startTime;
let difficulty; // 1: facile, 2: moyen, 3: difficile

// Sélection des éléments HTML
const startButton = document.getElementById("comm");
const startbtn = document.getElementById("commencer");
const startBTN = document.getElementById("COMMENCER");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popupMessage");
const closePopup = document.getElementById("closePopup");
const checkVert = document.getElementById("checkVert");
const niveau = document.getElementById("niveau");

// Gestion des événements

if (startButton) {
    startButton.addEventListener("click", () => {
        console.log("Simon Base Start Button Clicked");
        jeux.simonBase.start();
        
    });
} else {
    console.error("Element with ID 'comm' not found.");
}

if (startbtn) {
    startbtn.addEventListener("click", () => {
        console.log("Simon Moyen Start Button Clicked");
        jeux.simonMoy.start();
        
    
    });
} else {
    console.error("Element with ID 'commencer' not found.");
}

if (startBTN) {
    startBTN.addEventListener("click", () => {
        console.log("Piano Start Button Clicked");
        jeux.piano.start();
    });
} else {
    console.error("Element with ID 'COMMENCER' not found.");
}

if(difficulty) {
    console.log("Difficulté actuelle:", difficulty);
}

closePopup.addEventListener("click", () => {
    popup.style.display = "none";
});

document.getElementById('retour').addEventListener('click', function () {
    window.location.href = 'pagedebut.html'; // Redirige vers la page de début
});

// Définition des jeux
const jeux = {
    simonBase: {
        sequence: [],
        sequenceJouer: [],
        level: 0,
        start: function () {
            this.sequence = [];
            this.sequenceJouer = [];
            this.level = 0;
            difficulty = 1;
            gameOver = false;
            resetCheck();
            this.nextLevel();
        },
        nextLevel: function () {
            resetCheck(); // Réinitialise l'état de checkVert
            this.level++;
            this.sequenceJouer = [];
            updateNiveau(this.level);
            const nextColor = color[Math.floor(Math.random() * color.length)];
            this.sequence.push(nextColor);
            this.play();
        },
        play: function () {
            startTime = new Date().getTime(); // Enregistre le temps de début
            this.sequence.forEach((color, index) => {
                setTimeout(() => {
                    flashColor(color);
                }, (index + 1) * 600);
            });
        }
    },
    simonMoy: {
        sequence: [],
        sequenceJouer: [],
        level: 0,
        start: function () {
            this.sequence = [];
            this.sequenceJouer = [];
            this.level = 0;
            difficulty = 2;
            gameOver = false;
            resetCheck();
            this.nextLevel();
        },
        nextLevel: function () {
            resetCheck(); // Réinitialise l'état de checkVert
            this.level++;
            this.sequenceJouer = [];
            updateNiveau(this.level);
            const nextCouleur = couleur[Math.floor(Math.random() * couleur.length)];
            this.sequence.push(nextCouleur);
            this.play();
        },
        play: function () {
            startTime = new Date().getTime(); // Enregistre le temps de début
            this.sequence.forEach((couleur, index) => {
                setTimeout(() => {
                    flashCouleur(couleur);
                }, (index + 1) * 600);
            });
        }
    },
    piano: {
        sequence: [],
        sequenceJouer: [],
        level: 0,
        start: function () {
            this.sequence = [];
            this.sequenceJouer = [];
            this.level = 0;
            difficulty = 3;
            gameOver = false;
            resetCheck();
            this.nextLevel();
        },
        nextLevel: function () {
            resetCheck(); // Réinitialise l'état de checkVert
            this.level++;
            this.sequenceJouer = [];
            updateNiveau(this.level);
            const nextKey = keys[Math.floor(Math.random() * keys.length)];
            this.sequence.push(nextKey);
            this.play();
        },
        play: function () {
            startTime = new Date().getTime(); // Enregistre le temps de début
            this.sequence.forEach((key, index) => {
                setTimeout(() => {
                    flashKey(key);
                }, (index + 1) * 600);
            });
        }
    }
};

// Attache des événements de clic aux couleurs pour Simon Base
color.forEach((color) => {
    const colorElement = document.getElementById(color);
    if (colorElement) {
        colorElement.addEventListener("click", () => {
            flashColor(color); // Simule l'effet visuel
            jeux.simonBase.sequenceJouer.push(color); // Ajoute la couleur cliquée à la séquence du joueur
            checkSequence(jeux.simonBase); // Vérifie si la séquence est correcte
        });
    } else {
        console.error(`Element with ID '${color}' not found.`);
    }
});

couleur.forEach((couleur) => {
    const couleurElement = document.getElementById(couleur);
    if (couleurElement) {
        couleurElement.addEventListener("click", () => {
            flashCouleur(couleur); // Simule l'effet visuel
            jeux.simonMoy.sequenceJouer.push(couleur); // Ajoute la couleur cliquée à la séquence du joueur
            checkSequence(jeux.simonMoy); // Vérifie si la séquence est correcte
        });
    } else {
        console.error(`Element with ID '${couleur}' not found.`);
    }
});

keys.forEach((key) => {
    const keyElement = document.getElementById(key);
    if (keyElement) {
        keyElement.addEventListener("click", () => {
            flashKey(key); // Simule l'effet visuel
            jeux.piano.sequenceJouer.push(key); // Ajoute la touche cliquée à la séquence du joueur
            checkSequence(jeux.piano); // Vérifie si la séquence est correcte
        });
    } else {
        console.error(`Element with ID '${key}' not found.`);
    }
});


// Fonctions utilitaires
function flashKey(key) {
    const keyElement = document.getElementById(key);
    if (keyElement) {
        keyElement.style.opacity = 1;
        setTimeout(() => {
            keyElement.style.opacity = 0.5;
        }, 300);
    }
    let audio;
    switch (key) {
        case "do":
            audio = new Audio("audio/Do.mp4");
            break;
        case "re":
            audio = new Audio("audio/Ré.mp4");
            break;
        case "mi":
            audio = new Audio("audio/Mi.mp4");
            break;
        case "fa":
            audio = new Audio("audio/Fa.mp4");
            break;
        case "sol":
            audio = new Audio("audio/sol.mp3");
            break;
        case "la":
            audio = new Audio("audio/La.mp4");
            break;
        case "si":
            audio = new Audio("audio/Si.mp4");
            break;
        case "do-sharp":
            audio = new Audio("audio/do-sharp.mp3");
            break;
        case "re-sharp":
            audio = new Audio("audio/Ré-sharp.mp3");
            break;
        case "fa-sharp":
            audio = new Audio("audio/Fa-sharp.mp3");
            break;
        case "sol-sharp":
            audio = new Audio("audio/Sol-sharp.mp3");
            break;
        case "si-flat":
            audio = new Audio("audio/la-sharp.mp3");
            break;
    }
    if (audio) {
        audio.play();
    }
}

function flashColor(color) {
    const colorElement = document.getElementById(color);
    if (colorElement) {
        colorElement.style.opacity = 1;
        setTimeout(() => {
            colorElement.style.opacity = 0.5;
        }, 300);
    }
}

function flashCouleur(couleur) {
    const couleurElement = document.getElementById(couleur);
    if (couleurElement) {
        couleurElement.style.opacity = 1;
        setTimeout(() => {
            couleurElement.style.opacity = 0.5;
        }, 300);
    }
}

// script3.js
const urlParams = new URLSearchParams(window.location.search);
const username2 = urlParams.get("username");

function checkSequence(game) {
    for (let i = 0; i < game.sequenceJouer.length; i++) {
        if (game.sequenceJouer[i] !== game.sequence[i]) {
            gameOver = true;
            const niveauActuel = game.level;

            // Calcul du temps de réaction
            const endTime = new Date().getTime();
            const reactionTime = ((endTime - startTime) / 1000).toFixed(2); // Temps en secondes

            // Affiche le popup avec le message de défaite
            showPopup(`Mauvaise couleur ! Vous avez perdu au niveau ${niveauActuel}. Temps de réaction : ${reactionTime} secondes.`);

            // Change checkVert en rouge et l'allume
            checkVert.style.color = "red";
            checkVert.style.opacity = 1;

            console.log(difficulty);
            console.log(niveauActuel);
            console.log(reactionTime);
            console.log(username2);
            return;
        }
    }

    

    // Si la séquence est correcte mais incomplète, on attend le prochain clic
    if (game.sequenceJouer.length === game.sequence.length) {
        // Change checkVert en vert et l'allume
        checkVert.style.color = "green";
        checkVert.style.opacity = 1;

        setTimeout(() => {
            game.nextLevel(); // Passe au niveau suivant
        }, 1000);
    }
}

function showPopup(message) {
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popupMessage");

    if (popup && popupMessage) {
        const music = new Audio("audio/emotioDfin.mp3");
        music.play();
        popupMessage.textContent = message; // Définit le message du popup
        popup.style.display = "flex"; // Affiche le popup
    } else {
        console.error("Popup or PopupMessage element not found.");
    }
}

function resetCheck() {
    checkVert.style.color = "green";
    checkVert.style.opacity = 0.5;
}

function updateNiveau(level) {
    niveau.textContent = "Niveau: " + level;
}

function saveGame() {
    console.log("Saving game data...");
    if (!niveauActuel || !reactionTime || !difficulty) {
        alert("Les données de jeu sont invalides. Veuillez réessayer.");
        return;
    }

    if (username2) {
        console.log("Username:", username2);
        // Construction de l'URL avec les paramètres nécessaires
        let newURL = `pagedebut.html?username2=${encodeURIComponent(username2)}&gamelevel=${encodeURIComponent(niveauActuel)}&reactionTime=${encodeURIComponent(reactionTime)}&difficulty=${encodeURIComponent(difficulty)}`;
        console.log("URL à ouvrir :", newURL);

        // Redirection vers la page pour sauvegarder les scores
        window.location.href = newURL;
    } else {
        alert("Veuillez entrer un nom d'utilisateur valide.");
    }
}
// Définition des constantes et variables globales
const keys = ["do", "re", "mi", "fa", "sol", "la", "si", "do-sharp", "re-sharp", "fa-sharp", "sol-sharp", "si-flat"];
const couleur = ["vert-fonce", "rose", "blanc", "bleu-ciel", "orange", "violet"];
const color = ["vert", "rouge", "jaune", "bleu"];
let gameOver = false;
let startTime;
let difficulty; // 1: facile, 2: moyen, 3: difficile
let score;

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
let reactionTime;
function checkSequence(game) {
    for (let i = 0; i < game.sequenceJouer.length; i++) {
        if (game.sequenceJouer[i] !== game.sequence[i]) {
            gameOver = true;
            const niveauActuel = game.level;
            score = niveauActuel;
            // Calcul du temps de réaction
            const endTime = new Date().getTime();
            reactionTime = ((endTime - startTime) / 1000).toFixed(2); // Temps en secondes

            document.querySelector('.jeu-container').style.display = 'none';
            document.querySelector('body').style.background = '#f44336';
            showAuthModal(niveauActuel, reactionTime);

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

function showAuthModal(score, reactionTime) {
    const music = new Audio("audio/emotioDfin.mp3");
    music.play().catch(() => {
        // Ignorer les erreurs de lecture automatique si le navigateur bloque le son.
    });
    const authModal = document.getElementById('auth-modal');
    authModal.style.display = 'flex';
    const gameContainer = document.querySelector('.jeu-container') || document.querySelector('.piano');
    if (gameContainer) {
        gameContainer.style.display = 'none';
    }
    document.getElementById('auth-form').style.display = 'block';
    document.getElementById('lost-info').style.display = 'none';
    document.getElementById('rejouer-auth-btn').style.display = 'none';
    document.getElementById('retour-menu-auth-btn').style.display = 'none';
    document.getElementById('retour-home-auth-btn').style.display = 'none';
    document.getElementById('pseudo-auth').value = '';
    document.getElementById('lost-info').innerHTML = `<p><strong>Score :</strong> ${score}</p>
        <p><strong>Temps de réaction :</strong> ${reactionTime} s</p>`;
}

function setupAuthModal() {
    document.getElementById('auth-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const pseudo = document.getElementById('pseudo-auth').value.trim();
        if (pseudo) {
            document.getElementById('auth-form').style.display = 'none';
            document.getElementById('lost-info').style.display = 'block';
            document.getElementById('rejouer-auth-btn').style.display = 'inline-block';
            document.getElementById('retour-menu-auth-btn').style.display = 'inline-block';
            document.getElementById('retour-home-auth-btn').style.display = 'inline-block';
        } else {
            alert('Veuillez remplir votre pseudo.');
        }
    });

    document.getElementById('rejouer-auth-btn').addEventListener('click', function () {
        sauvegarde();
        const authModal = document.getElementById('auth-modal');
        authModal.style.display = 'none';
        document.querySelector('.jeu-container').style.display = 'flex';
        document.querySelector('body').style.background = 'black';
        if (difficulty === 1) {
            jeux.simonBase.start();
        } else if (difficulty === 2) {
            jeux.simonMoy.start();
        } else if (difficulty === 3) {
            jeux.piano.start();
        }
    });

    document.getElementById('retour-menu-auth-btn').addEventListener('click', function () {
        sauvegarde();
        setTimeout(() => {window.location.href = '../Menu/html/menu.html';},2000);
    });

    document.getElementById('retour-home-auth-btn').addEventListener('click', function () {
        sauvegarde();
        setTimeout(() => {window.location.href = 'pagedebut.html';},2000);
    });
}

setupAuthModal();

function resetCheck() {
    checkVert.style.color = "green";
    checkVert.style.opacity = 0.5;
}

function updateNiveau(level) {
    niveau.textContent = "Niveau: " + level;
}

function sauvegarde(){
    const now = new Date();
    const date = now.toLocaleDateString("fr-FR");
    const heure = now.toLocaleTimeString("fr-FR", {hour: "2-digit",minute: "2-digit"});
    let pseudo = document.getElementById("pseudo-auth").value;
    let partie = {
                    pseudo: pseudo,
                    score: score,
                    difficulte: difficulty,
                    tempsReaction : reactionTime,
                    date: `${date} ${heure}`
                };
    fetch("https://eliot.zagant27.workers.dev/save/simon", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(partie)
        })
        .then(res => res.json())
        .then(data => console.log(data));
}
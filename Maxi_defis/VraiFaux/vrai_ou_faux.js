let question = {
    1: { texte: "La Terre est plate.", reponse: false },
    2: { texte: "Le Soleil est une étoile.", reponse: true },
    3: { texte: "2 + 2 = 5.", reponse: false },
    4: { texte: "L’eau bout à 100°C.", reponse: true },
    5: { texte: "Les chats peuvent voler.", reponse: false },
    6: { texte: "La France est en Europe.", reponse: true },
    7: { texte: "HTML est un langage de programmation.", reponse: false },
    8: { texte: "JavaScript fonctionne dans le navigateur.", reponse: true },
    9: { texte: "Un kilomètre fait 100 mètres.", reponse: false },
    10: { texte: "La Lune est un satellite naturel.", reponse: true },
    11: { texte: "Les poissons respirent de l’air.", reponse: false },
    12: { texte: "Le feu est froid.", reponse: false },
    13: { texte: "Les humains ont 5 doigts par main.", reponse: true },
    14: { texte: "Le Python est un langage informatique.", reponse: true },
    15: { texte: "La glace est chaude.", reponse: false },
    16: { texte: "Un triangle a 3 côtés.", reponse: true },
    17: { texte: "La lumière est plus rapide que le son.", reponse: true },
    18: { texte: "Les oiseaux sont des mammifères.", reponse: false },
    19: { texte: "Paris est la capitale de l’Espagne.", reponse: false },
    20: { texte: "Le sang est rouge.", reponse: true },
    21: { texte: "Les plantes ont besoin de lumière.", reponse: true },
    22: { texte: "Le chocolat pousse sur les arbres.", reponse: false },
    23: { texte: "La Terre tourne autour du Soleil.", reponse: true },
    24: { texte: "Un carré a 5 côtés.", reponse: false },
    25: { texte: "Les chiens miaulent.", reponse: false },
    26: { texte: "Le zéro est un nombre pair.", reponse: true },
    27: { texte: "L’ordinateur pense comme un humain.", reponse: false },
    28: { texte: "Le café contient de la caféine.", reponse: true },
    29: { texte: "Les serpents ont des pattes.", reponse: false },
    30: { texte: "L’air contient de l’oxygène.", reponse: true },
    31: { texte: "Les étoiles sont des planètes.", reponse: false },
    32: { texte: "Un jour dure 24 heures.", reponse: true },
    33: { texte: "Les humains peuvent respirer sous l’eau sans aide.", reponse: false },
    34: { texte: "La neige est blanche.", reponse: true },
    35: { texte: "Le fer est un métal.", reponse: true },
    36: { texte: "Les voitures volent naturellement.", reponse: false },
    37: { texte: "Un litre = 1000 ml.", reponse: true },
    38: { texte: "Les tortues sont rapides.", reponse: false },
    39: { texte: "La musique est un son.", reponse: true },
    40: { texte: "Le feu a besoin d’oxygène pour brûler.", reponse: true }
};
let score = 0;
let questionActuelle = null;
let dejaRepondu = false;
let temps = 10;
let intervalTimer = null;   

function startGame() {
    document.body.style.backgroundImage = "url('images/backVraiFaux.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
    score = 0;
    document.getElementById("resultat").textContent = "";
    // Masquer la modale et afficher le jeu
    document.getElementById('auth-modal').style.display = 'none';
    document.querySelector('.game-container').style.display = 'block';
    nouvelleQuestion();
}

function nouvelleQuestion() {
    let numero = Math.floor(Math.random() * 40) + 1;
    questionActuelle = question[numero];
    dejaRepondu = false;
    document.getElementById("question").textContent = questionActuelle.texte;
    document.getElementById("btnQuestion").style.display = "none";
    document.getElementById("btnQuestion").disabled = true;
    document.querySelectorAll(".rep").forEach(btn => {
        btn.disabled = false;
    });
    document.getElementById("resultat").textContent = "";
    demarrerTimer();
}

function demarrerTimer() {
    clearInterval(intervalTimer);
    temps = 10;
    document.getElementById("timer").textContent = temps;
    document.getElementById("timer-container").style.display = "block";
    intervalTimer = setInterval(() => {
        temps--;
        document.getElementById("timer").textContent = temps;
        if (temps <= 0) {
            clearInterval(intervalTimer);
            if (!dejaRepondu) {
                dejaRepondu = true;
                endGame("Temps écoulé !");
            }
        }
    }, 1000);
}

function endGame(message = "Mauvaise réponse.") {
    // Masquer le jeu
    document.querySelector('.game-container').style.display = 'none';
    // Afficher la modale
    document.getElementById('auth-modal').style.display = 'block';
    // Afficher le score
    document.getElementById('final-score').textContent = score;
    // Masquer les boutons et afficher le formulaire
    document.getElementById('auth-form').style.display = 'block';
    document.getElementById('rejouer-btn').style.display = 'none';
    document.getElementById('retour-menu-modal').style.display = 'none';
    // Vider les champs du formulaire
    document.getElementById('pseudo').value = '';
    // Désactiver les boutons du jeu
    document.querySelectorAll("button[onclick^='repondre']").forEach(btn => {
        btn.disabled = true;
    });
    document.getElementById("btnQuestion").style.display = "none";
    document.getElementById("timer-container").style.display = "none";
}

function repondre(reponseUtilisateur) {
    clearInterval(intervalTimer);
    if (dejaRepondu) return;
    dejaRepondu = true;
    if (reponseUtilisateur === questionActuelle.reponse) {
        document.querySelector('.game-container').style.border = '10px solid #4CAF50';
        score++;

        setTimeout(() => {
            document.querySelector('.game-container').style.border = '10px solid rgb(28, 93, 103)';
            nouvelleQuestion();
        }, 700);
    } else {
        document.querySelector('.game-container').style.border = '10px solid #f44336';
        document.querySelector('body').style.background = '#f44336';

        setTimeout(() => {
            document.querySelector('.game-container').style.border = '10px solid rgb(28, 93, 103)';
        }, 500);
        endGame();
    }
}

// Gestion de l'authentification
document.getElementById('auth-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const pseudo = document.getElementById('pseudo').value.trim();
    if (pseudo) {
        // Authentification réussie (simple vérification)
        document.getElementById('auth-form').style.display = 'none';
        document.getElementById('rejouer-btn').style.display = 'block';
        document.getElementById('retour-menu-modal').style.display = 'block';
    } else {
        alert('Veuillez remplir votre pseudo.');
    }
});

window.onload = startGame;

// Bouton Rejouer
function rejouer(){
    sauvegarde();
    setTimeout(() => {window.location.href = "vrai_ou_faux.html";}, 2000);
}
document.getElementById('rejouer-btn').addEventListener('click', rejouer);

// Bouton Retour au menu
function retourAuMenu(){
    sauvegarde();
    setTimeout(() => {window.location.href = "../Menu/html/menu.html";}, 2000);
}
document.getElementById('retour-menu-modal').addEventListener('click', retourAuMenu);

function sauvegarde(){
    const now = new Date();
    const date = now.toLocaleDateString("fr-FR");
    const heure = now.toLocaleTimeString("fr-FR", {hour: "2-digit",minute: "2-digit"});
    let pseudo = document.getElementById("pseudo").value;
    let partie = {
                    pseudo: pseudo,
                    score: score,
                    date: `${date} ${heure}`
                };
    fetch("https://eliot.zagant27.workers.dev/save/vraifaux", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(partie)
        })
        .then(res => res.json())
        .then(data => console.log(data));
}
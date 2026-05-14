let enigmas = [
    { question: "Je suis grand quand je suis jeune et petit quand je suis vieux. Qui suis-je ?", answer: "bougie" },
    { question: "Qu'est-ce qui a des clés mais pas de serrures ?", answer: "piano" },
    { question: "Qu'est-ce qui peut voyager sans bouger ?", answer: "temps" },
    { question: "Je suis léger comme une plume, mais même le plus fort ne peut me tenir plus de 5 minutes. Qui suis-je ?", answer: "respiration" },
    { question: "Qu'est-ce qui a des dents mais ne peut pas mordre ?", answer: "peigne" },
    { question: "Qu'est-ce qui peut remplir une pièce sans prendre de place ?", answer: "lumière" },
    { question: "Qu'est-ce qui a un cœur qui ne bat pas ?", answer: "artichaut" },
    { question: "Qu'est-ce qui a 4 pieds mais ne marche pas (de grande taille)?", answer: "table" },
    { question: "Qu'est-ce qui a une tête et une queue mais pas de corps ?", answer: "pièce" },
    { question: "Qu'est-ce qui peut être cassé en étant pas tenu ?", answer: "promesse" },
];

let currentIndex = 0;
let correctAnswers = 0;
let startTime;
let timerInterval;

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const resultEl = document.getElementById("result");
const timerEl = document.getElementById("timer");
const gameEl = document.getElementById("game");

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startGame() {
    shuffle(enigmas);
    currentIndex = 0;
    correctAnswers = 0;
    answerEl.value = "";
    resultEl.classList.add("hidden");
    gameEl.classList.remove("hidden");
    document.body.classList.remove("win-background"); // Réinitialiser le fond
    document.body.style.backgroundImage = "url('images/backEnigme.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
    document.querySelector('.game-container').style.display = 'block';
    document.querySelector('.game-container').style.border = '10px solid rgb(28, 93, 103)';
    document.getElementById('auth-modal').style.display = 'none';
    document.getElementById('lost-info').style.display = 'none';
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);

    showQuestion();
}

function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    timerEl.textContent = `Temps : ${elapsed} s`;
}

function showQuestion() {
    questionEl.textContent = enigmas[currentIndex].question;
}

function checkAnswer() {
    const userAnswer = answerEl.value.toLowerCase().trim();
    const goodAnswer = enigmas[currentIndex].answer;

    if (userAnswer === goodAnswer) {
        correctAnswers++;
        currentIndex++;
        answerEl.value = "";
        document.querySelector('.game-container').style.border = '10px solid #4CAF50';
        
        setTimeout(() => {
            document.querySelector('.game-container').style.border = '10px solid rgb(28, 93, 103)';
        }, 500);

        if (currentIndex < enigmas.length) {
            showQuestion();
        } else {
            endGame(true);
        }
    } else {
        endGame(false, goodAnswer);
    }
}

function endGame(win, correct = "") {
    clearInterval(timerInterval);
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    gameEl.classList.add("hidden");
    resultEl.classList.add("hidden");

    if (win) {
        document.body.classList.add("win-background"); // Changer le fond en vert
        showResultScreen(true, timeSpent, correctAnswers);
    } else {
        document.querySelector('body').style.background = '#f44336'; // Rouge pour la défaite
        showAuthModal(timeSpent, correctAnswers, correct);
    }

    saveBestScore(correctAnswers);
}

function showResultScreen(win, timeSpent, scoreValue, correct = "") {
    resultEl.classList.remove("hidden");
    resultEl.innerHTML = win
        ? `<h2> Vous avez réussi toutes les énigmes !</h2>
           <p>Temps : ${timeSpent} s</p>
           <p>Score : ${scoreValue}</p>
           <button onclick="startGame()">Rejouer</button>
           <button onclick="window.location.href='../menu.html'">Retour au menu</button>`
        : `<h2> Mauvaise réponse</h2>
           <p>La bonne réponse était : <strong>${correct}</strong></p>
           <p>Temps : ${timeSpent} s</p>
           <p>Score : ${scoreValue}</p>
           <button onclick="startGame()">Rejouer</button>
           <button onclick="window.location.href='../menu.html'">Retour au menu</button>`;
}

function showAuthModal(timeSpent, scoreValue, correct = "") {
    document.querySelector('.game-container').style.display = 'none';
    document.getElementById('auth-modal').style.display = 'block';
    document.getElementById('final-score').textContent = scoreValue;
    document.getElementById('auth-form').style.display = 'block';
    document.getElementById('rejouer-btn').style.display = 'none';
    document.getElementById('retour-menu-modal').style.display = 'none';
    document.getElementById('pseudo').value = '';
    document.getElementById('lost-info').innerHTML = `
        <p>La bonne réponse était : <strong>${correct}</strong></p>
        <p>Temps : ${timeSpent} s</p>`;
}

document.getElementById('auth-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const pseudo = document.getElementById('pseudo').value.trim();
    if (pseudo) {
        document.getElementById('auth-form').style.display = 'none';
        document.getElementById('rejouer-btn').style.display = 'block';
        document.getElementById('retour-menu-modal').style.display = 'block';
        document.getElementById('lost-info').style.display = 'block';
    } else {
        alert('Veuillez remplir votre pseudo.');
    }
});

function saveBestScore(score) {
    const best = localStorage.getItem("bestScore") || 0;
    if (score > best) {
        localStorage.setItem("bestScore", score);
    }
}

startGame();
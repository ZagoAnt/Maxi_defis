// Palette de couleurs disponibles
const colorPalette = [
    { name: 'rouge', hex: 'red' },
    { name: 'bleu', hex: 'blue' },
    { name: 'vert', hex: 'green' },
    { name: 'jaune', hex: 'yellow' },
    { name: 'orange', hex: '#fe780a' },
    { name: 'violet', hex: '#8B00FF' },
    { name: 'rose', hex: '#FF1493' },
    { name: 'turquoise', hex: '#40E0D0' },
    { name: 'marron', hex: '#8B4513' }
];

let score = 0;
let correctColor = null;
let gameActive = true;
let timerInterval = null;
let temps = 10;

document.addEventListener('contextmenu', function (event) {event.preventDefault();}); //Empêche l'apparition du menu en faisant clic droit

// Initialiser le jeu
function initGame() {
    score = 0;
    gameActive = true;
    document.getElementById('score').textContent = score;
    const gameContainer = document.querySelector('.game-container');
    gameContainer.classList.remove('lost');
    gameContainer.style.border = '10px solid rgb(28, 93, 103)';
    document.getElementById('replayBtn').style.display = 'none';
    document.getElementById('message').textContent = '';
    document.getElementById('timer-container').style.display = 'block';
    generateRound();
}

// Générer une nouvelle manche
function generateRound() {
    gameActive = true;
    const gameContainer = document.querySelector('.game-container');
    gameContainer.classList.remove('lost');
    gameContainer.style.border = '10px solid rgb(28, 93, 103)';
    // Mélanger les couleurs
    const shuffled = [...colorPalette].sort(() => Math.random() - 0.5);
    const selectedColors = shuffled.slice(0, 9);
    
    // Choisir un index aléatoire pour la bonne réponse
    const correctIndex = Math.floor(Math.random() * 9);
    correctColor = selectedColors[correctIndex];
    
    // Générer les couleurs affichées
    const displayedColors = selectedColors.map((color, index) => {
        if (index === correctIndex) {
            // La bonne réponse : couleur correcte
            return {
                name: color.name,
                displayColor: color.hex,
                isCorrect: true,
                rotation: Math.random() * 20 - 10
            };
        } else {
            // Les autres : couleur aléatoire différente
            let wrongColor;
            do {
                wrongColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            } while (wrongColor.hex === color.hex);
            
            return {
                name: color.name,
                displayColor: wrongColor.hex,
                isCorrect: false,
                rotation: Math.random() * 20 - 10
            };
        }
    });
    
    // Afficher les couleurs
    renderColors(displayedColors);
    startTimer();
}

function startTimer() {
    stopTimer();
    if (score >= 25) {
        temps = 2;
    }
    else if (score >= 20) {
        temps = 3;
    } else if (score >= 15) {
        temps = 4;
    } else if (score >= 10) {
        temps = 6;
    } else {
        temps = 10;
    }
    document.getElementById('timer').textContent = temps;
    document.getElementById('timer-container').style.display = 'block';
    timerInterval = setInterval(() => {
        temps--;
        document.getElementById('timer').textContent = temps;
        if (temps <= 0) {
            stopTimer();
            if (gameActive) {
                gameActive = false;
                const messageEl = document.getElementById('message');
                messageEl.textContent = `Le score est ${score}. Temps écoulé! Perdu! Appuie sur Rejouer`;
                messageEl.className = 'message error';
                const gameContainer = document.querySelector('.game-container');
                gameContainer.classList.add('lost');
                gameContainer.style.border = '10px solid #f44336';
                document.getElementById('replayBtn').style.display = 'inline-block';
            }
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

// Afficher les couleurs dans la grille
function renderColors(colors) {
    const grid = document.getElementById('colorsGrid');
    grid.innerHTML = '';
    
    colors.forEach((color, index) => {
        const box = document.createElement('div');
        box.className = 'color-box';
        box.textContent = color.name;
        box.style.backgroundColor = color.displayColor;
        box.style.transform = `rotate(${color.rotation}deg)`;
        box.dataset.correct = color.isCorrect;
        
        box.addEventListener('click', () => handleClick(color.isCorrect));
        
        grid.appendChild(box);
    });
}

// Gérer les clics
function handleClick(isCorrect) {
    if (!gameActive) return;
    stopTimer();
    gameActive = false;
    
    const messageEl = document.getElementById('message');
    
    if (isCorrect) {
        score++;
        document.getElementById('score').textContent = score;
        messageEl.className = 'message success';
        document.querySelector('.game-container').style.border = '10px solid #4CAF50';
        
        // Nouvelle manche après 0.5 seconde
        setTimeout(() => {
            const gameContainer = document.querySelector('.game-container');
            gameContainer.style.border = '10px solid rgb(28, 93, 103)';
            generateRound();
            messageEl.textContent = '';
        }, 500);
    } else {
        messageEl.textContent = `Le score est ${score}. Perdu! Appuie sur Rejouer`;
        messageEl.className = 'message error';
        const gameContainer = document.querySelector('.game-container');
        gameContainer.classList.add('lost');
        gameContainer.style.border = '10px solid #f44336';
        document.getElementById('replayBtn').style.display = 'inline-block';
    }
}

// Bouton Rejouer
document.getElementById('replayBtn').addEventListener('click', initGame);

// Lancer le jeu au chargement
initGame();
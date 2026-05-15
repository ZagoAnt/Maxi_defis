document.addEventListener('DOMContentLoaded', function () {
    const equations = [
        { numbers: [3, 2, 1], target: 5 },
        { numbers: [2, 3, 4], target: 14 },
        { numbers: [5, 2, 1], target: 7 },
        { numbers: [6, 3, 2], target: 12 },
        { numbers: [8, 4, 2], target: 16 },
        { numbers: [7, 5, 3], target: 32 },
        { numbers: [9, 6, 1], target: 15 },
        { numbers: [10, 2, 3], target: 5 },
        { numbers: [5, 3, 2], target: 13 },
        { numbers: [6, 12, 6], target: 8 },
        { numbers: [8, 35, 7], target: 3 }
    ];

    const operators = ['+', '-', '*', '/'];
    let currentIndex = 0;
    let timerInterval = null;
    let seconds = 0;
    let shuffledEquations = [];
    let victoire;
    let timeString;

    // Sélection des éléments du DOM
    const number1 = document.getElementById('number1');
    const opSelect1 = document.getElementById('opSelect1');
    const number2 = document.getElementById('number2');
    const opSelect2 = document.getElementById('opSelect2');
    const number3 = document.getElementById('number3');
    const targetValue = document.getElementById('targetValue');
    const btnVerify = document.getElementById('btnVerify');
    const btnReplay = document.getElementById('btnReplay');
    const message = document.getElementById('message');

    // Fonction pour mélanger un tableau (algorithme de Fisher-Yates)
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    // Remplissage des sélecteurs d'opérateurs
    [opSelect1, opSelect2].forEach(function (select) {
        operators.forEach(function (op) {
            const option = document.createElement('option');
            option.value = op;
            option.textContent = op;
            select.appendChild(option);
        });
    });

    // Fonction pour démarrer le timer
    function startTimer() {
        seconds = 0;
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(function () {
            seconds++;
            updateTimerDisplay();
        }, 1000);
    }

    // Fonction pour afficher le timer
    function updateTimerDisplay() {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        const timeString = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.textContent = timeString;
        }
    }

    // Fonction pour arrêter le timer
    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
    }

    // Fonction pour afficher l'équation actuelle
    function renderEquation() {
        const equation = shuffledEquations[currentIndex];
        number1.textContent = equation.numbers[0];
        number2.textContent = equation.numbers[1];
        number3.textContent = equation.numbers[2];
        targetValue.textContent = equation.target;
        document.body.style.backgroundImage = "url('images/backEquation.png')";
        document.querySelector('.game-container').style.border = '10px solid rgb(28, 93, 103)';
        message.textContent = '';
        message.style.color = '#333';
        btnVerify.disabled = false;
        btnVerify.style.display = 'block';
        btnReplay.style.display = 'none';
        opSelect1.value = '+';
        opSelect2.value = '+';
        opSelect1.disabled = false;
        opSelect2.disabled = false;
    }

    // Fonction pour évaluer la réponse
    function evaluateAnswer() {
        const op1 = opSelect1.value;
        const op2 = opSelect2.value;
        const equation = shuffledEquations[currentIndex];
        const expression = `${equation.numbers[0]}${op1}${equation.numbers[1]}${op2}${equation.numbers[2]}`;
        let result = null;
        try {
            result = Function(`return ${expression}`)();
        } catch (error) {
            result = null;
        }
        return result;
    }

    // Fonction pour générer la bonne réponse
    function getCorrectAnswer() {
        const equation = shuffledEquations[currentIndex];
        const nums = equation.numbers;
        const target = equation.target;
        
        for (let op1 of operators) {
            for (let op2 of operators) {
                try {
                    const result = Function(`return ${nums[0]}${op1}${nums[1]}${op2}${nums[2]}`)();
                    if (result === target) {
                        return `${nums[0]} ${op1} ${nums[1]} ${op2} ${nums[2]} = ${target}`;
                    }
                } catch (error) {}
            }
        }
        return 'Solution introuvable';
    }

    // Événement du bouton vérifier
    btnVerify.addEventListener('click', function () {
        const result = evaluateAnswer();
        const equation = shuffledEquations[currentIndex];

        if (result === equation.target) {
            currentIndex += 1;
            if (currentIndex >= shuffledEquations.length) {
                victoire = 1;
                stopTimer();
                document.querySelector('.game-container').style.border = '10px solid #4CAF50';
                const mins = Math.floor(seconds / 60);
                const secs = seconds % 60;
                const timeString = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
                message.textContent = `Bravo ! Toutes les équations sont correctes. Temps : ${timeString}`;
                message.style.color = 'white';
                btnVerify.disabled = true;
                btnVerify.style.display = 'none';
                btnReplay.style.display = 'block';
                opSelect1.disabled = true;
                opSelect2.disabled = true;
            } else {
                document.querySelector('.game-container').style.border = '10px solid #4CAF50';
                setTimeout(function () {
                    renderEquation();
                }, 300);
            }
        } else {
            victoire = 0;
            stopTimer();
            document.querySelector('body').style.background = '#f44336';
            const correctAnswer = getCorrectAnswer();
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            timeString = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            showAuthModal(currentIndex, timeString, correctAnswer);
            opSelect1.disabled = true;
            opSelect2.disabled = true;
        }
    });

    function showAuthModal(score, timeString, correctAnswer) {
        document.querySelector('.game-container').style.display = 'none';
        document.getElementById('auth-modal').style.display = 'block';
        document.getElementById('final-score').textContent = score;
        document.getElementById('auth-form').style.display = 'block';
        document.getElementById('rejouer-btn').style.display = 'none';
        document.getElementById('retour-menu-modal').style.display = 'none';
        document.getElementById('lost-info').style.display = 'none';
        document.getElementById('pseudo').value = '';
        document.getElementById('lost-info').innerHTML = `<p><strong>Dommage !</strong></p>
            <p>Bonne réponse : ${correctAnswer}</p>
            <p>Temps : ${timeString}</p>`;
    }

    // Gestion de l'authentification
    document.getElementById('auth-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const pseudo = document.getElementById('pseudo').value.trim();
        if (pseudo) {
            document.getElementById('auth-form').style.display = 'none';
            document.getElementById('lost-info').style.display = 'block';
            document.getElementById('rejouer-btn').style.display = 'block';
            document.getElementById('retour-menu-modal').style.display = 'block';
        } else {
            alert('Veuillez remplir votre pseudo.');
        }
    });

    // Fonction pour réinitialiser le jeu
    window.startGame = function() {
        currentIndex = 0;
        shuffledEquations = shuffleArray(equations);
        document.querySelector('.game-container').style.display = 'block';
        document.getElementById('auth-modal').style.display = 'none';
        document.getElementById('lost-info').style.display = 'none';
        startTimer();
        renderEquation();
    };

    // Initialisation
    shuffledEquations = shuffleArray(equations);
    startTimer();
    renderEquation();

    function sauvegarde(){
        const now = new Date();
        const date = now.toLocaleDateString("fr-FR");
        const heure = now.toLocaleTimeString("fr-FR", {hour: "2-digit",minute: "2-digit"});
        let pseudo = document.getElementById("pseudo").value;
        let partie = {
                        pseudo: pseudo,
                        victoire: victoire,
                        score: currentIndex,
                        temps:timeString,
                        date: `${date} ${heure}`
                    };
        fetch("https://eliot.zagant27.workers.dev/save/equation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(partie)
            })
            .then(res => res.json())
            .then(data => console.log(data));
    }

    // Bouton Rejouer
    function rejouer(){
        sauvegarde();
        setTimeout(startGame(), 2000);
    }
    document.getElementById('rejouer-btn').addEventListener('click', rejouer);

    // Bouton Retour au menu
    function retourAuMenu(){
        sauvegarde();
        setTimeout(() => {window.location.href = "../Menu/html/menu.html";}, 2000);
    }
    document.getElementById('retour-menu-modal').addEventListener('click', retourAuMenu);
});
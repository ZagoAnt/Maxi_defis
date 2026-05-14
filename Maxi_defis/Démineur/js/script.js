/* Timer ------------------------------------------------------------------------------------------------------------------------ */
/* Variables -------------------------------------------------------- */
let minute = 0; 
let seconde = 0;

/* Fonction --------------------------------------------------------- */

/* Modifie le timer sur le Html */
function displayTimer(){
    document.getElementById("timer").textContent = `Temps : ${minute.toString().padStart(2,'0')}:${seconde.toString().padStart(2,'0')}`;
}

/* Indente le temps */
function Timer(){
    if (seconde == 60) {
        seconde = 0;
        minute++;
    }
    seconde++;
    displayTimer();
}

/* En combinaison de Timer() et setInterval() permet de mettre en place un décompte toute les secondes */
function ongoingTimer(){
    time = setInterval(Timer,1000); /* (function,delay) */
}

/* Commence le timer et désactive le bouton pour éviter le multiple lancement de ongoingTimer() */
function startTimer(){
    ongoingTimer();
    document.getElementById("start").style.display = "none";
}

/* Arrete le timer et réactive le boutton */
function stopTimer(){
    clearInterval(time);
}

/* Arrete via stopTimer() et reinisialise le timer */
function resetTimer(){
    stopTimer();
    minute = 0;
    seconde = 0;
    displayTimer();
}
/* --------------------------------------------------------------------------------------------------------------------------------- */

/* Plateau ------------------------------------------------------------------------------------------------------------------------- */
/* Variable */
let tab = [];
let compteurCorrect = 0;
let compteurCible = 0;
let ongoingGame = false;
let nbBombe = 0;
let nbDrapeau = 0;
let td = [];
let explosion = 0;
let premierCoup = 1;
let victoire;

/* Création de l'énigme */
function randomTab(taille){
    for(let i = 0; i<taille; i++){
        tab[i] = [];
        for(let j = 0; j<taille*2; j++){
            let random = Math.random();
            if(random>=0.15){
                tab[i][j] = 1;
            }
            else{
                tab[i][j] = 0;
                nbBombe++;
            }
            compteurCible += tab[i][j];
        }
    }
}

/* Création de la grille de jeu */
function creer(taille) {
    let table = document.createElement("table");
    table.id = "démineur";
    for(let i = 0; i<taille; i++){
        td[i] = [];
        let ligne = document.createElement("tr");
        for(let j = 0;j<taille*2;j++){
            var colonne = document.createElement("td");
            colonne.dataset.value = tab[i][j];
            colonne.dataset.i = i;
            colonne.dataset.j = j;
            colonne.classList.add("hidden");
            td[i][j] = colonne;
            colonne.dataset.nbBombe = indice(i,j,taille);
            colonne.addEventListener("mousedown",function() {coup(this,taille,event);});
            ligne.appendChild(colonne);
        }
        table.appendChild(ligne);
    }
    plateau.appendChild(table);
}

/* Donne le nombre de bombe qui se trouve autour de la case */
function indice(i,j,taille){
    let nbBombe = 0;
    let caseValide = 0;
    for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
            if (di === 0 && dj === 0) continue;
            let ni = i + di;
            let nj = j + dj;
            if (ni >= 0 && ni < taille && nj >= 0 && nj < taille * 2) {
                nbBombe += tab[ni][nj];
                caseValide++;
            }
        }
    }
    return Math.abs(caseValide-nbBombe);
}

/* --------------------------------------------------------------------------------------------------------------------------------- */

/* Partie -------------------------------------------------------------------------------------------------------------------------- */
/* Fonction qui traite les différentes entrées réalisé par le joueur */
function coup(c,taille,event){
    if(ongoingGame == true){
        /* Le joueur clique gauche */
        if(event.button === 0 && !c.classList.contains("drapeau")){ // On ne peut pas révélé une case avec un drapeau
            let valeur = c.dataset.value;
            if (valeur === "0"){
                if(premierCoup == 1){
                    c.dataset.value = 1;
                    nbBombe--;
                    compteurCible++;
                    compteurCorrect++;
                    c.classList.remove("hidden");
                    c.classList.add("correct");
                    let i = c.dataset.i;
                    let j = c.dataset.j;
                    for (let di = -1; di <= 1; di++) {
                        for (let dj = -1; dj <= 1; dj++) {
                            if (di === 0 && dj === 0) continue;
                            let ni = i + di;
                            let nj = j + dj;
                            if (ni >= 0 && ni < taille && nj >= 0 && nj < taille * 2) {
                                if(td[ni][nj].dataset.value == "1"){
                                    td[ni][nj].dataset.nbBombe--;
                                }
                            }
                        }
                    }
                }
                else{
                    /* Le joueur clique sur une bombe */
                    c.classList.remove("hidden");
                    c.classList.add("bombe");
                    document.body.classList.add('shake');
                    setTimeout(() => {document.body.classList.remove('shake');}, 300);
                    explosion++;
                }
            }
            else{
                /* Le joueur clique sur une case sans danger */
                c.classList.add("correct");
                if(c.dataset.nbBombe!=0){
                    /* La case est près d'une bombe */
                    c.classList.remove("hidden");
                    c.style.backgroundImage = `url('../image/${c.dataset.nbBombe}.png')`;
                    compteurCorrect++;
                }
                else{
                    /* La case n'a pas de bombe autour */
                    safeZone(c,taille); //On révèle alors toutes les autres cases sans danger dans la zone
                }   
            }
        }
        /* Le joueur clique droit */
        else if(event.button === 2){
            /* Retire le drapeau s'il est présent sur la case */
            if(c.classList.contains("drapeau")){
                c.classList.remove("drapeau");
                nbDrapeau--;
                displayFlag();
            }
            /* Sinon en ajoute un sur la case */
            else{
                c.classList.add("drapeau");
                nbDrapeau++;
                displayFlag();
            } 
        }
        premierCoup = 0;  
    }
}

/* On révèle les cases sans danger via récursivité autour d'une case sans danger révélé par le joueur */
function safeZone(c,taille){
    // Bombe
    if (c.dataset.value === "0") {
        return;
    }
    // Déja révélé
    if (!c.classList.contains("hidden")) {
        return;
    }
    // On récupère les indices sous forme de int
    let i = parseInt(c.dataset.i);
    let j = parseInt(c.dataset.j);
    // On révèle dans tous les autres cas
    c.classList.remove("hidden");
    c.classList.add("correct");
    compteurCorrect++;
    // Si la case à un indice on la révèle et on s'arrête
    if (c.dataset.nbBombe !== "0") {
        c.style.backgroundImage = `url('../image/${c.dataset.nbBombe}.png')`;
        return;
    }
    // Si c'est une safe zone alors on regarde au alentour s'il y en a d'autre
    for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
            if (di === 0 && dj === 0) continue;
            let ni = i + di;
            let nj = j + dj;
            if (ni >= 0 && ni < taille && nj >= 0 && nj < taille * 2) {
                safeZone(td[ni][nj], taille); // Appel récursif
            }
        }
    }
}

/* Révèle la grille */
function reveal(taille){
    for(let i = 0; i<taille; i++){
        for(let j = 0; j<taille*2; j++){
            td[i][j].classList.remove("hidden");
            if(td[i][j].dataset.value === "1"){
                td[i][j].classList.add("correct");
                if(td[i][j].dataset.nbBombe!=0){
                    td[i][j].style.backgroundImage = `url('../image/${td[i][j].dataset.nbBombe}.png')`;
                }
            }
            else{
                td[i][j].classList.add("bombe");
            }
        }
    }
}

/* Indique le nombre de bombe actuellement prsente sur le plateau sur le Html */
function displayBomb(){
    document.getElementById("bomb").textContent = `Bombe : ${nbBombe.toString()}`;
}

/* Indique le nombre de drapeau actuellement prsente sur le plateau sur le Html */
function displayFlag(){
    document.getElementById("flag").textContent = `Drapeau : ${nbDrapeau.toString()}`;
}

/* Fonction correspondant à la condition de victoire ou de défaite */
function isWon(taille){
    let message = "";
    if (compteurCorrect == compteurCible && seconde != 0){ // Victoire
        document.body.classList.add("win-background");
        message = "Victoire";
        boiteFin(message);
        ongoingGame = false;  // On arrête la partie
        stopTimer();          // On arrête le timer
        clearInterval(game);  // On arrête l'intervalle de vérification de la condition de victoire
        victoire = 1;
    }
    if (explosion == 1 || minute == 0 && seconde == 0){ // Défaite
        document.body.classList.add("defeat-background");
        message = "Défaite";
        ongoingGame = false;
        stopTimer();
        clearInterval(game);
        reveal(taille); // On révèle la grille pour montrer au joueur son erreur
        setTimeout(()=>{boiteFin(message);},3300);
        victoire = 0;
    }
}

/* Fonction correspondant à la partie permettant de lancer le timer et la vérification des conditions de victoire et de défaite */
function gameStart(taille){
    randomTab(taille);                                  // On crée l'égnigme
    creer(taille);                                     // On la génère à l'écran
    displayBomb();                                    // On affiche le nombre de bombe au total
    startTimer();                                    // On commence le timer
    ongoingGame = true;                             // On lance la partie
    game = setInterval(()=>{isWon(taille);},1000); // On lance l'intervalle pour vérifier la condition de victoire
}

document.getElementById("facile").addEventListener("click",function() {gameStart(8);});
document.getElementById("moyen").addEventListener("click",function() {gameStart(16);});
document.getElementById("difficile").addEventListener("click",function() {gameStart(24);});
document.addEventListener('contextmenu', function (event) {event.preventDefault();}); //Empêche l'apparition du menu en faisant clic droit

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/* Message de Fin ---------------------------------------------------------------------------------------------------------------------------------------------------*/
function boiteFin(message) {
    // Création du fond sombre
    let fond = document.createElement("div");
    fond.style.position = "fixed";
    fond.style.top = "0";
    fond.style.left = "0";
    fond.style.width = "100%";
    fond.style.height = "100%";
    fond.style.background = "rgba(0, 0, 0, 0.5)";
    fond.style.display = "flex";
    fond.style.justifyContent = "center";
    fond.style.alignItems = "center";
    fond.style.zIndex = "1000";

    // Création de la boîte de victoire
    let fondb = document.createElement("div");
    fondb.style.background = "white";
    fondb.style.padding = "20px";
    fondb.style.borderRadius = "10px";
    fondb.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.2)";
    fondb.style.textAlign = "center";
    fondb.style.width = "300px";

    // Ajout du message de victoire
    let titre = document.createElement("h2");
    titre.style.color = "black";
    titre.textContent = message;

    // Bouton de retour au menu
    let retourMenu = document.createElement("button");
    retourMenu.textContent = "Retour au menu";
    retourMenu.id = "BtMenu";
    retourMenu.style.marginTop = "10px";
    retourMenu.style.padding = "10px";
    retourMenu.style.border = "none";
    retourMenu.style.background = "#28a745";
    retourMenu.style.color = "white";
    retourMenu.style.borderRadius = "5px";
    retourMenu.style.cursor = "pointer";
    retourMenu.addEventListener("click",Menu);

    // Bouton pour rejouer
    let rejouer = document.createElement("button");
    rejouer.textContent = "Rejouer";
    rejouer.id = "BtRejouer"
    rejouer.style.marginTop = "10px";
    rejouer.style.padding = "10px";
    rejouer.style.border = "none";
    rejouer.style.background = "#28a745";
    rejouer.style.color = "white";
    rejouer.style.borderRadius = "5px";
    rejouer.style.cursor = "pointer";
    rejouer.addEventListener("click",relancer);

    // Création de l'input texte
    let pseudo = document.createElement("input");
    pseudo.setAttribute("type", "text");
    pseudo.setAttribute("placeholder", "Entrez votre pseudo");
    pseudo.id = "pseudo";
    pseudo.style.padding = "8px";
    pseudo.style.border = "1px solid #ccc";
    pseudo.style.borderRadius = "5px";
    pseudo.style.width = "200px";

    // Assemblage des éléments
    fondb.appendChild(titre);
    fondb.appendChild(pseudo);
    fondb.appendChild(retourMenu);
    fondb.appendChild(rejouer);
    fond.appendChild(fondb);
    document.body.appendChild(fond);

    save = setInterval(canSave,100);
}

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/* Sauvegarde -------------------------------------------------------------------------------------------------------------------------------------------------------*/
/* Création de l'objet pour la sauvegarde */
let historique;

function creerPartie(){
    const now = new Date();
    const date = now.toLocaleDateString("fr-FR");
    const heure = now.toLocaleTimeString("fr-FR", {hour: "2-digit",minute: "2-digit"});
    let pseudo = document.getElementById("pseudo").value;
    let partie = {
                    pseudo: pseudo,
                    victoire: victoire,
                    temps: `${minute.toString().padStart(2,'0')}:${seconde.toString().padStart(2,'0')}`,
                    date: `${date} ${heure}`
                };
    historique.push(partie);
}

async function sauvegarde(){
    // Variable
    const proprio = "ZagoAnt";
    const repo = "Maxi_defis";
    const path = "Maxi_defis/Sauvegarde/Sauvegarde.json";
    const GITHUB_TOKEN = "";

    // Url de l'API GitHub pour nos modifications
    const apiURL = `https://api.github.com/repos/${proprio}/${repo}/contents/${path}`;

    // On récupère notre fichier .json 
    const reponse = await fetch(apiURL, {
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github+json"
        }
    });
    const data = await reponse.json();

    // On transforme notre résultat en objet manipulable
    // atob() passe du format base64 à JavaScript
    // parse() transforme la chaine de caractère en objet JS
    const partie = JSON.parse(
        atob(data.content)
    );
    historique = partie.jeux[1].partie; // On récupère l'historique de notre jeu
    console.log(partie.connect);

    // On ajoute dans notre historique notre partie
    creerPartie();

    // On reformate dans l'autre sens
    // btoa() passe du format JavaScript à base64
    // stringify() transforme un objet en chaine de caractère
    const updatedContent = btoa(
        JSON.stringify(partie, null, 2)
    );

    // On renvoit le fichier modifier sur GitHub
    const updateResponse = await fetch(apiURL, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github+json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "Modification du JSON",
            content: updatedContent,
            sha: data.sha
        })
    });
    const result = await updateResponse.json();
}
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*Fin de Partie------------------------------------------------------------------------------------------------------------------------------------------------------*/
function canSave(){
    let BtMenu = document.getElementById("BtMenu");
    let BtRejouer = document.getElementById("BtRejouer");
    console.log(document.getElementById("pseudo").value.trim().length);
    if(document.getElementById("pseudo").value.trim().length == 0){
        BtMenu.disabled = true;
        BtRejouer.disabled = true;
        BtMenu.style.backgroundColor = "grey";
        BtRejouer.style.backgroundColor = "grey";
    }
    else{
        BtMenu.disabled = false;
        BtRejouer.disabled = false;
        BtMenu.style.background = "#28a745";
        BtRejouer.style.background = "#28a745";
    }
}

/* Rejouer */
function relancer(){
    clearInterval(save);
    BtMenu.disabled = true;
    BtRejouer.disabled = true;
    BtMenu.style.backgroundColor = "grey";
    BtRejouer.style.backgroundColor = "grey";
    sauvegarde();
    setTimeout(() => {window.location.href = "index.html";}, 2000);
}

/* Retour au menu */
function Menu(){
    clearInterval(save);
    BtMenu.disabled = true;
    BtRejouer.disabled = true;
    BtMenu.style.backgroundColor = "grey";
    BtRejouer.style.backgroundColor = "grey";
    sauvegarde();
    setTimeout(() => {window.location.href = "../../Menu/html/menu.html";}, 2000);
}
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/







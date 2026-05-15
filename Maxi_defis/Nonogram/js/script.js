/* Timer ------------------------------------------------------------------------------------------------------------------------ */
/* Variables -------------------------------------------------------- */
let minute = 2; 
let seconde = 0;

/* Fonction --------------------------------------------------------- */

/* Modifie le timer sur le Html */
function displayTimer(){
    document.getElementById("timer").textContent = `Temps : ${minute.toString().padStart(2,'0')}:${seconde.toString().padStart(2,'0')}`;
}

/* Indente le temps */
function Timer(){
    if (minute === 0 && seconde === 0) {
        stopTimer();
        return;
    }
    if (seconde == 0) {
        seconde = 60;
        minute--;
    }
    seconde--;
    displayTimer();
}

/* En combinaison de Timer() et setInterval() permet de mettre en place un décompte toute les secondes */
function ongoingTimer(){
    time = setInterval(Timer,1000); /* (function,delay) */
}

/* Commence le timer et désactive le bouton pour éviter le multiple lancement de ongoingTimer() */
function startTimer(){
    ongoingTimer();
    document.getElementById("first").style.display = "none";
}

/* Arrete le timer et réactive le boutton */
function stopTimer(){
    clearInterval(time);
}

/* Arrete via stopTimer() et reinisialise le timer */
function resetTimer(){
    stopTimer();
    minute = 2;
    seconde = 0;
    displayTimer();
}
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/* Grille de Jeu --------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Variable */

let tab = [];
let compteurErreur = 5;
let compteurCorrect = 0;
let compteurCible = 0;
let ongoingGame = false;
let td;
let victoire;
let difficulte;

/* Fonction */

/* Création de l'énigme */
function randomTab(taille){
    for(let i = 0; i<taille; i++){
        tab[i] = [];
        for(let j = 0; j<taille; j++){
            let random = Math.random();
            if(random>=0.40){
                tab[i][j] = 1;
            }
            else{
                tab[i][j] = 0;
            }
            compteurCible += tab[i][j];
        }
    }
}

/* Création du plateau */
function creer(taille) {
    let table = document.createElement("table");
    table.id = "nonogram";
    for(let i = 0; i<taille+1; i++){
        let ligne = document.createElement("tr");
        for(let j = 0;j<taille+1;j++){
            if(i==0 && j==0){
                var colonne = document.createElement("th");
            }
            else if(i==0 && j!=0){
                var colonne = document.createElement("th");
                indiceHaut(colonne,j,taille);
            }
            else if(i!=0 && j==0){
                var colonne = document.createElement("th");
                indiceGauche(colonne,i,taille);
            }
            else{
                var colonne = document.createElement("td");
                colonne.dataset.value = tab[i-1][j-1];
                colonne.addEventListener("click",function() {coup(this,taille,td);});
            }
            ligne.appendChild(colonne);
        }
        table.appendChild(ligne);
    }
    plateau.appendChild(table);
}

/* Indice ligne du haut*/
function indiceHaut(c,j,taille){
    var indice ="";
    let somme = 0;
    for(let i = 0; i<taille; i++){
        if(i != 0 && somme != 0 && tab[i][j-1] == 0 ){
            indice += somme + "<br>";
            somme = 0;
        }
        if(tab[i][j-1] == 1){
            somme++;
            if(i == taille-1){
                indice += somme + "<br>";
                somme = 0;
            }
        }
    }
    if(indice == ""){
        indice = "0";
    }
    c.innerHTML = indice;
}

/* Indice colonne du bas*/
function indiceGauche(c,i,taille){
    var indice ="";
    let somme = 0;
    for(let j = 0; j<taille; j++){
        if(j != 0 && somme != 0 && tab[i-1][j] == 0 ){
            indice += somme + " ";
            somme = 0;
        }
        if(tab[i-1][j] == 1){
            somme++;
            if(j == taille-1){
                indice += somme + "<br>";
                somme = 0;
            }
        }
    }
    if(indice == ""){
        indice = "0";
    }
    c.innerHTML = indice;
}

/* Colorie en ligne */
function colorierLigne(i,taille,td){
    for(let j = 0; j<taille; j++){
        if(td[i+j].dataset.value === "1"){
            td[i+j].classList.add("correct");
        }
        else{
            td[i+j].classList.add("eviter");
        }
    }
}

/* Colorie en colonne */
function colorierColonne(i,taille,td){
    for(let j = 0; j<taille*taille; j+=taille){
        if(td[i+j].dataset.value === "1"){
            td[i+j].classList.add("correct");
        }
        else{
            td[i+j].classList.add("eviter");
        }
    }
}

/*Vérifie si tous les éléments à clicker on été clicker sur une ligne */
/* Si oui on appelle la fonction colorierLigne */
function ligneCorrecte(taille,td){
    for(let i = 0; i<taille*taille; i+=taille){
        let ligneCorrecte = true;
        for(let j = 0; j<taille; j++){
            if(td[i+j].dataset.value === "1" && !td[i + j].classList.contains("correct")){
                ligneCorrecte = false;
            }
        }
        if(ligneCorrecte){
            colorierLigne(i,taille,td);
        }
    }
}

/*Vérifie si tous les éléments à clicker on été clicker sur une colonne */
/* Si oui on appelle la fonction colorierColonne */
function colonneCorrecte(taille,td){
    for(let j = 0; j<taille; j++){
        let colonneCorrecte = true;
        for(let i = 0; i<taille*taille; i+=taille){
            if(td[i+j].dataset.value === "1" && !td[i + j].classList.contains("correct")){
                colonneCorrecte = false;
            }
        }
        if(colonneCorrecte){
            colorierColonne(j,taille,td);
        }
    }
}

/* Met à jour la barre de vie en cas d'erreur */
function retirerCoeur(compteurErreur){
    coeur = document.getElementsByTagName("a");
    coeur[compteurErreur].style.backgroundImage = "url('../image/coeur_vide.png')";
}

/* Révèle la grille */
function reveal(td,taille){
    for(let i = 0; i<taille*taille; i++){
        if(td[i].dataset.value === "1"){
            td[i].classList.add("correct");
        }
        else{
            td[i].classList.add("eviter");
        }
    }
}


/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/* Partie -----------------------------------------------------------------------------------------------------------------------------------------------------------*/
function coup(c,taille){
    if(ongoingGame == true){
        let valeur = c.dataset.value;
        if (valeur === "0"){
            c.classList.add("erreur");
            compteurErreur--;
            retirerCoeur(compteurErreur);
            document.body.classList.add('shake');
            setTimeout(() => {
            document.body.classList.remove('shake');
            }, 300);
        }
        else{
            c.classList.add("correct");
            compteurCorrect++;
        }
        ligneCorrecte(taille,td);
        colonneCorrecte(taille,td);
    }
}

function isWon(td,taille){
    let message = "";
    if (compteurCorrect == compteurCible && seconde != 0){ // Victoire
        victoire = 1;
        document.body.classList.add("win-background");
        message = "Victoire";
        boiteFin(message);
        ongoingGame = false;  // On arrête la partie
        stopTimer();          // On arrête le timer
        clearInterval(game);  // On arrête l'intervalle de vérification de la condition de victoire
    }
    if (compteurErreur == 0 || minute == 0 && seconde == 0){ // Défaite
        victoire = 0;
        document.body.classList.add("defeat-background");
        message = "Défaite";
        ongoingGame = false;
        stopTimer();
        clearInterval(game);
        reveal(td,taille);
        setTimeout(()=>{boiteFin(message);},5300);
    }
}

/* Trois niveau de difficulté */
/* Facile : grille 6x6 et 2min */
document.getElementById("facile").addEventListener("click",function() {gameStart(6);});
/* Moyen : grille 8x8 et 3min */
document.getElementById("moyen").addEventListener("click",function() {gameStart(8);});
/* Facile : grille 10x10 et 4min */
document.getElementById("difficile").addEventListener("click",function() {gameStart(10);});

/* Début de partie */
function gameStart(taille){
    difficulte = (taille/2) -2;
    randomTab(taille);
    creer(taille);
    minute += (taille/2) -3;
    td = document.getElementsByTagName("td");
    startTimer();                   // On commence le timer
    ongoingGame = true;             // On lance la partie
    game = setInterval(()=>{isWon(td,taille);},1000); // On lance l'intervalle pour vérifier la condition de victoire
    ligneCorrecte(taille,td); // On grise directement les lignes avec pour indice 0
    colonneCorrecte(taille,td); // On grise directement les colonnes avec pour indice 0
}

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
function sauvegarde(){
    const now = new Date();
    const date = now.toLocaleDateString("fr-FR");
    const heure = now.toLocaleTimeString("fr-FR", {hour: "2-digit",minute: "2-digit"});
    let pseudo = document.getElementById("pseudo").value;
    let partie = {
                    pseudo: pseudo,
                    victoire: victoire,
                    temps: `${minute.toString().padStart(2,'0')}:${seconde.toString().padStart(2,'0')}`,
                    date: `${date} ${heure}`,
                    difficulte: difficulte,
                    erreur: `${5-compteurErreur}`
                };
    fetch("https://eliot.zagant27.workers.dev/save/nonogram", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(partie)
        })
        .then(res => res.json())
        .then(data => console.log(data));
}

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*Fin de Partie------------------------------------------------------------------------------------------------------------------------------------------------------*/
function canSave(){
    let BtMenu = document.getElementById("BtMenu");
    let BtRejouer = document.getElementById("BtRejouer");
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

// Récupération du JSON
async function loadJson() {
  const response = await fetch("https://raw.githubusercontent.com/ZagoAnt/Maxi_defis/main/Maxi_defis/Sauvegarde/Sauvegarde.json");

  if (!response.ok) {
    throw new Error("Erreur lors du chargement du JSON");
  }

  const data = await response.json();
  return data;
}

async function main(){
    // Variable
    var historiqueT = [];
    var classementT = [];
    let jeu = document.getElementById("jeu").value;
    let pseudo = document.getElementById("pseudo").value;
    let victoire = document.getElementById("victoire").value;
    let type = document.getElementById("type").value;
    
    // Chargement du Json
    const json = await loadJson();
    function triHistorique() {
        for (const jeu of json.jeux) {
            for (const partie of jeu.partie) {
                historiqueT.push({
                    ...partie,
                    jeu: jeu.nom
                });
            }
        }
        historiqueT.sort((a, b) => compareDate(b.date) - compareDate(a.date));
    }
    function triClassement() {
    for (const jeu of json.jeux) {
        classementT[jeu.nom] = [];
        for (const partie of jeu.partie) {
            classementT[jeu.nom].push({
                ...partie,
                jeu: jeu.nom
            });
        }
        switch (jeu.nom) {
            case "couleur":
            case "enigme":
            case "equation":
            case "vraifaux":
            case "intru":
                classementT[jeu.nom].sort(
                    (a, b) => b.score - a.score
                );
                break;
            case "demineur":
                classementT[jeu.nom].sort(
                    (a, b) =>
                        compareTemps(b.temps) - compareTemps(a.temps)
                );
                break;
            case "nonogram":
                classementT[jeu.nom].sort((a, b) => {
                    if (b.difficulte !== a.difficulte) {
                        return b.difficulte - a.difficulte;
                    }
                    return compareTemps(b.temps) - compareTemps(a.temps);
                });
                break;
            case "simon":
                classementT[jeu.nom].sort((a, b) => {

                    if (b.difficulte !== a.difficulte) {
                        return b.difficulte - a.difficulte;
                    }

                    return b.score - a.score;
                });
                break;
            }
        }
    }

    // Affichage
    if(type === "historique"){
        triHistorique();
        creerHistorique(jeu,pseudo,victoire,historiqueT);
    }
    else{
        triClassement();
        creerClassement(jeu,pseudo,classementT);
    }
}

function creerHistorique(jeu,pseudo,victoire,tab){
    let table = document.getElementById("result");
    table.innerHTML = "";
    if(jeu === "tous"){
        let tr = document.createElement("tr");
        let th1 = document.createElement("th");
        th1.innerText = "Jeux";
        let th2 = document.createElement("th");
        th2.innerText = "Pseudonyme";
        let th3 = document.createElement("th");
        th3.innerText = "Date de la partie";
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        table.appendChild(tr);
        if(pseudo.length == 0){
            if(victoire == "2"){
                for (const partie of tab){
                    let ligne = document.createElement("tr");
                    let cas1 = document.createElement("td");
                    cas1.innerText = nomJeu(partie.jeu);
                    let cas2 = document.createElement("td");
                    cas2.innerText = partie.pseudo
                    let cas3 = document.createElement("td");
                    cas3.innerText = partie.date;
                    if(partie.victoire == "1"){
                        ligne.style.backgroundColor = "#4CAF50";
                    }
                    else if (partie.victoire == "0"){
                        ligne.style.backgroundColor = "#f44336";
                    }
                    else{
                        ligne.style.backgroundColor = "lightgrey";
                    }
                    ligne.appendChild(cas1);
                    ligne.appendChild(cas2);
                    ligne.appendChild(cas3);
                    table.appendChild(ligne);
                }
            }
            else{
                for (const partie of tab){
                    if(partie.victoire == victoire){
                        let ligne = document.createElement("tr");
                        let cas1 = document.createElement("td");
                        cas1.innerText = nomJeu(partie.jeu);
                        let cas2 = document.createElement("td");
                        cas2.innerText = partie.pseudo
                        let cas3 = document.createElement("td");
                        cas3.innerText = partie.date;
                        if(partie.victoire == "1"){
                            ligne.style.backgroundColor = "#4CAF50";
                        }
                        else{
                            ligne.style.backgroundColor = "#f44336";
                        }
                        ligne.appendChild(cas1);
                        ligne.appendChild(cas2);
                        ligne.appendChild(cas3);
                        table.appendChild(ligne);
                    }
                }
            }
        }
        else{
            if(victoire == "2"){
                for (const partie of tab){
                    if(partie.pseudo == pseudo){
                        let ligne = document.createElement("tr");
                        let cas1 = document.createElement("td");
                        cas1.innerText = nomJeu(partie.jeu);
                        let cas2 = document.createElement("td");
                        cas2.innerText = partie.pseudo
                        let cas3 = document.createElement("td");
                        cas3.innerText = partie.date;
                        if(partie.victoire == "1"){
                            ligne.style.backgroundColor = "#4CAF50";
                        }
                        else if (partie.victoire == "0"){
                            ligne.style.backgroundColor = "#f44336";
                        }
                        else{
                            ligne.style.backgroundColor = "lightgrey";
                        }
                        ligne.appendChild(cas1);
                        ligne.appendChild(cas2);
                        ligne.appendChild(cas3);
                        table.appendChild(ligne);
                    }
                }
            }
            else{
                for (const partie of tab){
                    if(partie.victoire == victoire && partie.pseudo === pseudo){
                        let ligne = document.createElement("tr");
                        let cas1 = document.createElement("td");
                        cas1.innerText = nomJeu(partie.jeu);
                        let cas2 = document.createElement("td");
                        cas2.innerText = partie.pseudo
                        let cas3 = document.createElement("td");
                        cas3.innerText = partie.date;
                        if(partie.victoire == "1"){
                            ligne.style.backgroundColor = "#4CAF50";
                        }
                        else{
                            ligne.style.backgroundColor = "#f44336";
                        }
                        ligne.appendChild(cas1);
                        ligne.appendChild(cas2);
                        ligne.appendChild(cas3);
                        table.appendChild(ligne);
                    }
                }
            }
        }
    }
    else{
        if(jeu === "couleur"){
            let tr = document.createElement("tr");
            let th1 = document.createElement("th");
            th1.innerText = "Jeu des couleurs";
            let th2 = document.createElement("th");
            th2.innerText = "Pseudonyme";
            let th3 = document.createElement("th");
            th3.innerText = "Score";
            let th4 = document.createElement("th");
            th4.innerText = "Date de la partie";
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            table.appendChild(tr);
            if(pseudo.length == 0){
                for (const partie of tab){
                    if(partie.jeu === "couleur"){
                        let ligne = document.createElement("tr");
                        ligne.style.backgroundColor = "lightgrey";
                        let cas1 = document.createElement("td");
                        let cas2 = document.createElement("td");
                        cas2.innerText = partie.pseudo;
                        let cas3 = document.createElement("td");
                        cas3.innerText = partie.score;
                        let cas4 = document.createElement("td");
                        cas4.innerText = partie.date;
                        ligne.appendChild(cas1);
                        ligne.appendChild(cas2);
                        ligne.appendChild(cas3);
                        ligne.appendChild(cas4);
                        table.appendChild(ligne);
                    }
                }
            }
            else{
                for (const partie of tab){
                    if(partie.jeu === "couleur" && partie.pseudo === pseudo){
                        let ligne = document.createElement("tr");
                        ligne.style.backgroundColor = "lightgrey";
                        let cas1 = document.createElement("td");
                        let cas2 = document.createElement("td");
                        cas2.innerText = partie.pseudo;
                        let cas3 = document.createElement("td");
                        cas3.innerText = partie.score;
                        let cas4 = document.createElement("td");
                        cas4.innerText = partie.date;
                        ligne.appendChild(cas1);
                        ligne.appendChild(cas2);
                        ligne.appendChild(cas3);
                        ligne.appendChild(cas4);
                        table.appendChild(ligne);
                    }
                }
            }
        }
        if(jeu === "demineur"){
            let tr = document.createElement("tr");
            let th1 = document.createElement("th");
            th1.innerText = "Démineur";
            let th2 = document.createElement("th");
            th2.innerText = "Pseudonyme";
            let th3 = document.createElement("th");
            th3.innerText = "Temps";
            let th4 = document.createElement("th");
            th4.innerText = "Date de la partie";
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            table.appendChild(tr);
            if(pseudo.length == 0){
                if(victoire == "2"){
                    for (const partie of tab){
                        if(partie.jeu === "demineur"){
                            let ligne = document.createElement("tr");
                            if(partie.victoire == "1"){
                                ligne.style.backgroundColor = "#4CAF50";
                            }
                            else{
                                ligne.style.backgroundColor = "#f44336";
                            }
                            let cas1 = document.createElement("td");
                            let cas2 = document.createElement("td");
                            cas2.innerText = partie.pseudo;
                            let cas3 = document.createElement("td");
                            cas3.innerText = partie.temps;
                            let cas4 = document.createElement("td");
                            cas4.innerText = partie.date;
                            ligne.appendChild(cas1);
                            ligne.appendChild(cas2);
                            ligne.appendChild(cas3);
                            table.appendChild(ligne);
                        }
                    }
                }
                else{
                    for (const partie of tab){
                        if(partie.jeu === "demineur" && partie.victoire == victoire){
                            let ligne = document.createElement("tr");
                            if(partie.victoire == "1"){
                                ligne.style.backgroundColor = "#4CAF50";
                            }
                            else{
                                ligne.style.backgroundColor = "#f44336";
                            }
                            let cas1 = document.createElement("td");
                            let cas2 = document.createElement("td");
                            cas2.innerText = partie.pseudo;
                            let cas3 = document.createElement("td");
                            cas3.innerText = partie.temps;
                            let cas4 = document.createElement("td");
                            cas4.innerText = partie.date;
                            ligne.appendChild(cas1);
                            ligne.appendChild(cas2);
                            ligne.appendChild(cas3);
                            table.appendChild(ligne);
                        }
                    }
                }
            }
            else{
                if(victoire == "2"){
                    for (const partie of tab){
                        if(partie.jeu === "demineur" && partie.pseudo === pseudo){
                            let ligne = document.createElement("tr");
                            if(partie.victoire == "1"){
                                ligne.style.backgroundColor = "#4CAF50";
                            }
                            else{
                                ligne.style.backgroundColor = "#f44336";
                            }
                            let cas1 = document.createElement("td");
                            let cas2 = document.createElement("td");
                            cas2.innerText = partie.pseudo;
                            let cas3 = document.createElement("td");
                            cas3.innerText = partie.temps;
                            let cas4 = document.createElement("td");
                            cas4.innerText = partie.date;
                            ligne.appendChild(cas1);
                            ligne.appendChild(cas2);
                            ligne.appendChild(cas3);
                            table.appendChild(ligne);
                        }
                    }
                }
                else{
                    for (const partie of tab){
                        if(partie.jeu === "demineur" && partie.victoire == victoire && partie.pseudo === pseudo){
                            let ligne = document.createElement("tr");
                            if(partie.victoire == "1"){
                                ligne.style.backgroundColor = "#4CAF50";
                            }
                            else{
                                ligne.style.backgroundColor = "#f44336";
                            }
                            let cas1 = document.createElement("td");
                            let cas2 = document.createElement("td");
                            cas2.innerText = partie.pseudo;
                            let cas3 = document.createElement("td");
                            cas3.innerText = partie.temps;
                            let cas4 = document.createElement("td");
                            cas4.innerText = partie.date;
                            ligne.appendChild(cas1);
                            ligne.appendChild(cas2);
                            ligne.appendChild(cas3);
                            table.appendChild(ligne);
                        }
                    }
                }
            }
        }
        if(jeu === "enigme"){
            let tr = document.createElement("tr");
            let th1 = document.createElement("th");
            th1.innerText = "Enigme";
            let th2 = document.createElement("th");
            th2.innerText = "Pseudonyme";
            let th3 = document.createElement("th");
            th3.innerText = "Score";
            let th4 = document.createElement("th");
            th4.innerText = "Date de la partie";
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            table.appendChild(tr);
            if(pseudo.length == 0){
                if(victoire == "2"){
                    for (const partie of tab){
                        if(partie.jeu === "enigme"){
                            let ligne = document.createElement("tr");
                            if(partie.victoire == "1"){
                                ligne.style.backgroundColor = "#4CAF50";
                            }
                            else{
                                ligne.style.backgroundColor = "#f44336";
                            }
                            let cas1 = document.createElement("td");
                            let cas2 = document.createElement("td");
                            cas2.innerText = partie.pseudo;
                            let cas3 = document.createElement("td");
                            cas3.innerText = partie.score;
                            let cas4 = document.createElement("td");
                            cas4.innerText = partie.date;
                            ligne.appendChild(cas1);
                            ligne.appendChild(cas2);
                            ligne.appendChild(cas3);
                            ligne.appendChild(cas4);
                            table.appendChild(ligne);
                        }
                    }
                }
                else{
                    for (const partie of tab){
                        if(partie.jeu === "enigme" && partie.victoire == victoire){
                            let ligne = document.createElement("tr");
                            if(partie.victoire == "1"){
                                ligne.style.backgroundColor = "#4CAF50";
                            }
                            else{
                                ligne.style.backgroundColor = "#f44336";
                            }
                            let cas1 = document.createElement("td");
                            let cas2 = document.createElement("td");
                            cas2.innerText = partie.pseudo;
                            let cas3 = document.createElement("td");
                            cas3.innerText = partie.score;
                            let cas4 = document.createElement("td");
                            cas4.innerText = partie.date;
                            ligne.appendChild(cas1);
                            ligne.appendChild(cas2);
                            ligne.appendChild(cas3);
                            ligne.appendChild(cas4);
                            table.appendChild(ligne);
                        }
                    }
                }
            }
            else{
                if(victoire == "2"){
                    for (const partie of tab){
                        if(partie.jeu === "enigme" && partie.pseudo === pseudo){
                            let ligne = document.createElement("tr");
                            if(partie.victoire == "1"){
                                ligne.style.backgroundColor = "#4CAF50";
                            }
                            else{
                                ligne.style.backgroundColor = "#f44336";
                            }
                            let cas1 = document.createElement("td");
                            let cas2 = document.createElement("td");
                            cas2.innerText = partie.pseudo;
                            let cas3 = document.createElement("td");
                            cas3.innerText = partie.score;
                            let cas4 = document.createElement("td");
                            cas4.innerText = partie.date;
                            ligne.appendChild(cas1);
                            ligne.appendChild(cas2);
                            ligne.appendChild(cas3);
                            ligne.appendChild(cas4);
                            table.appendChild(ligne);
                        }
                    }
                }
                else{
                    for (const partie of tab){
                        if(partie.jeu === "enigme" && partie.victoire == victoire && partie.pseudo === pseudo){
                            let ligne = document.createElement("tr");
                            if(partie.victoire == "1"){
                                ligne.style.backgroundColor = "#4CAF50";
                            }
                            else{
                                ligne.style.backgroundColor = "#f44336";
                            }
                            let cas1 = document.createElement("td");
                            let cas2 = document.createElement("td");
                            cas2.innerText = partie.pseudo;
                            let cas3 = document.createElement("td");
                            cas3.innerText = partie.score;
                            let cas4 = document.createElement("td");
                            cas4.innerText = partie.date;
                            ligne.appendChild(cas1);
                            ligne.appendChild(cas2);
                            ligne.appendChild(cas3);
                            ligne.appendChild(cas4);
                            table.appendChild(ligne);
                        }
                    }
                }
            }
        }
        if(jeu === "equation"){
            let tr = document.createElement("tr");
            let th1 = document.createElement("th");
            th1.innerText = "Equation";
            let th2 = document.createElement("th");
            th2.innerText = "Pseudonyme";
            let th3 = document.createElement("th");
            th3.innerText = "Score";
            let th4 = document.createElement("th");
            th4.innerText = "Date de la partie";
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            table.appendChild(tr);
            if(pseudo.length == 0){
                if(victoire == "2"){
                    for (const partie of tab){
                        if(partie.jeu === "equation"){
                            let ligne = document.createElement("tr");
                            if(partie.victoire == "1"){
                                ligne.style.backgroundColor = "#4CAF50";
                            }
                            else{
                                ligne.style.backgroundColor = "#f44336";
                            }
                            let cas1 = document.createElement("td");
                            let cas2 = document.createElement("td");
                            cas2.innerText = partie.pseudo;
                            let cas3 = document.createElement("td");
                            cas3.innerText = partie.score;
                            let cas4 = document.createElement("td");
                            cas4.innerText = partie.date;
                            ligne.appendChild(cas1);
                            ligne.appendChild(cas2);
                            ligne.appendChild(cas3);
                            ligne.appendChild(cas4);
                            table.appendChild(ligne);
                        }
                    }
                }
                else{
                    for (const partie of tab){
                        if(partie.jeu === "equation" && partie.victoire == victoire){
                            let ligne = document.createElement("tr");
                            if(partie.victoire == "1"){
                                ligne.style.backgroundColor = "#4CAF50";
                            }
                            else{
                                ligne.style.backgroundColor = "#f44336";
                            }
                            let cas1 = document.createElement("td");
                            let cas2 = document.createElement("td");
                            cas2.innerText = partie.pseudo;
                            let cas3 = document.createElement("td");
                            cas3.innerText = partie.score;
                            let cas4 = document.createElement("td");
                            cas4.innerText = partie.date;
                            ligne.appendChild(cas1);
                            ligne.appendChild(cas2);
                            ligne.appendChild(cas3);
                            ligne.appendChild(cas4);
                            table.appendChild(ligne);
                        }
                    }
                }
            }
            else{
                if(victoire == "2"){
                    for (const partie of tab){
                        if(partie.jeu === "equation" && partie.pseudo === pseudo){
                            let ligne = document.createElement("tr");
                            if(partie.victoire == "1"){
                                ligne.style.backgroundColor = "#4CAF50";
                            }
                            else{
                                ligne.style.backgroundColor = "#f44336";
                            }
                            let cas1 = document.createElement("td");
                            let cas2 = document.createElement("td");
                            cas2.innerText = partie.pseudo;
                            let cas3 = document.createElement("td");
                            cas3.innerText = partie.score;
                            let cas4 = document.createElement("td");
                            cas4.innerText = partie.date;
                            ligne.appendChild(cas1);
                            ligne.appendChild(cas2);
                            ligne.appendChild(cas3);
                            ligne.appendChild(cas4);
                            table.appendChild(ligne);
                        }
                    }
                }
                else{
                    for (const partie of tab){
                        if(partie.jeu === "equation" && partie.victoire == victoire && partie.pseudo === pseudo){
                            let ligne = document.createElement("tr");
                            if(partie.victoire == "1"){
                                ligne.style.backgroundColor = "#4CAF50";
                            }
                            else{
                                ligne.style.backgroundColor = "#f44336";
                            }
                            let cas1 = document.createElement("td");
                            let cas2 = document.createElement("td");
                            cas2.innerText = partie.pseudo;
                            let cas3 = document.createElement("td");
                            cas3.innerText = partie.score;
                            let cas4 = document.createElement("td");
                            cas4.innerText = partie.date;
                            ligne.appendChild(cas1);
                            ligne.appendChild(cas2);
                            ligne.appendChild(cas3);
                            ligne.appendChild(cas4);
                            table.appendChild(ligne);
                        }
                    }
                }
            }
        }
        if(jeu === "nonogram"){
            let tr = document.createElement("tr");
            let th1 = document.createElement("th");
            th1.innerText = "Nonogram";
            let th2 = document.createElement("th");
            th2.innerText = "Pseudonyme";
            let th3 = document.createElement("th");
            th3.innerText = "Temps";
            let th4 = document.createElement("th");
            th4.innerText = "Difficulté";
            let th5 = document.createElement("th");
            th5.innerText = "Erreur";
            let th6 = document.createElement("th");
            th6.innerText = "Date de la partie";
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            tr.appendChild(th5);
            tr.appendChild(th6);
            table.appendChild(tr);
            if(pseudo.length == 0){
                if(victoire == "2"){
                    for (const partie of tab){
                        if(partie.jeu === "nonogram"){
                            let ligne = document.createElement("tr");
                            if(partie.victoire == "1"){
                                ligne.style.backgroundColor = "#4CAF50";
                            }
                            else{
                                ligne.style.backgroundColor = "#f44336";
                            }
                            let cas1 = document.createElement("td");
                            let cas2 = document.createElement("td");
                            cas2.innerText = partie.pseudo;
                            let cas3 = document.createElement("td");
                            cas3.innerText = partie.temps;
                            let cas4 = document.createElement("td");
                            cas4.innerText = partie.difficulte;
                            let cas5 = document.createElement("td");
                            cas5.innerText = partie.erreur;
                            let cas6 = document.createElement("td");
                            cas6.innerText = partie.date;
                            ligne.appendChild(cas1);
                            ligne.appendChild(cas2);
                            ligne.appendChild(cas3);
                            ligne.appendChild(cas4);
                            ligne.appendChild(cas5);
                            ligne.appendChild(cas6);
                            table.appendChild(ligne);
                        }
                    }
                }
                else{
                    for (const partie of tab){
                        if(partie.jeu === "nonogram" && partie.victoire == victoire){
                            let ligne = document.createElement("tr");
                            if(partie.victoire == "1"){
                                ligne.style.backgroundColor = "#4CAF50";
                            }
                            else{
                                ligne.style.backgroundColor = "#f44336";
                            }
                            let cas1 = document.createElement("td");
                            let cas2 = document.createElement("td");
                            cas2.innerText = partie.pseudo;
                            let cas3 = document.createElement("td");
                            cas3.innerText = partie.temps;
                            let cas4 = document.createElement("td");
                            cas4.innerText = partie.difficulte;
                            let cas5 = document.createElement("td");
                            cas5.innerText = partie.erreur;
                            let cas6 = document.createElement("td");
                            cas6.innerText = partie.date;
                            ligne.appendChild(cas1);
                            ligne.appendChild(cas2);
                            ligne.appendChild(cas3);
                            ligne.appendChild(cas4);
                            ligne.appendChild(cas5);
                            ligne.appendChild(cas6);
                            table.appendChild(ligne);
                        }
                    }
                }
            }
            else{
                if(victoire == "2"){
                    for (const partie of tab){
                        if(partie.jeu === "nonogram" && partie.pseudo === pseudo){
                            let ligne = document.createElement("tr");
                            if(partie.victoire == "1"){
                                ligne.style.backgroundColor = "#4CAF50";
                            }
                            else{
                                ligne.style.backgroundColor = "#f44336";
                            }
                            let cas1 = document.createElement("td");
                            let cas2 = document.createElement("td");
                            cas2.innerText = partie.pseudo;
                            let cas3 = document.createElement("td");
                            cas3.innerText = partie.temps;
                            let cas4 = document.createElement("td");
                            cas4.innerText = partie.difficulte;
                            let cas5 = document.createElement("td");
                            cas5.innerText = partie.erreur;
                            let cas6 = document.createElement("td");
                            cas6.innerText = partie.date;
                            ligne.appendChild(cas1);
                            ligne.appendChild(cas2);
                            ligne.appendChild(cas3);
                            ligne.appendChild(cas4);
                            ligne.appendChild(cas5);
                            ligne.appendChild(cas6);
                            table.appendChild(ligne);
                        }
                    }
                }
                else{
                    for (const partie of tab){
                        if(partie.jeu === "nonogram" && partie.victoire == victoire && partie.pseudo === pseudo){
                            let ligne = document.createElement("tr");
                            if(partie.victoire == "1"){
                                ligne.style.backgroundColor = "#4CAF50";
                            }
                            else{
                                ligne.style.backgroundColor = "#f44336";
                            }
                            let cas1 = document.createElement("td");
                            let cas2 = document.createElement("td");
                            cas2.innerText = partie.pseudo;
                            let cas3 = document.createElement("td");
                            cas3.innerText = partie.temps;
                            let cas4 = document.createElement("td");
                            cas4.innerText = partie.difficulte;
                            let cas5 = document.createElement("td");
                            cas5.innerText = partie.erreur;
                            let cas6 = document.createElement("td");
                            cas6.innerText = partie.date;
                            ligne.appendChild(cas1);
                            ligne.appendChild(cas2);
                            ligne.appendChild(cas3);
                            ligne.appendChild(cas4);
                            ligne.appendChild(cas5);
                            ligne.appendChild(cas6);
                            table.appendChild(ligne);
                        }
                    }
                }
            }
        }
        if(jeu === "simon"){
            let tr = document.createElement("tr");
            let th1 = document.createElement("th");
            th1.innerText = "Simon";
            let th2 = document.createElement("th");
            th2.innerText = "Pseudonyme";
            let th3 = document.createElement("th");
            th3.innerText = "Score";
            let th4 = document.createElement("th");
            th4.innerText = "Difficulté";
            let th5 = document.createElement("th");
            th5.innerText = "Temps de réaction";
            let th6 = document.createElement("th");
            th6.innerText = "Date de la partie";
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            tr.appendChild(th5);
            tr.appendChild(th6);
            table.appendChild(tr);
            if(pseudo.length == 0){
                for (const partie of tab){
                    if(partie.jeu === "simon"){
                        let ligne = document.createElement("tr");
                        ligne.style.backgroundColor = "lightgrey";
                        let cas1 = document.createElement("td");
                        let cas2 = document.createElement("td");
                        cas2.innerText = partie.pseudo;
                        let cas3 = document.createElement("td");
                        cas3.innerText = partie.score;
                        let cas4 = document.createElement("td");
                        cas4.innerText = partie.difficulte;
                        let cas5 = document.createElement("td");
                        cas5.innerText = partie.tempsReaction;
                        let cas6 = document.createElement("td");
                        cas6.innerText = partie.date;
                        ligne.appendChild(cas1);
                        ligne.appendChild(cas2);
                        ligne.appendChild(cas3);
                        ligne.appendChild(cas4);
                        ligne.appendChild(cas5);
                        ligne.appendChild(cas6);
                        table.appendChild(ligne);
                    }
                }
            } 
            else{
                for (const partie of tab){
                    if(partie.jeu === "simon" && partie.pseudo === pseudo){
                        let ligne = document.createElement("tr");
                        ligne.style.backgroundColor = "lightgrey";
                        let cas1 = document.createElement("td");
                        let cas2 = document.createElement("td");
                        cas2.innerText = partie.pseudo;
                        let cas3 = document.createElement("td");
                        cas3.innerText = partie.score;
                        let cas4 = document.createElement("td");
                        cas4.innerText = partie.difficulte;
                        let cas5 = document.createElement("td");
                        cas5.innerText = partie.tempsReaction;
                        let cas6 = document.createElement("td");
                        cas6.innerText = partie.date;
                        ligne.appendChild(cas1);
                        ligne.appendChild(cas2);
                        ligne.appendChild(cas3);
                        ligne.appendChild(cas4);
                        ligne.appendChild(cas5);
                        ligne.appendChild(cas6);
                        table.appendChild(ligne);
                    }
                }
            }
        }
        if(jeu === "vraifaux"){
            let tr = document.createElement("tr");
            let th1 = document.createElement("th");
            th1.innerText = "Vrai ou Faux";
            let th2 = document.createElement("th");
            th2.innerText = "Pseudonyme";
            let th3 = document.createElement("th");
            th3.innerText = "Score";
            let th4 = document.createElement("th");
            th4.innerText = "Date de la partie";
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            table.appendChild(tr);
            if(pseudo.length == 0){
                for (const partie of tab){
                    if(partie.jeu === "vraifaux"){
                        let ligne = document.createElement("tr");
                        ligne.style.backgroundColor = "lightgrey";
                        let cas1 = document.createElement("td");
                        let cas2 = document.createElement("td");
                        cas2.innerText = partie.pseudo;
                        let cas3 = document.createElement("td");
                        cas3.innerText = partie.score;
                        let cas4 = document.createElement("td");
                        cas4.innerText = partie.date;
                        ligne.appendChild(cas1);
                        ligne.appendChild(cas2);
                        ligne.appendChild(cas3);
                        ligne.appendChild(cas4);
                        table.appendChild(ligne);
                    }
                }
            }
            else{
                for (const partie of tab){
                    if(partie.jeu === "vraifaux" && partie.pseudo === pseudo){
                        let ligne = document.createElement("tr");
                        ligne.style.backgroundColor = "lightgrey";
                        let cas1 = document.createElement("td");
                        let cas2 = document.createElement("td");
                        cas2.innerText = partie.pseudo;
                        let cas3 = document.createElement("td");
                        cas3.innerText = partie.score;
                        let cas4 = document.createElement("td");
                        cas4.innerText = partie.date;
                        ligne.appendChild(cas1);
                        ligne.appendChild(cas2);
                        ligne.appendChild(cas3);
                        ligne.appendChild(cas4);
                        table.appendChild(ligne);
                    }
                }
            }
        }
        if(jeu === "intru"){
            let tr = document.createElement("tr");
            let th1 = document.createElement("th");
            th1.innerText = "Jeu de l'intru";
            let th2 = document.createElement("th");
            th2.innerText = "Pseudonyme";
            let th3 = document.createElement("th");
            th3.innerText = "Score";
            let th4 = document.createElement("th");
            th4.innerText = "Niveau";
            let th5 = document.createElement("th");
            th5.innerText = "Date de la partie";
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            tr.appendChild(th5);
            table.appendChild(tr);
            if(pseudo.length == 0){
                if(victoire == "2"){
                    for (const partie of tab){
                        if(partie.jeu === "intru"){
                            let ligne = document.createElement("tr");
                            if(partie.victoire == "1"){
                                ligne.style.backgroundColor = "#4CAF50";
                            }
                            else{
                                ligne.style.backgroundColor = "#f44336";
                            }
                            let cas1 = document.createElement("td");
                            let cas2 = document.createElement("td");
                            cas2.innerText = partie.pseudo;
                            let cas3 = document.createElement("td");
                            cas3.innerText = partie.score;
                            let cas4 = document.createElement("td");
                            cas4.innerText = partie.level;
                            let cas5 = document.createElement("td");
                            cas5.innerText = partie.date;
                            ligne.appendChild(cas1);
                            ligne.appendChild(cas2);
                            ligne.appendChild(cas3);
                            ligne.appendChild(cas4);
                            ligne.appendChild(cas5);
                            table.appendChild(ligne);
                        }
                    }
                }
                else{
                    for (const partie of tab){
                        if(partie.jeu === "intru" && partie.victoire == victoire){
                            let ligne = document.createElement("tr");
                            if(partie.victoire == "1"){
                                ligne.style.backgroundColor = "#4CAF50";
                            }
                            else{
                                ligne.style.backgroundColor = "#f44336";
                            }
                            let cas1 = document.createElement("td");
                            let cas2 = document.createElement("td");
                            cas2.innerText = partie.pseudo;
                            let cas3 = document.createElement("td");
                            cas3.innerText = partie.score;
                            let cas4 = document.createElement("td");
                            cas4.innerText = partie.level;
                            let cas5 = document.createElement("td");
                            cas5.innerText = partie.date;
                            ligne.appendChild(cas1);
                            ligne.appendChild(cas2);
                            ligne.appendChild(cas3);
                            ligne.appendChild(cas4);
                            ligne.appendChild(cas5);
                            table.appendChild(ligne);
                        }
                    }
                }
            }
            else{
                if(victoire == "2"){
                    for (const partie of tab){
                        if(partie.jeu === "intru" && partie.pseudo === pseudo){
                            let ligne = document.createElement("tr");
                            if(partie.victoire == "1"){
                                ligne.style.backgroundColor = "#4CAF50";
                            }
                            else{
                                ligne.style.backgroundColor = "#f44336";
                            }
                            let cas1 = document.createElement("td");
                            let cas2 = document.createElement("td");
                            cas2.innerText = partie.pseudo;
                            let cas3 = document.createElement("td");
                            cas3.innerText = partie.score;
                            let cas4 = document.createElement("td");
                            cas4.innerText = partie.level;
                            let cas5 = document.createElement("td");
                            cas5.innerText = partie.date;
                            ligne.appendChild(cas1);
                            ligne.appendChild(cas2);
                            ligne.appendChild(cas3);
                            ligne.appendChild(cas4);
                            ligne.appendChild(cas5);
                            table.appendChild(ligne);
                        }
                    }
                }
                else{
                    for (const partie of tab){
                        if(partie.jeu === "intru" && partie.victoire == victoire && partie.pseudo === pseudo){
                            let ligne = document.createElement("tr");
                            if(partie.victoire == "1"){
                                ligne.style.backgroundColor = "#4CAF50";
                            }
                            else{
                                ligne.style.backgroundColor = "#f44336";
                            }
                            let cas1 = document.createElement("td");
                            let cas2 = document.createElement("td");
                            cas2.innerText = partie.pseudo;
                            let cas3 = document.createElement("td");
                            cas3.innerText = partie.score;
                            let cas4 = document.createElement("td");
                            cas4.innerText = partie.level;
                            let cas5 = document.createElement("td");
                            cas5.innerText = partie.date;
                            ligne.appendChild(cas1);
                            ligne.appendChild(cas2);
                            ligne.appendChild(cas3);
                            ligne.appendChild(cas4);
                            ligne.appendChild(cas5);
                            table.appendChild(ligne);
                        }
                    }
                }
            }
        }
    }
}

function creerClassement(jeu,pseudo,tab){
    let table = document.getElementById("result");
    table.innerHTML = "";
    if(jeu === "couleur"){
            let tr = document.createElement("tr");
            let th1 = document.createElement("th");
            th1.innerText = "Jeu des couleurs";
            let th2 = document.createElement("th");
            th2.innerText = "Pseudonyme";
            let th3 = document.createElement("th");
            th3.innerText = "Score";
            let th4 = document.createElement("th");
            th4.innerText = "Date de la partie";
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            table.appendChild(tr);
            if(pseudo.length == 0){
                for (const partie of tab["couleur"]){
                    if(partie.jeu === "couleur"){
                        let ligne = document.createElement("tr");
                        ligne.style.backgroundColor = "lightgrey";
                        let cas1 = document.createElement("td");
                        let cas2 = document.createElement("td");
                        cas2.innerText = partie.pseudo;
                        let cas3 = document.createElement("td");
                        cas3.innerText = partie.score;
                        let cas4 = document.createElement("td");
                        cas4.innerText = partie.date;
                        ligne.appendChild(cas1);
                        ligne.appendChild(cas2);
                        ligne.appendChild(cas3);
                        ligne.appendChild(cas4);
                        table.appendChild(ligne);
                    }
                }
            }
            else{
                for (const partie of tab["couleur"]){
                    if(partie.jeu === "couleur" && partie.pseudo === pseudo){
                        let ligne = document.createElement("tr");
                        ligne.style.backgroundColor = "lightgrey";
                        let cas1 = document.createElement("td");
                        let cas2 = document.createElement("td");
                        cas2.innerText = partie.pseudo;
                        let cas3 = document.createElement("td");
                        cas3.innerText = partie.score;
                        let cas4 = document.createElement("td");
                        cas4.innerText = partie.date;
                        ligne.appendChild(cas1);
                        ligne.appendChild(cas2);
                        ligne.appendChild(cas3);
                        ligne.appendChild(cas4);
                        table.appendChild(ligne);
                    }
                }
            }
    }
    if(jeu === "demineur"){
            let tr = document.createElement("tr");
            let th1 = document.createElement("th");
            th1.innerText = "Démineur";
            let th2 = document.createElement("th");
            th2.innerText = "Pseudonyme";
            let th3 = document.createElement("th");
            th3.innerText = "Temps";
            let th4 = document.createElement("th");
            th4.innerText = "Date de la partie";
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            table.appendChild(tr);
            if(pseudo.length == 0){
                for (const partie of tab["demineur"]){
                    if(partie.jeu === "demineur" && partie.victoire == "1"){
                        let ligne = document.createElement("tr");
                        ligne.style.backgroundColor = "#4CAF50";
                        let cas1 = document.createElement("td");
                        let cas2 = document.createElement("td");
                        cas2.innerText = partie.pseudo;
                        let cas3 = document.createElement("td");
                        cas3.innerText = partie.temps;
                        let cas4 = document.createElement("td");
                        cas4.innerText = partie.date;
                        ligne.appendChild(cas1);
                        ligne.appendChild(cas2);
                        ligne.appendChild(cas3);
                        table.appendChild(ligne);
                    }
                }
            }
            else{
                for (const partie of tab["demineur"]){
                    if(partie.jeu === "demineur" && partie.victoire == "1" && partie.pseudo === pseudo){
                        let ligne = document.createElement("tr");
                        ligne.style.backgroundColor = "#4CAF50";
                        let cas1 = document.createElement("td");
                        let cas2 = document.createElement("td");
                        cas2.innerText = partie.pseudo;
                        let cas3 = document.createElement("td");
                        cas3.innerText = partie.temps;
                        let cas4 = document.createElement("td");
                        cas4.innerText = partie.date;
                        ligne.appendChild(cas1);
                        ligne.appendChild(cas2);
                        ligne.appendChild(cas3);
                        table.appendChild(ligne);
                    }
                }
            }
    }
    if(jeu === "enigme"){
            let tr = document.createElement("tr");
            let th1 = document.createElement("th");
            th1.innerText = "Enigme";
            let th2 = document.createElement("th");
            th2.innerText = "Pseudonyme";
            let th3 = document.createElement("th");
            th3.innerText = "Score";
            let th4 = document.createElement("th");
            th4.innerText = "Date de la partie";
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            table.appendChild(tr);
            if(pseudo.length == 0){
               for (const partie of tab["enigme"]){
                    if(partie.jeu === "enigme" && partie.victoire == "1"){
                        let ligne = document.createElement("tr");
                        ligne.style.backgroundColor = "#4CAF50";
                        let cas1 = document.createElement("td");
                        let cas2 = document.createElement("td");
                        cas2.innerText = partie.pseudo;
                        let cas3 = document.createElement("td");
                        cas3.innerText = partie.score;
                        let cas4 = document.createElement("td");
                        cas4.innerText = partie.date;
                        ligne.appendChild(cas1);
                        ligne.appendChild(cas2);
                        ligne.appendChild(cas3);
                        ligne.appendChild(cas4);
                        table.appendChild(ligne);
                    }
                }     
            }
            else{
                for (const partie of tab["enigme"]){
                    if(partie.jeu === "enigme" && partie.victoire == "1" && partie.pseudo === pseudo){
                        let ligne = document.createElement("tr");
                        ligne.style.backgroundColor = "#4CAF50";                            
                        let cas1 = document.createElement("td");
                        let cas2 = document.createElement("td");
                        cas2.innerText = partie.pseudo;
                        let cas3 = document.createElement("td");
                        cas3.innerText = partie.score;
                        let cas4 = document.createElement("td");
                        cas4.innerText = partie.date;
                        ligne.appendChild(cas1);
                        ligne.appendChild(cas2);
                        ligne.appendChild(cas3);
                        ligne.appendChild(cas4);
                        table.appendChild(ligne);
                    }
                }
            }
    }
    if(jeu === "equation"){
            let tr = document.createElement("tr");
            let th1 = document.createElement("th");
            th1.innerText = "Equation";
            let th2 = document.createElement("th");
            th2.innerText = "Pseudonyme";
            let th3 = document.createElement("th");
            th3.innerText = "Score";
            let th4 = document.createElement("th");
            th4.innerText = "Date de la partie";
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            table.appendChild(tr);
            if(pseudo.length == 0){
                for (const partie of tab["equation"]){
                    if(partie.jeu === "equation" && partie.victoire == "1"){
                        let ligne = document.createElement("tr");
                        ligne.style.backgroundColor = "#4CAF50";
                        let cas1 = document.createElement("td");
                        let cas2 = document.createElement("td");
                        cas2.innerText = partie.pseudo;
                        let cas3 = document.createElement("td");
                        cas3.innerText = partie.score;
                        let cas4 = document.createElement("td");
                        cas4.innerText = partie.date;
                        ligne.appendChild(cas1);
                        ligne.appendChild(cas2);
                        ligne.appendChild(cas3);
                        ligne.appendChild(cas4);
                        table.appendChild(ligne);
                    }
                }
            }
            else{
                for (const partie of tab["equation"]){
                    if(partie.jeu === "equation" && partie.victoire == "1" && partie.pseudo === pseudo){
                        let ligne = document.createElement("tr");
                        if(partie.victoire == "1"){
                            ligne.style.backgroundColor = "#4CAF50";
                        }
                        else{
                            ligne.style.backgroundColor = "#f44336";
                        }
                        let cas1 = document.createElement("td");
                        let cas2 = document.createElement("td");
                        cas2.innerText = partie.pseudo;
                        let cas3 = document.createElement("td");
                        cas3.innerText = partie.score;
                        let cas4 = document.createElement("td");
                        cas4.innerText = partie.date;
                        ligne.appendChild(cas1);
                        ligne.appendChild(cas2);
                        ligne.appendChild(cas3);
                        ligne.appendChild(cas4);
                        table.appendChild(ligne);
                    }
                }
            }
    }
    if(jeu === "nonogram"){
            let tr = document.createElement("tr");
            let th1 = document.createElement("th");
            th1.innerText = "Nonogram";
            let th2 = document.createElement("th");
            th2.innerText = "Pseudonyme";
            let th3 = document.createElement("th");
            th3.innerText = "Temps";
            let th4 = document.createElement("th");
            th4.innerText = "Difficulté";
            let th5 = document.createElement("th");
            th5.innerText = "Erreur";
            let th6 = document.createElement("th");
            th6.innerText = "Date de la partie";
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            tr.appendChild(th5);
            tr.appendChild(th6);
            table.appendChild(tr);
            if(pseudo.length == 0){
                for (const partie of tab["nonogram"]){
                    if(partie.jeu === "nonogram" && partie.victoire == "1"){
                        let ligne = document.createElement("tr");
                        ligne.style.backgroundColor = "#4CAF50";
                        let cas1 = document.createElement("td");
                        let cas2 = document.createElement("td");
                        cas2.innerText = partie.pseudo;
                        let cas3 = document.createElement("td");
                        cas3.innerText = partie.temps;
                        let cas4 = document.createElement("td");
                        cas4.innerText = partie.difficulte;
                        let cas5 = document.createElement("td");
                        cas5.innerText = partie.erreur;
                        let cas6 = document.createElement("td");
                        cas6.innerText = partie.date;
                        ligne.appendChild(cas1);
                        ligne.appendChild(cas2);
                        ligne.appendChild(cas3);
                        ligne.appendChild(cas4);
                        ligne.appendChild(cas5);
                        ligne.appendChild(cas6);
                        table.appendChild(ligne);
                    }
                }
            }
            else{
                for (const partie of tab["nonogram"]){
                    if(partie.jeu === "nonogram" && partie.victoire == "1" && partie.pseudo === pseudo){
                        let ligne = document.createElement("tr");
                         ligne.style.backgroundColor = "#4CAF50";
                        let cas1 = document.createElement("td");
                        let cas2 = document.createElement("td");
                        cas2.innerText = partie.pseudo;
                        let cas3 = document.createElement("td");
                        cas3.innerText = partie.temps;
                        let cas4 = document.createElement("td");
                        cas4.innerText = partie.difficulte;
                        let cas5 = document.createElement("td");
                        cas5.innerText = partie.erreur;
                        let cas6 = document.createElement("td");
                        cas6.innerText = partie.date;
                        ligne.appendChild(cas1);
                        ligne.appendChild(cas2);
                        ligne.appendChild(cas3);
                        ligne.appendChild(cas4);
                        ligne.appendChild(cas5);
                        ligne.appendChild(cas6);
                        table.appendChild(ligne);
                    }
                }
            }
    }
    if(jeu === "simon"){
            let tr = document.createElement("tr");
            let th1 = document.createElement("th");
            th1.innerText = "Simon";
            let th2 = document.createElement("th");
            th2.innerText = "Pseudonyme";
            let th3 = document.createElement("th");
            th3.innerText = "Score";
            let th4 = document.createElement("th");
            th4.innerText = "Difficulté";
            let th5 = document.createElement("th");
            th5.innerText = "Temps de réaction";
            let th6 = document.createElement("th");
            th6.innerText = "Date de la partie";
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            tr.appendChild(th5);
            tr.appendChild(th6);
            table.appendChild(tr);
            if(pseudo.length == 0){
                for (const partie of tab["simon"]){
                    if(partie.jeu === "simon"){
                        let ligne = document.createElement("tr");
                        ligne.style.backgroundColor = "lightgrey";
                        let cas1 = document.createElement("td");
                        let cas2 = document.createElement("td");
                        cas2.innerText = partie.pseudo;
                        let cas3 = document.createElement("td");
                        cas3.innerText = partie.score;
                        let cas4 = document.createElement("td");
                        cas4.innerText = partie.difficulte;
                        let cas5 = document.createElement("td");
                        cas5.innerText = partie.tempsReaction;
                        let cas6 = document.createElement("td");
                        cas6.innerText = partie.date;
                        ligne.appendChild(cas1);
                        ligne.appendChild(cas2);
                        ligne.appendChild(cas3);
                        ligne.appendChild(cas4);
                        ligne.appendChild(cas5);
                        ligne.appendChild(cas6);
                        table.appendChild(ligne);
                    }
                }
            } 
            else{
                for (const partie of tab["simon"]){
                    if(partie.jeu === "simon" && partie.pseudo === pseudo){
                        let ligne = document.createElement("tr");
                        ligne.style.backgroundColor = "lightgrey";
                        let cas1 = document.createElement("td");
                        let cas2 = document.createElement("td");
                        cas2.innerText = partie.pseudo;
                        let cas3 = document.createElement("td");
                        cas3.innerText = partie.score;
                        let cas4 = document.createElement("td");
                        cas4.innerText = partie.difficulte;
                        let cas5 = document.createElement("td");
                        cas5.innerText = partie.tempsReaction;
                        let cas6 = document.createElement("td");
                        cas6.innerText = partie.date;
                        ligne.appendChild(cas1);
                        ligne.appendChild(cas2);
                        ligne.appendChild(cas3);
                        ligne.appendChild(cas4);
                        ligne.appendChild(cas5);
                        ligne.appendChild(cas6);
                        table.appendChild(ligne);
                    }
                }
            }
    }
    if(jeu === "vraifaux"){
            let tr = document.createElement("tr");
            let th1 = document.createElement("th");
            th1.innerText = "Vrai ou Faux";
            let th2 = document.createElement("th");
            th2.innerText = "Pseudonyme";
            let th3 = document.createElement("th");
            th3.innerText = "Score";
            let th4 = document.createElement("th");
            th4.innerText = "Date de la partie";
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            table.appendChild(tr);
            if(pseudo.length == 0){
                for (const partie of tab["vraifaux"]){
                    if(partie.jeu === "vraifaux"){
                        let ligne = document.createElement("tr");
                        ligne.style.backgroundColor = "lightgrey";
                        let cas1 = document.createElement("td");
                        let cas2 = document.createElement("td");
                        cas2.innerText = partie.pseudo;
                        let cas3 = document.createElement("td");
                        cas3.innerText = partie.score;
                        let cas4 = document.createElement("td");
                        cas4.innerText = partie.date;
                        ligne.appendChild(cas1);
                        ligne.appendChild(cas2);
                        ligne.appendChild(cas3);
                        ligne.appendChild(cas4);
                        table.appendChild(ligne);
                    }
                }
            }
            else{
                for (const partie of tab["vraifaux"]){
                    if(partie.jeu === "vraifaux" && partie.pseudo === pseudo){
                        let ligne = document.createElement("tr");
                        ligne.style.backgroundColor = "lightgrey";
                        let cas1 = document.createElement("td");
                        let cas2 = document.createElement("td");
                        cas2.innerText = partie.pseudo;
                        let cas3 = document.createElement("td");
                        cas3.innerText = partie.score;
                        let cas4 = document.createElement("td");
                        cas4.innerText = partie.date;
                        ligne.appendChild(cas1);
                        ligne.appendChild(cas2);
                        ligne.appendChild(cas3);
                        ligne.appendChild(cas4);
                        table.appendChild(ligne);
                    }
                }
            }
    }
    if(jeu === "intru"){
            let tr = document.createElement("tr");
            let th1 = document.createElement("th");
            th1.innerText = "Jeu de l'intru";
            let th2 = document.createElement("th");
            th2.innerText = "Pseudonyme";
            let th3 = document.createElement("th");
            th3.innerText = "Score";
            let th4 = document.createElement("th");
            th4.innerText = "Niveau";
            let th5 = document.createElement("th");
            th5.innerText = "Date de la partie";
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            tr.appendChild(th5);
            table.appendChild(tr);
            if(pseudo.length == 0){
                for (const partie of tab["intru"]){
                    if(partie.jeu === "intru" && partie.victoire == victoire){
                        let ligne = document.createElement("tr");
                        ligne.style.backgroundColor = "#4CAF50";
                        let cas1 = document.createElement("td");
                        let cas2 = document.createElement("td");
                        cas2.innerText = partie.pseudo;
                        let cas3 = document.createElement("td");
                        cas3.innerText = partie.score;
                        let cas4 = document.createElement("td");
                        cas4.innerText = partie.level;
                        let cas5 = document.createElement("td");
                        cas5.innerText = partie.date;
                        ligne.appendChild(cas1);
                        ligne.appendChild(cas2);
                        ligne.appendChild(cas3);
                        ligne.appendChild(cas4);
                        ligne.appendChild(cas5);
                        table.appendChild(ligne);
                    }
                }
            }
            else{
                for (const partie of tab["intru"]){
                    if(partie.jeu === "intru" && partie.victoire == victoire && partie.pseudo === pseudo){
                        let ligne = document.createElement("tr");
                        ligne.style.backgroundColor = "#4CAF50";
                        let cas1 = document.createElement("td");
                        let cas2 = document.createElement("td");
                        cas2.innerText = partie.pseudo;
                        let cas3 = document.createElement("td");
                        cas3.innerText = partie.score;
                        let cas4 = document.createElement("td");
                        cas4.innerText = partie.level;
                        let cas5 = document.createElement("td");
                        cas5.innerText = partie.date;
                        ligne.appendChild(cas1);
                        ligne.appendChild(cas2);
                        ligne.appendChild(cas3);
                        ligne.appendChild(cas4);
                        ligne.appendChild(cas5);
                        table.appendChild(ligne);
                    }
                }
            }
    }
}

function compareTemps(temps) {
  const [minutes, secondes] = temps.split("/").map(Number);
  return minutes * 60 + secondes;
}

function nomJeu(nom){
    if(nom === "couleur"){
        return "Jeu des couleurs";
    }
    if(nom === "demineur"){
        return "Démineur";
    }
    if(nom === "enigme"){
        return "Enigme";
    }
    if(nom === "equation"){
        return "Equation";
    }
    if(nom === "nonogram"){
        return "Nonogram";
    }
    if(nom === "simon"){
        return "Simon";
    }
    if(nom === "vraifaux"){
        return "Vrai ou Faux";   
    }
    if(nom === "intru"){
        return "Jeu de l'intru";
    }
}

function compareDate(string) {
    const [date, temps] = string.split(" ");
    const [jour, mois, annee] = date.split("/");
    const [minute, seconde] = temps.split(":");

    return new Date(annee, mois - 1, jour, minute, seconde);
}

main();
document.getElementById("valider").addEventListener("click",main);
document.getElementById("retourMenu").addEventListener("click",()=>{window.location.href = "../../Menu/html/menu.html"});
document.getElementById("form").addEventListener("submit", function (e) {e.preventDefault();});
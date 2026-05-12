// Déclaration d'une variable globale pour stocker le nom d'utilisateur
let username = "Joueur";

// Ajout d'un écouteur d'événement pour exécuter le code une fois que le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', () => {
    // Affiche le choix des jeux directement
    const mainContent = document.getElementById('main-content'); // Conteneur du choix des jeux
    mainContent.style.display = 'block';
});

// Fonction pour ouvrir un jeu spécifique
function openGame(gameName) {
    // Redirige vers une autre page en passant le nom d'utilisateur dans l'URL
    window.location.href = `${gameName}.html?username=${username}`;
}

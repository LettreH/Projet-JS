// --- SELECTION ---
const monFormulaire = document.getElementById('form-prenom');
const champPrenom = document.getElementById('prenom');
const messageErreur = document.getElementById('message-erreur');

// --- LA FONCTION DE BASCULEMENT ---
function afficherInterface(prenom) {
    // change de page 
    window.location.href = "liste.html";     
}

// --- VERIFICATION AU DEMARRAGE ---
const nomStocke = localStorage.getItem("nomUtilisateur");

if (nomStocke) {
    // Si on a déjà le nom, lance direct l'interface
    afficherInterface(nomStocke);
}

// --- L'ACTION ---
monFormulaire.addEventListener('submit', function(event) {
    
    event.preventDefault();
    
    const prenomSaisi = champPrenom.value.trim();

    // --- LA LOGIQUE ---
    // Vérification 1 : champ vide
    if (prenomSaisi === "") {
        messageErreur.textContent = "⚠️ Veuillez entrer votre prénom";
        return;
    }

    // Vérification 2 : au moins 2 caractères
    if (prenomSaisi.length < 2) {
        messageErreur.textContent = "⚠️ Le prénom doit contenir au moins 2 caractères";
        return;
    }

    // Si tout est bon, sauvegarde et change de page
    messageErreur.textContent = ""; // Efface les erreurs précédentes
    localStorage.setItem("nomUtilisateur", prenomSaisi);
    afficherInterface(prenomSaisi);
});
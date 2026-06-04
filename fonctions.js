// FONCTIONS À TESTER

// 1. Vérifie si un prénom est valide
function prenomEstValide(prenom) {
    if (prenom === '' || prenom.length < 2) {
        return false;
    }
    return true;
}

// 2. Compte les tâches terminées
function compterTerminees(taches) {
    return taches.filter(tache => tache.is_complete === true).length;
}

// 3. Calcule le pourcentage de progression
function calculerPourcentage(terminees, total) {
    if (total === 0) {
        return 0;
    }
    return Math.round((terminees / total) * 100);
}

// On exporte les fonctions pour les tester
module.exports = { prenomEstValide, compterTerminees, calculerPourcentage };
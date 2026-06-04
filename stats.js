// =====================================================
// CALCULER ET AFFICHER LES STATISTIQUES
// =====================================================

function chargerStatistiques() {
    
    console.log("📊 Chargement des statistiques...");
    
    // On récupère toutes les tâches depuis l'API
    fetch('http://localhost:3000/todos')
        .then(response => response.json())
        .then(data => {
            
            // Les tâches sont dans data[0].todolist
            const taches = data[0].todolist;
            
            // 1️⃣ Calculer le TOTAL
            const total = taches.length;
            
            // 2️⃣ Compter les TERMINÉES
            const terminees = taches.filter(tache => tache.is_complete === true).length;
            
            // 3️⃣ Compter les À FAIRE
            const afaire = taches.filter(tache => tache.is_complete === false).length;
            
            console.log("Total:", total, "| Terminées:", terminees, "| À faire:", afaire);
            
            // Affiche les chiffres
            afficherStats(total, terminees, afaire);
        })
        .catch(error => {
            console.error("❌ Erreur :", error);
            alert("Erreur lors du chargement des statistiques");
        });
}

// =====================================================
// AFFICHER LES STATISTIQUES SUR LA PAGE
// =====================================================

function afficherStats(total, terminees, afaire) {
    
    // Met à jour les chiffres
    document.getElementById('total').textContent = total;
    document.getElementById('terminees').textContent = terminees;
    document.getElementById('afaire').textContent = afaire;
    
    // Calcule le pourcentage de progression
    let pourcentage = 0;
    if (total > 0) {
        pourcentage = Math.round((terminees / total) * 100);
    }
    
    // Met à jour la barre de progression
    const progressFill = document.getElementById('progress-fill');
    progressFill.style.width = pourcentage + '%';
    progressFill.textContent = pourcentage + '%';
}

// =====================================================
// VÉRIFICATION CONNEXION + LANCEMENT
// =====================================================

// Vérifie que l'utilisateur est connecté
const nomUtilisateur = localStorage.getItem("nomUtilisateur");
if (!nomUtilisateur) {
    window.location.href = "index.html";
}

// Lance le chargement des statistiques
chargerStatistiques();
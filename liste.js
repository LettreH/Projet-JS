// =====================================================
// CACHE DES TÂCHES (pour ne pas refetcher)
// =====================================================

let tachesEnCache = null;  // On stocke les tâches ici

// La fonction qui va chercher les tâches
function chargerLesToaches() {
    
    // Affiche un message de chargement
    console.log("🔄 Chargement des tâches...");
    
    // On utilise Fetch pour récupérer les données
    fetch('http://localhost:3000/todos')
        .then(response => response.json()) // Convertit la réponse en JSON
        .then(data => {
            console.log("✅ Tâches reçues :", data);
            tachesEnCache = data[0].todolist;  // ← On les stocke
            afficherLesToaches(data); // Affiche les tâches
        })
        .catch(error => {
            console.error("❌ Erreur :", error);
            alert("Erreur lors du chargement des tâches");
        });
}

// =====================================================
// 2️⃣ AFFICHER LES TÂCHES DYNAMIQUEMENT
// =====================================================

function afficherLesToaches(data) {
    
    // Récupère la liste HTML
    const taskList = document.getElementById('task-list');
    
    // Vide la liste (au cas où il y aurait déjà quelque chose)
    taskList.innerHTML = '';
    
    // Les tâches sont dans data[0].todolist
    const taches = data[0].todolist;
    
    // Boucle sur chaque tâche
    taches.forEach(tache => {
        
        // On crée une carte HTML pour chaque tâche
        const carte = creerCarteTache(tache);
        
        // On ajoute la carte à la liste
        taskList.appendChild(carte);
    });
}

// =====================================================
// 3️⃣ CRÉER UNE CARTE POUR CHAQUE TÂCHE
// =====================================================

function creerCarteTache(tache) {
    
    // On crée un élément <li> (liste item)
    const li = document.createElement('li');
    li.className = 'task-card';
    
    // Détermine la couleur du statut
    let couleurStatut = tache.is_complete ? '#27ae60' : '#ffc107';  // Vert si terminé, Jaune sinon
    let textStatut = tache.is_complete ? 'TERMINÉ' : 'À FAIRE';     // ← CHANGE "EN COURS" EN "À FAIRE"
    let classStatut = tache.is_complete ? 'termine' : 'a-faire';    // ← CHANGE "en-cours" EN "a-faire"
    
    // On construit le HTML de la carte
    li.innerHTML = `
        <div class="task-info">
            <div class="status-dot" style="background-color: ${couleurStatut};"></div>
            <div class="task-text-group">
                <span class="task-title">${tache.text}</span>
                <span class="task-date">${tache.created_at}</span>
            </div>
        </div>
        <div class="task-actions">
            <span class="badge ${classStatut}">${textStatut}</span>
            <button class="btn-detail" onclick="afficherDetails(${tache.id})">Détails</button>
        </div>
    `;
    
    return li;
}

// =====================================================
// 4️⃣ AFFICHER LES DÉTAILS D'UNE TÂCHE
// =====================================================

function afficherDetails(idTache) {
    console.log("Affichage des détails pour la tâche :", idTache);
    
    // On sauvegarde l'ID dans localStorage
    localStorage.setItem('tacheSelectionnee', idTache);
    
    // On redirige vers la page des détails
    window.location.href = 'details.html';
}

// =====================================================
// 5️⃣ LANCER LE CHARGEMENT QUAND LA PAGE CHARGE
// =====================================================

// Vérifie que l'utilisateur est connecté
const nomUtilisateur = localStorage.getItem("nomUtilisateur");
if (!nomUtilisateur) {
    window.location.href = "index.html";
}

// Lance le chargement des tâches
chargerLesToaches();

// =====================================================
// 6️⃣ AJOUTER UNE NOUVELLE TÂCHE
// =====================================================

const btnAjouter = document.getElementById('add-task-btn');
const inputTache = document.getElementById('task-input');

btnAjouter.addEventListener('click', function() {
    
    const nouvelleTache = inputTache.value.trim();
    
    // Vérifie que le champ n'est pas vide
    if (nouvelleTache === '') {
        alert('⚠️ Veuillez entrer une tâche');
        return;
    }
    
    // Vérifie que la tâche fait au moins 3 caractères
    if (nouvelleTache.length < 3) {
        alert('⚠️ La tâche doit faire au moins 3 caractères');
        return;
    }
    
    console.log("➕ Ajout de la tâche :", nouvelleTache);
    
    // On crée l'objet à envoyer à l'API
    // 👇 IMPORTANT : statut "todo" par défaut
    const nouvelleTacheObj = {
        text: nouvelleTache,
        status: "todo",      // ✅ STATUT "À FAIRE" PAR DÉFAUT
        is_complete: false
    };
    
    // On envoie les données à l'API (POST)
    fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nouvelleTacheObj)
    })
    .then(response => response.json())
    .then(data => {
    console.log("✅ Tâche ajoutée !", data);
    inputTache.value = '';  // Vide l'input
    
    // ✅ Ajoute au cache sans refetcher
    if (tachesEnCache) {
        tachesEnCache.push(data);  // Ajoute la nouvelle tâche
    }
    
    // Recharge la liste
    chargerLesToaches();
})
    .catch(error => {
        console.error("❌ Erreur lors de l'ajout :", error);
        alert("Erreur lors de l'ajout de la tâche");
    });
});
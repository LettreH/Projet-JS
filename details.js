// =====================================================
// AFFICHER LES DÉTAILS COMPLETS D'UNE TÂCHE
// =====================================================

function afficherDetailsComplete() {
    
    const idTache = localStorage.getItem('tacheSelectionnee');
    
    console.log("📋 Affichage des détails pour la tâche ID:", idTache);
    
    // ✅ On récupère les tâches de la liste.html (cache)
    fetch('https://projet-js-neon.vercel.app/todos')
        .then(response => response.json())
        .then(data => {
            const taches = data[0].todolist;
            const tache = taches.find(t => t.id == idTache);
            
            if (tache) {
                afficherDetailsHTML(tache);
            } else {
                document.getElementById('details-container').innerHTML = '<p>❌ Tâche non trouvée</p>';
            }
        })
        .catch(error => console.error("❌ Erreur :", error));
}

// =====================================================
// AFFICHER LE HTML AVEC LES BOUTONS D'ACTION
// =====================================================

function afficherDetailsHTML(tache) {
    
    const couleur = tache.is_complete ? '#27ae60' : '#ffc107';
    const statut = tache.is_complete ? '✅ TERMINÉ' : '⏳ À FAIRE';
    const tags = (tache.Tags || []).join(', ') || 'Aucun tag';
    
    // Boutons différents selon le statut
    let boutonAction = '';
    if (tache.is_complete) {
        // Si terminé : bouton pour réouvrir
        boutonAction = `<button class="btn-action btn-reouv" onclick="rouvrirTache(${tache.id})">🔓 Réouvrir</button>`;
    } else {
        // Si à faire : bouton pour terminer
        boutonAction = `<button class="btn-action btn-terminer" onclick="terminerTache(${tache.id})">✅ Marquer comme terminé</button>`;
    }
    
    const html = `
        <div class="detail-header">
            <h2>${tache.text}</h2>
            <span class="detail-status" style="background-color: ${couleur};">${statut}</span>
        </div>
        
        <div class="detail-info">
            <p><strong>ID :</strong> ${tache.id}</p>
            <p><strong>Date :</strong> ${tache.created_at}</p>
            <p><strong>Tags :</strong> ${tags}</p>
        </div>
        
        <div class="detail-actions">
            ${boutonAction}
            <button class="btn-action btn-supprimer" onclick="supprimerTache(${tache.id})">🗑️ Supprimer</button>
        </div>
    `;
    
    document.getElementById('details-container').innerHTML = html;
}

// =====================================================
// 1️⃣ MARQUER UNE TÂCHE COMME TERMINÉE
// =====================================================

function terminerTache(idTache) {
    
    console.log("✅ Marquer comme terminé la tâche :", idTache);
    
    // On envoie une demande PUT à l'API pour mettre à jour
    fetch(`https://projet-js-neon.vercel.app/todos/${idTache}`, {
        method: 'PUT',  // Ou PATCH selon l'API
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            is_complete: true  // On marque comme terminé
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("✅ Tâche terminée !", data);
        alert('✅ Tâche marquée comme terminée !');
        afficherDetailsComplete();  // Recharge les détails
    })
    .catch(error => {
        console.error("❌ Erreur :", error);
        alert('❌ Erreur lors de la mise à jour');
    });
}

// =====================================================
// 2️⃣ RÉOUVRIR UNE TÂCHE
// =====================================================

function rouvrirTache(idTache) {
    
    console.log("🔓 Réouvrir la tâche :", idTache);
    
    // On envoie une demande PUT pour la réouvrir
    fetch(`https://projet-js-neon.vercel.app/todos/${idTache}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            is_complete: false  // On marque comme non terminé
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("🔓 Tâche réouverte !", data);
        alert('🔓 Tâche réouverte !');
        afficherDetailsComplete();  // Recharge les détails
    })
    .catch(error => {
        console.error("❌ Erreur :", error);
        alert('❌ Erreur lors de la réouverture');
    });
}

// =====================================================
// 3️⃣ SUPPRIMER UNE TÂCHE
// =====================================================

function supprimerTache(idTache) {
    
    // Demande une confirmation avant de supprimer
    if (!confirm('⚠️ Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
        return;
    }
    
    console.log("🗑️ Suppression de la tâche :", idTache);
    
    // On envoie une demande DELETE à l'API
    fetch(`https://projet-js-neon.vercel.app/todos/${idTache}`, {
        method: 'DELETE'
    })
    .then(response => {
        console.log("Status:", response.status);
        console.log("OK:", response.ok);
        
        if (response.ok) {
            console.log("✅ Supprimée!");
            alert('✅ Tâche supprimée !');
            window.location.href = 'liste.html';
        } else {
            throw new Error('Erreur suppression');
        }
    })
    .catch(error => {
        console.error("❌ Erreur:", error);
        alert('❌ Erreur lors de la suppression');
    });
}

// =====================================================
// LANCER AU CHARGEMENT DE LA PAGE
// =====================================================

afficherDetailsComplete();
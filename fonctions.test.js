const { prenomEstValide, compterTerminees, calculerPourcentage } = require('./fonctions');

// TEST 1 : Validation du prénom
test('Un prénom vide est invalide', () => {
    expect(prenomEstValide('')).toBe(false);
});

test('Un prénom normal est valide', () => {
    expect(prenomEstValide('Alice')).toBe(true);
});

// TEST 2 : Compter les tâches terminées
test('Compte correctement les tâches terminées', () => {
    const taches = [
        { id: 1, is_complete: true },
        { id: 2, is_complete: false },
        { id: 3, is_complete: true }
    ];
    expect(compterTerminees(taches)).toBe(2);
});

// TEST 3 : Calcul du pourcentage
test('Calcule 50% correctement', () => {
    expect(calculerPourcentage(5, 10)).toBe(50);
});

test('Retourne 0 si pas de tâches', () => {
    expect(calculerPourcentage(0, 0)).toBe(0);
});
function affichervote(client){
    const elements = document.getElementsByClassName('votes')
    if (elements[0].style.display === 'none'){
        for (let i = 0; i < elements.length; i++) {
            if (client === 'all') {
                elements[i].style.display = 'block';
            }
        }
    }
    else{
        for (let i = 0; i < elements.length; i++) {
            if (client === 'all') {
                elements[i].style.display = 'none';
            }
        }
    }
}

function voter(joueur) {
    fetch('/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ joueur: joueur })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            mettreAJourVotes(); // Mise à jour immédiate
        }
    });
}

function mettreAJourVotes() {
    fetch('/get_votes')
    .then(res => res.json())
    .then(data => {
        document.getElementById('Joueur1').textContent = data.votes.Joueur1;
        document.getElementById('Joueur2').textContent = data.votes.Joueur2;
        document.getElementById('votant').textContent = data.user_vote || "Personne";

        // Désactiver bouton du joueur déjà voté
        document.getElementById('v1').disabled = data.user_vote === 'Joueur1';
        document.getElementById('v2').disabled = data.user_vote === 'Joueur2';
    });
}

// Met à jour les votes toutes les 3 secondes
setInterval(mettreAJourVotes, 1000);
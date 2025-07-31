from flask import Flask, render_template, request, session, jsonify
from datetime import timedelta

lg = Flask(__name__)
lg.secret_key = 'cle_super_secrete'
lg.permanent_session_lifetime = timedelta(days=1)

votes = {'Joueur1': 0, 'Joueur2': 0}

@lg.route('/')
def loup_garou():
    session.permanent = True
    user_vote = session.get('vote', None)
    return render_template('loup-garou.html', user_vote=user_vote)

@lg.route('/vote', methods=['POST'])
def vote():
    joueur = request.json.get('joueur')
    if joueur not in votes:
        return jsonify({'error': 'Joueur inconnu'}), 400

    ancien_vote = session.get('vote')
    if ancien_vote == joueur:
        return jsonify({'success': False, 'message': 'Déjà voté pour ce joueur'})

    # Retirer ancien vote
    if ancien_vote in votes:
        votes[ancien_vote] = max(0, votes[ancien_vote] - 1)

    # Ajouter nouveau vote
    votes[joueur] += 1
    session['vote'] = joueur

    return jsonify({'success': True})


@lg.route('/get_votes')
def get_votes():
    return jsonify({
        'votes': votes,
        'user_vote': session.get('vote')
    })

if __name__ == '__main__':
    lg.run(debug=True)

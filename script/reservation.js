/**
 * Created by Carolina & Virginie
 * Site : Voyages et Aventures
 */
'use strict';

var formulaire;

/**
 * Synchronisation
 */
$(function () {
    console.log('DOM Construit');
    formulaire = $('#form_resa');
    // Brancher le listener
    formulaire.on('submit', valider_formulaire);
});

/**
 * Fonction de validation des champs du formulaire de reservation
 * @param event
 */
function valider_formulaire(event) {
    console.log('Tentative de soumission');
    var form_valide = false;

    // Test du champ NOM
    var input_nom = $('#lastname');
    var nom_valide = input_nom.val().trim().length >= 1;
    console.log(input_nom);
    console.log(nom_valide);
    if (!nom_valide) { // si la valeur du champ n'est pas valide < a 1 caractere
        form_valide = false;
        input_nom.addClass('error');
        if (!input_nom.next().is('p.error_msg')) {
            input_nom.after('<p class="error_msg">Le nom doit contenir au moins 1 caractere valide</p>')
        }
    } else {
        input_nom.removeClass('error');
        if (input_nom.next().is('p.error_msg')) {
            input_nom.next().remove();
        }
    }

    // Test du champ ADRESSE

    if (!form_est_valide) {
        console.log('Soumission interrompue');
        event.preventDefault();
    }
}
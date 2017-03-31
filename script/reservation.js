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
            input_nom.after('<p class="error_msg">Le nom doit contenir au moins 1 caractere valide.</p>')
        }
    } else {
        input_nom.removeClass('error');
        if (input_nom.next().is('p.error_msg')) {
            input_nom.next().remove();
        }
    }

    // Test du champ PRENOM
    var input_prenom = $('#firstname');
    var prenom_valide = input_prenom.val().trim().length >= 1;
    console.log(input_prenom);
    console.log(prenom_valide);
    if (!prenom_valide) { // si la valeur du champ n'est pas valide < a 1 caractere
        form_valide = false;
        input_prenom.addClass('error');
        if (!input_prenom.next().is('p.error_msg')) {
            input_prenom.after('<p class="error_msg">Le prenom doit contenir au moins 1 caractere valide.</p>')
        }
    } else {
        input_prenom.removeClass('error');
        if (input_prenom.next().is('p.error_msg')) {
            input_prenom.next().remove();
        }
    }

    // Test du champ COURRIEL
    var input_courriel = $('#courriel');
    var courriel_valide = input_courriel.val().trim().length >= 6;
    console.log(input_courriel);
    console.log(courriel_valide);
    if (!courriel_valide) { // si la valeur du champ n'est pas valide < a 1 caractere
        form_valide = false;
        input_courriel.addClass('error');
        if (!input_courriel.next().is('p.error_msg')) {
            input_courriel.after('<p class="error_msg">Le courriel saisi n\'est pas valide.</p>')
        }
    } else {
        input_courriel.removeClass('error');
        if (input_courriel.next().is('p.error_msg')) {
            input_courriel.next().remove();
        }
    }
    // Test du champ TELEPHONE

    // Test du champ ADRESSE
    var input_adresse = $('#adresse');
    var adresse_valide = input_adresse.val().trim().length >= 10;
    console.log(input_adresse);
    console.log(adresse_valide);
    if (!adresse_valide) { // si la valeur du champ n'est pas valide < a 1 caractere
        form_valide = false;
        input_adresse.addClass('error');
        if (!input_adresse.next().is('p.error_msg')) {
            input_adresse.after('<p class="error_msg">L\'adresse doit contenir au moins 10 caracteres valides.</p>')
        }
    } else {
        input_adresse.removeClass('error');
        if (input_adresse.next().is('p.error_msg')) {
            input_adresse.next().remove();
        }
    }

    // Si le formulaire n'est pas valide, on intercepte la soumission
    if ( ! form_valide) {
        console.log('Soumission interrompue');
        event.preventDefault();
    }
}
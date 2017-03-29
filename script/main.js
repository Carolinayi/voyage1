/**
 * Created by Carolina & Virginie
 * Site : Voyages et Aventures
 */
'use strict';

// Declaration des variables
var timer_img = null;
var i_diapo_active = 0;
var ul_slider_img = null;
var ul_slider_content = null;
var formulaire;
const DUREE_AFFICHAGE = 6000;

/**
 ****************************************************** JS du Slider en page d'accueil ******************************************************
 */

/**
 * Tableaux des forfaits des diapo du slider en page d'accueil
 */
var diapo_1 = [extraire_nom(forfaits_data[0].nom), extraire_pays(forfaits_data[0].nom), forfaits_data[0].info_cat, forfaits_data[0].prix, forfaits_data[0].photo3];
var diapo_2 = [extraire_nom(forfaits_data[5].nom), extraire_pays(forfaits_data[5].nom), forfaits_data[5].info_cat, forfaits_data[5].prix, forfaits_data[5].photo1];
var diapo_3 = [extraire_nom(forfaits_data[8].nom), extraire_pays(forfaits_data[8].nom), forfaits_data[8].info_cat, forfaits_data[8].prix, forfaits_data[8].photo3];
var diapo_4 = [extraire_nom(forfaits_data[9].nom), extraire_pays(forfaits_data[9].nom), forfaits_data[9].info_cat, forfaits_data[9].prix, forfaits_data[9].photo1];
var diapo_5 = [extraire_nom(forfaits_data[10].nom), extraire_pays(forfaits_data[10].nom), forfaits_data[10].info_cat, forfaits_data[10].prix, forfaits_data[10].photo1];
var diapo_6 = [extraire_nom(forfaits_data[11].nom), extraire_pays(forfaits_data[11].nom), forfaits_data[11].info_cat, forfaits_data[11].prix, forfaits_data[11].photo2];
var galerie_slider = [diapo_1, diapo_2, diapo_3, diapo_4, diapo_5, diapo_6];
//console.log(diapo_1, diapo_2, diapo_3, diapo_4, diapo_5, diapo_6);
//console.log(galerie_slider);

/**
* Synchronisation
*/
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM contruit');
    // Initialisation des variables
    ul_slider_img = document.getElementById('slider_diapo_img'); // ul#slider_diapo_img
    ul_slider_content = document.getElementById('slider_diapo_txt');// ul#slider_diapo_txt
    console.log(ul_slider_img);
    console.log(ul_slider_content);
    //formulaire = document.getElementsByTagName('form')[0];
    //console.log(formulaire);
    timer_img = setInterval(afficher_diapo_suiv, DUREE_AFFICHAGE);
    //formulaire.on('submit', valider_formulaire);
    // Appel des fonctions
    ecrire_ul_slider();
    afficher_diapo_suiv();
});

/**
 * Fonction pour extraire le nom du forfait du nom de la BD
 * @param nom
 * @returns {string}
 */
function extraire_nom(nom) { // param nom vaut forfaits_data[0].nom
    var p0 = nom.indexOf('(');
    var p1 = nom.indexOf(')');
    var nom_forfait = nom.substring(nom.charAt(0), p0 - 1);
    return nom_forfait;
}

/**
 * Fonction pour extraire le pays du nom du forfait
 * @param nom
 * @returns {string}
 */
function extraire_pays(pays) { // param nom vaut forfaits_data[0].nom
    var nom_pays = pays.substring(p0 + 1, p1);
    var p0 = pays.indexOf('(');
    var p1 = pays.indexOf(')');
    return nom_pays;
}

/**
 * Fonction slide des images
 */
function afficher_diapo_suiv() {
    console.log("Afficher la diapo suivante");
    i_diapo_active++;
    ul_slider_img.style.left = -800*i_diapo_active + "px";
    ul_slider_content.style.top = -500*i_diapo_active + "px";
    //console.log(ul_slider_img);
    if (i_diapo_active > galerie_slider.length) { // le slider revient en p0
        i_diapo_active = 0;
    }
    console.log(i_diapo_active);
}

/**
 * Fonction ecrire les li du ul d'id slider_diaporama (img)
 */
function ecrire_ul_slider() {
    console.log("Ecrire le content");
    for (var i=0; i<galerie_slider.length; i++) {
        ul_slider_img.innerHTML += '<li><img src="images/' + galerie_slider[i][4] + '"/></li>';
        ul_slider_content.innerHTML += '<li class="slider_info"><h2>' + galerie_slider[i][0] + '</h2><h4>' + galerie_slider[i][1] + '</h4><p>' + galerie_slider[i][2] + '</p><p class="slider_prix">' +  galerie_slider[i][3] +  ' $ (CAD)</p></li>';
    }
}

/**
****************************************************** JS des champs de la reservation ******************************************************
 */

/**
 * Fonction de validation des champs du formulaire de reservation
 * @param event
 */
function valider_formulaire(event) {
    console.log('Tentative de soumission');
    var form_valide = true;

    // Test du champ NOM
    var input_nom = $('#lastname');
    var nom_valide = input_nom.val().trim().length >=1;
    if (! nom_valide) { // si la valeur du champ n'est pas valide < a 1 caractere
        form_valide = false;
        input_nom.addClass('error');
        if (! input_nom.next().is('p.error_msg')) {
            input_nom.after('<p class="error_msg">Le nom doit contenir au moins 1 caractere valide</p>')
        } else {
            input_nom.removeClass('error');
            if (input_nom.next().is('p.error_msg')) {
                input_nom.next().remove();
            }
        }
    }



    if ( ! form_est_valide) {
        console.log('Soumission interrompue');
        event.preventDefault();
    }
}
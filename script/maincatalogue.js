/**
 * Created by Carolina & Virginie
 * Site : Voyages et Aventures
 */

'use strict';

/**
 * Fonction des categories
 */

function construire_categories_section() {
    var categories_section = document.getElementById('categories_section');

    for (var i = 0; i < categories.length; i++) {
        categories_section.innerHTML += '<button>' + categories[i] + '</button>';
    }

    var categories_section_boutons = categories_section.getElementsByTagName('button');

    for (var i = 0; i < categories_section_boutons.length; i++) {
        categories_section_boutons[i].addEventListener('click', recupererForfaitsParCategorie);
    }
}

function recupererForfaitsParCategorie() {
    //Chercher categorie index
    var categorieIndex = 0;
    while (categories[categorieIndex] !== this.innerHTML && categorieIndex < categories.length) {
        categorieIndex++;
    }

    var forfaits_cat = [];
    var forfaits_index = 0;

    for (var i = 0; i < forfaits_data.length; i++) {
        if (forfaits_data[i].categorie == categorieIndex) {
            forfaits_cat[forfaits_index] = forfaits_data[i];
            forfaits_index++;
        }
    }

    var forfaits_section_list = document.getElementById('forfaits_section_list');
    forfaits_section_list.innerHTML = "";
    for (var i = 0; i < forfaits_cat.length; i++) {
        forfaits_section_list.innerHTML += '<li>' +
            '<h2>' + forfaits_cat[i].nom + '</h2>' +
            '<h4>' + forfaits_cat[i].duree + '</h4>' +
            '<h4>' + forfaits_cat[i].prix + ' $ (CAD)</h4>' +
            '<img src="images/img_catalogue/' + forfaits_cat[i].img_catalogue + '"/>' +
            '</li>';
    }

    /////////////
    var forfaits_section_list_forfaits = forfaits_section_list.getElementsByTagName('li');

    for (var i = 0; i < forfaits_section_list_forfaits.length; i++) {
        forfaits_section_list_forfaits[i].addEventListener('click', mostrarDiv);
    }

}

function mostrarDiv() {
    var divDialogo = document.getElementById('dialogo');
    divDialogo.style.display = "block";
}

/////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
    construire_categories_section();
});



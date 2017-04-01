/**
 * Created by Carolina & Virginie
 * Site : Voyages et Aventures
 */

"use strict";

var catalogue_cont;

// Synchrornisation
$(function(){
    console.log("DOM Contruit");
    catalogue_cont = $('#accordion_cats');
    console.log(catalogue_cont);
    afficher_categories();
    afficher_forfaits();
    update_accordion(catalogue_cont.children('h3:first'));


    // Écouter au click sur les hyperliens de classe 'forfait_detail'
    $('a.forfait_detail').on('click', function(event){
        event.preventDefault(); // Bloquer la navigation
        // Aller chercher le href de l'hyperlien target
        console.log($(this).attr('href'));
        var forfid_lien = getParameterByName('forfid', $(this).attr('href')); // Valeur du id du forfait dans l'hyperlien
        console.log('id du forfait : ', forfid_lien);
        var forfait = forfaits_data[forfid_lien]; // Le forfait dont il faut afficher les détails
        var div_details = $('#detail_forfait'); // Le div de la lightbox des détails de forfait
        div_details.find('h4').text(forfait.nom);
        div_details.find('img').attr('src', EXT_IMG_PATH + forfait.photo1);
        div_details.find('a.reservation').attr('href', 'reservation.html?forfid=' + forfid_lien);


    });

    $('h3').on ('click',function () {
        update_accordion(this);
    });
});


/**
 * Préparer le catalogue en plaçant les categories dans les éléments h3 et div de l'accordéons
 */
function afficher_categories() {
    console.log('Appel Afficher categories', 'nb de categories : ', categories.length);
    var cat_titles = catalogue_cont.children('h3'); // Tous les titres h3 des catégories
    console.log(cat_titles);
    for (var i=0 ; i < categories.length ; i++) {
        var categorie = categories[i];
        cat_titles.eq(i).text(categorie);
    }
}

/**
 * Afficher le catalogue par catégories, chaque forfait affiché dans le container (l'accordéon) de sa catégorie
 */
function afficher_forfaits() {
    console.log('Appel Afficher forfaits', 'nb de forfaits : ', forfaits_data.length);
    var forfait_lists = catalogue_cont.find('ul.forfait_list'); // Tous les divs de categorie
    console.log(forfait_lists);
    for (var i=0 ; i < forfaits_data.length; i++) {
        var forfait = forfaits_data[i];
        $('<li class="forfait">')
            .appendTo(forfait_lists.eq(forfait.categorie))
            .append('<h4>' + forfait.nom + '</h4>')
            .append('<img src="' + EXT_IMG_PATH + forfait.img_catalogue + '" />')
            .append('<a class="forfait_detail" href="catalogue.html?forfid=' + i + '">Détails</a>')
            .append('<p id="ref_cat">' + forfait.ref_forfait + '</p>')
            .append('<p id="info_extra">' + forfait.info_cat + '</p>')
            .append('<p id="jours">' + forfait.duree +' jours' + '</p>')
            .append('<p id="prix"> Prix par personne: $' + forfait.prix);
    }
}

/**
 * Ferme le volet actif et ouvre le volet donné par le h3 active
 * @param new_active_h3 : Élément h3 qui doit être ouvert
 */
function update_accordion(new_active_h3) {
    catalogue_cont
        .children('h3.active')
        .removeClass('active')
        .next() // Le div qui suit le h3
        .slideUp(300);
    $(new_active_h3)
        .addClass('active')
        .next()
        .slideDown(300);
}




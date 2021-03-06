/**
 * Created by Carolina & Virginie
 * Site : Voyages et Aventures
 */

"use strict";

var catalogue_cont;
var timer_forfait = null;
var index_image = 0;

const DUREE_AFFICHAGE = 3000;
const EXT_IMG_PATH = 'http://p86-tp-forfaits.projetisi.com/images/'; // Path vers les images du serveur


// Synchrornisation
$(function () {
    console.log("DOM Contruit");
    catalogue_cont = $('#accordion_cats');
    console.log(catalogue_cont);
    afficher_categories();
    afficher_forfaits();
    update_accordion(catalogue_cont.children('h3:first'));

    // Écouter au click sur les hyperliens de classe 'forfait_detail'
    $('a.forfait_detail').on('click', function (event) {
        event.preventDefault(); // Bloquer la navigation
        // Aller chercher le href de l'hyperlien target
        var div_details = $('#mb_detail_forfait'); // Le div de la lightbox des détails de forfait

        div_details.children().remove();

        var forfid_lien = getParameterByName('forfid', $(this).attr('href')); // Valeur du id du forfait dans l'hyperlien
        console.log('id du forfait : ', forfid_lien);
        var forfait = forfaits_data[forfid_lien]; // Le forfait dont il faut afficher les détails
        //Information detallée de chaque forfait.
        div_details
            .append('<h2>' + forfait.nom + '</h2>')
            //.append('<p class="info">' + forfait.ref_forfait + '</p>')
            .append('<p class="info">' + forfait.info_cat + '</p>')
            .append('<div id="cat_imag"><ul id="images_list"></ul></div>')
            .append('<div id="forf_info">')
            .append('<div id="div_details_content">');
        $('div#div_details_content')
            .append('<h3>' + 'Hebergement' + '</h3>')
            .append(forfait.hebergement)
            .append(forfait.lieu)
            .append(forfait.niveau)
            .append('<p>' + 'Maximum d\'animaux: ' + forfait.max_animaux + '</p>')
            .append('<p>' + 'Prix par animal: ' + forfait.prix_animal + '$' + '</p>')
            .append('<p class="contact">' + 'Information pour nous contacter :' + forfait.infos + '</p>')
            .append('<a class="reservation" href="reservation.html?forfid=' + forfid_lien + '">Réserver</a>');
        $('div #forf_info')
            .append('<p class="un">' + 'Debut saison : ' + forfait.debut_saison + '</p>')
            .append('<p class="deux">' + 'Fin saison : ' + forfait.fin_saison + '</p>')
            .append('<p class="trois">' + 'Jours: ' + forfait.duree + '</p>')
            .append('<p class="quatre">' + 'Prix par personne :' + forfait.prix + '$' + '</p>')
            .append('<p class="cinq">' + 'Places disponibles: ' + forfait.places_dispo + '</p>');
        //div_details.find('ul').eq(1).attr('id', 'info_heber');
        //div_details.find('ul').eq(2).attr('id', 'info_lieu');
        //div_details.find('ul').eq(3).attr('id', 'forfait_niveau');
        //div_details.find('ul').eq(4).attr('id', 'address');
        ;

        //Images pour le carousel de chaque detail forfait
        div_details.find('#images_list').append('<li><img src="' + EXT_IMG_PATH + forfait.photo1 + '"/></li>');
        div_details.find('#images_list').append('<li><img src="' + EXT_IMG_PATH + forfait.photo2 + '"/></li>');
        div_details.find('#images_list').append('<li><img src="' + EXT_IMG_PATH + forfait.photo3 + '"/></li>');

        //Instructions pour les images dans le carousel
        index_image = 0;

        if (timer_forfait !== null) {
            clearInterval(timer_forfait);
        }
        timer_forfait = setInterval(afficher_images, DUREE_AFFICHAGE);

        //Instructions pour la boite modale.
        div_details.addClass('.mb_item').show();
        $('.mb_container').fadeIn();
        $(".mb_background").on('click', function () {
            console.log('.mb_background');
            $('.mb_container').fadeOut(1000, function () {
                div_details.hide();
            })
        })

    });
    //Evenement de l'accordion
    $('h3').on('click', function () {
        update_accordion(this);
    });
});

/**
 *Creer les categories dinamiquement
 *
 */

function afficher_categories() {
    console.log('Appel Afficher categories', 'nb de categories : ', categories.length);
    for (var i = 0; i < categories.length; i++) {
        var categorie = categories[i];
        $('<h3>')
            .appendTo(catalogue_cont)
            .text(categorie);
        $('<div><ul class="forfait_list"></ul></div>')
            .appendTo(catalogue_cont);
    }
}


/**
 * Afficher le catalogue par catégories, chaque forfait affiché dans le container (l'accordéon) de sa catégorie
 */
function afficher_forfaits() {
    console.log('Appel Afficher forfaits', 'nb de forfaits : ', forfaits_data.length);
    var forfait_lists = catalogue_cont.find('ul.forfait_list'); // Tous les divs de categorie
    console.log(forfait_lists);
    for (var i = 0; i < forfaits_data.length; i++) {
        var forfait = forfaits_data[i];
        $('<li class="forfait">')
            .appendTo(forfait_lists.eq(forfait.categorie))
            .append('<img src="' + EXT_IMG_PATH + forfait.img_catalogue + '" />')
            .append('<div>');
        $('li.forfait').eq(i).find('div:first')
            .addClass('forfait_desc')
            .append('<h4>' + forfait.nom + '<span id="prix"> ' + forfait.prix + ' $</span></h4>')
            .append('<p id="info_extra">' + forfait.info_cat + '</p>')
            .append('<a class="forfait_detail" href="catalogue.html?&forfid=' + i + '">Détails</a>');
    }
}

/**
 * Instructions pour l'accordion
 * Ferme le volet actif et ouvre le volet donné par le h3 active
 * Element qui doit être ouvert
 */
function update_accordion(new_active_h3) {

    var currentActiveH3 = catalogue_cont.children('h3.active');

    catalogue_cont
        .children('h3.active')
        .removeClass('active')
        .next() // Le div qui suit le h3
        .slideUp(300);

    if (!currentActiveH3.is($(new_active_h3))) {
        $(new_active_h3)
            .addClass('active')
            .next()
            .slideDown(300);
    }

}

//Instructions pour les images du carrousel
function afficher_images() {
    index_image++;
    if (index_image == 3) {
        index_image = 0;
    }
    $('#images_list').css('left', (-500 * index_image + "px"));
}
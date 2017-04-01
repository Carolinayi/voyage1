/**
 * Created by Carolina & Virginie
 * Site : Voyages et Aventures
 */

"use strict";

var catalogue_cont;
var timer_forfait = null;
var index_image = 0;

const DUREE_AFFICHAGE = 3000;


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
        var div_details = $('#detail_forfait2'); // Le div de la lightbox des détails de forfait

        div_details.children().remove();

        console.log($(this).attr('href'));
        var forfid_lien = getParameterByName('forfid', $(this).attr('href')); // Valeur du id du forfait dans l'hyperlien
        console.log('id du forfait : ', forfid_lien);
        var forfait = forfaits_data[forfid_lien]; // Le forfait dont il faut afficher les détails
        //Information detallée de chaque forfait.
        div_details.append('<h3>' + forfait.nom + '</h3>');
        div_details.append('<div id="cat_imag"><ul id="images_list"></ul></div>');
        div_details.append('<div><p class="info">' + forfait.ref_forfait + '</p></div>');
        div_details.append('<div><p class="info">' + forfait.info_cat + '</p></div>');
        div_details.append('<h4>' +'Hebergement'+ '</h4>');
        div_details.append(forfait.hebergement);
        div_details.find('ul').eq(1).attr('id','info_heber');
        div_details.append(forfait.lieu);
        div_details.find('ul').eq(2).attr('id','info_lieu');
        div_details.append(forfait.niveau);
        div_details.find('ul').eq(3).attr('id','forfait_niveau');
        div_details.append('<p class="sup_info un">' +'Debut saison : '+ forfait.debut_saison + '</p>');
        div_details.append('<p class="sup_info deux">' +'Fin saison : '+forfait.fin_saison + '</p>');
        div_details.append('<p class="sup_info trois">' +'Jours: ' + forfait.duree + '</p>');
        div_details.append('<p class="sup_info quatre">' +'Prix par personne :' + forfait.prix + '$'+ '</p>');
        div_details.append('<p class="sup_info cinq">' +'Places disponibles: ' + forfait.places_dispo + '</p>');
        div_details.append('<p>' +'Maximum d\'animaux: ' +forfait.max_animaux + '</p>');
        div_details.append('<p>' +'Prix par animal: ' + forfait.prix_animal + '$'+'</p>');
        div_details.append('<p class="contact">' +'Information pour nous contacter :' +forfait.infos + '</p>');
        div_details.find('ul').eq(4).attr('id','address');
        div_details.append(forfait.infos);
        div_details.append('<a class="reservation" href="reservation.html?forfid=' + forfid_lien + '">Réserver</a>');

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
        $(".mb_background").on ('click',function () {
            console.log('.mb_background');
            $('.mb_container').fadeOut(1000, function () {
                div_details.hide();
            })
        })

    });
    //Evenement de l'accordion
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
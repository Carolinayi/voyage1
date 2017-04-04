/**
 * Created by Carolina & Virginie
 * Site : Voyages et Aventures
 */
'use strict';

const EXT_IMG_PATH = 'http://p86-tp-forfaits.projetisi.com/images/'; // Path vers les images du serveur


/**
 * Synchronisation
 */
$(function () {
    console.log('DOM Construit');
	// Id du forfait passé en paramètre de l'URL
	var forfid_lien = getParameterByName('forfid');
	// Forfait correspondant à l'id passé dans l'URL
	var forfait_resa = forfaits_data[forfid_lien];

    var datepicker_options = {
        dateFormat: "yy-mm-dd",
        defaultDate: null,
        showOn:'both',
        buttonText:'Choisissez une date',
        buttonImage: 'images/date_ico.png', // Icone ouverture après le champs de saisie
        buttonImageOnly:true,
        numberOfMonths:2, // Nb mois affichés
        minDate: '-1y', // 1 mois avant la date en cours
        maxDate:'+1y', // ???
        showButtonPanel:true
    };
	
	//Assigne les options au datepicker
    $('#date_debut').datepicker(datepicker_options);
	
	//A la submisssion du formulaire appeler la fonction de validation valider_formulaire
    $('#form_resa').on('submit', valider_formulaire);
    
	afficher_infos();
	
	/**
	 * Fonction qui calcul la date de retour : date de depart + duree du forfait
	 */
	function calcul_retour (forfait, depart) {
		var retour = new Date(depart.getTime()+(forfait.duree*24*60*60*1000));
		return retour;
	}
    
	/**
	* Lorsque l'inpute date_fin reçoit le focus, on calcul 
	* la date de fin à partir du nombre de jour du forfait
	*/
    $('#date_fin').focusin(function() {
        var date_depart = new Date($('#date_debut').val());
        var retour = calcul_retour(forfait_resa, date_depart);
        $(this).val($.datepicker.formatDate("yy-mm-dd", retour));
    });
	
	/**
	* Lorsque le champ nb_pers perd le focus on arrondi la valeur entrée
	*/
    $('#nb_pers').focusout(function() {
        $(this).val(Math.round(parseInt($(this).val())));
    });
	
	/**
	* Lorsque le champ nb_animaux perd le focus on arrondi la valeur entrée
	*/
    $('#nb_animaux').focusout(function() {
        $(this).val(Math.round(parseInt($(this).val())));
    });
	
	/**
	 * Fonction pour afficher les informations relatives au forfait reserve
	 */
	function afficher_infos() {
		// Ecrire le container et le contenu du div.reservation_header
		$('#reservation_header')
			.append('<img src="' + EXT_IMG_PATH + forfait_resa.img_catalogue + '"/>')
			.append('<div>');
		$('#reservation_header div')
			.append('<h2>' + extraire_nom(forfait_resa.nom) + '</h2>')
			.append('<h4>' + extraire_pays(forfait_resa.nom) + '</h4>')
			.append('<p>Début de saison : ' + forfait_resa.debut_saison + '</p>')
			.append('<p>Fin de saison : ' + forfait_resa.fin_saison + '</p>')
			.append('<p>Nombre d\'animaux maximum : ' + forfait_resa.max_animaux + '</p>');
	};

	/**
	 * Fonction de validation de saisie des champs du formulaire de reservation
	 * @param event
	 */
	function valider_formulaire(event) {
		console.log('Tentative de soumission');
		// Booléen qui indique sur le formulaire est valide
		var form_valide = false;
	  
		// Test du champ NOM
		var input_nom = $('#lastname');
		var nom_valide = input_nom.val().trim().length >= 1;
		
		if (!nom_valide) { // si la valeur du champ est inferieure a 1 caractere
			form_valide = false;
			input_nom.addClass('error');
			if (!input_nom.next().is('p.error_msg')) {
				input_nom.after('<p class="error_msg">Le nom doit au moins contenir 1 caractere valide.</p>');
			}
		} else {
			input_nom.removeClass('error');
			form_valide = true;
			if (input_nom.next().is('p.error_msg')) {
				input_nom.next().remove();
			}
		}

		// Test du champ PRENOM
		var input_prenom = $('#firstname');
		var prenom_valide = input_prenom.val().trim().length >= 1;
	 
		if (!prenom_valide) { // si la valeur du champ n'est pas valide < a 1 caractere
			form_valide = false;
			input_prenom.addClass('error');
			if (!input_prenom.next().is('p.error_msg')) {
				input_prenom.after('<p class="error_msg">Le prenom doit au moins contenir 1 caractere valide.</p>');
			}
		} else {
			input_prenom.removeClass('error');
			form_valide = true;
			if (input_prenom.next().is('p.error_msg')) {
				input_prenom.next().remove();
			}
		}

		// Test du champ COURRIEL
		var input_courriel = $('#courriel');
		var pattern_courriel = new RegExp((/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i));
		var exp_rat_courriel = new RegExp(pattern_courriel, 'g');// Création d'un objet Javascript RegExp
		var courriel_valide = exp_rat_courriel.test(input_courriel.val());
	   
		if (courriel_valide == false) { // si la valeur du champ n'est pas valide < a 1 caractere
			form_valide = false;
			input_courriel.addClass('error');
			if (!input_courriel.next().is('p.error_msg')) {
				input_courriel.after('<p class="error_msg">Le courriel doit au moins contenir le caractere @.</p>');
			}
		} else {
			input_courriel.removeClass('error');
			form_valide = true;
			if (input_courriel.next().is('p.error_msg')) {
				input_courriel.next().remove();
			}
		}
	   

		// Test du champ TELEPHONE
		var input_telephone = $('#telephone');
		var pattern_telephone = new RegExp( /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/);
		var exp_rat_telephone = new RegExp(pattern_telephone, 'g');// Création d'un objet Javascript RegExp
		var telephone_valide = exp_rat_telephone.test(input_telephone.val());
	 
		if (telephone_valide == false) { // si la valeur du champ n'est pas valide < a 1 caractere
			form_valide = false;
			input_telephone.addClass('error');
			if (!input_telephone.next().is('p.error_msg')) {
				input_telephone.after('<p class="error_msg">Le telephone doit etre au format XXX-XXX-XXXX.</p>');
			}
		} else {
			input_telephone.removeClass('error');
			form_valide = true;
			if (input_telephone.next().is('p.error_msg')) {
				input_telephone.next().remove();
			}
		}

		// Test du champ ADRESSE
		var input_adresse = $('#adresse');
		var adresse_valide = input_adresse.val().trim().length >= 10;
		
		if (!adresse_valide) { // si la valeur du champ n'est pas valide < a 1 caractere
			form_valide = false;
			input_adresse.addClass('error');
			if (!input_adresse.next().is('p.error_msg')) {
				input_adresse.after('<p class="error_msg">L\'adresse doit au moins contenir 10 caracteres valides.</p>');
			}
		} else {
			input_adresse.removeClass('error');
			form_valide = true;
			if (input_adresse.next().is('p.error_msg')) {
				input_adresse.next().remove();
			}
		}

		// Test du champ de DATE DE DEPART
		var input_depart = $('#date_debut');
		
		// Conversion des strings date au format date pour les tests de validite de la periode
		var date_debut_forfait = new Date(forfait_resa.debut_saison);
		var date_fin_forfait = new Date(forfait_resa.fin_saison);
		var date_depart = $.datepicker.formatDate("yy-mm-dd", new Date(input_depart.val()));

		// test le format de la date
		var pattern_date = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
		var exp_rat_date = new RegExp(pattern_date, 'g');
		var format_date_depart_valide = exp_rat_date.test(date_depart);
	   
		// test la periode de la saison
		var date_valide = true;
		if ((new Date(date_depart) < date_debut_forfait) || (new Date(date_depart) > date_fin_forfait) || (!format_date_depart_valide)){
			date_valide = false;
		};

		// affichage de l'erreur
		if (!date_valide) {
			form_valide = false;
			input_depart.addClass('error');
			if (!input_depart.next().is('p.error_msg')) {
				input_depart.after('<p class="error_msg">La date de depart est hors forfait.</p>');
			} else {
			input_depart.removeClass('error');
			form_valide = true;
				if (input_depart.next().is('p.error_msg')) {
				input_depart.next().remove();
				}
			}
		}

		// Test du champ de DATE DE RETOUR
		var input_retour = $('#date_fin');
		var date_retour =  $.datepicker.formatDate("yy-mm-dd", new Date(input_retour.val()));
		var format_date_retour_valide = exp_rat_date.test(date_retour);
	  
		// affichage de l'erreur
		if (!format_date_retour_valide) {
			form_valide = false;
			input_retour.addClass('error');
			if (!input_retour.next().is('p.error_msg')) {
				input_retour.after('<p class="error_msg">La date de retour est hors forfait.</p>');
			} else {
			input_retour.removeClass('error');
			form_valide = true;
				if (input_retour.next().is('p.error_msg')) {
				input_retour.next().remove();
				}
			}
		}

		// Test du champ NB VOYAGEURS
		var input_voyageurs = $('#nb_pers');
		var voyageurs_valide = true;
		if (input_voyageurs.val() < 1) {
			voyageurs_valide = false;
		};
	  
		if (!voyageurs_valide) { // si la valeur du champ n'est pas valide < a 1 caractere
			form_valide = false;
			input_voyageurs.addClass('error');
			if (!input_voyageurs.next().is('p.error_msg')) {
				input_voyageurs.after('<p class="error_msg">Le nombre de voyageurs doit au minimum etre de 1.</p>');
			}
		} else {
			input_voyageurs.removeClass('error');
			form_valide = true;
			if (input_voyageurs.next().is('p.error_msg')) {
				input_voyageurs.next().remove();
			}
		}

		// Test du champ NB ANIMAUX
		var input_animaux = $('#nb_animaux');
		var animaux_valide = true;
		if ((input_animaux.val().length < 1 ) || (input_animaux.val() > forfait_resa.max_animaux)) {
			animaux_valide = false;
		};
	   
		if (!animaux_valide) { // si la valeur du champ n'est pas valide < a 1 caractere
			form_valide = false;
			input_animaux.addClass('error');
			if (!input_animaux.next().is('p.error_msg')) {
				input_animaux.after('<p class="error_msg">Le nombre d\'animaux maximum est de ' + forfait_resa.max_animaux + '.</p>');
			}
		} else {
			input_animaux.removeClass('error');
			form_valide = true;
			if (input_animaux.next().is('p.error_msg')) {
				input_animaux.next().remove();
			}
		}

		// Si le formulaire n'est pas valide, on intercepte la soumission
		if ( ! form_valide) {
			console.log('Soumission interrompue');
			event.preventDefault();
		} else {
			console.log('Soumission reussie');
			event.preventDefault();
			afficher_commande();
		}
	};

	/**
	 * Fonction pour afficher le recapitulatif de la commande
	 */
	function afficher_commande() {
		// Ecrire le container et le contenu du div.reservation_header
		$('tbody td:eq(0)').text(forfait_resa.nom); // nom du forfait
		$('tbody td:eq(1)').text(Number(forfait_resa.prix) + ' $'); // prix par personne
		$('tbody td:eq(2)').text(Number($('#nb_pers').val())); // nb de voyageurs
		$('tbody td:eq(3)').text(Number(forfait_resa.prix)*Number($('#nb_pers').val()) + ' $');
		$('tbody td:eq(5)').text(Number(forfait_resa.prix_animal) + ' $'); // prix par animal
		$('tbody td:eq(6)').text(Number($('#nb_animaux').val())); // nb d'animaux
		$('tbody td:eq(7)').text(Number(forfait_resa.prix_animal)*Number($('#nb_animaux').val()) + ' $');
		$('tbody td:eq(9)').text((Number(forfait_resa.prix)*Number($('#nb_pers').val()) + Number(forfait_resa.prix_animal)*Number($('#nb_animaux').val())) + ' $');
	};
		
});




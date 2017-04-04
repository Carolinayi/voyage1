/**
 * Constantes, variables et définitions partagées par toutes les pages du site
 *
 */
'use strict';


/**
 * Fonction pour extraire le nom du forfait du nom de la BD
 * @param nom
 * @returns {string}
 */
function extraire_nom(nom) { // param nom vaut forfaits_data[0].nom
    var p0 = nom.indexOf('(');
    var nom_forfait = nom.substring(nom.charAt(0), p0 - 1);
    return nom_forfait;
}

/**
 * Fonction pour extraire le pays du nom du forfait
 * @param nom
 * @returns {string}
 */
function extraire_pays(pays) { // param nom vaut forfaits_data[0].nom
    var p1 = pays.indexOf('(');
    var p2 = pays.indexOf(')');
    var nom_pays = pays.substring(p1 + 1, p2);
    return nom_pays;
}

/**
 * Lire un paramètre dans une url, fournie ou prise dans l'url de la page
 * Par exemple si l'URL de la page est l'adresse index.html?mon_param=ma_valeur
 * La fonction getParameterByName('mon_param') renvoie la chaîne 'ma_valeur'
 * Si le paramètre url est fourni à l'appel, la fonction prend cette valeur au lien de l'url de la page
 * @param name: nom du paramètre à lire
 * @param url: url où lire le paramètre
 * @returns {Array|{index: number, input: string}|string}
 */
function getParameterByName(name, url) {
    if ('undefined' == typeof url) {
        url = window.location.search;
    }
    var match = new RegExp('[?&]' + name + '=([^&]*)').exec(url);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}


/**
 * Constantes, variables et définitions partagées par toutes les pages du site
 *
 */
'use strict';

const EXT_IMG_PATH = 'http://p86-tp-forfaits.projetisi.com/images/'; // Path vers les images du serveur


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

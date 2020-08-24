
    /* ----------RECUPERATION IMAGES DANS LE DOSSIER POUR AFFICHAGE DIAPORAMA */
var i = 0;
var images = ["vcam_1.jpg","vcam_2.jpg","vcam_3.jpg","vcam_4.jpg","vcam_5.jpg",];
var time = 3000;
function changeImg() {
    document.slide.src = images[i];
    if (i < images.length - 1) {
        i++;
    }
    else {
        i = 0;
    }
    setTimeout("changeImg()", time);
}
window.onload = changeImg;

/*-------OUVERTURE et FERMETURE DES CHOIX DU MENU AU NIVEAU DU RESPONSIVE DESIGN---------- */
var it = document.querySelector("i");
var menu = document.querySelector(".menu");
var nav = document.querySelector(".nav")
    it.addEventListener("click",()=>{
        menu.classList.toggle('menu_open');
        })
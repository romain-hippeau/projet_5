
/*-----------------CONSTANTE----------- */

const orderCart = localStorage.getItem('commande');
const numCommandes = JSON.parse(orderCart);
const commandeCart = localStorage.getItem('cart');
const totalPrice = JSON.parse(commandeCart);
const sommePriceTotal = document.getElementById('sommePriceTotal');
let date = document.getElementById('date');
let date1 = new Date();

let dateLocale = date1.toLocaleString('fr-FR',{
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'});
/*-----------------AFFICHAGE DES DONNEES RECUPERER----------- */
date.innerHTML = dateLocale;
let numeroCommande = document.getElementById('numCommande');
numeroCommande.innerHTML = `"<strong>${numCommandes.orderId}</strong>"`;
let nameCommande = document.getElementById('denomination');
nameCommande.innerHTML = `"<strong>${numCommandes.contact.lastName}  ${numCommandes.contact.firstName}</strong>"`;
let adresseCommande = document.getElementById('adresse');
adresseCommande.innerHTML = `"<strong>${numCommandes.contact.address}, ${numCommandes.contact.city}</strong>"`;
let mailCommande = document.getElementById('mail');
mailCommande.innerHTML = `"<strong>${numCommandes.contact.email}</strong>"`;

/*-----------------CALCUL DU PRIX TOTAL POUR L'INSERER DANS MA VAR SOMME----------- */
let somme = 0;

for (let i = 0; i < totalPrice.length; i++) {
    let allPrices = totalPrice[i].productPrice;
    //console.log(allPrices);
    let allQty = totalPrice[i].productQuantity;
    //console.log(allQty);
    let resultPrice = allPrices * allQty;
    //console.log(resultPrice);
    somme += resultPrice;
    console.log(somme);

    sommePriceTotal.innerHTML = ` "<strong>${somme}€</strong>".`
}
/*-----------------REDIRECTION ET NETTOYAGE DU LOCAL-STORAGE----------- */

let time = 40000;
function redirect(){ 
    document.location = '../index.html'
    localStorage.clear();
}

window.onload =  setTimeout("redirect()",time);
/*-------OUVERTURE et FERMETURE DES CHOIX DU MENU AU NIVEAU DU RESPONSIVE DESIGN---------- */
var i = document.querySelector("i");
var menu = document.querySelector(".menu");
var nav = document.querySelector(".nav")
i.addEventListener("click",(e)=>{
menu.classList.toggle('menu_open');
})


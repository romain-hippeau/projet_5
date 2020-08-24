/* ------VARIABLES------ HTML-------- */

const cameraModif = document.getElementById('camera__modification');
const addCart = document.getElementById('addpanier');
const urls = new URL(window.location.href);
const searchParams = new URLSearchParams(urls.search);
const cameraId = searchParams.get('id');
const image = document.getElementById('image__bloc');
const titre = document.getElementById('titre__bloc');
const select_lenses = document.getElementById('lense--option');
const description = document.getElementById('description__bloc');
const prix = document.getElementById('prix__bloc');


/* --------------METHODE FETCH RECUPERATION DES CARATERISTIQUE PRODUITS + RETOUR EN JSON -------------- */
const url = 'http://localhost:3000/api/cameras'

async function result(url) {
    let result = await fetch(url)
    return result.json()
}
/* --------------AFFICHAGE PRODUITS GRACE A INNER.HTML + BOUCLES FOR POUR AFFICHAGES DES LENTILLES DISPONIBLES -------------- */
result(url + '/' + cameraId).then(camera => {
    console.log(camera)


    titre.innerHTML = `choissez la lentille pour votre ${camera.name} !`;
    image.innerHTML = `<img id="image_products" src="${camera.imageUrl}" alt="Photo de ${camera.name} ">`;

    lenses = camera.lenses
    lenseInside = document.getElementById('lenseInside')
    for (i = 0; i < lenses.length; i++) {
       lenseInside += '<option id="lenseSize"> ' + lenses[i] + ' </option>';
    }
    select_lenses.innerHTML +=  lenseInside

    description.innerHTML = `${camera.description}`

    prix.innerHTML = `<strong>Prix : </strong>${camera.price}€`


    /* --------------BOUTON AJOUT PANIER-------------- */
   
    addCart.onclick = function() {
        alert("Votre produit vient d'être ajouté au panier !")
    };

    addCart.addEventListener('click', addProducts);
   /* --------------CREATION D'UN NOUVEAU TABLEAU PRODUIT CLIENT-------------- */
    let newCart = null;

    function createNewCart() {
        let storageCart = localStorage.getItem('cart');
        if (storageCart == null) {
            newCart = []
            console.log('Initialisation')
            console.log('Création du panier !');
        } else {
            newCart = JSON.parse(storageCart)
            console.log('Récupération')
        }

        localStorage.setItem('cart', JSON.stringify(newCart));

    }
    /*---------MISE EN PLACE DU REMPLISSAGE DU TABLEAU NewCart--------*/
    function products() {

        let productlenses = select_lenses.options[select_lenses.selectedIndex].value;
        let productId = cameraId;
        let productFound = newCart.find(element => element.productId == productId && element.productlenses == productlenses);
        if (productFound == undefined) {
            let productQuantity = 1;
            let productPrice = camera.price;
            let productName = camera.name;
            newCart.push({ productId, productlenses, productName, productPrice, productQuantity });
        } else {
            productFound.productQuantity++;
        }
        console.log(productlenses);
        localStorage.setItem('cart', JSON.stringify(newCart));

        console.log('Ajout du produit dans le panier !');
        console.log(newCart)
    }


    function addProducts() {
        if (newCart == null) {
            createNewCart()
        }
        products()
       
    }

});
/*-------OUVERTURE et FERMETURE DES CHOIX DU MENU AU NIVEAU DU RESPONSIVE DESIGN---------- */
var i = document.querySelector("i");
var menu = document.querySelector(".menu");
var nav = document.querySelector(".nav")
i.addEventListener("click",(e)=>{
menu.classList.toggle('menu_open');
})
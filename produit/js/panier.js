 /*----------CONSTANTE ---- */

const storageCart = localStorage.getItem('cart');
const productsLists = JSON.parse(storageCart);
const panierTableau = document.getElementById('panier__body');
const totalPrice = document.getElementById('prix__total');
let somme = 0;

/*----------AFFICHAGE ET RECUPERATION PANIER POUR INSERER LES DONNES DANS NOTRE TABLEAU */
if (storageCart != null) {

    for (let i = 0; i < productsLists.length; i++) {

        const price = productsLists[i].productPrice;
        const quantityList = productsLists[i].productQuantity;
        const resultPrice = price * quantityList;

        somme += resultPrice;
/*----------UTILISATION DE INSERT-ROW POUR INSERER UNE NOUVELLE LIGNE ET RETOUNER LES REFERENCES PRODUITS---- */
        let ligneTableau = panierTableau.insertRow(-1);
        ligneTableau.id = "ligne-" + i;
        let colonneTableau1 = ligneTableau.insertCell(0);
        colonneTableau1.innerHTML += (productsLists[i].productName);
/*----------UTILISATION DE INSERT-CELL POUR INSERER UNE NOUVELLE LIGNE (td) DANS LE (TR) ET RETOUNER LES REFERENCES PRODUITS---- */
        let colonneTableau2 = ligneTableau.insertCell(1);
        colonneTableau2.innerHTML += `${price}€`;

        let colonneTableau3 = ligneTableau.insertCell(2);
        colonneTableau3.innerHTML += (productsLists[i].productlenses);

        let colonneTableau4 = ligneTableau.insertCell(3);
/*----------MISE EN PLACE ET EXECUTION DU BOUTON MOINS POUR DONNER LE CHOIX DE LA QUANTITE DU PRODUITS DANS LE PANIER ---- */
        let buttonMinus = document.createElement('button');
        buttonMinus.innerHTML = `<i class = "fas fa-minus"></i>`;
        buttonMinus.id = `minus-${i}`;
        buttonMinus.onclick = (e) => {
            updateQte(e.currentTarget.id.split('-')[1], 'moins')
        }

        colonneTableau4.appendChild(buttonMinus);
/*----------UTILISATION DE INSERT-ROW POUR INSERER UNE NOUVELLE LIGNE ET RETOUNER LES REFERENCES PRODUITS---- */
        let spanQty = document.createElement("span");
        spanQty.id = `qte-${i}`;
        spanQty.textContent = quantityList;
        colonneTableau4.appendChild(spanQty);
/*----------MISE EN PLACE ET EXECUTION DU BOUTON PLUS POUR DONNER LE CHOIX DE LA QUANTITE DU PRODUITS DANS LE PANIER ---- */
        let buttonPlus = document.createElement('button');
        buttonPlus.innerHTML = `<i class = "fas fa-plus"></i>`;
        buttonPlus.id = `plus-${i}`;
        buttonPlus.onclick = (e) => {
            updateQte(e.currentTarget.id.split('-')[1], 'plus')

        }

        colonneTableau4.appendChild(buttonPlus);

        let colonneTableau5 = ligneTableau.insertCell(4);
        colonneTableau5.id = 'prixTotal-' + i;
        colonneTableau5.innerHTML += (resultPrice + ' €');

        let colonneTableau6 = ligneTableau.insertCell(5);

        let button = document.createElement('button');
        button.innerHTML = `<i class = "fas fa-times"></i>`;

        colonneTableau6.appendChild(button);
/*----------MISE EN PLACE ET EXECUTION DU BOUTON DELETE POUR DONNER LE CHOIX DE LA SUPPRESION DU PRODUITS DANS LE PANIER ---- */
      
button.addEventListener('click', function() {
            panierTableau.deleteRow(i)
            productsLists.splice(i, 1);
            localStorage.setItem('cart', JSON.stringify(productsLists));
            document.location.reload()
        });

    }
}
/*----------ENVOIE ET AFFICHAGE DE LA SOMME TOTAL ---- */
totalPrice.innerHTML = `<div id="blocPrixTotal"><p id="titrePrixTotal">Prix Total de votre panier<p id='totalPanier'><span>${somme}</span>€</div>`;

/*----------DONNES FORMULAIRE ---- */
let btnValidation = document.getElementById('bouton__validation');
 const push = "http://localhost:3000/api/cameras/order"
 /*----------CONDITION BOOLEAN POUR LE FORMULAIRE ---- */
if (storageCart.length === 2 || somme === 0) {

    let blocageFormulaire = document.getElementById('bouton__validation');
    blocageFormulaire.setAttribute('disabled', "");

} else {
    btnValidation.addEventListener('click', () => {

        document.getElementById('formulaire').addEventListener('submit', (event) => {
            event.preventDefault();
            let products = [];
 /*----------BOUCLES FOR + REGLE REGEXP ---- */
            for (let i = 0; i < productsLists.length; i++) {
                let productId = productsLists[i].productId;
                products.push(productId);
            }
            let maCommandeForm = new FormData(document.getElementById('formulaire'));
            let nameFormat = new RegExp(/^[A-Za-z àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ \s]{1,}/);
            let addressFormat = new RegExp(/[A-Za-z0-9\s]{5,}/);
            let cityFormat = new RegExp(/[0-9]{5}[A-Za-z\s]{2,}/);
 /*----------RECUPERATION DES DONNES DU FORMULAIRE GRACE A GET---- */
            if (nameFormat.test(maCommandeForm.get("firstName")) && nameFormat.test(maCommandeForm.get('lastName')) && addressFormat.test(maCommandeForm.get('address')) && cityFormat.test(maCommandeForm.get('city'))) {
                let contact = {
                    firstName: maCommandeForm.get("firstName"),
                    lastName: maCommandeForm.get("lastName"),
                    city: maCommandeForm.get("city"),
                    address: maCommandeForm.get("address"),
                    email: maCommandeForm.get("email"),
                }
                const myCart = { contact, products };
                console.log("myCart", myCart);
                envoieDonnee("http://localhost:3000/api/cameras/order", myCart)
            }
        });
    });
}
 /*----------UITLISATION DE LA METHOD POST POUR ENVOIE DES DONNES DU FORMULAIRE SOUS FORME JSON---- */
async function envoieDonnee(url, order) {

    fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(order)

        }).then(function(response) {
            return response.json();
        })
        .then(function(myJsonObj) {
            localStorage.setItem('commande', JSON.stringify(myJsonObj));
            window.location.replace('./confirmation.html');
            alert('Votre commande a bien été enregistré par nos services !')
        })
        .catch(function(error) {
            console.error("Erreur au niveau des données dans la requête order", error);
        });
}

 /*----------FONCTION POUR CHANGER LA QUANTITE ET METTRE A JOUR LES PRIX---- */
function updateQte(eltId, action) {
    let qteElt = document.getElementById(`qte-${eltId}`);
    let totalElt = document.getElementById(`prixTotal-${eltId}`)
    let totalPanier = document.getElementById('totalPanier');
    console.log(qteElt)
    let qte = parseInt(qteElt.textContent);
    let nvelleQte = 0;
    let price = productsLists[eltId].productPrice;
    let newTotal = totalPanier.textContent;
    if (action === "plus") {
        nvelleQte = qte + 1;
        newTotal = parseInt(totalPanier.textContent) + price;
    } else {
        if (qte - 1 >= 0) {
            nvelleQte = qte - 1;
            newTotal = parseInt(totalPanier.textContent) - price;
        }
    }

    let resultPrice = nvelleQte * price;

    productsLists[eltId].productQuantity = nvelleQte;
    qteElt.textContent = nvelleQte;
    totalElt.textContent = `${resultPrice} €`;
    totalPanier.textContent = `${newTotal}`;
    localStorage.setItem('cart', JSON.stringify(productsLists));
    console.log(productsLists[eltId].productQuantity);
}

/*-------OUVERTURE et FERMETURE DES CHOIX DU MENU AU NIVEAU DU RESPONSIVE DESIGN---------- */   
var i = document.querySelector("i");
var menu = document.querySelector(".menu");
var nav = document.querySelector(".nav")
i.addEventListener("click",(e)=>{
menu.classList.toggle('menu_open');
})

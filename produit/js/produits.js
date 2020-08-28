
/*-------APPEL API RECUPERATION DES DONNEES PRODUITS*/
const cameraList = document.getElementById('camera_list');

async function retrieveResult(url) {
    let result = await fetch(url)
    return result.json()
}
/*-------AFFICHAGE DES CARATERISTIQUES PRODUITS CAMERA GRACE AU INNER.HTML*/
retrieveResult(url).then(camera => {
    console.log(camera)
    camera.forEach(camera => {
        console.log(camera)
        cameraList.innerHTML += `
        <div class="ensemble__produits">
        <article class="bloc__image--nom--prix">
            <a href="choix.html?id=${camera._id}"><img id="image_responsive" src="${camera.imageUrl}" alt="Photo de ${camera.name} "></a>
           
            <div class="bloc__nom--prix">
                <div><strong>Nom :</strong> ${camera.name}</div> 
                <div><strong>Prix :</strong>${camera.price}€</div>
              
            </div>
        </article>
        
    </div>`
    })})
    /* ----------RECUPERATION IMAGES DANS LE DOSSIER POUR AFFICHAGE DIAPORAMA */
    var images = ["vcam_1.jpg","vcam_2.jpg","vcam_3.jpg","vcam_4.jpg","vcam_5.jpg",];
var time = 3000;
var i = 0;
function changeImg(){
    document.slide.src = images[i];
    if (i < images.length - 1) {
        i++;
    } else {
        i = 0;
    }
setTimeout("changeImg()",time);
}
window.onload = changeImg;

/*-------OUVERTURE et FERMETURE DES CHOIX DU MENU AU NIVEAU DU RESPONSIVE DESIGN---------- */
var it = document.querySelector("i");
var menu = document.querySelector(".menu");
var nav = document.querySelector(".nav")
it.addEventListener("click",(e)=>{
menu.classList.toggle('menu_open');
})
let button=document.querySelectorAll('#buttons');
let btn=document.querySelectorAll('span');
let value=document.getElementById('value');
let tooggle=document.querySelector('.tooggle')
let body = document.querySelector('body');
let equal=document.querySelector('#equal')


tooggle.onclick = function(){
    body.classList.toggle("dark");  
}



for(let i=0; i<=btn.length; i++){
    btn[i].addEventListener("click", function() {
        if(this.innerHTML=="="){
            value.innerHTML=eval(value.innerHTML);
            value.style.color="green"
        }else{
            if(this.innerHTML=="CLR"){
                value.innerHTML="";
            }else
                if(this.innerHTML=="DEL"){
                    value.innerHTML= value.innerHTML.substring(0, value.innerHTML.length -1);
                }else{
                    value.innerHTML+=this.innerHTML;
            }
        }
    })
}



 
  //let bodyHeight=document.querySelector('#body').clientHeight;
  let directionY=1;
  let directionX=1;

  let positionX=0;
  let positionY=0;

  let ball = document.getElementById("myBall");
  let limitBottom = window.innerHeight-ball.clientHeight;
  let limitWidth=window.innerWidth-ball.clientWidth;
  let compter=0;

document.addEventListener('DOMContentLoaded', function(){
  window.requestAnimationFrame(move);

  function move(){
    window.requestAnimationFrame(move);
          positionY+= 5*directionY;
          positionX+= 5*directionX;

          // ball.style=`left:${positionX}px`;
          ball.style=`top:${positionY}px`;
          
          if(positionY <= 0 || positionY>=limitBottom ){
            directionY *= -1;
          } 

          if(positionX <= 0 || positionX>=limitWidth ){
            directionX *= -1;
          }
        }

})

// COURS JAVASCRIPT A LIRE



# Document Object Model (DOM)

Jusqu'à maintenant, la découverte de JavaScript n'a pas été très utile pour nous permettre d'agir sur les pages web.
L'intérêt du JavaScript étant de transformer des pages HTML statique en application web dynamique, nous allons voir différentes manières d'interagir avec le DOM, plus spécifiquement différentes méthodes permettant de sélectionner des éléments HTML pour pouvoir par la suite les modifier, les animer, ou autre.

Avant de voir ces méthodes, quelques explications sont nécessaires à propos de l'objet `window` et de sa propriété `document`.
### Window:
```javascript
console.log(window);
```
L'objet `window` est l'objet global qui représente un onglet du navigateur. Tout le code JavaScript qui est éxécuté sur une page partage cette objet global.
L'objet global est l'endroit ou l'objet Math est défini, ainsi que les différentes classes et fonctions JavaScript native. 
De plus on peut avoir accès des informations de l'historique `window.history` de l'onglet, ainsi que différentes informations comme la largeur `window.innerWidth` ou la hauteur `window.innerHeight` de l'onglet.

### Document:
Le `document` est une propriété de l'objet `window`, il représente le HTML et on s'en sert pour modifier
ou créer toutes choses.

Il est impossible de lister toutes les méthodes et propriétés du `document` ici, voici un lien vers les
[spécifications](https://dom.spec.whatwg.org)

Voici un exemple de HTML, nous allons explorer différentes méthodes JavaScript pour sélectionner et agir sur ces éléments.

```html
<div id="app">
    <div class="container">
        <section>
            <article>
                <h2>Titre de l'article</h2>
                <p>1er paragraphe</p>
                <p>2ème paragraphe</p>
                <p id="test">3ème paragraphe</p>
                <a href="#!">lien</a>
                <ul>
                    <li class="test"><a href="#!">1ère li</a></li>
                    <li><a href="#!">2ème li</a></li>
                    <li><a href="#!">3ème li</a></li>
                </ul>
            </article>
        </section>
    </div>
</div>
```
### Méthodes de sélection de base :
#### `getElementById()`

```javascript
let element = document.getElementById('app');
console.log(element);
```

Cette méthode permet de sélectionner un élément par son ID, et elle retourne un élément HTML.
On peut ensuite agir dessus, pour modifier le CSS par exemple :
```javascript
element.style.backgroundColor = 'lightgrey';
element.style.padding = '1em';
```

**Rappel: une ID doit être unique.**
Si par erreur plusieurs éléments ont la même ID, le comportement de cette méthode devient erratique et 
peut sélectionner n'importe quel élément.

#### `querySelector()`
La méthode `querySelector` permet de sélectionner un élément, 
mais est beaucoup moins rigide que la précédente. Elle accepte tout type de sélecteurs CSS.
```javascript
element = document.querySelector('p'); // Sélectionne le premier <p> sur la page
console.log(element);
element = document.querySelector('li:nth-child(2)'); // Sélectionne la 2ème <li>
console.log(element.innerText);
element = document.querySelector('ul');
let li = element.querySelector('li:first-child');
console.log(li);
```

On peut aussi se servir d'un élément pour en sélectionner un autre.
```javascript
element = document.querySelector('ul'); // document Sélectionne la <ul>
let li = element.querySelector('li:first-child'); // <ul> sélectionne première <li>
console.log(li);
```

#### `querySelectorAll()`
Cette méthode permet de sélectionner une groupe d'éléments appelés `NodeList`.
On peut sélectionner tous les éléments, elle accepte tous types de sélecteurs CSS, et également les pseudo-sélecteurs.

```javascript
let elements = document.querySelectorAll('li');
console.log(elements);
elements = document.querySelectorAll(':hover'); // pseudo-sélecteurs.
console.log(elements);
```
Sélectionner les éléments avec un pseudo-sélecteur ne vous sera utile que lorsque on gérera les `events`.

#### `classList`
La propriété `classList` est utilisé pour ajouter ou enlever des classes CSS aux éléments sélectionnés.
```javascript
let a = document.querySelector('ul > li:first-child a');
a.classList.add('yellow');
a.classList.remove('test');
```
Ici, on a ajouté simplement la classe yellow et on a enlevé la classe test.

La méthode toggle est souvent utilisé pour cacher ou afficher un élément.
Cette méthode ajoute une classe si l'élément sélectionné ne possède pas cette classe,
elle enlève la classe si l'élément la possède.
On peut imaginer cliquer un bouton et quand on le clique, on affiche ou cache un élément.
```css
/*CSS*/
.active {
    display: block;
}
```
```javascript
// JS
a.classList.toggle('active');
```


### `events`
les `events` sont des évènements qui se produisent quand on navigue sur une page, 
quand la souris bouge, quand on clique un élément ou quand on tape sur le clavier par exemple.
Il existe plusieurs types d'évènements, les natifs et ceux qu'on crée.
Pour l'instant, on va voir les events les plus courantes, 
qui se produisent quand la page web a finie de se charger, 
quand on tape sur le clavier et quand on agit avec la souris.

On ajoute ce qu'on appelle des `events listener` avec une méthode qui accepte deux arguments,
le premier argument est l'évènement qu'on souhaite écouter, le second est une fonction dite 'callback'
qui sera exécuté quand l'évènement se produira.
La fonction de callback peut accepter optionnellement l'évènement.
Ajoutons l'évènement suivant :
##### `DOMContentLoaded`
Cet évènement se produit quand la page web est chargée et indique que 
tous les éléments sont 'prêts' et qu'on peut agir sur la page avec le code javascript.
```javascript
document.addEventListener('DOMContentLoaded', function(event) {
    console.log('ready');
    console.log(event);
});
```
Voici une autre façon d'écrire un `eventListener`, on crée une fonction séparée et on la passe par référence en callback :
```javascript
function domReady(event) {
    console.log('domReady');
    console.log(event);
}

document.addEventListener('DOMContentLoaded', domReady);
```
Il est judicieux d'exécuter le JavaScript après qu'on ai reçu cet évènement.

##### `Keyboard Events`
Les évènements du clavier peuvent être utilisés pour faire défiler les images d'une galerie photo par exemple.
Différentes `event` sont disponibles : `keydown`, `keyup`.
Quand on `console.log()` l'évènement, on se rend compte qu'on a différentes propriétés qu'on peut utiliser pour identifier la touche du clavier,
Ensuite on peut prévenir son fonctionnement par défaut et faire ce qu'on veut avec :
```javascript
document.addEventListener('keydown', function(event) {
    console.log(event);
    if(event.code === 'Space') {
        event.preventDefault(); // Empêcher le déroulement de la page
        console.log('On change la photo du slider');
    }
});
```
##### `Mouse Events`
Il y a également plusieurs types d'évènements concernant 
la souris : le clique, le double clique, les mouvements etc etc..
Voyons en quelques un :
```javascript
// clique gauche simple
document.addEventListener('click', function(event) {
    //On empêche le comportement par défaut de l'élément :
    //Si l'élément est un lien, il dirigera pas la ou le href indique : il ne fera rien. 
    event.preventDefault();
    // On log l'élément qu'on a cliqué :
    console.log(event.target);
});
// double clique :
document.addEventListener('dblclick', function(event) {
    event.preventDefault();
    
    console.log(event);
});
// mouvement de la souris
document.addEventListener('mousemove', selectElementOnHover);
// On sélectionne les <a> quand on passe la souris dessus
function selectElementOnHover() {
    let elems = this.querySelectorAll('ul li > a:hover');
    if (elems.length > 0) {
        console.log(elems);
    }
}
```
Voici quelques évènements souris disponible :
`mousedown, mouseup, mouseover, mouseout, click, dblclick, contextmenu`

#### `removeEventListener`
Enfin, si on peut ajouter un `eventListener`, on peut aussi l'enlever :
```javascript
document.removeEventListener('mousemove');
```
Si on a passé une fonction de callback par référence à un élément, il est **nécessaire** de l'enlever de la même manière :
```javascript
document.removeEventListener('mousemove', selectElementOnHover);
``` 
                 
                 
                 // code fusée
                        //js
                'use strict';

/***********************************************************************************/
/* ******************************* DONNEES GLOBALES ********************************/
/***********************************************************************************/
const IMG_PATH = 'images/';
const START = 10;

let timer;
let count;

/***********************************************************************************/
/* ********************************** FONCTIONS ************************************/
/***********************************************************************************/

// Gestionnaire d'événement au clic sur le bouton de mise à feu
function onClickFiringButton()
{
    // Une fois que la mise à feu lancée, on désactive le bouton de mise à feu
    firingButton.removeEventListener('click', onClickFiringButton);
    firingButton.classList.add('disabled');

    // Programmation du décollage de la fusée à la fin du compte à rebours
    scheduleTakeOff();
    
    // Affichage initial du compte à rebours
    countDown();
    
    // Lancement du compte à rebours
    timer = window.setInterval(countDown, 1000);
    
    // On change la source de l'image de la fusée
    updateRocket('rocket2.gif');
}

/**
 * Programme le décollage de la fusée à la fin du compte à rebours
 */
function scheduleTakeOff()
{
    // Programmation du décollage pour dans x secondes
    setTimeout(function(){

        // On change la source de l'image de la fusée
        updateRocket('rocket3.gif');

        // On fait décoller la fusée en lui donnant la classe 'tookOff', la transition CSS fera le reste
        rocket.classList.add('tookOff');

    }, count * 1000);
}

/**
 * Gestion du compte à rebours
 *  */ 
function countDown()
{
    // Affichage sur le panneau du compte à rebours
    billboard.textContent = count;
    
    // On décrémente le compteur
    count--;
    
    // Si le compteur arrive à -1, on stoppe le chronomètre
    if( count == -1 ){
        
        window.clearInterval(timer);
    }
}

/**
 * Met à jour l'image de la fusée
 * @param {string} filename - Nom du fichier
 */
function updateRocket(filename)
{
    rocket.src = IMG_PATH + filename;
}


/**
 * Fonction qui permet de créer des étoiles
 * @param {number} number - le nombre d'étoiles à générer aléatoirement
 */
function createStars(number) {
    // l'ensemble des classes que peut prendre l'étoile
    let starSize = ["tiny", "normal", "big"];
    // Créer une div avec l'id "stars";
    let starDiv = document.createElement("div"); // cré un balise <div></div>
    starDiv.setAttribute("id", "stars"); // ajouté un id="stars" à la div
    let main = document.querySelector("main");
    // Insérer l'élement créé avant le main
    document.body.insertBefore(starDiv, main);
    for (let i = 0; i < number; i++) {
        // Le nom de l'étoile
        let starName = "star-" + (i+1);
        // Création de l'étoile
        let star = document.createElement("div");
        star.setAttribute("id", starName);
        // Attribution d'une id à l'étoile
        star.className = "star";
        // Attribution d'une classe (tiny|normal|big) aléatoirement
        let classId = getRandomInteger(0, starSize.length - 1); // génère un nombre entre 0 et 2
        star.classList.add(starSize[classId]); // arr[]


        // Math.floor(number) - permet d'arrondir à l'entier inférieur le plus proche
        // Math.ceil(number) - permet d'arrondir à l'entier supérieur le plus proche
        // Math.round(number)

        // Attribution de propriétés left & right
        let starLeft = getRandomInteger(0, window.innerWidth);
        let starTop = getRandomInteger(0, window.innerHeight);
        
        star.style.top = starTop.toString() + "px";
        star.style.left = starLeft.toString() + "px";
        starDiv.append(star);
    }
}

/************************************************************************************/
/* ******************************** CODE PRINCIPAL **********************************/
/************************************************************************************/

// Initialisation des variables globales
count = 10;

// Sélection des différents éléments du DOM sur lesquels nous allons agir
const rocket = document.getElementById('rocket');
// const billboard = document.querySelector('#billboard span');
const billboard = document.getElementsByTagName('span');
const firingButton = document.getElementById('firing-button');

// Installation du gestionnaire d'événement au clic sur le bouton de mise à feu
firingButton.addEventListener('click', onClickFiringButton);

// Création aléatoire d'étoiles
createStars(150);

                        //html

<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <title>Compte à rebours</title>
        <script src="js/utilities.js"></script>
        <link rel="stylesheet" href="css/rocket.css">
    </head>
    <body>
         <main>
            <div class="container">
                <img id="moon" src="images/fullmoon.png" alt="Fullmoon">
            <aside id="billboard">
                <span id="span"></span>
            </aside>
            <img id="launching-ramp" src="images/launching-ramp.png" alt="Launching ramp">
            <img id="firing-button" src="images/firing-button.png" alt="Firing button">
            <img id="cancel-button" src="images/cancel-button.png" alt="cancel button">
            <img id="rocket" src="images/rocket1.png" alt="rocket">
            </div>  
        </main>
        <script src="js/main.js"></script>
    </body>
</html>


                //css


html {
    background-color: #000033;
}

body {
    margin: 0;
    overflow: hidden;
}

#moon {
    position: absolute;
    top:100px;
    right:100px;
    width:150px;
}

#firing-button {
    position: absolute;
    left:100px;
    bottom: 100px;
    width:75px;
    height:75px;
    cursor: pointer;
}

#cancel-button {
    position: absolute;
    left:200px;
    bottom: 100px;
    width:75px;
    height:75px;
    cursor: pointer;
}

.disabled {
    filter:grayscale(100%);
    cursor: default;
}

#billboard {
    position: absolute;
    left:50px;
    top:100px;
    width: 314px;
    height: 200px;
    background-image: url('../images/billboard.png');
    background-size: auto 100%;
    background-repeat: no-repeat;
}

#billboard span {
    display: inline-block;
    width: 100px;
    height: 170px;
    position: absolute;
    right: 15px;
    top: 15px;
    
    font-size: 5rem;
    line-height: 170px;
    color: white;  
}

#launching-ramp {
    position: absolute;
    bottom:0;
    left: 50%;
    transform: translate(calc(-50% - 150px));
}

#rocket {
    position: absolute;
    bottom:-207px;
    width:200px;
    left: 50%;
    transform: translate(-50%);
    transition: bottom 20s ease, left 15s, transform 5s 1s;
}

#rocket.tookOff {
    bottom: 2000px;
    left: 75%;
    transform: rotate(30deg) scale(0.5);
}

.star {
    position: absolute;
    background-color: #fff;
    border-radius: 50%;
    z-index:-1;
}

.star.tiny {
    width: 1px;
    height: 1px;
}

.star.normal {
    width: 2px;
    height: 2px;
}

.star.big {
    width: 3px;
    height: 3px;
}


// arkanoid  

'use strict';

// On défini le propriété de notre balle dans un objet
let ball = {
    color: "#FF0000",
    radius: 10,
    x: 100,
    y: 100,
    direction: {y:-1,x:0},
};

// On défini les propriété de notre jeu
let game = {
    start : false,
    pause : false,
    background: '#DDDDDD',
    width:800,
    height:600,
    speed: 5,
    gameOver : false,
    animationId : null,
    canvasDom : null,
    ctx : null
}

// On défini le propriété de notre plateau dans un objet
let paddle = {
    color: "#000000",
    width: 100,
    height: 20,
    x: 0,
    y: 500,
    direction: 0,
    speed: 6
};

// On défini nos briques
let bricks = [{ color: '#333333', numberCollisions: 1 }, { color: '#00FF00', numberCollisions: 2 }, { color: '#333333', numberCollisions: 1 }, { color: '#00FF00', numberCollisions: 2 }, { color: '#333333', numberCollisions: 1 }, { color: '#00FF00', numberCollisions: 2 }, { color: '#333333', numberCollisions: 1 }, { color: '#00FF00', numberCollisions: 2 }, { color: '#333333', numberCollisions: 1 }, { color: '#00FF00', numberCollisions: 2 }, { color: '#333333', numberCollisions: 1 }];

// Dès que le DOM est chargé on commence
document.addEventListener('DOMContentLoaded', function () {

    // On initialise notre jeu
    initGame();
    
    // On dessine notre jeu
    displayGame();

    // On lance notre jeu
    playGame();

});

/** Initialisation du jeu 
 * 
*/
function initGame()
{
    // L'objet du DOM Canvas
    game.canvasDom = document.querySelector('#canvas');

    // On définie la largeur et hauteur de notre Canvas ici plutôt qu'en dur dans le HTML
    game.canvasDom.width = game.width;
    game.canvasDom.height = game.height;

    // Le context utilisé avec Canvas qui donne accès aux librairies de manipulation 2D
    game.ctx = game.canvasDom.getContext('2d');

    // On initilialise les positions des élements qui doivent être initialisés 
    initPositions();

    /** On initialise les évènement du clavier */
    document.addEventListener('keydown', keyboardEvent);
    document.addEventListener('keyup', keyboardEvent);
}

/** Initialisation de la position de plateau, de la balle et des directions*/
function initPositions()
{
    // position du plateau
    paddle.x = game.width / 2 - paddle.width /2;
    paddle.y = game.height-100;

    // position de la balle (sur la plateau)
    ball.y = paddle.y - ball.radius;
    ball.x = paddle.x + paddle.width / 2;

    // Direction de la balle sur X et Y
    ball.direction.y = -1;
    ball.direction.x = 0;
}


/** On lance le jeu 
 * 
*/
function playGame() {

    // on modifie la position du plateau en fonction de sa direction et on le repositionne si il sort de la zone
    paddle.x += paddle.speed * paddle.direction;
    if (paddle.x + paddle.width > game.canvasDom.width)
        paddle.x = game.canvasDom.width - paddle.width;
    if (paddle.x < 0)
        paddle.x = 0;
        
    // On détecte si la balle entre en collision avec le canvas(haut, droite, gauche) ou la plateau
    detectCollisions();

    /* On modifie la position y de la balle si le jeu a commencé
    Sinon la balle reste accrochée au plateau */
    if(game.start && !game.pause)
    {
        ball.y += game.speed * ball.direction.y;
        ball.x += game.speed * ball.direction.x;
    }
    else if(!game.start)
    {
        ball.y = paddle.y - ball.radius;
        ball.x = paddle.x + paddle.width / 2;
    }

    // On redessine notre jeu
    displayGame();

    // On demande à JS de relancer cette fonction à chaque rafraichissement de l'écran
    game.animationId = requestAnimationFrame(playGame);
}

/** Cette fonction va détecter les collisions */
function detectCollisions()
{
    //Si la balle arrive en bas du canvas alors GAME OVER
    if (ball.y + ball.radius >= game.canvasDom.height)
        game.gameOver = true; 

    // Si la balle arrive en haut du canvas elle rebondit
    if (ball.y - ball.radius <= 0)
        ball.direction.y *= -1;

    // Si la balle arrive à droite ou à gauche du canvas elle rebondit
    if (ball.x <= 0 || ball.x + ball.radius >= game.width)
        ball.direction.x *= -1;

    // Si la balle touche le plateau elle rebondit
    if ((ball.y == paddle.y || ball.y+ball.speed ==paddle.y+ball.speed) && (ball.x >= paddle.x && ball.x <= paddle.x+paddle.width))
    {
        ball.direction.y *= -1;

        // Selon si la balle touche le plateau sur la partie droite ou gauche elle va prendre un angle (plateau divisé en 3)
        if (ball.x + ball.radius <= paddle.x + paddle.width / 3 || ball.x - ball.radius <= paddle.x + paddle.width / 3)
            ball.direction.x = -1;
        else if (ball.x + ball.radius >= paddle.x + paddle.width * 2 / 3 || ball.x - ball.radius >= paddle.x + paddle.width * 2 / 3 )
            ball.direction.x = 1;
        else
            ball.direction.x = 0;
    }

    // On détecte si la balle touche une brique
    bricks.forEach((brick) => {
        if (brick.numberCollisions > 0) {
            //Selon la direction de la balle on va regarder si on touche le haut ou la bas de la brique
            if (ball.direction.y == -1 && ball.y - ball.radius == brick.y + 20 || ball.direction.y == 1 && ball.y + ball.radius == brick.y)
            {
                // Et enfin on regarde si la balle est dans la zone de la brique 
                if(ball.x+ball.radius >= brick.x && ball.x+ball.radius <= brick.x+100 ) {
                    brick.numberCollisions--;
                    ball.direction.y *= -1;
                }
            }
        }
    });

}
/** Fonction qui affiche le cercle avec ces coordonnées et la couleur défini dans le contexte 
 * 
*/
function displayGame() {
    
    // On vide le Canvas avant de redessiner
    game.ctx.clearRect(0, 0, game.canvasDom.width, game.canvasDom.height);
    /** Fond de la zone de jeu */
    game.ctx.fillStyle = game.background;
    game.ctx.fillRect(0, 0, game.canvasDom.width, game.canvasDom.height);

    /* Si game over on affiche le message et on affiche plus le reste */
    if (game.gameOver) {
        displayGameOver();
        return;
    }

    /* Si game win on affiche le message et on affiche plus le reste */
    if (game.win) {
        game.start = false;
        displayWin();
        return;
    }

    /** Dessin du plateau */
    game.ctx.fillStyle = paddle.color;
    game.ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    /** On affiche les briques restantes */
    displayBricks();

    /** Dessin de la balle */
    game.ctx.fillStyle = ball.color;
    game.ctx.beginPath();
    game.ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    game.ctx.fill();
}

/** On va dessiner nos briques */
function displayBricks()
{
    let displayingBrick = 0;
    let tmpBrickWidth = 73;
    let tmpBrickHeight = 20;

    // On affiche toutes les briques qui n'ont pas leur collision à 0 (qui ne sont pas cassées)
    bricks.forEach((brick,num)=>{
        if (brick.numberCollisions > 0) {
            game.ctx.fillStyle = brick.color;
            brick.x = tmpBrickWidth * num;
            brick.y =50;
            game.ctx.fillRect(brick.x, brick.y, tmpBrickWidth, tmpBrickHeight);
            displayingBrick++;
        }
    });

    // Si aucune brique n'a été affichée le jeu est gagné !
    if (displayingBrick == 0)
        game.win = true;
}

/** Fonction qui affiche le gameOver */
function displayGameOver()
{
    game.ctx.fillStyle = 'black';
    // On définie la police de caractère
    game.ctx.font = 'bold 30px Verdana';

    //On mesure la largeur du texte pour le centrer sur X
    let txtMetrics = game.ctx.measureText('Game Over');

    // On ecrit Game Over
    game.ctx.fillText('Game Over', game.width / 2 - txtMetrics.width/2, game.height/2);
}


/** Fonction qui affiche le gameOver */
function displayWin() {
    game.ctx.fillStyle = 'green';
    // On définie la police de caractère
    game.ctx.font = 'bold 30px Verdana';

    //On mesure la largeur du texte pour le centrer sur X
    let txtMetrics = game.ctx.measureText('You win !');

    // On ecrit Game Over
    game.ctx.fillText('You win !', game.width / 2 - txtMetrics.width / 2, game.height / 2);
}

/** Gestionnaire des évènement du clavier
 * @param {event} e l'évènement keydow
 * 
 */
function keyboardEvent(e)
{
    // on détecte la touche et la direction
    switch (e.code) {
        case 'ArrowRight':
            if (e.type == 'keydown')
                paddle.direction = 1;
            else
                paddle.direction = 0;
            break;
        case 'ArrowLeft':
            if (e.type == 'keydown')
                paddle.direction = -1;
            else
                paddle.direction = 0;
            break;
        case 'Space' :
            if (e.type == 'keydown')
            {
                if(game.start==false)
                    game.start = true;
                else if(game.gameOver == true)
                {
                    game.gameOver = false;
                    game.start = false;
                    initPositions();
                }
                else 
                    game.pause = !game.pause;
            }
    }
}

//code class

//Class user 
class User{
    constructor(name, firstName, nameJob, age){
        this.nameJob=nameJob;
        this.name=name;
        this.firstName=firstName;
        this.age= new Age(age).getAge;    
    }
        
    fullname(name, firstName){
        this.name=name;
        this.firstName=firstName;
        console.log(this.name+" "+ this.firstName);
    }

    /**
     * @param {String} nameNewJob
     */

    //Acesseur set permettant de remplacer le job
    
    set job(nameNewJob){
        this.nameJob=nameNewJob;
    }
    // Accesseur get qui retourne l'actuel job
    get job(){
        return this.nameJob;
    }
}
 
class Admin extends User{
    
    canEditArticles(){
        return true;
    }
}

class Age{

    constructor(age){ 
        this.age=age;
    }

    get getAge(){
        // if (!(this.age<-10 && this.age>150)){
        //     return this.age
        // }
        return (this.age<0 || this.age>150 || typeof(this.age) ==='string')?null:this.age;
    }

    // /**
    //  * @param {number} newAge
    //  */
    // set setAge(newAge){
    //     this.age=newAge;
    // }
}


let user1=new User("MEDENOU", "Marcos" , "developpeur" , "ghcdh");
console.log(user1.age)
// user1.age=new Age(22);
// let Admin1=new Admin("CODJO", "adjanou");
// user1.fullname("MEDENOU", "Marcos");
// Admin1.fullname("CODJO", "Marthin");
// console.log(Admin1.canEditArticles());
// console.log(user1);
// console.log(Admin1);
// Admin1.job="Developpeur fullstack"
// user1.job="Developpeur front-end";
// console.log(user1);
// console.log(Admin1);

//super arkanoid

// Basic canvas
const canvas = document.getElementById("myCanvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

// Mouse Movement
const mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener(`mousemove`, (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

// // Main Player
class Player {
  constructor(x, y, length, height, color) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.height = height;
    this.color = color;
  }

  draw() {
    c.save();
    c.beginPath();
    c.rect(this.x, this.y, this.length, this.height);
    c.fillStyle = this.color;
    c.fill();
    c.restore();
  }

  update() {
    this.draw();
  }
}

// Ball
class Ball {
  constructor(x, y, dy, dx, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dy = dy;
    this.dx = dx;
    this.velocity = velocity;
  }

  draw() {
    c.save();
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.restore();
  }

  update() {
    this.draw();

    // ball pyhsics

    if (this.y + this.radius + this.dy > canvas.height) {
      // this.y = canvas.height - this.radius;
      this.dy = 0;
      this.dx = 0;
    }
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
  }
}

// obstacle
class Obstacle {
  constructor(x, y, length, height, color, status) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.height = height;
    this.color = color;
    this.status = status;
  }
}

let length = 150;
const height = 15;
const x = mouse.x;
const y = canvas.height - 60;

// let mousePosition = new Victor(0, 0);

let player = new Player(x, y, length, height, `blue`);

const bx = canvas.width / 2;
const by = canvas.height / 2;
const bradius = 11;
const dy = 8;
const dx = -4;
const velocity = 4;

let ball = new Ball(bx, by, dy, dx, bradius, `red`, velocity);

let obstacles = [];

let rowCount = 2;
let colCount = 6;

for (let r = 0; r < rowCount; r++) {
  obstacles[r] = [];
  for (let cl = 0; cl < colCount; cl++) {
    const x = (30 + cl * 50) * 1.8;
    const y = 60 + r * 40;
    const color = `rgb(${Math.random() * 255}, 120,150)`;
    obstacles[r][cl] = new Obstacle(x, y, 80, 15, color, false);
  }
}

let hit = 0;

function draw() {
  for (let cl = 0; cl < colCount; cl++) {
    for (let r = 0; r < rowCount; r++) {
      if (!obstacles[r][cl].status) {
        c.beginPath();
        c.rect(
          obstacles[r][cl].x,
          obstacles[r][cl].y,
          obstacles[r][cl].length,
          obstacles[r][cl].height
        );
        c.fillStyle = obstacles[r][cl].color;
        c.fill();
        c.closePath();
      }
      if (!obstacles[r][cl].status) {
        let b = obstacles[r][cl];
        if (
          ball.x + ball.radius > b.x &&
          ball.x - ball.radius < b.x + b.length &&
          ball.y + ball.radius > b.y &&
          ball.y - ball.radius < b.y + b.height
        ) {
          ball.dy *= -1;
          b.status = true;
        }
      }
    }
  }
}

// Rendering of all the objects
function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, canvas.width, canvas.height);

  c.beginPath();
  // c.moveTo(50, 100);
  c.lineTo(0, canvas.height - 60);
  c.lineTo(canvas.width, canvas.height - 60);
  c.strokeStyle = "black";
  c.stroke();
  c.save();

  // player drawing
  player.x = mouse.x - length / 2;
  player.update();

  // ball drawing
  ball.update();

  if (
    ball.y + ball.radius > player.y &&
    ball.y < player.y + player.height &&
    ball.x + ball.radius > player.x &&
    ball.x < player.x + player.length
  ) {
    let collidPoint = ball.x - (player.x + player.length / 2);
    collidPoint = collidPoint / (player.length / 2);
    let angle = collidPoint * (Math.PI / 3);
    ball.dy = -(ball.velocity * Math.cos(angle));
    ball.dx = ball.velocity * Math.sin(angle);
  }

  draw();
}

animate();

// // Main Player Movement
// window.addEventListener(`keydown`, (e) => {
//   switch (e.key) {
//     // case `ArrowUp`:
//     //   break;
//     case `ArrowLeft`:
//       player.x -= velocity;
//       break;
//     // case `ArrowDown`:
//     //   break;
//     case `ArrowRight`:
//       player.x += velocity;
//       break;
//   }
// });


//exercices 


PROPOSITION D’EXERCICES POUR RÉVISER LES MÉTHODES

EXERCICES 1 :Écrire un programme qui permet de ressortir la longueur d’un tableau ou d’une chaîne de caractère 
‘marcos’ =>6

EXERCICES 2 : Écrire un programme qui permet de compter le nombre de fois qu’il y a une lettre dans une chaîne de caractère ou dans un tableau. Il peut s’agir d’une fonction qui reçoit en argument la chaîne de caractère ou le tableau et la lettre a compter.
‘medenou’, m => 1 fois 

EXERCICES 3 : Écrire un programme qui permet de retirer un caractère préciser dans un chaîne de caractère ou dans un tableau.
‘string’, s => tring

EXERCICE 4 :Écrire un programme qui permet de transformer par bon de 2 chacune des lettres du nom de l’utilisateur en majuscule.
Indication :Pensez a traiter les espaces au cas ou l’utilisateur en mettait
Medenou marcos => MeDeNoU MaRcOs

EXERCICE 5 :Écrire un programme qui insère dans un tableau chacun des mots d’un phrase.

EXERCICE 6 :Écrire une fonction qui reçoit en entré  une chaîne de caractère composé uniquement de chiffres et renvoie dans un tableau chacun des chiffres sauf ceux qui sont impairs.

EXERCICE 7 :Écrire un programme qui affiche la date actuel dans le format fr-fr et en-US
Exemple : Mardi 1er Novembre 2022

EXERCICE 8 :Écrire un programme qui reçoit cinq différentes fruits de votre choix et les affiche tous ensemble dans un tableau. Bien avant, essayez de le faire sans utiliser un tableau 
fruit1, fruit2, fruit3, fruit3, fruit4, fruit5 =>[fruit1, fruit2, fruit3, fruit3, fruit4, fruit5]
Essayez d’obtenir cet affichage=> fruit1fruit2fruit3fruit3fruit4fruit5

EXERCICE 9 : Écrire un programme qui retire le premier élément et le dernier d’un tableau peut importe sa taille 

EXERCICE 10 :Écrire un programme qui ajoute un élément au début et a la  d’un tableau, peut importe sa taille 

EXERCICE 11 :Écrire un programme qui affiche uniquement le premier et le dernier élément d’un tableau peut importe les éléments qui s’y trouvent.

EXERCICE 12 :Écrire un programme qui affiche tous les éléments d’un tableau sans inclure le premier et le dernier, peut importe les éléments qui s’y trouvent.

EXERCICE 13 :Écrire un programme qui renvoie l’index de chacun des éléments qui se trouvent dans un tableau.

EXERCICE 14 :Écrire un programme qui renvoie le dernier élément d’un tableau peut importe les éléments qui s’y trouvent.
EXERCICE 15 :Écrire un programme qui renvoie le premier élément d’un tableau et les trois suivants peut importe les éléments qui s’y trouvent.
[1,2,3,4,5,6] =>[1,2,3,4]

EXERCICE 16 : Écrire un programme qui supprime tous les chiffres 40 d’un tableau peut importe le nombre de fois qu’il s’y trouve.

EXERCICE 17 : Écrire un programme qui renvoie uniquement les multiples de 3 qui se trouve dans un tableau.

EXERCICE 18 : Écrire un programme Écrire un programme qui renvoie  les nombres pairs d’une part et les nombres impairs d’autres parts qui se trouve dans un tableau. Chacun des nombres devra être placé par ordre décroissantes 
NB : il faudra penser a retourner deux tableaux, un tableau contenant les nombres pairs et un autre contenant les nombres impairs. Vous pouvez le faire avec la méthode filter, oui mais ne vous limitez pas a cela. Pensez aux structures conditionnelle et aux boucles. Le plus important ici, c’est d’avoir le même résultat avec au moins trois codes qui se différent par leurs syntaxes. 

EXERCICE 19 :Écrire un programme qui renvoie un tableau contenant la racine carrée de tous les éléments qui se trouvent dans le tableau qu’il aurait reçu en entré.

EXERCICE 20 : Écrire un programme qui multiplie par 3, la somme de tous les éléments d’un tableau. 

3 Bonus pour les INFATIGABLES du code informatique :(

Bonus 1 : Écrire un programme qui reçoit en entré le nom et le(s) prénoms de l’utilisateur et affiche la position qu’occupe chacun des lettres dans les 24 lettres alphabétiques. 
‘abcd’ => 1234

Bonus 2 : Écrire un programme qui reçoit en entré une chaîne de caractère et insère un espace avant chaque chiffre.

Bonus 3 : Écrire une fonction qui permet de crypté le mot de passe des utilisateurs de votre site internet. 
Indication sur l’algorithme de cryptage : 
- Les voyelles sont automatiquement doublé si elle se retrouve entre une consonne.
- Les chiffres pairs qui suivent des lettres sont remplacé par le signe du pourcentage %.
- Les espaces sont remplacés par le signe de la division.

« Codez toujours comme si le gars qui finirait par maintenir votre code est un psychopathe violent qui sait ou vous vivez »
-Rick Osborne-

EXERCICE 21 : Écrire un code qui retire tous les espaces dans une chaîne de caractère contenant des espaces. 
    
    //exercices tirburce
    
    
    ## Exercice 1: FirstUpperCase
Difficulté: Easy

Créez une fonction firstUpperCase(string).
Cette fonction prend une phrase, et
retourne chaque mot avec la 1ère lettre en 
majuscule.

Tests:
firstUpperCase("bonjour tout le monde") devrait retourner "Bonjour Tout Le Monde"
firstUpperCase("bonjour") devrait retourner "Bonjour"

A vos claviers ! :)

## Exercice 2: LongestWord
Difficulté: Easy

Créez une fonction longestWord(string).
Cette fonction prend une chaîne de caractères, et retourne
la longeur du plus long mot.

Tests:

longestWord("bonjour à tous") devrait retourner 7 car "bonjour" est le plus long mot et il compte 7 caractères
longestWord("les chaussettes de l'archiduchesse) ==> retourner 15 en référence à "l'archiduchesse"

## Exercice 3: LargestNumber
Difficulté: Easy

Créez une fonction largestWord(arr).
Cette fonction doit retourner le plus grand nombre dans une liste de nombres passées en argument

Tests:

largestWord([20, 32, 97]) devrait retourner 97
largestWord([156, 851, 138]) devrait retourner 851
largestWord([357, 195, 759]) devrait retourner 759

## Exercice 4: ConfirmEnd
Difficulté: Easy

Créez une fonction confirmEnd(string, end).
Cette fonction doit vérifier que le string qu'on lui passe termine bien
par le caractère "end".

Tests:

confirmEnd("bonjour", "n") devrait retourner false
confirmEnd("bonjour", "r") devrait retourner true

## Exercice 5: Tracage
Difficulté: Easy

Créez une fonction truncate(str, num) {...}
Cette fonction doit tronquer la chaîne de caractères si la 
longueur de ce dernier dépasse le nombre spécifié par le paramètre "num".
Retournez la chaîne de caractères tronquée avec ... à fin.

Tests:

truncate("bonjour à tous", 5) devrait retourner "bonjo..."
truncate("salut", 8) devrait retourner "salut"

## Exercice 6:  Les détectives
Difficulté: Easy

Créez une fonction findElement() qui traverse un tableau et retourne le premier élément qui passe le "test de vérité". C'est-à-dire que pour un élément donné, le test de vérité est passé si func(x) est vrai. Si aucun élément ne passe le test, retournez undefined.

Tests:
findElement([1, 3, 5, 8, 9, 10], function(num) { return num % 2 === 0; }) devrait retourner 8

findElement([1, 3, 5, 9], function(num) { return num % 2 === 0; }) devrait retourner undefined

## Exercice 7: Les perroquets
Difficulté: Easy

Créez une fonction repeat(string, num) qui prend 2 paramètres: un mot puis un entier.
La fonction doit pouvoir répéter le mot qu'on lui passe le nombre de fois spécifié.

Tests:

repeat ("abc", 3) devrait retourner "abcabcabc"
repeat ("*", 3) =devrait retourner "***"
repeat ("bonjour", 2) devrait retourner "bonjourbonjour";

## Exercice 8: Factorisation
Difficulté: Médium

Créez une fonction factorialize(number) qui retourne le factoriel d'un entier.
Le factoriel d'un entier n, souvent noté n! est le produit de tous les entiers positifs
inférieur ou égal à n.
ex 5! = 1 * 2 * 3 * 4 * 5 = 120

## Exercice 9: Téléportation et Fusion
Difficulté: Medium

Il vous est donné deux tableaux et un index.
Créez une fonction frankenSplice(arr1, arr2, index).
Copiez dans l'ordre chaque élément du premier tableau dans le second tableau.
Commencez par insérer les éléments à l'index n du second tableau.
Retournez le tableau final.
NB: Les tableaux de départ reste inchangés après l'exécution des fonctions.

Tests:

frankenSplice([1, 2, 3], [4, 5], 1) devrait retourner [4, 1, 2, 3, 5]
frankenSplice([1, 2], ["a", "b"], 1) devrait retourner ["a", 1, 2, "b"]
frankenSplice(["claw", "tentacle"], ["head", "shoulders", "knees", "toes"], 2) devrait retourner ["head", "shoulders", "claw", "tentacle", "knees", "toes"]
Tous les éléments du premier tableau devrait être additionnés au second tout en respectant l'ordre de départ.
frankenSplice([1, 2, 3, 4], [], 0) devrait retourner [1, 2, 3, 4]

## Exercice 10: Faux Videurs
Difficulté: Medium

Supprimez toutes les  valeurs fausses d'un tableau. Renvoiez un nouveau tableau; ne pas muter le tableau d'origine.
Les fausses valeurs en JavaScript sont false, null, 0, "", undefined et NaN.

Tests:

bouncer([7, "ate", "", false, 9])devrait retourner [7, "ate", 9].
bouncer(["a", "b", "c"])devrait retourner ["a", "b", "c"].
bouncer([false, null, 0, NaN, undefined, ""])devrait retourner [].
bouncer([null, NaN, 1, 2, undefined])devrait retourner [1, 2]

## Exercice 11: Où devrais-je être
Difficulté: Moyenne

Créez une fonction getIndexToIns(arr, toInsert).
Renvoiez l'indice le plus bas auquel une valeur (deuxième argument) doit être insérée dans un tableau (premier argument) une fois qu'il a été trié. La valeur renvoyée doit être un nombre.

Par exemple, getIndexToIns([1,2,3,4], 1.5) doit retourner 1 car il est supérieur à 1(index 0), mais inférieur à 2(index 1).

De même, getIndexToIns([20,3,5], 19) devrait retourner 2 car une fois le tableau trié, il ressemblera à [3,5,20] et 19 est inférieur à 20 (index 2) et supérieur à 5 (index 1).

Tests:

getIndexToIns([10, 20, 30, 40, 50], 35) devrait renvoyer 3.
getIndexToIns([10, 20, 30, 40, 50], 35) devrait renvoyer un nombre.
getIndexToIns([10, 20, 30, 40, 50], 30) devrait renvoyer 2.
getIndexToIns([10, 20, 30, 40, 50], 30) devrait renvoyer un nombre.
getIndexToIns([40, 60], 50) devrait renvoyer 1.
getIndexToIns([40, 60], 50) devrait renvoyer un nombre.
getIndexToIns([3, 10, 5], 3) devrait renvoyer 0.
getIndexToIns([3, 10, 5], 3) devrait renvoyer un nombre.
getIndexToIns([5, 3, 20, 3], 5) devrait renvoyer 2.
getIndexToIns([5, 3, 20, 3], 5) devrait renvoyer un nombre.
getIndexToIns([2, 20, 10], 19) devrait renvoyer 2.
getIndexToIns([2, 20, 10], 19) devrait renvoyer un nombre.
getIndexToIns([2, 5, 10], 15) devrait renvoyer 3.
getIndexToIns([2, 5, 10], 15) devrait renvoyer un nombre.
getIndexToIns([], 1) devrait renvoyer 0.
getIndexToIns([], 1) devrait renvoyer un nombre.

## Exercice 12: Mutation
Difficulté: Medium

Renvoiez true si la chaîne du premier élément du tableau contient toutes les lettres de la chaîne du deuxième élément du tableau.

Par exemple, ["hello", "Hello"], doit retourner true car toutes les lettres de la deuxième chaîne sont présentes dans la première, sans tenir compte de la casse.

Les arguments ["hello", "hey"] doivent retourner false car la chaîne hellone contient pas de y.

Enfin, ["Alien", "line"], devrait retourner true car toutes les lettres de linesont présentes dans Alien.

Tests:

mutation(["hello", "hey"]) devrait retourner false.
mutation(["hello", "Hello"]) devrait retourner true.
mutation(["zyxwvutsrqponmlkjihgfedcba", "qrstu"]) devrait retourner true.
mutation(["Mary", "Army"]) devrait retourner true.
mutation(["Mary", "Aarmy"]) devrait retourner true.
mutation(["Alien", "line"]) devrait retourner true.
mutation(["floor", "for"]) devrait retourner true.
mutation(["hello", "neo"]) devrait retourner false.
mutation(["voodoo", "no"]) devrait retourner false.
mutation(["ate", "date"]) devrait retourner false.
mutation(["Tiger", "Zebra"]) devrait retourner false.
mutation(["Noel", "Ole"]) devrait retourner true.

## Exercice 13: Singe Trapu
Difficulté: Medium

Écrivez une fonction chunkArrayInGroups(arr, size)  qui divise un tableau (premier argument) en groupes de la longueur de size(deuxième argument) et les renvoie sous la forme d'un tableau à deux dimensions.

Tests:

chunkArrayInGroups(["a", "b", "c", "d"], 2) devrait retourner [["a", "b"], ["c", "d"]].
chunkArrayInGroups([0, 1, 2, 3, 4, 5], 3) devrait retourner [[0, 1, 2], [3, 4, 5]].
chunkArrayInGroups([0, 1, 2, 3, 4, 5], 2) devrait retourner [[0, 1], [2, 3], [4, 5]].
chunkArrayInGroups([0, 1, 2, 3, 4, 5], 4) devrait retourner [[0, 1, 2, 3], [4, 5]].
chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6], 3) devrait retourner [[0, 1, 2], [3, 4, 5], [6]].
chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6, 7, 8], 4) devrait retourner [[0, 1, 2, 3], [4, 5, 6, 7], [8]].
chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6, 7, 8], 2) devrait retourner [[0, 1], [2, 3], [4, 5], [6, 7], [8]].

## Exercice 14: Encodage Latin 
Difficulté: Hard

Créez une fonction latinPing(string).
Cette fonction prend des chaîne de caractères, et
retourne une version coder de cette dernière.
Pour chaque mot constituant la phrase, on déplace
le 1er caractère à la fin du mot, puis on ajoute "ay"

NB: la ponctuation, n'est pas prise en compte (! ? .)

ex: latinPing("hello!") devrait retourner "ellohay!"
ex: latinPing("bonjour à tous!") devrait retourner "onjourbay àay tousay !
                                       
           // Travaux accomplit le jour ou l'exo a été donné 
                                       
                       <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <script>
        //first exercices
        // function reverse(str){
        //     let tableau=[];
        //     for (let index = str.length; index >=0; index--) {
        //         tableau.push(str[index])
        //     } 
        //     return tableau.join('')
        // }
        // console.log(reverse('medenou'));
        // console.log(reverse('marcos'));
        // console.log(reverse('tableau'));
        // console.log(reverse('highfive'));
        
        //         ## Exercice 1: FirstUpperCase
        // Difficulté: Easy

        // Créez une fonction firstUpperCase(string).
        // Cette fonction prend une phrase, et
        // retourne chaque mot avec la 1ère lettre en 
        // majuscule.

        // Tests:
        // firstUpperCase("bonjour tout le monde") devrait retourner "Bonjour Tout Le Monde"
        // firstUpperCase("bonjour") devrait retourner "Bonjour"

        // A vos claviers ! :)

        // function firstUpperCase(texte){
        //     let textTransform=texte.split(' ');
        //     let tableau=[];
        //     for (let index = 0; index < textTransform.length; index++) {
        //         b=textTransform[index].replace(textTransform[index].charAt(0).toLowerCase(),textTransform[index].charAt(0).toUpperCase())
        //        tableau.push(b)
        //     }
        //     return tableau.join(' ')
        // }
        // console.log(firstUpperCase("bonjour je suis marcos medenou"));


        //         ## Exercice 2: LongestWord
        // Difficulté: Easy

        // Créez une fonction longestWord(string).
        // Cette fonction prend une chaîne de caractères, et retourne
        // la longeur du plus long mot.
        // Tests:
        // longestWord("bonjour à tous") devrait retourner 7 car "bonjour" est le plus long mot et il compte 7 caractères
        // longestWord("les chaussettes de l'archiduchesse) ==> retourner 15 en référence à "l'archiduchesse"

        // function LongestWord(stringChaine){
        //     textTransform=stringChaine.split(' ');
        //     let tableau=[]; 
        //     for (let index = 0; index < textTransform.length; index++) {
        //         tableau.push(textTransform[index].length);   
        //     }
        //     return tableau.sort(function(a,b){
        //         return a-b;
        //     })[tableau.length-1]
        // }
        // console.log(LongestWord("Bonjour à tous je suis MEDEN uizfyugfugfeyfuihyeruhyhgeugh"))

        //## Exercice 3: LargestNumber
        // Difficulté: Easy
        // Créez une fonction largestWord(arr).
        // Cette fonction doit retourner le plus grand nombre dans une liste de nombres passées en argument
        // Tests:
        // largestWord([20, 32, 97]) devrait retourner 97
        // largestWord([156, 851, 138]) devrait retourner 851
        // largestWord([357, 195, 759]) devrait retourner 759

        // function largestWord(arr){
        //     return arr.sort(function(a,b){
        //         return a-b;
        //     })[arr.length-1]
        // }
        // console.log(largestWord([20, 32, 97]))
        // console.log(largestWord([156, 851, 138]))
        // console.log(largestWord([357, 195, 759]))

        //         ## Exercice 4: ConfirmEnd
        // Difficulté: Easy

        // Créez une fonction confirmEnd(string, end).
        // Cette fonction doit vérifier que le string qu'on lui passe termine bien
        // par le caractère "end".

        // Tests:

        // confirmEnd("bonjour", "n") devrait retourner false
        // confirmEnd("bonjour", "r") devrait retourner true
        // function confirmEnd(string, end){
        //     if(string.charAt(string.length-1)==end){
        //         return true;
        //     }else{
        //         return false;
        //     }
        // }
        // console.log(confirmEnd("bonjour", "n"));
        // console.log(confirmEnd("bonjour", "r"));

            //         ## Exercice 5: Tracage
            // Difficulté: Easy

            // Créez une fonction truncate(str, num) {...}
            // Cette fonction doit tronquer la chaîne de caractères si la 
            // longueur de ce dernier dépasse le nombre spécifié par le paramètre "num".
            // Retournez la chaîne de caractères tronquée avec ... à fin.

            // Tests:

            // truncate("bonjour à tous", 5) devrait retourner "bonjo..."
            // truncate("salut", 8) devrait retourner "salut"
            // function truncate(str, num) {
            //     if(str.length > num){
            //         return str.slice(0, num)+ "..."
            //     }else{
            //         return str
            //     }
            // }
            // console.log(truncate("bonjour à tous", 5));
            // console.log(truncate("salut", 8));

        //    ## Exercice 6:  Les détectives
        // Difficulté: Easy

        // Créez une fonction findElement() qui traverse un tableau et retourne le premier élément qui passe le "test de vérité".
        //  C'est-à-dire que pour un élément donné, le test de vérité est passé si func(x) est vrai. Si aucun élément ne passe le test, retournez undefined.

        // Tests:
        // findElement([1, 3, 5, 8, 9, 10], function(num) { return num % 2 === 0; }) devrait retourner 8

        // findElement([1, 3, 5, 9], function(num) { return num % 2 === 0; }) devrait retourner undefined
                // function findElement(tableau){
                //     let valeur=0
                //     let tableau2=[]; 
                //     for (let index = 0; index < tableau.length; index++) {
                //         switch(tableau[index] % 2){
                //             case 0:
                //             tableau2.push(tableau[index])
                //             break;   
                //         }
                //     }
                //     return tableau2[0]
                //  }
                // console.log(findElement([1, 3, 5, 8, 9,10]));
                // console.log(findElement([1, 3, 5, 9]));



            //   ## Exercice 7: Les perroquets
            // Difficulté: Easy

            // Créez une fonction repeat(string, num) qui prend 2 paramètres: un mot puis un entier.
            // La fonction doit pouvoir répéter le mot qu'on lui passe le nombre de fois spécifié.

            // Tests:

            // repeat ("abc", 3) devrait retourner "abcabcabc"
            // repeat ("*", 3) =devrait retourner "***"
            // repeat ("bonjour", 2) devrait retourner "bonjourbonjour";
            // function repeat (string, num){
            //     let a=''
            //     for (let index = 0; index < num; index++) {
            //         a=a+string  
            //     }
            //     return a; 
            // }

            // console.log(repeat ("abc", 3));
            // console.log(repeat ("*", 3));

            // ## Exercice 8: Factorisation
            // Difficulté: Médium

            // Créez une fonction factorialize(number) qui retourne le factoriel d'un entier.
            // Le factoriel d'un entier n, souvent noté n! est le produit de tous les entiers positifs
            // inférieur ou égal à n.
            // ex 5! = 1 * 2 * 3 * 4 * 5 = 120

            // function factorialize(number){
            //     let fact =1;
            //     for (let index = 1; index < number+1; index++) {
            //         fact=fact*index;    
            //     }
            //     return fact; 
            // }
            // console.log(factorialize(5));

            //## Exercice 9: Téléportation et Fusion
            // Difficulté: Medium

            // Il vous est donné deux tableaux et un index.
            // Créez une fonction frankenSplice(arr1, arr2, index).
            // Copiez dans l'ordre chaque élément du premier tableau dans le second tableau.
            // Commencez par insérer les éléments à l'index n du second tableau.
            // Retournez le tableau final.
            // NB: Les tableaux de départ reste inchangés après l'exécution des fonctions.

            // Tests:

            // frankenSplice([1, 2, 3], [4, 5], 1) devrait retourner [4, 1, 2, 3, 5]
            // frankenSplice([1, 2], ["a", "b"], 1) devrait retourner ["a", 1, 2, "b"]
            // frankenSplice(["claw", "tentacle"], ["head", "shoulders", "knees", "toes"], 2) devrait retourner ["head", "shoulders", "claw", "tentacle", "knees", "toes"]
            // Tous les éléments du premier tableau devrait être additionnés au second tout en respectant l'ordre de départ.
            // frankenSplice([1, 2, 3, 4], [], 0) devrait retourner [1, 2, 3, 4]

            // function frankenSplice(arr1, arr2, index){
            //     let tableau=[]; 
            //     for (let indexx = 0; indexx < arr2.length; indexx++) {
            //         tableau.push(arr2[indexx])
            //         if(indexx==index-1){
            //             for (let indexxx = 0; indexxx < arr1.length; indexxx++) {
            //                 tableau.push(arr1[indexxx])
            //             }
            //         }   
            //     }
            //     return tableau
            // }

            // console.log(frankenSplice([1, 2, 3], [4, 5], 1));
            // console.log(frankenSplice([1, 2], ["a", "b"], 1));
            // console.log(frankenSplice(["claw", "tentacle"], ["head", "shoulders", "knees", "toes"], 2));
            // console.log(frankenSplice([1, 2, 3, 4], [], 0));

            // ## Exercice 10: Faux Videurs
            // Difficulté: Medium

            // Supprimez toutes les  valeurs fausses d'un tableau. Renvoiez un nouveau tableau; ne pas muter le tableau d'origine.
            // Les fausses valeurs en JavaScript sont false, null, 0, "", undefined et NaN.

            // Tests:

            // bouncer([7, "ate", "", false, 9])devrait retourner [7, "ate", 9].
            // bouncer(["a", "b", "c"])devrait retourner ["a", "b", "c"].
            // bouncer([false, null, 0, NaN, undefined, ""])devrait retourner [].
            // bouncer([null, NaN, 1, 2, undefined])devrait retourner [1, 2]

            // function bouncer(arr){
            //     let tableau=[];

            //     for (let index = 0; index < arr.length; index++) { 
            //         if(arr[index] !== false && arr[index] !== null && arr[index] !== 0 && arr[index] !== undefined && arr[index].includes(NaN) !==true && arr[index] !=="" ){
            //              tableau.push(arr[index]);
            //         } 
            //     }
            //     return tableau
            // }
            // console.log(bouncer([7, "ate", "", false,9]))
            // console.log(bouncer(["a", "b", "c"]))
            // console.log(bouncer([false, null, 0, NaN, undefined, ""]))
            // console.log(bouncer([null, NaN, 1, '2', undefined]))


            //## Exercice 11: Où devrais-je être
            // Difficulté: Moyenne

            // Créez une fonction getIndexToIns(arr, toInsert).
            // Renvoiez l'indice le plus bas auquel une valeur (deuxième argument) doit être insérée dans un tableau (premier argument) une fois qu'il a été trié. La valeur renvoyée doit être un nombre.

            // Par exemple, getIndexToIns([1,2,3,4], 1.5) doit retourner 1 car il est supérieur à 1(index 0), mais inférieur à 2(index 1).

            // De même, getIndexToIns([20,3,5], 19) devrait retourner 2 car une fois le tableau trié, il ressemblera à [3,5,20] et 19 est inférieur à 20 (index 2) et supérieur à 5 (index 1).

            // Tests:

            // getIndexToIns([10, 20, 30, 40, 50], 35) devrait renvoyer 3.
            // getIndexToIns([10, 20, 30, 40, 50], 35) devrait renvoyer un nombre.
            // getIndexToIns([10, 20, 30, 40, 50], 30) devrait renvoyer 2.
            // getIndexToIns([10, 20, 30, 40, 50], 30) devrait renvoyer un nombre.
            // getIndexToIns([40, 60], 50) devrait renvoyer 1.
            // getIndexToIns([40, 60], 50) devrait renvoyer un nombre.
            // getIndexToIns([3, 10, 5], 3) devrait renvoyer 0.
            // getIndexToIns([3, 10, 5], 3) devrait renvoyer un nombre.
            // getIndexToIns([5, 3, 20, 3], 5) devrait renvoyer 2.
            // getIndexToIns([5, 3, 20, 3], 5) devrait renvoyer un nombre.
            // getIndexToIns([2, 20, 10], 19) devrait renvoyer 2.
            // getIndexToIns([2, 20, 10], 19) devrait renvoyer un nombre.
            // getIndexToIns([2, 5, 10], 15) devrait renvoyer 3.
            // getIndexToIns([2, 5, 10], 15) devrait renvoyer un nombre.
            // getIndexToIns([], 1) devrait renvoyer 0.
            // getIndexToIns([], 1) devrait renvoyer un nombre.

            // function getIndexToIns(arr, toInsert){
            //     let arrSort= arr.sort(); 
            //     arrSort.push(toInsert);
            //     let arr2=arrSort.sort(function(a,b){
            //     return a-b;
            //     }); 
            //     return arr2.indexOf(toInsert);
            // }
            // console.log(getIndexToIns([10, 20, 30, 40, 50], 35));
            // console.log(getIndexToIns([10, 20, 30, 40, 50], 35));
            // console.log(getIndexToIns([10, 20, 30, 40, 50], 30));
            // console.log(getIndexToIns([10, 20, 30, 40, 50], 30));
            // console.log(getIndexToIns([40, 60], 50));
            // console.log(getIndexToIns([3, 10, 5], 3));
            // console.log(getIndexToIns([5, 3, 20, 3], 5));


            // ## Exercice 12: Mutation
            // Difficulté: Medium
            // Renvoiez true si la chaîne du premier élément du tableau contient toutes les lettres de la chaîne du deuxième élément du tableau.
            // Par exemple, ["hello", "Hello"], doit retourner true car toutes les lettres de la deuxième chaîne sont présentes dans la première, sans tenir compte de la casse.
            // Les arguments ["hello", "hey"] doivent retourner false car la chaîne hellone contient pas de y.
            // Enfin, ["Alien", "line"], devrait retourner true car toutes les lettres de linesont présentes dans Alien.
            // Tests:

            // mutation(["hello", "hey"]) devrait retourner false.
            // mutation(["hello", "Hello"]) devrait retourner true.
            // mutation(["zyxwvutsrqponmlkjihgfedcba", "qrstu"]) devrait retourner true.
            // mutation(["Mary", "Army"]) devrait retourner true.
            // mutation(["Mary", "Aarmy"]) devrait retourner true.
            // mutation(["Alien", "line"]) devrait retourner true.
            // mutation(["floor", "for"]) devrait retourner true.
            // mutation(["hello", "neo"]) devrait retourner false.
            // mutation(["voodoo", "no"]) devrait retourner false.
            // mutation(["ate", "date"]) devrait retourner false.
            // mutation(["Tiger", "Zebra"]) devrait retourner false.
            // mutation(["Noel", "Ole"]) devrait retourner true.
            
                
                console.log(mutation(["hello", "hey"]));
                console.log(mutation(["hello", "hello"]));
                console.log(mutation(["zyxwvutsrqponmlkjihgfedcba", "qrstu"]));
                console.log(mutation(["Mary", "Army"]));
                console.log(mutation(["Mary", "Aarmy"]) );
                console.log(mutation(["Alien", "line"]));
                console.log(mutation(["floor", "for"]) );
                console.log(mutation(["hello", "neo"]));
                console.log(mutation(["voodoo", "no"]));
                console.log(mutation(["ate", "date"]));
                console.log(mutation(["Tiger", "Zebra"]));
                console.log(mutation(["Noel", "Ole"]));
                console.log(mutation(["zyxwvutsrqponmlkjihgfedcba", "qrstu"]));
                console.log(mutation(["Mary", "arMy"]));


        // Difficulté: Medium

        // Écrivez une fonction chunkArrayInGroups(arr, size)  qui divise un tableau (premier argument) en groupes de 
        //la longueur de size(deuxième argument) et les renvoie sous la forme d'un tableau à deux dimensions.

        // Tests:

        // chunkArrayInGroups(["a", "b", "c", "d"], 2) devrait retourner [["a", "b"], ["c", "d"]].
        // chunkArrayInGroups([0, 1, 2, 3, 4, 5], 3) devrait retourner [[0, 1, 2], [3, 4, 5]].
        // chunkArrayInGroups([0, 1, 2, 3, 4, 5], 2) devrait retourner [[0, 1], [2, 3], [4, 5]].
        // chunkArrayInGroups([0, 1, 2, 3, 4, 5], 4) devrait retourner [[0, 1, 2, 3], [4, 5]].
        // chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6], 3) devrait retourner [[0, 1, 2], [3, 4, 5], [6]].
        // chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6, 7, 8], 4) devrait retourner [[0, 1, 2, 3], [4, 5, 6, 7], [8]].
        // chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6, 7, 8], 2) devrait retourner [[0, 1], [2, 3], [4, 5], [6, 7], [8]].

        // function chunkArrayInGroups(arr, size){
        //     let tableau1=[]; 
        //     let tableau=[];
        //     for (let index = 0; index < arr.length; index++) {
        //         tableau.push(arr[index])
        //         if(index==size*(index+1)){
        //             console.log(size*(index+1));
        //             tableau=[];
        //         }
        //     }  
        //     tableau1.push(tableau);
        //     return tableau1; 
        // }
        // console.log(chunkArrayInGroups(["a", "b", "c", "d"], 2));

    </script>
</body>
</html>                          
                                       
                                       //code 
                                       
             //exercice 1
function firstUpperCase(texte){
        let textTransform=texte.split(' ');
        let tableau=[];
            for (let index = 0; index < textTransform.length; index++) {
                b=textTransform[index].replace(textTransform[index].charAt(0).toLowerCase(),textTransform[index].charAt(0).toUpperCase())
               tableau.push(b)
            }
            return tableau.join(' ')
        }

console.log(firstUpperCase("bonjour je suis marcos medenou"));
console.log(firstUpperCase("bonjour"));

//exercice 2
function LongestWord(stringChaine){
            textTransform=stringChaine.split(' ');
            let tableau=[]; 
            for (let index = 0; index < textTransform.length; index++) {
                tableau.push(textTransform[index].length);   
            }
            return tableau.sort(function(a,b){
                return a-b;
            })[tableau.length-1]
        }
        console.log(LongestWord("Bonjour à tous"))
        console.log(LongestWord("les chaussettes de l'archiduchesse"));

//EXERCICE 3

function largestWord(arr){
            return arr.sort(function(a,b){
                return a-b;
            })[arr.length-1]
        }
        console.log(largestWord([20, 32, 97]))
        console.log(largestWord([156, 851, 138]))
        console.log(largestWord([357, 195, 759]))

//EXERCICE 4

        function confirmEnd(string, end){
            if(string.charAt(string.length-1)==end){
                return true;
            }else{
                return false;
            }
        }
        console.log(confirmEnd("bonjour", "n"));
        console.log(confirmEnd("bonjour", "r"));

//exercice 5

function truncate(str, num) {
                if(str.length > num){
                    return str.slice(0, num)+ "..."
                }else{
                    return str
                }
            }
            console.log(truncate("bonjour à tous", 5));
            console.log(truncate("salut", 8));

//exercice 6

 function findElement(tableau){
                    let valeur=0
                    let tableau2=[]; 
                    for (let index = 0; index < tableau.length; index++) {
                        switch(tableau[index] % 2){
                            case 0:
                            tableau2.push(tableau[index])
                            break;   
                        }
                    }
                    return tableau2[0]
                 }
                console.log(findElement([1, 3, 5, 8, 9,10]));
                console.log(findElement([1, 3, 5, 9]));

//exercice 7 

function repeat (string, num){
                let a=''
                for (let index = 0; index < num; index++) {
                    a=a+string  
                }
                return a; 
            }

            console.log(repeat ("abc", 3));
            console.log(repeat ("*", 3));


//exercice 8

function factorialize(number){
                let fact =1;
                for (let index = 1; index < number+1; index++) {
                    fact=fact*index;    
                }
                return fact; 
            }
            console.log(factorialize(3));

//exercice 9

// frankenSplice([1, 2, 3], [4, 5], 1) devrait retourner [4, 1, 2, 3, 5]
            // frankenSplice([1, 2], ["a", "b"], 1) devrait retourner ["a", 1, 2, "b"]
            // frankenSplice(["claw", "tentacle"], ["head", "shoulders", "knees", "toes"], 2) devrait retourner ["head", "shoulders", "claw", "tentacle", "knees", "toes"]
            // Tous les éléments du premier tableau devrait être additionnés au second tout en respectant l'ordre de départ.
            // frankenSplice([1, 2, 3, 4], [], 0) devrait retourner [1, 2, 3, 4]

            function frankenSplice(arr1, arr2, index){
                /* let tableau=[]; 
                for (let indexx = 0; indexx < arr2.length; indexx++) {
                    tableau.push(arr2[indexx])
                   if(indexx==index-1){
                        for (let indexxx = 0; indexxx < arr1.length; indexxx++) {
                            tableau.push(arr1[indexxx])
                        }
                    }  
                } */
                let array1=arr1.slice(0,arr1.length)
                let array2=arr2.slice(0,arr2.length)
                 array2.splice(index,0,...array1)
                 return array2;
            }
            console.log(frankenSplice([1, 2, 3], [4, 5], 1));
            console.log(frankenSplice([1, 2], ["a", "b"], 1));
            console.log(frankenSplice(["claw", "tentacle"], ["head", "shoulders", "knees", "toes"], 2));
            console.log(frankenSplice([1, 2, 3, 4], [], 0));

//exercice 10

      function bouncer(arr){ 
                // return arr.filter(x=>x)
                return arr.filter(Boolean)
            }
            console.log(bouncer([7, "ate", "", false,9]))
            console.log(bouncer(["a", "b", "c"]))
            console.log(bouncer([false, null, 0, NaN, undefined, ""]))
            console.log(bouncer([null, NaN, 1, 2, undefined]))

//exercice 11


            function getIndexToIns(arr, toInsert){
                let arrSort= arr.sort(); 
                arrSort.push(toInsert);
                let arr2=arrSort.sort(function(a,b){
                return a-b;
                }); 
                return arr2.indexOf(toInsert);
            }
            console.log(getIndexToIns([10, 20, 30, 40, 50], 35));
            console.log(getIndexToIns([10, 20, 30, 40, 50], 35));
            console.log(getIndexToIns([10, 20, 30, 40, 50], 30));
            console.log(getIndexToIns([10, 20, 30, 40, 50], 30));
            console.log(getIndexToIns([40, 60], 50));
            console.log(getIndexToIns([3, 10, 5], 3));
            console.log(getIndexToIns([5, 3, 20, 3], 5));
            console.log(getIndexToIns([20,3,5], 19));

//exercice 12

/* function mutation(arr){
    let firstCaract=arr[0].toLowerCase();
    let secondCaract=arr[1].toLowerCase();
    for(let i=0; i<secondCaract.length; i++){
        if(arr[0].indexOf(firstCaract.length) && arr[0].charAt(firstCaract.length) !==arr[1].indexOf(secondCaract.length) && arr[1].charAt(secondCaract.length)){
            return false;
        }else {
            return true;
        }
        return arr
    }
} */
            var mutation =([f,s])=> 
                [...s.toLowerCase()].every(c=>
                [...f.toLowerCase()].includes(c)); 

console.log(mutation(["hello", "hey"]));
                console.log(mutation(["hello", "hello"]));
                console.log(mutation(["zyxwvutsrqponmlkjihgfedcba", "qrstu"]));
                console.log(mutation(["Mary", "Army"]));
                console.log(mutation(["Mary", "Aarmy"]) );
                console.log(mutation(["Alien", "line"]));
                console.log(mutation(["floor", "for"]) );
                console.log(mutation(["hello", "neo"]));
                console.log(mutation(["voodoo", "no"]));
                console.log(mutation(["ate", "date"]));
                console.log(mutation(["Tiger", "Zebra"]));
                console.log(mutation(["Noel", "Ole"]));
                
// chunkArrayInGroups(["a", "b", "c", "d"], 2) devrait retourner [["a", "b"], ["c", "d"]].
        // chunkArrayInGroups([0, 1, 2, 3, 4, 5], 3) devrait retourner [[0, 1, 2], [3, 4, 5]].
        // chunkArrayInGroups([0, 1, 2, 3, 4, 5], 2) devrait retourner [[0, 1], [2, 3], [4, 5]].
        // chunkArrayInGroups([0, 1, 2, 3, 4, 5], 4) devrait retourner [[0, 1, 2, 3], [4, 5]].
        // chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6], 3) devrait retourner [[0, 1, 2], [3, 4, 5], [6]].
        // chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6, 7, 8], 4) devrait retourner [[0, 1, 2, 3], [4, 5, 6, 7], [8]].
        // chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6, 7, 8], 2) devrait retourner [[0, 1], [2, 3], [4, 5], [6, 7], [8]].

        function chunkArrayInGroups(arr, size){
            /* let tableau1=[]; 
            let tableau=[];
            for (let index = 0; index < arr.length; index++) {
                tableau.push(arr[index])
                if(index==size*(index+1)){
                    console.log(size*(index+1));
                    tableau=[];
                }
            }  
            tableau1.push(tableau);
            return tableau1;  */
            let tableau=[];
            while(arr.length>0){
                tableau.push(arr.splice(0,size))
            }

            return tableau;
        }
        console.log(chunkArrayInGroups(["a", "b", "c", "d"], 2));
        console.log(chunkArrayInGroups([0, 1, 2, 3, 4, 5], 3));
        console.log(chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6], 3));


       /*  ## Exercice 14: Encodage Latin 
        Difficulté: Hard
        
        Créez une fonction latinPing(string).
        Cette fonction prend des chaîne de caractères, et
        retourne une version coder de cette dernière.
        Pour chaque mot constituant la phrase, on déplace
        le 1er caractère à la fin du mot, puis on ajoute "ay"
        
        NB: la ponctuation, n'est pas prise en compte (! ? .)
        
        ex: latinPing("hello!") devrait retourner "ellohay!"
        ex: latinPing("bonjour à tous!") devrait retourner "onjourbay àay tousay ! */

        function latinPing(string){
            let tab=[]
            tab.push(string.slice(1)+ 'ay')
            tab[string.length-2]=string.charAt(0)
            return tab.join('');
        }

        console.log(latinPing("hello!") );
 
   

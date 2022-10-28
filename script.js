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



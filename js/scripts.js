  /**
 * Agrega el elemento value al comienzo de la lista. 
 * @param {*} value 
 * @param {Array} list 
 * @returns {Array}
 * @example cons(1, [2, 3]); // => [1, 2, 3]
 */
function cons(value, list) {
    let tmp = list.slice(0);
    tmp.splice(0, 0, value);
    return tmp;
}

/**
 * Retorma el primer elemento de la lista
 * @param {Array} list 
 * @example first([1, 2, 3]) // => 1
 * @returns {*}
 */
function first(list) {
    return list.slice(0, 1)[0];
}

/**
 * Retorna todos los elementos de la lista, excepto el primero
 * @param {Array} list 
 * @returns {Array}
 * @example rest([1, 2, 3]); // => [2, 3]
 */
function rest(list) {
    return list.slice(1);
}

/**
 * La lista de entrada está vacio?
 * @param {Array} list 
 * @returns {boolean}
 * @example isEmpty([1, 2, 3]); // => false
 * @example isEmpty([]); // => true

 */
function isEmpty(list) {
    if (typeof list == 'object') {
        return list.length === 0;
    }
    return false;
}

/**
 * Retorna verdadero si el objeto de entrada es una lista
 * @param {Array} list
 * @returns {boolean} 
 * @example isList([]); // => true
 * @example isList([1, 2]); // => true
 * @example isList(1); // => false
 * @example isList("Hola"); // => false
 */
function isList(list) {
    return typeof list === 'object' && typeof list.length == 'number' && list.length >= 0;
}

/**
 * Retorna la longitud de un arreglo
 * @param {Array} list 
 * @returns {Number}
 * @example length([]); // => 0
 * @example length([2, 4]); // => 2
 */
function length(list) {
    return list.length;
}

/**
 * Concatena la list2 al final de la list1. Si list2 no es un arreglo, simplemente agrega
 * este elemento al final de list1.
 * @param {Array} list1 
 * @param {Array | Object} list2 
 * @returns {Array}
 * @example append([1, 2], [3, 4]); // => [1, 2, 3, 4]
 */
function append(list1, list2) {
    let tmp = list1.slice();
    if (typeof list2 === 'object' && list2.length >= 0) {
        tmp.push(...list2);
        return tmp;
    } else {
        tmp.push(list2);
        return tmp;
    }
}

/**
 * Filtra la lista l usando la función f.
 * @param {Array} l 
 * @param {function} f función booleana 
 * @returns {Array}
 * @example filter([1, 2, 3, 4, 5], x => x % 2 === 1); // => [1, 3, 5]
 */
function filter(l, f) {
    if (isEmpty(l)) {
        return [];
    } else if (f(first(l))) {
        return cons(deepCopy(first(l)), filter(rest(l), f));
    } else {
        return filter(rest(l), f);
    }
}

/**
 * Aplica la función f a cada elemento del arreglo a
 * @param {Array} a 
 * @param {function} f 
 * @returns {Array}
 * @example console.log(map([1,2,3], x => x*x)); // => [1, 4, 9]
 */
let map = function (a, f) {
    if (isEmpty(a)) {
        return [];
    } else {
        return cons(deepCopy(f(first(a))), map(rest(a), f));
    }
};

/**
 * Realiza una copia profunda(recursiva) del objeto que se pasa como parámetro
 * @param {object} value 
 * @returns {object}
 * @example deepCopy({a: 10, b: {a: 45}}); // => {a: 10, b: {a: 45}}
 */
let deepCopy = function (value) {
    return JSON.parse(JSON.stringify(value));
};

/**
 * Aplica una función f a cada elemento de la lista. La función f
 * recibe el elemento de la lista y el índice en el cual se encuentra.
 * El tercer parámetro es un desplazamiento del índice. Por defecto en 0
 * @param {Array} l 
 * @param {function} f 
 * @param {number} offset
 * @example forEach([1, 2, 3], (a, i) => console.log(i + " : " + a));
 */
function forEach(l, f, index = 0) {
    if (!isEmpty(l)) {
        f(first(l), index);
        forEach(rest(l), f, index + 1);
    }
}
/**
 * Concatena 2 listas.
 * @param {Array} list1 
 * @param {Array} list2 
 * @returns {Array}
 * @example concat([1, 2], [3, 4]); // [1, 2, 3, 4]
 */
function concat(list1, list2) {
    if (isEmpty(list1)) return list2;
    return cons(first(list1), concat(rest(list1), list2));
}

        // library for basic sanke's project functions


       

        /**
         * Creates a new object based on another object and modifying/adding given attributes.
         * @returns {object}
         * @param {object} data
         * @param attribute
         * @example make(world, { direction: "up" });
         */
         function make(data, attribute) {
            return Object.assign({}, data, attribute);
        }

        /**
         * Returns random number between 0 and canvasSize-1.
         * @returns {number}
         * @param {none}
         * @example y: random()
         */
        function random() {

            return Math.round(Math.random() * (canvasSize - 5)) + 2

        }

        /**
         * Returns list without the last element.
         * @returns {list}
         * @param {list} list
         * @example listMinOne(world.snake)
         */
        function listMinOne(list) {
            if (length(list) == 1) {
                return [];
            }
            else {
                return cons(first(list), listMinOne(rest(list)));
            }
        }

        /**
         * Returns true if a "square" object is inside list.
         * @returns {boolean}
         * @param {object} element
         * @param {list} list
         * @example inList(world.snake[0], rest(world.snake)
         */
        function inList(element, list) {
            if (isEmpty(list)) {
                return false
            }
            if (element.x == first(list).x && element.y == first(list).y) {
                return true
            }
            return inList(element, rest(list))
        }

        /**
        * Checks if head's position equals any of the body.
        * @returns {boolean}
        * @param {object} world
        * @example (ateSelf(movement(world)
        */
        function ateSelf(world) {
            if (inList(world.snake[0], rest(world.snake))) {
                return true;
            }
            return false;
        }

        /**
         * Checks if head of the snake is out of the map.
         * @returns {boolean}
         * @param {object} world
         * @example outTheMap(movement(world)
         */
        function outTheMap(world) {
            if ((world.snake[0].x >= (canvasSize - 2)) || (world.snake[0].y >= (canvasSize - 2)) || (world.snake[0].x < 2) || (world.snake[0].y < 2)) {
                return true;
            }
            return false
        }
        /**
         * if world.pause equals true, returns unchaged world.
         * @returns {boolean}
         * @param {object} world 
         * @example pause(world)
         */
        function pause(world) {
            if (world.pause == true) {
                return world
            }
        }

        /**
         * If the difficulty is medium or hard, it gives double or triple points
         * @param {object} world 
         * @returns {number}
         */
        function scoreCount(dif) {
            switch (dif) {
                case easy:
                    return 1;
                case medium:
                    return 2;
                case hard:
                    return 3;
            }
        }

        /**
         * If the position of the snake's head is equal to the position of the food the snake grows.
         * @returns {object} 
         * @param {object} world
         * @example gotFood(movement(world)
         */
        function gotFood(world) {
            if (world.snake[0].x == world.foodPos.x && world.snake[0].y == world.foodPos.y) {
                return make(world, { snake: growSnake(world), foodPos: foodSpawn(world), score: world.score + scoreCount(world.frameRate) })
            }
            return world;
        }

        /**
         * Adds one square to total length of the snake.
         * @returns {list}
         * @param {object} world
         * @example growSnake(world)
         */
        function growSnake(world) {
            len = length(world.snake)
            if (world.snake[len - 2].x > world.snake[len - 1].x) {
                return append(world.snake, { x: world.snake[len - 1].x - 1, y: world.snake[len - 1].y })
            }
            if (world.snake[len - 2].x < world.snake[len - 1].x) {
                return append(world.snake, { x: world.snake[len - 1].x + 1, y: world.snake[len - 1].y })
            }
            if (world.snake[len - 2].y < world.snake[len - 1].y) {
                return append(world.snake, { y: world.snake[len - 1].y + 1, x: world.snake[len - 1].x })
            }
            if (world.snake[len - 2].y > world.snake[len - 1].y) {
                return append(world.snake, { y: world.snake[len - 1].y - 1, x: world.snake[len - 1].x })
            }
        }

        /**
         * Moves the snake by deleting last square and adding one infront.
         * @returns {list}
         * @param {object} world
         * @example movement(world)
         */
        function movement(world) {
            switch (world.direction) {
                case "up":
                    return make(world,
                        { snake: cons(make(world.snake[0], { y: world.snake[0].y - 1 }), listMinOne(world.snake)) });
                    break;
                case "down":
                    return make(world,
                        { snake: cons(make(world.snake[0], { y: world.snake[0].y + 1 }), listMinOne(world.snake)) });
                    break;
                case "left":
                    return make(world, {
                        snake: cons(make(world.snake[0], { x: world.snake[0].x - 1 }), listMinOne(world.snake))
                    });
                    break;
                case "right":
                    return make(world, {
                        snake: cons(make(world.snake[0], { x: world.snake[0].x + 1 }), listMinOne(world.snake))
                    });
                    break;
                default:
                    return world;
            }
        }

        /**
         * Makes sure food doesn't spawn under the snake.
         * @returns {const}
         * @param {object} world
         * @example foodSpawn(world)
         */
        function foodSpawn(world) {
            const val = { x: random(), y: random() }
            if (inList(val, world.snake)) {
                return foodSpawn(world)
            }
            return val
        }


 
 
const size = 20
const canvasSize = 24
const easy = 6
const medium = easy * 2
const hard = easy * 3

const firstWorld = {

direction: "right",
canPress: true,
foodPos: { x: random(), y: random() },
snake: [{ x: 4, y: 2 }, { x: 3, y: 2 }, { x: 2, y: 2 }],
pause: false,
score: 0,
playing: false,
gameover: false,

}
function sketchProc(processing) {
food = processing.loadImage("images/defaultSkin/food.png")
body = processing.loadImage("images/defaultSkin/body.png")
headDown = processing.loadImage("images/defaultSkin/headDown.png")
headRight = processing.loadImage("images/defaultSkin/headRight.png")
headUp = processing.loadImage("images/defaultSkin/headUp.png")
headleft = processing.loadImage("images/defaultSkin/headLeft.png")
wallpaper = processing.loadImage("images/defaultSkin/wallpaper.png")
pause = processing.loadImage("images/defaultSkin/pause.png")
click = processing.loadImage("images/defaultSkin/click.png")
gOver = processing.loadImage("images/defaultSkin/gameover.png")
font = processing.createFont("Impact")

/**
* First world's settings.
*/
processing.setup = function () {
processing.size(canvasSize * size, canvasSize * size + 4 * size);
processing.background(0, 0, 0);
processing.state = make(firstWorld, { frameRate: easy});
}
/**
* Sets world.direction, limits movement towards opposite direction.
* @returns {object}
* @param {object} world
* @param keycode
*/
processing.onKeyEvent = function (world, keyCode) {
switch (keyCode) {
    case processing.UP: // Up in keyboard
        if (world.direction == "down") {
            return world
        }
        else {
            return make(world, { direction: "up" });
        }
    case processing.DOWN: // Down in keyboard
        if (world.direction == "up") {
            return world
        }
        else {
            return make(world, { direction: "down" });
        }
    case processing.LEFT: // Left in keyboard
        if (world.direction == "right") {
            return world
        }
        else {
            return make(world, { direction: "left" });
        }
    case processing.RIGHT: // Right in keyboard
        if (world.direction == "left") {
            return world
        }
        else {
            return make(world, { direction: "right" });
        }
    case 87: // W in keyboard
        if (world.direction == "down") {
            return world
        }
        else {
            return make(world, { direction: "up" });
        }
    case 83: // S in keyboard
        if (world.direction == "up") {
            return world
        }
        else {
            return make(world, { direction: "down" });
        }
    case 65: // A in keyboard
        if (world.direction == "right") {
            return world
        }
        else {
            return make(world, { direction: "left" });
        }
    case 68: // D in keyboard
        if (world.direction == "left") {
            return world
        }
        else {
            return make(world, { direction: "right" });
        }
    case 80: // P in keyboard
        if (world.pause == false) {
            return make(world, { pause: true, canPress: true })
            break;
        }
        else {
            return make(world, { pause: false })
            break;
        }
    default: // Key test
        console.log(keyCode);
        return make(world, {});
}
}
/**
* Executes itself once every frame
* @returns {object}
* @param {object} world
* @example processing.onTic(processing.state)
*/
processing.onTic = function (world) {

processing.frameRate(world.frameRate)
//If player ate it self or got out of the canvas, gameover is set to true.
if (ateSelf(movement(world)) || outTheMap(movement(world))) {
    return make(world, { gameover: true, canPress: false });
}

//If pause or gameover is set to true, returns same world constantly.
if (world.pause || world.gameover) {
    return make(world, { canPress: false })
}
//If is game is not playing.
if (!world.playing) {
    return world;

}
return make(gotFood(movement(world)), { canPress: true });
}
/**
* Executes the function 'image' from processing as many times as the list length.
* @param {list} list
* @return {undefined}
* */
function drawSnakeBody(list) {
if (length(list) == 1) {
    processing.image(body, first(list).x * size, first(list).y * size)
}
else {
    processing.image(body, first(list).x * size, first(list).y * size)
    drawSnakeBody(rest(list))
}
}
/**
* Modifies direction of the snake's head depending on world.direction.
* @param {object} world 
* @return {undefined}
* */
function drawSnakeHead(world) {
switch (world.direction) {
    case "up":
        processing.image(headUp, world.snake[0].x * size, world.snake[0].y * size)
        break;
    case "down":
        processing.image(headDown, world.snake[0].x * size, world.snake[0].y * size)
        break;
    case "left":
        processing.image(headleft, world.snake[0].x * size, world.snake[0].y * size)
        break;
    case "right":
        processing.image(headRight, world.snake[0].x * size, world.snake[0].y * size)
        break;
}
}
/**
* If world.gameover equals true draws game over message.
* @param {object} world
* @returns {undefined}
*/
let localStorageName = "sankeHighScore";
var highScore;

function gameOverMs(world) {
if (world.gameover == true) {
    //this operator set the highscore in the local storage, that way
    //the highscore is saved even when you restart your computer
    localStorage.setItem(localStorageName, Math.max(world.score, highScore));

    processing.image(gOver, 20, 20)
}
}

/**
* if world.pause equals true draws Pause message.
* @param {object} world
* @returns {undefined}
*/
function pauseMs(world) {
if (world.pause == true && !world.gameover) {
    processing.image(pause, 81, 200)
}
}
/**
* Click message.
* @param {object} world
* @returns {undefined}
*/
function clickMs(world) {

if (!world.playing) {
    //this operator checks if there is a previous highscore, in whichs case will print it,
    // and otherwise will set it to zero, and it must be placed in the start screen
    highScore = localStorage.getItem(localStorageName) == null ? 0 :
        localStorage.getItem(localStorageName);

    processing.image(click, 20, 20)
}
};
/**
* Score message.
* @param {object} world
* @returns {undefined}
*/
function scoreMs(world) {
processing.textFont(font, 45);
processing.text(world.score, 150, 544);
};

//this function prints the highscore

function highScoreMs() {
processing.text(highScore, 410, 544);
}

//Draws the game.
processing.drawGame = function (world) {
processing.background(100, 100, 250);
processing.image(wallpaper, 0, 0)
processing.image(food, world.foodPos.x * 20, world.foodPos.y * 20)
processing.fill(200, 200, 200);
drawSnakeBody(rest(world.snake))
drawSnakeHead(world)
processing.fill(255, 255, 255);
gameOverMs(world);
pauseMs(world);
clickMs(world);
scoreMs(world);
highScoreMs();
};

//Makes current world's state equal to onTic's output and draws the world. Executes several times a second.
processing.draw = function () {
processing.state = processing.onTic(processing.state);
processing.drawGame(processing.state);
};
/**
*Sets current world to initial world.
* @returns {object}
* */
processing.restart = function () {
processing.state = make(processing.state, firstWorld);
}
/**
*Sets current world to initial world.
* @param {number} frames
* @returns {object}
* */
processing.changeFrameRate = function (frames) {
if (!processing.state.playing || processing.state.gameover) {
    processing.state = make(processing.state, { frameRate: frames });
}
}
/**
*Executes when key is pressed.
* @returns {object}
* */
processing.keyPressed = function () {
if ((processing.state.canPress && processing.state.playing) || processing.keyCode == 80) {
    processing.state = processing.onKeyEvent(make(processing.state, { canPress: false }), processing.keyCode);
}
else {
    return 0
}
}
//Changes source of skin variables.
processing.changeSkin = function (skin) {
switch (skin) {
    case 'skin1':
        food = processing.loadImage("images/skin1/food.png")
        body = processing.loadImage("images/skin1/body.png")
        headDown = processing.loadImage("images/skin1/headDown.png")
        headRight = processing.loadImage("images/skin1/headRight.png")
        headUp = processing.loadImage("images/skin1/headUp.png")
        headleft = processing.loadImage("images/skin1/headLeft.png")
        wallpaper = processing.loadImage("images/skin1/wallpaper.png")
        pause = processing.loadImage("images/skin1/pause.png")
        click = processing.loadImage("images/skin1/click.png")
        gOver = processing.loadImage("images/skin1/gameover.png")
        break;
    case 'skin2':
        food = processing.loadImage("images/skin2/food.png")
        body = processing.loadImage("images/skin2/body.png")
        headDown = processing.loadImage("images/skin2/headDown.png")
        headRight = processing.loadImage("images/skin2/headRight.png")
        headUp = processing.loadImage("images/skin2/headUp.png")
        headleft = processing.loadImage("images/skin2/headLeft.png")
        wallpaper = processing.loadImage("images/skin2/wallpaper.png")
        pause = processing.loadImage("images/skin2/pause.png")
        click = processing.loadImage("images/skin2/click.png")
        gOver = processing.loadImage("images/skin2/gameover.png")
        break;
    case 'skin3':
        food = processing.loadImage("images/skin3/food.png")
        body = processing.loadImage("images/skin3/body.png")
        headDown = processing.loadImage("images/skin3/headDown.png")
        headRight = processing.loadImage("images/skin3/headRight.png")
        headUp = processing.loadImage("images/skin3/headUp.png")
        headleft = processing.loadImage("images/skin3/headLeft.png")
        wallpaper = processing.loadImage("images/skin3/wallpaper.png")
        pause = processing.loadImage("images/skin3/pause.png")
        click = processing.loadImage("images/skin3/click.png")
        gOver = processing.loadImage("images/skin3/gameover.png")
        break;
    case 'skin4':
        food = processing.loadImage("images/skin4/food.png")
        body = processing.loadImage("images/skin4/snake.png")
        headDown = processing.loadImage("images/skin4/snake.png")
        headRight = processing.loadImage("images/skin4/snake.png")
        headUp = processing.loadImage("images/skin4/snake.png")
        headleft = processing.loadImage("images/skin4/snake.png")
        wallpaper = processing.loadImage("images/skin4/wallpaper.png")
        pause = processing.loadImage("images/skin4/pause.png")
        click = processing.loadImage("images/skin4/click.png")
        gOver = processing.loadImage("images/skin4/gameover.png")
        break;
    case 'defaultSkin':
        food = processing.loadImage("images/defaultSkin/food.png")
        body = processing.loadImage("images/defaultSkin/body.png")
        headDown = processing.loadImage("images/defaultSkin/headDown.png")
        headRight = processing.loadImage("images/defaultSkin/headRight.png")
        headUp = processing.loadImage("images/defaultSkin/headUp.png")
        headleft = processing.loadImage("images/defaultSkin/headLeft.png")
        wallpaper = processing.loadImage("images/defaultSkin/wallpaper.png")
        pause = processing.loadImage("images/defaultSkin/pause.png")
        click = processing.loadImage("images/defaultSkin/click.png")
        gOver = processing.loadImage("images/defaultSkin/gameover.png")
        break;
}
}
/**
* When mouse is clicked, world.playing is set true.
@param {object} world
@param {object} event
@returns {object}
@example make(world, { playing: true })
*/
processing.mouseClicked = function () {
processing.state = make(processing.state, { playing: true });
}
}

var canvas = document.getElementById("canvas");
var processingInstance = new Processing(canvas, sketchProc);

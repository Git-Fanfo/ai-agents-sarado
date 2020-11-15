const colors = require('colors');

const { once } = require('events');
const { createReadStream } = require('fs');
const { createInterface } = require('readline');
var box2move;
var hash = [];
/**
 * Los datos son leidos desde la linea de comandos y se retornan en un array
 *
 */
async function processLineByLine() {
    const arrayInput = [];
    const level = [];
    const positions = [];
    try {
        const rl = createInterface({
            input: createReadStream(process.argv[2]),
            crlfDelay: Infinity,
        });

        rl.on('line', (line) => {
            arrayInput.push(`${line}`);
            // Process the line.
        });
        await once(rl, 'close');
        try {
            //console.log(colors.brightMagenta('Loading data...\n'));
            //Crear el maze
            for (
                let i = 0;
                i < arrayInput.length && arrayInput[i].indexOf(',') == -1;
                i = 0
            ) {
                level.push(arrayOfArrays(i));
                arrayInput.shift();
            }

            //Crear las posiciones
            for (let i = 0; i < arrayInput.length; i++) {
                if (arrayInput[i] != []) {
                    positions.push(
                        arrayOfArrays(i).map(function (x) {
                            return parseInt(x, 10);
                        })
                    );
                }
            }

            function arrayOfArrays(i) {
                let place = [];
                for (let j = 0; j < arrayInput[i].length; j++) {
                    if (arrayInput[i][j] != ',') {
                        place.push(arrayInput[i][j]);
                    }
                }
                return place;
            }
            /* console.log(
                colors.brightCyan('Data has been loaded succesfully\n')
            ); */
        } catch (err) {
            console.log(
                colors.brightRed(
                    'An error has ocurred loading the data: ' +
                        err +
                        ' \nCheck your input\n'
                )
            );
        } finally {
            return [level, positions];
        }
    } catch (err) {
        // Este es el return del array level y el array posiciones.
        console.error(err);
    }
}

/**
 * Una vez leida la informacion, se asigna a unas variables para operarlas con mayor facilidad.
 * Esta es la funcion que abarca todo.
 *
 */
async function fetchingData() {
    //console.log(colors.brightMagenta('\nAwaiting for data...\n'));
    const processoFetched = await processLineByLine();
    //console.log(colors.brightMagenta('\nFetching...\n'));

    let maze = processoFetched[0];
    let player = processoFetched[1][0];
    processoFetched[1].shift();
    let boxes = processoFetched[1];

    let goal = setGoal(maze);

    /* //Extra information about the problem
    console.log(colors.brightYellow('Entries:\n'));
    console.log(colors.brightRed('Maze:'));
    console.log(maze);
    console.log(colors.brightRed('Player:'));
    console.log(player);
    console.log(colors.brightRed('Boxes:'));
    console.log(boxes);
    console.log(colors.brightRed('Goal:'));
    console.log(goal); */

    //Representacion de el nodo raiz de nuestro arbol, a partir del cual se crearan los demas nodos.
    let root = {
        pos: player,
        pos_Box: boxes,
        level: 0,
        parent: null,
        action: null,
    };

    let problem = { maze, goal };

    var start = new Date().getTime();
    //console.log('Going deep...');
    console.log(solve(problem, root));
    var end = new Date().getTime();
    var time = (end - start) / 1000;
    //console.log('time: ', time, 's');

    /**
     * Funcion que retorna true si esta en el nodo ganador y false de lo contrario
     * @param {object} node
     * @param {array} problem
     */
    function testGoal(node, problem) {
        let aux = node.pos_Box;
        aux = aux.map(function (x) {
            return compare(x, problem);
        });
        return !aux.includes(false);
    }

    /**
     * Funcion que compara la posicion de una caja con el tablero y retorna un booleano
     * @param {object} node
     * @param {array} problem
     */
    function compare(node, problem) {
        let psx = node[0];
        let psy = node[1];

        let bool = false;

        for (let i = 0; i < problem.goal.length; i++) {
            if (psx == problem.goal[i][0] && psy == problem.goal[i][1]) {
                bool = true;
            }
        }
        return bool;
    }

    /**
     * Retorna un numero identificador unico para cada nodo enviado.
     * @param {object} node
     */
    function hashNodeToInt(node) {
        let hashNum = 0;
        hashNum += node.pos[0] + 10 * node.pos[1];
        for (let i = 0; i < node.pos_Box.length; i++) {
            hashNum +=
                100 ** (i + 1) * (node.pos_Box[i][0] + 10 * node.pos_Box[i][1]);
        }
        return hashNum;
    }

    /**
     * Retorna un booleano true en caso de que el estado no se encuentre en un array hash, en caso que ya exista,
     * retorna false.
     * @param {object} node
     */
    function isHashRepeated(node, hashNum) {
        for (let i = 0; i < hash.length; i++) {
            if (hashNum == hash[i][0]) {
                if (node.level < hash[i][1]) {
                    return false;
                } else return true;
            }
        }
        return false;
    }

    /**
     * Retorna un booleano true en caso de que el estado no se haya evaluado todavia y false de lo contrario
     * @param {object} node
     */
    function avoidRepeatedState(node) {
        let hashNum = hashNodeToInt(node);
        if (isHashRepeated(node, hashNum)) {
            return false;
        }
        hash.unshift([hashNum, node.level]);
        return true;
    }

    /**
     * Inicia la creacion y busqueda del arbol por profundidad iterativa.
     * @param {array} problem
     * @param {object} nodo
     */
    function solve(problem, nodo) {
        let solution = [];
        let level;
        let nodos = [];
        let nodoEvaluado = nodo;
        while (!testGoal(nodoEvaluado, problem)) {
            if (
                // no sobre pase el límite de profundidad.
                nodoEvaluado.level < 64 &&
                // evite acciones repetitivas.
                avoidRepeatedState(nodoEvaluado)
            ) {
                agregarNodos(problem.maze, nodoEvaluado, nodos);
            }
            if (nodos[0] == null) {
                solution = 'No hay solución';
                level = nodoEvaluado.level;
                return { solution, level };
            }
            nodoEvaluado = nodos.shift();
        }

        level = nodoEvaluado.level;
        trazarRuta(nodoEvaluado, solution);
        return { solution, level };
    }

    /**
     * Funcion que mueve una caja del array de cajas en la direccion indicada
     * @param {array} Boxes
     * @param {array} box2move
     * @param {string} side
     */
    function moveBox(Boxes, box2move, side) {
        switch (side) {
            case 'U':
                Boxes[box2move][0]--;
                break;
            case 'D':
                Boxes[box2move][0]++;
                break;
            case 'L':
                Boxes[box2move][1]--;
                break;
            case 'R':
                Boxes[box2move][1]++;
                break;

            default:
                console.log("something's wrong with moveBox");
                break;
        }
    }

    /**
     * Funcion para crear un nodo con la representacion del nodo raiz.
     * @param {object} pos
     * @param {array} pos_Box
     * @param {number} level
     * @param {object} parent
     * @param {string} action
     */
    function crearNodo(pos, pos_Box, level, parent, action) {
        let node = {
            pos: pos,
            pos_Box: pos_Box,
            level: level + 1,
            parent: parent,
            action: action,
        };
        return node;
    }

    /**
     * Crea los nuevos nodos segun un padre dado, debe de cumplir con la funcion canMove y segun su direccion,
     * se hara un push a nodos en la misma.
     * @param {array} maze
     * @param {object} padre
     * @param {array} nodos
     */
    function agregarNodos(maze, padre, nodos) {
        let moves = ['R', 'L', 'D', 'U'];
        for (let i = 0; i < moves.length; i++) {
            let canMov = canMove(maze, padre, moves[i]);
            if (canMov > 0) {
                let row = padre.pos[0];
                let column = padre.pos[1];
                switch (moves[i]) {
                    case 'U':
                        row--;
                        break;
                    case 'D':
                        row++;
                        break;
                    case 'L':
                        column--;
                        break;
                    case 'R':
                        column++;
                        break;
                    default:
                        console.log("something's wrong with the switch");
                        break;
                }
                let pos_Box = padre.pos_Box;
                if (canMov === 2) {
                    pos_Box = [];
                    for (let i = 0; i < padre.pos_Box.length; i++) {
                        pos_Box.push(padre.pos_Box[i].slice());
                    }
                    moveBox(pos_Box, box2move, moves[i]);
                }
                nodos.unshift(
                    crearNodo(
                        [row, column],
                        pos_Box,
                        padre.level,
                        padre,
                        moves[i]
                    )
                );
            }
        }
    }

    /**
     * Retorna true en caso de que exista una caja en la posicion dada.
     * @param {number} paPosY
     * @param {number} paPosX
     * @param {array} pos_Box
     */
    function compareBox(paPosY, paPosX, pos_Box) {
        for (let i = 0; i < pos_Box.length; i++) {
            if (paPosY == pos_Box[i][0] && paPosX == pos_Box[i][1]) {
                box2move = i;
                return true;
            }
        }
        return false;
    }

    /**
     * Comprueba si existe una caja al lado de una posicion en la direccion dada
     * @param {object} padre
     * @param {string} side
     * @param {number} plusOne
     */
    function isBoxAtSide(padre, side, plusOne) {
        let paPos = {
            y: padre.pos[0],
            x: padre.pos[1],
        };
        switch (side) {
            case 'U':
                if (compareBox(paPos.y - 1 - plusOne, paPos.x, padre.pos_Box)) {
                    return true;
                }
                break;
            case 'D':
                if (compareBox(paPos.y + 1 + plusOne, paPos.x, padre.pos_Box)) {
                    return true;
                }
                break;
            case 'L':
                if (compareBox(paPos.y, paPos.x - 1 - plusOne, padre.pos_Box)) {
                    return true;
                }
                break;
            case 'R':
                if (compareBox(paPos.y, paPos.x + 1 + plusOne, padre.pos_Box)) {
                    return true;
                }
                break;
            default:
                console.log("something's wrong with the switch");
                break;
        }
        return false;
    }

    /**
     * Comprueba si existe una pared al lado de una posicion en la direccion dada, retornando true en caso de que si
     * y falso en caso de que no.
     * @param {array} maze
     * @param {object} padre
     * @param {string} side
     * @param {number} plusOne
     */
    function isWallAtSide(maze, padre, side, plusOne) {
        let paPos = {
            y: padre.pos[0],
            x: padre.pos[1],
        };
        switch (side) {
            case 'U':
                if (maze[paPos.y - 1 - plusOne][paPos.x] == 'W') {
                    return true;
                }
                break;
            case 'D':
                if (maze[paPos.y + 1 + plusOne][paPos.x] == 'W') {
                    return true;
                }
                break;
            case 'L':
                if (maze[paPos.y][paPos.x - 1 - plusOne] == 'W') {
                    return true;
                }
                break;
            case 'R':
                if (maze[paPos.y][paPos.x + 1 + plusOne] == 'W') {
                    return true;
                }
                break;
            default:
                console.log("something's wrong with the switch");
                break;
        }
        return false;
    }

    /**
     * Retorna 0 en caso de que pueda moverse, 1 en caso de que no y 2 en caso de que pueda moverse y haya una caja
     * @param {array} maze
     * @param {object} padre
     * @param {string} side
     */
    function canMove(maze, padre, side) {
        if (isBoxAtSide(padre, side, 0)) {
            if (isWallAtSide(maze, padre, side, 1)) {
                return 0;
            } else if (isBoxAtSide(padre, side, 1)) {
                return 0;
            } else return 2;
        } else {
            return isWallAtSide(maze, padre, side, 0) ? 0 : 1;
        }
    }

    /**
     * Crea el camino desde el nodo hijo hasta su padre y lo asigna al array dado.
     * @param {object} nodo
     * @param {array} array
     */
    function trazarRuta(nodo, array) {
        let posPath = [];
        // Crea el Array recorriendo los padres desde la hoja en la posicion 0 del Array tree
        while (nodo.parent != null) {
            array.unshift(nodo.action);
            posPath.push('[' + nodo.pos + ']');
            nodo = nodo.parent;
        }
    }
}

fetchingData();

/**
 * Define el objetivo, donde hayan posiciones en X añade un array a goal.
 * @param {array} maze
 */
function setGoal(maze) {
    let goal = [];
    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[1].length; j++) {
            if (maze[i][j] == 'X') {
                goal.push([i, j]);
            }
        }
    }
    return goal;
}

const colors = require('colors');

const { once } = require('events');
const { createReadStream } = require('fs');
const { createInterface } = require('readline');
var box2move;
var hash = [];
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
            console.log(colors.brightMagenta('Loading data...\n'));
            //Crear el maze
            for (
                var i = 0;
                i < arrayInput.length && arrayInput[i].indexOf(',') == -1;
                i = 0
            ) {
                level.push(arrayOfArrays(i));
                arrayInput.shift();
            }

            //Crear las posiciones
            for (var i = 0; i < arrayInput.length; i++) {
                if (arrayInput[i] != []) {
                    positions.push(
                        arrayOfArrays(i).map(function (x) {
                            return parseInt(x, 10);
                        })
                    );
                }
            }

            function arrayOfArrays(i) {
                place = [];
                for (var j = 0; j < arrayInput[i].length; j++) {
                    if (arrayInput[i][j] != ',') {
                        place.push(arrayInput[i][j]);
                    }
                }
                return place;
            }
            console.log(
                colors.brightCyan('Data has been loaded succesfully\n')
            );
        } catch (err) {
            console.log(
                colors.brightRed(
                    'An error has ocurred loading the data: ' +
                        err +
                        ' \nCheck your input\n'
                )
            );
        } finally {
            //console.log(level)
            return [level, positions];
        }
    } catch (err) {
        console.error(err);
    }
}

async function fetchingData() {
    console.log(colors.brightMagenta('\nAwaiting for data...\n'));
    const processoFetched = await processLineByLine();
    console.log(colors.brightMagenta('\nFetching...\n'));

    let maze = processoFetched[0];
    let player = processoFetched[1][0];
    processoFetched[1].shift();
    let boxes = processoFetched[1];

    let goal = setGoal(maze);

    console.log(colors.brightYellow('Entries:\n'));
    console.log(colors.brightRed('Maze:'));
    console.log(maze);
    console.log(colors.brightRed('Player:'));
    console.log(player);
    console.log(colors.brightRed('Boxes:'));
    console.log(boxes);
    console.log(colors.brightRed('Goal:'));
    console.log(goal);

    // De aquí para abajo estan los maravillosos Arboles
    const OPERATORS = ['U', 'D', 'L', 'R']; // Priotity in case

    let root = {
        pos: player,
        pos_Box: boxes,
        level: 0,
        parent: null,
        action: null,
    };

    let problem = { maze, goal };

    var start = new Date().getTime();
    console.log('Going wide...');
    console.log(solve(problem, root));
    var end = new Date().getTime();
    var time = (end - start) / 1000;
    console.log('time: ', time, 's');

    function testGoal(node, problem) {
        //console.log(problem);
        let aux = node.pos_Box;
        aux = aux.map(function (x) {
            return compare(x, problem);
        });
        return !aux.includes(false);
    }

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

    function hashNodeToInt(node) {
        let hashNum = 0;
        hashNum += node.pos[0] + 10 * node.pos[1];
        for (let i = 0; i < node.pos_Box.length; i++) {
            hashNum +=
                100 ** (i + 1) * (node.pos_Box[i][0] + 10 * node.pos_Box[i][1]);
        }
        return hashNum;
    }

    /*
    
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

    function avoidRepeatedState(node) {
        hashNum = hashNodeToInt(node);
        //console.log(hashNum);
        //console.log(isHashRepeated(node, hashNum));
        if (hash.includes(hashNum)) {
            return false;
        }
        hash.push(hashNum);
        //console.log(hash);
        return true;
    }

    function solve(problem, nodo) {
        let solution = [];
        //let cost = 0;
        let nodos = [];
        let nodoEvaluado = nodo;
        while (!testGoal(nodoEvaluado, problem)) {
            /* console.log('\n\nnodo: ', nodoEvaluado.pos);
            console.log(
                'parent-action: ',
                nodoEvaluado.parent == null ? null : nodoEvaluado.parent.action
            );
            console.log('action: ', nodoEvaluado.action);
            console.log('level: ', nodoEvaluado.level, '\n');
            if (nodoEvaluado.level > 1) {
                console.log(
                    'parent pos: ',
                    nodoEvaluado.parent.parent.pos,
                    '\npos:        ',
                    nodoEvaluado.pos,
                    '\nparent posBox: ',
                    nodoEvaluado.parent.parent.pos_Box,
                    '\nposBox:        ',
                    nodoEvaluado.pos_Box
                );
                if (
                    nodoEvaluado.level > 1 &&
                    nodoEvaluado.parent.parent.pos[0] == nodoEvaluado.pos[0] &&
                    nodoEvaluado.parent.parent.pos[1] == nodoEvaluado.pos[1]
                ) {
                    console.log('pos=parentPos');
                }
            } */
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
                break;
            }
            nodoEvaluado = nodos.shift();
            //console.log(nodoEvaluado);
        }

        level = nodoEvaluado.level;
        trazarRuta(nodoEvaluado, solution);
        return { solution, level };
    }

    function moveBox(Boxes, box2move, side) {
        //console.log('boxes: ', Boxes);
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
        //console.log('boxes after move: ', Boxes);
    }

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
     * Se encarga de añadir los posibles caminos a seguir para una posicion en maze. En este caso toma
     * la primera posicion, pues es la de menor costo segun nuestro BubbleSort.
     * @param {Array} maze
     * @param {Object} padre
     * @param {Array} nodos
     */
    function agregarNodos(maze, padre, nodos) {
        let moves = ['U', 'D', 'L', 'R'];
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
                // console.log(moves[i],' move : ', canMov);
                if (canMov === 2) {
                    pos_Box = [];
                    for (let i = 0; i < padre.pos_Box.length; i++) {
                        pos_Box.push(padre.pos_Box[i].slice());
                    }
                    moveBox(pos_Box, box2move, moves[i]);
                }
                nodos.push(
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

    function compareBox(paPosY, paPosX, pos_Box) {
        for (let i = 0; i < pos_Box.length; i++) {
            if (paPosY == pos_Box[i][0] && paPosX == pos_Box[i][1]) {
                box2move = i;
                return true;
            }
        }
        return false;
    }

    function isBoxAtSide(padre, side, plusOne) {
        //complete
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

    function isWallAtSide(maze, padre, side, plusOne) {
        //completed
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

    function sacarMinimo(nodos) {
        let min = { cost: 999999 };
        let index = null;
        for (let i = 0; i < nodos.length; i++) {
            if (nodos[i].cost < min.cost) {
                min = nodos[i];
                index = i;
            }
        }
        nodos.splice(index, 1);
        return min;
    }

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

    function trazarRuta(nodo, array) {
        //let index = nodo;
        let posPath = [];
        // Crea el Array recorriendo los padres desde la hoja en la posicion 0 del Array tree
        while (nodo.parent != null) {
            array.unshift(nodo.action);
            posPath.push('[' + nodo.pos + ']');
            nodo = nodo.parent;
        }
        //console.log("PosPath: " +"["+posPath+"]");
    }
    //console.log(solve(problem, root));
}

fetchingData();

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
/*
for(var i = 0;array[i].chartAt[1] || array[i].chartAt[1] != ',';i++){
    console.log(array[i]);
}
*/

//process.argv.forEach(function (val, index, array) {
//    console.log(index + ': ' + val);
//  });

//console.log('\nola estoy aqui para explicar');
//console.log(process.argv[2]);

let maze = [[2, 1, 1], [2, 3, 3], [2, 3, 1], [1, 1, 1]];

let start = [3, 0];
let goal = [0, 2];
const OPERATORS = ["U", "D", "L", "R"]; // Priotity in case

let problem = { maze, goal

    // Avoid come back
    // root: {pos: [3, 0], cost: 0, parent: null, action: null}
    // node: {pos: [x, y], cost: number, parent: node, action: string}
};function testGoal(node, problem) {
    if (node.pos[0] == problem.goal[0] && node.pos[1] == problem.goal[1]) {
        return true;
    }
    return false;
}

function solve(problem, root) {
    let solution = [];
    let cost = 0;

    // START CODE HERE

    // Para imprimir los Arrays.
    let created = [];
    let posPath = [];

    // Array inicial en la posicion del problema.
    let tree = [{ pos: root, cost: 0, parent: null, action: null }];

    // Crea los nodos y convierte el Array tree en un arbol, donde la posicion 0 es el camino de menor costo.
    while (!testGoal(tree[0], problem)) {
        addNode(problem, tree);
        tree = ordenarArbol(tree);
        created.push("[" + tree[0].pos + "]");
    }

    // Declaracion de cost para ser impresa.
    cost = tree[0].cost;

    // Inicializar la primera hoja del arbol para hacer el bucle while
    index = tree[0];

    // Crea el Array recorriendo los padres desde la hoja en la posicion 0 del Array tree
    while (index.parent != null) {
        solution.unshift(index.action);
        posPath.push("[" + index.pos + "]");
        index = index.parent;
    }

    console.log("Created: " + "[" + created + "]");
    console.log("PosPath: " + "[" + posPath + "]");
    // END CODE HERE
    return { solution, cost };
}

/**
     * Se encarga de añadir los posibles caminos a seguir para una posicion en maze. En este caso toma
     * la primera posicion, pues es la de menor costo segun nuestro BubbleSort.
     * @param {Object} problem
     * @param {Array} tree
 */
function addNode(problem, tree) {
    posNode = 0;

    //Extender arriba?
    if (tree[posNode].pos[0] - 1 >= 0 && "D" != tree[posNode].action) {
        let newPos = [tree[posNode].pos[0] - 1, tree[posNode].pos[1]];
        tree.unshift({ pos: newPos, cost: tree[posNode].cost + problem.maze[newPos[0]][newPos[1]], parent: tree[posNode], action: "U" });
        posNode++;
    }

    //Extender derecha?
    if (tree[posNode].pos[1] + 1 < problem.maze[0].length && "L" != tree[posNode].action) {
        let newPos = [tree[posNode].pos[0], tree[posNode].pos[1] + 1];
        tree.unshift({ pos: newPos, cost: tree[posNode].cost + problem.maze[newPos[0]][newPos[1]], parent: tree[posNode], action: "R" });
        posNode++;
    }

    //Extender abajo?
    if (tree[posNode].pos[0] + 1 < problem.maze.length && "U" != tree[posNode].action) {
        let newPos = [tree[posNode].pos[0] + 1, tree[posNode].pos[1]];
        tree.unshift({ pos: newPos, cost: tree[posNode].cost + problem.maze[newPos[0]][newPos[1]], parent: tree[posNode], action: "D" });
        posNode++;
    }

    //Extender izquierda?
    if (tree[posNode].pos[1] - 1 >= 0 && "R" != tree[posNode].action) {
        let newPos = [tree[posNode].pos[0], tree[posNode].pos[1] - 1];
        tree.unshift({ pos: newPos, cost: tree[posNode].cost + problem.maze[newPos[0]][newPos[1]], parent: tree[posNode], action: "L" });
        posNode++;
    }

    tree.splice(posNode, 1);
}

/**
     * Se encarga de ordenar el arreglo creado en addNode siguiendo el algoritmo BubbleSort.
     * @param {Array} tree
 */
function ordenarArbol(tree) {
    const tamaño = tree.length;
    for (let i = 0; i < tamaño; i++) {
        for (let j = 0; j < tamaño - 1 - i; j++) {
            if (tree[j].cost > tree[j + 1].cost) {
                [tree[j], tree[j + 1]] = [tree[j + 1], tree[j]];
            }
        }
    }
    return tree;
}

console.log(solve(problem, start));
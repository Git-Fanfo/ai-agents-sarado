let maze = [[2, 1, 1],
            [2, 3, 3],
            [2, 3, 1],
            [1, 1, 1]]

let start = [3, 0]
let goal = [0, 2]
const OPERATORS = ["U", "D", "L", "R"] // Priotity in case

let problem = { maze, goal }

// Avoid come back
// root: {pos: [3, 0], cost: 0, parent: null, action: null}
// node: {pos: [x, y], cost: number, parent: node, action: string}
function testGoal(node, problem) {
    if (node.pos[0] == problem.goal[0] && node.pos[1] == problem.goal[1]) {
        return true;
    }
    return false;
}

function solve(problem, root) {
    let solution = [];
    let cost = 0;
    
    // START CODE HERE
    let tree = [{pos: root, cost: 0, parent: null, action: null}];
    
    addNode(problem,tree,0);

    // END CODE HERE
    return { solution, cost }
    //return tree;
    //hola como estas main vladimisc
    //#comiendo_pan
}

function addNode(problem,tree,posNode){
    //Extender arriba?
    if(tree[posNode].pos[0]-1 >= 0 && "D" != tree[posNode].action)
    {   
        let newPos = [tree[posNode].pos[0]-1,tree[posNode].pos[1]];
        tree.push({pos: newPos, cost: tree[posNode].cost + problem.maze[newPos[0]][newPos[1]], parent: tree[posNode].pos, action: "U"});
    }

    //Extender derecha?
    if(tree[posNode].pos[1]+1 < problem.maze[0].length && "L" != tree[posNode].action)
    {   
        let newPos = [tree[posNode].pos[0],tree[posNode].pos[1]+1];
        tree.push({pos: newPos, cost: tree[posNode].cost + problem.maze[newPos[0]][newPos[1]], parent: tree[posNode].pos, action: "R"});
    }

    //Extender abajo?
    if(tree[posNode].pos[0]+1 < problem.maze.length && "U" != tree[posNode].action)
    {   
        let newPos = [tree[posNode].pos[0]+1,tree[posNode].pos[1]];
        tree.push({pos: newPos, cost: tree[posNode].cost + problem.maze[newPos[0]][newPos[1]], parent: tree[posNode].pos, action: "D"});
    }

    //Extender izquierda?
    if(tree[posNode].pos[1]-1 >= 0 && "R" != tree[posNode].action)
    {   
        let newPos = [tree[posNode].pos[0],tree[posNode].pos[1]-1];
        tree.push({pos: newPos, cost: tree[posNode].cost + problem.maze[newPos[0]][newPos[1]], parent: tree[posNode].pos, action: "L"});
    }
}

test = [{sara : 1},{juan : 2}];
test.push({pitochu : 1});

console.log(solve(problem, start));
const fs = require('fs');
const readline = require('readline');
const colors = require('colors');



async function processLineByLine() {
    const arrayInput = [];
    const level = [];
    const positions = [];
  const fileStream = fs.createReadStream(process.argv[2]);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    arrayInput.push(`${line}`);     
  }
  //console.log(arrayInput);
    try {
        console.log(colors.brightMagenta('Loading data...\n'));
        //Crear el maze
        for(var i = 0;i < arrayInput.length && arrayInput[i].indexOf(",")==-1;i=0){
            level.push(arrayOfArrays(i))
            arrayInput.shift();
            }
        
        //Crear las posiciones
        for(var i=0;i<arrayInput.length;i++){
            if(arrayInput[i] != []){
                positions.push(arrayOfArrays(i))
            }        
        }
    
        function arrayOfArrays(i) {
            place = [];
            for(var j = 0;j<arrayInput[i].length;j++){
                if(arrayInput[i][j]!=','){
                    place.push(arrayInput[i][j]);   
                }
            }
            return place;
        }        
        
    } catch(err) {
        console.log(colors.brightRed('An error has ocurred loading the data: '+ err +' \nCheck your input\n'));
    } finally{
        console.log(colors.brightCyan('Data has been loaded succesfully\n'));
        return [level,positions];  
    }    
}

async function fetchingData() {
    console.log(colors.brightMagenta('\nAwaiting for data...\n'));
    const processoFetched = await processLineByLine();
    console.log(colors.brightMagenta('\nFetching...\n'));
    let level = processoFetched[0];
    let player = processoFetched[1][0];
    processoFetched[1].shift();
    let boxes = processoFetched[1];

    console.log(colors.brightYellow('Entries:\n'));
    console.log(colors.brightRed('Maze:'));
    console.log(level);
    console.log(colors.brightRed('Player:'));
    console.log(player);
    console.log(colors.brightRed('Boxes:'));
    console.log(boxes);
    

    // De aquí para abajo estan los maravillosos Arboles

    let maze = 
            [[2, 1, 1], 
            [2, 3, 3], 
            [2, 3, 1], 
            [1, 1, 1]];

    let start = [3, 0];
    let goal = [0, 2];
    const OPERATORS = ["U", "D", "L", "R"];// Priotity in case

    let root = {
        pos: start,
        cost: 0,
        parent: null,
        action: null
    };

    let problem = { maze, goal };

    // Avoid come back
    // root: {pos: [3, 0], cost: 0, parent: null, action: null}
    // node: {pos: [x, y], cost: number, parent: node, action: string}
    function testGoal(node, problem) {
        //console.log(problem);
        if (node.pos[0] == problem.goal[0] && node.pos[1] == problem.goal[1]) {
            return true;
        }
        return false;
    }

    function solve(problem, nodo) {
        let solution = [];
        let cost = 0;
        let nodos = [];
        let nodoEvaluado = nodo;

        while (!testGoal(nodoEvaluado, problem) ) {
            agregarNodos(problem.maze,nodoEvaluado,nodos);
            nodoEvaluado = sacarMinimo(nodos);
            //console.log(nodoEvaluado);
        } 
        cost = nodoEvaluado.cost;
        console.log('Costo: '+cost);
        trazarRuta(nodoEvaluado,solution);
        return { solution, cost }
    }

    /**
         * Se encarga de añadir los posibles caminos a seguir para una posicion en maze. En este caso toma
             * la primera posicion, pues es la de menor costo segun nuestro BubbleSort.
             * @param {Array} maze
             * @param {Object} padre
             * @param {Array} nodos
         */
    function agregarNodos(maze,padre,nodos) {
        if(padre.pos[0] > 0){
            let fila = padre.pos[0]-1;
            let colum = padre.pos[1];
            let costo = maze[fila][colum] + padre.cost;
            nodos.push(crearNodo([fila,colum], costo, padre, "U"))
        }
        if(padre.pos[0] < maze.length-1){ 
            let fila = padre.pos[0]+1;
            let colum = padre.pos[1];
            let costo = maze[fila][colum] + padre.cost;
            nodos.push(crearNodo([fila,colum], costo, padre, "D"))
        }
        if(padre.pos[1] > 0){
            let fila = padre.pos[0];
            let colum = padre.pos[1]-1;
            let costo = maze[fila][colum] + padre.cost;
            nodos.push(crearNodo([fila,colum], costo, padre, "L"))
        }
        if(padre.pos[1] < maze[0].length){
            let fila = padre.pos[0];
            let colum = padre.pos[1]+1;
            let costo = maze[fila][colum] + padre.cost;
            nodos.push(crearNodo([fila,colum], costo, padre, "R"))
        }

        //return nodos;
    }

    function crearNodo(pos,cost,parent,action) {
        let node = {
            pos: pos,
            cost: cost,
            parent: parent,
            action: action
        };
        return node;
    };

    function sacarMinimo(nodos){
        let min = { cost: 999999 };
        let index = null;
        for (let i = 0; i< nodos.length; i++) {
        if(nodos[i].cost < min.cost){
            min = nodos[i];
            index = i;
        }
        }
        nodos.splice(index,1);
        return min;
    }

    function trazarRuta(nodo,array){
        //let index = nodo;
        let posPath = [];
            // Crea el Array recorriendo los padres desde la hoja en la posicion 0 del Array tree
            while(nodo.parent != null){
                array.unshift(nodo.action);
                posPath.push("["+nodo.pos+"]");
                nodo = nodo.parent;
            }
            //console.log("PosPath: " +"["+posPath+"]");    
    }
    console.log(solve(problem, root));
}

fetchingData();

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
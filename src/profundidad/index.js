const colors = require('colors');

const { once } = require('events');
const { createReadStream } = require('fs');
const { createInterface } = require('readline');

    
async function processLineByLine() {
    const arrayInput = [];
    const level = [];
    const positions = [];
    try {
      const rl = createInterface({
        input: createReadStream(process.argv[2]),
        crlfDelay: Infinity
      });
  
      rl.on('line', (line) => {
          arrayInput.push(`${line}`);
        // Process the line.
      });
      await once(rl, 'close');
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
                    positions.push(arrayOfArrays(i).map(function(x) {
                        return parseInt(x, 10);
                    }))
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
            console.log(colors.brightCyan('Data has been loaded succesfully\n'));
        } catch(err) {
            console.log(colors.brightRed('An error has ocurred loading the data: '+ err +' \nCheck your input\n'));
        } finally{
            //console.log(level)
            return [level,positions];  
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
    const OPERATORS = ["U", "D", "L", "R"];// Priotity in case

    let root = {
        pos: player,
        pos_Box :boxes,
        level: 0,
        parent: null,
        action: null
    };

    let problem = { maze, goal };

    console.log(colors.brightGreen('Test Goal: '+testGoal(root,problem)));

    function testGoal(node, problem) {
        //console.log(problem);
        let aux = node.pos_Box;
        aux = aux.map(
                function(x) {
                    return compare(x,problem)
            })
        return !aux.includes(false);
    }

    function compare(node,problem){
        let psx = node[0];
        let psy = node[1];

        let bool = false;

        for(let i=0;i<problem.goal.length;i++){
            if(psx==problem.goal[i][0] && psy==problem.goal[i][1]){
                bool = true;
            }
        }
        return bool;
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
    //console.log(solve(problem, root));
}

fetchingData();


function setGoal(maze){
    let goal = [];
    for(let i = 0;i<maze.length;i++){
        for(let j = 0;j<maze[1].length;j++){
            if(maze[i][j]=='X'){
                goal.push([i,j]);
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
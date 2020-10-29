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
                level.push(arrayOfArrays(i).map(
                    function(x) {
                        if(x==0){return parseInt(x, 10)}
                        else return x
                }))
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

    //Borrar?
    let created = [];

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
        pos_Box : boxes,
        level: 0,
        parent: null,
        action: null
    };

    let problem = { maze, goal };

    console.log(colors.brightGreen('Test Goal: '+testGoal(root,problem)));
    //console.log(colors.brightGreen('Estoy en: '+maze[player[0]][player[1]-1]));

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
        let nodos = [];
        let nodoEvaluado = nodo;

        const limite = 3;

        while (!testGoal(nodoEvaluado, problem) &&  nodoEvaluado.level < limite) {
            agregarNodos(problem.maze,nodoEvaluado,nodos);
            nodoEvaluado = nodos[0];
            nodos.shift();
            //console.log(nodos[0]);
        }

        //console.log(nodos);
        //console.log('creados:'+created)
        trazarRuta(nodoEvaluado,solution);
        return { solution }
    }

    /**
         * Se encarga de añadir los posibles caminos a seguir para una posicion en maze. En este caso toma
             * la primera posicion, pues es la de menor costo segun nuestro BubbleSort.
             * @param {Array} maze
             * @param {Object} padre
             * @param {Array} nodos
         */
    function agregarNodos(maze,padre,nodos) {
        if(avanzar(maze,padre,'U')){
            let fila = padre.pos[0]-1;
            let colum = padre.pos[1];
            let niveles = padre.level + 1;
            let cajas = padre.pos_Box;
            nodos.push(crearNodo([fila,colum], cajas, niveles, padre, "U"))
            console.log('box in U: '+ box_Address(padre.pos,padre.pos_Box,1,'U'));
            created.push('U');
        }
        if(avanzar(maze,padre,'D')){ 
            let fila = padre.pos[0]+1;
            let colum = padre.pos[1];
            let niveles = padre.level + 1;
            let cajas = padre.pos_Box;
            created.push('D');
            console.log('box in D: '+ box_Address(padre.pos,padre.pos_Box,1,'D'));
            nodos.push(crearNodo([fila,colum],cajas, niveles, padre, "D"))
        }
        if(avanzar(maze,padre,'L')){
            let fila = padre.pos[0];
            let colum = padre.pos[1]-1;
            let niveles = padre.level + 1;
            let cajas = padre.pos_Box;
            created.push('L');
            console.log('box in L: '+ box_Address(padre.pos,padre.pos_Box,1,'L'));
            nodos.push(crearNodo([fila,colum],cajas, niveles, padre, "L"))
        }
        //console.log('voy a la derecha: '+avanzar(maze,padre,'R'))
        if(avanzar(maze,padre,'R')){
            let fila = padre.pos[0];
            let colum = padre.pos[1]+1;
            let niveles = padre.level + 1;
            let cajas = padre.pos_Box;
            created.push('R');
            console.log('box in R: '+ box_Address(padre.pos,padre.pos_Box,1,'R'));
            nodos.push(crearNodo([fila,colum],cajas, niveles, padre, "R"))
        }

        return nodos;
    }

    function crearNodo(pos,cajas,level,parent,action) {
        let node = {
            pos: pos,
            pos_Box :cajas,
            level: level,
            parent: parent,
            action: action
        };
        return node;
    };

    function avanzar(maze,padre,dir){
        let caja_caja = false;
        switch (dir) {
            case 'U':
                caja_caja =  box_Address(padre.pos,padre.pos_Box,1,'U') && box_Address(padre.pos,padre.pos_Box,2,'U')           
                return padre.pos[0] > 0 && wall_Address(maze,padre,'U') && !caja_caja;
            case 'D':           
                caja_caja =  box_Address(padre.pos,padre.pos_Box,1,'D') && box_Address(padre.pos,padre.pos_Box,2,'D')
                return padre.pos[0] < maze.length - 1 && wall_Address(maze,padre,'D') && !caja_caja;
            case 'L':              
                caja_caja =  box_Address(padre.pos,padre.pos_Box,1,'L') && box_Address(padre.pos,padre.pos_Box,2,'L')
                return padre.pos[1] > 0 && wall_Address(maze,padre,'L') && !caja_caja;
            case 'R':               
                caja_caja =  box_Address(padre.pos,padre.pos_Box,1,'R') && box_Address(padre.pos,padre.pos_Box,2,'R')
                return padre.pos[1] < maze[0].length && wall_Address(maze,padre,'R') && !caja_caja;
          }
    }

    function wall_Address(maze,padre,dir){
        switch (dir) {
            case 'U':                
                try {
                    return maze[padre.pos[0]-1][padre.pos[1]]!= 'W';
                } catch (error) {
                    return false
                }          
            case 'D': 
                try {
                    return maze[padre.pos[0]+1][padre.pos[1]]!= 'W';
                } catch (error) {
                   return false
                }                           
            case 'L':                
                try {
                    return maze[padre.pos[0]][padre.pos[1]-1]!= 'W';
                } catch (error) {
                    return false
                }    
            case 'R':  
                try {
                   return maze[padre.pos[0]][padre.pos[1]+1]!= 'W';
                } catch (error) {
                   return false
                }      
          }
    }

    function box_Address(pos,array,dist,dir){
        let bool = false;
        for(let i=0;i<array.length && !bool;i++){
            if(dir == 'U'){
                bool = pos[0]-dist==array[i][0] && pos[1]==array[i][1];
            }

            if(dir == 'D'){                
                bool = (pos[0]+dist==array[i][0] && pos[1]==array[i][1]);
            }

            if(dir == 'L'){
                bool = pos[0]==array[i][0] && pos[1]-dist==array[i][1];
            }

            if(dir == 'R'){
                bool = pos[0]==array[i][0] && pos[1]+dist==array[i][1];
            }
        }
        return bool;
    }

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
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
            for(let i = 0;i < arrayInput.length && arrayInput[i].indexOf(",")==-1;i=0){
                level.push(arrayOfArrays(i).map(
                    function(x) {
                        if(x==0){return parseInt(x, 10)}
                        else return x
                }))
                arrayInput.shift();
                }
            
            //Crear las posiciones
            for(let i=0;i<arrayInput.length;i++){
                if(arrayInput[i] != []){
                    positions.push(arrayOfArrays(i).map(function(x) {
                        return parseInt(x, 10);
                    }))
                }        
            }
        
            function arrayOfArrays(i) {
                place = [];
                for(let j = 0;j<arrayInput[i].length;j++){
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
    let visited_States = [];

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
        let expandidos = [];

        let nivelActual = 0

        const limite = 64;
        //&&  nodoEvaluado.level <= limite
        while (!testGoal(nodoEvaluado, problem)&&  nodoEvaluado.level <= limite) {
            //console.log('estados guardados:'+visited_States[0])
            //console.log('evaluado?: '+saved_State(nodoEvaluado,visited_States))
                    
            //console.log(colors.brightGreen('expande '+nodoEvaluado.action))
                  
            while(gameover(nodoEvaluado.pos_Box,maze) || saved_State(nodoEvaluado,visited_States)){
                //console.log(colors.brightGreen('YAPERDISTE AAAAAAAAAAAAAAAAAAAAAAAAA'))
                            
                created.shift();
                visited_States.push(crearEstado(nodoEvaluado.pos,nodoEvaluado.pos_Box))  

                if(nodos.length == 0){
                    //console.log(colors.brightRed('No se encontraron respuestas ome gonorrea ome'))
                    break
                }

                nodoEvaluado = nodos[0]; 
                expandidos.push([nodoEvaluado.level,nodoEvaluado.pos,nodoEvaluado.action])
                nodos.shift();                              
            } 
            /*
            while(saved_State(nodoEvaluado)){
                console.log(colors.brightGreen('YAPERDISTE AAAAAAAAAAAAAAAAAAAAAAAAA'))
                nodoEvaluado = nodos[0];             
                created.shift();
                nodos.shift();                
            } 
            */           
            
            created.shift();
            agregarNodos(problem.maze,nodoEvaluado,nodos);

            if(nodos.length == 0){
                console.log(colors.brightRed('No se encontraron respuestas ome gonorrea ome'))
                break
            }

            visited_States.push(crearEstado(nodoEvaluado.pos,nodoEvaluado.pos_Box))                        
            
            nodoEvaluado = nodos[0];
            
            expandidos.push([nodoEvaluado.level,nodoEvaluado.pos,nodoEvaluado.action])

            nodos.shift();
            //created.shift();

            //console.log(colors.brightMagenta('Queue'))
            //console.log(created)
            if(nodoEvaluado.level>nivelActual){
                nivelActual++
                console.log(colors.brightMagenta('Nivel: '+nodoEvaluado.level))
            }
            

            
        }

        //console.log(expandidos);
        //console.log(colors.brightMagenta('creados'))
        //console.log(created)
        console.log(colors.brightCyan('VISITADOS'))
        //console.log(visited_States)
        trazarRuta(nodoEvaluado,solution)
        
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
        
        NOT_crearNodo (maze,padre,nodos,'U')
        NOT_crearNodo (maze,padre,nodos,'D')
        NOT_crearNodo (maze,padre,nodos,'L')
        NOT_crearNodo (maze,padre,nodos,'R')        

        return nodos;
    }

    function NOT_crearNodo (maze,padre,nodos,dir){
        
        if(avanzar(maze,padre,dir)){
            let fila = cambiarPos(padre,dir)[0];
            let colum = cambiarPos(padre,dir)[1];
            let niveles = padre.level + 1;
            let listaCajas = padre.pos_Box;
            let bool = true
            //console.log(colors.brightMagenta('mi padre es: ' +padre.pos + ' - ' + padre.pos_Box + ' - ' + padre.action))
             
            if(box_Address(padre.pos,listaCajas,1,dir)){  
                                 
                //console.log(colors.brightYellow('Encontre una caja '+dir+', estoy en: '+[padre.pos[0],padre.pos[1]+' mis cajas son: '+ listaCajas]));
                for(let i=0;i<listaCajas.length && bool;i++){
                    if(fila == listaCajas[i][0] && colum == listaCajas[i][1]){
                        //console.log(colors.brightGreen('La caja es: '+listaCajas[i]));
                        listaCajas = insertarArray(listaCajas,i,cambiarPosCaja(listaCajas,i,dir))
                        // NUNCA JAMAS HACER ESTO EN LA VIDA GRACIAS listaCajas[i] = cambiarPosCaja(listaCajas,i,dir)
                        bool = false
                        //console.log(colors.brightGreen('La nueva posición de caja es: '+listaCajas[i]));
                    }
                }
            }   
            if (!saved_State(crearNodo([fila,colum], listaCajas, niveles, padre, dir),visited_States)) {
                nodos.push(crearNodo([fila,colum], listaCajas, niveles, padre, dir))
                //nodos.push({})
                //console.log(colors.brightMagenta(dir +' ' +listaCajas))
                created.push(dir);
            }//else console.log('No se puede crear: '+dir+' -> estado ya visitado')
        }//else console.log('No se puede crear: '+dir)
    }

    function insertarArray (array,index,insertar){
        let finale = []
        for (let i = 0; i < array.length; i++) {
            if(i==index){
                finale.push(insertar)
            }else finale.push(array[i])
        }
        return finale
    }

    function avoidRepepatedState (node){
    
        switch (dir) {
            case 'U':                    
                return 'D';
            case 'D':                    
                return 'U';
            case 'L':
                return 'R';
            case 'R':
                return 'L';
        }
    }

    function cambiarPos(padre,dir){
        switch (dir) {
            case 'U':                    
                return [padre.pos[0]-1,padre.pos[1]];
            case 'D':                    
                return [padre.pos[0]+1,padre.pos[1]];
            case 'L':
                return [padre.pos[0],padre.pos[1]-1];
            case 'R':
                return [padre.pos[0],padre.pos[1]+1];
        }
    }

    function cambiarPosCaja(array,index,dir){
        switch (dir) {
            case 'U':                    
                return [array[index][0]-1,array[index][1]];
            case 'D':                    
                return [array[index][0]+1,array[index][1]];
            case 'L':
                return [array[index][0],array[index][1]-1];
            case 'R':
                return [array[index][0],array[index][1]+1];
        }
    }

    function crearNodo(postion,position_boxes,nivel,padre,dir) {
        let node = {
            pos: postion,
            pos_Box :position_boxes,
            level: nivel,
            parent: padre,
            action: dir
        };
        return node;
    };

    function crearEstado(pos,cajas) {
        let node = {
            pos_player : pos,
            pos_Box_E : cajas
        };
        return node;
    };

    function setCajas(cajas){
        return cajas;
    }

    /*
    function avanzar(maze,padre,dir){
        let caja_caja = false;
        let caja_pared = false;
        switch (dir) {
            case 'U':
                caja_caja = box_Address(padre.pos,padre.pos_Box,1,'U') && box_Address(padre.pos,padre.pos_Box,2,'U')
                caja_pared = box_Address(padre.pos,padre.pos_Box,1,'U') && !wall_Address(maze,padre.pos,2,'U')                

                return padre.pos[0] > 0 && !wall_Address(maze,padre.pos,1,'U') && !caja_caja && !caja_pared;// && !saved_State(padre,visited_States);// && !caja_lost;
            case 'D':           
                caja_caja =  box_Address(padre.pos,padre.pos_Box,1,'D') && box_Address(padre.pos,padre.pos_Box,2,'D')
                caja_pared = box_Address(padre.pos,padre.pos_Box,1,'D') && !wall_Address(maze,padre.pos,2,'D')
                               
                return padre.pos[0] < maze.length - 1 && !wall_Address(maze,padre.pos,1,'D') && !caja_caja && !caja_pared;// && !saved_State(padre,visited_States);// && !caja_lost;
            case 'L':              
                caja_caja =  box_Address(padre.pos,padre.pos_Box,1,'L') && box_Address(padre.pos,padre.pos_Box,2,'L')
                caja_pared = box_Address(padre.pos,padre.pos_Box,1,'L') && !wall_Address(maze,padre.pos,2,'L')

                return padre.pos[1] > 0 && !wall_Address(maze,padre.pos,1,'L') && !caja_caja && !caja_pared;// && !saved_State(padre,visited_States);// && !caja_lost;
            case 'R':               
                caja_caja =  box_Address(padre.pos,padre.pos_Box,1,'R') && box_Address(padre.pos,padre.pos_Box,2,'R')
                caja_pared = box_Address(padre.pos,padre.pos_Box,1,'R') && !wall_Address(maze,padre.pos,2,'R')

                return padre.pos[1] < maze[0].length && !wall_Address(maze,padre.pos,1,'R') && !caja_caja && !caja_pared;// && !saved_State(padre,visited_States);// && !caja_lost;
          }
    }

    if (!(padre.pos[0] < maze.length - 1)) {
                console.log(colors.brightRed('Fallo en limites: '+ padre.pos[0] < maze.length - 1))
            }
            if (wall_Address(maze,padre.pos,1,'D')) {
                console.log(colors.brightRed('Fallo en paredes: '+ !wall_Address(maze,padre.pos,1,'D')))
            }
            if (caja_caja) {
                console.log(colors.brightRed('Fallo en caja_caja: '+ !caja_caja))
            }
            if (caja_pared) {
                console.log(colors.brightRed('Fallo en caja_pared: '+ !caja_pared))
            }
    
    */
    
   function avanzar(maze,padre,dir){
    let caja_caja = false;
    let caja_pared = false;
    switch (dir) {
        case 'U':
            caja_caja = box_Address(padre.pos,padre.pos_Box,1,'U') && box_Address(padre.pos,padre.pos_Box,2,'U')
            caja_pared = box_Address(padre.pos,padre.pos_Box,1,'U') && wall_Address(maze,padre.pos,2,'U')                

            return padre.pos[0] > 0 && !wall_Address(maze,padre.pos,1,'U') && !caja_caja && !caja_pared;// && !saved_State(padre,visited_States);// && !caja_lost;
        case 'D':           
            caja_caja =  box_Address(padre.pos,padre.pos_Box,1,'D') && box_Address(padre.pos,padre.pos_Box,2,'D')
            caja_pared = box_Address(padre.pos,padre.pos_Box,1,'D') && wall_Address(maze,padre.pos,2,'D')            
                           
            return padre.pos[0] < maze.length - 1 && !wall_Address(maze,padre.pos,1,'D') && !caja_caja && !caja_pared;// && !saved_State(padre,visited_States);// && !caja_lost;
        case 'L':              
            caja_caja =  box_Address(padre.pos,padre.pos_Box,1,'L') && box_Address(padre.pos,padre.pos_Box,2,'L')
            caja_pared = box_Address(padre.pos,padre.pos_Box,1,'L') && wall_Address(maze,padre.pos,2,'L')

            return padre.pos[1] > 0 && !wall_Address(maze,padre.pos,1,'L') && !caja_caja && !caja_pared;// && !saved_State(padre,visited_States);// && !caja_lost;
        case 'R':               
            caja_caja =  box_Address(padre.pos,padre.pos_Box,1,'R') && box_Address(padre.pos,padre.pos_Box,2,'R')
            caja_pared = box_Address(padre.pos,padre.pos_Box,1,'R') && wall_Address(maze,padre.pos,2,'R')

            return padre.pos[1] < maze[0].length && !wall_Address(maze,padre.pos,1,'R') && !caja_caja && !caja_pared;// && !saved_State(padre,visited_States);// && !caja_lost;
      }
}

/**
     * Dada un arreglo de cajas y un maze, retorna si descarta (true) o no (false) el nodo
         * @param {Array} array
         * @param {Array} maze
     */
    function gameover(array,maze){
        let bool = true;
        let arrBool = [];
    
        for(let i=0;i<array.length;i++){
            arrBool.push(false);
        }
    
        for(let i=0;i<array.length;i++){
            if(busy(array[i],array,maze,'U') && busy(array[i],array,maze,'R')){
                //console.log('caja '+i+': arriba: '+busy(array[i],array,maze,'U'))
                //console.log('caja '+i+': derecha: '+busy(array[i],array,maze,'R'))
                arrBool[i] = true;
            }
    
            if(busy(array[i],array,maze,'R') && busy(array[i],array,maze,'D')){
                //console.log('caja '+i+': derecha: '+busy(array[i],array,maze,'R'))
                //console.log('caja '+i+': abajo: '+busy(array[i],array,maze,'D'))
                arrBool[i] = true;
            }
    
            if(busy(array[i],array,maze,'D') && busy(array[i],array,maze,'L')){
                //console.log('caja '+i+': abajo: '+busy(array[i],array,maze,'D'))
                //console.log('caja '+i+': izquierda: '+busy(array[i],array,maze,'L'))
                arrBool[i] = true;
            }
    
            if(busy(array[i],array,maze,'L') && busy(array[i],array,maze,'U')){
                //console.log('caja '+i+': izquierda: '+busy(array[i],array,maze,'L'))
                //console.log('caja '+i+': arriba: '+busy(array[i],array,maze,'U'))
                arrBool[i] = true;
            }
        }
        //console.log(arrBool)
        for(let i=0;i<array.length;i++){
            bool = bool && arrBool[i];
        }
    
        return bool;
    }

/**
     * Dada una posicion, un maze, unas cajas y una direccion, dice si esta (true) desocupado o no (false) en esa direccion
         * @param {Array} maze
         * @param {Object} padre
         * @param {Array} dist
         * @param {Array} dir
     */
    function busy(pos,array,maze,dir){
        switch (dir) {
            case 'U':                
                try {
                    return box_Address(pos,array,1,'U') || wall_Address(maze,pos,1,'U')
                } catch (error) {
                    return false
                }           
            case 'D':                
                try {
                    return box_Address(pos,array,1,'D') || wall_Address(maze,pos,1,'D')
                    
                } catch (error) {
                    return false
                }
    
            case 'L':                
                try {
                    //console.log('busy L 1: '+ box_Address(pos,array,1,'L'))
                    //console.log('busy L 2: '+ wall_Address(maze,pos,1,'L'))
                    return box_Address(pos,array,1,'L') || wall_Address(maze,pos,1,'L')
                } catch (error) {
                    return false
                }
    
            case 'R':                
                try {
                    return box_Address(pos,array,1,'R') || wall_Address(maze,pos,1,'R')
                } catch (error) {
                    return false
                }
        }
    
    }


    /**
     * Dada una posicion y un maze, retorna si hay una pared (true) o no (false) en una direccion dada
         * @param {Array} maze
         * @param {Object} padre
         * @param {Array} dist
         * @param {Array} dir
     */
function wall_Address(maze,pos,dist,dir){
    switch (dir) {
        case 'U':                
            try {
                return maze[pos[0]-dist][pos[1]]== 'W';
            } catch (error) {
                return false
            }          
        case 'D': 
            try {
                return maze[pos[0]+dist][pos[1]]== 'W';
            } catch (error) {
               return false
            }                           
        case 'L':                
            try {
                return maze[pos[0]][pos[1]-dist]== 'W';
            } catch (error) {
                return false
            }    
        case 'R':  
            try {
               return maze[pos[0]][pos[1]+dist]== 'W';
            } catch (error) {
               return false
            }      
      }
}

/**
     * Dada una posicion y un arreglo, retorna si hay una posicion del arreglo (true) o no (false) en una direccion dada
         * @param {Array} maze
         * @param {Object} padre
         * @param {Array} dist
         * @param {Array} dir
     */

function box_Address(pos,array,dist,dir){
    let bool = false;
    for(let i=0;i<array.length && !bool;i++){
        if(dir == 'U'){
            bool = pos[0]-dist==array[i][0] && pos[1]==array[i][1];
        }

        if(dir == 'D'){                
            bool = pos[0]+dist==array[i][0] && pos[1]==array[i][1];
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

/**
     * Dado un nodo y un arreglo de estados, retorna si el nodo se encuentra ya en el esado
         * @param {Array} maze
         * @param {Object} padre
         * @param {Array} dist
         * @param {Array} dir
     */

    function saved_State(status, arrayStatus){
        let bool = true;
        let arrBool = []
    
        if (arrayStatus.length == 0){                
            bool = false
            //console.log(bool)
            return bool;
        }
        for(let i = 0;i < arrayStatus.length;i++){
            if((status.pos[0] == arrayStatus[i].pos_player[0]) && (status.pos[1] == arrayStatus[i].pos_player[1])){
                //console.log('la pos coincide: '+status.pos + ' y '+ arrayStatus[i].pos_player)
    
                for (let j = 0; j < arrayStatus[i].pos_Box_E.length; j++) {
                        
                    if((status.pos_Box[j][0] == arrayStatus[i].pos_Box_E[j][0]) && (status.pos_Box[j][1] == arrayStatus[i].pos_Box_E[j][1])){
                        //console.log('la caja '+ j +' coincide: '+status.pos_Box[j] + ' y '+ arrayStatus[i].pos_Box_E[j])
                        arrBool.push(true);
                    }else arrBool.push(false);                    
                }
            }
        }
        
        //console.log(arrBool)
        if(arrBool.length > 0){
            for(let i=0;i<arrBool.length;i++){
                bool = bool && arrBool[i];
            }
        } else bool = false
        
        //console.log(colors.brightGreen('saved state'));
        //console.log(bool)
        return bool;
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



caja_lost = box_Address(padre.pos,padre.pos_Box,1,'U') && (busy(caja_arriba,padre.pos_Box,maze,'U') && (busy(caja_arriba,padre.pos_Box,maze,'R') || busy(caja_arriba,padre.pos_Box,maze,'L')));
                    if(caja_lost){
                        console.log(colors.brightGreen('U perdio'));
                    }
*/



//process.argv.forEach(function (val, index, array) {
//    console.log(index + ': ' + val);
//  });

//console.log('\nola estoy aqui para explicar');
//console.log(process.argv[2]);
const colors = require('colors');

let lab = 
    [
    ['W','W','W','W'],
    ['W', 0 , 0 ,'W'],
    ['W', 0 , 0 ,'W'],
    ['W', 0 , 0 ,'W'],
    ['W','W','W','W']];

let player = [1,1]
let boxes = [[1,2],[2,1]]

let root = {
    pos: player,
    pos_Box : boxes,
    level: 0,
    parent: null,
    action: null
};

let arrayStatus = []
let arrayStatusQ = [ {
                        pos_player : [0,1],
                        pos_Box_E : [[1,2] , [2,1]]
                    }, 
                    {
                        pos_player : [1,1],
                        pos_Box_E : [[1,2] , [2,1]]
                    },
                    {
                        pos_player : [7,1],
                        pos_Box_E : [[2,2]]
                    }]
/*
console.log('box_Adress: '+box_Address(player,boxes,1,'U'));
                    console.log(colors.brightGreen('Comparación de estados'))
console.log(colors.brightGreen('Comparación de estados'))
saved_State(root,arrayStatus)
gameover(boxes,lab);
console.log(colors.brightGreen('cajitas: '+moverCaja(0,boxes,'L')))
*/

let nodos = []

console.log(colors.brightCyan(nodos))
nodos.push(boxes)
console.log(colors.brightCyan(nodos))
let listaCajas = boxes
listaCajas = [[0,0],[1,2]]
//listaCajas[0] = [0,0]
nodos.push(listaCajas)
console.log(colors.brightCyan(nodos))
console.log(colors.brightGreen(insertarArray([1,2,5,4],9,3)))


function insertarArray (array,index,insertar){
    let finale = []
    for (let i = 0; i < array.length; i++) {
        if(i==index){
            finale.push(insertar)
        }else finale.push(array[i])
    }
    return finale
}

function moverCaja(index,cajas,dir){
    switch (dir) {
        case 'U':
                cajas[index][0] = cajas[index][0]-1;
                cajas[index][1] = cajas[index][1];
            return cajas;
        case 'D':
                cajas[index][0] = cajas[index][0]+1;
                cajas[index][1] = cajas[index][1];
            return cajas;
        case 'L':
                cajas[index][0] = cajas[index][0];
                cajas[index][1] = cajas[index][1]-1;
            return cajas;
        case 'R':
                cajas[index][0] = cajas[index][0];
                cajas[index][1] = cajas[index][1]+1;
            return cajas;
    }
}


//console.log(colors.brightMagenta(wall_Address(lab,boxes[0],1,'L')));

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


function saved_State(status, arrayStatus){
    let bool = true;
    let arrBool = []

    console.log(arrayStatus.length)
    if (arrayStatus.length == 0){                
        bool = false
        console.log(bool)
        return bool;
    }
    for(let i = 0;i < arrayStatus.length;i++){
        if((status.pos[0] == arrayStatus[i].pos_player[0]) && (status.pos[1] == arrayStatus[i].pos_player[1])){
            console.log('la pos coincide: '+status.pos + ' y '+ arrayStatus[i].pos_player)

            for (let j = 0; j < arrayStatus[i].pos_Box_E.length; j++) {
                    
                if((status.pos_Box[j][0] == arrayStatus[i].pos_Box_E[j][0]) && (status.pos_Box[j][1] == arrayStatus[i].pos_Box_E[j][1])){
                    console.log('la caja '+ j +' coincide: '+status.pos_Box[j] + ' y '+ arrayStatus[i].pos_Box_E[j])
                    arrBool.push(true);
                }else arrBool.push(false);                    
            }
        }
    }
    
    console.log(arrBool)
    if(arrBool.length > 0){
        for(let i=0;i<arrBool.length;i++){
            bool = bool && arrBool[i];
        }
    } else bool = false
    
    console.log(colors.brightGreen('funcion'));
    console.log(bool)
    return bool;
}


function dummie (dato){
    dato = 777
}
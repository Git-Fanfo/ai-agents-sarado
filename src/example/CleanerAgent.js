const Agent = require('../core/Agent');

/**
 * Simple reflex agent. Search for an object whithin a labyrinth. 
 * If the object is found the agen take it.
 */
class CleanerAgent extends Agent {
    constructor(value) {
        super(value);
        //LEFT, UP, RIGHT, DOWN, CELL
        /*
            this.table = {
            "0,0,0,0,0": "UP",
            "0,0,0,w,0": "UP",
            "0,0,w,0,0": "UP",
            "0,0,w,w,0": "UP",
            "0,w,0,0,0": "LEFT",
            "0,w,0,w,0": "RIGHT",
            "0,w,w,0,0": "LEFT",
            "0,w,w,w,0": "LEFT",
            "w,0,0,0,0": "UP",
            "w,0,0,w,0": "RIGHT",
            "w,0,w,0,0": "DOWN",
            "w,0,w,w,0": "UP",
            "w,w,0,0,0": "RIGHT",
            "w,w,0,w,0": "RIGHT",
            "w,w,w,0,0": "DOWN",
            "default": "TAKE"};
        */
       
       //Mundo inicial generado por el raton
        this.generatedWorld = [[0,0,0],[0,0,0],[0,0,0]];
        //Posicion en coordenadas cartesianas
        this.posBrain = [0,0];
        //Posicion en coordenadas de matriz
        this.posBrain0 = [1,1];
        //Percepciones anteriores
        this.previousPlace = [1,1,1,1];
        //Direccion anterior
        this.previousInstruction = "START";
    }

    /**
     * We override the send method. 
     * In this case, the state is just obtained as the join of the perceptions
     */
    send() {
        let viewKey = this.perception.join();     
        //Decirme la instruccion que sera ejecutada
        let newViewKey = direccion(viewKey,this.generatedWorld,this.posBrain0,this.posBrain);

        //Crea paredes cuando encuentra un camino sin salida
        if(howManyWalls(viewKey)==1 && howManyWalls(this.previousPlace)==2){            
            switch(this.previousInstruction){
                case "UP":
                    this.generatedWorld[this.posBrain0[1]+this.posBrain[1]+1][this.posBrain0[0]+this.posBrain[0]]="w";
                    break;
                
                case "DOWN":
                    this.generatedWorld[this.posBrain0[1]+this.posBrain[1]-1][this.posBrain0[0]+this.posBrain[0]]="w";
                    break;

                case "LEFT":
                    this.generatedWorld[this.posBrain0[1]+this.posBrain[1]][this.posBrain0[0]+this.posBrain[0]+1]="w";
                    break;

                case "RIGHT":
                    this.generatedWorld[this.posBrain0[1]+this.posBrain[1]][this.posBrain0[0]+this.posBrain[0]-1]="w";
                    break;

                default:
                    break
            }            
        }
        
        if (newViewKey == "UP") {
            //avanza hacia la posicion de arriba
            this.posBrain[1]--;
            //Si mi posicion se paso de los limites por arriba extienda el cerebro
            if(this.posBrain0[1]+this.posBrain[1]<1){                
                generarArriba(this.generatedWorld);
                this.posBrain0[1] = this.posBrain0[1] + 1;
            }
            //suma 1 en la posicion donde estaba
            this.generatedWorld[this.posBrain0[1]+this.posBrain[1]+1][this.posBrain0[0]+this.posBrain[0]]++;                   
        }
        
        if (newViewKey == "DOWN") {
            //avanza hacia la posicion de abajo
            this.posBrain[1] = this.posBrain[1] + 1;
            //Si mi posicion se paso de los limites por abajo extienda el cerebro
            if(this.posBrain0[1]+this.posBrain[1]+1>this.generatedWorld.length-1)
            generarAbajo(this.generatedWorld);         
            //suma 1 en la posicion donde estaba
            this.generatedWorld[this.posBrain0[1]+this.posBrain[1]-1][this.posBrain0[0]+this.posBrain[0]]++;   
        }

        if (newViewKey == "LEFT") {                    
            //avanza hacia la posicion de la izquierda
            this.posBrain[0]--;
            //Si mi posicion se paso de los limites a la izquierda extienda el cerebro
            if(this.posBrain0[0]+this.posBrain[0]<1){
                generarIzquierda(this.generatedWorld);
                this.posBrain0[0] = this.posBrain0[0] + 1;
            }          
            //suma 1 en la posicion donde estaba
            this.generatedWorld[this.posBrain0[1]+this.posBrain[1]][this.posBrain0[0]+this.posBrain[0]+1]++;
        }
        if (newViewKey == "RIGHT") {
            //avanza hacia la posicion de la derecha
            this.posBrain[0] = this.posBrain[0] + 1;
            //Si mi posicion se paso de los limites por la derecha extienda el cerebro
            if(this.posBrain0[0]+this.posBrain[0]+1>this.generatedWorld[0].length-1)
            generarDerecha(this.generatedWorld);
            //suma 1 en la posicion donde estaba
            this.generatedWorld[this.posBrain0[1]+this.posBrain[1]][this.posBrain0[0]+this.posBrain[0]-1]++;
        }        
        
        console.log("Generated World:");
        for(var i=0;i<this.generatedWorld.length;i++){
            console.log(JSON.stringify(this.generatedWorld[i]));
        }
        
                console.log("Direccion final: "+direccion(viewKey,this.generatedWorld,this.posBrain0,this.posBrain));               
        
        /*
            if (this.table[viewKey]) {
            return this.table[viewKey];
        } else {
            return this.table["default"];
        }
        */        
        
        //Esto guarda el lugar previo donde estuvo
        this.previousPlace = viewKey;
        //Esto guarda la direccion previa donde estuvo
        this.previousInstruction = newViewKey;

        return newViewKey;
    }
}

module.exports = CleanerAgent;

/**
     * Extiende una matriz dada, hacia la izquierda en todas sus filas. Anade una columna a la izquirda
     * @param {} mundoRecorrido
     */
    function generarIzquierda(mundoRecorrido = []) {

        //funcion para poner un 0 antes del array: ex array.unshift(x)->[x,0,0]
        let longitudInicial = mundoRecorrido.length;
        for(var i=0;i < longitudInicial;i++){
            mundoRecorrido[i].unshift(0);
        }
    }
    
    /**
         * Extiende una matriz dada, hacia la derecha en todas sus filas. Anade una columna a la izquierda
         * @param {} mundoRecorrido
         */
    function generarDerecha(mundoRecorrido = []) {
    
        //funcion para poner un 0 despues del array: ex array.push(x)->[0,0,x]
        let longitudInicial = mundoRecorrido.length;
        for(var i=0;i < longitudInicial;i++){
            mundoRecorrido[i].push(0);
        }
    }
    
    /**
         * Extiende una matriz dada hacia la arriba en todas sus columnas. Anade una fila arriba
         * @param {} mundoRecorrido
         */
    function generarArriba(mundoRecorrido = []) {
    
        let fila = [];
    
        let longitudInicial = mundoRecorrido[0].length;
        for(var i=0;i < longitudInicial;i++){
            fila.push(0);
        }    
        mundoRecorrido.unshift(fila);
    }
    
    /**
         * Extiende una matriz dada hacia la abajo en todas sus columnas. Anade una fila abajo
         * @param {} mundoRecorrido
         */
    function generarAbajo(mundoRecorrido = []) {
    
        let fila = [];
    
        let longitudInicial = mundoRecorrido[0].length;
        for(var i=0;i < longitudInicial;i++){
            fila.push(0);
        }
        mundoRecorrido.push(fila);
    }
    

    /**
     * Dar la direccion final dependiendo de si puede avanzar y si la matriz que tiene guardada da un valor menor
     * es mas probable que vaya por ahi 
     * 
     * */
    function direccion(viewKey = [],mundoRecorrido = [],pos0 = [], pos = []){
        izquierda = viewKey[0];
        arriba = viewKey[2];
        derecha = viewKey[4];
        abajo = viewKey[6];
        goal = viewKey[8];
        
        if(goal!=0)
        return "TAKE";
        
        matIzq = mundoRecorrido[pos0[1]+pos[1]][pos0[0]+pos[0]-1];
        matArr = mundoRecorrido[pos0[1]+pos[1]-1][pos0[0]+pos[0]];
        matDer = mundoRecorrido[pos0[1]+pos[1]][pos0[0]+pos[0]+1];
        matAba = mundoRecorrido[pos0[1]+pos[1]+1][pos0[0]+pos[0]];

        goLeft = 0;
        goUp = 0;
        goRight = 0;
        goDown = 0;

        if(izquierda == "w" || matIzq == "w")
            matIzq = null;

        if(arriba == "w" || matArr == "w")
            matArr = null;

        if(derecha == "w" || matDer == "w")
            matDer = null;

        if(abajo == "w" || matAba == "w")
            matAba = null;

        //hago un array para que sea mas comodo
        arrayMat = [matIzq,matArr,matDer,matAba];
        console.log("matriz: "+arrayMat);
        //a cada uno le resto el mayor excepto los null
        for(var i = 0; i < 4;i++){
            if(arrayMat[i] != null)
            arrayMat[i] = Math.abs(arrayMat[i]-Math.max(matIzq,matArr,matDer,matAba));
            //console.log("bucle: "+arrayMat[i]);
        }
        //Saco la suma total de todas las posibilidades
        total = arrayMat[0] + arrayMat[1] + arrayMat[2] + arrayMat[3];
        
        //Sumo la suma a los mayores para dar mas probabilidad
        for(var i = 0; i < 4;i++){
            if(arrayMat[i] == Math.max(matIzq,matArr,matDer,matAba))
            arrayMat[i] = arrayMat[i]+total;
            //console.log("bucle2: "+arrayMat[i]);
        }     

        //Saco la suma total de todas las posibilidades sumadas
        total = arrayMat[0] + arrayMat[1] + arrayMat[2] + arrayMat[3];

        if(total!=0)
            {goLeft = arrayMat[0] / total;
            goUp = arrayMat[1] / total;
            goRight = arrayMat[2] / total;
            goDown = arrayMat[3] / total;
        }else{
            for(var i = 0; i < 4;i++){
                if(arrayMat[i] != null)
                arrayMat[i] = 1;
                //console.log("bucle: "+arrayMat[i]);
                }
                total = arrayMat[0] + arrayMat[1] + arrayMat[2] + arrayMat[3];
                goLeft = arrayMat[0] / total;
                goUp = arrayMat[1] / total;
                goRight = arrayMat[2] / total;
                goDown = arrayMat[3] / total;
            }        

        probabilidad = Math.random();

        switch(true){
            case (probabilidad <= goLeft)://menos que goLeft
            if(goLeft!=0)
                return "LEFT";
            break;

            case (probabilidad <= goLeft+goUp)://entre goLeft y goUp
            if(goUp!=0)
                return "UP";
            break;

            case (probabilidad <= goLeft+goUp+goRight)://entre goUp y goRight
            if(goRight!=0)
                return "RIGHT";
            break;

            case (probabilidad <= goLeft+goUp+goRight+goDown)://entre goRight y goDown
            if(goDown!=0)
                return "DOWN";
            break;
        }
                
    }

    function howManyWalls(estado = []){
        var count = 0;
        for(var i = 0; i < estado.length; ++i){
            if(estado[i] == "w")
                count++;
            }
        return count;
        
    }


const Agent = require('../core/Agent');

/**
 * Simple reflex agent. Search for an object whithin a labyrinth. 
 * If the object is found the agen take it.
 */
class CleanerAgent extends Agent {
    constructor(value) {
        super(value);

        this.costs = {
            "R": 1,
            "L": 1,
            "A": 3
        }

        this.table = {
            "1,1,1": "A",
            "0,1,0": "A",
            "1,1,0": "L",
            "0,0,0": "R"
        };

    }


    /**
     * We override the send method. 
     * In this case, the state is just obtained as the join of the perceptions
     */
    send() {
        //console.log("Tabla: " + JSON.stringify(this.perception.join(",")))
        return this.table[this.perception.join(",")];
    }
   
}

module.exports = CleanerAgent;
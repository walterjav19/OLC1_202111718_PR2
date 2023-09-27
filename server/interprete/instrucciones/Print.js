const Instruccion = require('../Instruccion');

class Print extends Instruccion {
    constructor(expresion) {
        super();
        this.expresion = expresion;
    }

    ejecutar() {
        let expresion=this.expresion.ejecutar();
        return  expresion.valor
    }
}

module.exports = Print;
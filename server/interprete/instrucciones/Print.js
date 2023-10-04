const Instruccion = require('../Instruccion');

class Print extends Instruccion {
    constructor(expresion) {
        super();
        this.expresion = expresion;
    }

    ejecutar(entorno) {
        let expresion=this.expresion.ejecutar(entorno);
        console.log(expresion.valor);
        return  expresion.valor
    }
}

module.exports = Print;
const Instruccion = require('../Instruccion');
const ConsolaSalida=require('../Estructuras/ConsoleOut')

class Print extends Instruccion {
    constructor(expresion) {
        super();
        this.expresion = expresion;
    }

    ejecutar(entorno) {
        let expresion=this.expresion.ejecutar(entorno);
        ConsolaSalida.push(expresion.valor);
        console.log(expresion.valor); 
    }
}

module.exports = Print;
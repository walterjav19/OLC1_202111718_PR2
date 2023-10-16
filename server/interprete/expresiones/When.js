const Instruccion = require('../Instruccion');

class When extends Instruccion{
    constructor(expresion1,expresion2){
        super();
        this.expresion1 = expresion1;
        this.expresion2 = expresion2;
    }
    ejecutar(entorno){
        let valor1 = this.expresion1.ejecutar(entorno);
        let valor2 = this.expresion2.ejecutar(entorno);
        this.expresion1=valor1;
        this.expresion2=valor2;
        return this;
    }
}
module.exports = When;
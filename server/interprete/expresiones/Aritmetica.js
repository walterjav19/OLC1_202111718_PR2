const Instruccion = require("../Instruccion");

class Aritmetica extends Instruccion {
    constructor(izquierda, operador, derecha) {
        super();
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.operador = operador;
        this.valor = null;
    }

    ejecutar() {
        let izquierda=this.izquierda.ejecutar();
        let derecha=this.derecha.ejecutar();
        if(this.operador=="+"){
            this.valor= Number(izquierda.valor)+Number(derecha.valor);
            return this
        }
    }
}

module.exports = Aritmetica;
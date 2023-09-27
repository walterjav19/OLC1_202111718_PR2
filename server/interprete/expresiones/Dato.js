const Instruccion = require("../Instruccion");

class Dato extends Instruccion {
    constructor(valor, tipo) {
        super();
        this.valor = valor;
        this.tipo = tipo;
    }

    ejecutar() {
        return this
    }
}
module.exports = Dato;
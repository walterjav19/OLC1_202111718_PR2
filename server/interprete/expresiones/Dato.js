const Instruccion = require("../Instruccion");

class Dato extends Instruccion {
    constructor(valor, tipo) {
        super();
        this.valor = valor;
        this.tipo = tipo;
    }

    ejecutar() {
        if(this.tipo == "STRING"){
            this.valor = this.valor.slice(1);
            this.valor = this.valor.slice(0, -1);
        if(this.valor.includes("\\n")){
            this.valor = this.valor.replaceAll("\\n", "\n");
        }else if(this.valor.includes("\\\\")){
            this.valor = this.valor.replaceAll("\\\\", "\\");
        }else if(this.valor.includes("\\\"")){
            this.valor = this.valor.replaceAll("\\\"", "\"");
        }else if(this.valor.includes("\\t")){
            this.valor = this.valor.replaceAll("\\t", "\t");
        }else if(this.valor.includes("\\\'")){
            this.valor = this.valor.replaceAll("\\\'", "\'");
        }
    }
        return this
    }
}
module.exports = Dato;
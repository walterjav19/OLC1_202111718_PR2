const Instruccion=require('../Instruccion');

class Lower extends Instruccion{
    constructor(expresion){
        super();
        this.expresion=expresion;
    }

    ejecutar(entorno){
        let expresion=this.expresion.ejecutar(entorno);
        return expresion.valor.toLowerCase();
    }
}

module.exports=Lower;
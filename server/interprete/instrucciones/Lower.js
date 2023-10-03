const Instruccion=require('../Instruccion');

class Lower extends Instruccion{
    constructor(expresion){
        super();
        this.expresion=expresion;
    }

    ejecutar(){
        let expresion=this.expresion.ejecutar();
        return expresion.valor.toLowerCase();
    }
}

module.exports=Lower;
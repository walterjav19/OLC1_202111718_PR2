const Instruccion = require("../Instruccion")

class Access extends Instruccion{
    constructor(id,linea,columna){
        super();
        this.id=id;
        this.linea=linea;
        this.columna=columna;
    }
    
    ejecutar(entorno){
        let simbolo=entorno.obtenerSimbolo(this.id);
        return simbolo;
    }
}

module.exports=Access;
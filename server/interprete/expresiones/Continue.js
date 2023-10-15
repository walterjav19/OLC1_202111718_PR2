const Instruccion=require('../Instruccion')

class Continue extends Instruccion{
    constructor(linea,columna) {
        super();
        this.linea=linea;
        this.columna=columna;
    }

    ejecutar(entorno){
        if(entorno.nombre=="IF"  || entorno.nombre=="FOR" || entorno.nombre=="WHILE" || entorno.nombre=="ELSE"){
            return 'CONTINUE';
        }
    }
}

module.exports=Continue;
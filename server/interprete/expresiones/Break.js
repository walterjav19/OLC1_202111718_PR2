const Instruccion=require('../Instruccion')
class Break extends Instruccion{
    constructor(nombre,linea,columna) {
        super();
        this.linea=linea;
        this.columna=columna;
        this.nombre=nombre;
    }
    ejecutar(entorno){
        if(entorno.nombre=="IF"  || entorno.nombre=="FOR" || entorno.nombre=="WHILE" || entorno.nombre=="ELSE"){
            return 'BREAK';
        }
    }
}

module.exports = Break;
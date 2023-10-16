const Instruccion=require('../Instruccion');

class Function extends Instruccion{
    constructor(id, parametros,tipo,instrucciones,devolver){
        super();
        this.id=id;
        this.parametros=parametros;
        this.tipo=tipo;
        this.instrucciones=instrucciones;
        this.devolver=devolver;
    }

    ejecutar(entorno){
        console.log(this.tipo)
    }
}
module.exports=Function;
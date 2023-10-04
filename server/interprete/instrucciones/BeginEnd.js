const Instruccion=require('../Instruccion');

class BeginEnd extends Instruccion{
    constructor(instrucciones){
        super();
        this.instrucciones=instrucciones;
    }

    ejecutar(entorno){
        this.instrucciones.forEach(instruccion => {
            instruccion.ejecutar();
        });
    }

}

module.exports=BeginEnd;
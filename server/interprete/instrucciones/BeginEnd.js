const Instruccion=require('../Instruccion');

class BeginEnd extends Instruccion{
    constructor(instrucciones){
        super();
        this.instrucciones=instrucciones;
    }

    ejecutar(){
        this.instrucciones.forEach(instruccion => {
            instruccion.ejecutar();
        });
    }

}

module.exports=BeginEnd;
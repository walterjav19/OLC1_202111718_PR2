const Instruccion=require('../Instruccion');
const Entorno=require('../Simbolos/Entorno');
class BeginEnd extends Instruccion{
    constructor(instrucciones){
        super();
        this.instrucciones=instrucciones;
    }

    ejecutar(entorno){
        let nuevoEntorno=new Entorno("begin",entorno);
        this.instrucciones.forEach(instruccion => {
            instruccion.ejecutar(nuevoEntorno);
        });
    }

}

module.exports=BeginEnd;
const Instruccion=require('../Instruccion')

class ListDeclaration extends Instruccion{
    constructor(Declaraciones){
        super();
        this.Declaraciones=Declaraciones;
    }

    ejecutar(entorno){
        this.Declaraciones.forEach(declaracion => {
            declaracion.ejecutar(entorno);
        });
    }

}

module.exports=ListDeclaration;
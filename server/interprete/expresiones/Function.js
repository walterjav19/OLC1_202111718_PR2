const Instruccion=require('../Instruccion');
const Entorno=require('../Simbolos/Entorno');
class Function extends Instruccion{
    constructor(id, parametros,tipo,instrucciones,devolver){
        super();
        this.id=id;
        this.parametros=parametros;
        this.tipo=tipo;
        this.instrucciones=instrucciones;
        this.devolver=devolver;
        this.entorno=null;
    }

  

    ejecutar(entorno){
        let nuevoEntorno=new Entorno('FUNCION',entorno);
        this.parametros.ejecutar(nuevoEntorno)
        this.entorno=nuevoEntorno;
        entorno.AgregarFuncion(this.id,this);
    }
}
module.exports=Function;
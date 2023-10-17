const  Instruccion=require('../Instruccion');
const Entorno=require('../Simbolos/Entorno');

class Procedure extends Instruccion{
    constructor(id,listaParametros,listaInstrucciones,linea,columna){
        super();
        this.id=id;
        this.listaParametros=listaParametros;
        this.listaInstrucciones=listaInstrucciones;
        this.entorno=null;
        this.linea=linea;
        this.columna=columna;
    }

    ejecutar(entorno){
        let nuevoEntorno=new Entorno('PROCEDURE',entorno);
        if(this.listaParametros){
            this.listaParametros.ejecutar(nuevoEntorno)
        }
        this.entorno=nuevoEntorno;
        entorno.AgregarProcedimiento(this.id,this);
    }
}
module.exports=Procedure;
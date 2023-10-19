const Instruccion = require("../Instruccion")
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class Access extends Instruccion{
    constructor(id,linea,columna){
        super();
        this.id=id;
        this.linea=linea;
        this.columna=columna;
    }
    
    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"VARIABLE",
            id:getGlobConta(),
            valor:this.id,
            texto:function(){
                aumentarGlobal();
                let hijo=`${getGlobConta()}[label="${this.valor}"]\n ${this.id}->${getGlobConta()}\n`
                return `${this.id}[label="${this.label}"]\n${hijo}`
            }
                      
        }
        return nodo;
    }
    
    obtenerTexto(){
        return this.id;
    }

    ejecutar(entorno){
        let simbolo=entorno.obtenerSimbolo(this.id);
        return simbolo;
    }
}

module.exports=Access;
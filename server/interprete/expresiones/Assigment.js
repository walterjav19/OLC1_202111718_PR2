const Instruccion=require('../Instruccion');
const ConsolaSalida=require('../Estructuras/ConsoleOut')

class Assigment extends Instruccion{
    constructor(id,value){
        super();
        this.id=id;
        this.value=value;
    }

    ejecutar(entorno){
        let valor=this.value.ejecutar(entorno);
        let update=entorno.actualizarSimbolo(this.id,valor);
        if(!update){
            ConsolaSalida.push("Error: Semantico "+this.id+" no declarada")
        }
    }
}

module.exports=Assigment;
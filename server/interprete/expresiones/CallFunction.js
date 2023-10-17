const Instruccion=require('../Instruccion');
const Dato = require("./Dato");
const ConsolaSalida= require("../Estructuras/ConsoleOut");
const Entorno=require('../Simbolos/Entorno');

class CallFunction extends Instruccion{
    constructor(id,argumentos){
        super()
        this.id=id;
        this.argumentos=argumentos;
    }

    obtenerTexto(){
        let args="";
        let i=0;
        this.argumentos.forEach(element => {
            if (i != this.argumentos.length - 1) {
                args += element.obtenerTexto() + (element.tipo ? ` ${element.tipo},` : ',');
            } else {
                args += element.obtenerTexto() + (element.tipo ? ` ${element.tipo}` : '');
            }
            i++;
        });
        return "CALL "+this.id+`(${args})`
    }

    ejecutar(entorno){
        let func=entorno.obtenerFuncion(this.id);
       

        
        if(func){
            

            let i=0;
            func.parametros.Declaraciones.forEach(element => {
                if(this.argumentos[i]!==undefined){
                    element.valor=this.argumentos[i].ejecutar(entorno);
                }
                
                i++;
            });

            func.parametros.ejecutar(func.entorno)


            if (func.instrucciones){
                func.instrucciones.forEach(element => {
                    element.ejecutar(func.entorno);
                });
            }
            
            
            

            return func.devolver.ejecutar(func.entorno)
            
        }else{
            ConsolaSalida.push("Error Semantico No se encontro la funcion "+this.id)
        }
        
        
        
        
    }
}

module.exports=CallFunction;
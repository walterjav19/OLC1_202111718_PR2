const Instruccion=require('../Instruccion');
const ConsolaSalida= require("../Estructuras/ConsoleOut");

class CallProcedure extends Instruccion{
    constructor(id,argumentos){
        super();
        this.id=id;
        this.argumentos=argumentos;
    }
    ejecutar(entorno){
        let proc=entorno.obtenerProcedimiento(this.id);
        if(proc){
            let i=0;
            proc.listaParametros.Declaraciones.forEach(element => {
                if(this.argumentos[i]!==undefined){
                    element.valor=this.argumentos[i].ejecutar(entorno);
                }
                
                i++;
            });

            
            proc.listaParametros.ejecutar(proc.entorno);
            proc.listaInstrucciones.forEach(element => {
                element.ejecutar(proc.entorno);
            });
        
        }else{
            ConsolaSalida.push("Error Semantico No se encontro el procedimiento "+this.id)
        }
    }
}
module.exports=CallProcedure;
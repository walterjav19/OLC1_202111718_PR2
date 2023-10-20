const Instruccion=require('../Instruccion');
const ConsolaSalida= require("../Estructuras/ConsoleOut");
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class CallProcedure extends Instruccion{
    constructor(id,argumentos){
        super();
        this.id=id;
        this.argumentos=argumentos;
    }

    GenerarAST(){
        let aux=this.id;
        aumentarGlobal();
        let nodo={
            label:"CALL",
            id:getGlobConta(),
            argumentos:this.argumentos,
            nombre:aux,
            texto:function(){
                aumentarGlobal();
                let call=`${getGlobConta()}[label="CALL"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let nombre=`${getGlobConta()}[label="${this.nombre}"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let parizq=`${getGlobConta()}[label="("]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let parder=`${getGlobConta()}[label=")"]\n${this.id}->${getGlobConta()}\n`
                let i=0;
                let lista=""
                this.argumentos.forEach(element => {
                    if(i!=this.argumentos.length-1){
                        let nodo=element.GenerarAST();
                        lista+=nodo.texto()+`${this.id}->${nodo.id}\n`;
                        aumentarGlobal();
                        lista+=`${getGlobConta()}[label=","]\n${this.id}->${getGlobConta()}\n`
                    }else{
                        let nodo=element.GenerarAST();
                        lista+=nodo.texto()+`${this.id}->${nodo.id}\n`; 
                    }
                    i++;
                });


                return `${this.id}[label="${this.label}"]\n${call}\n${nombre}\n${parizq}\n${lista}\n${parder}`
            }
        }
        return nodo;
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
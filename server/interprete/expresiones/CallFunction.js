const Instruccion=require('../Instruccion');
const Dato = require("./Dato");
const ConsolaSalida= require("../Estructuras/ConsoleOut");
const Entorno=require('../Simbolos/Entorno');
const { aumentarGlobal, getGlobConta } = require('../Estructuras/Contador');

class CallFunction extends Instruccion{
    constructor(id,argumentos){
        super()
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
                let nombre=`${getGlobConta()}[label="${this.nombre}"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let parizq=`${getGlobConta()}[label="("]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let parder=`${getGlobConta()}[label=")"]\n${this.id}->${getGlobConta()}\n`
                let i=0;
                let lista=""
                if(this.argumentos){
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
                }   

                return `${this.id}[label="${this.label}"]\n${nombre}\n${parizq}\n${lista}\n${parder}`
            }
        }
        return nodo;
    }

    obtenerTexto(){
        let args="";
        let i=0;
        if(this.argumentos){
        this.argumentos.forEach(element => {
            if (i != this.argumentos.length - 1) {
                args += element.obtenerTexto() + (element.tipo ? ` ${element.tipo},` : ',');
            } else {
                args += element.obtenerTexto() + (element.tipo ? ` ${element.tipo}` : '');
            }
            i++;
        });
        }
        return this.id+`(${args})`
    }

    ejecutar(entorno){
        let func=entorno.obtenerFuncion(this.id);
       

        
        if(func){
            

            let i=0;
            if(func.parametros){
            func.parametros.Declaraciones.forEach(element => {
                if(this.argumentos[i]!==undefined){
                    element.valor=this.argumentos[i].ejecutar(entorno);
                }
                
                i++;
            });

            func.parametros.ejecutar(func.entorno)
        }

            if (func.instrucciones){
                func.instrucciones.forEach(element => {
                    element.ejecutar(func.entorno);
                });
            }
            
            //console.log(func.devolver.ejecutar(func.entorno))
            

            return func.devolver.ejecutar(func.entorno)
            
        }else{
            ConsolaSalida.push("Error Semantico No se encontro la funcion "+this.id)
        }
        
        
        
        
    }
}

module.exports=CallFunction;
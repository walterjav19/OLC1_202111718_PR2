const Instruccion = require('../Instruccion');
const ConsolaSalida=require('../Estructuras/ConsoleOut')
const Entorno=require('../Simbolos/Entorno');

class While extends Instruccion {
    constructor(condicion, instrucciones) {
        super();
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }

    ejecutar(entorno) {
        let expresion = this.condicion.ejecutar(entorno);
        if(expresion.tipo=='BOOLEAN'){
            let nuevoEntorno = new Entorno('WHILE', entorno);
            let breakFlag="";
            
            while(expresion.valor){
                for(let i=0;i<this.instrucciones.length;i++){
                    let ins = this.instrucciones[i].ejecutar(nuevoEntorno);
                    breakFlag=ins;
                    if(breakFlag=='BREAK'){
                        break;
                    }
                    if(breakFlag=='CONTINUE'){
                        break;
                    }
                }
                
                if(breakFlag=='BREAK'){
                    break;
                }
                
                if(breakFlag=='CONTINUE'){
                    continue;
                }
               
                
                expresion = this.condicion.ejecutar(entorno);
            }
        }else{
            ConsolaSalida.push(`Error Semantico, la condicion del while no es booleana linea: ${this.condicion.linea} columna: ${this.condicion.columna}`)
        }
    }
}

module.exports = While;
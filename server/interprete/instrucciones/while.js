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
        console.log(this.instrucciones)
        if(expresion.tipo=='BOOLEAN'){
            let nuevoEntorno = new Entorno('WHILE', entorno);
            while(expresion.valor){
                this.instrucciones.forEach(instruccion => {
                    instruccion.ejecutar(nuevoEntorno);
                });
                expresion = this.condicion.ejecutar(entorno);
            }
            console.log(this.instrucciones)
            
        }else{
            ConsolaSalida.push(`Error Semantico, la condicion del while no es booleana linea: ${this.condicion.linea} columna: ${this.condicion.columna}`)
        }
    }
}

module.exports = While;
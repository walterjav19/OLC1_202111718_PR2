const Instruccion=require('../Instruccion');
const Entorno=require('../Simbolos/Entorno');
const ConsolaSalida=require('../Estructuras/ConsoleOut')
class If extends Instruccion{
    constructor(expresion,Instrucciones){
        super();
        this.expresion=expresion;
        this.Instrucciones=Instrucciones;
    }

    ejecutar(entorno){
        let expresion=this.expresion.ejecutar(entorno);
        if(expresion.tipo=='BOOLEAN'){
            if(expresion.valor){
                let nuevoEntorno=new Entorno('IF',entorno);
                this.Instrucciones.forEach(instruccion => {
                    instruccion.ejecutar(nuevoEntorno);
                });
            }
                
        }else{
            ConsolaSalida.push(`Error Semantico, la expresion no es booleana en la linea ${this.expresion.linea} y columna ${this.expresion.columna}`);
        }

    }
}

module.exports=If;
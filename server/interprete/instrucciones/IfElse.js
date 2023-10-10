const Instruccion=require('../Instruccion');
const Entorno=require('../Simbolos/Entorno');
const ConsolaSalida=require('../Estructuras/ConsoleOut')

class IfElse extends Instruccion{
    constructor(expresion,listaIf,listaElse){
        super();
        this.expresion=expresion;
        this.listaIf=listaIf;
        this.listaElse=listaElse;
    }

    ejecutar(entorno){
        let expresion=this.expresion.ejecutar(entorno);

        if(expresion.tipo=='BOOLEAN'){
            if(expresion.valor){
                let nuevoEntorno=new Entorno('IF',entorno);
                this.listaIf.forEach(instruccion => {
                    instruccion.ejecutar(nuevoEntorno);
                });
            }else{
                let nuevoEntorno=new Entorno('ELSE',entorno);
                this.listaElse.forEach(instruccion => {
                    instruccion.ejecutar(nuevoEntorno);
                });
            }
        }else{
            ConsolaSalida.push(`Error Semantico, la expresion no es booleana en la linea ${this.expresion.linea} y columna ${this.expresion.columna}`);
        }
    }
}

module.exports=IfElse;
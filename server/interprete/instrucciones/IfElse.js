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
                let breakFlag="";
                for(let i=0;i<this.listaIf.length;i++){
                    let ins=this.listaIf[i].ejecutar(nuevoEntorno);
                    breakFlag=ins;
                    if(breakFlag=='BREAK'){
                        break;
                    }
                    if(breakFlag=='CONTINUE'){
                        break;
                    }
                }
                if(breakFlag=='BREAK'){
                    return 'BREAK';
                }
                if(breakFlag=='CONTINUE'){
                    return 'CONTINUE';
                }

            }else{
                let nuevoEntorno=new Entorno('ELSE',entorno);
                let breakFlag="";
                for(let i=0;i<this.listaElse.length;i++){
                    let ins=this.listaElse[i].ejecutar(nuevoEntorno);
                    breakFlag=ins;
                    if(breakFlag=='BREAK'){
                        break;
                    }
                    if(breakFlag=='CONTINUE'){
                        break;
                    }
                }
                if(breakFlag=='BREAK'){
                    return 'BREAK';
                }
                
                if(breakFlag=='CONTINUE'){
                    return 'CONTINUE';
                }
            }
        }else{
            ConsolaSalida.push(`Error Semantico, la expresion no es booleana en la linea ${this.expresion.linea} y columna ${this.expresion.columna}`);
        }
    }
}

module.exports=IfElse;
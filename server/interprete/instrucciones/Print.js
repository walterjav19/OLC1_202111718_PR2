const Instruccion = require('../Instruccion');
const ConsolaSalida=require('../Estructuras/ConsoleOut')
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class Print extends Instruccion {
    constructor(expresion) {
        super();
        this.expresion = expresion;
    }
    
    GenerarAST(){
        
        aumentarGlobal();
        let nodo={
            label:"PRINT",
            id:getGlobConta(),
            expr:this.expresion,
            texto:function(){
                aumentarGlobal();
                let p1=`${getGlobConta()}[label="${this.label}"]\n ${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let p2=`${getGlobConta()}[label=";"]\n ${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let x=`${getGlobConta()}[label="EXPRESION"]\n ${this.id}->${getGlobConta()}\n`
                let ant=getGlobConta()
                let hijo=this.expr.GenerarAST()
                let apunt=`${ant}->${hijo.id}\n`
                return `${this.id}[label="instrucciones"]\n${p1}\n${x}\n${p2}\n${hijo.texto()}\n${apunt}`
            }
                      
        }
        return nodo;
        
    }

    ejecutar(entorno) {
        let expresion=this.expresion.ejecutar(entorno);
        ConsolaSalida.push(expresion.valor); 
    }
}

module.exports = Print;
const Instruccion=require('../Instruccion');
const Dato=require('../expresiones/Dato');
const ConsolaSalida=require('../Estructuras/ConsoleOut')
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class Len extends Instruccion{
    constructor(expresion){
        super();
        this.expresion=expresion;
    }

    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"LEN",
            id:getGlobConta(),
            expr:this.expresion,
            texto:function(){
                aumentarGlobal();
                let p1=`${getGlobConta()}[label="${this.label}"]\n ${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let parizq=`${getGlobConta()}[label="("]\n ${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let parder=`${getGlobConta()}[label=")"]\n ${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let x=`${getGlobConta()}[label="EXPRESION"]\n ${this.id}->${getGlobConta()}\n`
                let ant=getGlobConta()
                let hijo=this.expr.GenerarAST()
                let apunt=`${ant}->${hijo.id}\n`
                return `${this.id}[label="NATIVAS"]\n${p1}\n${parizq}\n${x}\n${parder}\n${hijo.texto()}\n${apunt}`
            }        
        }

        return nodo;
    }


    obtenerTexto(){
        return `LEN(${this.expresion.obtenerTexto()})`;
    }

    ejecutar(entorno){
        let expresion=this.expresion.ejecutar(entorno);
        if(expresion.tipo=="VARCHAR"){
            let len=expresion.valor.length;
            return new Dato(len,"INT",expresion.linea,expresion.columna)
        }else{
            ConsolaSalida.push(`Error Semantico Linea: ${expresion.linea} Columna: ${expresion.columna}, la funcion Len solo acepta valores de tipo VARCHAR`)
            return new Dato(null,"NULL",expresion.linea,expresion.columna)
        }
    }
}

module.exports=Len;
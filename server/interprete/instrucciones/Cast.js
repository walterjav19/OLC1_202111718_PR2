const Instruccion=require('../Instruccion.js');
const Dato=require('../expresiones/Dato.js');
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class Cast extends Instruccion{
    constructor(expresion,tipo){
        super();
        this.expresion=expresion;
        this.tipo=tipo;
    }


    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"CAST",
            id:getGlobConta(),
            expr:this.expresion,
            tipo:this.tipo,
            texto:function(){
                aumentarGlobal();
                let p1=`${getGlobConta()}[label="${this.label}"]\n ${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let parizq=`${getGlobConta()}[label="("]\n ${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let parder=`${getGlobConta()}[label=")"]\n ${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let AS=`${getGlobConta()}[label="AS"]\n ${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let x=`${getGlobConta()}[label="EXPRESION"]\n ${this.id}->${getGlobConta()}\n`
                let ant=getGlobConta()
                let hijo=this.expr.GenerarAST()
                let apunt=`${ant}->${hijo.id}\n`
                aumentarGlobal();
                let tipo=`${getGlobConta()}[label="TIPO"]\n ${this.id}->${getGlobConta()}\n`
                ant=getGlobConta()
                aumentarGlobal();
                let hijo2=`${getGlobConta()}[label="${this.tipo}"]\n ${ant}->${getGlobConta()}\n`

                return `${this.id}[label="CASTEO"]\n${p1}\n${parizq}\n${x}\n${AS}\n${tipo}\n${parder}\n${hijo.texto()}\n${apunt}\n${hijo2}\n`
            }        
        }
        return nodo;
    }


    obtenerTexto(){
        return "CAST("+this.expresion.obtenerTexto()+" AS "+this.tipo+")";
    }

    ejecutar(entorno){
        let expresion=this.expresion.ejecutar(entorno);
        //pasara a mayusculas el tipo
        this.tipo=this.tipo.toUpperCase();
        if(this.tipo==expresion.tipo){
            return new Dato(expresion.valor,this.tipo,expresion.linea,expresion.columna);
        }else if(expresion.tipo=="INT" && this.tipo=="DOUBLE"){
            return new Dato(expresion.valor,this.tipo,expresion.linea,expresion.columna);
        }else if(expresion.tipo=="DOUBLE" && this.tipo=="INT"){
            return new Dato(parseInt(expresion.valor),this.tipo,expresion.linea,expresion.columna);
        }else if(expresion.tipo=="INT" && this.tipo=="VARCHAR"){
            return new Dato(expresion.valor.toString(),this.tipo,expresion.linea,expresion.columna);
        }else if(expresion.tipo=="DOUBLE" && this.tipo=="VARCHAR"){
            return new Dato(expresion.valor.toString(),this.tipo,expresion.linea,expresion.columna);
        }else if(expresion.tipo=="VARCHAR" && this.tipo=="INT"){
            return new Dato(parseInt(expresion.valor),this.tipo,expresion.linea,expresion.columna);
        }else if(expresion.tipo=="VARCHAR" && this.tipo=="DOUBLE"){
            return new Dato(parseFloat(expresion.valor),this.tipo,expresion.linea,expresion.columna);
        }else if(expresion.tipo=="BOOLEAN" && this.tipo=="VARCHAR"){
            return new Dato(expresion.valor.toString(),this.tipo,expresion.linea,expresion.columna);
            
        }else if(expresion.tipo=="VARCHAR" && this.tipo=="BOOLEAN"){
            expresion.valor=expresion.valor.toUpperCase();
            if(expresion.valor=="TRUE"){
                return new Dato(true,this.tipo,expresion.linea,expresion.columna);
            }else if(expresion.valor=="FALSE"){
                return new Dato(false,this.tipo,expresion.linea,expresion.columna);
            }else{
                return new Dato("NULL","NULL",expresion.linea,expresion.columna);
            }

        }else if(expresion.tipo=="VARCHAR" && this.tipo=="DATE"){
            return new Dato(expresion.valor,this.tipo,expresion.linea,expresion.columna);
        }else if(expresion.tipo=="DATE" && this.tipo=="VARCHAR"){
            return new Dato(expresion.valor,this.tipo,expresion.linea,expresion.columna);
        }
        else{
            return new Dato("NULL","NULL",expresion.linea,expresion.columna);
        }
    }
}

module.exports=Cast;
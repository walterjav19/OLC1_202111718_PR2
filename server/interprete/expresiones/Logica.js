const Instruccion=require("../Instruccion");
const Dato=require("./Dato");
const condicion=require("./condicion");
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class Logica extends Instruccion{
    constructor(izquierda,operador,derecha,linea,columna){
        super();
        this.izquierda=izquierda;
        this.derecha=derecha;
        this.operador=operador;
        this.linea=linea;
        this.columna=columna;
        this.valor=null;
    }

    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"LOGICA",
            id:getGlobConta(),
            izq:this.izquierda,
            der:this.derecha,
            op:this.operador,
            texto:function(){
                let izquierda=this.izq.GenerarAST()
                let texto1=izquierda.texto()+`\n${this.id}->${izquierda.id}\n`

                aumentarGlobal();
                let operador=`${getGlobConta()}[label="${this.op}"]\n ${this.id}->${getGlobConta()}\n`

                if(this.der!=null){
                    let derecha=this.der.GenerarAST()
                    let texto2=derecha.texto()+`\n${this.id}->${derecha.id}\n`
                    return `${this.id}[label="${this.label}"]\n${texto1}\n${operador}\n${texto2}\n`
                }

                
                return `${this.id}[label="${this.label}"]\n${operador}\n${texto1}\n`
            }
                      
        }
        return nodo;
    }

    obtenerTexto(){
        if(this.derecha==null){
            return this.operador+" "+this.izquierda.obtenerTexto();
        }

        return this.izquierda.obtenerTexto()+" "+this.operador+" "+this.derecha.obtenerTexto();
    }

    ejecutar(entorno){
        let izquierda=this.izquierda.ejecutar(entorno);
        let derecha;

        if(this.derecha!=null){
            derecha=this.derecha.ejecutar(entorno);
        }

        switch(this.operador){
            case "OR":
                this.valor=izquierda.valor || derecha.valor;
                return new Dato(this.valor,"BOOLEAN",this.linea,this.columna);
            case "AND":
                this.valor=izquierda.valor && derecha.valor;
                return new Dato(this.valor,"BOOLEAN",this.linea,this.columna);
            case "NOT":
                this.valor=!izquierda.valor;
                return new Dato(this.valor,"BOOLEAN",this.linea,this.columna);
            case "==":
                this.valor=izquierda.valor == derecha.valor;
                return new Dato(this.valor,"BOOLEAN",this.linea,this.columna);
            case "!=":
                this.valor=izquierda.valor != derecha.valor;
                return new Dato(this.valor,"BOOLEAN",this.linea,this.columna);
            case ">":
                this.valor=izquierda.valor > derecha.valor;
                return new Dato(this.valor,"BOOLEAN",this.linea,this.columna);
            case "<":
                this.valor=izquierda.valor < derecha.valor;
                return new Dato(this.valor,"BOOLEAN",this.linea,this.columna);
            case ">=":
                this.valor=izquierda.valor >= derecha.valor;
                return new Dato(this.valor,"BOOLEAN",this.linea,this.columna);
            case "<=":
                this.valor=izquierda.valor <= derecha.valor;
                return new Dato(this.valor,"BOOLEAN",this.linea,this.columna);                                

        }
    }
}

module.exports=Logica;
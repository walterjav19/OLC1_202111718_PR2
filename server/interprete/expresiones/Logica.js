const Instruccion=require("../Instruccion");
const Dato=require("./Dato");

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
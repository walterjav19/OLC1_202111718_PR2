const Instruccion = require("../Instruccion");
const Dato = require("./Dato");

class Aritmetica extends Instruccion {
    constructor(izquierda, operador, derecha, linea, columna) {
        super();
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.operador = operador;
        this.linea = linea; 
        this.columna = columna;
        this.valor = null;
    }

    ejecutar() {
        let izquierda=this.izquierda.ejecutar();
        let derecha;


        
        if(this.derecha!=null){
            derecha=this.derecha.ejecutar();
        }
    
        switch(this.operador){
            case "+":
                if(izquierda.tipo=="INT" && derecha.tipo=="INT"){
                    this.valor= izquierda.valor + derecha.valor;
                    return new Dato(this.valor, "INT",this.linea,this.columna);
                }else if(izquierda.tipo=="DOUBLE" && derecha.tipo=="DOUBLE"){
                    this.valor= izquierda.valor + derecha.valor;
                    return new Dato(this.valor, "DOUBLE",this.linea,this.columna);
                }else if(izquierda.tipo=="INT" && derecha.tipo=="DOUBLE"){
                    this.valor= izquierda.valor + derecha.valor;
                    return new Dato(this.valor, "DOUBLE",this.linea,this.columna);
                }else if(izquierda.tipo=="DOUBLE" && derecha.tipo=="INT"){
                    this.valor= izquierda.valor + derecha.valor;
                    return new Dato(this.valor, "DOUBLE",this.linea,this.columna);
                }else if(izquierda.tipo=="VARCHAR" && derecha.tipo=="VARCHAR"){
                    this.valor= izquierda.valor + derecha.valor;
                    return new Dato(this.valor, "VARCHAR",this.linea,this.columna);
                }else if(izquierda.tipo=="INT" && derecha.tipo=="VARCHAR"){
                    this.valor= izquierda.valor + derecha.valor;
                    return new Dato(parseInt(this.valor), "INT",this.linea,this.columna);
                }
            case "-":
                if(derecha!=null){
                    if(izquierda.tipo=="INT" && derecha.tipo=="INT"){
                        this.valor= izquierda.valor - derecha.valor;
                        return new Dato(this.valor, "INT",this.linea,this.columna);
                    }else if(izquierda.tipo=="DOUBLE" && derecha.tipo=="DOUBLE"){
                        this.valor= izquierda.valor - derecha.valor;
                        return new Dato(this.valor, "DOUBLE",this.linea,this.columna);
                    }else if(izquierda.tipo=="INT" && derecha.tipo=="DOUBLE"){
                        this.valor= izquierda.valor - derecha.valor;
                        return new Dato(this.valor, "DOUBLE",this.linea,this.columna);
                    }else if(izquierda.tipo=="DOUBLE" && derecha.tipo=="INT"){
                        this.valor= izquierda.valor - derecha.valor;
                        return new Dato(this.valor, "DOUBLE",this.linea,this.columna);
                    }
                }else{
                    this.valor= izquierda.valor*-1;
                    return new Dato(this.valor, izquierda.tipo,this.linea,this.columna);
                }
                
            case "*":
                if(izquierda.tipo=="INT" && derecha.tipo=="INT"){
                    this.valor= izquierda.valor * derecha.valor;
                    return new Dato(this.valor, "INT",this.linea,this.columna);
                }else if(izquierda.tipo=="DOUBLE" && derecha.tipo=="DOUBLE"){
                    this.valor= izquierda.valor * derecha.valor;
                    return new Dato(this.valor, "DOUBLE",this.linea,this.columna);  
                }else if(izquierda.tipo=="INT" && derecha.tipo=="DOUBLE"){
                    this.valor= izquierda.valor * derecha.valor;
                    return new Dato(this.valor, "DOUBLE",this.linea,this.columna);
                }else if(izquierda.tipo=="DOUBLE" && derecha.tipo=="INT"){
                    this.valor= izquierda.valor * derecha.valor;
                    return new Dato(this.valor, "DOUBLE",this.linea,this.columna);
                }
            case "/":
                if(derecha.valor==0){
                    console.log("Error Semantico: No se puede dividir entre 0");
                }else{
                    if(izquierda.tipo=="INT" && derecha.tipo=="INT"){
                        this.valor= izquierda.valor / derecha.valor;
                        return new Dato(this.valor, "INT",this.linea,this.columna);
                    }else if(izquierda.tipo=="DOUBLE" && derecha.tipo=="DOUBLE"){
                        this.valor= izquierda.valor / derecha.valor;
                        return new Dato(this.valor, "DOUBLE",this.linea,this.columna);
                    }else if(izquierda.tipo=="INT" && derecha.tipo=="DOUBLE"){
                        this.valor= izquierda.valor / derecha.valor;
                        return new Dato(this.valor, "DOUBLE",this.linea,this.columna);
                    }else if(izquierda.tipo=="DOUBLE" && derecha.tipo=="INT"){
                        this.valor= izquierda.valor / derecha.valor;
                        return new Dato(this.valor, "DOUBLE",this.linea,this.columna);
                    }
                }
            case "%":
                if(derecha.valor==0){
                    console.log("Error Semantico: No se puede usar mod entre 0");
                }else{
                    if(izquierda.tipo=="INT" && derecha.tipo=="INT"){
                        this.valor= izquierda.valor % derecha.valor;
                        return new Dato(this.valor, "INT",this.linea,this.columna);
                    }else if(izquierda.tipo=="DOUBLE" && derecha.tipo=="DOUBLE"){
                        this.valor= izquierda.valor % derecha.valor;
                        return new Dato(this.valor, "DOUBLE",this.linea,this.columna);
                    }else if(izquierda.tipo=="INT" && derecha.tipo=="DOUBLE"){
                        this.valor= izquierda.valor % derecha.valor;
                        return new Dato(this.valor, "DOUBLE",this.linea,this.columna);
                    }else if(izquierda.tipo=="DOUBLE" && derecha.tipo=="INT"){
                        this.valor= izquierda.valor % derecha.valor;
                        return new Dato(this.valor, "DOUBLE",this.linea,this.columna);
                    }
                }
        }

    }
}

module.exports = Aritmetica;
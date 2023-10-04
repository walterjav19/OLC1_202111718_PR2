const Instruccion = require("../Instruccion");
const Dato = require("./Dato");
const ListaConsola=require("../Estructuras/ConsoleOut.js")
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

    ejecutar(entorno) {
        let izquierda=this.izquierda.ejecutar(entorno);
        let derecha;


        
        if(this.derecha!=null){
            derecha=this.derecha.ejecutar(entorno);
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
                    let ascii=0;
                    for(let i=0; i<derecha.valor.length; i++){
                        ascii+=derecha.valor.charCodeAt(i);
                    }
                    this.valor= izquierda.valor + ascii;
                    console.log(new Dato(parseInt(this.valor), "INT",this.linea,this.columna));
                    return new Dato(parseInt(this.valor), "INT",this.linea,this.columna);
                }else if(izquierda.tipo=="DOUBLE" && derecha.tipo=="VARCHAR"){
                    let ascii=0;
                    for(let i=0; i<derecha.valor.length; i++){
                        ascii+=derecha.valor.charCodeAt(i);
                    }
                    this.valor= izquierda.valor + ascii;
                    return new Dato(this.valor, "DOUBLE",this.linea,this.columna);

                }else if(izquierda.tipo=="VARCHAR" && derecha.tipo=="INT"){
                    let ascii=0;
                    for(let i=0; i<izquierda.valor.length; i++){
                        ascii+=izquierda.valor.charCodeAt(i);
                    }
                    this.valor= ascii + derecha.valor;
                    console.log(new Dato(parseInt(this.valor), "INT",this.linea,this.columna));
                    return new Dato(parseInt(this.valor), "INT",this.linea,this.columna);
                }else if(izquierda.tipo=="VARCHAR" && derecha.tipo=="DOUBLE"){
                    let ascii=0;
                    for(let i=0; i<izquierda.valor.length; i++){
                        ascii+=izquierda.valor.charCodeAt(i);
                    }
                    this.valor= ascii + derecha.valor;
                    return new Dato(this.valor, "DOUBLE",this.linea,this.columna);
                }else if(izquierda.tipo=="INT" && derecha.tipo=="DATE"){
                    let fechaObjeto = new Date(derecha.valor);
                    fechaObjeto.setDate(fechaObjeto.getDate() + izquierda.valor);
                    let nuevaFecha = fechaObjeto.toISOString().slice(0, 10);
                    return new Dato(nuevaFecha, "DATE",this.linea,this.columna);
                }else if(izquierda.tipo=="DOUBLE" && derecha.tipo=="DATE"){
                    let fechaObjeto = new Date(derecha.valor);
                    fechaObjeto.setDate(fechaObjeto.getDate() + izquierda.valor);
                    let nuevaFecha = fechaObjeto.toISOString().slice(0, 10);
                    return new Dato(nuevaFecha, "DATE",this.linea,this.columna);
                }else if(izquierda.tipo=="DATE" && derecha.tipo=="INT"){
                    let fechaObjeto = new Date(izquierda.valor);
                    fechaObjeto.setDate(fechaObjeto.getDate() + derecha.valor);
                    let nuevaFecha = fechaObjeto.toISOString().slice(0, 10);
                    return new Dato(nuevaFecha, "DATE",this.linea,this.columna);
                }else if(izquierda.tipo=="DATE" && derecha.tipo=="DOUBLE"){
                    let fechaObjeto = new Date(izquierda.valor);
                    fechaObjeto.setDate(fechaObjeto.getDate() + derecha.valor);
                    let nuevaFecha = fechaObjeto.toISOString().slice(0, 10);
                    return new Dato(nuevaFecha, "DATE",this.linea,this.columna);

                }else if(izquierda.tipo=="DATE" && derecha.tipo=="VARCHAR"){
                    let fechaObjeto = new Date(izquierda.valor);
                    let ascii=0;
                    for(let i=0; i<derecha.valor.length; i++){
                        ascii+=derecha.valor.charCodeAt(i);
                    }
                    fechaObjeto.setDate(fechaObjeto.getDate() + ascii);
                    let nuevaFecha = fechaObjeto.toISOString().slice(0, 10);
                    return new Dato(nuevaFecha, "DATE",this.linea,this.columna);
                }else if(izquierda.tipo=="VARCHAR" && derecha.tipo=="DATE"){
                    let fechaObjeto = new Date(derecha.valor);
                    let ascii=0;
                    for(let i=0; i<izquierda.valor.length; i++){
                        ascii+=izquierda.valor.charCodeAt(i);
                    }
                    fechaObjeto.setDate(fechaObjeto.getDate() + ascii);
                    let nuevaFecha = fechaObjeto.toISOString().slice(0, 10);
                    return new Dato(nuevaFecha, "DATE",this.linea,this.columna);
                }else{
                    ListaConsola.push("Error Semantico: Operador + no puede operar "+izquierda.tipo+" con "+derecha.tipo+" en la linea: "+this.linea+" y columna: "+this.columna);
                    return new Dato(null,'NULL' , this.linea, this.columna)
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
                    }else if(izquierda.tipo=="INT" && derecha.tipo=="VARCHAR"){
                        let ascii=0;
                        for(let i=0; i<derecha.valor.length; i++){
                            ascii+=derecha.valor.charCodeAt(i);
                        }
                        this.valor= izquierda.valor - ascii;
                        return new Dato(this.valor, "INT",this.linea,this.columna);
                    }else if(izquierda.tipo=="DOUBLE" && derecha.tipo=="VARCHAR"){
                        let ascii=0;
                        for(let i=0; i<derecha.valor.length; i++){
                            ascii+=derecha.valor.charCodeAt(i);
                        }
                        this.valor= izquierda.valor - ascii;
                        return new Dato(this.valor, "DOUBLE",this.linea,this.columna);
                    }else if(izquierda.tipo=="VARCHAR" && derecha.tipo=="INT"){
                        let ascii=0;
                        for(let i=0; i<izquierda.valor.length; i++){
                            ascii+=izquierda.valor.charCodeAt(i);
                        }
                        this.valor= ascii - derecha.valor;
                        return new Dato(this.valor, "INT",this.linea,this.columna);
                    }else if(izquierda.tipo=="VARCHAR" && derecha.tipo=="DOUBLE"){
                        let ascii=0;
                        for(let i=0; i<izquierda.valor.length; i++){
                            ascii+=izquierda.valor.charCodeAt(i);
                        }
                        this.valor= ascii - derecha.valor;
                        return new Dato(this.valor, "DOUBLE",this.linea,this.columna);
                    }else if(izquierda.tipo=="INT" && derecha.tipo=="DATE"){
                        let fechaObjeto = new Date(derecha.valor);
                        fechaObjeto.setDate(fechaObjeto.getDate() - izquierda.valor);
                        let nuevaFecha = fechaObjeto.toISOString().slice(0, 10);
                        return new Dato(nuevaFecha, "DATE",this.linea,this.columna);
                    }else if(izquierda.tipo=="DOUBLE" && derecha.tipo=="DATE"){
                        let fechaObjeto = new Date(derecha.valor);
                        fechaObjeto.setDate(fechaObjeto.getDate() - izquierda.valor);
                        let nuevaFecha = fechaObjeto.toISOString().slice(0, 10);
                        return new Dato(nuevaFecha, "DATE",this.linea,this.columna);
                    }else if(izquierda.tipo=="DATE" && derecha.tipo=="INT"){
                        let fechaObjeto = new Date(izquierda.valor);
                        fechaObjeto.setDate(fechaObjeto.getDate() - derecha.valor);
                        let nuevaFecha = fechaObjeto.toISOString().slice(0, 10);
                        return new Dato(nuevaFecha, "DATE",this.linea,this.columna);
                    }else if(izquierda.tipo=="DATE" && derecha.tipo=="DOUBLE"){
                        let fechaObjeto = new Date(izquierda.valor);
                        fechaObjeto.setDate(fechaObjeto.getDate() - derecha.valor);
                        let nuevaFecha = fechaObjeto.toISOString().slice(0, 10);
                        return new Dato(nuevaFecha, "DATE",this.linea,this.columna);
                    }else if(izquierda.tipo=="DATE" && derecha.tipo=="VARCHAR"){
                        let fechaObjeto = new Date(izquierda.valor);
                        let ascii=0;
                        for(let i=0; i<derecha.valor.length; i++){
                            ascii+=derecha.valor.charCodeAt(i);
                        }
                        fechaObjeto.setDate(fechaObjeto.getDate() - ascii);
                        let nuevaFecha = fechaObjeto.toISOString().slice(0, 10);
                        return new Dato(nuevaFecha, "DATE",this.linea,this.columna);
                    }else if(izquierda.tipo=="VARCHAR" && derecha.tipo=="DATE"){
                        let fechaObjeto = new Date(derecha.valor);
                        let ascii=0;
                        for(let i=0; i<izquierda.valor.length; i++){
                            ascii+=izquierda.valor.charCodeAt(i);
                        }
                        fechaObjeto.setDate(fechaObjeto.getDate() - ascii);
                        let nuevaFecha = fechaObjeto.toISOString().slice(0, 10);
                        return new Dato(nuevaFecha, "DATE",this.linea,this.columna);
                    }else{
                        ListaConsola.push("Error Semantico: Operador - no puede operar "+izquierda.tipo+" con "+derecha.tipo+" en la linea: "+this.linea+" y columna: "+this.columna)
                        return new Dato(null,'NULL' , this.linea, this.columna)
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
                }else{
                    ListaConsola.push("Error Semantico: Operador * no puede operar "+izquierda.tipo+" con "+derecha.tipo+" en la linea: "+this.linea+" y columna: "+this.columna)
                    return new Dato(null,'NULL' , this.linea, this.columna)
                }
            case "/":
                if(derecha.valor==0){
                    ListaConsola.push("Error Semantico: No se puede dividir entre 0")
                    return new Dato(null,'NULL' , this.linea, this.columna)
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
                    }else{
                        ListaConsola.push("Error Semantico: Operador / no puede operar "+izquierda.tipo+" con "+derecha.tipo+" en la linea: "+this.linea+" y columna: "+this.columna)
                        return new Dato(null,'NULL' , this.linea, this.columna)
                    }
                }
            case "%":
                if(derecha.valor==0){
                    ListaConsola.push("Error Semantico: No se puede usar mod entre 0")
                    return new Dato(null,'NULL' , this.linea, this.columna)
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
                    }else{
                        ListaConsola.push("Error Semantico: Operador % no puede operar "+izquierda.tipo+" con "+derecha.tipo+" en la linea: "+this.linea+" y columna: "+this.columna)
                        return new Dato(null,'NULL' , this.linea, this.columna)
                    }
                }
        }

    }
}

module.exports = Aritmetica;
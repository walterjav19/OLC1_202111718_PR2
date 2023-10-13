const Instruccion=require('../Instruccion.js');
const Dato=require('../expresiones/Dato.js');
class Cast extends Instruccion{
    constructor(expresion,tipo){
        super();
        this.expresion=expresion;
        this.tipo=tipo;
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
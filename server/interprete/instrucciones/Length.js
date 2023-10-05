const Instruccion=require('../Instruccion');
const Dato=require('../expresiones/Dato');
const ConsolaSalida=require('../Estructuras/ConsoleOut')

class Len extends Instruccion{
    constructor(expresion){
        super();
        this.expresion=expresion;
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
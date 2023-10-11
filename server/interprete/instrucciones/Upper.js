const Instruccion=require('../Instruccion');
const Dato=require('../expresiones/Dato');
const ConsolaSalida=require('../Estructuras/ConsoleOut')

class Upper extends Instruccion{
    constructor(expresion){
        super();
        this.expresion=expresion;
    }

    obtenerTexto(){
        return `UPPER(${this.expresion.obtenerTexto()})`;
    }

    ejecutar(entorno){
        let expresion=this.expresion.ejecutar(entorno);
        if(expresion.tipo=="VARCHAR"){
            let up=expresion.valor.toUpperCase();
            return new Dato(up,"VARCHAR",expresion.linea,expresion.columna)
        }else{
            ConsolaSalida.push(`Error Semantico Linea: ${expresion.linea} Columna: ${expresion.columna}, la funcion Upper solo acepta valores de tipo VARCHAR`)
            return new Dato(null,"NULL",expresion.linea,expresion.columna)
        }
    }
}

module.exports=Upper;
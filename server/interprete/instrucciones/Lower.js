const Instruccion=require('../Instruccion');
const Dato=require('../expresiones/Dato');
const ConsolaSalida=require('../Estructuras/ConsoleOut')

class Lower extends Instruccion{
    constructor(expresion){
        super();
        this.expresion=expresion;
    }

    obtenerTexto(){
        return `LOWER(${this.expresion.obtenerTexto()})`;
    }

    ejecutar(entorno){
        let expresion=this.expresion.ejecutar(entorno);
        if(expresion.tipo=="VARCHAR"){
            let low=expresion.valor.toLowerCase();
            return new Dato(low,"VARCHAR",expresion.linea,expresion.columna)
        }else{
            ConsolaSalida.push(`Error Semantico Linea: ${expresion.linea} Columna: ${expresion.columna}, la funcion LOWER solo acepta valores de tipo VARCHAR`)
            return new Dato(null,"NULL",expresion.linea,expresion.columna)
        }
    }
}

module.exports=Lower;
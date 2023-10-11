const Instruccion=require('../Instruccion');
const Dato=require('../expresiones/Dato');
const ConsolaSalida=require('../Estructuras/ConsoleOut')

class TypeOf extends Instruccion{
    constructor(expresion){
        super();
        this.expresion=expresion;
    }

    obtenerTexto(){
        return `TYPEOF(${this.expresion.obtenerTexto()})`;
    }

    ejecutar(entorno){
        let expresion=this.expresion.ejecutar(entorno);
        return new Dato(expresion.tipo,"VARCHAR",expresion.linea,expresion.columna)
    }
}

module.exports=TypeOf;
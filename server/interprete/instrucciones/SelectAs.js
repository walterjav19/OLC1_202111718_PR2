const Instruccion = require('../Instruccion');
const ConsolaSalida=require('../Estructuras/ConsoleOut');
const { generarSeparacion, generarEncabezados, generarRegistros} = require('../Estructuras/TableFormatter');
class SelectAs extends Instruccion{
    constructor(expresion,alias){
        super();
        this.expresion = expresion;
        this.alias = alias;
    }

    ejecutar(entorno){
        let dato=this.expresion.ejecutar(entorno);
        let aux=String(dato.valor);
        
        ConsolaSalida.push(generarSeparacion(1))
        ConsolaSalida.push(generarEncabezados([this.alias]))
        ConsolaSalida.push(generarSeparacion(1))
        ConsolaSalida.push(generarRegistros([aux]))
        ConsolaSalida.push(generarSeparacion(1))
    }
}

module.exports = SelectAs;
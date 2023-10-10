const Instruccion=require('../Instruccion');
const ConsolaSalida=require('../Estructuras/ConsoleOut');
const { generarSeparacion, generarEncabezados, generarRegistros} = require('../Estructuras/TableFormatter');
class Select extends Instruccion{
    constructor(expresion){
        super();
        this.expresion=expresion;
    }

    ejecutar(entorno){ 
        let expresion=this.expresion.ejecutar(entorno);
        let aux=String(expresion.valor);
        
        ConsolaSalida.push(generarSeparacion(1))
        ConsolaSalida.push(generarEncabezados([String('Resultado')]))
        ConsolaSalida.push(generarSeparacion(1))
        ConsolaSalida.push(generarRegistros([aux]))
        ConsolaSalida.push(generarSeparacion(1))
    }
}
module.exports=Select;
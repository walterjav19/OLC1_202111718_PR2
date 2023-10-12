const Instruccion=require('../Instruccion');
const ConsolaSalida=require('../Estructuras/ConsoleOut');
const { generarSeparacion, generarEncabezados, generarRegistros} = require('../Estructuras/TableFormatter');
const Tabla=require("../Estructuras/Tabla");

class SelectWhere extends Instruccion{
    constructor(listaColumnas,Tabla,condicion){
        super();
        this.listaColumnas=listaColumnas;
        this.Tabla=Tabla;
        this.condicion=condicion;

    }

    ejecutar(entorno){
       console.log(this.condicion.ejecutar(entorno));
        
        
    }
}

module.exports=SelectWhere;
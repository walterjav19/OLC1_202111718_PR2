const Instruccion = require("../Instruccion");
const ConsolaSalida= require("../Estructuras/ConsoleOut");
const Columna= require("../Estructuras/Columna");

class Add extends Instruccion {
    constructor(nombreTabla,nombreColumna,tipo){
        super();
        this.nombreTabla = nombreTabla;
        this.nombreColumna = nombreColumna;
        this.tipo = tipo;
    }

    ejecutar(entorno){
        let table=entorno.obtenerTabla(this.nombreTabla)
        if(table!=undefined){
            table.listaColumnas.push(new Columna(this.nombreColumna,this.tipo))
            //agregar a la lista de filas
            for (let i = 0; i < table.listaFilas.length; i++) {
                let element = table.listaFilas[i];
                element.push(null)
            }
        }else{
            ConsolaSalida.push("Error Semantico, No existe la tabla "+this.nombreTabla)
        }
    }
}

module.exports = Add;
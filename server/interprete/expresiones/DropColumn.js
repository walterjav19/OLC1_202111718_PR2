const Instruccion=require("../Instruccion");
const ConsolaSalida= require("../Estructuras/ConsoleOut");
class DropColumn extends Instruccion {
    constructor(TableName,columnName) {
        super();
        this.TableName = TableName;
        this.columnName = columnName;
    }

    ejecutar(entorno) {
        let table=entorno.obtenerTabla(this.TableName)
        if(table){
            let indiceborrar=0;
            for (let i = 0; i < table.listaColumnas.length; i++) {
                let element = table.listaColumnas[i];
                if (element.Nombre === this.columnName) {
                    indiceborrar=i;
                    table.listaColumnas.splice(i, 1);
                    return; // Sale de la función ejecutar(entorno)
                }
            }
            ConsolaSalida.push("Error Semantico, No existe la columna "+this.columnName+" en la tabla "+this.TableName)
        }else{
            ConsolaSalida.push("Error Semantico, No existe la tabla "+this.TableName)
        }
    }
}

module.exports = DropColumn;

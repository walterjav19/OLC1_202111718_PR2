const Instruccion=require("../Instruccion");
const ConsolaSalida= require("../Estructuras/ConsoleOut");

class Rename extends Instruccion {
    constructor(TableName,newName) {
        super()
        this.TableName = TableName;
        this.newName = newName;
    }

    ejecutar(entorno) {
        let table=entorno.obtenerTabla(this.TableName)
        if(table){
            table.nombre=this.newName
            let ent=entorno.actualizarTabla(this.TableName)
            ent.Tablas.set(this.newName,table);
            ent.Tablas.delete(this.TableName);
        }else{
            ConsolaSalida.push("Error Semantico, No existe la tabla "+this.TableName)
        }
    }
}
module.exports = Rename;
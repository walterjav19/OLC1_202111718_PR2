const Instruccion=require('../Instruccion');
const ConsolaSalida= require("../Estructuras/ConsoleOut");

class DropTable extends Instruccion{
    constructor(TableName){
        super();
        this.TableName=TableName;
    }

    ejecutar(entorno){
        let ent=entorno.actualizarTabla(this.TableName)
        if(ent){
            ent.Tablas.delete(this.TableName);
        }else{
            ConsolaSalida.push("No se puede borrar "+this.TableName+" porque no a sido declarada");
        }
        
    }
}

module.exports=DropTable;
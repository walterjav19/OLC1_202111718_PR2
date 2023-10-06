const Instruccion=require('../Instruccion');
const ConsolaSalida= require("../Estructuras/ConsoleOut");
const Tabla=require("../Estructuras/Tabla");

class RenameColumn extends Instruccion{
    constructor(TableName,oldName,newName){
        super();
        this.TableName=TableName;
        this.oldName=oldName;
        this.newName=newName;
    }

    ejecutar(entorno){
        let tabla=entorno.obtenerTabla(this.TableName);
        if(tabla!=null){
            for(let i=0;i<tabla.listaColumnas.length;i++){
                if(tabla.listaColumnas[i].Nombre==this.oldName){
                    tabla.listaColumnas[i].Nombre=this.newName;
                    return;
                }
            }
            ConsolaSalida.push("No existe la columna "+this.oldName+" en la tabla "+this.TableName);
        }else{
            ConsolaSalida.push("No existe la tabla "+this.TableName);
        }
    }
}

module.exports=RenameColumn;
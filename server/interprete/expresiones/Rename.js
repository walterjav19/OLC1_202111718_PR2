const Instruccion=require("../Instruccion");
const ConsolaSalida= require("../Estructuras/ConsoleOut");
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class Rename extends Instruccion {
    constructor(TableName,newName) {
        super()
        this.TableName = TableName;
        this.newName = newName;
    }

    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"ALTER",
            id:getGlobConta(),
            table:this.TableName,
            name:this.newName,
            texto:function(){
                aumentarGlobal()
                let alt=`${getGlobConta()}[label="ALTER"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let tabla=`${getGlobConta()}[label="TABLE"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let nombre=`${getGlobConta()}[label="${this.table}"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let add=`${getGlobConta()}[label="RENAME"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let column=`${getGlobConta()}[label="TO"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let type=`${getGlobConta()}[label="${this.name}"]\n${this.id}->${getGlobConta()}\n`

                return `${this.id}[label=${this.label}]\n${alt}\n${tabla}\n${nombre}\n${add}\n${column}\n${type}\n`
            }
        }

        return nodo
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
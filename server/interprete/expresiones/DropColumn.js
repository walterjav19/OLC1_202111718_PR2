const Instruccion=require("../Instruccion");
const ConsolaSalida= require("../Estructuras/ConsoleOut");
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class DropColumn extends Instruccion {
    constructor(TableName,columnName) {
        super();
        this.TableName = TableName;
        this.columnName = columnName;
    }


    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"ALTER",
            id:getGlobConta(),
            table:this.TableName,
            column:this.columnName,
            texto:function(){
                aumentarGlobal()
                let alt=`${getGlobConta()}[label="ALTER"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let tabla=`${getGlobConta()}[label="TABLE"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let nombre=`${getGlobConta()}[label="${this.table}"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let add=`${getGlobConta()}[label="DROP"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let column=`${getGlobConta()}[label="COLUMN"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let type=`${getGlobConta()}[label="${this.column}"]\n${this.id}->${getGlobConta()}\n`

                return `${this.id}[label=${this.label}]\n${alt}\n${tabla}\n${nombre}\n${add}\n${column}\n${type}\n`
            }
        }

        return nodo
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
                    //borrar de la lista de filas
                    for (let j = 0; j < table.listaFilas.length; j++) {
                        let element = table.listaFilas[j];
                        element.splice(indiceborrar, 1)
                    }
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

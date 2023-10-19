const Instruccion=require('../Instruccion');
const ConsolaSalida= require("../Estructuras/ConsoleOut");
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')


class DropTable extends Instruccion{
    constructor(TableName){
        super();
        this.TableName=TableName;
    }

    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"DROP",
            id:getGlobConta(),
            table:this.TableName,
            texto:function(){
                aumentarGlobal()
                let alt=`${getGlobConta()}[label="DROP"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let tabla=`${getGlobConta()}[label="TABLE"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let nombre=`${getGlobConta()}[label="${this.table}"]\n${this.id}->${getGlobConta()}\n`

                return `${this.id}[label=${this.label}]\n${alt}\n${tabla}\n${nombre}\n`
            }
        }

        return nodo
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
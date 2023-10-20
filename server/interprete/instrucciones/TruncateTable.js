const Instruccion=require('../Instruccion')
const ConsolaSalida=require('../Estructuras/ConsoleOut')
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class TruncateTable extends Instruccion{
    constructor(Table){
        super()
        this.Table=Table
    }

    GenerarAST(){
        aumentarGlobal()
        let nodo={
            label:"TRUNCATE",
            id:getGlobConta(),
            Table:this.Table,
            texto:function(){
                aumentarGlobal()
                let trunc=`${getGlobConta()}[label="TRUNCATE"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let nodo=`${getGlobConta()}[label="TABLE"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let tab=`${getGlobConta()}[label="${this.Table}"]\n${this.id}->${getGlobConta()}\n`
                return `${this.id}[label=${this.label}]\n${trunc}\n${nodo}\n${tab}\n`
            }
        }
        return nodo
    }

    ejecutar(entorno){
        let tabla=entorno.obtenerTabla(this.Table)
        if(tabla){
            tabla.listaFilas=[]
        }else{
            ConsolaSalida.push('No existe la tabla '+this.Table)
        }
    }
}

module.exports=TruncateTable;
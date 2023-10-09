const Instruccion=require('../Instruccion')
const ConsolaSalida=require('../Estructuras/ConsoleOut')
class TruncateTable extends Instruccion{
    constructor(Table){
        super()
        this.Table=Table
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
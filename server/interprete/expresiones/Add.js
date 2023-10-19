const Instruccion = require("../Instruccion");
const ConsolaSalida= require("../Estructuras/ConsoleOut");
const Columna= require("../Estructuras/Columna");
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')


class Add extends Instruccion {
    constructor(nombreTabla,nombreColumna,tipo){
        super();
        this.nombreTabla = nombreTabla;
        this.nombreColumna = nombreColumna;
        this.tipo = tipo;
    }

    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"ALTER",
            id:getGlobConta(),
            table:this.nombreTabla,
            column:this.nombreColumna,
            type:this.tipo,
            texto:function(){
                aumentarGlobal()
                let alt=`${getGlobConta()}[label="ALTER"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let tabla=`${getGlobConta()}[label="TABLE"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let nombre=`${getGlobConta()}[label="${this.table}"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let add=`${getGlobConta()}[label="ADD"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let column=`${getGlobConta()}[label="${this.column}"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let type=`${getGlobConta()}[label="${this.type}"]\n${this.id}->${getGlobConta()}\n`

                return `${this.id}[label=${this.label}]\n${alt}\n${tabla}\n${nombre}\n${add}\n${column}\n${type}\n`
            }
        }

        return nodo
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
const Instruccion = require('../Instruccion');
const ConsolaSalida=require('../Estructuras/ConsoleOut');
const { generarSeparacion, generarEncabezados, generarRegistros} = require('../Estructuras/TableFormatter');
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class SelectAs extends Instruccion{
    constructor(expresion,alias){
        super();
        this.expresion = expresion;
        this.alias = alias;
    }


    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"SELECT AS",
            id:getGlobConta(),
            expr:this.expresion,
            alias:this.alias,
            texto:function(){
                aumentarGlobal();
                let p1=`${getGlobConta()}[label="SELECT"]\n ${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let p2=`${getGlobConta()}[label=";"]\n ${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let p3=`${getGlobConta()}[label="AS"]\n ${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let antio=getGlobConta();
                let p4=`${getGlobConta()}[label="ID"]\n ${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                p4+=`${getGlobConta()}[label="${this.alias}"]\n ${antio}->${getGlobConta()}\n`
                aumentarGlobal();
                let x=`${getGlobConta()}[label="EXPRESION"]\n ${this.id}->${getGlobConta()}\n`
                let ant=getGlobConta()
                let hijo=this.expr.GenerarAST()
                let apunt=`${ant}->${hijo.id}\n`
                return `${this.id}[label="${this.label}"]\n${p1}\n${x}\n${p3}\n${p4}\n${p2}\n${hijo.texto()}\n${apunt}`
            }
                    
        }
        return nodo;
        
    }

    ejecutar(entorno){
        let dato=this.expresion.ejecutar(entorno);
        let aux=String(dato.valor);
        
        ConsolaSalida.push(generarSeparacion(1))
        ConsolaSalida.push(generarEncabezados([this.alias]))
        ConsolaSalida.push(generarSeparacion(1))
        ConsolaSalida.push(generarRegistros([aux]))
        ConsolaSalida.push(generarSeparacion(1))
    }
}

module.exports = SelectAs;
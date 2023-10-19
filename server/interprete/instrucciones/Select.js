const Instruccion=require('../Instruccion');
const ConsolaSalida=require('../Estructuras/ConsoleOut');
const { generarSeparacion, generarEncabezados, generarRegistros} = require('../Estructuras/TableFormatter');
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class Select extends Instruccion{
    constructor(expresion){
        super();
        this.expresion=expresion;
    }
    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"SELECT",
            id:getGlobConta(),
            expr:this.expresion,
            texto:function(){
                aumentarGlobal();
                let p1=`${getGlobConta()}[label="${this.label}"]\n ${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let p2=`${getGlobConta()}[label=";"]\n ${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let x=`${getGlobConta()}[label="EXPRESION"]\n ${this.id}->${getGlobConta()}\n`
                let ant=getGlobConta()
                let hijo=this.expr.GenerarAST()
                let apunt=`${ant}->${hijo.id}\n`
                return `${this.id}[label="${this.label}"]\n${p1}\n${x}\n${p2}\n${hijo.texto()}\n${apunt}`
            }
                    
        }
        return nodo;
        
    }

    ejecutar(entorno){ 
        let expresion=this.expresion.ejecutar(entorno);
        let aux=String(expresion.valor);
        console.log(aux);
        ConsolaSalida.push(generarSeparacion(1))
        ConsolaSalida.push(generarEncabezados([this.expresion.obtenerTexto()]))
        ConsolaSalida.push(generarSeparacion(1))
        ConsolaSalida.push(generarRegistros([aux]))
        ConsolaSalida.push(generarSeparacion(1))
    }
}
module.exports=Select;
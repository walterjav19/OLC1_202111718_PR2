const Instruccion=require('../Instruccion');
const ConsolaSalida=require('../Estructuras/ConsoleOut')
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class Assigment extends Instruccion{
    constructor(id,value){
        super();
        this.id=id;
        this.value=value;
    }

    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"ASSIGMENT",
            id:getGlobConta(),
            nombre:this.id,
            valor:this.value,
            texto:function(){
                aumentarGlobal();
                let pr=`${getGlobConta()}[label="SET"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let nom=`${getGlobConta()}[label="${this.nombre}"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let pyc=`${getGlobConta()}[label=";"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let igual=`${getGlobConta()}[label="="]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let x=`${getGlobConta()}[label="EXPRESION"]\n ${this.id}->${getGlobConta()}\n`
                let ant=getGlobConta()
                let hijo=this.valor.GenerarAST()
                let apunt=`${ant}->${hijo.id}\n`
                return `${this.id}[label="${this.label}"]\n${pr}\n${nom}\n${igual}\n${x}\n${pyc}\n${hijo.texto()}\n${apunt}`
            }        
        }
        return nodo;
    }


    ejecutar(entorno){
        let valor=this.value.ejecutar(entorno);
        let update=entorno.actualizarSimbolo(this.id,valor);
        if(!update){
            ConsolaSalida.push("Error: Semantico "+this.id+" no declarada")
        }
    }
}

module.exports=Assigment;
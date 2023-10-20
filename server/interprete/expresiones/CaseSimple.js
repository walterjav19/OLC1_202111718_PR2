const Instruccion = require('../Instruccion');
const ConsolaSalida= require("../Estructuras/ConsoleOut");
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class CaseSimple extends Instruccion{
    constructor(Id,ListaWhen,InstruccionElse){
        super();
        this.Id = Id;
        this.ListaWhen = ListaWhen;
        this.InstruccionElse = InstruccionElse;
        this.titulo=""
    }

    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"CASE",
            id:getGlobConta(),
            variable:this.Id,
            inselse:this.InstruccionElse,
            ListaWhen:this.ListaWhen,
            texto:function(){
                aumentarGlobal();
                let cas=`${getGlobConta()}[label="CASE"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let variable=`${getGlobConta()}[label="${this.variable}"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let els=`${getGlobConta()}[label="ELSE"]\n${this.id}->${getGlobConta()}\n`
                
                aumentarGlobal();
                let guard=getGlobConta();
                let listwh=`${getGlobConta()}[label="listawhen"]\n${this.id}->${getGlobConta()}\n`

                aumentarGlobal();
                let l1=`${getGlobConta()}[label="expresion"]\n${this.id}->${getGlobConta()}\n`
                let aux1=getGlobConta();
                let hijo1=this.inselse.GenerarAST();
                let apuntador1=`${aux1}->${hijo1.id}\n`


                let listawhen=""
                this.ListaWhen.forEach(element => {
                    let nodo=element.GenerarAST();
                    listawhen+=nodo.texto();
                    listawhen+=`\n${guard}->${nodo.id}\n`
                });


                return `${this.id}[label=${this.label}]\n${cas}\n${variable}\n${listwh}\n${listawhen}\n${els}\n${l1}\n${hijo1.texto()}\n${apuntador1}\n`
            }
        }
        return nodo
    }

    obtenerTexto(){
        return this.titulo;
    }

    ejecutar(entorno){
        let Data=entorno.obtenerSimbolo(this.Id)
        if(Data){
            let expresion=this.InstruccionElse.ejecutar(entorno);
            this.ListaWhen.forEach(element => {
                element.expresion2.ejecutar(entorno);
            });

            for(let i=0;i<this.ListaWhen.length;i++){
                let valor1 = this.ListaWhen[i].expresion1.ejecutar(entorno);
                let valor2 = Data.valor;
                if(valor1.valor==valor2){
                    let valor3 = this.ListaWhen[i].expresion2.ejecutar(entorno);
                    this.titulo=valor3.valor;
                    return valor3;
                }
            }

            
            this.titulo=expresion.valor;
            return expresion;
        }else{
            ConsolaSalida.push("La variable "+this.Id+" no existe")
        }
    }
}
module.exports = CaseSimple;
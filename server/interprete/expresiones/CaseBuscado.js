const Instruccion=require('../Instruccion')
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')
const ConsolaSalida= require("../Estructuras/ConsoleOut");
class CaseBuscado extends Instruccion{
    constructor(listawhen,expresionelse){
        super();
        this.listawhen=listawhen;
        this.expresionelse=expresionelse;
        this.titulo="";
    }

    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"CASE",
            id:getGlobConta(),
            inselse:this.expresionelse,
            ListaWhen:this.listawhen,
            texto:function(){
                aumentarGlobal();
                let cas=`${getGlobConta()}[label="CASE"]\n${this.id}->${getGlobConta()}\n`
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


                return `${this.id}[label=${this.label}]\n${cas}\n${listwh}\n${listawhen}\n${els}\n${l1}\n${hijo1.texto()}\n${apuntador1}\n`
            }
        }
        return nodo
    }





    obtenerTexto(){
        return this.titulo;
    }

    ejecutar(entorno){
        let expresion=this.expresionelse.ejecutar(entorno)
        this.listawhen.forEach(element => {
            element.expresion2.ejecutar(entorno);
        });
        for(let i=0;i<this.listawhen.length;i++){
            let valores=this.listawhen[i].ejecutar(entorno);
            if(valores.expresion1.valor){
                this.titulo=valores.expresion2.valor;
                ConsolaSalida.push(this.titulo)
                return valores.expresion2;
            }
        }
        
        this.titulo=expresion.valor;
        ConsolaSalida.push(this.titulo)
        return expresion;
        
    }
}

module.exports=CaseBuscado;
const Instruccion=require('../Instruccion')
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class Declaration extends Instruccion{
    constructor(id,valor,tipo){
        super();
        this.id=id;
        this.valor=valor;
        this.tipo=tipo;
    }

    GenerarAST(){
        let aux=this.id;
        aumentarGlobal();
        let nodo={
            label:"DECLARATION",
            id:getGlobConta(),
            nombre:aux,
            valor:this.valor,
            tipo:this.tipo,
            texto:function(){
                aumentarGlobal();
                let pr=`${getGlobConta()}[label="DECLARE"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let nom=`${getGlobConta()}[label="${this.nombre}"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let tipo=`${getGlobConta()}[label="${this.tipo}"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let def=`${getGlobConta()}[label="DEFAULT"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let pyc=`${getGlobConta()}[label=";"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let x=`${getGlobConta()}[label="EXPRESION"]\n ${this.id}->${getGlobConta()}\n`
                let ant=getGlobConta()
                let hijo=this.valor.GenerarAST()
                let apunt=`${ant}->${hijo.id}\n`
                return `${this.id}[label="${this.label}"]\n${pr}\n${nom}\n${tipo}\n${def}\n${x}\n${pyc}\n${hijo.texto()}\n${apunt}`
            }        
        }
        return nodo;
    }

    ejecutar(entorno){
        
        if(this.valor==null){
            entorno.AgregarSimbolo(this.id,this.valor)
        }else{
            let valor=this.valor.ejecutar(entorno)
            entorno.AgregarSimbolo(this.id,valor)
        }
            
    }

}

module.exports=Declaration;
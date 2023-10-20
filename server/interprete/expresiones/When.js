const Instruccion = require('../Instruccion');
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class When extends Instruccion{
    constructor(expresion1,expresion2){
        super();
        this.expresion1 = expresion1;
        this.expresion2 = expresion2;
    }

    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"WHEN",
            id:getGlobConta(),
            expresion1:this.expresion1,
            expresion2:this.expresion2,
            texto:function(){
                aumentarGlobal();
                let when=`${getGlobConta()}[label="WHEN"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let then=`${getGlobConta()}[label="THEN"]\n${this.id}->${getGlobConta()}\n`

                aumentarGlobal();
                let l1=`${getGlobConta()}[label="expresion"]\n${this.id}->${getGlobConta()}\n`
                let aux1=getGlobConta();
                let hijo1=this.expresion1.GenerarAST();
                let apuntador1=`${aux1}->${hijo1.id}\n`


                aumentarGlobal();
                let l2=`${getGlobConta()}[label="expresion"]\n${this.id}->${getGlobConta()}\n`
                let aux2=getGlobConta();
                let hijo2=this.expresion2.GenerarAST();
                let apuntador2=`${aux2}->${hijo2.id}\n`

                return `${this.id}[label="${this.label}"]\n${when}\n${l1}\n${hijo1.texto()}\n${apuntador1}\n${then}\n${l2}\n${hijo2.texto()}\n${apuntador2}\n`
            }
        }
        return nodo
    }

    ejecutar(entorno){
        let valor1 = this.expresion1.ejecutar(entorno);
        let valor2 = this.expresion2.ejecutar(entorno);
        this.expresion1=valor1;
        this.expresion2=valor2;
        return this;
    }
}
module.exports = When;
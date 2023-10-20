const Instruccion=require('../Instruccion');
const Logica=require('./Logica')
const Dato=require('./Dato');
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class Condicion extends Instruccion{
    constructor(columna,operador,expresion){
        super();
        this.columna=columna;
        this.operador=operador;
        this.expresion=expresion;
    }


    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"CONDICION",
            id:getGlobConta(),
            columna:this.columna,
            operador:this.operador,
            expresion:this.expresion,
            texto:function(){
                aumentarGlobal();
                let columna=`${getGlobConta()}[label="${this.columna}"]\n${this.id}->${getGlobConta()}\n`;
                aumentarGlobal();
                let operador=`${getGlobConta()}[label="${this.operador}"]\n${this.id}->${getGlobConta()}\n`;
                aumentarGlobal();
                let x=`${getGlobConta()}[label="EXPRESION"]\n ${this.id}->${getGlobConta()}\n`
                let ant=getGlobConta()
                let hijo=this.expresion.GenerarAST()
                let apunt=`${ant}->${hijo.id}\n`
                return `${this.id}[label="${this.label}"]\n${columna}\n${operador}\n${x}\n${hijo.texto()}\n${apunt}\n`
            }
                      
        }
        return nodo;
    }

    ejecutar(entorno){
        let expresion=this.expresion.ejecutar(entorno);
        if(this.operador=="="){
            let val=this.columna==expresion.valor
            return new Dato(val,"BOOLEAN",this.linea,this.columna);
        }else if(this.operador=="<"){
            let val=this.columna<expresion.valor
            return new Dato(val,"BOOLEAN",this.linea,this.columna);
        }else if(this.operador==">"){
            let val=this.columna>expresion.valor
            return new Dato(val,"BOOLEAN",this.linea,this.columna);
        }else if(this.operador=="<="){
            let val=this.columna<=expresion.valor
            return new Dato(val,"BOOLEAN",this.linea,this.columna);
        }else if(this.operador==">="){
            let val=this.columna>=expresion.valor
            return new Dato(val,"BOOLEAN",this.linea,this.columna);
        }else if(this.operador=="!="){
            let val =this.columna!=expresion.valor
            return new Dato(val,"BOOLEAN",this.linea,this.columna);
        }
    }

    actualizarValorColumna(valor){
        this.columna=valor;
    }
    

}

module.exports=Condicion;
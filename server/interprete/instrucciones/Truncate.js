const Instruccion=require('../Instruccion');
const Dato=require('../expresiones/Dato');
const ConsolaSalida=require('../Estructuras/ConsoleOut')
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class Truncate extends Instruccion{
    constructor(numero,cantidad,linea,columna){
        super();
        this.numero=numero;
        this.cantidad=cantidad;
        this.linea=linea;
        this.columna=columna;
    }

    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"TRUNCATE",
            id:getGlobConta(),
            expr1:this.numero,
            expr2:this.cantidad,
            texto:function(){
                aumentarGlobal();
                let p1=`${getGlobConta()}[label="${this.label}"]\n ${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let parizq=`${getGlobConta()}[label="("]\n ${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let parder=`${getGlobConta()}[label=")"]\n ${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let coma=`${getGlobConta()}[label=","]\n ${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let x=`${getGlobConta()}[label="EXPRESION"]\n ${this.id}->${getGlobConta()}\n`
                let ant=getGlobConta()
                let hijo=this.expr1.GenerarAST()
                let apunt=`${ant}->${hijo.id}\n`
                aumentarGlobal();
                let x2=`${getGlobConta()}[label="EXPRESION"]\n ${this.id}->${getGlobConta()}\n`
                let ant2=getGlobConta()
                let hijo2=this.expr2.GenerarAST()
                let apunt2=`${ant2}->${hijo2.id}\n`

                return `${this.id}[label="NATIVAS"]\n${p1}\n${parizq}\n${x}\n${coma}\n${x2}\n${parder}\n${hijo.texto()}\n${apunt}\n${hijo2.texto()}\n${apunt2}`
            }        
        }
        return nodo;
    }

    obtenerTexto(){
        return `TRUNCATE(${this.numero.obtenerTexto()},${this.cantidad.obtenerTexto()})`;
    }

    ejecutar(entorno){
        let num=this.numero.ejecutar(entorno);
        let cant=this.cantidad.ejecutar(entorno);
        if(num.tipo=="DOUBLE" && cant.tipo=="INT"){
            const factor = Math.pow(10, cant.valor);
            let resultado= Math.trunc(num.valor * factor) / factor;
            return new Dato(resultado,"DOUBLE",num.linea,num.columna)
        }else{
            ConsolaSalida.push(`Error Semantico, la funcion Truncate Recibe como parametros un numero de tipo DOUBLE y una cantidad de tipo INT`)
            return new Dato(null,"NULL",this.linea,this.columna)
        }
    }
}

module.exports=Truncate;
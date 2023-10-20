const Instruccion = require('../Instruccion');
const ConsolaSalida=require('../Estructuras/ConsoleOut')
const Entorno=require('../Simbolos/Entorno');
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class While extends Instruccion {
    constructor(condicion, instrucciones) {
        super();
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }


    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"BUCLE",
            id:getGlobConta(),
            Instruccion:this.instrucciones,
            condicion:this.condicion,
            texto:function(){
                let cuerpo=""
                let arbol=[];
                
                aumentarGlobal();
                let aux=getGlobConta();
                let lis=`${getGlobConta()}[label="instrucciones"]\n${this.id}->${getGlobConta()}\n`
                
                aumentarGlobal();
                let beg=`${getGlobConta()}[label="WHILE"]\n${this.id}->${getGlobConta()}\n`

                aumentarGlobal();
                let the=`${getGlobConta()}[label="BEGIN"]\n${this.id}->${getGlobConta()}\n`

                aumentarGlobal();
                let end=`${getGlobConta()}[label="END"]\n${this.id}->${getGlobConta()}\n`

                this.Instruccion.forEach(element => {
                    arbol.push(element.GenerarAST())
                });
                arbol.forEach(element => {
                    cuerpo+=`${aux}->${element.id}\n`
                    cuerpo+=element.texto()+"\n"
                });
                
                aumentarGlobal();
                let x=`${getGlobConta()}[label="EXPRESION"]\n ${this.id}->${getGlobConta()}\n`
                let ant=getGlobConta()
                let hijo=this.condicion.GenerarAST()
                let apunt=`${ant}->${hijo.id}\n`


                return `${this.id}[label="BUCLE"]\n${beg}\n${x}\n${the}\n${hijo.texto()}\n${apunt}\n${lis}\n${cuerpo}\n${end}`
            }

        }
        return nodo;
    }

    ejecutar(entorno) {
        let expresion = this.condicion.ejecutar(entorno);
        if(expresion.tipo=='BOOLEAN'){
            let nuevoEntorno = new Entorno('WHILE', entorno);
            let breakFlag="";
            
            while(expresion.valor){
                for(let i=0;i<this.instrucciones.length;i++){
                    let ins = this.instrucciones[i].ejecutar(nuevoEntorno);
                    breakFlag=ins;
                    if(breakFlag=='BREAK'){
                        break;
                    }
                    if(breakFlag=='CONTINUE'){
                        break;
                    }
                }
                
                if(breakFlag=='BREAK'){
                    break;
                }
                
                if(breakFlag=='CONTINUE'){
                    expresion = this.condicion.ejecutar(entorno);
                    continue;
                }
                
                
                expresion = this.condicion.ejecutar(entorno);
            }
        }else{
            ConsolaSalida.push(`Error Semantico, la condicion del while no es booleana linea: ${this.condicion.linea} columna: ${this.condicion.columna}`)
        }
    }
}

module.exports = While;
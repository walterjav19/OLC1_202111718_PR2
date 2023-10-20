const Instruccion=require('../Instruccion');
const Entorno=require('../Simbolos/Entorno');
const ConsolaSalida=require('../Estructuras/ConsoleOut')
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class IfElse extends Instruccion{
    constructor(expresion,listaIf,listaElse){
        super();
        this.expresion=expresion;
        this.listaIf=listaIf;
        this.listaElse=listaElse;
    }


    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"CONTROL",
            id:getGlobConta(),
            expresion:this.expresion,
            listaIf:this.listaIf,
            listaElse:this.listaElse,
            texto:function(){
                let cuerpo=""
                let arbol=[];
                let cuerpo2=""
                let arbol2=[];

                aumentarGlobal();
                let aux=getGlobConta();
                let lis=`${getGlobConta()}[label="instrucciones"]\n${this.id}->${getGlobConta()}\n`

                aumentarGlobal();
                let aux2=getGlobConta();
                let lis2=`${getGlobConta()}[label="instrucciones"]\n${this.id}->${getGlobConta()}\n`

                aumentarGlobal();
                let si=`${getGlobConta()}[label="IF"]\n${this.id}->${getGlobConta()}\n`

                aumentarGlobal();
                let sino=`${getGlobConta()}[label="ELSE"]\n${this.id}->${getGlobConta()}\n`

                aumentarGlobal();
                let then=`${getGlobConta()}[label="THEN"]\n${this.id}->${getGlobConta()}\n`

                aumentarGlobal();
                let end=`${getGlobConta()}[label="END IF"]\n${this.id}->${getGlobConta()}\n`


                //if normal
                this.listaIf.forEach(element => {
                    arbol.push(element.GenerarAST())
                });
                arbol.forEach(element => {
                    cuerpo+=`${aux}->${element.id}\n`
                    cuerpo+=element.texto()+"\n"
                });

                //else
                this.listaElse.forEach(element => {
                    arbol2.push(element.GenerarAST())
                });
                arbol2.forEach(element => {
                    cuerpo2+=`${aux2}->${element.id}\n`
                    cuerpo2+=element.texto()+"\n"
                });

                aumentarGlobal();
                let x=`${getGlobConta()}[label="EXPRESION"]\n ${this.id}->${getGlobConta()}\n`
                let ant=getGlobConta()
                let hijo=this.expresion.GenerarAST()
                let apunt=`${ant}->${hijo.id}\n`


                return `${this.id}[label="CONTROL"]\n${si}\n${x}\n${hijo.texto()}\n${apunt}\n${then}\n${lis}\n${cuerpo}\n${sino}\n${lis2}\n${cuerpo2}\n${end}`

            }

        }
        return nodo;
    }

    ejecutar(entorno){
        let expresion=this.expresion.ejecutar(entorno);

        if(expresion.tipo=='BOOLEAN'){
            if(expresion.valor){
                let nuevoEntorno=new Entorno('IF',entorno);
                let breakFlag="";
                for(let i=0;i<this.listaIf.length;i++){
                    let ins=this.listaIf[i].ejecutar(nuevoEntorno);
                    breakFlag=ins;
                    if(breakFlag=='BREAK'){
                        break;
                    }
                    if(breakFlag=='CONTINUE'){
                        break;
                    }
                }
                if(breakFlag=='BREAK'){
                    return 'BREAK';
                }
                if(breakFlag=='CONTINUE'){
                    return 'CONTINUE';
                }

            }else{
                let nuevoEntorno=new Entorno('ELSE',entorno);
                let breakFlag="";
                for(let i=0;i<this.listaElse.length;i++){
                    let ins=this.listaElse[i].ejecutar(nuevoEntorno);
                    breakFlag=ins;
                    if(breakFlag=='BREAK'){
                        break;
                    }
                    if(breakFlag=='CONTINUE'){
                        break;
                    }
                }
                if(breakFlag=='BREAK'){
                    return 'BREAK';
                }
                
                if(breakFlag=='CONTINUE'){
                    return 'CONTINUE';
                }
            }
        }else{
            ConsolaSalida.push(`Error Semantico, la expresion no es booleana en la linea ${this.expresion.linea} y columna ${this.expresion.columna}`);
        }
    }
}

module.exports=IfElse;
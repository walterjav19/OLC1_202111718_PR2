const Instruccion=require('../Instruccion');
const Entorno=require('../Simbolos/Entorno');
const ConsolaSalida=require('../Estructuras/ConsoleOut')
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class If extends Instruccion{
    constructor(expresion,Instrucciones){
        super();
        this.expresion=expresion;
        this.Instrucciones=Instrucciones;
    }


    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"CONTROL",
            id:getGlobConta(),
            Instruccion:this.Instrucciones,
            condicion:this.expresion,
            texto:function(){
                let cuerpo=""
                let arbol=[];
                
                aumentarGlobal();
                let aux=getGlobConta();
                let lis=`${getGlobConta()}[label="instrucciones"]\n${this.id}->${getGlobConta()}\n`
                
                aumentarGlobal();
                let beg=`${getGlobConta()}[label="IF"]\n${this.id}->${getGlobConta()}\n`

                aumentarGlobal();
                let the=`${getGlobConta()}[label="THEN"]\n${this.id}->${getGlobConta()}\n`

                aumentarGlobal();
                let end=`${getGlobConta()}[label="END IF"]\n${this.id}->${getGlobConta()}\n`

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


                return `${this.id}[label="CONTROL"]\n${beg}\n${x}\n${the}\n${hijo.texto()}\n${apunt}\n${lis}\n${cuerpo}\n${end}`
            }

        }
        return nodo;
    }

    ejecutar(entorno){
        
        let expresion=this.expresion.ejecutar(entorno);
        if(expresion.tipo=='BOOLEAN'){
            if(expresion.valor){
                let nuevoEntorno=new Entorno('IF',entorno);
                
                let breakflag="";
                for(let i=0;i<this.Instrucciones.length;i++){
                    let ins=this.Instrucciones[i].ejecutar(nuevoEntorno);
                    if(ins=='BREAK'){
                        breakflag=ins;
                        break;
                    }
                    if(ins=='CONTINUE'){
                        breakflag=ins;
                        break;
                    }
                }


                if(breakflag=='BREAK'){
                    return 'BREAK';
                }
                if(breakflag=='CONTINUE'){
                    return 'CONTINUE';
                }
            }
                
        }else{
            ConsolaSalida.push(`Error Semantico, la expresion no es booleana en la linea ${this.expresion.linea} y columna ${this.expresion.columna}`);
        }

    }
}

module.exports=If;
const Instruccion=require('../Instruccion');
const ConsolaSalida=require('../Estructuras/ConsoleOut')
const Entorno=require('../Simbolos/Entorno');
const Dato=require('../expresiones/Dato');
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')
const  ListaContexto=require('../Estructuras/ListaContexto')

class For extends Instruccion{
    constructor(Contador,Inferior,Superior,Instrucciones){
        super();
        this.Contador=Contador;
        this.Inferior=Inferior;
        this.Superior=Superior;
        this.Instrucciones=Instrucciones;
    }

    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"BUCLE",
            id:getGlobConta(),
            contador:this.Contador,
            inferior:this.Inferior,
            superior:this.Superior,
            instrucciones:this.Instrucciones,
            texto:function(){
                let cuerpo=""
                let arbol=[];
                
                aumentarGlobal();
                let auxi=getGlobConta();
                let lis=`${getGlobConta()}[label="instrucciones"]\n${this.id}->${getGlobConta()}\n`


                aumentarGlobal();
                let fo=`${getGlobConta()}[label="FOR"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let cont=`${getGlobConta()}[label="${this.contador}"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let iN=`${getGlobConta()}[label="IN"]\n${this.id}->${getGlobConta()}\n`

                aumentarGlobal();
                let dospto=`${getGlobConta()}[label=".."]\n${this.id}->${getGlobConta()}\n`

                aumentarGlobal();
                let l1=`${getGlobConta()}[label="expresion"]\n${this.id}->${getGlobConta()}\n`
                let aux1=getGlobConta();
                let hijo1=this.inferior.GenerarAST();
                let apuntador1=`${aux1}->${hijo1.id}\n`

                aumentarGlobal();
                let l2=`${getGlobConta()}[label="expresion"]\n${this.id}->${getGlobConta()}\n`
                let aux2=getGlobConta();
                let hijo2=this.superior.GenerarAST();
                let apuntador2=`${aux2}->${hijo2.id}\n`


                this.instrucciones.forEach(element => {
                    arbol.push(element.GenerarAST())
                });
                arbol.forEach(element => {
                    cuerpo+=`${auxi}->${element.id}\n`
                    cuerpo+=element.texto()+"\n"
                });

                return `${this.id}[label=${this.label}]\n${fo}\n${cont}\n${iN}\n${l1}\n${hijo1.texto()}\n${apuntador1}\n${dospto}\n${l2}\n${hijo2.texto()}\n${apuntador2}\n${lis}\n${cuerpo}\n`
            }
        }

        return nodo;
    }

    ejecutar(entorno){
        
        let Inferior=this.Inferior.ejecutar(entorno);
        let Superior=this.Superior.ejecutar(entorno);
        
        if(Inferior.tipo=="INT" && Superior.tipo=="INT"){ 
            let nuevoEntorno = new Entorno('FOR', entorno);
            let data=new Dato(0,"INT",0,0);
            ListaContexto.push(nuevoEntorno)
            nuevoEntorno.AgregarSimbolo(this.Contador,data)
            let breakFlag="";
            for(let i=Inferior.valor;i<=Superior.valor;i++){
                nuevoEntorno.actualizarSimbolo(this.Contador,new Dato(i,"INT",0,0));
                
                for(let j=0;j<this.Instrucciones.length;j++){
                    let ins=this.Instrucciones[j].ejecutar(nuevoEntorno)
                    breakFlag=ins;
                    if(breakFlag=='BREAK'){
                        break;
                    }
                    if(breakFlag=='CONTINUE'){
                        break;
                    }
                }
                if(breakFlag=="BREAK"){
                    break
                }
                if(breakFlag=="CONTINUE"){
                    continue
                }

                
            }
        }else{
            if(Superior.tipo!="INT"){
                ConsolaSalida.push(`Error semantico el limite Superior debe de ser de tipo INT linea:${Superior.linea} columna:${Superior.columna}`);
            }else{
                ConsolaSalida.push(`Error semantico el limite Inferior debe ser de tipo INT linea:${Inferior.linea} columna:${Inferior.columna}`);
            }
        }

    }
}


module.exports=For;
const Instruccion=require('../Instruccion');
const Entorno=require('../Simbolos/Entorno');
const ConsolaSalida=require('../Estructuras/ConsoleOut')
class If extends Instruccion{
    constructor(expresion,Instrucciones){
        super();
        this.expresion=expresion;
        this.Instrucciones=Instrucciones;
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
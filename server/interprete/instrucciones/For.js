const Instruccion=require('../Instruccion');
const ConsolaSalida=require('../Estructuras/ConsoleOut')
const Entorno=require('../Simbolos/Entorno');
const Dato=require('../Expresiones/Dato');

class For extends Instruccion{
    constructor(Contador,Inferior,Superior,Instrucciones){
        super();
        this.Contador=Contador;
        this.Inferior=Inferior;
        this.Superior=Superior;
        this.Instrucciones=Instrucciones;
    }

    ejecutar(entorno){
        
        let Inferior=this.Inferior.ejecutar(entorno);
        let Superior=this.Superior.ejecutar(entorno);
        let data=new Dato(0,"INT",0,0);
        entorno.AgregarSimbolo(this.Contador,data)
        if(Inferior.tipo=="INT" && Superior.tipo=="INT"){ 
            let nuevoEntorno = new Entorno('FOR', entorno);
            let breakFlag="";
            for(let i=Inferior.valor;i<=Superior.valor;i++){
                data.valor=i;
                entorno.actualizarSimbolo(this.Contador,data);
                
                
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
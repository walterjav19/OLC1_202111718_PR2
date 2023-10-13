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
        if(Inferior.tipo=="INT" && Superior.tipo=="INT"){ 
            let nuevoEntorno = new Entorno('FOR', entorno);
            for(let i=Inferior.valor;i<=Superior.valor;i++){
                this.Instrucciones.forEach(element => {
                    element.ejecutar(nuevoEntorno);
                });
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
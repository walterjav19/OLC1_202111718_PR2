const Instruccion=require('../Instruccion')

class CaseBuscado extends Instruccion{
    constructor(listawhen,expresionelse){
        super();
        this.listawhen=listawhen;
        this.expresionelse=expresionelse;
        this.titulo="";
    }

    obtenerTexto(){
        return this.titulo;
    }

    ejecutar(entorno){
        for(let i=0;i<this.listawhen.length;i++){
            let valores=this.listawhen[i].ejecutar(entorno);
            if(valores.expresion1.valor){
                this.titulo=valores.expresion2.valor;
                return valores.expresion2;
            }
        }
        let expresion=this.expresionelse.ejecutar(entorno)
        this.titulo=expresion.valor;
        return expresion;
        
    }
}

module.exports=CaseBuscado;
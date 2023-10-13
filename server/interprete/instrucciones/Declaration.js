const Instruccion=require('../Instruccion')

class Declaration extends Instruccion{
    constructor(id,valor,tipo){
        super();
        this.id=id;
        this.valor=valor;
        this.tipo=tipo;
    }

    ejecutar(entorno){
        if(this.valor==null){
            console.log(this.valor)
            entorno.AgregarSimbolo(this.id,this.valor)
        }else{
            let valor=this.valor.ejecutar(entorno)
            entorno.AgregarSimbolo(this.id,valor)
        }
            
    }

}

module.exports=Declaration;
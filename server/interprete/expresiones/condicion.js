const Instruccion=require('../Instruccion');
const Logica=require('./Logica')
const Dato=require('./Dato');

class Condicion extends Instruccion{
    constructor(columna,operador,expresion){
        super();
        this.columna=columna;
        this.operador=operador;
        this.expresion=expresion;
    }

    ejecutar(entorno){
        let expresion=this.expresion.ejecutar(entorno);
        if(this.operador=="="){
            let val=expresion.valor==this.columna
            return new Dato(val,"BOOLEAN",this.linea,this.columna);
        }else if(this.operador=="<"){
            let val=expresion.valor<this.columna
            return new Dato(val,"BOOLEAN",this.linea,this.columna);
        }else if(this.operador==">"){
            let val=expresion.valor>this.columna
            return new Dato(val,"BOOLEAN",this.linea,this.columna);
        }else if(this.operador=="<="){
            let val=expresion.valor<=this.columna
            return new Dato(val,"BOOLEAN",this.linea,this.columna);
        }else if(this.operador==">="){
            let val=expresion.valor>=this.columna
            return new Dato(val,"BOOLEAN",this.linea,this.columna);
        }else if(this.operador=="!="){
            let val=expresion.valor!=this.columna
            return new Dato(val,"BOOLEAN",this.linea,this.columna);
        }
    }

    actualizarValorColumna(valor){
        this.columna=valor;
    }
    

}

module.exports=Condicion;
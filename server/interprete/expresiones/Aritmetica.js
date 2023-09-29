const Instruccion = require("../Instruccion");

class Aritmetica extends Instruccion {
    constructor(izquierda, operador, derecha) {
        super();
        this.izquierda = izquierda;
        this.derecha = derecha;
        this.operador = operador;
        this.valor = null;
    }

    ejecutar() {
        let izquierda=this.izquierda.ejecutar();
        let derecha;
        if(this.derecha!=null){
            derecha=this.derecha.ejecutar();
        }

        if(this.operador=="+"){
            this.valor= Number(izquierda.valor)+Number(derecha.valor);
            return this
        }if(this.operador=="-"){
            if(this.derecha==null){
                this.valor= Number(izquierda.valor)*-1;
                return this
            }else{
                this.valor= Number(izquierda.valor)-Number(derecha.valor);
                return this
            }
        }if(this.operador=="*"){
            this.valor= Number(izquierda.valor)*Number(derecha.valor);
            return this
        }if(this.operador=="/"){
            this.valor= Number(izquierda.valor)/Number(derecha.valor);
            return this
        }
        if(this.operador=="%"){
            this.valor= Number(izquierda.valor)%Number(derecha.valor);
            return this
        }
    }
}

module.exports = Aritmetica;
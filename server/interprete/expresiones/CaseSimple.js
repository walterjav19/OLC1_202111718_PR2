const Instruccion = require('../Instruccion');
const ConsolaSalida= require("../Estructuras/ConsoleOut");

class CaseSimple extends Instruccion{
    constructor(Id,ListaWhen,InstruccionElse){
        super();
        this.Id = Id;
        this.ListaWhen = ListaWhen;
        this.InstruccionElse = InstruccionElse;
        this.titulo=""
    }

    obtenerTexto(){
        return this.titulo;
    }

    ejecutar(entorno){
        let Data=entorno.obtenerSimbolo(this.Id)
        if(Data){
            for(let i=0;i<this.ListaWhen.length;i++){
                let valor1 = this.ListaWhen[i].expresion1.ejecutar(entorno);
                let valor2 = Data.valor;
                
                if(valor1.valor==valor2){
                    let valor3 = this.ListaWhen[i].expresion2.ejecutar(entorno);
                    this.titulo=valor3.valor;
                    return valor3;
                }
            }

            let expresion=this.InstruccionElse.ejecutar(entorno);
            this.titulo=expresion.valor;
            return expresion;
        }else{
            ConsolaSalida.push("La variable "+this.Id+" no existe")
        }
    }
}
module.exports = CaseSimple;
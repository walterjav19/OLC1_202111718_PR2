const Instruccion=require('../Instruccion');
const Dato=require('../expresiones/Dato');
const ConsolaSalida=require('../Estructuras/ConsoleOut')

class Truncate extends Instruccion{
    constructor(numero,cantidad,linea,columna){
        super();
        this.numero=numero;
        this.cantidad=cantidad;
        this.linea=linea;
        this.columna=columna;
    }

    obtenerTexto(){
        return `TRUNCATE(${this.numero.obtenerTexto()},${this.cantidad.obtenerTexto()})`;
    }

    ejecutar(entorno){
        let num=this.numero.ejecutar(entorno);
        let cant=this.cantidad.ejecutar(entorno);
        if(num.tipo=="DOUBLE" && cant.tipo=="INT"){
            const factor = Math.pow(10, cant.valor);
            let resultado= Math.trunc(num.valor * factor) / factor;
            return new Dato(resultado,"DOUBLE",num.linea,num.columna)
        }else{
            ConsolaSalida.push(`Error Semantico, la funcion Truncate Recibe como parametros un numero de tipo DOUBLE y una cantidad de tipo INT`)
            return new Dato(null,"NULL",this.linea,this.columna)
        }
    }
}

module.exports=Truncate;
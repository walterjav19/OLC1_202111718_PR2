const Instruccion = require("../Instruccion");

class Dato extends Instruccion {
    constructor(valor, tipo,linea,columna) {
        super();
        this.valor = valor;
        this.tipo = tipo;
        this.linea=linea;
        this.columna=columna;
        this.cont=0;
    }
    
    obtenerTexto(){
        let aux="";
        if(this.tipo=="NULL"){
            aux="NULL";
            return aux;
        }
        
        
        return this.valor;
    }

    ejecutar(entorno) {
        if(this.tipo == "VARCHAR"){
            if (this.valor.startsWith('"') && this.valor.endsWith('"') && this.cont==0 || this.valor.startsWith("'") && this.valor.endsWith("'") && this.cont==0) {
                this.valor = this.valor.slice(1,-1);
                this.cont++;
            }
        if(this.valor.includes("\\n")){
            this.valor = this.valor.replaceAll("\\n", "\n");
        }else if(this.valor.includes("\\\\")){
            this.valor = this.valor.replaceAll("\\\\", "\\");
        }else if(this.valor.includes("\\\"")){
            this.valor = this.valor.replaceAll("\\\"", "\"");
        }else if(this.valor.includes("\\t")){
            this.valor = this.valor.replaceAll("\\t", "\t");
        }else if(this.valor.includes("\\\'")){
            this.valor = this.valor.replaceAll("\\\'", "\'");
        }
        }

        if(this.tipo=="INT" || this.tipo=="DOUBLE"){
            this.valor=Number(this.valor);
        }


        if(this.tipo=="BOOLEAN"){
            this.valor=this.valor.toLowerCase();
            if(this.valor=="true"){
                this.valor=true;
            }else{
                this.valor=false;
            }
        }
        
        if(this.tipo=="DATE"){
            this.valor = this.valor.slice(1);
            this.valor = this.valor.slice(0, -1);
        }
        
        if(this.tipo=="NULL"){
            this.valor = null;
            
        }
        
        return this
    }
}
module.exports = Dato;
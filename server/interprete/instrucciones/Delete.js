const Instruccion = require('../Instruccion');
const ConsolaSalida=require('../Estructuras/ConsoleOut');
const Tabla=require("../Estructuras/Tabla");

class Delete extends Instruccion {
    constructor(Tabla,Condicion,listacondiciones){
        super();
        this.Tabla=Tabla;
        this.Condicion=Condicion;
        this.listacondiciones=listacondiciones;
    }

    ejecutar(entorno){
        let tabla=entorno.obtenerTabla(this.Tabla);
        if(tabla){

            let columnasobtenidas=[];
            tabla.listaColumnas.forEach(element => {
                columnasobtenidas.push(element.Nombre);
            });

            let colccon=[]
            this.listacondiciones.forEach(element => {
                colccon.push(element.columna)
            });

            for(let i=0;i<colccon.length;i++){
                if(!columnasobtenidas.includes(colccon[i])){
                    ConsolaSalida.push("No existe la columna "+colccon[i]+" en la tabla "+this.Tabla);
                    return;
                }
            }

            let listaindx=[];
            let table=new Tabla(this.Tabla,tabla.listaColumnas);
            for(let i=0;i<this.listacondiciones.length;i++){
                let aux=table.BucarColumna(this.listacondiciones[i].columna);
                listaindx.push(aux);
             }

            tabla.listaFilas.forEach(fila => {
                let j=0;
                listaindx.forEach(col => {
                    this.listacondiciones[j].actualizarValorColumna(fila[col].valor)
                    j++;
                });
                let expr=this.Condicion.ejecutar(entorno);
                if(expr.valor){
                    tabla.listaFilas.splice(tabla.listaFilas.indexOf(fila),1);
                }
            }); 
        
        }else{
            ConsolaSalida.push("No existe la tabla en la intruccion Delete: "+this.Tabla);
        }


    }
}

module.exports = Delete;
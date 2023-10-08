const Instruccion=require("../Instruccion");
const Tabla=require("../Estructuras/Tabla");
const ConsolaSalida= require("../Estructuras/ConsoleOut");

class Insert extends Instruccion {
    constructor(TableName,listaColumnas,listaValores) {
        super();
        this.TableName = TableName;
        this.listaColumnas = listaColumnas;
        this.listaValores = listaValores;
    }

    ejecutar(entorno) {
        let table=entorno.obtenerTabla(this.TableName)

        if(table){
            if(this.listaColumnas.length==this.listaValores.length){
                let tablaAux=new Tabla(this.TableName,table.listaColumnas);
                
                //encontrar los indices en los que se deben insertar los valores
                let indices=[];
                this.listaColumnas.forEach(element => {
                    indices.push(tablaAux.BucarColumna(element));
                });
                          

                let mapa=new Map();
                for(let i=0;i<indices.length;i++){
                    let expresion=this.listaValores[i].ejecutar(entorno);
                    mapa.set(indices[i],expresion);
                }

                
                
                let filaux=[];
                for(let i=0;i<table.listaColumnas.length;i++){
                    if(indices.includes(i)){
                        filaux.push(mapa.get(i));
                    }else{
                        filaux.push(null);
                    }
                    
                }
                
                //isertamos el registro en la tabla
                table.listaFilas.push(filaux);


            }else{
                ConsolaSalida.push("Error Semantico, La cantidad de columnas no coincide con la cantidad de valores a insertar")
            }
            
            
        }else{
            ConsolaSalida.push("Error Semantico, No existe la tabla "+this.TableName)
        }

    }
}

module.exports = Insert;
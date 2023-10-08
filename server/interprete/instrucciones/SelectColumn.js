const Instruccion=require('../Instruccion');
const ConsolaSalida=require('../Estructuras/ConsoleOut');
const { generarSeparacion, generarEncabezados, generarRegistros} = require('../Estructuras/TableFormatter');


class SelectColumn extends Instruccion{
    constructor(Columnas,Tabla){
        super();
        this.Columnas=Columnas;
        this.Tabla=Tabla;
    }

    ejecutar(entorno){
        let tabla=entorno.obtenerTabla(this.Tabla);
        if(tabla){
            //comprobar que las columnas existan
            
            let columnasobtenidas=[];
            let indice=[]
            tabla.listaColumnas.forEach(element => {
                columnasobtenidas.push(element.Nombre);
            });
            
            for(let i=0;i<this.Columnas.length;i++){
                if(!columnasobtenidas.includes(this.Columnas[i])){
                    ConsolaSalida.push("No existe la columna "+this.Columnas[i]+" en la tabla "+this.Tabla);
                    return;
                }
            }
           

            for(let i=0;i<this.Columnas.length;i++){
                indice.push(tabla.listaColumnas.indexOf(tabla.listaColumnas.find(element=>element.Nombre==this.Columnas[i])))
            }

            let registros=[];
            tabla.listaFilas.forEach(element => {
                let registro=[];
                element.forEach(element2 => {
                    if(element2!=null){
                        if(element2.tipo=="INT" || element2.tipo=="DOUBLE" || element2.tipo=="BOOLEAN"){
                            let aux=String(element2.valor);
                            registro.push(aux);
                        }else{
                            registro.push(element2.valor);
                        }
                        
                    }else{
                        registro.push("null");
                    }
                    
                    
                });
                registros.push(registro);
            });

            //filtramos las columnas
            let registros2=[];
            for(let i=0;i<registros.length;i++){
                let registro=[]
                for(let j=0;j<indice.length;j++){
                    registro.push(registros[i][indice[j]]);
                }
                registros2.push(registro);
            }
            
            
            
            ConsolaSalida.push(generarSeparacion(this.Columnas.length));
            ConsolaSalida.push(generarEncabezados(this.Columnas));
            ConsolaSalida.push(generarSeparacion(this.Columnas.length));

            registros2.forEach(element => {
                ConsolaSalida.push(generarRegistros(element));
                ConsolaSalida.push(generarSeparacion(this.Columnas.length));
            })
            

        }else{
            ConsolaSalida.push("No existe la tabla "+this.Tabla)
        }
    }

}




module.exports=SelectColumn;




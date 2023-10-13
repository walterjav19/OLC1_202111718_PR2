const Instruccion=require('../Instruccion');
const ConsolaSalida=require('../Estructuras/ConsoleOut');
const { generarSeparacion, generarEncabezados, generarRegistros} = require('../Estructuras/TableFormatter');
const Tabla=require("../Estructuras/Tabla");

class SelectWhere extends Instruccion{
    constructor(listaColumnas,Tabla,condicion,listacondiciones){
        super();
        this.listaColumnas=listaColumnas;
        this.Tabla=Tabla;
        this.condicion=condicion;
        this.listacondiciones=listacondiciones;

    }

    ejecutar(entorno){

       

       let tabla=entorno.obtenerTabla(this.Tabla);
       if(tabla){

           let columnasobtenidas=[];
           tabla.listaColumnas.forEach(element => {
               columnasobtenidas.push(element.Nombre);
           });

           for(let i=0;i<this.listaColumnas.length;i++){
               if(!columnasobtenidas.includes(this.listaColumnas[i])){
                   ConsolaSalida.push("No existe la columna "+this.listaColumnas[i]+" en la tabla "+this.Tabla);
                   return;
               }
           }

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

           
            //traer tabla
            let indice=[]
            for(let i=0;i<this.listaColumnas.length;i++){
                indice.push(tabla.listaColumnas.indexOf(tabla.listaColumnas.find(element=>element.Nombre==this.listaColumnas[i])))
            }
            let registros=[];
            tabla.listaFilas.forEach(element => {
                let registro=[];
                element.forEach(element2 => {
                    if(element2!=null){
                        if(element2.tipo=="INT" || element2.tipo=="DOUBLE" || element2.tipo=="BOOLEAN"){
                            let aux=element2.valor;
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
            let listaindx=[]
            let tablaAux=new Tabla(this.Tabla,tabla.listaColumnas);
            
            for(let i=0;i<this.listacondiciones.length;i++){
                let aux=tablaAux.BucarColumna(this.listacondiciones[i].columna);
                listaindx.push(aux);
            }
            

            ConsolaSalida.push(generarSeparacion(this.listaColumnas.length));
            ConsolaSalida.push(generarEncabezados(this.listaColumnas));
            ConsolaSalida.push(generarSeparacion(this.listaColumnas.length));
            let i=0;
            registros2.forEach(element => {
                let j=0;
                listaindx.forEach(col => {
                    this.listacondiciones[j].actualizarValorColumna(registros[i][col])
                    j++;
                })
                console.log(this.condicion.ejecutar(entorno))
                let expr=this.condicion.ejecutar(entorno);
                if(expr.valor){
                    ConsolaSalida.push(generarRegistros(element.map(element=>element.toString())));
                    ConsolaSalida.push(generarSeparacion(this.listaColumnas.length));
                }

                i++;
            })
            
            //restablecemos los nombres de las columnas
            for(let k=0;k<this.listacondiciones.length;k++){
                this.listacondiciones[k].columna=colccon[k];
            }
       }else{
           ConsolaSalida.push("No existe la tabla "+this.Tabla)
       }
       
   }
        
        
}

module.exports=SelectWhere;
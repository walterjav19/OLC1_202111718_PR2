const Instruccion=require('../Instruccion');
const ConsolaSalida=require('../Estructuras/ConsoleOut');
const Tabla=require("../Estructuras/Tabla");

class Update extends Instruccion{

    constructor(Tabla,mapa,condicion,listacondiciones){
        super();
        this.Tabla=Tabla;
        this.mapa=mapa;
        this.condicion=condicion;
        this.listacondiciones=listacondiciones;
    }

    ejecutar(entorno){
        let tabla=entorno.obtenerTabla(this.Tabla);
        //ejecutamos las expresiones del seteo
        let newvalores=[];
        for (let [clave, valor] of this.mapa) {
            newvalores.push(valor.ejecutar(entorno));
        }

        if(tabla){
           let columnasobtenidas=[];
           tabla.listaColumnas.forEach(element => {
               columnasobtenidas.push(element.Nombre);
            });
            let indices=[];
            let table=new Tabla(this.Tabla,tabla.listaColumnas);
            for (let [clave] of this.mapa) {
                indices.push(table.BucarColumna(clave));
                if(!columnasobtenidas.includes(clave)){
                    ConsolaSalida.push("No existe la columna "+clave+" en la tabla "+this.Tabla);
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

           let listaindx=[];
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
            let expr=this.condicion.ejecutar(entorno);
            if(expr.valor){//actualizamos
                indices.forEach(indice => {
                    fila[indice].valor=newvalores[indices.indexOf(indice)].valor;
                });
                
            }
            //console.log(this.condicion.ejecutar(entorno));
            //console.log(fila);
           });

           //restablecemos los nombres de las columnas
           for(let k=0;k<this.listacondiciones.length;k++){
            this.listacondiciones[k].columna=colccon[k];
           }

        }else{
            ConsolaSalida.push("No existe la tabla en la instruccion Update"+this.Tabla);
        }
    }
}

module.exports=Update;
const Instruccion = require('../Instruccion');
const ConsolaSalida=require('../Estructuras/ConsoleOut');
const Tabla=require("../Estructuras/Tabla");
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')


class Delete extends Instruccion {
    constructor(Tabla,Condicion,listacondiciones){
        super();
        this.Tabla=Tabla;
        this.Condicion=Condicion;
        this.listacondiciones=listacondiciones;
    }

    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"DELETE",
            id:getGlobConta(),
            tabla:this.Tabla,
            condicion:this.Condicion,
            texto:function(){
                aumentarGlobal();
                let del=`${getGlobConta()}[label="DELETE"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let from=`${getGlobConta()}[label="FROM"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let tabla=`${getGlobConta()}[label="${this.tabla}"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let whe=`${getGlobConta()}[label="WHERE"]\n${this.id}->${getGlobConta()}\n`

                aumentarGlobal();
                let x=`${getGlobConta()}[label="CONDICION"]\n ${this.id}->${getGlobConta()}\n`
                let ant=getGlobConta()
                let hijo=this.condicion.GenerarAST()
                let apunt=`${ant}->${hijo.id}\n`

                return `${this.id}[label="${this.label}"]\n${del}\n${from}\n${tabla}\n${whe}\n${x}\n${apunt}${hijo.texto()}`
            }
        }

        return nodo;
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

            let nuevasfilas=[];
            tabla.listaFilas.forEach(fila => {
                let j=0;
                listaindx.forEach(col => {
                    this.listacondiciones[j].actualizarValorColumna(fila[col].valor)
                    j++;
                });
                let expr=this.Condicion.ejecutar(entorno);
                if(!expr.valor){
                    //tabla.listaFilas.splice(tabla.listaFilas.indexOf(fila),1);
                    nuevasfilas.push(tabla.listaFilas[tabla.listaFilas.indexOf(fila)])
                }
            }); 
            //actualizamos las filas
            tabla.listaFilas=nuevasfilas;
            
            //restablecemos los nombres de las columnas
            for(let k=0;k<this.listacondiciones.length;k++){
                this.listacondiciones[k].columna=colccon[k];
            }

        }else{
            ConsolaSalida.push("No existe la tabla en la intruccion Delete: "+this.Tabla);
        }


    }
}

module.exports = Delete;
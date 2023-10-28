const Instruccion=require("../Instruccion");
const ConsolaSalida=require('../Estructuras/ConsoleOut');
const { generarSeparacion, generarEncabezados, generarRegistros} = require('../Estructuras/TableFormatter');
const Tabla=require("../Estructuras/Tabla");
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class SelectAllTable extends Instruccion{
    constructor(Tabla,condicion,listacondiciones){
        super();
        this.Tabla=Tabla;
        this.condicion=condicion;
        this.listacondiciones=listacondiciones;

    }


    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"SELECT",
            id:getGlobConta(),
            tabla:this.Tabla,
            condicion:this.condicion,
            texto:function(){
                aumentarGlobal();
                let select=`${getGlobConta()}[label="SELECT"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let mult=`${getGlobConta()}[label="*"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let from=`${getGlobConta()}[label="FROM"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let tabla=`${getGlobConta()}[label="${this.tabla}"]\n${this.id}->${getGlobConta()}\n`

                aumentarGlobal();
                let where=`${getGlobConta()}[label="WHERE"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let x=`${getGlobConta()}[label="CONDICION"]\n ${this.id}->${getGlobConta()}\n`
                let ant=getGlobConta();
                let hijo=this.condicion.GenerarAST()
                let apunt=`${ant}->${hijo.id}\n`

                return `${this.id}[label=${this.label}]\n${select}\n${mult}\n${from}\n${tabla}\n${where}\n${x}\n${hijo.texto()}\n${apunt}\n`
            }

        }
        return nodo
    }

    ejecutar(entorno){
        let tabla=entorno.obtenerTabla(this.Tabla);
        if(tabla!=null){
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

            //obtener encabezados
            let encabezados=[];
            tabla.listaColumnas.forEach(element => {
                encabezados.push(element.Nombre);
            });


            ConsolaSalida.push(generarSeparacion(encabezados.length));
            ConsolaSalida.push(generarEncabezados(encabezados));
            ConsolaSalida.push(generarSeparacion(encabezados.length));
            
            let listaindx=[]
            let tablaAux=new Tabla(this.Tabla,tabla.listaColumnas);
            
            for(let i=0;i<this.listacondiciones.length;i++){
                let aux=tablaAux.BucarColumna(this.listacondiciones[i].columna);
                listaindx.push(aux);
            }
            let i=0;
            
            registros.forEach(element => {
                let j=0;
                listaindx.forEach(col => {
                    this.listacondiciones[j].actualizarValorColumna(registros[i][col])
                    j++;
                })
                let expr=this.condicion.ejecutar(entorno);
                if(expr.valor){
                    ConsolaSalida.push(generarRegistros(element));
                    ConsolaSalida.push(generarSeparacion(encabezados.length));
                }
                i++;
            })
            

        }else{
            ConsolaSalida.push("No existe la tabla "+this.id)
        }
    }
}

module.exports=SelectAllTable;
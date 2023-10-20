const Instruccion=require('../Instruccion');
const ConsolaSalida=require('../Estructuras/ConsoleOut');
const Tabla=require("../Estructuras/Tabla");
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')



class Update extends Instruccion{

    constructor(Tabla,mapa,condicion,listacondiciones){
        super();
        this.Tabla=Tabla;
        this.mapa=mapa;
        this.condicion=condicion;
        this.listacondiciones=listacondiciones;
    }

    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"UPDATE",
            id:getGlobConta(),
            Tabla:this.Tabla,
            mapa:this.mapa,
            condicion:this.condicion,
            texto:function(){
                aumentarGlobal();
                let upda=`${getGlobConta()}[label="UPDATE"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let tab=`${getGlobConta()}[label="${this.Tabla}"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let set=`${getGlobConta()}[label="SET"]\n${this.id}->${getGlobConta()}\n`
                let lista="";
                for (let [clave, valor] of this.mapa) {
                    aumentarGlobal();
                    lista+=`${getGlobConta()}[label="${clave}"]\n${this.id}->${getGlobConta()}\n`
                    aumentarGlobal();
                    lista+=`${getGlobConta()}[label="="]\n${this.id}->${getGlobConta()}\n`
                    aumentarGlobal();
                    lista+=`${getGlobConta()}[label="${valor.valor}"]\n${this.id}->${getGlobConta()}\n`
                    
                }
                aumentarGlobal();
                let where=`${getGlobConta()}[label="WHERE"]\n${this.id}->${getGlobConta()}\n`

                aumentarGlobal();
                let x=`${getGlobConta()}[label="CONDICION"]\n ${this.id}->${getGlobConta()}\n`
                let ant=getGlobConta()
                let hijo=this.condicion.GenerarAST()
                let apunt=`${ant}->${hijo.id}\n`

                return `${this.id}[label=${this.label}]\n${upda}\n${tab}\n${set}\n${lista}\n${where}\n${x}\n${hijo.texto()}\n${apunt}`
            }

        }
        return nodo
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
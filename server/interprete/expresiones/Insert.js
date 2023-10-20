const Instruccion=require("../Instruccion");
const Tabla=require("../Estructuras/Tabla");
const ConsolaSalida= require("../Estructuras/ConsoleOut");
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class Insert extends Instruccion {
    constructor(TableName,listaColumnas,listaValores) {
        super();
        this.TableName = TableName;
        this.listaColumnas = listaColumnas;
        this.listaValores = listaValores;
    }

    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"DML",
            id:getGlobConta(),
            nombre:this.TableName,
            columnas:this.listaColumnas,
            valores:this.listaValores,
            texto:function(){
                aumentarGlobal();
                let create=`${getGlobConta()}[label="INSERT"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let table=`${getGlobConta()}[label="INTO"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let nombre=`${getGlobConta()}[label="${this.nombre}"]\n${this.id}->${getGlobConta()}\n`

                let lista1=""
                this.columnas.forEach(element => {
                    aumentarGlobal();
                    lista1+=`${getGlobConta()}[label="${element}"]\n${this.id}->${getGlobConta()}\n`
                });

                aumentarGlobal();
                let val=`${getGlobConta()}[label="VALUES"]\n${this.id}->${getGlobConta()}\n`

                let lista2=""   
                this.valores.forEach(element => {
                    aumentarGlobal();
                    lista2+=`${getGlobConta()}[label="EXPRESION"]\n ${this.id}->${getGlobConta()}\n`
                    let ant=getGlobConta()
                    let hijo=element.GenerarAST()
                    lista2+=`${hijo.texto()}\n${ant}->${hijo.id}\n`
                });


                aumentarGlobal();
                let PAIZ=`${getGlobConta()}[label="("]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let PADER=`${getGlobConta()}[label=")"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let PAIZ2=`${getGlobConta()}[label="("]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let PADER2=`${getGlobConta()}[label=")"]\n${this.id}->${getGlobConta()}\n`
                return `${this.id}[label=${this.label}]\n${create}\n${table}\n${nombre}\n${PAIZ}\n${lista1}\n${PADER}\n${val}\n${PAIZ2}\n${lista2}\n${PADER2}\n`
            }

        }
        return nodo
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
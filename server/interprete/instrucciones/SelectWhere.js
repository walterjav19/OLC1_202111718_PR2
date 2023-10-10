const Instruccion=require('../Instruccion');
const ConsolaSalida=require('../Estructuras/ConsoleOut');
const { generarSeparacion, generarEncabezados, generarRegistros} = require('../Estructuras/TableFormatter');
const Tabla=require("../Estructuras/Tabla");

class SelectWhere extends Instruccion{
    constructor(listaColumnas,Tabla,columna,operador,expresion){
        super();
        this.listaColumnas=listaColumnas;
        this.Tabla=Tabla;
        this.columna=columna;
        this.operador=operador;
        this.expresion=expresion;

    }

    ejecutar(entorno){
        let tabla=entorno.obtenerTabla(this.Tabla);
        let exp=this.expresion.ejecutar(entorno);
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
            
            if(!columnasobtenidas.includes(this.columna)){
                ConsolaSalida.push("No existe la columna "+this.columna+" en la tabla "+this.Tabla);
                return;
            }


            let indice=[]
            for(let i=0;i<this.listaColumnas.length;i++){
                indice.push(tabla.listaColumnas.indexOf(tabla.listaColumnas.find(element=>element.Nombre==this.listaColumnas[i])))
            }

            if(this.operador=="="){
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
                
                
                let tablaAux=new Tabla(this.Tabla,tabla.listaColumnas);
                let indx=tablaAux.BucarColumna(this.columna);
                ConsolaSalida.push(generarSeparacion(this.listaColumnas.length));
                ConsolaSalida.push(generarEncabezados(this.listaColumnas));
                ConsolaSalida.push(generarSeparacion(this.listaColumnas.length));
                let cont=0;
                registros2.forEach(element => {
                    
                    console.log(registros[cont][indx],exp.valor);
                    if(String(registros[cont][indx])==String(exp.valor)){
                        ConsolaSalida.push(generarRegistros(element));
                        ConsolaSalida.push(generarSeparacion(this.listaColumnas.length));
                    }
                    cont++;
                })
            }


        }else{
            ConsolaSalida.push("No existe la tabla "+this.Tabla)
        }
        
    }
}

module.exports=SelectWhere;
const Instruccion=require('../Instruccion');
const ConsolaSalida=require('../Estructuras/ConsoleOut');
const { generarSeparacion, generarEncabezados, generarRegistros} = require('../Estructuras/TableFormatter');
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')



class SelectTable extends Instruccion{
    constructor(Tabla){
        super();
        this.Tabla=Tabla;
    }   



    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"SELECT",
            id:getGlobConta(),
            tabla:this.Tabla,
            texto:function(){
                aumentarGlobal();
                let select=`${getGlobConta()}[label="SELECT"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let mult=`${getGlobConta()}[label="*"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let from=`${getGlobConta()}[label="FROM"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let tabla=`${getGlobConta()}[label="${this.tabla}"]\n${this.id}->${getGlobConta()}\n`
                return `${this.id}[label=${this.label}]\n${select}\n${mult}\n${from}\n${tabla}\n`
            }

        }
        return nodo
    }



    ejecutar(entorno){
        let tabla=entorno.obtenerTabla(this.Tabla);
        if(tabla){
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
            
            

            registros.forEach(element => {
                ConsolaSalida.push(generarRegistros(element));
                ConsolaSalida.push(generarSeparacion(encabezados.length));
            })
            

        }else{
            ConsolaSalida.push("No existe la tabla "+this.Tabla)
        }
    }


}


module.exports = SelectTable;
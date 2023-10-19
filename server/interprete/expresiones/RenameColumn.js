const Instruccion=require('../Instruccion');
const ConsolaSalida= require("../Estructuras/ConsoleOut");
const Tabla=require("../Estructuras/Tabla");
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class RenameColumn extends Instruccion{
    constructor(TableName,oldName,newName){
        super();
        this.TableName=TableName;
        this.oldName=oldName;
        this.newName=newName;
    }

    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"ALTER",
            id:getGlobConta(),
            table:this.TableName,
            oldname:this.oldName,
            name:this.newName,
            texto:function(){
                aumentarGlobal()
                let alt=`${getGlobConta()}[label="ALTER"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let tabla=`${getGlobConta()}[label="TABLE"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let nombre=`${getGlobConta()}[label="${this.table}"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let rename=`${getGlobConta()}[label="RENAME"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let col=`${getGlobConta()}[label="COLUMN"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let oldn=`${getGlobConta()}[label="${this.oldname}"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let to=`${getGlobConta()}[label="TO"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal()
                let newn=`${getGlobConta()}[label="${this.name}"]\n${this.id}->${getGlobConta()}\n`

                return `${this.id}[label=${this.label}]\n${alt}\n${tabla}\n${nombre}\n${rename}\n${col}\n${oldn}\n${to}\n${newn}\n`
            }
        }

        return nodo
    }


    ejecutar(entorno){
        let tabla=entorno.obtenerTabla(this.TableName);
        if(tabla!=null){
            for(let i=0;i<tabla.listaColumnas.length;i++){
                if(tabla.listaColumnas[i].Nombre==this.oldName){
                    tabla.listaColumnas[i].Nombre=this.newName;
                    return;
                }
            }
            ConsolaSalida.push("No existe la columna "+this.oldName+" en la tabla "+this.TableName);
        }else{
            ConsolaSalida.push("No existe la tabla "+this.TableName);
        }
    }
}

module.exports=RenameColumn;
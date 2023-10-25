const Instruccion=require('../Instruccion');
const Tabla=require('../Estructuras/Tabla');
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class Create extends Instruccion{
    constructor(nombre,listaColumnas,linea,columna){
        super();
        this.nombre=nombre;
        this.listaColumnas=listaColumnas;
        this.listaverdad=null;
        this.nombreoriginal=null;
        this.linea=linea;
        this.columna=columna;
    }


    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"DDL",
            id:getGlobConta(),
            columnas:this.listaverdad,
            nombre:this.nombreoriginal,
            texto:function(){
                aumentarGlobal();
                let create=`${getGlobConta()}[label="CREATE"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let table=`${getGlobConta()}[label="TABLE"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let PAIZ=`${getGlobConta()}[label="("]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let nombre=`${getGlobConta()}[label="${this.nombre}"]\n${this.id}->${getGlobConta()}\n`

                let lista=""
                for(let i=0;i<this.columnas.length;i++){
                    aumentarGlobal();
                    lista+=`${getGlobConta()}[label="${this.columnas[i].Nombre}"]\n${this.id}->${getGlobConta()}\n`
                    aumentarGlobal();
                    lista+=`${getGlobConta()}[label="${this.columnas[i].Tipo}"]\n${this.id}->${getGlobConta()}\n`
                }
                aumentarGlobal();
                let PADER=`${getGlobConta()}[label=")"]\n${this.id}->${getGlobConta()}\n`
                return `${this.id}[label="${this.label}"]\n${create}\n${table}\n${nombre}\n${PAIZ}\n${lista}\n${PADER}\n`
            }

        }
        return nodo
    }


    ejecutar(entorno){
        this.listaverdad=JSON.parse(JSON.stringify(this.listaColumnas));
        this.nombreoriginal=JSON.parse(JSON.stringify(this.nombre));
        let tabla=new Tabla(this.nombre,this.listaColumnas,this.linea,this.columna);
        entorno.AgregarTabla(this.nombre,tabla);
    }
}
module.exports=Create;
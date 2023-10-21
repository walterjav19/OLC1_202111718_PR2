const  Instruccion=require('../Instruccion');
const Entorno=require('../Simbolos/Entorno');
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')
const  ListaContexto=require('../Estructuras/ListaContexto')

class Procedure extends Instruccion{
    constructor(id,listaParametros,listaInstrucciones,linea,columna){
        super();
        this.id=id;
        this.listaParametros=listaParametros;
        this.listaInstrucciones=listaInstrucciones;
        this.entorno=null;
        this.linea=linea;
        this.columna=columna;
    }



    GenerarAST(){
        let aux=this.id;
        aumentarGlobal();
        let nodo={
            label:"PROCEDURE",
            id:getGlobConta(),
            nom:aux,
            parametros:this.listaParametros,
            Instruccion:this.listaInstrucciones,
            texto:function(){
                let cuerpo=""
                let arbol=[];

                aumentarGlobal();
                let aux=getGlobConta();
                let lis=`${getGlobConta()}[label="instrucciones"]\n${this.id}->${getGlobConta()}\n`

                aumentarGlobal();
                let create=`${getGlobConta()}[label="CREATE"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let func=`${getGlobConta()}[label="PROCEDURE"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let nombre=`${getGlobConta()}[label="${this.nom}"]\n${this.id}->${getGlobConta()}\n`

                let listaparam=""
                if(this.parametros){
                    this.parametros.Declaraciones.forEach(element => {
                        aumentarGlobal();
                        listaparam+=`${getGlobConta()}[label="${element.id}"]\n${this.id}->${getGlobConta()}\n`
                        aumentarGlobal();
                        listaparam+=`${getGlobConta()}[label="${element.tipo}"]\n${this.id}->${getGlobConta()}\n`
                    });
                }

                this.Instruccion.forEach(element => {
                    arbol.push(element.GenerarAST())
                });
                arbol.forEach(element => {
                    cuerpo+=`${aux}->${element.id}\n`
                    cuerpo+=element.texto()+"\n"
                });

                
                
                return `${this.id}[label=${this.label}]\n${create}\n${func}\n${nombre}\n${listaparam}\n${lis}\n${cuerpo}\n`
            }
        }
        return nodo
    }


    ejecutar(entorno){
        let nuevoEntorno=new Entorno('PROCEDURE',entorno);
        ListaContexto.push(nuevoEntorno)
        if(this.listaParametros){
            this.listaParametros.ejecutar(nuevoEntorno)
        }
        this.entorno=nuevoEntorno;
        entorno.AgregarProcedimiento(this.id,this);
    }
}
module.exports=Procedure;
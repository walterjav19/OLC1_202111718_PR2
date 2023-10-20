const Instruccion=require('../Instruccion');
const Entorno=require('../Simbolos/Entorno');
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class Function extends Instruccion{
    constructor(id, parametros,tipo,instrucciones,devolver,linea,columna){
        super();
        this.id=id;
        this.parametros=parametros;
        this.tipo=tipo;
        this.instrucciones=instrucciones;
        this.devolver=devolver;
        this.linea=linea;
        this.columna=columna;
        this.entorno=null;
    }

    GenerarAST(){
        aumentarGlobal();
        let aux=this.id;
        let nodo={
            label:"FUNCTION",
            id:getGlobConta(),
            nom:aux,
            parametros:this.parametros,
            tipo:this.tipo,
            Instruccion:this.instrucciones,
            devolver:this.devolver,
            texto:function(){
                let cuerpo=""
                let arbol=[];

                aumentarGlobal();
                let aux=getGlobConta();
                let lis=`${getGlobConta()}[label="instrucciones"]\n${this.id}->${getGlobConta()}\n`

                aumentarGlobal();
                let create=`${getGlobConta()}[label="CREATE"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let func=`${getGlobConta()}[label="FUNCTION"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let nombre=`${getGlobConta()}[label="${this.nom}"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let ret=`${getGlobConta()}[label="RETURNS"]\n${this.id}->${getGlobConta()}\n`
                aumentarGlobal();
                let tipo=`${getGlobConta()}[label="${this.tipo}"]\n${this.id}->${getGlobConta()}\n`

                let listaparam=""
                this.parametros.Declaraciones.forEach(element => {
                    aumentarGlobal();
                    listaparam+=`${getGlobConta()}[label="${element.id}"]\n${this.id}->${getGlobConta()}\n`
                    aumentarGlobal();
                    listaparam+=`${getGlobConta()}[label="${element.tipo}"]\n${this.id}->${getGlobConta()}\n`
                });

                this.Instruccion.forEach(element => {
                    arbol.push(element.GenerarAST())
                });
                arbol.forEach(element => {
                    cuerpo+=`${aux}->${element.id}\n`
                    cuerpo+=element.texto()+"\n"
                });
                aumentarGlobal();
                let ar=getGlobConta();
                let rto=`${getGlobConta()}[label="RETURN"]\n${aux}->${getGlobConta()}\n`
                aumentarGlobal();
                let rto2=`${getGlobConta()}[label="RETURN"]\n${ar}->${getGlobConta()}\n`
                aumentarGlobal();
                let devolver=`${getGlobConta()}[label="${this.devolver.id}"]\n${ar}->${getGlobConta()}\n`
                
                return `${this.id}[label=${this.label}]\n${create}\n${func}\n${nombre}\n${listaparam}\n${ret}\n${tipo}\n${lis}\n${cuerpo}\n${rto}\n${rto2}\n${devolver}\n`
            }
        }
        return nodo
    }

    ejecutar(entorno){
        let nuevoEntorno=new Entorno('FUNCION',entorno);
        this.parametros.ejecutar(nuevoEntorno)
        this.entorno=nuevoEntorno;
        entorno.AgregarFuncion(this.id,this);
    }
}
module.exports=Function;
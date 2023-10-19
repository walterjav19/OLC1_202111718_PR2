const Instruccion=require('../Instruccion');
const Entorno=require('../Simbolos/Entorno');
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')


class BeginEnd extends Instruccion{
    constructor(instrucciones){
        super();
        this.instrucciones=instrucciones;
    }

    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"BLOQUE",
            id:getGlobConta(),
            Instruccion:this.instrucciones,
            texto:function(){
                let cuerpo=""
                let arbol=[];
                
                aumentarGlobal();
                let aux=getGlobConta();
                let lis=`${getGlobConta()}[label="instrucciones"]\n${this.id}->${getGlobConta()}\n`
                
                aumentarGlobal();
                let beg=`${getGlobConta()}[label="BEGIN"]\n${this.id}->${getGlobConta()}\n`

                aumentarGlobal();
                let end=`${getGlobConta()}[label="END"]\n${this.id}->${getGlobConta()}\n`

                this.Instruccion.forEach(element => {
                    arbol.push(element.GenerarAST())
                });
                arbol.forEach(element => {
                    cuerpo+=`${aux}->${element.id}\n`
                    cuerpo+=element.texto()+"\n"
                });
                
                return `${this.id}[label="BLOQUE"]\n${beg}\n${lis}\n${end}\n${cuerpo}\n`
            }

        }
        return nodo;
    }

    ejecutar(entorno){
        let nuevoEntorno=new Entorno("begin",entorno);
        this.instrucciones.forEach(instruccion => {
            instruccion.ejecutar(nuevoEntorno);
        });
    }

}

module.exports=BeginEnd;
const Instruccion=require('../Instruccion')
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class ListDeclaration extends Instruccion{
    constructor(Declaraciones){
        super();
        this.Declaraciones=Declaraciones;
    }

    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"DECLARATION",
            id:getGlobConta(),
            declaraciones:this.Declaraciones,
            texto:function(){
                let lista=""
                let i=0
                aumentarGlobal();
                let dec=`${getGlobConta()}[label="DECLARE"]\n ${this.id}->${getGlobConta()}\n`
                this.declaraciones.forEach(declaracion => {
                    if(i!=this.declaraciones.length-1){
                        aumentarGlobal();
                        lista+=`${getGlobConta()}[label="${declaracion.id}"]\n ${this.id}->${getGlobConta()}\n`
                        aumentarGlobal();
                        lista+=`\n${getGlobConta()}[label="${declaracion.tipo}"]\n ${this.id}->${getGlobConta()}\n`
                        aumentarGlobal();
                        lista+=`${getGlobConta()}[label=","]\n ${this.id}->${getGlobConta()}\n`
                    }else{
                        aumentarGlobal();
                        lista+=`${getGlobConta()}[label="${declaracion.id}"]\n ${this.id}->${getGlobConta()}\n`
                        aumentarGlobal();
                        lista+=`\n${getGlobConta()}[label="${declaracion.tipo}"]\n ${this.id}->${getGlobConta()}\n`
                    }
                    i++;
                });
                aumentarGlobal();
                let pyc=`${getGlobConta()}[label=";"]\n ${this.id}->${getGlobConta()}\n`
                return `${this.id}[label="DECLARACION"]\n${dec}\n${lista}\n${pyc}\n`
            }
            
        }
        return nodo;
    }

    ejecutar(entorno){
        this.Declaraciones.forEach(declaracion => {
            declaracion.ejecutar(entorno);
        });
    }

}

module.exports=ListDeclaration;
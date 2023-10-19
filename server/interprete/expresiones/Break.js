const Instruccion=require('../Instruccion')
const {aumentarGlobal,getGlobConta}=require('../Estructuras/Contador')

class Break extends Instruccion{
    constructor(nombre,linea,columna) {
        super();
        this.linea=linea;
        this.columna=columna;
        this.nombre=nombre;
    }

    GenerarAST(){
        aumentarGlobal();
        let nodo={
            label:"TRANSFER",
            id:getGlobConta(),
            texto:function(){
                aumentarGlobal();
                let brek=`${getGlobConta()}[label="BREAK"]\n ${this.id}->${getGlobConta()}\n`
                return `${this.id}[label=${this.label}]\n${brek}`
            }

        }
        return nodo
    }

    ejecutar(entorno){
        if(entorno.nombre=="IF"  || entorno.nombre=="FOR" || entorno.nombre=="WHILE" || entorno.nombre=="ELSE"){
            return 'BREAK';
        }
    }
}

module.exports = Break;
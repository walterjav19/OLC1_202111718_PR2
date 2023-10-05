const Instruccion=require('../Instruccion');
const Tabla=require('../Estructuras/Tabla');

class Create extends Instruccion{
    constructor(nombre,listaColumnas){
        super();
        this.nombre=nombre;
        this.listaColumnas=listaColumnas;
    }

    ejecutar(entorno){
        let tabla=new Tabla(this.nombre,this.listaColumnas);
        entorno.AgregarTabla(this.nombre,tabla);
    }
}
module.exports=Create;
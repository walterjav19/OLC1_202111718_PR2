class Tabla{
    constructor(nombre,listaColumnas){
        this.nombre=nombre;
        this.listaColumnas=listaColumnas;
    }

    toString(){
        console.log(this.listaColumnas) 
    }


}

module.exports=Tabla;
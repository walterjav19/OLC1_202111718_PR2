class Tabla{

    constructor(nombre,listaColumnas){
        this.nombre=nombre;
        this.listaColumnas=listaColumnas;
        this.listaFilas=[];
    }

    BucarColumna(nombre){
        for(let i=0;i<this.listaColumnas.length;i++){
            if(this.listaColumnas[i].nombre==nombre){
                return this.listaColumnas[i];
            }
        }
        return null;
    }

}

module.exports=Tabla;
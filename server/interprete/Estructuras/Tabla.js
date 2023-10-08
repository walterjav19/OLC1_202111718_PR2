class Tabla{

    constructor(nombre,listaColumnas){
        this.nombre=nombre;
        this.listaColumnas=listaColumnas;
        this.listaFilas=[];
    }

    BucarColumna(nombre){
        for(let i=0;i<this.listaColumnas.length;i++){
            if(this.listaColumnas[i].Nombre==nombre){
                return i;
            }
        }
        return null;
    }

}

module.exports=Tabla;
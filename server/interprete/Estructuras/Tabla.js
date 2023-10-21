class Tabla{

    constructor(nombre,listaColumnas,linea,columna){
        this.nombre=nombre;
        this.listaColumnas=listaColumnas;
        this.listaFilas=[];
        this.linea=linea;
        this.columna=columna;
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
const Instruccion=require('../Instruccion');
const ConsolaSalida=require('../Estructuras/ConsoleOut');
const tabularDatos=require('../Estructuras/TableFormatter');

class SelectColumn extends Instruccion{
    constructor(Columnas,Tabla){
        super();
        this.Columnas=Columnas;
        this.Tabla=Tabla;
    }

    ejecutar(entorno){
        let tabla=entorno.obtenerTabla(this.Tabla);
        if(tabla){
            //comprobar que las columnas existan
            

        }else{
            ConsolaSalida.push("No existe la tabla "+this.Tabla)
        }
    }

}
module.exports=SelectColumn;

const producto = "Nintendo";
const cantidad = "1.00";
const subtotal = "$152,986.22";
const longitudProducto = producto.length;
const longitudCantidad = 7;
const longitudSubtotal = subtotal.length;
const separadorColumnas = "|";
const separadorColumnasEnSeparador = "+";
const columnasEncabezado = [{ contenido: "Producto", maximaLongitud: longitudProducto }, { contenido: "Cant.", maximaLongitud: longitudCantidad }, { contenido: "Precio", maximaLongitud: longitudSubtotal },];
const columnasContenido = [{ contenido: producto, maximaLongitud: longitudProducto }, { contenido: cantidad, maximaLongitud: longitudCantidad }, { contenido: subtotal, maximaLongitud: longitudSubtotal }];
const lineasEncabezado = tabularDatos(columnasEncabezado, " ", separadorColumnas);
const lineasSeparador = tabularDatos([{ contenido: "-", maximaLongitud: longitudProducto }, { contenido: "-", maximaLongitud: longitudCantidad }, { contenido: "-", maximaLongitud: longitudSubtotal }], "-", separadorColumnasEnSeparador);
const lineasCuerpo = tabularDatos(columnasContenido, " ", separadorColumnas);

for (const linea of lineasEncabezado) {
    console.log(linea);
}
for (const linea of lineasSeparador) {
    console.log(linea);
}

for (const linea of lineasCuerpo) {
    console.log(linea);
}
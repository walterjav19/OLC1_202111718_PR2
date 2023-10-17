class Entorno{
    constructor(nombre,anterior){
        this.nombre=nombre;
        this.anterior=anterior;
        this.TablaSimbolos=new Map();
        this.Tablas=new Map();
        this.Funciones=new Map();
        this.Procedimientos=new Map();
    }

    AgregarFuncion(clave,valor){
        this.Funciones.set(clave,valor);
    }
    
    obtenerFuncion(clave){
        let valor=this.Funciones.get(clave);
        let nuevoEntorno=this.anterior;
        while(nuevoEntorno!=null && valor == undefined ){
            valor=nuevoEntorno.Funciones.get(clave);
            nuevoEntorno=nuevoEntorno.anterior;
        }
        
        return valor
    }

    AgregarSimbolo(clave,valor){
        this.TablaSimbolos.set(clave,valor);
    }

    AgregarTabla(clave,valor){
        this.Tablas.set(clave,valor);
    }

    obtenerSimbolo(clave){
        let valor=this.TablaSimbolos.get(clave);
        let nuevoEntorno=this.anterior;
        while(nuevoEntorno!=null && valor == undefined ){
            valor=nuevoEntorno.TablaSimbolos.get(clave);
            nuevoEntorno=nuevoEntorno.anterior;
        }
        
        return valor
    }

    obtenerTabla(clave){
        let valor=this.Tablas.get(clave);
        let nuevoEntorno=this.anterior;
        while(nuevoEntorno!=null && valor == undefined ){
            valor=nuevoEntorno.Tablas.get(clave);
            nuevoEntorno=nuevoEntorno.anterior;
        }
        
        return valor
    }

    actualizarSimbolo(clave, valor) {
        // Buscar en los entornos locales primero
        let currentEntorno = this;
        while (currentEntorno != null) {
            if (currentEntorno.TablaSimbolos.has(clave)) {
                currentEntorno.TablaSimbolos.set(clave, valor);
                return true; // Variable encontrada y actualizada correctamente
            }
            currentEntorno = currentEntorno.anterior;
        }

        // Si no se encuentra en los entornos locales, buscar en el entorno global
        if (this.anterior != null) {
            const encontrado = this.anterior.actualizarSimbolo(clave, valor);
            if (encontrado) {
                return true; // Variable encontrada y actualizada en el entorno global
            }
        }

        return false; // Variable no encontrada en ningún entorno
    }


    actualizarTabla(clave) {
        let valor = this.Tablas.get(clave);
        let entornoEncontrado = this;
        
        while (entornoEncontrado != null && valor === undefined) {
            valor = entornoEncontrado.Tablas.get(clave);
            if (valor !== undefined) {
                return entornoEncontrado; // Devuelve el entorno donde se encontró la variable
            }
            entornoEncontrado = entornoEncontrado.anterior;
        }
        if(valor!=undefined){
            return entornoEncontrado; // Devuelve el entorno donde se encontró la variable
        }
        return null; // Devuelve null si la variable no se encuentra en ningún entorno
    }


}

/* let global=new Entorno("global",null);
global.AgregarSimbolo("var1",2)
global.AgregarSimbolo("var2","3")
global.AgregarSimbolo("var3","hola mundo")   


let local=new Entorno("local",global);
local.AgregarSimbolo("flag",true)
console.log(local.actualizarSimbolo("var3","este es el nuevo valor"))
console.log(local.actualizarSimbolo("carro","nissan"))
console.log(local.actualizarSimbolo("h","final"))
console.log(global.TablaSimbolos)
console.log(local.TablaSimbolos) */

module.exports=Entorno;
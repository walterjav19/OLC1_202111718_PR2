class Entorno{
    constructor(nombre,anterior){
        this.nombre=nombre;
        this.anterior=anterior;
        this.TablaSimbolos=new Map();
    }

    AgregarSimbolo(clave,valor){
        this.TablaSimbolos.set(clave,valor);
    }

    obtenerSimbolo(clave){
        let valor=this.TablaSimbolos.get(clave);
        while(this.anterior!=null && valor == undefined ){
            let nuevoEntorno=this.anterior;
            valor=nuevoEntorno.TablaSimbolos.get(clave);
        }
        
        return valor
    }
}

/* let global=new Entorno("global",null);
global.AgregarSimbolo("var1",2)
global.AgregarSimbolo("var2","3")
global.AgregarSimbolo("var3","hola mundo")   
console.log(global.TablaSimbolos);

let local=new Entorno("local",global);
local.AgregarSimbolo("carro","sedan")
local.AgregarSimbolo("flag",true)
console.log(local.obtenerSimbolo("flag")); */


module.exports=Entorno;
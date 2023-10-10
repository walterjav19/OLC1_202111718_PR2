const parser=require('../Analizador/parser.js')
const Lista_Tokens=require('../interprete/Estructuras/ListaTokens.js')
const Entorno=require('../interprete/Simbolos/Entorno.js')
const ConsolaSalida=require('../interprete/Estructuras/ConsoleOut.js')
const Lista_Errores=require('../interprete/Estructuras/ListaErrores.js')

const index = (req, res) =>{
    res.status(200).json({message: 'Bienvenido a mi api'});
}

const analizar = (req, res) =>{ 
    const {entrada} = req.body;
    //limpiar la lista de token
    Lista_Tokens.length=0;
    ConsolaSalida.length=0;
    Lista_Errores.length=0;
    const result = parser.parse(entrada);
    console.log(result)
    Global=new Entorno("Global",null);

    if (result[0]!=''){
        result.forEach(element => {
            try{
                element.ejecutar(Global)
            }catch(error){
                console.log(error)
            }
            
        });
    }
    

    //console.log(Global.Tablas.get('Clientes').listaFilas)
    res.status(200).json({
        message:"Analisis Realizado",
        entrada:entrada,
        salida:ConsolaSalida});    
}

const TablaToken= (req, res) =>{
    res.render('T_Tokens.ejs',{Tokens:Lista_Tokens});
}

const TablaErrores= (req, res) =>{
    res.render('T_Errores.ejs',{Errores:Lista_Errores});
}

module.exports={
    index,
    analizar,
    TablaToken,
    TablaErrores
}
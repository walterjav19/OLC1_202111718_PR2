const parser=require('../Analizador/parser.js')
const Print=require('../interprete/instrucciones/Print')
const Lista_Tokens=require('../interprete/Estructuras/ListaTokens.js')
const Entorno=require('../interprete/Simbolos/Entorno.js')
const ConsolaSalida=require('../interprete/Estructuras/ConsoleOut.js')

const index = (req, res) =>{
    res.status(200).json({message: 'Bienvenido a mi api'});
}

const analizar = (req, res) =>{ 
    const {entrada} = req.body;
    //limpiar la lista de token
    Lista_Tokens.length=0;
    ConsolaSalida.length=0;
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
    

    //console.log(Global)
    
    res.status(200).json({
        message:"Analisis Realizado",
        entrada:entrada,
        salida:ConsolaSalida});    
}

const TablaToken= (req, res) =>{
    res.render('T_Tokens.ejs',{Tokens:Lista_Tokens});
}

module.exports={
    index,
    analizar,
    TablaToken
}
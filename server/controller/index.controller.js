const parser=require('../Analizador/parser.js')
const Print=require('../interprete/instrucciones/Print')
const Lista_Tokens=require('../Estructuras/ListaTokens.js')

const index = (req, res) =>{
    res.status(200).json({message: 'Bienvenido a mi api'});
}

const analizar = (req, res) =>{ 
    const {entrada} = req.body;
    //limpiar la lista de token
    Lista_Tokens.length=0;
    const result = parser.parse(entrada);
    console.log(Lista_Tokens)
    let consola=[]
    console.log(result)
    result.forEach(element => {
        
        consola.push(element.ejecutar());
        
        
    }); 
    res.status(200).json({
        message:"Analisis Realizado",
        entrada:entrada,
        salida:consola});    
}

const TablaToken= (req, res) =>{
    res.render('T_Tokens.ejs',{Tokens:Lista_Tokens});
}

module.exports={
    index,
    analizar,
    TablaToken
}
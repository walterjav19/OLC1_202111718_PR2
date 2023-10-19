const parser=require('../Analizador/parser.js')
const Lista_Tokens=require('../interprete/Estructuras/ListaTokens.js')
const Entorno=require('../interprete/Simbolos/Entorno.js')
const ConsolaSalida=require('../interprete/Estructuras/ConsoleOut.js')
const Lista_Errores=require('../interprete/Estructuras/ListaErrores.js')
const {resetGlobConta}=require('../interprete/Estructuras/Contador.js')
const Dato=require('../interprete/expresiones/Dato.js')
let cuerpo=""
const index = (req, res) =>{
    res.status(200).json({message: 'Bienvenido a mi api'});
}

const analizar = (req, res) =>{ 
    const {entrada} = req.body;
    //limpiar la lista de token
    resetGlobConta();
    Lista_Tokens.length=0;
    ConsolaSalida.length=0;
    Lista_Errores.length=0;
    const result = parser.parse(entrada);
    console.log(result)
    Global=new Entorno("Global",null);
    //Global.AgregarSimbolo("@prueba",new Dato(4,'INT',0,0))
    if (result[0]!=''){
        result.forEach(element => {
            try{
                element.ejecutar(Global)
            }catch(error){
                console.log(error)
            }
            
        });
    }
    let arbol=[]
    if (result[0]!=''){
        result.forEach(element => {
            try{
                arbol.push(element.GenerarAST())
            }catch(error){
                console.log(error)
            }
            
        });
    }
    cuerpo=""
    try{
        arbol.forEach(element => {
            cuerpo+=`0->${element.id}\n`
            cuerpo+=element.texto()+"\n"
        });
    }catch(e){
        console.error(e)
        ConsolaSalida.push("Error al generar el AST")
    }
    //console.log(cuerpo)

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

const GenerarAST= (req, res) =>{

    let texto=`https://quickchart.io/graphviz?graph=digraph L{ordering="out" 0[label="instrucciones"]${encodeURIComponent(cuerpo)}}`
    res.render('AST.ejs',{ imageUrl: texto});
}

module.exports={
    index,
    analizar,
    TablaToken,
    TablaErrores,
    GenerarAST
}
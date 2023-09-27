const parser=require('../Analizador/parser.js')

const index = (req, res) =>{
    res.status(200).json({message: 'Bienvenido a mi api'});
}

const analizar = (req, res) =>{ 
    const {entrada} = req.body;
    const result = parser.parse(entrada);
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


module.exports={
    index,
    analizar
}
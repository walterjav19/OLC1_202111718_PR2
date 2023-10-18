let GlobConta=0;

const aumentarGlobal=()=>{
    GlobConta++;
}

const getGlobConta=()=>{
    return GlobConta;
}

const resetGlobConta=()=>{
    GlobConta=0;
}

module.exports = {aumentarGlobal,getGlobConta,resetGlobConta};
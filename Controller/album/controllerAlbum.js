/********************************************************
* Objetivo: Controle referente as ações de Crud de Musica
* Data: 11/02/2025
* Autor: Matheus Bueno
* Versão: 1.0
 ********************************************************/

// Import do arquivo de messagens e status code
const message = require('../../modulo/config.js')

// Import DAO para realizar o include no banco de dados
const albumDAO = require('../../model/DAO/album.js')


// funçao para atualizar uma musica
const atualizarAlbum = async function(id, album, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (album.nome == '' || 
                album.nome == null  ||
                album.nome == undefined || 
                album.nome.length > 100 || 
                album.data_lancamento == null || 
                album.data_lancamento == undefined || 
                album.data_lancamento.length > 50 ||
                id == '' || 
                id == undefined ||
                id == null ||
                isNaN(id)

            ) 
            {  
                return message.ERROR_REQUIRED_FIELDS //status code 400  
            }else{
                // VERIFICA SE O ID EXISTE NO BCD
                let result = await albumDAO.selectByidAlbum(id)

                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){

                        // adiciona o atributo Do no JSON com os dados recevidos no corpo de requisiição
                        album.id = id

                        let resultAlbum = await albumDAO.updateAlbum(album)
                        
                        if(resultAlbum){
                            return message.SUCESS_UPDATE_ITEM
                        }else{
                            return message.ERROR_INTERNAL_SERVER_MODEL
                        }
                    }else{
                        return message.ERROR_CONTENT_NOT_FOUND
                    }
                }
            }  

        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
    
}







// funcao para inserir uma musica
const inserirAlbum = async function (album, contentType) {
    try {
        
        if (String(contentType).toLowerCase() == 'application/json') {
            if (album.nome == '' || 
                album.nome == null  ||
                album.nome == undefined || 
                album.nome.length > 100 || 
                album.data_lancamento == null || 
                album.data_lancamento == undefined || 
                album.data_lancamento.length > 50 
            ) {  
                return message.ERROR_REQUIRED_FIELDS //status code 400  
        
            }else{
                // encaminhando os dados da musica para o DAO realizar o insert no Banco de Dados
                let resultAlbum = await albumDAO.InsertAlbum(album)
        
                if (resultAlbum) 
                    return message.SUCESS_CREATED_ITEM
                    
                    
                else
                    return message.ERROR_INTERNAL_SERVER_MODEL
                
            }
        }else{
          return message.ERROR_CONTENT_TYPE//415  
        }
        
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
   
    

}

// função para excluir uma musica
const excluirAlbum = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS


        }else{
            // Antes de excluir, estamos verificando se existe um ID
            let resultAlbum = await albumDAO.selectByidAlbum(id)

            if(resultAlbum != false || typeof (resultAlbum)== 'object'){
                if (resultAlbum.length > 0) {
                    
                    let result = await albumDAO.deleteAlbum(id)
                        if (result) 
                            return message.SUCESS_DELETE_ITEM

                        else
                            return message.ERROR_INTERNAL_SERVER_CONTROLLER
                            
                } else {
                    return message.ERROR_CONTENT_NOT_FOUND
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER 
    }
}

// funçao para retornar uma lista de musicas
const listarAlbum = async function() {
    try {
        let dadosAlbum = {}

        let resultAlbum = await albumDAO.selectAllAlbum()       

        if(resultAlbum != false || typeof(resultAlbum)== 'object'){

            if(resultAlbum.length > 0){
            // cria um JSON para colocar o array de musicas
                dadosAlbum.status = true
                dadosAlbum.status_code = 200,
                dadosAlbum.items = resultAlbum.length
                dadosAlbum.albuns = resultAlbum

                return dadosAlbum
        }else{
            return message.ERROR_CONTENT_NOT_FOUND//404
        }
    }else{
        return message.ERROR_INTERNAL_SERVER_MODEL//500
    }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    } 
}
//  funçao para retornar musica com base no ID
const buscarAlbum = async function(id) {
    try {

    if (id == '' || id == undefined || id == null || isNaN(id)) {
    return message.ERROR_REQUIRED_FIELDS
} else {
    
        let dadosAlbum = {}

        let resultAlbum = await albumDAO.selectByidAlbum(id)       

        if(resultAlbum != false || typeof(resultAlbum) == 'object'){

            if(resultAlbum.length > 0){
            // cria um JSON para oclocar o array de musicas
                dadosAlbum.status = true
                dadosAlbum.status_code = 200,
                dadosAlbum.albuns = resultAlbum

                return dadosAlbum
        }else{
            return message.ERROR_CONTENT_NOT_FOUND//404
        }
    }else{
        return message.ERROR_INTERNAL_SERVER_MODEL//500
    }}

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirAlbum,
    atualizarAlbum, 
    excluirAlbum, 
    listarAlbum, 
    buscarAlbum
}
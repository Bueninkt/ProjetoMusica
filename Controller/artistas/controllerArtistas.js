/********************************************************
* Objetivo: Controle referente as ações de Crud de Musica
* Data: 11/02/2025
* Autor: Matheus Bueno
* Versão: 1.0
 ********************************************************/

// Import do arquivo de messagens e status code
const message = require('../../modulo/config.js')

// Import DAO para realizar o include no banco de dados
const artistasDAO = require('../../model/DAO/artistas.js')


// funçao para atualizar uma musica
const atualizarArtistas = async function(id, artistas, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            if (artistas.nome == '' || 
                artistas.nome == null  ||
                artistas.nome == undefined || 
                artistas.nome.length > 100 || 
                artistas.tipos_integrantes == null || 
                artistas.tipos_integrantes == undefined || 
                artistas.tipos_integrantes.length > 50 ||
                artistas.quantidade == null || 
                artistas.quantidade == undefined || 
                artistas.quantidade.length > 50 ||
                artistas.id_album == '' || 
                artistas.id_album == undefined ||
                id == '' || 
                id == undefined ||
                id == null ||
                isNaN(id)
            ) 
            {  
                return message.ERROR_REQUIRED_FIELDS //status code 400  
            }else{
                // VERIFICA SE O ID EXISTE NO BCD
                let result = await artistasDAO.selectByidArtistas(id)

                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){

                        // adiciona o atributo Do no JSON com os dados recevidos no corpo de requisiição
                        artistas.id = id

                        let result = await artistasDAO.updateArtistas(artistas)
                        
                        if(result){
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
const inserirArtistas = async function (artistas, contentType) {
    try {
        
        if (String(contentType).toLowerCase() == 'application/json') {
            if (artistas.nome == '' || 
                artistas.nome == null  ||
                artistas.nome == undefined || 
                artistas.nome.length > 100 || 
                artistas.tipos_integrantes == null || 
                artistas.tipos_integrantes == undefined || 
                artistas.tipos_integrantes.length > 50 ||
                artistas.quantidade == null || 
                artistas.quantidade == undefined || 
                artistas.quantidade.length > 50 ||
                artistas.id_album == '' || 
                artistas.id_album == undefined 

            ) {  
                return message.ERROR_REQUIRED_FIELDS //status code 400  
        
            }else{
                // encaminhando os dados da musica para o DAO realizar o insert no Banco de Dados
                let resultArtistas = await artistasDAO.InsertArtistas(artistas)
        
                if (resultArtistas) 
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
const excluirArtistas = async function(id) {
    try {
        if (id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRED_FIELDS


        }else{
            // Antes de excluir, estamos verificando se existe um ID
            let resultArtistas = await artistasDAO.selectByidArtistas(id)

            if(resultArtistas != false || typeof (resultArtistas)== 'object'){
                if (resultArtistas.length > 0) {
                    
                    let result = await artistasDAO.deleteArtistas(id)
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
const listarArtistas = async function() {
    try {
        let arrayArtistas = []

        let dadosArtistas = {}

        let resultArtistas = await artistasDAO.selectAllArtistas()       

        if(resultArtistas != false || typeof(resultArtistas) == 'object'){

            if(resultArtistas.length > 0){
            // cria um JSON para colocar o array de musicas
                dadosArtistas.status = true
                dadosArtistas.status_code = 200,
                dadosArtistas.items = resultArtistas.length
                dadosArtistas.artistas = resultArtistas


                for(const itemArtistas of resultArtistas){
                    
                    let dadosAlbum = await controllerArtistas.buscarArtistas(itemArtistas.id_album)

                    itemAlbum.album = dadosAlbum.album
                    
                    delete itemAlbum.id_album

                
                    



                }









                return dadosArtistas
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
const buscarArtistas = async function(id) {
    try {

    if (id == '' || id == undefined || id == null || isNaN(id)) {
    return message.ERROR_REQUIRED_FIELDS
} else {
    
        let dadosArtistas = {}

        let resultArtistas = await artistasDAO.selectByidArtistas(id)       

        if(resultArtistas != false || typeof(resultArtistas) == 'object'){

            if(resultArtistas.length > 0){
            // cria um JSON para oclocar o array de musicas
                dadosArtistas.status = true
                dadosArtistas.status_code = 200,
                dadosArtistas.artistas = resultArtistas

                return dadosArtistas
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
    inserirArtistas,
    atualizarArtistas, 
    excluirArtistas, 
    listarArtistas, 
    buscarArtistas
}
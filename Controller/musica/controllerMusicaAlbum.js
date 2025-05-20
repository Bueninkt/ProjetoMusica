/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme Genero
 * Data: 11/02/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const musicaAlbumDAO = require('../../model/DAO/musica_album.js')

//Função para tratar a inserção de um novo genero no DAO
const inserirMusicaAlbum = async function(musicaAlbum, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    musicaAlbum.id_musica           == ''           || musicaAlbum.id_musica     == undefined    || musicaAlbum.id_musica == null || isNaN(musicaAlbum.id_musica)  || musicaAlbum.id_musica <=0 ||
                    musicaAlbum.id_album           == ''           || musicaAlbum.id_album    == undefined    || musicaAlbum.id_album == null || isNaN(musicaAlbum.id_album) || musicaAlbum.id_album<=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultAlbum = await musicaAlbumDAO.insertMusicaAlbum(musicaAlbum)

                    if(resultAlbum)
                        return message.SUCCESS_CREATED_ITEM //201
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a atualização de um genero no DAO
const atualizarMusicaAlbum = async function(id, musicaAlbum, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                                == ''           || id                       == undefined    || id                    == null || isNaN(id)  || id  <= 0   ||
                    musicaAlbum.id_musica             == ''           || musicaAlbum.id_musica     == undefined    || musicaAlbum.id_musica  == null || isNaN(musicaAlbum.id_musica  )  || musicaAlbum.id_musica <=0 ||
                    musicaAlbum.id_album           == ''           || musicaAlbum.id_album    == undefined    || musicaAlbum.id_album == null || isNaN(musicaAlbum.id_album) || musicaAlbum.id_album<=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultAlbum = await musicaAlbumDAO.selectByIdMusicaAlbum(parseInt(id))

                    if(resultAlbum != false || typeof(resultAlbum) == 'object'){
                        if(resultAlbum.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            album.id = parseInt(id)

                            let result = await musicaAlbumDAO.updateAlbum(musicaAlbum)

                            if(result){
                                return message.SUCCESS_UPDATED_ITEM //200
                            }else{
                                return message.ERROR_INTERNAL_SERVER_MODEL //500
                            }
                        }else{
                            return message.ERROR_NOT_FOUND //404
                        }
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }
            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a exclusão de um genero no DAO
const excluirMusicaAlbum = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultAlbum = await musicaAlbumDAO.selectByIdMusicaAlbum(parseInt(id))

            if(resultAlbum != false || typeof(resultAlbum) == 'object'){
                //Se existir, faremos o delete
                if(resultAlbum.length > 0){
                    //delete
                    let result = await musicaAlbumDAO.deleteMusicaAlbum(parseInt(id))

                    if(result){
                        return message.SUCCESS_DELETED_ITEM //200
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de uma lista de generos do DAO
const listarMusicaAlbum = async function(){
    try {
        //Objeto do tipo JSON
        let dadosAlbum = {}
        //Chama a função para retornar os generos cadastrados
        let resultAlbum = await musicaAlbumDAO.selectAllMusicaAlbum()

        if(resultAlbum != false || typeof(resultAlbum) == 'object'){
            if(resultAlbum.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosAlbum.status = true
                dadosAlbum.status_code = 200
                dadosAlbum.items = resultAlbum.length
                dadosAlbum.musics = resultAlbum

                return dadosgenero
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de um genero filtrando pelo ID do DAO
const buscarMusicaAlbum = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosAlbum = {}

            let resultAlbum = await musicaAlbumDAO.selectByIdMusicaAlbum(parseInt(id))
            
            if(resultAlbum != false || typeof(resultAlbum) == 'object'){
                if(resultAlbum.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosAlbum.status = true
                    dadosAlbum.status_code = 200
                    dadosAlbum.album = resultAlbum

                    return dadosAlbum //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para retornar os generos relacionados a um filme
const buscarAlbumPorMusica = async function(idMusica){
    try {
        if(idMusica == '' || idMusica == undefined || idMusica == null || isNaN(idMusica) || idMusica <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosAlbum = {}

            let resultAlbum = await musicaAlbumDAO.selectAlbumByIdMusica (parseInt(idMusica))
            
            if(resultAlbum != false || typeof(resultAlbum) == 'object'){
                if(resultAlbum.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosAlbum.status = true
                    dadosAlbum.status_code = 200
                    dadosAlbum.album = resultAlbum

                    return dadosAlbum //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}





module.exports = {
    inserirMusicaAlbum,
    atualizarMusicaAlbum,
    excluirMusicaAlbum,
    listarMusicaAlbum,
    buscarMusicaAlbum,
    buscarAlbumPorMusica
} 
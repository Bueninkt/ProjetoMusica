/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de FilmeGeneros
 * Data: 11/02/2025
 * Autor: Marcel
 * Versão: 1.0
 ******************************************************************************************************/
//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo FilmeGenero
const insertMusicaAlbum = async function(musicaAlbum){
  try {

      let sql = `insert into tbl_musica_album  ( 
                                          id_musica,
                                          id_album
                                        ) 
                                          values 
                                        (
                                          ${musicaAlbum.id_musica},
                                          ${musicaAlbum.id_album}
                                        )`
      //console.log(sql)

      //Executa o scriptSQL no banco de dados e aguarda o retorno do BD para 
      //saber se deu certo                                  
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
          return true
      else
          return false
  } catch (error) {
      
      return false
  }
}

//Função para atualizar um FilmeGenero existente
const updateMusicaAlbum = async function(musicaAlbum){
  try {
      let sql = `update tbl_musica_album set        id_musica       = ${musicaAlbum.id_musica},
                                                    id_album    = ${musicaAlbum.idAlbum},
                                                    where id = ${musicaAlbum.id}    
                                          
                            `
      let resultMusicaAlbum = await prisma.$executeRawUnsafe(sql)

      if(resultMusicaAlbum)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um FilmeGenero existente
const deleteMusicaAlbum = async function(id){
  try {
    let sql = `delete from tbl_musica_album where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todos os FilmeGeneros existentes
const selectAllMusicaAlbum = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_musica_album order by id desc'

      //Executa o scriptSQL no BD e aguarda o retorno dos dados
      let result = await prisma.$queryRawUnsafe(sql)

      if(result)
        return result
      else
        return false

    } catch (error) {
      return false
    }
}

//Função para buscar um FilmeGenero pelo ID
const selectByIdMusicaAlbum = async function(id){
  try {
    let sql = `select * from tbl_musica_album where id = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar os filmes pelo genero
const selectMusicaByIdAlbum = async function(idAlbum){
  try {
      let sql = `select tbl_musica.* from tbl_musica
                                            inner join tbl_musica_album
                                              on tbl_musica.id = tbl_musica_album.id_musica
                                            inner join tbl_album
                                              on tbl_album.id = tbl_musica_album.id_album
                                              where tbl_musica_album.id_musica = ${idAlbum}
                                              `       

      let result = await prisma.$queryRawUnsafe(sql)

    if (result)
        return result
    else 
        return false
  } catch (error) {
      return false
  }
}

//Função para retornar os generos pelo Filme
const selectAlbumByIdMusica = async function(idMusica){
 try {
      let sql = `select tbl_album.* from tbl_musica 
                                            inner join tbl_musica_album
                                              on tbl_musica.id = tbl_musica_album.id_musica
                                            inner join tbl_album
                                              on tbl_album.id = tbl_musica_album.id_album
                                          where tbl_musica_album.id_musica = ${idMusica}
                `
                  
      let result = await prisma.$queryRawUnsafe(sql)

    if (result)
        return result
    else 
        return false
  } catch (error) {
      return false
  }
}


module.exports = {
    insertMusicaAlbum,
    updateMusicaAlbum,
    deleteMusicaAlbum,
    selectMusicaByIdAlbum,
    selectAllMusicaAlbum,
    selectByIdMusicaAlbum,
    selectAlbumByIdMusica
} 
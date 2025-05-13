/***************** 
* Objetivo: Criar Crud de dados da tabela de musica do Banco de Dados
* Data: 11/02/2025
* Autor: Matheus
* Versão: 1.0

 ******************************/
// Import Da Biblioteca do prisma cliente para realizar as ações no Banco de Dados

// função para inserir uma musica

const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()


const InsertAlbum = async function(album){
    try {

        let sql = `Insert into tbl_album ( data_lancamento,
                                                nome
                                            )
                                            values(
                                                '${album.data_lancamento}',
                                                '${album.nome}'
                                                    
    
        )`
    // executa o script Mysql, retorna resultado do banco de dados    
    // await()
     
        let result = await prisma.$executeRawUnsafe(sql)
    
        if(result)
            return true
        else
            return false
        
        } catch (error) {
            console.log(error)
            return false
        }
    
    
    }



// funçao para atualizar uma musica existente
const updateAlbum = async function(album){
    try {
        let sql = `update tbl_album set nome =  '${album.nome}',
                                        data_lancamento = '${album.data_lancamento}'
                                        `

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) 
            return true
    
        else
            return false

    } catch (error) {
       return false 
    }
}

// funçao para excluir uma musica existente 
const deleteAlbum = async function(id){
    try {
        let sql = `delete from tbl_album where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) 
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}

// funcao para retornar todas as musica do Banco de Dados
const selectAllAlbum = async function(){
    try {
        let sql = 'select * from tbl_album order by id desc'
      // quando mandar script que devolvem valor usar o query
        let result = await prisma.$queryRawUnsafe(sql)
  
          if (result) 
              return result
           else 
              return false
          
  
      } catch (error) {
          return false
      }
}       

// funçao para buscar uma musica pelo ID
const selectByidAlbum = async function(id){
    try {
        let sql = `select * from tbl_album where id = ${id}`

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
    InsertAlbum,
    updateAlbum,
    deleteAlbum,
    selectAllAlbum,
    selectByidAlbum
}
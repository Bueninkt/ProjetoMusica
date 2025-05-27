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


const InsertArtistas = async function(artistas){
    try {

        let sql = `Insert into tbl_artistas( tipos_integrantes,
                                                nome, quantidade
                                            )
                                            values(
                                                '${artistas.tipos_integrantes}',
                                                '${artistas.nome}',
                                                '${artistas.quantidade}',
        

                                                    
        )`
    // executa o script Mysql, retorna resultado do banco de dados    
    // awartistas
     
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
const updateArtistas = async function(artistas){
    try {
        let sql = `update tbl_artistas set nome =  '${artistas.nome}',
                                        tipos_integrantes = '${artistas.tipos_integrantes}',
                                        quantidade = '${artistas.quantidade}',
                                        where id = '${musicaAlbum.id}' 
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
const deleteArtistas = async function(id){
    try {
        let sql = `delete from tbl_artistas where id = ${id}`

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
const selectAllArtistas = async function(){
    try {
        let sql = 'select * from tbl_artistas order by id desc'
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
const selectByidArtistas = async function(id){
    try {
        let sql = `select * from tbl_artistas where id = ${id}`

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
    InsertArtistas,
    updateArtistas,
    deleteArtistas,
    selectAllArtistas,
    selectByidArtistas
}
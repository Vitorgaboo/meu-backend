import express, { request, response } from 'express';
import cors from 'cors'
import { PrismaClient } from './generated/prisma/index.js'

const prisma = new PrismaClient()

const app = express();
app.use(express.json())
app.use(cors())
const users = [];

 app.post('/usuarios', async(req,res)=>{ //Rota de Criação
    await prisma.user.create({
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    
    res.status(201).json(req.body)
 });

 //Rota de listagem 
app.get('/usuarios', async(req, res) =>{ // req de requisição, e res de resposta 
    let users = []
    if(req.query){
        users = await prisma.user.findMany({
            where:{
                name:req.query.name,
                email:req.query.email,
                 age:req.query.age
            }
        })
    }else{
        const users = await prisma.user.findMany()
    }
    res.status(200).json(users) // usando a resposta para dizer, ok deu bom!
})
app.put('/usuarios/:id', async(req,res)=>{ //Rota de Criação
    await prisma.user.update({
        where:{
            id: req.params.id
        },
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    
    res.status(201).json(req.body)
 });

 app.delete('/usuarios/:id', async(req,res)=>{
    await prisma.user.delete({
        where:{
            id: req.params.id
        },
    })
        res.status(201).json({message: 'usuário deletado com sucesso!'})

 })

app.listen(3000)//A porta que o servidor vai rodar epara ele roda eu digito no terminal node e o nome do arquivo que quero rodar

/*
Criar nossa API de Usuários
-Criar um usuário 
-Listas todos os usuários
-Editar um usuário
-Deletar um usuário
*/


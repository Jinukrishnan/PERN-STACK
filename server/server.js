import express from 'express';
import cors from 'cors'
import pool from './DB.js'
import { PrismaClient } from '@prisma/client'
const app=express()

const prisma=new PrismaClient()


// middleware
app.use(cors())
app.use(express.json())

// ROUTES
// create todo
app.post("/todos",async(req,res)=>{
    try {
                
            const {description}=req.body;
            console.log(description);
            // const newTodo=await pool.query("INSERT INTO todo (description) VALUES($1)",[description])
                const newTodo=await prisma.Todo.create({data:{description}})
                console.log(newTodo);
            res.json(newTodo)

    } catch (error) {
        console.log(error.message);
    }

    
})

// get all todo
app.get('/todos',async(req,res)=>{
    try {
        const data=await prisma.Todo.findMany(); //pool.query("SELECT * FROM todo")
        console.log(data);
        res.send(data)
    } catch (error) {
        console.log(error.message);
    }
})

// get a toto

app.get('/todos/:id',async(req,res)=>{
    const {id}=req.params;
    const data=await pool.query("SELECT * FROM todo WHERE todo_id=$1",[id])
    res.json(data.rows[0])
})

// update a todo
app.put('/todos/:id',async(req,res)=>{
    try {
        console.log(req.body,req.params);
        const {id}=req.params;
        const todo_id=parseInt(id)
        const {description}=req.body;
    // const data=await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2",[description,id])
    const data = await prisma.Todo.update({
        where: { todo_id }, // Update the user with the specified ID
        data: {description}, // New data to be assigned (e.g., { name: "New Name" })
      });
    res.json(data.rows[0])
    } catch (error) {
        console.log(error.message);
    }
})
// delete a todo
app.delete('/todos/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        console.log(id);
        const data = await prisma.Todo.delete({
            where: { todo_id: parseInt(id) }, // Replace todoId with the actual ID
          });
    // const data=await pool.query("DELETE FROM todo WHERE todo_id=$1",[id])
    res.json(data)
    } catch (error) {
        console.log(error.message);
    }
})

prisma.$connect().then(()=> {
    app.listen(3000,()=>{console.log("server created");})
})  
.catch(console.log)
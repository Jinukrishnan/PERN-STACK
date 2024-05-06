import express from 'express';
import cors from 'cors'
import pool from './DB.js'
const app=express()


// middleware
app.use(cors())
app.use(express.json())

// ROUTES
// create todo
app.post("/todos",async(req,res)=>{
    try {
        console.log(res.body);
            const {description}=req.body;
            console.log(description);
            const newTodo=await pool.query("INSERT INTO todo (description) VALUES($1)",[description])

            res.json(newTodo)

    } catch (error) {
        console.log(error.message);
    }
})

// get all todo
app.get('/todos',async(req,res)=>{
    try {
        const data=await pool.query("SELECT * FROM todo")
        res.send(data.rows)
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
        const {description}=req.body;
    const data=await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2",[description,id])
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
    const data=await pool.query("DELETE FROM todo WHERE todo_id=$1",[id])
    res.json(data)
    } catch (error) {
        console.log(error.message);
    }
})


app.listen(3000,()=>{console.log("server created");})
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Edit from './Edit'
import axios from 'axios'

function App() {
  const [description, setDescription] = useState("")
  const [todos, setTodos] = useState([])
  let [count,setCount]=useState(0)
  // add todo
  const addTodo = async () => {
    try {
      const res = await axios.post('http://localhost:3000/todos', { description: description })
      
      setDescription("")
      setCount(count+=1)

    } catch (error) {
      console.log(error);
    }
  }
  // display todo
  const displayTodo = async () => {
    try {
      const res = await axios.get('http://localhost:3000/todos')
      setTodos(res.data)
    } catch (error) {
      console.log(error);
    }
  }
// delete  todo
const deleteTodo=async (id)=>{

  let res=axios.delete(`http://localhost:3000/todos/${id}`)
 
  setCount(count+=1)


}
  useEffect(() => {
    displayTodo()
  }, [count]);
  return (
    <>
      <div className=" mt-5 container">
        <h1 className="text-center">Todos</h1>

        <div className="input-group mb-3 w-50 mx-auto">
          <input type="text" className="form-control" value={description} onChange={(e) => { setDescription(e.target.value) }} placeholder="Recipient's username" aria-label="Add Task" aria-describedby="button-addon2" />
          <button className="btn btn-outline-success" onClick={addTodo} type="button" id="button-addon2">Button</button>
        </div>

        {/* display */}
        <div className="row w-75 pt-3 mx-auto">
          <div className="col-lg-8 col-md-8 col-sm-8 bg-light py-2">Description</div>
          <div className="col-lg-2 col-md-2 col-sm-2 bg-light py-2 text-center">Edit</div>
          <div className="col-lg-2 col-md-2 col-sm-2 bg-light py-2 text-center">Delete</div>
        </div>
        {
          todos.map((todo,index) => (
            <div className="row w-75 pt-3 mx-auto" key={index}>
              <div className="col-lg-8 col-md-8 col-sm-8 py-2">{todo.description}</div>
              <div className="col-lg-2 col-md-2 col-sm-2 py-2 text-center">
                <Edit  todo={todo} count={count} setCount={setCount} />
                
                </div>
              <div className="col-lg-2 col-md-2 col-sm-2 py-2 text-center"><button onClick={()=>deleteTodo(todo.todo_id)} className='btn btn-danger'>Delete</button></div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App

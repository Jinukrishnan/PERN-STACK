import React, { useState } from 'react'

const Edit = ({todo,count,setCount}) => {
  const [description,setDescription]=useState(todo.description)
  const update=async()=>{
    
    
    const res = await fetch(`http://localhost:3000/todos/${todo.todo_id}`,{method:"put",body: JSON.stringify({ description: description}),headers:{"Content-Type":"application/json"}, })
    
    setCount(count+=1)
    
  }
  
  return (
    <div>
      {/* Button trigger modal */}
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id_${todo.todo_id}`}>
  Edit
</button>

{/* Modal */}
<div className="modal fade" id={`id_${todo.todo_id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
       <input type="text" className='input-group-text w-100' value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder='Edit Todo' />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={()=>{update()}} data-bs-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Edit

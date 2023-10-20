import React, {useState} from 'react'

const ToDoList = () => {
    const [userInput, setUserInput] = useState("");
    const [task, setTask] = useState([]);

    const pressEnter = (tecla) => {
        if(tecla === "Enter"){
            addInput();
        }

    }

    const addInput =() => {
        if (userInput !== ""){
            setTask([...task, userInput]);
            setUserInput("");
        }

    }

  return (
    <div className='container'>
        <div class="list-group">
            <h1 className='text-center'>TO DO LIST</h1>
  
  <input name='textInput' type="text" value={userInput} placeholder={userInput === "" ? "Agrega una tarea" : ""} onChange={(e) => setUserInput(e.target.value)} onKeyDown={((e) => pressEnter(e.key))}/>
  
  {task.map((item, index) => {
          return (
            <div className='d-flex'>
            <a href='#' class='list-group-item list-group-item-action' key={index}>
              {item}
            </a>
            <button 
            onClick={() => {
              const updatedTask = task.filter(
                (_, i) => index != i);

                setTask(updatedTask);

            }}><i className="fa-solid fa-trash-can"></i></button>
            </div>
          );
          })}



<a className="list-group-item list-group-item-action disabled" aria-disabled="true">
  {task.length === 0 ? "No hay tareas por hacer" : task.length === 1 ? "Una tarea por hacer" : `${task.length} tareas por hacer`}
</a>
</div>
      
    </div>
  )
}

export default ToDoList
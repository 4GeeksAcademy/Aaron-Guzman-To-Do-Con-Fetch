import React, { useState } from 'react';

const ToDoList = () => {
    const [userInput, setUserInput] = useState("");
    const [task, setTask] = useState([]);
    const [mouseIn, setMouseIn] = useState([]); 

    const pressEnter = (tecla) => {
        if (tecla === "Enter") {
            addInput();
        }
    }

    const addInput = () => {
        if (userInput !== "") {
            setTask((prevTask) => [...prevTask, userInput]);
            setUserInput("");
            setMouseIn((prevMouseIn) => [...prevMouseIn, false]); 
        }
    }

    return (
        <div className='container'>
            <div className="list-group">
                <h1 className='text-center'>TO DO LIST</h1>

                <input
                    name='textInput'
                    type="text"
                    value={userInput}
                    placeholder={userInput === "" ? "Agrega una tarea" : ""}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => pressEnter(e.key, e)}
                />

                {task.map((item, index) => {
                    return (
                        <div
                            className='d-flex toDoElement'
                            onMouseEnter={() => setMouseIn(prevMouseIn => {
                                const newMouseIn = [...prevMouseIn];
                                newMouseIn[index] = true;
                                return newMouseIn;
                            })}
                            onMouseLeave={() => setMouseIn(prevMouseIn => {
                                const newMouseIn = [...prevMouseIn];
                                newMouseIn[index] = false;
                                return newMouseIn;
                            })}
                        >
                            <a href='#' className='list-group-item list-group-item-action toDoText' key={index}>
                                {item}
                            </a>
                            <button
                                className={mouseIn[index] ? "showButton" : "hideButton"}
                                key={index}
                                onClick={() => {
                                    const updatedTask = task.filter((_, i) => index !== i);
                                    setTask(updatedTask);
                                    setMouseIn(prevMouseIn => {
                                        const newMouseIn = [...prevMouseIn];
                                        newMouseIn.splice(index, 1); 
                                        return newMouseIn;
                                    });
                                }}
                            >
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
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

export default ToDoList;
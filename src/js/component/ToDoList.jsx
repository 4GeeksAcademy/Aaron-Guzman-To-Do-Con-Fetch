import React, { useState, useEffect } from 'react';


const ToDoList = () => {
    //Lista de estados
    const [userInput, setUserInput] = useState("");
    const [task, setTask] = useState([]);
    const [focus, setFocus] = useState(false)

    //Lista de constantes
    const user = "eiron3";
    const url = `https://playground.4geeks.com/apis/fake/todos/user/${user}`;

   useEffect(() => {
    setUser();
   },[])
   
    useEffect(() => {
        sendList();
    }, [task])

    useEffect(() => {
        if(task !== "") takeList();
    }, [])
    //Función asincrona para crear usuario
    const setUser = async () => {
        
        try {
            const response = await fetch(url, {
                "method": "POST",
                "headers": { 'Content-type': 'application/json' },
                "body": JSON.stringify([])
            })

            if (!response.ok) {
                throw Error(response.statusText)
            }

            const transformed = await response.json();
            console.log(transformed.msg)

        }
        catch (error) {
            console.log('Ocurrio un error', error);
        }
    }


//Funcion asincrona para enviar datos PUT
    const sendList = async () => {
        try {
            const response = await fetch(url, {
                "method": "PUT",
                "headers": { 'Content-type': 'application/json' },
                "body": JSON.stringify(task)
            })

            if (!response.ok) {
                throw Error(response.statusText)
            }

            const transformed = await response.json();
            console.log(transformed.msg)
            return transformed;
        }
        catch (error) {
            console.log('Ocurrio un error', error);
        }
    }

//Función asincrona de recepción de datos GET
    const takeList = async () => {
        try {
            const prevResponse = await fetch(url,{
                "method": "GET",
                "headers": { 'Content-type': 'application/json' },
           })
               if (!prevResponse.ok) {
                throw Error(prevResponse.statusText)
               }
                const transform = await prevResponse.json();
                setTask(transform)
                console.log(transform)
        }
    
        catch (error) {
                console.log("Se presentó un error", error);
               }
        }
    
//Función asincrona para tecla ""ENTER"
    const pressEnter = async (e) => {
        try {

            if (e.key === "Enter" && userInput !== "") {
                let obj = {
                    label: userInput,
                    done: false
                }

                setTask([...task, obj]);
                setUserInput("");

                const final = await sendList()
                console.log("Información enviada", final)
               }
            }
        catch (error) {
            console.log("Hubo un error", error)
               }
        }


//Render page
    return (
        <div className='container'>
            <div className="listGroup">

                <h1 className='header'>TO DO LIST</h1>
          
            <ul className='to-dos'>

                <input name='textInput' type="text" onFocus={(e)=> setFocus(true)} onBlur={(e)=> setFocus(false)} placeholder={focus ? "" : "Agrega una tarea"} onChange={(e) => setUserInput(e.target.value)} value={userInput} onKeyDown={(e) => pressEnter(e)} />
                {task.map((item, index) => (
                            <li>
                                <p href='#' key={index}>
                                    {item.label}
                                </p>
                                <button
                                    onClick={() => {
                                        const updatedTask = task.filter(
                                            (_, i) => index != i);
                                    
                                        setTask(updatedTask);

                                    }}><i className="fa-solid fa-trash-can"></i></button>
                            </li>
                
                ))}
</ul>
                <a className='taskCounter'>
                    {task.length === 0 ? "No hay tareas por hacer" : task.length === 1 ? "Una tarea por hacer" : `${task.length} tareas por hacer`}
                </a>
            </div>

        </div>
    )
}

export default ToDoList
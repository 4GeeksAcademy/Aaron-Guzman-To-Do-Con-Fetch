import React, { useState, useEffect } from 'react';


const ToDoList = () => {
    //Lista de estados
    const [userInput, setUserInput] = useState("");
    const [task, setTask] = useState([]);

    //Lista de constantes
    const user = "eiron";
    const url = `https://playground.4geeks.com/apis/fake/todos/user/${user}`;

    // useEffect(() => {
    //     const postData = async () => {
    //         try {
    //             console.log("Holla")
    //             const response = await fetch(url, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-type': 'application/json'
    //                 },
    //                 body: JSON.stringify([])
    //             })

    //             if (response.ok) {
    //                 const jsonResponse = await response.json()
    //                 console.log(jsonResponse)

    //             } else if (user == user) {
    //                 const jsonResponse = await response.json()
    //                 console.log(jsonResponse)
    //             }
    //             else {
    //                 throw new Error('Requested Failed')
    //             }
    //         }

    //         catch (error) {
    //             console.log('Error Getting the API', error)
    //         }


    //     }
    //     postData()
    // }, [])

    useEffect(() => {

        sendList();

    }, [task])



    useEffect(() => {

        takeList();

    }, [])

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
            }
    
            catch (error) {
                console.log("Se presentó un error", error);
    
            }
    
        }
        takeList();
    


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



    return (

        <div className='container'>
            <div class="list-group">

                <h1 className='text-center'>TO DO LIST</h1>

                <input name='textInput' type="text"  placeholder={userInput === "" ? "Agrega una tarea" : ""} onChange={(e) => setUserInput(e.target.value)} value={userInput} onKeyDown={(e) => pressEnter(e)} />

                {task.map((item, index) => {
                    return (
                        <div className='d-flex' >
                            <a href='#' class='list-group-item list-group-item-action' key={index}>
                                {item.label}
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
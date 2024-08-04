import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillTrashFill, BsFillCheckCircleFill } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('https://server-bepc.onrender.com/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`https://server-bepc.onrender.com/delete/${id}`)
            .then(result => {
                console.log(result.data);
                setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (id, done) => {
        axios.put(`https://server-bepc.onrender.com/update/${id}`, { done: !done })
            .then(result => {
                console.log(result);
                setTodos(prevTodos => prevTodos.map(todo => todo._id === id ? { ...todo, done: !done } : todo));
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='home'>
            <h2>Todo list</h2>
            <Create />
            {
                todos.length === 0 
                    ? <div><h2>No Record</h2></div>
                    : todos.map((todo, index) => (
                        <div className='task' key={index}>
                            <div className='checkbox' onClick={() => handleEdit(todo._id, todo.done)}>
                                {todo.done ? <BsFillCheckCircleFill className="icon" /> : <BsCircleFill className='icon' />}
                                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                            </div>
                            <span onClick={() => handleDelete(todo._id)}><BsFillTrashFill className='icon' /></span>
                        </div>
                    ))
            }
        </div>
    );
}

export default Home;

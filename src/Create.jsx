import React, { useState } from 'react';
import axios from 'axios';

function Create() {
    const [task, setTask] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://server-bepc.onrender.com/add', { task })
            .then(result => {
                console.log(result.data);
                setTask(''); // Clear the input field
            })
            .catch(err => console.log(err));
    };

    return (
        <form  className=" create_form" onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={task} 
                onChange={(e) => setTask(e.target.value)} 
                placeholder="Enter new task" 
                required 
            />
            <button type="submit">Add Task</button>
        </form>
    );
}

export default Create;

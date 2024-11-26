
import React, { useState } from 'react';
import axios from 'axios';


function Functions() {

    const [task , setTask] = useState();

    const handleOnClick = (e) =>{
          
        axios.post("http://localhost:3001/add" ,{task:task}).
         then(result => {location.reload()}).
         catch(err => console.log(err));
          
         e.preventDefault();
    }
   
  return (
    <div>
      

      <input type="text" name="myInput" placeholder="Enter the todo" value={task} onChange={(e)=> setTask(e.target.value)} />
      <button onClick={handleOnClick}>Add</button>
      
        
    </div>
  )
}

export default Functions;
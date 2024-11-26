import "./index.css";
import Home from "./home.jsx";
import Functions from "./functions.jsx";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.error(err));
  }, []);

  const handleEdit = (id) => {
    axios
      .put("http://localhost:3001/update/"+id)
      .then((result) => console.log(result))
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/delete/"+id)
      .then((result) => {location.reload()})
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <Home />
        <div className="input-button-container">
          <Functions />
        </div>
        {todos.length == 0 ? (
          <div>
            <h1>No record</h1>
          </div>
        ) : (
          todos.map((todo) => (
            <div className="todo-item">
              <input
                type="checkbox"
                onClick={() => handleEdit(todo._id)}
                className="todo-checkbox"
              />
              {todo.done ? (
                <span className="todo-text text-line-through">{todo.task}</span>
              ) : (
                <span className="todo-text"> {todo.task} </span>
              )}

              <button
                className="delete-btn"
                onClick={() => handleDelete(todo._id)}
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;

// import React, { useState } from "react";
const { React, useState } = require("react")
const ReactDOM = require('react-dom');
// import { v4 as uuidv4 } from "uuid";
const {v4} = require("uuid")
const uuidv4 = v4

const iconGif = require("./icons8-checklist.gif")
const Confetti = require('react-confetti');


function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);


  function handleSubmit(e) {
    e.preventDefault();
    if (!input) {
      setError("Please enter a task");
      return;
    }
    setError("");
    const newTodo = {
      id: uuidv4(),
      task: input,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInput("");
  }

  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function handleToggleComplete(id) {
    setTodos(
        todos.map((todo) => {
            if (todo.id === id) {
                setShowConfetti(!todo.completed);
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        })
    );
}

function handleMarkAllCompleted() {
  setTodos(
      todos.map((todo) => {
          return { ...todo, completed: true };
      })
  ); 
}

function handleClearAll() {
  setTodos([]);
  setShowConfetti(false);
}
  
function handleEdit(id, newTask) {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, task: newTask } : todo))
    );
}

function handSetConfetti() {
  setShowConfetti(false);
}

  return (
    <div>
    <div className="mainDiv">
      <img className="appIcon" alt="todo checklist" src={iconGif} />
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task"
        />
        <button type="submit">Add Todo</button>
        </form>
        <div className="primaryButtons">
        {(todos.length > 0) && <button className="mark-completed" onClick={handleMarkAllCompleted}>Mark All Completed</button>}
        {(todos.length > 1) && <button className="clear-all" onClick={handleClearAll}>Clear All</button>}
        </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
          <span>{todo.task}</span>
          <button onClick={() => handleToggleComplete(todo.id)}>Mark Complete</button>
          <button onClick={() => handleEdit(todo.id)}>Edit</button>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </li>
        ))}
      </ul>
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} onConfettiComplete={handSetConfetti}/>}
    </div>
    <div className="footer">
      <p className="copy">&copy; Copyright 2022</p>
      <p className="copy">
        Built with &#x2661; by
        <a href="" target="_blank"
          >Akhil Reddy</a
        >
      </p>
    </div>
    </div>
  );  
}

export default TodoList;

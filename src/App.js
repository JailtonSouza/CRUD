import './App.css';

import {useState, useEffect } from 'react';
import {  BsTrash, BsBookmarkcheck, BsBookmarkcheckFill} from "react-icons/bs";

const API = "http://localhost:5000";

function App() {

  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState("");
  const [loading, setLoading] = useState(false);

  // Load todos on page load

useEffect (() => {
	const loadData = async() => {
		setLoading(true)

		const res = await fetch(API + "/todos")
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));

    setLoading(false);

    setTodos(res)
};

  loadData()

}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = {
      id: Math.random(),
      title,
      time,
      done: false,
    }

    await fetch(API + "/todos", {
      method: "POST",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log(todo);

    setTitle("");
    setTime("");
  
  };

  


  return (
    <div className="App">
      <div className="todo-header">
        <h1>React Todo</h1>

      </div>
      <div className="form-todo">
        <h2>Insira aqui a sua próxima tarefa:</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="title">O que você vai fazer?</label>
          <input type="text"
            name="title"
            placeholder="Título da tarefa"
            onChange={(e) => setTitle(e.target.value)}
            value={title || ""}
            required
            />
        </div>

        <div className="form-control">
          <label htmlFor="time">Duração:</label>
          <input type="text"
            name="time"
            placeholder="Tempo extimado (em horas)"
            onChange={(e) => setTime(e.target.value)}
            value={time || ""}
            required
            />
        </div>  
        <input type="submit" value="Criar tarefa"/>

        </form>
      </div>

      <div className="list-todo">
        <p>Lista de tarefas</p>
        {todos.length === 0 && <p>Não há tarefas!</p>}
      </div>

    </div>
  );
}

export default App;

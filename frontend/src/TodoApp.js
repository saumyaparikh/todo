import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api/todos/";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios.get(API_URL).then((res) => setTodos(res.data));
  }, []);

  const addTodo = () => {
    axios.post(API_URL, { title, completed: false }).then(() => {
      setTitle("");
      axios.get(API_URL).then((res) => setTodos(res.data));
    });
  };

  const toggleTodo = (id, completed) => {
    axios.patch(`${API_URL}${id}/`, { completed: !completed }).then(() => {
      axios.get(API_URL).then((res) => setTodos(res.data));
    });
  };

  const deleteTodo = (id) => {
    axios.delete(`${API_URL}${id}/`).then(() => {
      axios.get(API_URL).then((res) => setTodos(res.data));
    });
  };

  return (
    <div>
      <h1>ToDo App</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <span
              onClick={() => toggleTodo(t.id, t.completed)}
              style={{ textDecoration: t.completed ? "line-through" : "" }}
            >
              {t.title}
            </span>
            <button onClick={() => deleteTodo(t.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;

import { useEffect, useState } from "react";
import axios from "axios";

const styles = {
  container: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  inputContainer: {
    display: "flex",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "8px",
    fontSize: "16px",
    marginRight: "10px",
  },
  addButton: {
    padding: "8px 16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  list: {
    borderTop: "1px solid #ddd",
    paddingTop: "20px",
  },
  todoItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "4px",
  },
  checkbox: {
    marginRight: "10px",
  },
  todoText: {
    flex: 1,
    marginRight: "10px",
  },
  editButton: {
    padding: "4px 8px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    marginRight: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "4px 8px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  editInput: {
    flex: 1,
    padding: "6px",
    marginRight: "10px",
  },
  saveButton: {
    padding: "4px 8px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  console.log(todos, "todos");

  // Add new todo
  const addTodo = () => {
    axios
      .post("http://localhost:3001/todo/add-list", {
        task: inputValue,
      })
      .then((res) => {
        setTodos([...todos, res.data]);
      });
  };

  // Get all todo
  useEffect(() => {
    axios.get("http://localhost:3001/todo/all-list").then((res) => {
      setTodos(res.data.list);
    });
  }, []);

  // Delete todo
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:3001/todo/delete-list/${id}`);
  };

  // Toggle complete status
  const toggleComplete = (id, currentStatus) => {
    axios
    .put(`http://localhost:3001/todo/checked/${id}`, { checked: !currentStatus })
  };

  // Start editing
  const startEdit = (todo) => {
    setEditId(todo._id);
    setEditText(todo.text);
  };

  // Save edit
  const saveEdit = (id) => {
    axios.put(`http://localhost:3001/todo/update-list/${id}`, {
      task: editText,
    })
    setEditId(null);
  };

  return (
    <div style={styles.container}>
      <h1>Todo List</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add new todo"
          style={styles.input}
        />
        <button onClick={addTodo} style={styles.addButton}>
          Add
        </button>
      </div>

      <div style={styles.list}>
        {todos.map((todo) => (
          <div key={todo._id} style={styles.todoItem}>
            {editId === todo._id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={styles.editInput}
                />
                <button
                  onClick={() => saveEdit(todo._id)}
                  style={styles.saveButton}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.checked}
                  onChange={() => toggleComplete(todo._id, todo.checked)}
                  style={styles.checkbox}
                />
                <span
                  style={{
                    ...styles.todoText,
                    textDecoration: todo.checked ? "line-through" : "none",
                  }}
                >
                  {todo.task}
                </span>
                <button
                  onClick={() => startEdit(todo)}
                  style={styles.editButton}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

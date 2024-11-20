import {useEffect, useState} from "react"
import {NewTodoForm} from "./NewTodoForm"
import {TodoList} from "./TodoList"
import "./styles.css"
import dataAnimation from "../confetti.json"
import Lottie from "react-lottie";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      triggerConfetti();
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000); // Confetti disappears after 3 seconds
  }


  // Confetti animation options
  const confettiOptions = {
    loop: false,
    autoplay: true,
    animationData: dataAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <div>
        <h1>TO DO LIST</h1>
        {showConfetti && (
          <div className="confetti-wrapper">
            <Lottie options={confettiOptions} height={300} width={300} />
          </div>
        )}
      </div>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Tasks To Complete</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}
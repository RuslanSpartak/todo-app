import './App.css';
import React, {useState, useEffect, useMemo} from 'react';
import Form from './components/Form'
import TodoList from './components/TodoList';

function App() {

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  // const [filteredTodos, setFilteredTodos] = useState([]);

  const filteredTodos = useMemo( () => {
    switch (status) {
      case 'completed':
        return (todos.filter(todo => todo.completed === true));
      case 'uncompleted':
        return (todos.filter(todo => todo.completed === false));
      default:
        return (todos);
    }
  });

  //RUN ONCE 
  useEffect (() => {

    getLocalTodos();
  }, []);

  useEffect (() => {
    // filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  // const filterHandler = () => {
  //   switch (status) {
  //     case 'completed':
  //       setFilteredTodos(todos.filter(todo => todo.completed === true));
  //       break;
  //     case 'uncompleted':
  //       setFilteredTodos(todos.filter(todo => todo.completed === false));
  //       break;
  //     default:
  //       setFilteredTodos(todos);
  //       break;
  //   }
  // };


  const saveLocalTodos = () => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  };

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      console.log(todoLocal);
      setTodos(todoLocal);
      // console.log(todos);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>ToDo list</h1>
      </header>
      <Form 
        inputText={inputText} 
        todos={todos} 
        setTodos={setTodos} 
        setInputText={setInputText}
        setStatus={setStatus}        
      />    
      <TodoList 
        filteredTodos={filteredTodos} 
        todos={todos} 
        setTodos={setTodos} 
      />
    </div>
  );
}

export default App;

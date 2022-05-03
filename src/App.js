import './App.css';
import React, {useState, useEffect} from 'react';
import Form from './components/Form'
import TodoList from './components/TodoList';

function App() {

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  //RUN ONCE 
  useEffect (() => {
    getLocalTodos();
  }, [] );

  useEffect (() => {
    filterHandler();
    saveLocalTools();
  }, [todos, status]);

  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;

    }
  };


  const saveLocalTools = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let localTodo = JSON.parse(localStorage.getItem('todos'));
      setTodos(localTodo);
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

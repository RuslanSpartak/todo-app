import React from "react";

const Form = ({ inputText, setInputText, todos, setTodos, setStatus }) => {
    //Here I write what I need
    const inputTextHandler = (e) => {
        console.log(e.target.value);
        setInputText(e.target.value);
    };

    const submitTodoHandler = (e) => {
        // Don't refresh
        e.preventDefault();
        if (inputText) {
            setTodos([
                ...todos, 
                {text:inputText, completed: false, id: Date.now()}
            ]);
            setInputText("");
        }
    };

    const statusHandler = (e) => {
        setStatus(e.target.value);
    };

    return (
        <form>
            <input value={inputText} onChange={inputTextHandler} type="text" className="todo-input" />
            <button onClick={submitTodoHandler} className ="todo=button" type="submit">
                <i className="fas fa-plus-square"></i>
            </button>
            <div className="select">
                <select onChange={statusHandler} name="todos" className="filter-todo">
                    <option value="all">All</option>
                    <option value="completed">completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
        </form>
    );
};

export default Form;
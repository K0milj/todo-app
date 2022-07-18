import React from "react";
import Nav from "./Nav";
import './index.css';
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faX } from '@fortawesome/free-solid-svg-icons'
import { db } from "./firebase-config";
import { collection, addDoc, serverTimestamp} from "firebase/firestore";
import TodoList from "./mui_components/TodoList";
import Button from '@mui/material/Button';
import firebase from 'firebase/compat/app';

function App() {
  const [input, setInput] = useState('');
  const [input2, setInput2] = useState('');
  const [style, setStyle] = useState("addTodoWrapper");

  const todosRef = collection(db, "todos");

  const showAddTodo = () => {
    setStyle("showAddTodoWrapper");
  };

  const hideAddTodo = () => {
    setStyle("addTodoWrapper");
    setInput('');
    setInput2('');
  };

  const addTodo = async() => {
    var date = new Date(input2);
    var dd = date.getDate();

    var mm = date.getMonth()+1; 
    var y = date.getFullYear();

    var h = date.getHours();
    var min = date.getMinutes();

    if(dd < 10) 
    {
        dd = '0' + dd;
    } 

    if(mm < 10) 
    {
        mm = '0' + mm;
    }
    
    if(h < 10){
      h = '0' + h;
    }

    if(min < 10){
      min = '0' + min;
    }
    date = mm + '-' + dd + '-' + y + " " + h + ":" + min;

    await addDoc(todosRef, {
      text: input,
      dueDate: date,
      comments: [],
      timestamp: serverTimestamp()
    });
    setInput('');
    window.location.reload();
  }

  return (
    <>
      <Nav />
      <button id="addBtn" onClick={showAddTodo}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></button>
      <div className={style} id="addTodoWrapper">
        <div className="addTodo">
          <FontAwesomeIcon icon={faX} onClick={hideAddTodo} className="hideTodoBtn" style={{color: "black"}}></FontAwesomeIcon>
          <div>
            <input type="text" placeholder="Enter todo:" value={input} onChange={event => setInput(event.target.value)}/>
            <br />
            <input type="datetime-local" value={input2} onChange={event => setInput2(event.target.value)}/>
            <Button sx={{margin: '10px 0'}} variant="outlined" onClick={addTodo} disabled={!input || !input2}>Add Todo</Button>
          </div>
        </div>
      </div>
      <div className="main-wrapper">
        <TodoList />
      </div>
    </>
  );
}

export default App;

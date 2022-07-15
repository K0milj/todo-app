import React from "react";
import Nav from "./Nav";
import './index.css';
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faX } from '@fortawesome/free-solid-svg-icons'
import { db } from "./firebase-config";
import { collection, addDoc} from "firebase/firestore";
import BasicTable from "./mui_components/Basic_Table";

function App() {
  const [input, setInput] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [style, setStyle] = useState("addTodoWrapper");
  const [btnStyle, setBtnStyle] = useState("addTodoBtn");
  //const [todoStyle, setTodoStyle] = useState("todo");

  const todosRef = collection(db, "todos");

  const showAddTodo = () => {
    setStyle("showAddTodoWrapper");
  };

  const hideAddTodo = () => {
    setStyle("addTodoWrapper");
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
      comment: input3
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
            <textarea value={input3} onChange={event => setInput3(event.target.value)}></textarea>
            <button onClick={addTodo} className={btnStyle} disabled={!input}>Add Todo</button>
          </div>
        </div>
      </div>
      <div className="main-wrapper">
        <BasicTable />
      </div>
    </>
  );
}

export default App;

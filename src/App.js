import React from "react";
import Nav from "./Nav";
import './index.css';
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faX } from '@fortawesome/free-solid-svg-icons'
import { db } from "./firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import TodoList from "./components/TodoList";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function App() {
  const [input, setInput] = useState('');
  const [input2, setInput2] = useState('');
  const [style, setStyle] = useState("addTodoWrapper");
  const [importance, setImportance] = useState('');

  const handleImportance = (event) => {
    setImportance(event.target.value);
  };

  const todosRef = collection(db, "todos");

  const showAddTodo = () => {
    setStyle("showAddTodoWrapper");
  };

  const hideAddTodo = () => {
    setStyle("addTodoWrapper");
    setInput('');
    setInput2('');
  };

  const addTodo = async () => {
    var date = new Date(input2);
    var dd = date.getDate();

    var mm = date.getMonth() + 1;
    var y = date.getFullYear();

    var h = date.getHours();
    var min = date.getMinutes();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    if (h < 10) {
      h = '0' + h;
    }

    if (min < 10) {
      min = '0' + min;
    }
    date = mm + '-' + dd + '-' + y + " " + h + ":" + min;

    await addDoc(todosRef, {
      text: input,
      dueDate: date,
      comments: [],
      timestamp: serverTimestamp(),
      importance: importance
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
          <FontAwesomeIcon icon={faX} onClick={hideAddTodo} className="hideTodoBtn" style={{ color: "black" }}></FontAwesomeIcon>
          <div>
            <input type="text" maxLength={30} placeholder="Enter todo:" value={input} onChange={event => setInput(event.target.value)} />
            <br />
            <input type="datetime-local" value={input2} onChange={event => setInput2(event.target.value)} />
            <Box sx={{ minWidth: 120, marginTop: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Importance</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={importance}
                  label="Importance"
                  onChange={handleImportance}
                >
                  <MenuItem value={"Primary"}>Primary</MenuItem>
                  <MenuItem value={"Secondary"}>Secondary</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button sx={{ margin: '10px 0' }} variant="outlined" onClick={addTodo} disabled={!input || !input2}>Add Todo</Button>
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

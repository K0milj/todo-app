import React from 'react'
import '../index.css';

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faX } from '@fortawesome/free-solid-svg-icons'

import { db } from "../firebase-config";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase-config';

import TodoList from "../components/TodoList";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Todos() {
    const [todoName, setTodoName] = useState('');
    const [todoDate, setTodoDate] = useState('');
    const [style, setStyle] = useState("addTodoWrapper");
    const [importance, setImportance] = useState('');
    const [user, setUser] = useState({});

    const handleImportance = (event) => {
        setImportance(event.target.value);
    };

    const showAddTodo = () => {
        setStyle("showAddTodoWrapper");
    };

    const hideAddTodo = () => {
        setStyle("addTodoWrapper");
        setTodoName('');
        setTodoDate('');
    };

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, [])

    const addTodo = async () => {
        const userRef = doc(db, "users", user.uid);
        var date = new Date(todoDate);
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

        //create a new todo instance
        const todo = {
            text: todoName,
            addedBy: user.displayName || user.email,
            userPic: user.photoURL,
            dueDate: date,
            comments: [],
            importance: importance
        }

        await updateDoc(userRef, {
            //push the new todo in the currently active user's todo array
            todos: arrayUnion(todo)
        });
        window.location.reload();
    }
    return (
        <>
            <button id="addBtn" onClick={showAddTodo}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></button>
            <div className={style} id="addTodoWrapper">
                <div className="addTodo">
                    <FontAwesomeIcon icon={faX} onClick={hideAddTodo} className="hideTodoBtn" style={{ color: "black" }}></FontAwesomeIcon>
                    <div>
                        <input type="text" maxLength={30} placeholder="Enter todo:" value={todoName} onChange={event => setTodoName(event.target.value)} />
                        <br />
                        <input type="datetime-local" value={todoDate} onChange={event => setTodoDate(event.target.value)} />
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
                        <Button sx={{ margin: '10px 0' }} variant="outlined" onClick={addTodo} disabled={!todoName || !todoDate || !importance}>Add Todo</Button>
                    </div>
                </div>
            </div>
            <TodoList />
        </>
    )
}

export default Todos
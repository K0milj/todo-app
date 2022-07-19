import React from 'react'
import { useState} from 'react'
import { db } from "../firebase-config";
import { getDoc, updateDoc, doc } from "firebase/firestore";

import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { MenuItem, Select, InputLabel, Tooltip } from "@mui/material";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

const ChangeTodoInfo = ({ todoId }) => {
    const [todoInfoStyle, setTodoInfoStyle] = useState('invdisplay-todo-info-wrapper');
    const [input, setInput] = useState('');
    const [input2, setInput2] = useState('');
    const [importance, setImportance] = useState('');

    const handleImportance = (event) => {
        setImportance(event.target.value);
    };

    const ariaLabel = { 'aria-label': 'description' };
    const card = (
        <React.Fragment>
            <CardContent>
                <FontAwesomeIcon icon={faX} onClick={() => setTodoInfoStyle('invdisplay-todo-info-wrapper')} className="hideTodoBtn" style={{ color: "black" }}></FontAwesomeIcon>
                <Input type="text" placeholder="Enter new todo name:" inputProps={ariaLabel} value={input} onChange={event => setInput(event.target.value)}/>
                <Input sx={{margin: "10px 0"}} type="datetime-local" inputProps={ariaLabel} value={input2} onChange={event => setInput2(event.target.value)}/>
                <InputLabel id="demo-simple-select-label">Importance</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={importance}
                  label="Importance"
                  onChange={handleImportance}
                  sx={{width: "100%"}}
                >
                  <MenuItem value={"Primary"}>Primary</MenuItem>
                  <MenuItem value={"Secondary"}>Secondary</MenuItem>
                </Select>
            </CardContent>
            <CardActions>
            <Button size="small" onClick={() => updateTodo()}>Update Todo</Button>
            </CardActions>
        </React.Fragment>
    );
    
    const updateTodo = async() => {
        const todoDoc = doc(db, "todos", todoId);
        const docSnap = await getDoc(todoDoc);
        const todoText = docSnap.data().text;
        const todoDueDate = docSnap.data().dueDate;
        const todoImportance = docSnap.data().importance;

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

        await updateDoc(todoDoc, {
            text: input == "" ? todoText : input,
            dueDate: input2 == "" ? todoDueDate : date,
            importance: importance == "" ? todoImportance : importance
        });

        window.location.reload();
    }
    
    return(
        <div className="icon">
            <Tooltip title='Edit Todo'>
                <EditIcon onClick={() => setTodoInfoStyle('display-todo-info-wrapper')}/>
            </Tooltip>
            <Box className={todoInfoStyle}>
                <Card variant="outlined">{card}</Card>
            </Box>
        </div>
    )
}

export default ChangeTodoInfo
import React from "react";
import { useState, useEffect } from 'react'
import { db } from "../firebase-config";
import { collection, getDocs, deleteDoc, addDoc, getDoc, updateDoc, doc, query, orderBy, arrayUnion } from "firebase/firestore";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AddCommentIcon from '@mui/icons-material/AddCommentOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function TodoList() {
    const [newTodos, setNewTodos] = useState([]);
    const [finishedTodos, setFinishedTodos] = useState([]);
    const [inputComment, setInputComment] = useState('');

    const style = {
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      };
  
    const todosRef = collection(db, "todos");
    const finishedTodosRef = collection(db, "finishedTodos");

    useEffect(() => {
      const getTodos = async() => {
        const q = query(todosRef, orderBy("timestamp", "desc"));
        const data = await getDocs(q);
        setNewTodos(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      }
      getTodos();
    }, [])

    useEffect(() => {
        const getFinishedTodos = async() => {
            const q = query(todosRef, orderBy("timestamp", "desc"));    
            const data = await getDocs(q);
            setFinishedTodos(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getFinishedTodos();
      }, [])
  
    const deleteTodo = async(id) => {
      const todoDoc = doc(db, "todos", id);
      await deleteDoc(todoDoc);
      window.location.reload();
    }

    const finishTodo = async(id) => {
        const todoDoc = doc(db, "todos", id);
        const docSnap = await getDoc(todoDoc);
        let todoText = docSnap.data().text;
        await deleteDoc(todoDoc);
        await addDoc(finishedTodosRef, {
            text: todoText
          });
        window.location.reload();
    }

    const deleteFinishedTodo = async(id) => {
        const finisedTodoDoc = doc(db, "finishedTodos", id);
        await deleteDoc(finisedTodoDoc);
        window.location.reload();
    }

    const AddComment = async(id, newComment) => {  
        const todoDoc = doc(db, "todos", id);
        await updateDoc(todoDoc, {
            "comments": arrayUnion(newComment)
        });
        window.location.reload();
    }

    if(newTodos.length == 0){
        return(
            <p>No new todos</p>
        )
    }else{
        return (
            <div>
                <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                }}
                > 
                    {newTodos.map((todo) => (
                        <div key={todo.id}>
                        <Accordion sx={{
                                margin: "10px 0"
                            }}>
                            <AccordionSummary
                            expandIcon={<MoreHorizIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography>{todo.text}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2">
                                    Due until: {todo.dueDate}
                                </Typography>
                                <Accordion style={{
                                margin: "10px 0"
                                }}>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header" 
                                    >
                                    <Typography variant="caption">Comments:</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                    <List sx={style}>
                                        {todo.comments.map(comment => {
                                            return(
                                                <Box key={comment}>
                                                    <ListItem>
                                                    <Typography variant="caption">{comment}</Typography>
                                                    </ListItem>
                                                    <Divider />
                                                </Box>
                                            )
                                        })}
                                        <Box sx={{ marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                            <TextField id="standard-basic" placeholder="Enter comment:" variant="standard" value={inputComment} onChange={event => setInputComment(event.target.value)}/>
                                            <AddCommentIcon type="submit" className="icon" sx={{alignSelf: "flex-end", fontSize: "1.3rem"}} onClick={() => {AddComment(todo.id, inputComment)}}/>
                                        </Box>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                                <DeleteOutlineIcon className="icon" onClick={() => deleteTodo(todo.id)}/>
                            </AccordionDetails>
                        </Accordion>
                        <Divider />
                    </div>
                    ))}
                </List>
            </div>
        )
    }
  }
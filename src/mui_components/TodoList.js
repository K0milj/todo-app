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
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import Badge from "@mui/material/Badge";

import todopic from "../img/undraw_completing_re_i7ap.svg"

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
        const getTodos = async () => {
            const q = query(todosRef, orderBy("timestamp", "desc"));
            const data = await getDocs(q);
            setNewTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getTodos();
    }, [])

    useEffect(() => {
        const getFinishedTodos = async () => {
            const q = query(todosRef, orderBy("timestamp", "desc"));
            const data = await getDocs(q);
            setFinishedTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getFinishedTodos();
    }, [])

    const deleteTodo = async (id) => {
        const todoDoc = doc(db, "todos", id);
        await deleteDoc(todoDoc);
        window.location.reload();
    }

    const finishTodo = async (id) => {
        const todoDoc = doc(db, "todos", id);
        const docSnap = await getDoc(todoDoc);
        let todoText = docSnap.data().text;
        await deleteDoc(todoDoc);
        await addDoc(finishedTodosRef, {
            text: todoText
        });
        window.location.reload();
    }

    const deleteFinishedTodo = async (id) => {
        const finisedTodoDoc = doc(db, "finishedTodos", id);
        await deleteDoc(finisedTodoDoc);
        window.location.reload();
    }

    const AddComment = async (id, newComment) => {
        const todoDoc = doc(db, "todos", id);
        if (newComment == "") {
            setOpen(true);
        } else {
            await updateDoc(todoDoc, {
                "comments": arrayUnion(newComment)
            });
            window.location.reload();
        }
    }

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const openModal = () => {
        <>
            <h1>Hello</h1>
        </>
    }

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    if (newTodos.length == 0) {
        return (
            <div className="no-todos">
                <p>You are all done!</p>
                <img src={todopic} alt="todopic" />
            </div>
        )
    } else {
        return (
            <div style={{ position: "relative", overflow: "hidden" }}>
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
                                    <Typography style={{ color: todo.importance == "Primary" ? "#ff3333" : "black" }}>{todo.text}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="body2">
                                        Due until: {todo.dueDate}
                                    </Typography>
                                    <Typography variant="body2">Importance: {todo.importance}</Typography>
                                    <Accordion style={{
                                        margin: "10px 0"
                                    }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Badge badgeContent={todo.comments.length} color="primary">
                                                <ModeCommentIcon style={{ fontSize: "1.3rem" }} color="action" />
                                            </Badge>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <List sx={style}>
                                                {todo.comments.map(comment => {
                                                    return (
                                                        <Box key={comment}>
                                                            <ListItem>
                                                                <Typography variant="caption">{comment}</Typography>
                                                            </ListItem>
                                                            <Divider />
                                                        </Box>
                                                    )
                                                })}
                                                <Box sx={{ marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                    <TextField
                                                        id="standard-basic"
                                                        placeholder="Enter comment:"
                                                        variant="standard"
                                                        value={inputComment}
                                                        onChange={event => setInputComment(event.target.value)}
                                                    />
                                                    <AddCommentIcon disabled={!inputComment} type="submit" className="icon" sx={{ alignSelf: "flex-end", fontSize: "1.3rem" }} onClick={() => { AddComment(todo.id, inputComment) }} />
                                                </Box>
                                            </List>
                                        </AccordionDetails>
                                    </Accordion>
                                    <DeleteOutlineIcon className="icon" onClick={() => deleteTodo(todo.id)} />
                                    <EditIcon sx={{ marginLeft: "10px" }} className="icon" onClick={() => openModal()} />
                                </AccordionDetails>
                            </Accordion>
                            <Divider />
                        </div>
                    ))}
                </List>
                <div>
                    <Snackbar
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}
                        message="Can't enter an empty comment!"
                        action={action}
                    />
                </div>
            </div>
        )
    }
}
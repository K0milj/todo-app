import React from "react";
import { useState, useEffect } from 'react'
import Nav from './Nav';
import { db } from "../firebase-config";
import { updateDoc, doc, getDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase-config';
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
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import Badge from "@mui/material/Badge";
import Tooltip from '@mui/material/Tooltip';

import todopic from "../img/undraw_completing_re_i7ap.svg"
import ChangeTodoInfo from "./ChangeTodoInfo";
import { Avatar } from "@mui/material";
// import { async } from "@firebase/util";

const InputComment = ({ AddComment }) => {
    const [inputComment, setInputComment] = useState('');
    return (
        <Box
            sx={{
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <TextField
                id="standard-basic"
                placeholder="Enter comment:"
                variant="standard"
                value={inputComment}
                onChange={(event) => setInputComment(event.target.value)}
                autoComplete='off'
            />
            <Tooltip title='Add Comment'>
                <AddCommentIcon
                    className="icon"
                    sx={{ alignSelf: 'flex-end', fontSize: '1.3rem' }}
                    onClick={() => {
                        AddComment(inputComment);
                    }}
                />
            </Tooltip>
        </Box>
    );
};

//start of the TodoList component
export default function TodoList() {

    //useStates
    const [newTodos, setNewTodos] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

    }, [])

    //style for the list component
    const style = {
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
    };

    useEffect(() => {
        // due to user can be {} in your case
        if (!user || !user.uid) return;

        const getTodos = async () => {
            const userDoc = doc(db, "users", user.uid);
            const docSnap = await getDoc(userDoc);
            const todoList = docSnap.data().todos;

            // in case todoList is undefined - newTodos will still be an array
            // if todos is somehow not an array in firestore - that will not help btw.
            setNewTodos(todoList || []);
        };
        getTodos();
    }, [user]); // add user here to trigger useEffect when user object changed


    //delete a user's todo
    const deleteTodo = async (todo) => {
        const userDoc = doc(db, "users", user.uid);
        await updateDoc(userDoc, {
            todos: arrayRemove(todo)
        });
        window.location.reload();
    }

    //add a comment for a todo
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

    //delete a comment of a todo
    const deleteComment = async (id, comment) => {
        const todoDoc = doc(db, "todos", id);
        await updateDoc(todoDoc, {
            comments: arrayRemove(comment)
        });
        window.location.reload();
    }

    //state for opening component
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    //action for the snackbar component
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

    //start to render the db items
    //if no items render this
    if (newTodos.length == 0) {
        return (
            <div className="no-todos">
                <Nav />
                <img id="hero-img" src={todopic} alt="todopic" />
                <Typography variant="h4">You are all done!</Typography>
            </div>
        )
        //if you have items render this
    } else {
        return (
            <div>
                <Nav />
                <div className="todos-wrapper">
                    <List
                        sx={{
                            minWidth: 360,
                            maxWidth: 360,
                            backgroundColor: '#f8f8f8',
                            padding: "20px"
                        }}
                    >
                        {/* start of mapping out each indivudal item */}
                        {newTodos.map((todo) => (
                            <div key={todo.createdOn}>
                                <Accordion sx={{
                                    margin: "10px 0",
                                }}>
                                    <AccordionSummary
                                        expandIcon={<MoreHorizIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography style={{ color: todo.importance == "Primary" ? "#ff3333" : "black" }}>{todo.text}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography variant="body2" sx={{ display: "flex", alignItems: "center", marginBottom: '5px' }}>
                                            {todo.addedBy} <img style={{ marginLeft: '7px', width: '30px', height: '30px', borderRadius: "50%" }} src={todo.userPic ? todo.userPic : ""} alt="profile" referrerPolicy="no-referrer" />
                                        </Typography>
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
                                                <Badge badgeContent={todo.comments.length} color="primary">
                                                    <ModeCommentIcon style={{ fontSize: "1.3rem" }} color="action" />
                                                </Badge>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <List sx={style}>
                                                    {todo.comments.map(comment => {
                                                        return (
                                                            <Box key={comment}>
                                                                <ListItem style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                                    <Typography variant="caption">{comment}</Typography>
                                                                    <Tooltip title='Delete Comment'>
                                                                        <DeleteOutlineIcon className="icon" onClick={() => deleteComment(todo.id, comment)} />
                                                                    </Tooltip>
                                                                </ListItem>
                                                                <Divider />
                                                            </Box>
                                                        )
                                                    })}
                                                    <InputComment AddComment={(comment) => AddComment(todo.id, comment)} />
                                                </List>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Typography sx={{ float: 'right' }} variant="caption">Posted on: {todo.createdOn}</Typography>
                                        <div style={{ display: 'flex' }}>
                                            <Tooltip title='Delete Todo'>
                                                <DeleteOutlineIcon sx={{ marginRight: 1 }} className="icon" onClick={() => deleteTodo(todo)} />
                                            </Tooltip>
                                            <ChangeTodoInfo todoId={todo.id} />
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <Divider />
                            </div>
                        ))}
                    </List>
                </div>
                <div>
                    {/* popup for when a user tries to enter an empty comment */}
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
    }//end of else statement
} //end of main component
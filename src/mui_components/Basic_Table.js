import React from "react";
import { useState, useEffect } from 'react'
import { db } from "../firebase-config";
import { collection, getDocs, deleteDoc, addDoc, getDoc, doc } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function BasicTable() {
    const [newTodos, setNewTodos] = useState([]);
    const [finishedTodos, setFinishedTodos] = useState([]);
  
    const todosRef = collection(db, "todos");
    const finishedTodosRef = collection(db, "finishedTodos");

    useEffect(() => {
      const getTodos = async() => {
        const data = await getDocs(todosRef);
        setNewTodos(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      }
      getTodos();
    }, [])

    useEffect(() => {
        const getFinishedTodos = async() => {
          const data = await getDocs(finishedTodosRef);
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
  
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell>Todos</TableCell>
                    <TableCell align="right">Due until:</TableCell>
                    <TableCell align="right">Comment:</TableCell>
                    <TableCell align="right">Actions:</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {newTodos.map((todo) => (
                    <TableRow
                        key={todo.text}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row" style={{fontWeight: "bold"}}>
                        {todo.text}
                        </TableCell>
                        <TableCell align="right">{todo.dueDate}</TableCell>
                        <TableCell align="right">{todo.comment}</TableCell>
                        <TableCell align="right">
                        <Tooltip title="Mark Finished">
                                <CheckBoxIcon onClick={() => {finishTodo(todo.id)}}/>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <DeleteIcon onClick={() => {deleteTodo(todo.id)}}/>
                        </Tooltip>  
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <br />           
            <TableContainer component={Paper} sx={{ maxWidth: 350 }}>
                <Table sx={{ maxWidth: 350 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell>Finished Todos</TableCell>
                    <TableCell align="right">Actions:</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {finishedTodos.map((todo) => (
                    <TableRow
                        key={todo.text}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row" style={{fontWeight: "bold"}}>
                        {todo.text}
                        </TableCell>
                        <TableCell align="right">
                        <Tooltip title="Delete">
                            <DeleteIcon onClick={() => {deleteFinishedTodo(todo.id)}}/>
                        </Tooltip>  
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
  }
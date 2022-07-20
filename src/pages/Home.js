import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase-config";
import '../login-register.css'
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";

import Paper from '@mui/material/Paper';
import { TextField, Typography, Button } from '@mui/material';

function Home() {
    const [input, setInput] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const usersRef = collection(db, "users");

    const register = async () => {
        try {
            await createUserWithEmailAndPassword(auth, input, input2);
            await addDoc(usersRef, {
                username: username
            });
            navigate('/todos')
        } catch (err) {
            if (err == 'FirebaseError: Firebase: Error (auth/email-already-in-use).') {
                alert("User already exists!");
            }
        }
    }

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, input3, input4);
            navigate('/todos')
        } catch (err) {
            alert(err);
        }
    }

    return (
        <>
            <section className='form-wrapper'>
                <Paper sx={{ padding: 2, minWidth: 360 }}>
                    <Typography>Register user</Typography>
                    <br />
                    <TextField sx={{ width: "100%" }} id="standard-basic" label="Enter email:" variant="standard" type='email' onChange={event => setInput(event.target.value)} />
                    <br />
                    <br />
                    <TextField sx={{ width: "100%" }} id="standard-basic" label="Enter password (min: 6 chars):" variant="standard" type='password' onChange={event => setInput2(event.target.value)} />
                    <br />
                    <br />
                    <TextField sx={{ width: "100%" }} id="standard-basic" label="Enter username:" variant="standard" type='text' onChange={event => setUsername(event.target.value)} />
                    <br />
                    <br />
                    <Button onClick={register} variant='contained'>Register</Button>
                </Paper>
                <Paper sx={{ padding: 2, minWidth: 360 }}>
                    <Typography>Login user</Typography>
                    <br />
                    <TextField sx={{ width: "100%" }} id="standard-basic" label="Enter email:" variant="standard" type='email' onChange={event => setInput3(event.target.value)} />
                    <br />
                    <br />
                    <TextField sx={{ width: "100%" }} id="standard-basic" label="Enter password:" variant="standard" type='password' onChange={event => setInput4(event.target.value)} />
                    <br />
                    <br />
                    <Button onClick={login} variant='contained'>Login</Button>
                </Paper>
                {/* <Link to='/todos'>Todos</Link> */}
            </section>
        </>
    )
}

export default Home
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from "../firebase-config";
import '../login-register.css'
import { signInWithPopup } from "firebase/auth";
import { db } from "../firebase-config";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth'
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import GoogleButton from 'react-google-button';
import { async } from '@firebase/util';

function Login() {
    const navigate = useNavigate();

    const addUser = async (username, userid) => {
        await setDoc(doc(db, 'users', userid), {
            name: username
        })
    }

    const signInWithGoogle = async () => {
        signInWithPopup(auth, provider).then(result => {
            const username = result.user.displayName;
            const userId = result.user.uid;
            navigate('/todos');
            addUser(username, userId);
        }).catch(err => {
            console.log(err);
        })
    }

    document.title = "Todo App";

    return (
        <>
            <section className='form-wrapper'>
                <Paper className="form">
                    <Typography sx={{ textAlign: 'center' }}>Get started quick with <b>ONE</b> click!</Typography>
                    <hr style={{ margin: '20px 0', width: "100%" }} />
                    <GoogleButton onClick={signInWithGoogle} variant='contained'>Sign In With Google</GoogleButton>
                </Paper>
            </section>
        </>
    )
}

export default Login
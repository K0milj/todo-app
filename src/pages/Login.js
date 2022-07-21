import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from "../firebase-config";
import '../login-register.css'
import { signInWithPopup } from "firebase/auth";
import { db } from "../firebase-config";
import { setDoc, doc, getDoc } from "firebase/firestore";
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import GoogleButton from 'react-google-button';
import { async } from '@firebase/util';

function Login() {
    const navigate = useNavigate();

    //add a new user to the 'users' collection (if the user exists, nothing happens)
    const addUser = async (username, userid) => {
        const docRef = doc(db, "users", userid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            await setDoc(doc(db, 'users', userid), {
                name: username,
                todos: {}
            })
        }
    }

    //sign up with google popup
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
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, provider } from "../firebase-config";
import '../login-register.css'
import { signInWithPopup } from "firebase/auth";
import { db } from "../firebase-config";
import { setDoc, doc, getDoc } from "firebase/firestore";
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import GoogleButton from 'react-google-button';
import { async } from '@firebase/util';
import heroPic from "../img/undraw_add_notes_re_ln36.svg"
import { motion } from 'framer-motion'

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

    return (
        <motion.div
            initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ x: window.innerHeight, transition: { duration: 0.15 } }}
        >
            <section className='form-wrapper'>
                <img src={heroPic} alt='pic' />
                <Paper className="form">
                    <Typography></Typography>
                    <Typography sx={{ textAlign: 'center' }}>Get started quick with <b>ONE</b> click!</Typography>
                    <hr style={{ margin: '20px 0', width: "100%" }} />
                    <GoogleButton onClick={signInWithGoogle} variant='contained'>Sign In With Google</GoogleButton>
                    <Link style={{ marginTop: '10px' }} to='/about'>About The Creator</Link>
                </Paper>
            </section>
        </motion.div>
    )
}

export default Login
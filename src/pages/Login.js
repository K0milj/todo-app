import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, provider } from "../firebase-config";
import '../login-register.css'
import { signInWithPopup } from "firebase/auth";

import Paper from '@mui/material/Paper';
import { Typography, Button } from '@mui/material';

function Login() {
    const navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then(result => {
            navigate('/todos');
        }).catch(err => {
          console.log(err);
        })
    }

    return (
        <>
            <section className='form-wrapper'>
                <Paper sx={{ padding: 2, minWidth: 360 }}>
                    <Typography sx={{textAlign: 'center'}}>Get started quick with <b>one</b> click!</Typography>
                    <Button sx={{marginTop: '10px'}} onClick={signInWithGoogle} variant='contained'>Sign In With Google</Button>
                </Paper>
                {/* <Link to='/todos'>Todos</Link> */}
            </section>
        </>
    )
}

export default Login
import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import "../about.css";

function About() {
    return (
        <motion.div className='about-wrapper' initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ x: window.innerHeight, transition: { duration: 0.15 } }}>
            <Paper sx={{ padding: '20px', textAlign: 'center' }}>
                <Typography>Made by: <b>Luka Miljković</b></Typography>
                <Link to='/'>Back To Login</Link>
            </Paper>
        </motion.div>
    )
}

export default About
import React, { useState, useEffect } from 'react';
import "../index.css";
import TemporaryDrawer from './Drawer';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';
import { Box, Avatar } from '@mui/material'

function Nav() {

  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

  }, [])

  return (
    <nav>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar style={{ width: 30, height: 30 }} src={user ? user.photoURL : ""} alt="profile-pic" referrerPolicy="no-referrer" />
        <Link to='/todos' style={{ color: 'white', marginLeft: '10px' }}>{user ? user.displayName : "Not Logged In"}</Link>
      </Box>
      <TemporaryDrawer />
    </nav>
  )
}

export default Nav
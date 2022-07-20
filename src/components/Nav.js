import React, {useState, useEffect} from 'react';
import "../index.css";
import TemporaryDrawer from './Drawer';
import { Link } from 'react-router-dom';
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from '../firebase-config';

function Nav() {

  const [user, setUser] = useState({});

  useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
      });

  }, [])

  return (
    <nav>
      <Link to='/todos' style={{ color: 'white' }}>{user ? user.displayName : "Not Logged In"}</Link>
      {/* <img src={user?.photoURL} alt="Image couldn't load"/> */}
      <TemporaryDrawer />
    </nav>
  )
}

export default Nav
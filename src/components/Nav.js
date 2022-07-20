import React from 'react';
import "../index.css";
import TemporaryDrawer from './Drawer';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <Link to='/' style={{ color: 'white' }}>Logo</Link>
      <TemporaryDrawer />
    </nav>
  )
}

export default Nav
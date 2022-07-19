import React, { useState, useEffect } from 'react';
import "./index.css";
import TemporaryDrawer from './components/Drawer';

function Nav() {

  return (
    <nav>
      <p>Logo</p>
      <TemporaryDrawer />
    </nav>
  )
}

export default Nav
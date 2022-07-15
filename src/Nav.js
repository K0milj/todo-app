import React from 'react';
import "./index.css";
import TemporaryDrawer from './mui_components/Drawer';

function Nav() {
  return (
    <nav>
        <p>Logo</p>
        <TemporaryDrawer />
        <div id='side-nav-inv' className='side-nav-inv'>
          <a href='#'>Calendar</a>
          <a href='#'>Todos</a>
          <a href='#'>Reminder</a>
        </div>
    </nav>
  )
}

export default Nav
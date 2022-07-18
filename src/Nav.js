import React, { useState, useEffect } from 'react';
import "./index.css";
import TemporaryDrawer from './mui_components/Drawer';
import Clock from 'react-clock';

function Nav() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);


  return (
    <nav>
      <p>Logo</p>
      <Clock value={value} />
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
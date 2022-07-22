import React from 'react'
import Todos from "../pages/Todos";
import Login from "../pages/Login";
import About from "../pages/About";
import ProtectedRoute from "../components/ProtectedRoute";
import { Routes, Route, useLocation } from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Login />} />
                <Route path="/todos" element={<ProtectedRoute><Todos /></ProtectedRoute>} />
                <Route path="/about" element={<About />} />
            </Routes>
        </AnimatePresence>
    ) 
}

export default AnimatedRoutes
import React from "react";
import Todos from "./pages/Todos";
import Login from "./pages/Login";
import About from "./pages/About";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route } from 'react-router-dom';
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  return (
    <AnimatedRoutes />
  );
}

export default App;

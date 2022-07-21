import React from "react";
import Todos from "./pages/Todos";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/todos" element={<ProtectedRoute><Todos /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;

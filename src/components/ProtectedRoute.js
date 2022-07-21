import React, { useState, useEffect } from 'react'
import { Navigate } from "react-router-dom";
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';


function ProtectedRoute({ children }) {

    const [user, setUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

    }, [])
    if (!user) {
        return <Navigate to="/" />;
    }
    return children;
}

export default ProtectedRoute
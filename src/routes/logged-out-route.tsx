
import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "../pages/login"
import { Signup } from "../pages/signup"


export const LoggedOutRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/signup' element={<Signup />} />
                <Route path='/' element={<Login />} />
            </Routes>
        </Router>
    )
}
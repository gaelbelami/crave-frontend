
import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { NotFound } from "../pages/404"
import Login from "../pages/login"
import Signup from "../pages/signup"
import BusinessSignup from "../pages/signupBusiness"


export const LoggedOutRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='/signup' element={<Signup />} />
                <Route path='/signup-business' element={<BusinessSignup />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}
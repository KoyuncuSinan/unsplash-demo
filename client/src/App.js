import React from "react";
import {BrowserRouter, Routes,Route} from "react-router-dom";
import Signup from "../src/pages/Signup"
import Login from "../src/pages/Login";

export default function App(){
    return(
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path= "/signup" element = <Signup /> />
                    <Route path= "/login" element = <Login /> />
                </Routes>
            </BrowserRouter>

        </div>
    )
}
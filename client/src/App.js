import React from "react";
import {BrowserRouter, Routes,Route} from "react-router-dom";
import Signup from "../src/pages/Signup"
import Login from "../src/pages/Login";
import PostImage from "../src/pages/PostImage"

export default function App(){
    return(
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path= "/signup" element = <Signup /> />
                    <Route path= "/login" element = <Login /> />
                    <Route path = "/post" element = <PostImage/> />
                </Routes>
            </BrowserRouter>

        </div>
    )
}
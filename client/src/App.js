import React from "react";
import {BrowserRouter, Routes,Route} from "react-router-dom";
import Signup from "../src/pages/Signup"

export default function App(){
    return(
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path= "/signup" element = <Signup /> />
                </Routes>
            </BrowserRouter>

        </div>
    )
}
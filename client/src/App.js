import React from "react";
import {BrowserRouter, Routes,Route} from "react-router-dom";
import Signup from "../src/pages/Signup"
import Login from "../src/pages/Login";
import PostImage from "../src/pages/PostImage"
import Navbar from "../src/pages/Navbar"
import Homepage from "./pages/Homepage";
import ImageSingle from "../src/pages/ImageSingle"
import "../src/style/index.css"
import "../src/style/singlePage.css"
import "../src/style/searchbar.css"
import "../src/style/postImage.css"
import "../src/style/form.css"

export default function App(){
    return(
        <div className="app">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path = "/" element = <Homepage /> />
                    <Route path = "/:id" element = <ImageSingle /> />
                    <Route path= "/signup" element = <Signup /> />
                    <Route path= "/login" element = <Login /> />
                    <Route path = "/post" element = <PostImage/> />
                </Routes>
            </BrowserRouter>

        </div>
    )
}
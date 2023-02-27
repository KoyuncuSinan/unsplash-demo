import React, {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import logo from "../style/camera.png"

export default function Navbar(){
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(token){
            setIsLogin(token)
        }
    },[localStorage.getItem("token")]);

    const logout = () => {
        localStorage.removeItem("token");
        setIsLogin(false);
        navigate("/");
        console.log("Logged out");
    }

    return(
        <nav>
        <div className="title-input">
            <img src = {logo} alt="logo" className="logo" onClick={() => navigate("/")}/>
            <h3 onClick={() => navigate("/")}>My Unsplash</h3>
            <input placeholder="Search by name" type= "text"></input>
        </div>
            <a onClick={() => navigate("/post")} className= "add-image">Add Image</a>
            {isLogin ? (
                <a onClick={logout} className= "register" id="logout">Logout</a>
            ): <div className="signup">
                <a onClick={() => navigate("/signup")} className= "register">Signup</a>
                <a onClick={() => navigate("/login")} className= "register">Login</a>
            </div>}
        </nav>
    )
}

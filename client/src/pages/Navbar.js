import React, {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";

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
            <h3 onClick={() => navigate("/")}>My Unsplash Demo</h3>
            <input placeholder="Search by name" type= "text"></input>
            <a onClick={() => navigate("/post")}>Add an Image</a>
            {isLogin ? (
                <a onClick={logout}>Logout</a>
            ): <div className="signup">
                <a onClick={() => navigate("/signup")}>Signup</a>
                <a onClick={() => navigate("/login")}>Login</a>
            </div>}
        </nav>
    )
}

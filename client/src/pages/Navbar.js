import React, {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import logo from "../style/camera.png"
import SearchBar from "../components/SearchBar";

export default function Navbar(){
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();
    const [images, setImages] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(token){
            setIsLogin(token)
        }
    },[localStorage.getItem("token")]);

    useEffect(() => {
        const getImages = async () => {
            try{
                const res = await fetch("https://my-unsplash-oulx.onrender.com",{
                    method: "GET",
                    headers:{
                        "Content-Type": "application/json",
                    }
                });
                const data = await res.json();
                if(data){
                  
                    setImages(data)
                }
            } catch(err){
               
                return err;
            }
        };
        getImages();
    }, [])

    const logout = () => {
        localStorage.removeItem("token");
        setIsLogin(false);
        navigate("/");
        
    }

    return(
        <>
        <nav>
        <div className="navContainer">
        <div className="title-input">
            <img src = {logo} alt="logo" className="logo" onClick={() => navigate("/")}/>
            <h3 onClick={() => navigate("/")}>My Unsplash</h3>
        </div>
            <a onClick={() => navigate("/post")} className= "add-image">Add Image</a>
            {isLogin ? (<div className="signup">
                <a onClick={logout} className= "register" id="logout">Logout</a>
                </div>): 
                <div className="signup">
                <a onClick={() => navigate("/signup")} className= "register" id="signup">Signup</a>
                <a onClick={() => navigate("/login")} className= "register" id="login">Login</a>
            </div>}

        </div>
        </nav>
        <SearchBar placeholder="Enter a label name" data= {images}/>
        </>


    )
}

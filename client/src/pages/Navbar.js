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
                const res = await fetch("https://my-unsplash-five.vercel.app",{
                    method: "GET",
                    headers:{
                        "Content-Type": "application/json",
                    }
                });
                const data = await res.json();
                if(data){
                    console.log(data)
                    setImages(data)
                }
            } catch(err){
                console.log(err);
                return err;
            }
        };
        getImages();
    }, [])

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
            <SearchBar placeholder="Enter a label name" data= {images}/>
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

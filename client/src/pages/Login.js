import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Login(){
    const [login, setLogin] = useState({
        username:"",
        password:"",
    })

    const [errorMessage, setErrorMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true);
        try{
            const res = await fetch("https://unsplash-demo-sandy.vercel.app/login",{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(login),
            })
            if(!res.ok){
                const errorData = await res.json()
                setErrorMessage(errorData.msg)
            }else{
                const data = await res.json();
                if(data){
                    localStorage.setItem("token", data.token);
                    setLogin(data)
                    alert("Successfully logged in!")
                    navigate("/post");
                }

            }



        }catch(err){
            return err;
        }finally{
            setIsLoading(false);
        }
    }

    return(
        <form onSubmit={handleSubmit} className="form">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="inputs">
                <label htmlFor="username">Username</label>
                <input 
                type= "text"
                name="username"
                id="username"
                onChange={(e) => setLogin({...login, [e.target.name]: e.target.value})}
                value= {login.username}>
                </input>
            </div>
            <div className="inputs">
                <label htmlFor="password">Password</label>
                <input 
                type= "password"
                name="password"
                id="password"
                onChange={(e) => setLogin({...login, [e.target.name]: e.target.value})}
                value= {login.password}>
                </input>
            </div>
            <button type="Submit">Login</button>
            {isLoading && <Box sx={{ display: "flex"}} className="loading-circle"> 
            <CircularProgress />
            </Box>}
        </form>
    )
}
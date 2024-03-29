import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export default function Signup(){
    const [signupForm, setSignupForm] = useState({
        username: "",
        email: "",
        password: "",
    })
    const [isLoading, setIsLoading] = useState(false);
    
    const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true);
            try{
                const res = await fetch("https://unsplash-demo-sandy.vercel.app/signup",{
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(signupForm),
                })

                if(!res.ok){
                    const errorData = await res.json();
                    setErrorMessage(errorData.msg)
                }else{
                    const data = await res.json()
                
                    setSignupForm(data);
                    alert("Successfully registered!")
                    navigate("/login")

                }
            } catch(err){
               
                setErrorMessage("An error occurred while signing up.")
                return err;
            }finally{
                setIsLoading(false);
            }
        }

    return(
        <form onSubmit={handleSubmit} className= "form">
            <h1>Signup</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="inputs">
                <label htmlFor="username">Username</label>
                <input type= "text" name="username" id="username" onChange={(e) => setSignupForm({...signupForm, [e.target.name]: e.target.value})} value = {signupForm.username}></input>
            </div>
            <div className="inputs">
                <label htmlFor="email">Email</label>
                <input type= "email" name="email" id="email" onChange={(e) => setSignupForm({...signupForm, [e.target.name]: e.target.value})} value = {signupForm.email}></input>
            </div>
            <div className="inputs">
                <label htmlFor="password">Password</label>
                <input type= "password" 
                name="password" 
                id="password" 
                onChange={(e) => setSignupForm({...signupForm, [e.target.name]: e.target.value})}
                value = {signupForm.password}
                ></input>
            </div>
            <button type="Submit">Signup</button>
            {isLoading && <Box sx={{ display: "flex"}} className="loading-circle"> 
            <CircularProgress />
            </Box>}


        </form>
    )
}
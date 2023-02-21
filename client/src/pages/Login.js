import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

export default function Login(){
    const [login, setLogin] = useState({
        username:"",
        password:"",
    })

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await fetch("http://localhost:3001/login",{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(login),
            })
            const data = await res.json();
            if(!res.ok){
                throw new Error(res.statusText)
            }

            if(data){
                localStorage.setItem("token", data.token);
                console.log(data);
                setLogin(data)
                navigate("/");
            }


        }catch(err){
            console.log(err);
            return err;
        }
    }

    return(
        <form onSubmit={handleSubmit} className="form">
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
        </form>
    )
}
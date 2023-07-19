import React, {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function PostImage(){
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [label, setLabel] = useState("")
    const [imagePath, setImagePath] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const token = localStorage.getItem("token")
        const userId = jwt_decode(token).id
        const formData = new FormData();
        formData.append("label",label);
        formData.append("imagePath",imagePath)
        formData.append("owner",userId)

        try{
            const res = await fetch("https://unsplash-demo-sandy.vercel.app/post",{
                method: "POST",
                headers:{
                    Authorization: `Bearer ${token}`
                },
                body: formData
            })
            if(!res.ok){
                const errorData = await res.json()
                alert(errorData.msg)
            }else{
               
                if(res.status === 200 || res.status === 201){
                    const data = await res.json();
                    setLabel(data.label)
                    setImagePath("")
                    navigate("/");
    
            }

        }
        }catch(err){
           return err;
        }finally{
            setIsLoading(false);
        }

    };

    useEffect(()=> {
        const getToken = localStorage.getItem("token");
        if(!!getToken){
            setIsLogin(true);
        }
    },[]);


    return (
        <>
            {isLogin ? (
                <form onSubmit={handleSubmit} className= "form">
                <h2>Submit Your Image</h2>
                    <div className="inputs">
                        <label htmlFor="label">Label for your image</label>
                        <input
                            type="text"
                            name = "label"
                            id = "label"
                            onChange = {(e) => setLabel(e.target.value)}
                            value= {label}
                        ></input>
                    </div>
                    <div className="inputs">
                        <label htmlFor="imagePath">Image File</label>
                        <input
                            type="file"
                            name = "imagePath"
                            id = "imagePath"
                            onChange = {(e) => setImagePath(e.target.files[0])}
                            className = "file"
                        ></input>
                    </div>
                    <button type="submit">Submit</button>
                    {isLoading && <Box sx={{ display: "flex"}} className="loading-circle"> 
            <CircularProgress />
            </Box>}
                </form>
            ) : <div className="signup-error">
                    <h2>Login Required</h2>
                    <p>You need to login to submit an image</p>
                </div>}
        </>
    )

}
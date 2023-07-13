import React, {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function PostImage(){
    const [isLogin, setIsLogin] = useState(false);

    const [label, setLabel] = useState("")
    const [imagePath, setImagePath] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token")
        const userId = jwt_decode(token).id
        const formData = new FormData();
        formData.append("label",label);
        formData.append("imagePath",imagePath)
        formData.append("owner",userId)

        try{
            const res = await fetch("https://my-unsplash-five.vercel.app/post",{
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
                console.log(res);
                if(res.status === 200 || res.status === 201){
                    const data = await res.json();
                    console.log(data);
                    setLabel(data.label)
                    setImagePath("")
                    navigate("/");
    
            }

        }
        }catch(err){
           console.log(err);
           return err;
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
                </form>
            ) : <div className="signup-error">
                    <h2>Login Required</h2>
                    <p>You need to login to submit an image</p>
                </div>}
        </>
    )

}
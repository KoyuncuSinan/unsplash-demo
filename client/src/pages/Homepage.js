import React, {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage(){
    const [images, setImages] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const getImages = async () => {
            try{
                const res = await fetch("http://localhost:3001",{
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

    return(
        <main id="homepage">
            {images.length >= 1 ? (images.map((image,index) => (
                <a key={image._id} onClick={() => navigate(`/${image._id}`)} className = "image">
                    <img src = {image.imagePath} className="home-image" style={{gridColumnEnd:`span ${image.width > image.height ? 2:1}`, gridRowEnd: `span ${image.height > image.width ? 2 : 1}`}}></img>
                    <h2 className="label">{image.label}</h2>
                </a>
            ))): "Loading"}
        </main>
    )

}
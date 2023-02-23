import React, {useState, useEffect} from "react";
import { useNavigate,useParams } from "react-router-dom";

export default function ImageSingle(){
    const [imagePage, setImagePage] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const getImage = async () => {
            try{
                const res = await fetch(`http://localhost:3001/${id}`,{
                    method: "GET",
                    headers:{
                        "Content-Type":"application/json"
                    },
                
                })
                const data = await res.json();
                if(data){
                    console.log(data);
                    setImagePage(data)
                }
            }catch(err){
                console.log(err)
                return err;
            }
        }
        getImage();
    },[id])

    return(
        <main>
            {imagePage.length !== 0 ? (
                <div key= {imagePage._id}>
                    <img src={imagePage.imagePath}></img>
                    <h2 className="label">{imagePage.label}</h2>

                </div>
            ) : "Loading"}
        </main>
    )
}
import React, {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css";

export default function Homepage(){
    const [images, setImages] = useState([])
    const navigate = useNavigate();
    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1,
    }

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

    //     <main id="homepage">
    //         {images.length >= 1 ? (images.map((image,index) => (
    //             <div key={image._id} className = "image">
    //                 <img src = {image.imagePath} className="homeImage" onClick={() => navigate(`/${image._id}`)}  style={{gridColumnEnd:`span ${image.width > image.height ? 2:1}`, gridRowEnd: `span ${image.height > image.width ? 2 : 1}`}}></img>
    //                 <h2 className="label">{image.label}</h2>
    //             </div>
    //         ))): "Loading"}
    //     </main>
    //

    return(
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {images.length >= 1 ? (images.map((image,index) => (
                <div key={image._id} className= "image"  >
                    <img src = {image.imagePath}  className="homeImage" onClick={() => navigate(`/${image._id}`)}></img>
                    <h2 className="label">{image.label}</h2>
                </div>
            ))): "Loading"}
        </Masonry>
    )

}
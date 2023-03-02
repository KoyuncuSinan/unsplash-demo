import React, {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

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
        <ImageList sx={{width:500,height:450}}>
            <ImageListItem key="Subheader" cols={2}>
                <ListSubheader component="div">Gallery</ListSubheader>
            </ImageListItem>
            {images.map((item) => (
                <ImageListItem key={item._id}>
                    <img 
                        src={`${item.imagePath}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.imagePath}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.label}
                        loading= "lazy"
                    />
                    <ImageListItemBar
                        title={item.label}
                        actionIcon={
                            <IconButton
                                sx={{color: "rgba(255, 255, 255, 0.54)"}}
                                aria-label={`info about ${item.label}`}
                            >
                                <InfoIcon/>
                            </IconButton>
                        }
                       /> 
                </ImageListItem>
            ))};
        </ImageList>
    )

}
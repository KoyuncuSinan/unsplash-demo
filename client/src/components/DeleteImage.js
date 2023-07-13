import React, {useState} from "react";

const DeleteImage = ({id}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleDeleteClick = async() => {
        setLoading(true);
        try{
            const res = await fetch(`https://my-unsplash-five.vercel.app/${id}`,{
                method: "DELETE",
            });
            if(!res.ok){
                throw new Error("Failed to delete image");
            }
            setSuccess(true)
        }catch(err){
            console.error(err);
            setError(err.message);
        }
        setLoading(false);
    }

    return(
        <>
            {loading ? (
                <p>Deleting image...</p>
            ): success ? (
                <p>Image deleted successfully!</p>
            ): error ? (
                <p>Error: {error}</p>
            ): (
                <button onClick={handleDeleteClick}>Confirm Delete</button>
            )}
        </>
    )
}

export default DeleteImage;
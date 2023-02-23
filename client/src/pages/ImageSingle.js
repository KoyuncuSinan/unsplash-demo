import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function ImageSingle() {
  const [imagePage, setImagePage] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const token = localStorage.getItem("token");
  

  const userId = jwt_decode(token).id;

  useEffect(() => {
    if (token) {
        setIsLogged(true);
      }
    const getImage = async () => {
      try {
        const res = await fetch(`http://localhost:3001/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data) {
          console.log(data);
          setImagePage(data);
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    };
    getImage();
  }, [id]);

  const deleteImage = async () => {
    try {
      const res = await fetch(`http://localhost:3001/${id}`, {
        method: "DELETE",
        headers:{
            Authorization: `Bearer ${token}`
        },
      });
      if (res.ok) {
        console.log("Image deleted successfully.");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  return (
    <main>
      {imagePage.length !== 0 ? (
        <div key={imagePage._id}>
          <img src={imagePage.imagePath}></img>
          <h2 className="label">{imagePage.label}</h2>
          {imagePage.owner === userId && (
            <button onClick={deleteImage}>Delete Image</button>
          )}
        </div>
      ) : (
        "Loading"
      )}
    </main>
  );
}

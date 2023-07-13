import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import DeleteIcon from "@mui/icons-material/Delete";
import errorImage from "../style/detective-dog.jpg";
import { TailSpin } from "react-loader-spinner";

export default function ImageSingle() {
  const [imagePage, setImagePage] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const token = localStorage.getItem("token");
  let userId = null;
  if (token) {
    userId = jwt_decode(token).id;
  }

  useEffect(() => {
    if (token) {
      setIsLogged(true);
    }
    const getImage = async () => {
      try {
        const res = await fetch(`https://my-unsplash-oulx.onrender.com/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          const errorData = await res.json();
          setErrorMessage(errorData.msg);
        } else {
          const data = await res.json();
          if (data) {
            console.log(data);
            setImagePage(data);
          }
        }
      } catch (err) {
        console.log(err);
        setErrorMessage("An error occurred while fetching the image");
      } finally {
        setIsLoading(false);
      }
    };
    getImage();
  }, [id]);

  const deleteImage = async () => {
    try {
      const res = await fetch(`https://my-unsplash-oulx.onrender.com/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        console.log("Image deleted successfully.");
        alert("Image deleted successfully.");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  return (
    <main id="singlePage">
      {isLoading ? (
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass="loader"
          visible={true}
        />
      ) : imagePage.length !== 0 ? (
        <div key={imagePage._id} id="single-container">
          <h2 className="pageLabel">{imagePage.label}</h2>
          <div className="icon-container">
            <img src={imagePage.imagePath} className="singleImage"></img>

            {token && imagePage.owner === userId && (
              <DeleteIcon onClick={deleteImage} className="deleteIcon" />
            )}
          </div>
        </div>
      ) : (
        <div className="image-error">
          <h2 className="error-message">
            Oops! The image you're looking for doesn't exist.
          </h2>
          <img src={errorImage} alt="Error Image" className="error-dog"></img>
        </div>
      )}
    </main>
  );
}

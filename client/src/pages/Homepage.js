import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css";
import { TailSpin } from "react-loader-spinner";

export default function Homepage() {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const getImages = async () => {
      try {
        const res = await fetch("http://localhost:3001", {
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
            setImages(data);
          }
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    };
    getImages();
  }, []);

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {errorMessage && <h2 className="error-message">{errorMessage}</h2>}
      {images.length >= 1 ? (
        images
          .slice(0)
          .reverse()
          .map((image, index) => (
            <div key={image._id} className="image">
              <img
                src={image.imagePath}
                className="homeImage"
                onClick={() => navigate(`/${image._id}`)}
              ></img>
              <h2 className="label">{image.label}</h2>
            </div>
          ))
      ) : (
          <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass= "loader"
            visible={true}
          />
      )}
    </Masonry>
  );
}

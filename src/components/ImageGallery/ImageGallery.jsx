import React from "react";
import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ images }) => {
  if (!images || images.length === 0) {
    return null;
  }
  return (
    <div>
      <ul>
        {images.map((image) => (
          <li key={image.id}>
            <ImageCard src={image.url} alt={image.alt} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;

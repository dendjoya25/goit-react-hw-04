import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ images, onImageClick }) => {
  if (!images || images.length === 0) {
    return null;
  }
  return (
    <div>
      <ul className={s.galleryList}>
        {images.map((image) => (
          <li key={image.id}>
            <ImageCard
              src={image.url}
              alt={image.alt}
              onClick={() => onImageClick(image)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;

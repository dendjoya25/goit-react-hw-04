import React, { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import axios from "axios";

const ACCESS_KEY = "oLOqcjdFq7ALd2V58GWPb0y0R6g7njJOU8P2sJwLNVs";
const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    if (!query) {
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: query,
            per_page: 12,
            orientation: "landscape",
          },
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
        }
      );

      const fetchedImages = response.data.results.map((img) => ({
        id: img.id,
        url: img.urls.small,
        alt: img.alt_description || "Image",
        full: img.urls.regular,
        author: img.user.name,
        likes: img.likes,
        description: img.description,
      }));

      setImages(fetchedImages);
    } catch (error) {
      setError("Error, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <ImageGallery images={images} />
      )}

      {isLoading && <Loader />}
    </div>
  );
};

export default App;

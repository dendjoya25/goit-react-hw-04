import React, { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import axios from "axios";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

const ACCESS_KEY = "oLOqcjdFq7ALd2V58GWPb0y0R6g7njJOU8P2sJwLNVs";
const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async (query) => {
    if (!query) {
      return;
    }
    setIsLoading(true);
    setError(null);
    setQuery(query);
    setPage(1);

    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: query,
            page: 1,
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
      setTotalPages(response.data.total_pages);
    } catch (error) {
      setError("Error, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: query,
            page: nextPage,
            per_page: 12,
            orientation: "landscape",
          },
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
        }
      );

      const moreImages = response.data.results.map((img) => ({
        id: img.id,
        url: img.urls.small,
        alt: img.alt_description || "Image",
        full: img.urls.regular,
        author: img.user.name,
        likes: img.likes,
        description: img.description,
      }));

      setImages((prevImages) => [...prevImages, ...moreImages]);
      setPage(nextPage);
    } catch (error) {
      setError("Error, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <ImageGallery images={images} onImageClick={openModal} />
      )}

      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      {selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          image={selectedImage}
          onRequestClose={closeModal}
        />
      )}
    </div>
  );
};

export default App;

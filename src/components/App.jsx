import { useState } from "react";
import fetchImg from "../services/PixabayApi";

import css from "./App.module.css";

import Loader from "./Loader/Loader";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import Button from "./Button/Button";

function App() {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [largeImageURL, setLargeImageURL] = useState("");

    const onSubmit = () => {
        if (query) {
            const firstPage = 1;
            setImages([]);
            setPage(firstPage);
            fetchQuery(firstPage);
        }
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value.toLowerCase());
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (query.trim() === "") {
            alert.error("Enter your search query");
            return;
        }

        onSubmit(query);
    };

    const fetchQuery = async (page) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetchImg(query, page);
            setImages((prevState) => [...prevState, ...response]);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoadMore = () => {
        setPage(page + 1);
        fetchQuery(page + 1);
    };

    const onShowModal = (url) => {
        setShowModal(true);
        setLargeImageURL(url);
    };

    const onCloseModal = () => {
        setShowModal(false);
        setLargeImageURL("");
    };

    return (
        <div className={css.App}>
            {error && <p>Something went wrong: {error.message}</p>}
            <Searchbar
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                query={query}
            />
            <ImageGallery images={images} onShowModal={onShowModal} />
            {images.length > 0 && !isLoading ? (
                <Button onClick={handleLoadMore} />
            ) : (
                ""
            )}
            {isLoading && <Loader />}
            {showModal && (
                <Modal onCloseModal={onCloseModal} image={largeImageURL} />
            )}
        </div>
    );
}

export default App;

import { useState, useEffect } from "react";
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

    const onSubmit = (queryInput) => {
        if (queryInput !== query) {
            setImages([]);
            setPage(1);
            setQuery(queryInput);
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

    useEffect(() => {
        if (!query) return;

        const fetchQuery = async (valueQuery) => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetchImg(valueQuery, page);
                setImages((prevState) => [...prevState, ...response]);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuery(query);
    }, [page, query]);

    const handleLoadMore = () => {
        setPage(page + 1);
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
            <ImageGallery images={images} onShow={onShowModal} />
            {images.length > 0 && !isLoading ? (
                <Button onClick={handleLoadMore} />
            ) : (
                ""
            )}
            {isLoading && <Loader />}
            {showModal && (
                <Modal onClose={onCloseModal} image={largeImageURL} />
            )}
        </div>
    );
}

export default App;

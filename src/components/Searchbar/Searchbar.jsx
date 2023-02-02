import React from "react";
import PropTypes from "prop-types";

import css from "./Searchbar.module.css";

const Searchbar = ({ handleSubmit, handleInputChange, query }) => {
    return (
        <header className={css.Searchbar}>
            <form className={css.SearchForm} onSubmit={handleSubmit}>
                <input
                    onChange={handleInputChange}
                    className={css.SearchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={query}
                />
                <button type="submit" className={css.SearchFormButton}>
                    <span className={css.SearchFormButtonLabel}>Search</span>
                </button>
            </form>
        </header>
    );
};

Searchbar.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
};
export default Searchbar;

import React, { useEffect } from "react";

import PropTypes from "prop-types";

import css from "./Modal.module.css";

function Modal({ onClose, image }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === "Escape") {
                return onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className={css.Overlay} onClick={onClose}>
            <div className={css.Modal}>
                <img src={image} alt="" />
            </div>
        </div>
    );
}

Modal.propTypes = {
    onClose: PropTypes.func,
    image: PropTypes.string.isRequired,
};

export default Modal;

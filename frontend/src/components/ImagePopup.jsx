function ImagePopup({ isOpen, card, onClose }) {
    return (
        <div
            className={`popup ${isOpen ? 'popup_opened' : ''}`}
            id="popup-image"
        >
            <div className="popup__image-container">
                <button
                    className="popup__close-button"
                    onClick={onClose}
                ></button>
                <img
                    className="popup__image"
                    src={card.link}
                    alt={`${card.name} фото`}
                />
                <p className="popup__image-title">{card.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup

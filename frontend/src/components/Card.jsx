import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Card({ onCardClick, card, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext)
    const isOwn = card.owner._id === currentUser._id
    const isLiked = card.likes.some((i) => i._id === currentUser._id)
    const cardLikeButtonClassName = `like-button ${
        isLiked ? 'like-button_active' : ''
    }`
    const cardDeleteButtonClassName = `${
        isOwn ? 'delete-button' : 'delete-button-disable'
    }`

    function handleDeleteClick() {
        onCardDelete(card)
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleClick() {
        onCardClick(card)
    }

    return (
        <li className="element">
            <button className="element__image-button">
                <img
                    className="element__image"
                    src={card.link}
                    alt={`${card.name} фото`}
                    onClick={handleClick}
                />
            </button>
            <button
                className={cardDeleteButtonClassName}
                onClick={handleDeleteClick}
            ></button>
            <div className="element__bottom-element">
                <h2 className="element__title">{card.name}</h2>
                <div className="like-content">
                    <button
                        className={cardLikeButtonClassName}
                        onClick={handleLikeClick}
                    ></button>
                    <p className="like-count">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card

import React from 'react'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Main({
    onCardClick,
    onAddPlace,
    onEditAvatar,
    onEditProfile,
    cards,
    onCardLike,
    onCardDelete,
}) {
    const currentUser = React.useContext(CurrentUserContext)

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-content" onClick={onEditAvatar}>
                    <img
                        className="profile__avatar"
                        src={currentUser.avatar}
                        alt="Ваша аватарка"
                    />
                    <div className="profile__avatar-overlay"></div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__info-name">{currentUser.name}</h1>
                    <button
                        className="profile__edit-button"
                        onClick={onEditProfile}
                    ></button>
                    <p className="profile__info-job">{currentUser.about}</p>
                </div>
                <button
                    className="profile__add-button"
                    onClick={onAddPlace}
                ></button>
            </section>
            <ul className="elements">
                {cards.map((card) => (
                    <Card
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                        key={card._id}
                    />
                ))}
            </ul>
        </main>
    )
}

export default Main

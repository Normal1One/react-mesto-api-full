import React from 'react'
import PopupWithForm from './PopupWithForm'

function DeletePlacePopup({ isOpen, onClose, onDeletePlace, isLoading }) {
    return (
        <PopupWithForm
            onClose={onClose}
            isOpen={isOpen}
            isLoading={isLoading}
            name="delete"
            onSubmit={onDeletePlace}
            buttonText="Да"
            title="Вы уверены?"
        />
    )
}

export default DeletePlacePopup

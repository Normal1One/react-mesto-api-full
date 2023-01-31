import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
    const nameRef = React.useRef()
    const linkRef = React.useRef()

    function handleSubmit(e) {
        e.preventDefault()
        onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value,
        })
    }

    return (
        <PopupWithForm
            name="add"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            buttonText="Создать"
        >
            <fieldset className="form__set">
                <label className="form__field">
                    <input
                        type="text"
                        name="name"
                        className="form__input"
                        placeholder="Название"
                        required
                        minLength="2"
                        maxLength="30"
                        ref={nameRef}
                    />
                    <span className="name-error form__error" />
                </label>
                <label className="form__field">
                    <input
                        type="url"
                        name="link"
                        className="form__input"
                        placeholder="Ссылка на картинку"
                        required
                        ref={linkRef}
                    />
                    <span className="link-error form__error" />
                </label>
            </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup

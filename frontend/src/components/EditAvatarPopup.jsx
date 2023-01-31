import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
    const avatarRef = React.useRef()

    function handleSubmit(e) {
        e.preventDefault()
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        })
    }

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText="Сохранить"
            isLoading={isLoading}
        >
            <fieldset className="form__set">
                <label className="form__field">
                    <input
                        type="url"
                        name="link"
                        className="form__input"
                        placeholder="Ссылка на картинку"
                        ref={avatarRef}
                        required
                    />
                    <span className="link-error form__error" />
                </label>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup

import React from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
    const currentUser = React.useContext(CurrentUserContext)
    const [formValues, setFormValues] = React.useState({
        name: '',
        description: '',
    })

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setFormValues((prevState) => ({ ...prevState, [name]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        onUpdateUser({
            name: formValues.name,
            about: formValues.description,
        })
    }

    React.useEffect(() => {
        setFormValues({
            name: currentUser.name,
            description: currentUser.about,
        })
    }, [isOpen])

    return (
        <PopupWithForm
            name="edit"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText="Сохранить"
            isLoading={isLoading}
        >
            <fieldset className="form__set">
                <label className="form__field">
                    <input
                        type="text"
                        name="name"
                        className="form__input"
                        value={formValues.name || ''}
                        placeholder="Имя"
                        required
                        minLength="2"
                        maxLength="40"
                        onChange={handleChange}
                    />
                    <span className="name-error form__error">Hello</span>
                </label>
                <label className="form__field">
                    <input
                        type="text"
                        name="description"
                        className="form__input"
                        value={formValues.description || ''}
                        placeholder="О себе"
                        required
                        minLength="2"
                        maxLength="200"
                        onChange={handleChange}
                    />
                    <span className="description-error form__error"></span>
                </label>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup

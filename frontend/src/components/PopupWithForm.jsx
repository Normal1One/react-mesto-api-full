import React from 'react'
import { FormValidator } from '../utils/utils.js'

const config = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_visible',
}

function PopupWithForm({
    isOpen,
    title,
    name,
    onClose,
    onSubmit,
    buttonText,
    children,
    isLoading,
}) {
    const formRef = React.createRef()
    const [formValidators, setFormValidators] = React.useState({})

    function handleClose() {
        formRef.current.reset()
        formValidators[`${name}`].resetValidation()
        onClose()
    }

    function handleSubmit(e) {
        onSubmit(e)
        formRef.current.reset()
    }

    React.useEffect(() => {
        const formValidatorsRes = {}

        const enableValidation = (config) => {
            const formList = Array.from(
                document.querySelectorAll(config.formSelector)
            )
            formList.forEach((formElement) => {
                const validator = new FormValidator(config, formElement)
                const formName = formElement.getAttribute('name')
                formValidatorsRes[formName] = validator
                validator.enableValidation()
            })
        }
        setFormValidators(formValidatorsRes)
        enableValidation(config)
    }, [])

    return (
        <div
            className={`popup ${isOpen ? 'popup_opened' : ''}`}
            id={`popup-${name}`}
        >
            <div className={"popup__container popup__container_" + name}>
                <p className="popup__title">{title}</p>
                <button
                    className="popup__close-button"
                    onClick={handleClose}
                ></button>
                <form
                    className="form"
                    name={name}
                    onSubmit={handleSubmit}
                    ref={formRef}
                    noValidate
                >
                    {children}
                    <button className="popup__button" id={`${name}-submit`}>{`${
                        isLoading ? 'Сохранение...' : buttonText
                    }`}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm

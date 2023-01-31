import React from 'react'

function InfoTooltip({ isOpen, onClose, isSuccessfully }) {
    return (
        <div
            className={`popup ${isOpen ? 'popup_opened' : ''}`}
            id="popup-register"
        >
            <div className="popup__container">
                <button
                    className="popup__close-button"
                    onClick={onClose}
                ></button>
                <div
                    className={`register__icon ${
                        isSuccessfully ? '' : 'unsuccessfully'
                    }`}
                ></div>
                <p className="register__text">
                    {isSuccessfully
                        ? 'Вы успешно зарегистрировались!'
                        : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </p>
            </div>
        </div>
    )
}

export default InfoTooltip

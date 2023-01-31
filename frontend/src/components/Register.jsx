import React from 'react'
import { Link } from 'react-router-dom'

function Register({ onRegister }) {
    const [formValues, setFormValues] = React.useState({
        email: '',
        password: '',
    })

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setFormValues((prevState) => ({ ...prevState, [name]: value }))
    }

    function handleSubmit(e) {
        onRegister(e, formValues)
    }

    return (
        <div className="register">
            <p className="register__title">Регистрация</p>
            <form onSubmit={handleSubmit} className="register__form">
                <input
                    placeholder="Email"
                    className="register__input"
                    required
                    id="email"
                    name="email"
                    type="text"
                    value={formValues.email}
                    onChange={handleChange}
                />
                <input
                    placeholder="Пароль"
                    className="register__input"
                    required
                    id="password"
                    name="password"
                    type="password"
                    value={formValues.password}
                    onChange={handleChange}
                />
                <div className="register__button-container">
                    <button type="submit" className="register__link">
                        Зарегистрироваться
                    </button>
                </div>
            </form>
            <div className="register__signin">
                <Link to="sign-in" className="register__login-link">
                    Уже зарегистрированы? Войти
                </Link>
            </div>
        </div>
    )
}

export default Register

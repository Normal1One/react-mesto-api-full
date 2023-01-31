import React from 'react'

function Login({ onLogin }) {
    const [formValues, setFormValues] = React.useState({
        email: '',
        password: '',
    })

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setFormValues((prevState) => ({ ...prevState, [name]: value }))
    }

    function handleSubmit(e) {
        onLogin(e, formValues)
    }

    return (
        <div className="register">
            <p className="register__title">Вход</p>
            <form onSubmit={handleSubmit} className="register__form" noValidate>
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
                        Войти
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login

import { Link } from 'react-router-dom'
import React from 'react'

function Header({ headerTitle, userEmail, onSignOut, linkTo, loggedIn }) {
    const [isMenuOpen, setMenuOpen] = React.useState(false)

    function handleMenu() {
        if (isMenuOpen) {
            setMenuOpen(false)
        } else {
            setMenuOpen(true)
        }
    }

    return (
        <>
            <div
                className={`burger-menu ${
                    isMenuOpen ? 'burger-menu__opened' : ''
                }`}
            >
                <p className="header__email-burger">{userEmail}</p>
                <Link
                    to={linkTo}
                    className="header__title-burger"
                    onClick={onSignOut}
                >
                    {headerTitle}
                </Link>
            </div>
            <header className="header">
                <div className="header__logo"></div>
                <p className="header__email">{userEmail}</p>
                <div
                    className={`burger-button ${
                        loggedIn ? 'burger-button__shown' : ''
                    }`}
                    onClick={handleMenu}
                ></div>
                <Link
                    to={linkTo}
                    className="header__title"
                    onClick={onSignOut}
                >
                    {headerTitle}
                </Link>
            </header>
        </>
    )
}

export default Header

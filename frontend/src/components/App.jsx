import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfilePopup from './EditProfilePopup'
import ImagePopup from './ImagePopup'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import React from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import api from '../utils/api'
import * as auth from '../utils/auth'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import DeletePlacePopup from './DeletePlacePopup'
import ProtectedRoute from './ProtectedRoute'
import Register from './Register'
import Login from './Login'
import InfoTooltip from './InfoTooltip'

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false)
    const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false)
    const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false)
    const [isImagePopupOpen, setImagePopupOpen] = React.useState(false)
    const [isDeletePlacePopupOpen, setDeletePlacePopup] = React.useState(false)
    const [isInfoTooltipPopupOpen, setInfoTooltipPopup] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState({})
    const [selectedDeleteCard, setSelectedDeleteCard] = React.useState({})
    const [currentUser, setCurrentUser] = React.useState({})
    const [cards, setCards] = React.useState([])
    const [isLoading, setLoading] = React.useState(false)
    const [loggedIn, setLoggedIn] = React.useState(false)
    const [userEmail, setUserEmail] = React.useState('')
    const [isSuccessfully, setSuccessfully] = React.useState(true)
    const history = useHistory()

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id)
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((res) => {
                setCards((state) =>
                    state.map((c) => (c._id === card._id ? res : c))
                )
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function handleCardDelete() {
        renderLoading(true)
        api.deleteCard(selectedDeleteCard._id)
            .then(() => {
                setCards(cards.filter((c) => c._id !== selectedDeleteCard._id))
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                renderLoading(false)
            })
    }

    function handleDeletePlaceClick(card) {
        setSelectedDeleteCard(card)
        setDeletePlacePopup(true)
    }

    function handleEditAvatarClick() {
        setEditAvatarPopup(true)
    }

    function handleEditProfileClick() {
        setEditProfilePopup(true)
    }

    function handleAddPlaceClick() {
        setAddPlacePopup(true)
    }

    function handleCardClick(card) {
        setSelectedCard(card)
        setImagePopupOpen(true)
    }

    function renderLoading(isLoading) {
        if (isLoading) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }

    function handleUpdateUser({ name, about }) {
        renderLoading(true)
        api.changeProfileInfo(name, about)
            .then((res) => {
                setCurrentUser(res)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                renderLoading(false)
            })
    }

    function handleUpdateAvatar({ avatar }) {
        renderLoading(true)
        api.changeProfilePhoto(avatar)
            .then((res) => {
                setCurrentUser(res)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                renderLoading(false)
            })
    }

    function handleAddPlaceSubmit({ name, link }) {
        renderLoading(true)
        api.createCard(name, link)
            .then((res) => {
                setCards([res, ...cards])
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                renderLoading(false)
            })
    }

    function handleLoginSubmit(e, formValues) {
        e.preventDefault()
        auth.authorize(formValues)
            .then((res) => {
                if (res.jwt) {
                    setLoggedIn(true)
                    history.push('/')
                }
            })
            .catch((err) => {
                console.log(err)
                setSuccessfully(false)
                setInfoTooltipPopup(true)
            })
    }

    function handleRegisterSubmit(e, formValues) {
        e.preventDefault()
        auth.register(formValues)
            .then(() => {
                history.push('/sign-in')
                setSuccessfully(true)
                setInfoTooltipPopup(true)
            })
            .catch((err) => {
                console.log(err)
                setSuccessfully(false)
                setInfoTooltipPopup(true)
            })
    }

    function closeAllPopups() {
        setEditAvatarPopup(false)
        setEditProfilePopup(false)
        setAddPlacePopup(false)
        setImagePopupOpen(false)
        setDeletePlacePopup(false)
        setInfoTooltipPopup(false)
        setSelectedCard({})
    }

    function handleSignOut() {
        auth.logout()
            .then(() => {
                setUserEmail('')
                setLoggedIn(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        Promise.all([api.getInitialCards(), api.getProfileInfo()])
            .then(([initialCards, profileData]) => {
                setCards(initialCards.data)
                setCurrentUser(profileData)
                setUserEmail(profileData.email)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [loggedIn])

    React.useEffect(() => {
        auth.checkToken()
            .then(() => {
                setLoggedIn(true)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                history.push('/')
            })
    })

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Switch>
                    <ProtectedRoute
                        exact
                        path="/"
                        component={() => (
                            <>
                                <Header
                                    headerTitle="Выйти"
                                    userEmail={userEmail}
                                    onSignOut={handleSignOut}
                                    linkTo="/sign-in"
                                    loggedIn={loggedIn}
                                />
                                <Main
                                    onEditAvatar={handleEditAvatarClick}
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onCardClick={handleCardClick}
                                    cards={cards}
                                    onCardDelete={handleDeletePlaceClick}
                                    onCardLike={handleCardLike}
                                />
                            </>
                        )}
                        loggedIn={loggedIn}
                    />
                    <Route
                        path="/sign-in"
                        render={() => (
                            <div>
                                <Header
                                    headerTitle="Регистрация"
                                    linkTo="/sign-up"
                                    loggedIn={loggedIn}
                                />
                                <Login onLogin={handleLoginSubmit} />
                            </div>
                        )}
                    ></Route>
                    <Route
                        path="/sign-up"
                        render={() => (
                            <div>
                                <Header
                                    headerTitle="Войти"
                                    linkTo="/sign-in"
                                    loggedIn={loggedIn}
                                />
                                <Register onRegister={handleRegisterSubmit} />
                            </div>
                        )}
                    ></Route>
                </Switch>
                <Footer />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    isLoading={isLoading}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoading={isLoading}
                />
                <ImagePopup
                    onClose={closeAllPopups}
                    card={selectedCard}
                    isOpen={isImagePopupOpen}
                />
                <DeletePlacePopup
                    isOpen={isDeletePlacePopupOpen}
                    onClose={closeAllPopups}
                    onDeletePlace={handleCardDelete}
                    isLoading={isLoading}
                />
                <InfoTooltip
                    isOpen={isInfoTooltipPopupOpen}
                    onClose={closeAllPopups}
                    isSuccessfully={isSuccessfully}
                />
            </CurrentUserContext.Provider>
        </div>
    )
}

export default App

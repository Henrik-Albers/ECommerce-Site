import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { onAuthStateChanged } from 'firebase/auth'
import { onSnapshot } from 'firebase/firestore'

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shoppage/shoppage.component'
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component'
import { setCurrentUser } from './redux/user/user.actions'

class App extends React.Component {
    unsubscribeFromAuth = null

    componentDidMount() {
        const { setCurrentUser } = this.props
        this.unsubscribeFromAuth = onAuthStateChanged(
            auth,
            async (userAuth) => {
                if (userAuth) {
                    const userRef = await createUserProfileDocument(userAuth)

                    onSnapshot(userRef, (snapshot) => {
                        setCurrentUser({
                            id: snapshot.id,
                            ...snapshot.data(),
                        })
                    })
                }
                setCurrentUser({ userAuth })
            }
        )
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth()
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/shop" component={ShopPage} />
                    <Route path="/signin" component={SignInAndSignUp} />
                </Switch>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
})

export default connect(null, mapDispatchToProps)(App)

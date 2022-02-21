import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shoppage/shoppage.component'
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { onAuthStateChanged } from 'firebase/auth'
import { onSnapshot } from 'firebase/firestore'

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            currentUser: null,
        }
    }

    unsubscribeFromAuth = null

    componentDidMount() {
        this.unsubscribeFromAuth = onAuthStateChanged(
            auth,
            async (userAuth) => {
                if (userAuth) {
                    const userRef = await createUserProfileDocument(userAuth)

                    onSnapshot(userRef, (snapshot) => {
                        this.setState(
                            {
                                currentUser: {
                                    id: snapshot.id,
                                    ...snapshot.data(),
                                },
                            },
                            () => console.log(this.state)
                        )
                    })
                }
                this.setState({ currentUser: userAuth })
            }
        )
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth()
    }

    render() {
        return (
            <div>
                <Header currentUser={this.state.currentUser} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/shop" component={ShopPage} />
                    <Route path="/signin" component={SignInAndSignUp} />
                </Switch>
            </div>
        )
    }
}

export default App

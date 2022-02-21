import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {
    apiKey: 'AIzaSyD02bzfonVngXAZk1PEouywhEmVJFJEg18',
    authDomain: 'crwn-db-63393.firebaseapp.com',
    projectId: 'crwn-db-63393',
    storageBucket: 'crwn-db-63393.appspot.com',
    messagingSenderId: '687441439999',
    appId: '1:687441439999:web:f0186c44906784285bb0ca',
    measurementId: 'G-ZV0X9RJD9R',
}

firebase.initializeApp(config)

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    if (!snapShot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }

        return userRef
    }
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase

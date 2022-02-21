import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const config = {
    apiKey: 'AIzaSyD02bzfonVngXAZk1PEouywhEmVJFJEg18',
    authDomain: 'crwn-db-63393.firebaseapp.com',
    projectId: 'crwn-db-63393',
    storageBucket: 'crwn-db-63393.appspot.com',
    messagingSenderId: '687441439999',
    appId: '1:687441439999:web:f0186c44906784285bb0ca',
    measurementId: 'G-ZV0X9RJD9R',
}

initializeApp(config)

const app = initializeApp(config)
const db = getFirestore(app)

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = doc(db, `users/${userAuth.uid}`)

    const snapShot = await getDoc(userRef)

    if (!snapShot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()
        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData,
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef
}

export const auth = getAuth()
export const firestore = getFirestore()

const provider = new GoogleAuthProvider()
provider.seCustomParameters = { params: 'select_account' }

export const signInWithGoogle = () => signInWithPopup(auth, provider)

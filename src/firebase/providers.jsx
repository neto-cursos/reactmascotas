import {
    createUserWithEmailAndPassword, GoogleAuthProvider,
    onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup
} from 'firebase/auth'
import { FirebaseAuth } from './config'

const googleProvider = new GoogleAuthProvider()

export const singInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider)

        const { displayName, email, photoURL, uid } = result.user

        return uid

    } catch (e) {
        alert((e).message)
    }
}



export const signInWithCredentials = async ({ email, password }) => {

    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);

        return resp.user.uid

    } catch (e) {
        alert((e).message)
    }

}

export const loginWithCredentials = async ({ email, password }) => {

    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);

        return resp.user.uid

    } catch (e) {

        alert((e).message)
    }
}


export const onAuthStateHasChanged = (setSession) => {
    onAuthStateChanged(FirebaseAuth, user => {

        if (!user) return setSession({ status: 'no-authenticated', userId: null })

        setSession({ status: 'authenticated', userId: user.uid })
    })
}

export const logoutFirebase = async () => await FirebaseAuth.signOut()


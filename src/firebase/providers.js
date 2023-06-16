import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const sigInWithGoogle = async() => {

    try {

        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        //const credentials = GoogleAuthProvider.credentialFromResult( result );
        //console.log(credentials);
        const { displayName, email, photoURL, uid } = result.user;
        //console.log(user)

        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }

        
    } catch (error) {
        
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
    
        
        console.log(error);
        return {
            ok: false,
            errorMessage
        }
        
    }

}


export const registerUserWithEmailPassword = async( {displayName, email, password} ) => {

    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        // console.log(resp);

        //TODO: Actualizar el display name 
        await updateProfile(FirebaseAuth.currentUser, {displayName}); //Usuario actual

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        // console.log(error);
        return { ok: false, errorMessage: error.message}
    }

}


export const loginWithEmailPassword = async ( { email, password } ) => {

    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName
        }

        
    } catch (error) {
        // console.log(error);
        return { ok: false, errorMessage: error.message}
    }


}



export const logoutFirebase = async() => {
    //Metodo de firebase para cerrar sesión
    //Es independiente al metodo de login que se realize
    return await FirebaseAuth.signOut();

}
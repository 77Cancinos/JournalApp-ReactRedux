//Acciones que hacen dispatch para tareas asincronas
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, sigInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, logout, login } from "./";

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

    }
}

export const startGoogleSingIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await sigInWithGoogle();
        //console.log({result});

        if (!result.ok) return dispatch(logout(result.errorMessage));


        dispatch(login(result));


    }
}


export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

    return async (dispatch) => {

        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

        //  console.log(resp);

        if (!ok) return dispatch(logout({ errorMessage }));

        dispatch(login({ uid, displayName, email, photoURL }));

    }

}



export const startLoginWithEmailPassword = ({ email, password }) => {

    return async (dispatch) => {

        dispatch(checkingCredentials());

        const result = await loginWithEmailPassword({ email, password });
        //console.log(result);

        if (!result.ok) return dispatch(logout(result));
        dispatch(login(result));


    }


}


export const startLogout = () => {

    return async (dispatch) => {

        await logoutFirebase();
        dispatch( clearNotesLogout() );
        dispatch( logout() );

    }

}
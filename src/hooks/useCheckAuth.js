import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { startLoadingNotes } from "../store/journal";

export const useCheckAuth = () => {

    //Checkeando el status de login
    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    //Verificar si ya esta logeado con el useEffect (guardar status)
    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {

            if (!user) return dispatch(logout());
            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL }));
            dispatch( startLoadingNotes() );

        });
    }, []);


    return {
        status
    }


}
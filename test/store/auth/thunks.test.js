import { loginWithEmailPassword, logoutFirebase, sigInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth";
import { checkingAuthentication, startGoogleSingIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

//Usando mock ya que se usan librerias de firebase
jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => { 

    const dispatch = jest.fn();
    //Limpiar mocks
    beforeAll( () => jest.clearAllMocks() );



    test('debe de invocar el checking credentials', async() => {
                                      //llama al return asincrono
        await checkingAuthentication()(dispatch);
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    });


    test('starGoogleSingIn debe de llamar checkingCredentials y login - exito', async() => { 

        const loginData = { ok: true, ...demoUser };
        await sigInWithGoogle.mockResolvedValue( loginData );

        // thunk
        await startGoogleSingIn()(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );


    });


    test('starGoogleSingIn debe de llamar checkingCredentials y logout - error', async() => { 

        const loginData = { ok: false, errorMessage: "Un error en Google" };
        await sigInWithGoogle.mockResolvedValue( loginData );

        // thunk
        await startGoogleSingIn()(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout(loginData.errorMessage) );


    });


    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito', async() => { 

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith(checkingCredentials());
        expect( dispatch ).toHaveBeenCalledWith( login(loginData) );

    });


    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async() => { 

        await startLogout()(dispatch);

        expect( logoutFirebase ).toHaveBeenCalled( );
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );

    });

 
});
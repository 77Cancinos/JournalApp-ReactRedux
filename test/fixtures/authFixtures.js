// codigo de prueba para testing

export const initialState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const authenticatedState = {
    status: 'auth', 
    uid: '123ABC',
    email: 'demo@google.com',
    displayName: 'demo user',
    photoURL: 'https://demo.jpg',
    errorMessage: null
}

export const notAuthenticatedState = {
    status: 'not-auth', 
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const demoUser = {
    uid: 'ABC123',
    email: 'demo@google.com',
    displayName: 'demo user',
    photoURL: 'https://foto.jpg'
}
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { fileUpload, loadNotes } from '../../helpers';
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './journalSlice';

export const startNewNote = () => {

    return async (dispatch, getState) => {

        //TODO: Tarea Dispatch
        dispatch(savingNewNote());

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        //Crear referencia al documento o colección
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        //Crear propiedad id a la nota
        newNote.id = newDoc.id;
        // console.log(newDoc, setDocResp);

        // dispatch

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));

    }

}


export const startLoadingNotes = () => {

    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));

    }

}


export const startSaveNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFirestore = { ...note };
        delete noteToFirestore.id; //eliminar una propiedad con JS
        //console.log(noteToFirestore);


        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        //Unión de campos con merge, sobreescribir campos
        await setDoc(docRef, noteToFirestore, { merge: true });

        dispatch(updateNote(note));

    }
}



//Subir imagenes
export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {

        dispatch(savingNewNote());//Bloquea los botones mientras carga

        //console.log(files);
        //await fileUpload( files[0] ); Solo sube una imagen

        //Agregamos las imagenes al array
        const fileUploadsPromises = [];
        for (const f of files) {
            fileUploadsPromises.push(fileUpload(f));
        }

        const photosUrls = await Promise.all(fileUploadsPromises);
        //console.log(photosUrls);

        dispatch(setPhotosToActiveNote(photosUrls));


    }
}


//Eliminar una nota del jounal
export const startDeletingNote = () => {
    return async (dispatch, getState) => {

        //Obtenemos el uid y la nota activa
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        //Referencia al documento en firbase
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        //Eliminar el documento en firebase
        await deleteDoc(docRef);

        //Borrar de la data local
        dispatch( deleteNoteById( note.id ) );

    }


}
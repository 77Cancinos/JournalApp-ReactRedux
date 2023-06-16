//Reducers
import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null
    },
    reducers: { //CRUD
        savingNewNote: (state) => {
           state.isSaving = true
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = ''; //limpiar mensaje de nota activa
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = ''; // limpiar mensaje de save
        },
        updateNote: (state, action) => { //payload: note - Actualizar nota en el NoteView
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                
                if(note.id === action.payload.id){
                    return action.payload
                }
                
                return note
            });
            //Todo: Mostrar mensaje de actualización
            state.messageSaved = `${action.payload.title}, actualizada correctamente`;
        },
        setPhotosToActiveNote: (state, action) => {
                                        //Fotos anteriores          //Nuevo arreglo
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload];
            state.isSaving = false;
        },
        clearNotesLogout: (state, action) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: (state, action) => {
         state.active = null;
         state.notes = state.notes.filter( note => note.id !== action.payload );
        },
    }
});


// Action creators are generated for each case reducer function
export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    setPhotosToActiveNote,
    clearNotesLogout,
    deleteNoteById
 } = journalSlice.actions;
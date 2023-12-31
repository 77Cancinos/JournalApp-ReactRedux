import { DeleteOutline, Note, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';
import { useForm } from "../../hooks/useForm"
import { setActiveNote, startSaveNote, startUploadingFiles, startDeletingNote } from "../../store/journal"
import { ImageGallery } from "../components"

export const NoteView = () => {

    const dispatch = useDispatch();

    //Modificamos el name
    const { active: activeNote, messageSaved, isSaving } = useSelector(state => state.journal);

    const { body, title, date, onInputChange, formState } = useForm(activeNote);

    //Dar formato a la fecha con useMemo
    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    //BotonPara subir archivos img
    const fileInputRef = useRef();

    //Actualizar la nota actual
    useEffect(() => { //formState tiene el valor de las notas
        dispatch(setActiveNote(formState));
    }, [formState]);

    //Efecto para mostrar mensaje de confirmación
    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota Actualizada', messageSaved, 'success');
        }
    }, [messageSaved]);


    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    const onFileInputChange = ({ target }) => {
        // console.log(target.files);
        if (target.files === 0) return;
        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}
            className="animate__animated animate__fadeIn animate__faster">
            <Grid item>
                <Typography fontSize={39} fontWeight='light' >{dateString}</Typography>
            </Grid>
            <Grid item>


                {/* El input no se muestra pero si se ejecuta */}
                <input
                    type='file'
                    multiple
                    ref={fileInputRef}
                    onChange={onFileInputChange}
                    style={{ display: 'none' }} //no lo muestra
                />
                <IconButton
                    color="primary"
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>

                <Button
                    disabled={isSaving}
                    onClick={onSaveNote}
                    color="primary"
                    sx={{ padding: 2 }} >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField type='text'
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    labe='Título'
                    sx={{ border: 'none', mb: 1 }}
                    name='title'
                    value={title}
                    onChange={onInputChange}
                />

                <TextField type='text'
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedio en el día de hoy?"
                    minRows={5}
                    name='body'
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={ onDelete }
                    sx={{ mt: 2 }}
                    color='error'
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>

            {/* Image Gallery */}
            <ImageGallery images={ activeNote.imageUrls} />

        </Grid>
    )
}

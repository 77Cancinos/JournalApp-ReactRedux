import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import { TurnedInNot } from '@mui/icons-material';
import { useMemo } from "react";
import { setActiveNote } from "../../store/journal/journalSlice";
import { useDispatch } from "react-redux";

export const SideBarItem = ( { title = '', body, id, date, imageUrls = [] } ) => {

    const dispatch = useDispatch();

    const onClickNote = () => {
        dispatch(setActiveNote({title, body, id, date, imageUrls}));
    }

    //Acortar el body de la nota si es mayor a 17
    const newTitle = useMemo(() => {
        return title.length > 17
            ? title.substring(0,17) + '...'
            : title;
    }, [title]);

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={ onClickNote } >
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={ newTitle } />
                    <ListItemText primary={ body } />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}

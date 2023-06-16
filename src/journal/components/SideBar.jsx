import {
    Box, Divider, Drawer,
    Grid,
    List, ListItem, ListItemButton, ListItemIcon,
    ListItemText,
    Toolbar, Typography
} from "@mui/material";
import { TurnedInNot } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { SideBarItem } from "./SideBarItem";

// sx = Para pantallas grandes  =  style xtended
// xs = Para pantallas pequenas =  xtra small
// sm = Para pantallas no tan pequenas = small screen
// md = Para pantallas medianas = medium screen
// vh = view height

export const SideBar = ({ drawerWidth = 240 }) => {

    const { displayName } = useSelector(state => state.auth);
    const { notes } = useSelector(state => state.journal);

    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >

            <Drawer
                variant="permanent" //temporary
                open={true} // o solo dejar open
                sx={{
                    display: { xs: 'bloc' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >

                <Toolbar>
                    <Typography variant="h6" noWrap component='div'>
                        {displayName}
                    </Typography>
                </Toolbar>

                <Divider />


                <List>
                    {
                        notes.map((note) => (
                            <SideBarItem key={ note.id } {...note} />
                        ))
                    }
                </List>

            </Drawer>

        </Box>
    )
}

import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { MenuOutlined, LogoutOutlined } from '@mui/icons-material';
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth";

// sx = Para pantallas grandes  =  style xtended
// xs = Para pantallas pequenas =  xtra small
// sm = Para pantallas no tan pequenas = small screen
// md = Para pantallas medianas = medium screen
// vh = view height

export const NavBar = ( { drawerWidth = 240 } ) => {

  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch( startLogout() );
  }

  return (
    <AppBar position="fixed" 
            sx={{ 
                width: { sm: `calc(100% - ${ drawerWidth }px)` },
                ml: { sm: `${ drawerWidth }px` }
             }}>

    <Toolbar>
        <IconButton 
            color="inherit"
            edge="start"
            sx={ { mr: 2, display: { sm: 'none'} } }
        >
            <MenuOutlined />
        </IconButton>

        <Grid container direction='row' justifyContent='space-between' alignItems='center' >
             <Typography variant="h6" noWrap component='div' >JournalApp</Typography>

             <IconButton color="error"
                          onClick={ onLogOut }>
                <LogoutOutlined />
             </IconButton>
            
        </Grid>

    </Toolbar>

    </AppBar>
  )
}

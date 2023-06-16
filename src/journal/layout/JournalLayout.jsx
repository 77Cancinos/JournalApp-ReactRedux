import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { NavBar, SideBar } from "../components";

// sx = Para pantallas grandes  =  style xtended
// xs = Para pantallas pequenas =  xtra small
// sm = Para pantallas no tan pequenas = small screen
// md = Para pantallas medianas = medium screen
// vh = view height

const drawerWidth = 280;

export const JournalLayout = ( { children } ) => {
  return (
    <Box sx={{ display: 'flex' }}
        className="animate__animated animate__fadeIn animate__faster">
        {/* NavBar */}\
        <NavBar drawerWidth={ drawerWidth }/>

        {/* SideBar */}
        <SideBar drawerWidth={ drawerWidth } />

       <Box component='main' 
            sx={{  flexGrow: 1, p: 3 }}
       >

            {/* ToolBar */}
            <Toolbar />
            { children }

       </Box>

    </Box>
  )
}
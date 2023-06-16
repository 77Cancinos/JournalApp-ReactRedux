import { CircularProgress, Grid } from "@mui/material";

//Vista para ver si esta authenticated
//Pantalla de carga
export const CheckingAuth = () => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
        >

            <Grid container
                direction='row'
                justifyContent='center'>

                <CircularProgress color="warning" />
                
            </Grid>

        </Grid>
    )
}

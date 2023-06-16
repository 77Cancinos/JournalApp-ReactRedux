import { useMemo } from 'react';
import { useForm } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from '@mui/icons-material';

import { AuthLayout } from '../layout/AuthLayout';
import {startGoogleSingIn, startLoginWithEmailPassword } from '../../store/auth';

// sx = Para pantallas grandes  =  style xtended
// xs = Para pantallas pequenas =  xtra small
// sm = Para pantallas no tan pequenas = small screen
// md = Para pantallas medianas = medium screen
// vh = view height

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm(formData);

  //Si el estatus cambia se calcula el nuevo valor
  const isAuthenticating = useMemo( () =>  status ==='checking', [status]);

  const onSubmit = ( event ) => {
    event.preventDefault();
    console.log({ email, password });
    dispatch(startLoginWithEmailPassword({ email, password }));
  }

  const onGoogleSignIn = () => {
    // console.log('On google singin');
    dispatch(startGoogleSingIn());
  }

  return (

    <AuthLayout title='Login'>

      <form 
        onSubmit={ onSubmit }  
        className="animate__animated animate__fadeIn animate__faster"
        aria-label="submit-form"
        >
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name='email'
              value={ email }
              onChange={ onInputChange }
              >
            </TextField>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }} >
            <TextField
              label="Password"
              type="password"
              placeholder="password"
              fullWidth
              name='password'
              inputProps={{
                'data-testid': 'password'
              }}
              value={ password }
              onChange={ onInputChange }
              >
            </TextField>
          </Grid>


            {/* Mensaje de error si esl correo esta en uso ya */}
            <Grid container>
            <Grid item xs={12} display={ !!errorMessage ? '': 'none' }>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
          </Grid>


          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid item xs={12} sm={6} >
              <Button 
                disabled= { isAuthenticating }
                variant="contained" 
                fullWidth type='submit'
                >
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6} >
              <Button
                disabled={ isAuthenticating } 
                variant="contained" 
                fullWidth 
                aria-label="google-btn"
                onClick={ onGoogleSignIn }
                >
                <Google />
                <Typography sx={{ ml: 1 }} >Google</Typography>
              </Button>
            </Grid>

          </Grid>


          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>

        </Grid>

      </form>

    </AuthLayout>


  )
}
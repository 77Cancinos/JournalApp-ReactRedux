import { useForm } from '../../hooks';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

// sx = Para pantallas grandes  =  style xtended
// xs = Para pantallas pequenas =  xtra small
// sm = Para pantallas no tan pequenas = small screen
// md = Para pantallas medianas = medium screen
// vh = view height

const formData = {
  email: '',
  password: '',
  displayName: '',
}

//Validaciones personalizadas
const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener una @'],
  password: [(value) => value.length >= 6, 'El password debe de tener mas de 6 digitos'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio']
} //Objeto de arreglo con 2 tuplas de una funci'on y un mensaje personalizado


export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmited, setFormSubmited] = useState(false);

  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const {
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid,
  } = useForm(formData, formValidations);

  // console.log(displayNameValid);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmited(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));

  }


  return (

    <AuthLayout title='Crear Cuenta'>

      {/* <h1>Form Valid: { isFormValid ? 'Valido' : 'No valido' }</h1> */}

      <form onSubmit={onSubmit}  className="animate__animated animate__fadeIn animate__faster" >
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre Completo"
              type="text"
              placeholder="Nombre Completo"
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmited}
              helperText={displayNameValid}
            >
            </TextField>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmited}
              helperText={emailValid}
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
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmited}
              helperText={passwordValid}
            >
            </TextField>
          </Grid>

          {/* Mensaje de error si esl correo esta en uso ya */}
          <Grid container 
                display={ !!errorMessage ? '': 'none' }
                sx={{ mt: 1 }}
                >
            <Grid item 
                  xs={12}>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                type='submit'
                variant="contained"
                fullWidth>
                Crear Cuenta
              </Button>
            </Grid>

          </Grid>


          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }} >¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to="/auth/login">
              Ingresar
            </Link>
          </Grid>

        </Grid>

      </form>

    </AuthLayout>


  )
}
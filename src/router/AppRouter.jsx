import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";

import { CheckingAuth } from "../ui";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { useCheckAuth } from "../hooks";

export const AppRouter = () => {

  const { status } = useCheckAuth();

  if( status === 'checking') {
    return <CheckingAuth />
  }
  
  return (
    <Routes>

        {
          //Si esta auth, solo las rutas de acá van a existir
          (status === 'auth')
          ? <Route path="/*" element={ <JournalRoutes /> }/>
          : <Route path="/auth/*" element={ <AuthRoutes /> } />
        }
        
        <Route path="/*" element={ <Navigate to='/auth/login' /> } />

        {/* Login o registro */}
        {/* <Route path="/auth/*" element={ <AuthRoutes /> } /> */}

        {/* JournalApp */}
        {/* <Route path="/*" element={ <JournalRoutes /> }/> */}

    </Routes>
  )

}
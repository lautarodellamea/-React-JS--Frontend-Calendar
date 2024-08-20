import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth'
import { CalendarPage } from '../calendar'
import { useAuthStore } from '../hooks'
import { useEffect } from 'react'

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore()

  useEffect(() => {
    checkAuthToken()
  }, [])



  // const authStatus = 'not-authenticated'
  // const authStatus = 'not-authenticated'

  if (status === 'checking') {
    return (<h3>Cargando...</h3>)
  }


  // si el status no es authenticated, redirigimos al login y las otras rutas no existen

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        (
          <>
            <Route path='/auth/*' element={<LoginPage />} />

            {/* no haria falta, pero lo ponemos por si el usuario va a una ruta que no existe */}
            <Route path='/*' element={<Navigate to='/auth/login' />} />
          </>
        )
      ) : (
        <>
          <Route path='/' element={<CalendarPage />} />

          <Route path='/*' element={<Navigate to='/' />} />
        </>
      )}

    </Routes>
  )
}

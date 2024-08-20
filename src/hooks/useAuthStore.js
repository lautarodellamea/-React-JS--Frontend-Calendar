// este archivo tiene por objetivo realizar cualquier interaccion con la parte de el auth en nuestro store

import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api"
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store"

export const useAuthStore = () => {

  // accedemos al estado que queramos
  const { status, user, errorMessage } = useSelector(state => state.auth)

  // esto es para realizar acciones
  const dispatch = useDispatch()


  const startLogin = async ({ email, password }) => {

    // console.log({ email, password })
    dispatch(onChecking())


    // aca llegaremos al backend
    // esto puede fallar ya sea que las credenciales sean incorrectas
    try {

      // autenticacion valida
      const { data } = await calendarApi.post('/auth', { email, password }) // la parte asincrona sucedio aca
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime()) // con esto podemos hacer calculos y ver si ya vence el token o no y ver si vale la pena hacer otra peticion

      dispatch(onLogin({ name: data.name, uid: data.uid })) // despachamos acciones sincronas


      // console.log({ data })

    } catch (error) {

      // credenciales incorrectas, etc
      // console.log(error)

      dispatch(onLogout('Credenciales incorrectas'))

      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 3000)


    }
  }

  const startRegister = async ({ name, email, password }) => {
    // console.log({ name, email, password })

    dispatch(onChecking())

    try {

      const { data } = await calendarApi.post('/auth/new', { name, email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(onLogin({ name: data.name, uid: data.uid }))


    } catch (error) {
      console.log(error)
      console.log(error.response.data?.message)

      // dispatch(onLogout('Credenciales incorrectas'))
      // aca el error al registrar puede ser porque ya exista un usuario con ese email, etc
      dispatch(onLogout(error.response.data?.message || ''))
      // ver error.response.data o como viene el error desde mi backend

      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 3000)

    }
  }


  const checkAuthToken = async () => {

    const token = localStorage.getItem('token')

    if (!token) return dispatch(onLogout())

    try {

      const { data } = await calendarApi.get('auth/renew')

      console.log(data)

      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(onLogin({ name: data.name, uid: data.uid }))

    } catch (error) {

      localStorage.clear()
      // localStorage.removeItem('token')
      dispatch(onLogout('No hay token'))


    }

  }

  const startLogout = () => {

    localStorage.clear()
    dispatch(onLogoutCalendar())
    dispatch(onLogout())
  }


  return {
    // * Propiedades
    status,
    user,
    errorMessage,


    // * Metodos
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout

  }
}
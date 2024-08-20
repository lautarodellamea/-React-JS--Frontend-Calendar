import axios from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
  baseURL: VITE_API_URL,
})


// TODO: Configurar interceptores: nos permiten interceptar peiciones antes o despues de que se haga, y añadir o modificar la respuesta o informacion a la peticion
// este es un interceptor de request el cual envia el token en los headers, se ejecuta antes de hacer la peticion
calendarApi.interceptors.request.use(config => {

  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token')
  }

  return config
})


export default calendarApi
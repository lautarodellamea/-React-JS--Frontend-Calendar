import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";
import calendarApi from "../api/calendarApi";
import { convertsToDateEvents } from "../helpers";
import Swal from "sweetalert2";


export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {

    // TODO: llegar al backend
    try {

      if (calendarEvent.id) {
        // actualizando
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return
      }

      // creando
      const { data } = await calendarApi.post('/events', calendarEvent)
      // console.log({ data })
      dispatch(
        onAddNewEvent({
          ...calendarEvent,
          id: data.event.id,
          user: user
        })
      );

    } catch (error) {

      console.log('Error al actualizar el evento')
      Swal.fire('Error al actualizar el evento', error.response.data.msg, 'error')
    }
  }


  const startDeletingEvent = async () => {
    // TODO: llegar al backend

    try {


      await calendarApi.delete(`/events/${activeEvent.id}`)

      dispatch(onDeleteEvent());
    } catch (error) {
      console.log('Error al eliminar el evento')
      Swal.fire('Error al eliminar el evento', error.response.data.msg, 'error')
    }


  };



  const startLoadingEvents = async () => {

    try {

      const { data } = await calendarApi.get('/events')
      // console.log({ data })

      const events = convertsToDateEvents(data.events)
      dispatch(onLoadEvents(events))
      console.log({ events })





    } catch (error) {
      console.log('Error cargando eventos')
      console.log(error)
    }

  }

  // su usamos un useEffect aca en cada lado donde use este custom hook mandaria a disparar este efecto  haciendo nuevas peticiones al backend, por eso no ponemos useEffect aca

  return {
    // Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent, // si es null regresa false sino true

    // Metodos
    startDeletingEvent,
    setActiveEvent,
    startSavingEvent,
    startLoadingEvents
  };
};

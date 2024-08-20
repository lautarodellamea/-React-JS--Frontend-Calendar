import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
  Navbar,
} from "../";

import { useEffect, useState } from "react";
import { localizer, getMessagesES } from "../../helpers";
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";

export const CalendarPage = () => {


  const { user } = useAuthStore()


  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const { openDateModal } = useUiStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log({ event, start, end, isSelected })
    // console.log(event)

    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid); // pongo estas dos opciones porque en el backend el uid es el _id deberia cambiarlo asi seguir una logica

    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : "#465660", // para diferenciar los eventos que puede editar el usuario
      borderRadius: "0px",
      opacity: 0.8,
      color: "#fff",
    };

    return { style };
  };

  const onDoubleClick = () => {
    // console.log({ doubleClick: event });
    openDateModal();
  };
  const onSelect = (event) => {
    // console.log({ click: event });

    setActiveEvent(event);
  };
  const onViewChanged = (event) => {
    // console.log({  event })
    localStorage.setItem("lastView", event);
    setLastView(event);
  };


  // disparamos aca el startLoadingEvents porque sino se me rederizaria siempre en cada lado que use el useCalendarStore
  useEffect(() => {
    startLoadingEvents();
  }, [])



  return (
    <>
      <Navbar />
      <Calendar
        // para poner el calendario en español
        culture="es"
        messages={getMessagesES()}

        // el propósito principal del "localizer" es permitir que react-big-calendar se ajuste a las preferencias regionales de los usuarios, como el formato de fecha, el idioma de los nombres de los días y los meses, entre otros
        localizer={localizer}

        // eventos, lo que vamos a guardar en el calendario
        events={events}

        // para decir la vista que carga, esta esta definida mas arriba en un state
        defaultView={lastView}

        // se configura para indicar que la fecha de inicio de cada evento se puede encontrar en la propiedad "start" de los objetos de eventos, lo mismo con endAccessor pero en end.
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 80px )" }}

        // proporcionamos estilos adicionales a los eventos del calendario dinámicamente
        eventPropGetter={eventStyleGetter}

        // componente que queremos sobreescribir con nuestros propios estilos o componentes
        components={{
          event: CalendarEvent,
        }}

        // acciones sobre el calendario
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};

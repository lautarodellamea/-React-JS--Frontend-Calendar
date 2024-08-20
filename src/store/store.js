import { configureStore } from "@reduxjs/toolkit";
import { authSlice, calendarSlice, uiSlice } from "./";

// creamos el store con "configureStore"
export const store = configureStore({
  // me pide mis reducers
  reducer: {
    auth: authSlice.reducer,
    calendar: calendarSlice.reducer,
    ui: uiSlice.reducer,
  },

  // aca soluciuonamos el error que se origina al intentar serializar las fechas, de esta forma no se fija si puede serializarlas
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// debemos colocar el store en el punto mas alto de nuestra App o en algun punto para usarlo, lo pondremos en CalendarApp
